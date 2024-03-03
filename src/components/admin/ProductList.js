import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { deleteProduct, fetchAdminProducts } from "../../store/product-actions";
import Loader from "../layout/loader/Loader";

import "./ProductList.css";
import { toast } from "react-toastify";
import { productActions } from "../../store/product-slice";
import DeleteDialog from "./DeleteDialog";

const ProductList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const { AdminLoading, AdminProducts, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteHandler = () => {
    dispatch(deleteProduct(id));
    setOpenDialog(false);
    setId("");
  };
  const cancelHandler = () => {
    setOpenDialog(false);
    setId("");
  };

  const rows = [];

  AdminProducts &&
    AdminProducts.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      flex: 0.5,
      minWidth: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      flex: 0.3,
      minWidth: 150,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 0.5,
      minWidth: 200,
    },
    {
      field: "reviews",
      headerName: "Reviews",
      type: "number",
      flex: 0.5,
      minWidth: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Link to={`/admin/reviews/product/${params.id}`}>
          <RateReviewIcon />
        </Link>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/product/${params.id}`}>
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
    dispatch(fetchAdminProducts());
    if (isDeleted) {
      dispatch(
        productActions.deleteProductReducer({
          isDeleted: false,
        })
      );
      toast.success("product deleted successfully");
    }
  }, [dispatch, isDeleted]);

  return (
    <Fragment>
      <MetaData title="All Products - Admin" />
      {AdminLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productList-container">
            <h1>All Products</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productList-table"
              autoHeight
            />
          </div>
          <DeleteDialog
            title={`Delete Product`}
            message={`Are you sure you want to delete this Product? All data will be removed of this Product if you delete it`}
            open={openDialog}
            deleteHandler={deleteHandler}
            cancelHandler={cancelHandler}
          />
        </div>
      )}
    </Fragment>
  );
};

export default ProductList;
