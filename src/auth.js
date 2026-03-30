/**
 * auth.js
 * Simple API-key middleware.
 * Send header:  X-API-Key: demo-key-123
 * Or query param: ?api_key=demo-key-123
 */

const VALID_KEYS = new Set([
  "demo-key-123",   // default dev key
  "gustavo-key-456" // example second key
]);

function apiKeyAuth(req, res, next) {
  // Skip auth for the frontend (static HTML) and docs
  if (req.path === "/" || req.path === "/favicon.ico") return next();

  const key =
    req.headers["x-api-key"] ||
    req.query.api_key;

  if (!key || !VALID_KEYS.has(key)) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Provide a valid API key via X-API-Key header or ?api_key= query param",
      hint: "Use: X-API-Key: demo-key-123",
    });
  }

  next();
}

module.exports = apiKeyAuth;
