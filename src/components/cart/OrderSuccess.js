import { Fragment } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <Fragment>
      <div className="orderSuccess">
        <CheckCircleIcon />
        <Typography>Your Order has been successfully placed</Typography>
        <Link to="/order/me">View Orders</Link>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
