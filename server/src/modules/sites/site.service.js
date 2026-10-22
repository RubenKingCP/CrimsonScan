// Site logic: validate input, list, create, verfy owner, delete
const crypto = require("crypto");
const dns = require("dns").promises;
const { isValidObjectId } = require("mongoose");
const Site = require("./site.model")


// Txt record prefix for dns
const TXT_PREFIX = "crimsonscan-verify=";

// ErrorHandler
function httpError(status, message) {
    const err = new Error(message);
    err.status = status;
    err.expose = true;
    return err;
}

// Function to turn the https domain to jsut the domain
function normalizeDomain(input) {
    if (typeof input != "string" || !input.trim()) return null;

    // Raw input
    const raw = input.trim();

    let host;

    try {

        // Use url to remove the scheme, path etc etc
        host = new URL(raw.includes("://") ? raw : 'https://${raw}').hostname;
    }
    catch {
        // If its not url shaped
        return null;
    }

    // Regex to remove not wanted stuff
    host = host.replace(/\.$/, "");

    // Labels of letters, digits and hyohens 
    const label = "[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?";
    const tld = "(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})";
    const valid = new RegExp(`^(?:${label}\\.)+${tld}$`);

    return host.length <= 253 && valid.test(host) ? host : null;
}

// DEV ONLY: lets you add http://localhost:5000 etc. for testing. Never active in production.
const ALLOW_LOCAL = process.env.NODE_ENV !== "production" && process.env.ALLOW_LOCAL_SITES === "true";

// True for "localhost", "localhost:5000", "127.0.0.1:8080"…
function isLocal(domain) {
  return /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(domain);
}

// "http://localhost:5000/" → "localhost:5000" (keeps the port), only when ALLOW_LOCAL is on.
function normalizeLocal(input) {
  if (!ALLOW_LOCAL || typeof input !== "string") return null;
  try {
    const host = new URL(input.includes("://") ? input.trim() : `http://${input.trim()}`).host;
    return isLocal(host) ? host : null;
  } catch {
    return null;
  }
}

// Trims the name and checks its length.
function cleanName(name) {
    const n = typeof name === "string" ? name.trim() : "";
    if (!n || n.length > 60) throw httpError(400, "Name must be between 1 and 60 characters.");
    return n;
}


// Finds one of the user's sites or throw 404
async function findOwned(userId, siteId) {
    // Check to see if the site it is valid
    if (!isValidObjectId(siteId)) throw httpError(404, "Site not found.");
    
    const site = await Site.findOne({ 
        _id: siteId,
        owner: userId
    });

    if (!site) throw httpError(404, "Site not found.");
    return site;
}

// Check to see if the site has the verify token
async function hasVerifyRecord(domain, token) {
    try {
        // Get dns records attached to the domain
        const records = await dns.resolveTxt(domain);

        // Long TXT values can arrive split into chuck so join them
        return records.some((chunks) => chunks.join("").trim() === TXT_PREFIX + token);
    } catch (err) {

        if (err.code === "ENOTFOUND" || err.code === "ENODATA")
            return false;
        // timeout server error
        throw httpError(503, "Couldn't reach DNS right now. Please try again in a minute.")
    }
}

// All the user's sites sorted by newest
exports.list = (userId) => Site.find({owner: userId}).sort({createdAt: -1});

//One of the users sites
exports.get = findOwned;

// Adds a site in pending state with a fresh verification token
exports.create = async (userId, {name, domain} = {}) => {
    const siteName = cleanName(name);
    const siteDomain = normalizeDomain(domain) ?? normalizeLocal(domain);
    if (!siteDomain) throw httpError(400, "Enter a valid domain, for example myshop.com");

    try {
        return await Site.create({
            owner: userId,
            name: siteName,
            domain: siteDomain,
            verifyToken: crypto.randomBytes(16).toString("hex")
        });
    } catch(err) {
        if (err.code === 11000) throw httpError(409, "You already added this domain.")
            throw err;
    }
};

// Looks up the dns record and verifies site
exports.verify = async (userId, siteId) => {
    const site = await findOwned(userId, siteId);
    if (site.status === "verified") {
        return {
            site,
            verified: true
        };
    }

    // If found
    const found = isLocal(site.domain) ? ALLOW_LOCAL : await hasVerifyRecord(site.domain, site.verifyToken);
    site.lastCheckedAt = new Date();
    if (found) {
        site.status = "verified";
        site.verifiedAt = new Date();
    }
    await site.save();
    return { site, verified: found};
}

// Deleted one of the users sites TODO: Delete scan too
exports.remove = async (userId, siteId) => {
    const site = await findOwned(userId, siteId);
    await site.deleteOne();
    return { ok: true };
}


