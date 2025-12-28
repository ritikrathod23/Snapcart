const express = require("express");
const app = express();
const products = require("./routes/products");
const bodyParser = require("body-parser");
const confi = require("./models/confi");
const categories = require("./routes/categories");
const user = require("./routes/user");
const order = require("./routes/order");
const { authJwt } = require("./helper/jwt");
const { isAdmin } = require("./helper/isAdminMiddleware");
const handleError = require("./helper/handleError");
const cookieParser = require("cookie-parser");
const cartRoutes = require("./routes/cartRoutes");
const adminDashboardRoute = require("./routes/adminDashboardRoute");
const review = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const webHookRoutes = require("./routes/webHookRoutes");
const authRoutes = require("./routes/authRoutes");

var cors = require("cors");

confi();

const corsOptions = {
  origin: "http://localhost:5173", // Your React app URL
  credentials: true, // Required for withCredentials: true
  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  // allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/", webHookRoutes);

//middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api/v1", authRoutes);

app.use(authJwt());

//routes
app.use("/payments/", paymentRoutes);
app.use("/api/v1", products);
app.use("/api/v1", categories);

app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", adminDashboardRoute);
app.use("/api/v1", review);

app.use(handleError);

app.listen(3000, () => {
  console.log("Sever Started");
});
