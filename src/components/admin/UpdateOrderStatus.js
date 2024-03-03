import { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "../layout/loader/Loader";
import { adminUpdateOrder, fetchOrderDetails } from "../../store/order-actions";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

// import "./ConfirmOrder.css";
import "./UpdateOrderStatus.css";
import { toast } from "react-toastify";
import { orderActions } from "../../store/order-slice";

const UpdateOrderStatus = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { orderDetail, loading, updateLoading, isUpdated } = useSelector(
    (state) => state.order
  );
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const orderData = {
      status: status,
    };
    dispatch(adminUpdateOrder(id, orderData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Status updated successfully");
      dispatch(
        orderActions.adminOrderUpdateReducer({
          isUpdated: false,
          loading: false,
        })
      );
      navigate("/admin/orders");
    }
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id, isUpdated, navigate]);

  return (
    <Fragment>
      <MetaData title="update order status" />
      <div className="dashboard">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div
            className="confirmOrder-container"
            style={{
              display:
                orderDetail.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="orderDetails-box">
                <Typography>Shipping Info</Typography>
                <div className="orderDetails-box1">
                  <div>
                    <p>Name:</p>
                    <span>{orderDetail.user && orderDetail.user.name}</span>
                  </div>
                  <div>
                    <p>phone:</p>
                    <span>
                      {orderDetail.shippingInfo &&
                        orderDetail.shippingInfo.phoneNo}
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
                    <span>
                      {orderDetail.totalPrice && orderDetail.totalPrice}
                    </span>
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
                <Typography>Order Items</Typography>
                <div>
                  {orderDetail.orderItems &&
                    orderDetail.orderItems.map((item) => (
                      <div key={item._id._id}>
                        <img src={item._id.image[0].url} alt="item" />
                        <Link to={`/product/${item._id._id}`}>
                          {item._id.name}
                        </Link>
                        <span>
                          {item.quantity} x ₹{item._id.price} ={" "}
                          <b>₹{item.quantity * item._id.price}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {orderDetail.orderStatus !== "Delivered" && (
              <div className="updateOrder">
                <form className="updateOrder-form" onSubmit={submitHandler}>
                  <h1>Process Order</h1>
                  <div>
                    <AccountTreeIcon />
                    <select
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                    >
                      <option value="">Choose Status</option>
                      {orderDetail.orderStatus === "processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {orderDetail.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={
                      updateLoading
                        ? true
                        : false || status === ""
                        ? true
                        : false
                    }
                  >
                    Update
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateOrderStatus;
