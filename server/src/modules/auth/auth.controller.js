// GitHub OAuth: swap code for token, upsert User, set JWT as httpOnly cookie.

// Get crypto for hashing
const crypto = require("crypto");

// JWT for signing
const jwt = require("jsonwebtoken");

// Get User model
const User = require("../users/user.model");


// Get JWT for signing
const cookieBase = {
    // Use httpOnly to prevent XSS attacks
    httpOnly: true,
    // Use secure cookies in production
    secure: process.env.NODE_ENV === "production",
    // Use sameSite to prevent CSRF attacks
    sameSite: "lax",
    // Set cookie to expire in 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};


// Function to redirect to GitHub for OAuth
exports.redirectToGitHub = (req, res) => {
    // Generate a random state string to prevent CSRF attacks
    const state = crypto.randomBytes(16).toString("hex");
    // Saves the current state in a cookie to verify it later
    res.cookie("oauth_state", state, { ...cookieBase });

    // Create a URLSearchParams object to build the query string
    const params = new URLSearchParams({
        // Get the GitHub client ID from environment variables
        client_id: process.env.GITHUB_CLIENT_ID,
        // Request the read:user scope to get user information
        scope: "read:user",
        // Include the state parameter to prevent CSRF attacks
        state,
    });

    // Sends the browser to GitHub's OAuth authorization page with the query string
    res.redirect(`https://github.com/login/oauth/authorize?${params}`);

};


// Async function to handle the GitHub OAuth callback
exports.githubCallback = async (req, res) => {
    // Get the code and state from the query parameters from GitHub's callback
    const { code, state } = req.query;
    // Check if the code is present and the state matches the one stored in the cookie
    if (!code || state !== req.cookies.oauth_state) {
        // If the code is missing or the state doesn't match, redirect to the login page with an error
        return res.redirect(`${process.env.CLIENT_URL}/login?error=state`);
    }

    // Delete the oauth_state cookie after verifying it
    res.clearCookie("oauth_state", cookieBase);

    // Exchange the code for an access token from GitHub
    // Await the fetch request to GitHub's access token endpoint with the necessary parameters
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        // Use POST method to send the request
        method: "POST",
        // Set the headers to accept JSON responses
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // Send the client ID, client secret, and code in the request body as JSON
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }),
    });

    // Await the response and parse it as JSON to get the access token
    const tokenData = await tokenRes.json();
    // If the access token is not present in the response, redirect to the login page with an error
    if (!tokenData.access_token) {
        // If the access token is missing, redirect to the login page with an error
        return res.redirect(`${process.env.CLIENT_URL}/login?error=token`);
    }

    // Use the access token to fetch the user's information from GitHub
    const ghRes = await fetch("https://api.github.com/user", {
        // Set the Authorization header with the access token to authenticate the request
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    // Await the response and parse it as JSON to get the user's information
    const gh = await ghRes.json();

    // Upsert the user in the database using the GitHub ID as the unique identifier
    const user = await User.findOneAndUpdate(
        // Use the GitHub ID as the unique identifier for the user
        { githubId: String(gh.id) },
        // Update the user's information with the GitHub login, avatar URL, access token, and last login time
        {
            username: gh.login,
            avatarUrl: gh.avatar_url,
            githubToken: tokenData.access_token,
            lastLoginAt: new Date(),
        },
        // Set the options to upsert the user if it doesn't exist and return the updated document
        { upsert: true, returnDocument: "after" }
    );

    // Set the JWT token in an httpOnly cookie and redirect to the dashboard
    const token = jwt.sign(
        // Sign the JWT with the user's ID and username as the payload
        { id: user._id, username: user.username },
        // Use the JWT secret from environment variables to sign the token
        process.env.JWT_SECRET,
        // Set the token to expire in 7 days
        { expiresIn: "7d" }
    );
    
    // Set the cookie to expire in 7 days
    res.cookie("token", token, { ...cookieBase});

    // Redirect the user to the dashboard after successful login
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};

// Function to log out the user by clearing the JWT cookie
exports.logout = (req, res) => { 
    // Clear the JWT cookie by setting it to an empty string and expiring it immediately
    res.clearCookie("token", cookieBase);

    // REturn ok json
    res.status(200).json({ message: "Logged out successfully" });

    // Redirect the user to the home page after logging out
    res.redirect(`${process.env.CLIENT_URL}/`);
};

// Function to get the current logged-in user's information
exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select("username avatarUrl");
  if (!user) return res.status(401).json({ error: "User not found" });
  res.json(user);
};