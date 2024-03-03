// NavBar.js

import React, { Fragment, useState } from "react";
import "./Navbar.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import LoginOptions from "./LoginOptions";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import logo from "../../../images/logo.png";
import MobileNavbar from "./MobileNavbar";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleMenu = () => {
    setOpenMenu((prevState) => {
      return !prevState;
    });
  };

  return (
    <Fragment>
      <MobileNavbar isOpen={openMenu} toggleMenu={toggleMenu} />
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h3>GenieBazaar</h3>
          </Link>
          <button onClick={toggleMenu}>
            {openMenu ? (
              <i
                className="fas fa-times close-icon"
                style={{ padding: "0 0.5vmax" }}
              ></i>
            ) : (
              <i className="bx bx-menu-alt-right"></i>
            )}
          </button>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
            {cartItems.length > 0 && (
              <ShoppingCartCheckoutIcon
                style={{
                  color: "#A4782D",
                  fontSize: window.innerWidth < 600 ? "3vmax" : "1.4vmax",
                }}
              />
            )}
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div className="search-bar">
          <SearchBar />
          <div>
            {isAuthenticated && <Profile user={user} />}
            {!isAuthenticated && <LoginOptions />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
