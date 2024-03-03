import { Fragment, useRef } from "react";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Payment.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../store/order-actions";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const submitHandler = async (event) => {
    event.preventDefault();
    payBtn.current.disabled = true;
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };
    const orderData = {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: shippingInfo.country,
      pinCode: shippingInfo.pinCode,
      phoneNo: shippingInfo.phoneNo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/v1/process/payment",
        { paymentData, token },
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(orderData));
          navigate("/success");
        } else {
          toast.error("There is some issue while processing payment");
          payBtn.current.disabled = false;
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.message);
    }
  };
  return (
    <Fragment>
      <MetaData title="payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <form className="payment-form" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="payment-input" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="payment-input" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="payment-input" />
          </div>
          <button type="submit" ref={payBtn}>{`Pay - ₹${
            orderInfo && orderInfo.totalPrice
          }`}</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
