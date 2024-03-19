import { Fragment } from "react";
import logo from "../../../images/logo.png";
import "./MobileNavbar.css";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MobileNavbar = ({ isOpen, toggleMenu }) => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <div
        className={`mobile-menu ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="mobile-menu-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h3>GenieBazaar</h3>
            </Link>
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
                    color: "#67727D",
                    fontSize: window.innerWidth < 600 ? "3vmax" : "1.4vmax",
                  }}
                />
              )}
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileNavbar;
