import { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar";

import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../../store/product-actions";
import { fetchAdminOrders } from "../../store/order-actions";
import { fetchAllUsersByAdmin } from "../../store/user-actions";
import MetaData from "../layout/MetaData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { AdminProducts } = useSelector((state) => state.product);
  const { AdminOrders, AdminOrderTotalAmount } = useSelector(
    (state) => state.order
  );
  const { usersForAdmin } = useSelector((state) => state.user);

  let OutOfStock = 0;
  AdminProducts &&
    AdminProducts.forEach((item) => {
      if (item.stock === 0) {
        OutOfStock++;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, 4000],
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#B8C833", "#C84233"],
        hoverBackgroundColor: ["#6EC833", "#D56659"],
        data: [OutOfStock, AdminProducts && AdminProducts.length - OutOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAdminOrders());
    dispatch(fetchAllUsersByAdmin());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="dashboard">
        <MetaData title="Dashboard" />
        <Sidebar />
        <div className="dashboard-container">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboard-summary">
            <div>
              <p>
                Total Amount <br />{" "}
                {AdminOrderTotalAmount && AdminOrderTotalAmount}
              </p>
            </div>
            <div>
              <Link to="/admin/products">
                <p>Products</p>
                <p>{AdminProducts && AdminProducts.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{AdminOrders && AdminOrders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{usersForAdmin && usersForAdmin.length}</p>
              </Link>
            </div>
          </div>
          <div className="line-chart">
            <Line data={lineState} options={lineOptions} />
          </div>
          <div className="doughnut-chart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
