import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  Edit2,
  Camera,
  Package,
  Heart,
  CreditCard,
  ShoppingBag,
  Bell,
  Lock,
  Truck,
  Star,
  Receipt,
} from "lucide-react";
import useGetUserDetails from "../Hooks/useGetUserDetails";
import useGetUserOrders from "../Hooks/useGetUserOrders";
import { useAuth } from "../contextApi/AuthContextProvider";
import { Link } from "react-router-dom";
export default function MyProfile() {
  const { isAuthenticated } = useAuth();

  const { data: userOrders, refetch } = useGetUserOrders();

  const { data: userData } = useGetUserDetails();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleOrders = () => {
    refetch();
    setActiveTab("orders");
  };

  // const [wishlist] = useState([
  //   { name: "Wireless Headphones", price: "$89.99", image: "🎧" },
  //   { name: "Smart Watch", price: "$299.99", image: "⌚" },
  //   { name: "Running Shoes", price: "$120.00", image: "👟" },
  // ]);

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Pending":
        return "text-blue-600 bg-blue-50";
      case "Processing":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center flex-col gap-6 items-center text-center text-3xl mt-28">
        Please login to view your profile
        <Link to={"/login"} className="block">
          <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-mycolor rounded w-40 py-4 hover:bg-gray-700">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto">
                    {userData?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {userData?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Member since {new Date(userData?.date).toUTCString()}
                </p>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "profile"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">My Profile</span>
                </button>
                <button
                  onClick={handleOrders}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "orders"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "wishlist"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "addresses"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Addresses</span>
                </button>
                <button
                  onClick={() => setActiveTab("payment")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "payment"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Payment Methods</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Shopping Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-bold text-purple-600">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wishlist Items</span>
                  <span className="font-bold text-purple-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reward Points</span>
                  <span className="font-bold text-purple-600">1,250</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData?.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                        {userData?.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData?.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                        {userData?.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData?.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                        {userData?.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {new Date(userData?.date).toUTCString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  My Orders
                </h2>
                <div className="space-y-4">
                  {userOrders?.map((order) => (
                    <div
                      key={order?._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {order?._id}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(order?.createdAt).toUTCString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order?.status
                          )}`}
                        >
                          {order?.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">
                            {order?.orderItems?.map((item) => (
                              <p key={item?._id}>{item?.product?.pName}</p>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">
                            {order?.orderItems?.length} items
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {order?.totalAmount}
                          </p>
                        </div>
                        <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {/* {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  My Wishlist
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="text-5xl mb-3">{item.image}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-purple-600 mb-3">
                        {item.price}
                      </p>
                      <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Saved Addresses
                </h2>

                {/* Shipping Address */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Shipping Address
                    </h3>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-900 font-medium">
                      {userData?.name}
                    </p>
                    <p className="text-gray-600">{userData?.street}</p>
                    <p className="text-gray-600">
                      {userData?.city}, {userData?.state} {userData?.pincode}
                    </p>
                    <p className="text-gray-600">{userData?.country}</p>
                    <p className="text-gray-600 mt-2">{userData?.phone}</p>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Billing Address
                    </h3>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-900 font-medium">
                      {userData?.name}
                    </p>
                    <p className="text-gray-600">{userData?.street}</p>
                    <p className="text-gray-600">
                      {userData?.city}, {userData?.state} {userData?.pincode}
                    </p>
                    <p className="text-gray-600">{userData?.country}</p>
                    <p className="text-gray-600 mt-2">{userData?.phone}</p>
                  </div>
                </div>

                <button className="mt-6 w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-purple-600 hover:text-purple-600 transition">
                  + Add New Address
                </button>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === "payment" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Methods
                </h2>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          **** **** **** 4532
                        </p>
                        <p className="text-sm text-gray-500">Expires 12/2026</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                      Default
                    </span>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                        MC
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          **** **** **** 8921
                        </p>
                        <p className="text-sm text-gray-500">Expires 08/2025</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  </div>
                </div>

                <button className="mt-6 w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-purple-600 hover:text-purple-600 transition">
                  + Add New Payment Method
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
