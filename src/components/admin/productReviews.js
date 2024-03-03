import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../layout/loader/Loader";

import "./ProductList.css";
import { toast } from "react-toastify";
import DeleteDialog from "./DeleteDialog";
import {
  deleteReviewByAdmin,
  fetchAllReviewsForAdmin,
} from "../../store/product-actions";
import { productActions } from "../../store/product-slice";

const ProductReviews = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewId, setReviewId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviews, reviewsLoading, reviewDeleted } = useSelector(
    (state) => state.product
  );
  const { id } = useParams();

  const deleteHandler = () => {
    dispatch(deleteReviewByAdmin(id, reviewId));
    setOpenDialog(false);
    setReviewId("");
  };
  const cancelHandler = () => {
    setOpenDialog(false);
    setReviewId("");
  };

  const rows = [];

  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        name: review.name,
        comment: review.comment,
        rating: review.rating,
      });
    });

  const columns = [
    {
      field: "id",
      headerName: "Review Id",
      flex: 0.5,
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 0.3,
      minWidth: 300,
      autoHeight: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      flex: 0.5,
      minWidth: 100,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 100,
      type: "number",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          className="delete-button"
          onClick={() => {
            setOpenDialog(true);
            setReviewId(params.id);
          }}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAllReviewsForAdmin(id));
    if (reviewDeleted) {
      dispatch(
        productActions.deleteReviewAdminReducer({
          isDeleted: false,
        })
      );
      toast.success("Review deleted successfully");
    }
  }, [dispatch, reviewDeleted, navigate, id]);

  return (
    <Fragment>
      <MetaData title="All Reviews - Admin" />
      <div className="dashboard">
        <Sidebar />
        {reviewsLoading ? (
          <Loader />
        ) : reviews && reviews.length > 0 ? (
          <Fragment>
            <div className="productList-container">
              <h1>All Reviews</h1>
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
              title={`Delete Review`}
              message={`Are you sure you want to delete this Review?`}
              open={openDialog}
              deleteHandler={deleteHandler}
              cancelHandler={cancelHandler}
            />
          </Fragment>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                font: "400 2vmax Roboto",
                color: "rgba(0, 0, 0, 0.664)",
              }}
            >
              No Reviews Yet
            </h3>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductReviews;
