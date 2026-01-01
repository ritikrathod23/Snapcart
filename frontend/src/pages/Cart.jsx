import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Parchase from "../components/Parchase";
import { Link } from "react-router-dom";

import { MdDeleteOutline } from "react-icons/md";
import { deleteItem, addQty, deleteQty } from "../redux/actions";
import useGetCartItems from "../Hooks/useGetCartItems.js";
import useDeleteCartItems from "../Hooks/useDeleteCartItems.js";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuth } from "../contextApi/AuthContextProvider.jsx";
import Skeleton from 'react-loading-skeleton'


function Cart() {
  const { isAuthenticated } = useAuth();
  const { mutate: deleteItem } = useDeleteCartItems();
  const { data: cartData, isLoading } = useGetCartItems();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  const len = cartData?.cart?.items?.length;

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center flex-col gap-6 items-center text-center text-3xl mt-28">
        Please login to view your cart
        <Link to={"/login"} className="block">
          <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-mycolor rounded w-40 py-4 hover:bg-gray-700">
            Login
          </button>
        </Link>
      </div>
    );
  }

  if (len === 0) {
    return (
      <div className="flex justify-center flex-col gap-6 items-center text-center text-3xl mt-28">
        No cart available, Please add
        <Link to={"/"} className="block">
          <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-mycolor rounded w-40 py-4 hover:bg-mycolornew">
            Shop
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <>
        {/* <!-- component --> */}
        <div className="flex flex-col   md:flex-row w-full h-full sm:px-14  px-4 py-7">
          {/* <!-- My Cart --> */}

          <div className="w-full  flex flex-col h-full gap-4 p-4 ">
            <p className="text-mycolor text-xl font-extrabold">My cart</p>
            {isLoading ? <Skeleton count={5} height={150} className="mb-4"/> : null}
            {/* <!-- Product --> */}
            {cartData &&
              cartData?.cart?.items?.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-col  p-4 text-lg font-semibold shadow-md border rounded-sm">
                    <div className=" flex justify-between">
                      <div className="flex flex-col md:flex-row gap-3 justify-between">
                        {/* <!-- Product Information --> */}
                        <div className="flex flex-row gap-6 items-center">
                          <div className="w-28 h-28">
                            <img
                              className="w-full h-full"
                              src={item?.product?.pImage}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-lg text-gray-800 font-semibold">
                              {item?.product?.pName}
                            </p>
                            {/* <p className="text-xs text-gray-600 font-semibold">
                              color
                              <span className="font-normal">{item?.product?.pSize}</span>
                            </p> */}
                            <p className="text-sm text-gray-600 font-semibold">
                              Price:{" "}
                              <span className="font-normal">
                                {item?.product?.pPrice}
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* <!-- Price Information --> */}
                        <div className="self-center text-center">
                          {/* <p className="text-gray-600 font-normal text-sm line-through">
                                                <span className="text-emerald-500 ml-2">(-50% OFF)</span>
                                            </p> */}
                          <p className="text-gray-800 font-normal text-xl">
                            {item.price}
                          </p>
                        </div>
                        {/* <!-- Remove Product Icon --> */}
                        <div className="self-center">
                          <button className="">
                            <img src="image" alt="" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <ClearIcon
                          className="hover:text-blue-gray-600 cursor-pointer"
                          onClick={() => handleDeleteItem(item._id)}
                        />
                      </div>
                    </div>

                    {/* <!-- Product Quantity --> */}
                            
                    
                  </div>
                </div>
              ))}
          </div>

          {/* <!-- Purchase Resume --> */}
          <Parchase button={true} cartData={cartData} />
        </div>
      </>
    );
  }
}

export default Cart;
