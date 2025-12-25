import React from "react";

function Card({ image, title, description, price}) {
  return (
    //     <!-- component -->
    // <!-- component -->
    <div
      className="flex flex-col text-gray-700 bg-white  cursor-pointer border border-solid border-stone-300 hover:shadow-md group bg-clip-border rounded-md w-40  md:w-64 h-[350px] "
    >
      <div className=" flex group-hover:scale-105 justify-center items-center mx-4 mt-4 overflow-hidden text-gray-700 bg-white hover:scale-105 bg-clip-border rounded-xl h-36 md:h-72">
        <img
          src={image}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900 clamp-2">
            {title}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal  text-gray-700 opacity-75 clamp-3">
          {description}
        </p>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
          Rs {price}
        </p>
      </div>
      {/* <div className="p-6 pt-0">
                        <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            type="button">
                            Add to Cart
                        </button>
                    </div> */}
    </div>
  );
}

export default Card;
