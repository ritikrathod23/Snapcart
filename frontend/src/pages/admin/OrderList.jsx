import React from "react";
import { CiFilter } from "react-icons/ci";
import { toast, Toaster } from "react-hot-toast";
// import useGetProducts from "../../Hooks/useGetProducts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useGetAllOrders from "../../Hooks/useGetAllOrders";
import useDeleteOrder from "../../Hooks/useDeleteOrder";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import formatDate from "../../helper/DateFormate";

function OrderList() {
  // const navigate = useNavigate();
  const { data: orders, isLoading, isFetching } = useGetAllOrders();
  const { mutate: deleteOrder } = useDeleteOrder();

  const handleDelete = (orderId) => {
    deleteOrder(orderId, {
      onSuccess: (data) => {
        if (data) {
          toast.success("Order deleted successfully");
        }
      },
      onError: () => {
        toast.error("Error deleting order");
      },
    });
  };

  return (
    <div className="w-screen mr-4 mt-4">
      <Toaster /> {/* Account for sidebar width */}
      {isLoading || isFetching ? (
        <div className="mt-6 w-full p-6">
          <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              {/* Header Skeleton */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 border-b border-gray-200">
                <Skeleton height={20} className="col-span-1" />
                <Skeleton height={20} className="col-span-2" />
                <Skeleton height={20} className="col-span-2" />
                <Skeleton height={20} className="col-span-2" />
                <Skeleton height={20} className="col-span-1" />
                <Skeleton height={20} className="col-span-2" />
                <Skeleton height={20} className="col-span-1" />
              </div>

              {/* Rows */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200"
                >
                  <Skeleton height={20} className="col-span-1" />
                  <Skeleton height={20} className="col-span-2" />
                  <Skeleton height={20} className="col-span-2" />
                  <Skeleton height={20} className="col-span-2" />
                  <Skeleton height={20} className="col-span-1" />
                  <Skeleton height={20} className="col-span-2" />
                  <Skeleton height={20} className="col-span-1" />
                </div>
              ))}
            </div>
          </SkeletonTheme>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center h-16 px-4  bg-white shadow-sm border  border-gray-200">
            <h1 className="text-xl  font-semibold text-gray-800">Order List</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 border flex gap-2 border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {/* <CiFilter className="text-2xl" /> */}
                Select All
              </button>
              <button
                className="px-4 py-2 bg-mycolor text-white rounded-sm hover:bg-mycolornew transition-colors"
                // onClick={() => navigate("/admin/products-list/add-product")}
              >
                Delete
              </button>
            </div>
          </div>
          {/* Products Table */}
          <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-600">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </div>
              <div className="col-span-2">Order Item</div>
              <div className="col-span-2">Customer</div>
              <div className="col-span-2">Order Date</div>
              {/* <div className="col-span-1">Pincode</div> */}
              <div className="col-span-1">Total Price</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Action</div>
            </div>

            {/* Product Cards */}
            {orders &&
              orders?.map((order) =>
                order?.orderItems?.map((items) => (
                  <ProductCard
                    key={items?.product._id}
                    order={order}
                    items={items}
                    handleDelete={() => handleDelete(order._id)}
                  />
                ))
              )}
          </div>
        </>
      )}
    </div>
  );
}

const ProductCard = ({ order, items, handleDelete }) => (
  <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center">
    <div className="col-span-1 flex items-center">
      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
    </div>
    <div className="col-span-2 flex items-center space-x-3">
      {/* <img
        src={order?.pImage}
        alt="Shirt"
        className="h-10 w-10 rounded object-cover"
      /> */}
      <span className="text-gray-800">{items?.product.pName}</span>
    </div>
    <div className="col-span-2 text-gray-600">{order?.user?.name}</div>
    <div className="col-span-2 w text-gray-800">
      <p>{formatDate(order?.createdAt)}</p>
    </div>
    {/* <div className="col-span-1 text-gray-600">{order?.shippingAddress?.pincode}</div> */}
    <div className="col-span-1 text-gray-600">{order?.totalAmount}</div>
    <div className="col-span-2">
      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
        {order?.status}
      </span>
    </div>
    <div className=" flex col-span-1 gap-3 ">
      <button className="text-blue-600 hover:text-blue-800 hover:underline">
        <EditIcon />
      </button>
      <button
        onClick={() => handleDelete(order._id)}
        className="text-red-600 hover:text-red-800 hover:underline"
      >
        <DeleteForeverIcon />
      </button>
    </div>
  </div>
);

export default OrderList;
