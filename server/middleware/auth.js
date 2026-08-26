const { getAuth } = require("firebase-admin/auth");

async function verifyUser(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Please login first",
      });
    }
    const token = authorization.split("Bearer ")[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired login",
    });
  }
}

module.exports = verifyUser;