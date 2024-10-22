import { MdMenu } from "react-icons/md";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useUser from "../../Security/useUser";
import useSmallScreen from "../../Hooks/useSmallScreen";

import Courses from "../../Page/Courses/Courses";

const NavbarTop = () => {
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, , refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`;

  // Cart count state
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = async () => {
    try {
      const res = await axiosSecure("/api/logout");
      if (res.data) {
        navigate("/login");
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        window.location.reload();
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen, setOpen]);
  const handleCartClick = () => {
    navigate("/cart"); 
  };
  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1">
      <ul className="flex gap-gap_primary justify-between px-pt_secondary">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>

        <div className="hidden lg:block"></div>

        <div className="flex flex-col items-center justify-center text-text_sm font-semibold relative group">
          <div className="flex items-center gap-8">
            <h1 className="text-blue-500 text-xl font-medium">
              {userData?.userData.name}
            </h1>
            {userData?.userData.image ? (
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={`${imgUrl}${userData.userData.image}`}
                alt=""
              />
            ) : (
              <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black" />
            )}

            {/* Cart Icon with Count */}
            <div className="relative">
              <FaShoppingCart className="text-2xl text-black cursor-pointer" onClick={handleCartClick}/>
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1" >
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </ul>

      <Courses cartCount={cartCount} setCartCount={setCartCount}  />
    </div>
  );
};

export default NavbarTop;
