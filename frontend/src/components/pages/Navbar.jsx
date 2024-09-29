import { memo, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenuChange = (e) => {
    setMenu(!menu);
  };

  const result = useSelector((state) => state.product.cart);

  return (
    <header className="p-4 mx-w-[1200px] bg-slate-900 fixed right-0 left-0 z-10">
      <nav className="container  flex justify-between mx-auto md:text-lg items-center capitalize text-white lg:text-xl ">
        <div className="flex gap-4 justify-center items-center">
          <div className="home">
            <Link to="/">
              <FaHome />
            </Link>
          </div>
          <div className="logo">
            <Link
              to="/dashboard"
              className=" capitalize">
              go to dashboard
            </Link>
          </div>
          <div className="circle"></div>
        </div>

        <div className="md:flex hidden md:space-x-6 md:items-center">
          <Link to="/ecom">ecomm</Link>
          <div>
            <Link
              to="/cart"
              className=" relative">
              <span className=" absolute top-[-18px] left-[5px] bg-red-800">
                {result.length}
              </span>
              <FaCartArrowDown />
            </Link>
          </div>

          <Link to="/about">about us</Link>
          <Link to="/contact">contact us</Link>
          <Link to="/signup">sign up </Link>
          <Link to="/login">sign in </Link>
        </div>

        <div className="md:hidden">
          <button onClick={handleMenuChange}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`capitalize md:hidden text-white space-y-3  ${
          menu ? "block" : "hidden"
        }`}>
        <Link className="block">about us</Link>
        <Link className="block">contact us</Link>
        <Link className="block">sign up </Link>
        <Link className="block">sign in </Link>
      </div>
    </header>
  );
};

export default memo(Navbar);
