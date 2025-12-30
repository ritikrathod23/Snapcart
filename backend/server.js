const express = require("express");
const app = express();
const products = require("./routes/products");
const bodyParser = require("body-parser");
const confi = require("./models/confi");
const categories = require("./routes/categories");
const user = require("./routes/user");
const order = require("./routes/order");
const handleError = require("./helper/handleError");
const cookieParser = require("cookie-parser");
const cartRoutes = require("./routes/cartRoutes");
const adminDashboardRoute = require("./routes/adminDashboardRoute");
const review = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const webHookRoutes = require("./routes/webHookRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/auth");

var cors = require("cors");

confi();

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/", webHookRoutes);

//middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", authRoutes);


//routes
app.use("/api/v1/payments/", verifyToken, paymentRoutes);
app.use("/api/v1", products);
app.use("/api/v1", categories);

app.use("/api/v1", verifyToken, user);
app.use("/api/v1", verifyToken, order);
app.use("/api/v1", verifyToken, cartRoutes);
app.use("/api/v1", adminDashboardRoute);
app.use("/api/v1", review);

app.use(handleError);

app.listen(3000, () => {
  console.log("Sever Started");
});
