import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import { adminDeleteOrder, fetchAdminOrders } from "../../store/order-actions";
import { orderActions } from "../../store/order-slice";
import DeleteDialog from "./DeleteDialog";

// import "./ProductList.css";

const OrderList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const { AdminOrders, AdminLoading, isDeleted } = useSelector(
    (state) => state.order
  );

  const deleteHandler = () => {
    dispatch(adminDeleteOrder(id));
    setOpenDialog(false);
    setId("");
  };
  const cancelHandler = () => {
    setOpenDialog(false);
    setId("");
  };

  const rows = [];
  AdminOrders &&
    AdminOrders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      flex: 1,
      minWidth: 300,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
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
      minWidth: 200,
      type: "number",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/order/${params.id}`}>
            <EditIcon />
          </Link>
          <Button
            className="delete-button"
            onClick={() => {
              setOpenDialog(true);
              setId(params.id);
            }}
          >
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAdminOrders());
    if (isDeleted) {
      toast.success("Order deleted successfully");
      dispatch(
        orderActions.adminOrderDeleteReducer({
          isDeleted: false,
        })
      );
    }
  }, [dispatch, isDeleted]);
  return (
    <Fragment>
      <MetaData title="All Orders - Admin" />
      {AdminLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productList-container">
            <h1>All Orders</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              className="productList-table"
              autoHeight
            />
          </div>
          <DeleteDialog
            title={`Delete Order`}
            message={`Are you sure you want to delete this Order? All data will be removed of this Order if you delete it`}
            open={openDialog}
            deleteHandler={deleteHandler}
            cancelHandler={cancelHandler}
          />
        </div>
      )}
    </Fragment>
  );
};

export default OrderList;
