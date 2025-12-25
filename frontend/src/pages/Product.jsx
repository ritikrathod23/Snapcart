import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/actions";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Product() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState({});
    const [image, setImage] = useState([]);
    const [specification, setSpecification] = useState([]);
    const [rating, setRating] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true);
            const url = `https://real-time-flipkart-api.p.rapidapi.com/product-details?pid=${id}`;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "f6f76f7173msh52427597856ab78p125448jsn764df568ba7e",
                    "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
                },
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result);
                setImage(result.images || []);
                setSpecification(result.specifications || []);
                setRating(result.rating || []);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchdata();
    }, [id]);

    const handleCartButton = (e) => {
        e.preventDefault();
        toast.success("Successfully added to cart!");
        dispatch(addItem({pid: data.pid ,title: data.title, price: data.price, image: image[0], quantity:1 }));
    };

    return (
        <>
            <Toaster position="top-center" />

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
                <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
                    {image.length > 0 && (
                        <div className="xl:w-2/6 lg:w-2/5 w-80">
                            <img className="w-full" alt="image" src={image[0]} />
                            <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                                {image.slice(1, 5).map((imgSrc, index) => (
                                    <img key={index} alt="no image" className="lg:w-20 w-20" src={imgSrc} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                        <div className="border-b border-gray-200 pb-6">
                            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">{data.brand}</p>
                            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
                                {data.title}
                            </h1>
                        </div>

                        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="text-base leading-4 text-gray-800 dark:text-gray-300">
                                <b className="text-gray-500 pb-2">Highlights:</b>
                                {data.highlights && data.highlights.length > 0 ? (
                                    data.highlights.map((highlight, index) => (
                                        <div key={index} className="m-2">{highlight}</div>
                                    ))
                                ) : (
                                    <p className="text-base text-gray-500 dark:text-gray-400">No highlights available</p>
                                )}
                            </div>
                        </div>

                        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                            <p className="text-base font-bold leading-4 text-gray-800 dark:text-gray-300">
                                <span className="line-through font-normal">Rs {data.mrp}</span> Rs {data.price}
                            </p>
                        </div>
                        {/* <div className="absolute bottom-3">
                                    jeelle asnksj asj kak aslknksaln 
                        </div> */}

                        <div className="flex gap-3 justify-around lg:mt-3 fixed bottom-0 lg:relative lg:bottom-0">
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-40 py-4 hover:bg-gray-700">
                                Buy Now
                            </button>
                            <button onClick={handleCartButton} className="right-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-40 py-4 hover:bg-gray-700">
                                Add to Cart
                            </button>
                        </div>

                        <div>
                            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
                                {data.description}
                            </p>

                            <div className="text-base leading-4 mt-7 text-gray-500">
                                <b>Available Offers:</b>
                                {data.offers ? data.offers.slice(0, 5).map((item, index) => (
                                    <p key={index} className="py-2">{item}</p>
                                )) : "No offers available"}
                            </div>
                        </div>

                        <div className=" h-auto text-gray-500">
                            <div className=" px-4 font-bold border-2 border-opacity-50 border-b-0">Specifications</div >
                            <div className="flex flex-col p-4 border-2 border-opacity-50 ">
                                {Object.keys(specification).length > 0 ? (
                                    Object.entries(specification).map(([category, attributes], index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="font-bold text-gray-700">{category}</h3>
                                            <div className="ml-2">
                                                {Object.entries(attributes).map(([attrName, attrValue], idx) => (
                                                    <div key={idx} className="flex justify-between">
                                                        <span className="font-semibold" >{attrName}</span>
                                                        <span>{attrValue[0]}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No specifications available</p>
                                )}
                            </div>
                        </div>

                        <div className=" text-gray-500 mt-4">
                            <div className="border-2 border-opacity-50 border-b-0 border-gray-300 px-3  text-xl " >Reviews and Rating</div>
                            <div className="flex flex-col  border-opacity-50 p-4 border-solid border-2 border-gray-300 h-auto">
                                {Object.keys(rating).length > 0 ? (
                                    Object.entries(rating).map(([cataegory, attributes], index) => (
                                        <div key={index}  >
                                            <h3 className="font-bold">{cataegory}</h3>
                                            <div className="ml-2">
                                                {Object.entries(attributes).map(([attrName, attrValue], idx) =>(
                                                    <div className="flex justify-between" key={idx}>
                                                        <span className="font-semibold">{attrName}</span>
                                                        <span>{attrValue}</span>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews available</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;
