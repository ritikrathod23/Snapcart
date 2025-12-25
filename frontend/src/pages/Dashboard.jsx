import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ImageSlider from "../components/ImageSlider";
import CardCarosel from "../components/CardCarosel";
import CardCarousel from "../components/CardCarosel";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsCards from "../components/AdsCards";
import cover1 from "../assets/cover1.png";
import cover2 from "../assets/cover2.jpg";
import easyReturn from "../assets/easyReturn.png";
import topRated from "../assets/topRated.png";
import useGetProducts from "../Hooks/useGetProducts";

function Dashboard() {
  const {data: products, isLoading } = useGetProducts({limit:10});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    {
      src: cover1,
      alt: "Description 1",
    },
    {
      src: cover2,
      alt: "Description 2",
    },
    // Add more images
  ];

  useEffect(() => {
    setLoading(true);
    const fetchedData = async () => {
      await fetch("https://fakestoreapi.com/products?limit=10")
        .then((res) => res.json())
        .then((json) => setData(json));
      console.log("data", data);
      setLoading(false);
    };
    fetchedData();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center flex-wrap gap-5  mt-4 ">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} width={290} height={420} />
          ))}
        </div>
      ) : (
        <div className=" flex justify-center items-center flex-wrap gap-5  mt-4 ">

          {/* Ads Slider */}
          <div className="w-full">
            <ImageSlider images={images} />
          </div>

          {/* Image Slider */}
          <div className="w-full">
            <CardCarousel
              items={[
                {
                  key: 1,
                  Brand: "Brand 1",
                  Image:
                    "https://plus.unsplash.com/premium_photo-1683140435505-afb6f1738d11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpcnR8ZW58MHx8MHx8fDA%3D",
                  Price: "$99",
                  Description: "Description 1",
                },
                {
                  key: 2,
                  Brand: "Brand 2",
                  Image:
                    "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  Price: "$199",
                  Description: "Description 1",
                },
                {
                  key: 3,
                  Brand: "Brand 3",
                  Image:
                    "https://img.freepik.com/free-photo/portrait-young-woman-thinking_23-2149374967.jpg?ga=GA1.1.801273120.1718718239&semt=ais_hybrid&w=740",
                  Price: "$199",
                  Description: "Description 1",
                },
                {
                  key: 4,
                  Brand: "Brand 3",
                  Image:
                    "https://img.freepik.com/premium-photo/cool-fashion-model-with-blue-shirt-standing-against-red-wall_33839-11366.jpg?ga=GA1.1.801273120.1718718239&semt=ais_hybrid&w=740",
                  Price: "$199",
                  Description: "Description 1",
                },
                {
                  key: 5,
                  Brand: "Brand 3",
                  Image:
                    "https://img.freepik.com/premium-photo/man-wearing-black-shirt-portrait_133748-6684.jpg?ga=GA1.1.801273120.1718718239&semt=ais_hybrid&w=740",
                  Price: "$199",
                  Description: "Description 1",
                },
              ]}
            />
          </div>

          {/* Free Shipping banner */}
          <div className="w-full p-12">
            <div className="w-full h-20 flex justify-between px-4 items-center border-2 rounded-md border-solid border-mycolor">
              <div className=" flex items-center gap-5">
                <LiaShippingFastSolid className="text-5xl" />
                <p className="font-bold text-2xl uppercase">Free Shipping</p>
              </div>
              <p className="font-medium">
                Free Delivery on your first order and over 200 rs{" "}
              </p>
              <p className="text-2xl font-bold">-Only 200 Rs</p>
            </div>
          </div>

          {/* Ads Card  */}
          <AdsCards />

          {/* Popular Products */}
          <div className="">
            <div className="ml-14">
              <h2 className="text-2xl font-semibold">Popular Products</h2>
              <p>Do not miss the change, Buy nows</p>
            </div>
            <div className="flex flex-wrap mt-4 gap-6 justify-center ">
              {products?.map((item, index) => (
                <Link key={item.id} to={`${item.pCategory.cName}/${item._id}`}>
                  <Card
                    index={index}
                    title={item.pName}
                    image={item.pImage}
                    price={item.pPrice}
                    description={item.pDescription}
                  />
                </Link>
              ))}
            </div>
           
          </div>

          {/* Easy Return Top Rated Products banner */}
           <div className=" h-36 my-5 w-full items-center content-center px-12 ">
              <div className="h-28 border-2 flex justify-between px-8 rounded-md items-center border-solid border-mycolor">
                <div className="flex items-center gap-3">
                  {/* <LiaShippingFastSolid className="text-8xl" /> */}
                  <img src={easyReturn}  width={80} alt="" />
                  <div className="flex flex-col font-semibold items-center text-2xl">
                    <span>Easy</span>
                    <span>Return</span>
                  </div>
                </div>
                <div className="flex  items-center gap-3">
                  <img src={topRated}  width={80} alt="" />
                  <div className="flex flex-col font-semibold items-center text-2xl">
                    <span>Top Rated</span>
                    <span>Products</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <LiaShippingFastSolid className="text-8xl" />
                  <div className="flex flex-col font-semibold items-center text-2xl">
                    <span>Cash on</span>
                    <span>Delivery</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
