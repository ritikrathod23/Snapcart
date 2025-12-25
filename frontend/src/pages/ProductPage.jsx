import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useGetProducts from "../Hooks/useGetProducts";

function ProductPage() {
  const { data: products, isLoading } = useGetProducts();
  

  const { pathname } = window.location;

  return (
    // <div>Hello</div>
    <div className="">
      {isLoading ? (
        <div className=" flex justify-center items-center flex-wrap gap-5  mt-4 ">
          {[...Array(10)].map((_, index) => (
            <Skeleton className="fixed" key={index} width={290} height={420} />
          ))}
        </div>
      ) : (
        <div className="flex py-5 overflow-auto justify-center items-center flex-wrap gap-5  mt-4 ">
          {products?.map((item, index) => (
            <Link key={index} to={`${pathname}/${item._id}`}>
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
      )}
    </div>
  );
}

export default ProductPage;
