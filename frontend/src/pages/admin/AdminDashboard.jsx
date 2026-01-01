import React from "react";
import { FaUserShield } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import useGetDetails from "../../Hooks/useGetAllDetailsFroAdmin";
import useGetAllProducts from "../../Hooks/useGetAllProductForAdmin";

function AdminDashboard() {
  const { data: details } = useGetDetails();
  const { data: products } = useGetAllProducts();
  console.log("Admin Details:", products);

  const CardDetails = [
    {
      title: "Total Users",
      value: details ? details.totalUsers : "0",
      icon: <FaUserShield />,
      color: "from-green-700 to-green-300",
    },
    {
      title: "Total Orders",
      value: details ? details.totalOrders : "0",
      icon: <IoMdCart />,
      color: "from-pink-700 to-pink-300",
    },
    {
      title: "Total Products",
      value: details ? details.totalProducts : "0",
      icon: <IoBag />,
      color: "from-purple-700 to-purple-300",
    },
    {
      title: "Total Reviews",
      value: details ? details.totalReviews : "0",
      icon: <IoMdStar />,
      color: "from-yellow-700 to-yellow-300",
    },
  ];
  console.log(details);
  return (
    <div className="w-full overflow-x-hidden">
      {" "}
      {/* Changed to w-full and added overflow-x-hidden */}
      <div className="p-4 border border-zinc-200">
        <h2 className="text-2xl font-bold mb-4">E-Commerce</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cards container - spans 2 columns on medium screens and above */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CardDetails &&
              CardDetails.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                />
              ))}
          </div>

          {/* Total Sales container - spans 1 column but full width of its column */}
          <div className="md:col-span-1">
            <div className="flex bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 to-blue-300 border border-zinc-200 justify-between p-4 h-full rounded-lg text-white text-xl">
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col">
                  <p className="text-lg">Total Sales</p>
                  <p className="text-3xl font-bold mt-2">84651652</p>
                </div>
                <p className="text-sm opacity-80">Last Month</p>
              </div>
              <div className="flex items-start">
                <span className="text-2xl">icon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white shadow-sm overflow-hidden border mt-4 border-gray-200 rounded-lg">
          <div className="p-4 text-xl font-bold text-zinc-700">
            Best Selling products
          </div>

          <div className="overflow-x-auto">
            {" "}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-600 min-w-[800px]">
              {" "}
              {/* Added min-width */}
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </div>
              <div className="col-span-3">Product Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1">Stock</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Action</div>
            </div>
            {/* Product Cards */}
            {products &&
              products?.map((product) => <ProductCard product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

const Card = ({ title, value, icon, color }) => {
  return (
    <div
      className={`flex bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] ${color} border border-zinc-200 justify-between p-4 rounded-lg text-white text-xl h-48`} // Reduced height
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-lg">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <p className="text-sm opacity-80">Last Month</p>
      </div>
      <div className="flex p-3 w-12 h-12 bg-white bg-opacity-20 justify-center items-center rounded-lg">
        {" "}
        {/* Adjusted size */}
        <span className="text-2xl text-white">{icon}</span>{" "}
        {/* Changed to white */}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => (
  <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center min-w-[800px]">
    {" "}
    {/* Added min-width */}
    <div className="col-span-1 flex items-center">
      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
    </div>
    <div className="col-span-3 flex items-center space-x-3">
      <img
        src={product?.pImage}
        alt="Shirt"
        className="h-10 w-10 rounded object-cover"
      />
      <span className="text-gray-800">{product?.pName}</span>
    </div>
    <div className="col-span-2 text-gray-600">{product?.pCategory?.cName}</div>
    <div className="col-span-2 font-medium text-gray-800">Rs {product?.pPrice}</div>
    <div className="col-span-1 text-gray-600">{product?.pQuantity}</div>
    <div className="col-span-2">
      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
        Active
      </span>
    </div>
    <div className="col-span-1">
      <button className="text-blue-600 hover:text-blue-800 hover:underline">
        Details
      </button>
    </div>
  </div>
);
