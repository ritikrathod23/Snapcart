import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function MobilesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true)
      const url =
        "https://real-time-flipkart-api.p.rapidapi.com/products-by-category?category_id=tyy%2C4io&page=1&sort_by=popularity";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "f6f76f7173msh52427597856ab78p125448jsn764df568ba7e",
          "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const detail = result.products;
        setData(detail);
        setLoading(false)
        console.log(result.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchedData();
  }, []);
  return (
    <div className="">
      {loading ? (
        <div  className="flex justify-center items-center flex-wrap gap-5  mt-4 " > 
          {[...Array(10)].map((_, index) => (
          <Skeleton key={index} width={290} height={420} />
        ))}
        </div>
      ) : (
      <div className="flex justify-center items-center flex-wrap gap-5  mt-4 ">
        {data.map((item) => (
          <Link to={`/product/${item.pid}`}>
          <Card
            
            title={item.title}
            image={item.images[0]}
            price={item.price}
            description={item.highlights}
          />
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}

export default MobilesPage;
