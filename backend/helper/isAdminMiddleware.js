function isAdmin(req, res, next) {
  // console.log("🔍 isAdmin middleware triggered");
  // console.log("🔍 Request path:", req.path);
  // console.log("🔍 req.auth:", req.auth);
  // // req.auth is populated by express-jwt after successful authentication
  // console.log("isAdmin check:", req.auth);
  // if (!req.auth.isAdmin) {
  //   return res.status(403).json({
  //     success: false,
  //     message: "Access denied. Admin privileges required.",
  //   });
  // }
  next();
}

module.exports = { isAdmin };
