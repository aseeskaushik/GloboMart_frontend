import { Fragment } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address},
    ${shippingInfo.city},
    ${shippingInfo.state},
    ${shippingInfo.pinCode},
    ${shippingInfo.country}`;

  const proceedHandler = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="confirm order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrder-container">
        <div>
          <div className="confirmShipping">
            <Typography>Shipping Info</Typography>
            <div className="confirmShipping-box">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCart">
            <Typography>Confirm Cart Items</Typography>
            <div className="confirmCart-box">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item._id}>
                    <img src={item.image} alt="item" />
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} =
                      <b> ₹{item.quantity * item.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div className="orderSummary-box">
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummary-total">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedHandler}>Proceed to payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
