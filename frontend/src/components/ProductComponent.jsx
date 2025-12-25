import React from "react";
import { CiFilter } from "react-icons/ci";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ProductComponent({Name, TableHead, data}) {
  return (
    <div className="w-full mr-4 mt-4">
      {" "}
      {/* Account for sidebar width */}
      {/* Header Section */}
      <div className="flex justify-between items-center h-16 px-4  bg-white shadow-sm border border-gray-200">
        <h1 className="text-xl  font-semibold text-gray-800">{Name}</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 border flex gap-2 border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <CiFilter className="text-2xl" />
            Filter
          </button>
          <button
            className="px-4 py-2 bg-mycolor text-white rounded-sm hover:bg-mycolornew transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
      {/* Products Table */}
      <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-600">
          <div className="col-span-1 flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
          </div>
          <div className="col-span-3">{TableHead.col1}</div>
          <div className="col-span-2">{TableHead.col2}</div>
          <div className="col-span-2">{TableHead.col3}</div>
          <div className="col-span-1">{TableHead.col4}</div>
          <div className="col-span-2">{TableHead.col5}</div>
          <div className="col-span-1">Action</div>
        </div>

        {/* Product Cards */}
        {data && data.map((item) => (
          <ProductCard data={item} />
        ))} 
      </div>
    </div>
  );
}

const ProductCard = ({data}) => (
  <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center">
    <div className="col-span-1 flex items-center">
      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
    </div>
    <div className="col-span-3 flex items-center space-x-3">
      <img
        src={data?.pImage}
        alt="Shirt"
        className="h-10 w-10 rounded object-cover"
      />
      <span className="text-gray-800">{data?.name}</span>
    </div>
    <div className="col-span-2 text-gray-600">{data?.email}</div>
    <div className="col-span-2 font-medium text-gray-800">sdf</div>
    <div className="col-span-1 text-gray-600">{data?.city}</div>
    <div className="col-span-2">
      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
        {data?.phone}
      </span>
    </div>
    <div className=" flex col-span-1 gap-3 ">
      <button className="text-blue-600 hover:text-blue-800 hover:underline">
        <EditIcon />
      </button>
      <button className="text-red-600 hover:text-red-800 hover:underline">
        <DeleteForeverIcon />
      </button>
    </div>
  </div>
);

export default ProductComponent;
