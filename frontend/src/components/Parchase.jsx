import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddOrders from "../Hooks/useAddOrders";
import useCheckout from "../Hooks/useCheckout";

function Parchase({ cartData }) {
  const { mutate: checkout } = useCheckout();

  const products = cartData?.cart?.items;
  const allPrices = products?.map(
    (item) => item?.product?.pPrice * item?.quantity
  );
  const totalAmount = allPrices?.reduce((acc, item) => acc + item, 0);

  // const items = useSelector((state) => state.cart);

  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user)?.user._id : null;

  const handleCheckOut = () => {
    const orderItems = cartData?.cart?.items?.map((item) => ({
      product: item.product._id, // Just send product ID
      quantity: item.quantity,
    }));

    checkout({
      orderItems,
      user: cartData?.cart?.user,
    });
  };

  return (
    <>
      <Toaster position="top-center " />
      <div className="flex flex-col w-full h-fit gap-4 md:px-4 px-0 p-4">
        <p className="text-mycolor text-xl font-extrabold">Purchase</p>

        <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Subtotal ({products?.length} Items)</p>
            <p className="text-end font-bold"></p>
          </div>
          <hr className="bg-gray-200 h-0.5" />
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Amount</p>
            <div>
              <p className="text-end font-bold">{totalAmount}</p>
              {/* <p className="text-gray-600 text-sm font-normal">Arrives on Jul 16</p> */}
            </div>
          </div>
          <hr className="bg-gray-200 h-0.5" />
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Delivery Charges</p>
            <span className="text-gray-500 text-lg ">40</span>
          </div>
          <hr className="bg-gray-200 h-0.5" />
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Total</p>
            <div>
              <p className="text-end font-bold">{totalAmount + 40}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCheckOut}
              className="transition-colors text-sm bg-mycolor hover:bg-mycolornew p-2 rounded-sm w-full text-white text-hover shadow-md"
            >
              CheckOut
            </button>
            <Link to={"/"}>
              <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                ADD MORE PRODUCTS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Parchase;
