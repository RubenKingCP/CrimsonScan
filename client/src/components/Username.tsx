"use client";
import { useEffect, useState } from "react";
import { getMe } from "../lib/api/client";

// Displays the current user's username, or "Guest" if not signed in. Client-only because it fetches from the API.
export function Username() {
  // State to hold the username, initialized to null
  const [username, setUsername] = useState<string | null>(null);

  // Fetch the current user's username when the component mounts
  useEffect(() => {
    // Run the getMe function to fetch the username from the API
    getMe()
    // If the request is successful, update the username state with the fetched username
      .then((me) => setUsername(me.username))
      // If the request fails (e.g., user not signed in), set the username state to null
      .catch(() => setUsername(null));
  }, []);

  const initial = username ? username.charAt(0).toUpperCase() : "G";

  // Render the username if available, otherwise render "Guest"
  return (
  <div className="flex items-center gap-2">
    <span className="hidden text-sm text-zinc-300 sm:inline">{username}</span>
        <span
          aria-label={`Signed in as ${username || "Guest"}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-700 text-sm font-semibold text-white"
        >
          {initial}
        </span>
  </div>
  )
}