import React, {  useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/actions";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import useGetProductDetails from "../Hooks/useGetProductDetails";
import useGetProducts from "../Hooks/useGetProducts";
import Card from "../components/Card";
import useAddToCart from "../Hooks/useAddToCart";
import { Button, Rating } from "@material-tailwind/react";
import Review from "../components/Review";
import { useAuth } from "../contextApi/AuthContextProvider";
import useCheckout from "../Hooks/useCheckout";

function Product1() {
  const {mutate: checkout} = useCheckout();
  const{ isAuthenticated, user } = useAuth();
  const {
    data: productDetails,
    isLoading,
  } = useGetProductDetails();

  const [isSizeSelected, setIsSizeSelected] = useState(null);

  const productId = useParams().id;
  const { mutate: cartMutate } = useAddToCart();

  const { data: products } = useGetProducts();
  const dispatch = useDispatch();

  // Add to Cart Button Function
  const handleCartButton = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart.");
      return;
    }
    toast.success("Successfully added to cart!");
    dispatch(
      addItem({
        pid: productDetails._id,
        title: productDetails.pName,
        price: productDetails.pPrice,
        image: productDetails.pImage,
        quantity: 1,
      })
    );
    cartMutate({
      products: [{ productId: productDetails._id, quantity: 1 }],
    });
  };

  // Buy Now Button Function
  const handleBuyNow = () => {
    const orderItems = [{ product: productDetails._id, quantity: 1 }];
    
    checkout({
      orderItems,
      user: user.id,
    });
  };
  const handleSizeBtn = (size) => {
    setIsSizeSelected(size);
  };

  
  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      {isLoading ? (
        <div className="overflow-x-hidden md:flex items-center content-center gap-16 justify-center py-12 2xl:px-20 md:px-6 px-4">
          <div>
            <Skeleton width={400} height={500} />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <SkeletonTheme>
              <Skeleton width={600} height={70} />
              <Skeleton width={600} height={136} />
              <Skeleton width={600} height={48} />
              <Skeleton width={600} height={200} />
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        <div>
          {productDetails && (
            <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
              <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img
                  className="w-full"
                  alt="Product"
                  src={productDetails.pImage}
                />
              </div>  
              <div className="md:hidden">
                <img
                  className="w-full"
                  alt="Product"
                  src={productDetails.pImage}
                />
              </div>
              <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                  <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
                    {productDetails.pName}
                  </p>
                  <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
                    {productDetails.pName}
                  </h1>
                  <div className="my-3">
                    <Rating value={3} />
                  </div>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="text-base leading-4 text-gray-800 dark:text-gray-300">
                    {productDetails.pDescription}
                  </div>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                  <p className="text-base font-bold leading-4 text-gray-800 dark:text-gray-300">
                    <span className="line-through font-normal">Rs </span>
                    Rs {productDetails.pPrice}
                  </p>
                </div>
                <div>
                  <div className="flex flex-col my-8 gap-5">
                    <p className=" tracking-wider  leading-4 text-gray-800 font-bold dark:text-gray-300">
                      SELECT SIZE
                    </p>
                    <div className="text-xl text-gray-700 ">
                      {productDetails?.pSize &&
                        productDetails?.pSize.map((size, index) => (
                          <span
                            onClick={()=> handleSizeBtn(size)}
                            key={index}
                            className={`border border-gray-300 hover:border-mycolor  ${isSizeSelected == size ? "border-mycolor" : "border-gray-700" } cursor-pointer rounded-lg ml-3 p-2`}
                          >
                            {size}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex z-10  gap-1  justify-around md:mt-3 fixed bottom-0 w-full md:relative md:bottom-0 md:w-auto md:justify-start bg-white md:bg-transparent py-4 md:py-0 px-4 md:px-0">
                  <button
                    onClick={handleBuyNow}
                    className="text-base rounded flex items-center justify-center leading-none text-white bg-mycolor w-36 md:w-40 py-4 hover:bg-mycolornew"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleCartButton}
                    className=" rounded text-base flex items-center justify-center leading-none text-white bg-mycolor w-36 md:w-40 py-4 hover:bg-mycolornew"
                  >
                    Add to Cart
                  </button>
                </div>
                <div>
                  <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
                    {productDetails.pDescription}
                  </p>

                  {/* Additional product specifications can go here */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Similar products section */}
      <div className="mt-20 mb-10 ">
        <p className="px-16 text-xl font-bold ">SIMILAR PRODUCTS</p>
        <div className="flex overflow-auto justify-center items-center flex-wrap gap-5  mt-4 ">
          {products
            ?.filter((pro) => pro._id !== productId)
            .map((item, index) => (
              <Link key={index} to={`/men/${item._id}`}>
                <Card
                  // key={index}
                  title={item.pName}
                  image={item.pImage}
                  price={item.pPrice}
                  description={item.pDescription}
                />
              </Link>
            ))}
        </div>
      </div>

      {/* Review section */}
      {/* <div className="my-20 px-24 w-full"> */}
        <Review />
      {/* </div> */}
    </>
  );
}

export default Product1;
