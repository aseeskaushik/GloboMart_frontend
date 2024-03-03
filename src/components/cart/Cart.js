import { Fragment } from "react";
import MetaData from "../layout/MetaData";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart-actions";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increment = (item) => {
    if (item.stock <= item.quantity) {
      return;
    }
    dispatch(addToCart(item, item.quantity + 1));
  };

  const decrement = (item) => {
    if (item.quantity <= 1) {
      return;
    }
    dispatch(addToCart(item, item.quantity - 1));
  };

  const removeItemHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title="Cart" />
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <RemoveShoppingCartIcon />
          <Typography>No product in your cart</Typography>
          <Link to="/products">view products</Link>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-header">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <div className="cart-container" key={item._id}>
                <CartItemCard
                  item={item}
                  removeItemHandler={() => removeItemHandler(item._id)}
                />
                <div className="cart-input">
                  <button onClick={() => decrement(item)}>-</button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={() => increment(item)}>+</button>
                </div>
                <p className="cart-subtotal">{`₹${
                  item.quantity * item.price
                }`}</p>
              </div>
            ))}

          <div className="cart-container-2">
            <div></div>
            <div className="cart-total">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkout-button">
              <button onClick={checkoutHandler}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Cart;
