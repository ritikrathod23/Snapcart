import React from "react";

const images = [
  "https://rukminim3.flixcart.com/fk-p-flap/886/475/image/a83ed71a398dd369.jpg?q=60",
  "https://rukminim3.flixcart.com/fk-p-flap/886/475/image/750a64784d4dab42.jpg?q=60",
  "https://rukminim3.flixcart.com/fk-p-flap/886/475/image/1bcba2663e42a604.jpg?q=60",
  "https://rukminim3.flixcart.com/fk-p-flap/886/475/image/2d96df1f04fa9263.jpg?q=60",
  "https://rukminim3.flixcart.com/fk-p-flap/886/475/image/f37867643275d5c0.jpg?q=60",
  "https://rukminim3.flixcart.com/fk-p-flap/886/475/image/0cb74294a7cfa500.jpg?q=60",
];

function AdsCards() {
  return (
    <div className="flex justify-center items-center flex-wrap">
      {images.map((image, index) => (
        <div key={index} className="w-[465px]">
          <img className="-hue-rotate-15" src={image} alt="" />
        </div>
      ))}
    </div>
  );
}

export default AdsCards;
