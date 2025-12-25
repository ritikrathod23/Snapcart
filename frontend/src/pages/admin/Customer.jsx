import React from "react";
import { CiFilter } from "react-icons/ci";
import useGetAllUsers from "../../Hooks/useGetAllUsers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useDeleteCategory from "../../Hooks/useDeleteCategory";
import toast, { Toaster } from "react-hot-toast";

function Customer() {
  const { data: customer } = useGetAllUsers();
  console.log("customer data:", customer);
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = async (categoryId) => {
    console.log("delete", categoryId);
    try {
      await deleteCategory  (categoryId, {
        onSuccess: () => {
          toast.success("Category deleted successfully");
        },
        onError: () => {
          toast.error("Error deleting category");
        },
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="w-screen mr-4 mt-4">
      <Toaster position="top-center" /> {/* Account for sidebar width */}
      {/* Header Section */}
      <div className="flex justify-between items-center h-16 px-4  bg-white shadow-sm border border-gray-200">
        <h1 className="text-xl  font-semibold text-gray-800">Customer List</h1>
        {/* <div className="flex space-x-4">
          <button className="px-4 py-2 border flex gap-2 border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <CiFilter className="text-2xl" />
            Filter
          </button>
          <button className="px-4 py-2 bg-mycolor text-white rounded-sm hover:bg-mycolornew transition-colors">
            Add Category
          </button>
        </div> */}
      </div>
      {/* Products Table */}
      <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-10 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-600">
          <div className="col-span-1 flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
          </div>
          <div className="col-span-3">Customer Name</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-1">City</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-1">Action</div>
        </div>

        {/* Product Cards */}
        {customer &&
          customer?.map((cus) => (
            <ProductCard handleDelete={handleDelete} cus={cus} key={cus._id} />
          ))}
      </div>
    </div>
  );
}

const ProductCard = ({ cus, handleDelete }) => (
  <div className="grid grid-cols-10 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center">
    <div className="col-span-1 flex items-center">
      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
    </div>
    <div className="col-span-3 flex items-center space-x-3">
      {/* <img
        src={cus?.cImage}
        alt="Shirt"
        className="h-16 w-16 rounded object-cover"
      /> */}
      <span className="text-gray-800">{cus?.name}</span>
    </div>
    <div className="col-span-2 text-justify text-gray-600">
      {cus?.email }
    </div>
    {/* <div className="col-span-2 font-medium text-gray-800">$29.99</div> */}
    <div className="col-span-1 text-gray-600">{cus?.city}</div>
    <div className="col-span-2">
      {cus?.phone}
    </div>
    <div className="col-span-1">
      <div className=" flex col-span-1 gap-3 ">
        <button className="text-blue-600 hover:text-blue-800 hover:underline">
          <EditIcon />
        </button>
        <button
          onClick={() => {
            handleDelete(cus._id);
          }}
          className="text-red-600 hover:text-red-800 hover:underline"
        >
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  </div>
);
export default Customer;
