import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDrawer } from "../contextApi/DrawerContext";
import Avatar from "react-avatar";
import useGetCartItems from "../Hooks/useGetCartItems";
import { ProfileMenu } from "./ProfileMenu";
import Cookies from "js-cookie";
import { useProfileIcon } from "../contextApi/ProfileIcon";

function Navbar() {
  const { user, myUser } = useProfileIcon();
  const { toggleDrawer } = useDrawer();
  const isAdminPage = location.pathname.startsWith("/admin");

  const { data: cartData } = useGetCartItems();
  const cartLength = cartData?.cart?.items?.length;
  return (
    <header
      className="
      header sticky top-0 h-[80px]
      bg-white border border-solid border-stone-300
      flex items-center justify-between 
      px-4 md:px-16 lg:px-48 py-2
      "
    >
      <div className="flex items-center justify-start gap-5">
        <button onClick={toggleDrawer}>
          <RxHamburgerMenu className="text-2xl md:hidden block " />
        </button>
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center justify-start">
            <img src={logo} alt="" className="w-10 h-10 mr-3 md:w-14 md:h-14" />
            <span className="font-semibold text-[#e09c27] text-2xl md:text-xl-  hidden md:block ">
              Snapcart
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      {/* search */}

      {!isAdminPage && (
        <form className=" hidden md:block max-w-md mx-auto ">
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 justify-end flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5  text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className=" md:w-96 h-10 w-full  p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              className=" hidden md:block text-white h-8 absolute end-2.5 bottom-2.5 bg-mycolor hover:bg-mycolornew focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 top-1 text-center content-center items-center py-2 "
            >
              Search
            </button>
          </div>
        </form>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-end space-x-4">
        <IoSearchSharp className="block md:hidden text-2xl" />

        <div className="flex gap-6 items-center">
          {!isAdminPage && myUser && (
            <Link to={"/cart"} className="relative">
              <MdOutlineShoppingCart className="text-xl md:text-3xl cursor-pointer" />
              {cartLength > 0 && (
                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  {cartLength}
                </div>
              )}
            </Link>
          )}
          {user && user ? (
            <ProfileMenu />
          ) : (
            <div className="flex gap-2">
              <Link to="login">
                <button className="px-4 py-2 text-yellow-900 hover:text-yellow-600 rounded-lg transition">Login </button>
              </Link>
              <Link to="register">
                <button className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition">Register </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
