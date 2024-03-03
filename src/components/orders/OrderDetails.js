import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../../store/order-actions";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import { Typography } from "@mui/material";

import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { orderDetail, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);
  return (
    <Fragment>
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetails-container">
          <div className="orderDetails-box">
            <Typography component="h1">
              Order #{orderDetail && orderDetail._id}
            </Typography>
            <Typography>Shipping Info</Typography>
            <div className="orderDetails-box1">
              <div>
                <p>Name:</p>
                <span>{orderDetail.user && orderDetail.user.name}</span>
              </div>
              <div>
                <p>phone:</p>
                <span>
                  {orderDetail.shippingInfo && orderDetail.shippingInfo.phoneNo}
                </span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {orderDetail.shippingInfo &&
                    `${orderDetail.shippingInfo.address},
                    ${orderDetail.shippingInfo.city},
                    ${orderDetail.shippingInfo.state},
                    ${orderDetail.shippingInfo.pinCode},
                    ${orderDetail.shippingInfo.country}`}
                </span>
              </div>
            </div>
            <Typography>Payment</Typography>
            <div className="orderDetails-box1">
              <div>
                <p
                  className={
                    orderDetail.paymentInfo &&
                    orderDetail.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orderDetail.paymentInfo &&
                  orderDetail.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>
              <div>
                <p>Amount:</p>
                <span>{orderDetail.totalPrice && orderDetail.totalPrice}</span>
              </div>
            </div>
            <Typography>Order status</Typography>
            <div className="orderDetails-box1">
              <div>
                <p
                  className={
                    orderDetail.orderStatus &&
                    orderDetail.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orderDetail.orderStatus && orderDetail.orderStatus}
                </p>
              </div>
            </div>
          </div>
          <div className="orderDetails-cart">
            <Typography>Order Items:</Typography>
            <div>
              {orderDetail.orderItems &&
                orderDetail.orderItems.map((item) => (
                  <div key={item._id._id}>
                    <img src={item._id.image[0].url} alt="item" />
                    <Link to={`/product/${item._id._id}`}>{item._id.name}</Link>
                    <span>
                      {item.quantity} x ₹{item._id.price} ={" "}
                      <b>₹{item.quantity * item._id.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderDetails;
