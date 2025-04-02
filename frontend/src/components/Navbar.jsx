import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown } from 'react-icons/fa';
// import '../css/navv.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [sideOpen, setSideOpen]= useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const handleClick= (e, key)=> {
    e.preventDefault();

    navigate('/products',
      {state:{
        key:key
      }}
    )
  }

  return (
    <div className="flex item-center justify-between py-3 font-medium">
      <Link to={"/"}>
        <img src={assets.shopsneoLogo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-16 text-sm text-gray-700 d-flex align-items-center">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <div className="group relative">
          <span
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
            onClick={() => (setSideOpen(true))}
          >PRODUCT</span>
          <FontAwesomeIcon icon={faChevronDown} />

          {/* DROPDOWN */}
          {sideOpen && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4"  style={{zIndex:"1"}}>
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={(e) => handleClick(e,'clothes')}
                  className="cursor-pointer text-nowrap hover:text-black"
                >
                  Clothes
                </p>
                <p onClick={(e) => handleClick(e,'mobile')} className="cursor-pointer text-nowrap hover:text-black">
                  Mobiles
                </p>
                <p onClick={(e) => handleClick(e,'accessories')} className="cursor-pointer text-nowrap hover:text-black">
                  Accessories
                </p>
                <p onClick={(e) => handleClick(e,'laptops')} className="cursor-pointer text-nowrap hover:text-black">
                  Laptop/PCs
                </p>
                <p onClick={(e) => handleClick(e,'watches')} className="cursor-pointer text-nowrap hover:text-black">
                  Smart Watches
                </p>
                <p onClick={(e) => handleClick(e,'jewellery')} className="cursor-pointer text-nowrap hover:text-black">
                  Artificial Jewellery
                </p>
              </div>
            </div>
          )}
        </div>
      

       
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
          alt=""
        />

        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
            onClick={() => (token ? null : navigate("/login"))}
          />
          {/* DROPDOWN */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 "  style={{zIndex:"1"}}>
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black"  onClick={()=>navigate("/myProfile")}>My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
          alt=""
        />
      </div>

      {/* SIDEBAR MENU FOR SMALL SCREEN */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/"}
            className="py-2 pl-6 border"
          >
            HOME
          </NavLink>
          
          <NavLink
            onClick={() => setVisible(false)}
            to={"/collection"}
            className="py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/about"}
            className="py-2 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/contact"}
            className="py-2 pl-6 border"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
