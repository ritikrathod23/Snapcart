import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { AuthProvider } from "./contextApi/AuthContextProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Layout,
  Dashboard,
  Login,
  ProductPage,
  Cart,
  UserDetails,
  Product1,
} from "./pages/index.js";
import { Provider } from "react-redux";
import { WithSidebar } from "./components/WithSidebar.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import Category from "./pages/admin/Category.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import Sales from "./pages/admin/Sales.jsx";
import Customer from "./pages/admin/Customer.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import { DrawerProvider } from "./contextApi/DrawerContext.jsx";
import Register from "./pages/Register.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import Success from "./pages/payments/Success.jsx";
import MyProfile from "./pages/MyProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Dashboard (no sidebar)
      {
        index: true, // equivalent to path: "/"
        element: <Dashboard />,
      },
      {
        path: "success",
        element: <Success />,
      },

      // Routes with sidebar
      {
        path: "/",
        element: <WithSidebar />,
        children: [
          {
            path: "men",
            element: <ProductPage />,
          },
          {
            path: "women",
            element: <ProductPage />,
          },
          {
            path: "kids",
            element: <ProductPage />,
          },
        ],
      },

      // Routes without sidebar (special cases)
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "cart",
        element: (
            <Cart />
        ),
      },
      {
        path: "/myprofile",
        element: (
            <MyProfile />
        ),
      },
      {
        path: ":type/:id",
        element: <Product1 />,
      },
      // 404 route
      {
        path: "*",
        element: <div>No such path found</div>,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "products-list",
        element: <ProductList />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "category/add-category",
        element: <AddCategory />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "products-list/add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <DrawerProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router}>
            {/* <StrictMode> */}
            <App />
            {/* </StrictMode> */}
          </RouterProvider>
        </Provider>
      </QueryClientProvider>
      </AuthProvider>
  </DrawerProvider>
);
