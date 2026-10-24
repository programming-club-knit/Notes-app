const jwt = require("jsonwebtoken");

// Protects routes: only logged-in users (with a token) can pass
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // The token is sent like this:  Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  // Read the user id stored inside the token
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }

  // Save the user id so the controllers can use it
  req.userId = decoded.id;
  next();
};

module.exports = protect;
