import React from "react";
import MenImage from "../accest/MenImage.jpg";
import womenImage from "../accest/womenImage.jpg";
import mobile from "../accest/mobile.jpg";
import jwellery from "../accest/jwellery.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="overflow-x-scroll z-40  lg:overflow-hidden justify-start items-start px-3 flex lg:justify-center lg:items-center bg-white border border-solid border-t-0 border-stone-300   h-[60px] md:gap-16 gap-6 font-semibold text-slate-700 ">
      <Link to={"/men"}>
        <div className="cursor-pointer ">
          <div className="text-center">Men</div>
        </div>
      </Link>

      <Link to={"/women"}>
          <div className="text-center">Women</div>
      </Link>

      <Link to={"/kids"}>
          <div className="text-center">Kids</div>
      </Link>

      <Link to={"/watches"}>
          <div className="text-center">Watches</div>
      </Link>
      <Link to={"/malefootwear"}>
          <div className="text-center">Male Footwear</div>
      </Link>
      <Link to={"/femalefootwear"}>
          <div className="text-center">Female Footwear</div>
      </Link>
      <Link to={"/books"}>
          <div className="text-center">Books</div>
      </Link>
    </div>
  );
}

export default Header;
