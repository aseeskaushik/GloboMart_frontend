import { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { fetchAllOrders } from "../../store/order-actions";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

import "./UserOrders.css";

const UserOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  const columns = [
    { field: "id", headerName: "Order Id", flex: 1, minWidth: 300 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      flex: 0.3,
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 270,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={`${user.name}-orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="orders-container">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="orders-table"
            autoHeight
          />
          <Typography variant="body1">{user.name}'s orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default UserOrders;
