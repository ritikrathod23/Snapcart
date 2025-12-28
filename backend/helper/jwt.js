const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    throw new Error("SECRET_KEY environment variable is not set");
  }

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    getToken: (req) => {
      if (req.cookies?.token) {
        return req.cookies.token;
      }
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      return null;
    },
  }).unless({
    path: [
      "/api/v1/login",
      "/api/v1/signup",
      "/api/v1/reviews",
      "/api/v1/filters",
      "/api/v1/getProducts",
      "/api/v1/create-checkout-session",
      "/api/orders/create-from-session",
      "/payments/orders/create-from-session",
      { url: /\/products(.*)/, methods: ["GET"] },
    ],
  });
}

// New middleware for admin-only routes

// Optional: middleware for checking if user owns the resource
// function isOwnerOrAdmin(req, res, next) {
//   const userId = req.params.userId || req.body.userId;

//   if (req.auth.isAdmin || req.auth.userId === userId) {
//     return next();
//   }

//   return res.status(403).json({
//     success: false,
//     message: "Access denied. You can only access your own data.",
//   });
// }

module.exports = { authJwt };
