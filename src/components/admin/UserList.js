import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import {
  deleteUserByAdmin,
  fetchAllUsersByAdmin,
} from "../../store/user-actions";
import { userActions } from "../../store/user-slice";
import DeleteDialog from "./DeleteDialog";
import AdminHead from "../../images/admin_head.png";

// import "./ProductList.css";

const UserList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usersForAdmin, usersLoading, isDeleted, user } = useSelector(
    (state) => state.user
  );

  const deleteHandler = () => {
    dispatch(deleteUserByAdmin(id));
  };
  const cancelHandler = () => {
    setOpenDialog(false);
    setId("");
  };

  const rows = [];

  usersForAdmin &&
    usersForAdmin.forEach((user) => {
      rows.push({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    });

  const columns = [
    {
      field: "id",
      headerName: "User Id",
      flex: 0.5,
      minWidth: 300,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 1,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 150,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      minWidth: 150,
      sortable: false,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor";
      },
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
          {params.row.email !== "abc@gmail.com" ? (
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>
          ) : (
            <img
              src={AdminHead}
              alt="admin"
              style={{
                width: "3vmax",
                height: "3vmax",
                borderRadius: "50%",
                margin: "auto",
              }}
            />
          )}
          {params.row.email !== "abc@gmail.com" && (
            <Button
              className="delete-button"
              onClick={() => {
                setOpenDialog(true);
                setId(params.id);
              }}
            >
              <DeleteIcon />
            </Button>
          )}
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAllUsersByAdmin());
  }, [dispatch, isDeleted]);

  useEffect(() => {
    if (isDeleted) {
      setOpenDialog(false);
      if (id === user._id) {
        dispatch(
          userActions.userReducer({
            loading: false,
            user: {},
            isAuthenticated: false,
          })
        );
        navigate("/");
      } else {
        toast.success("User deleted successfully");
        dispatch(
          userActions.deleteUserByAdmin({
            isDeleted: false,
          })
        );
      }
      setId("");
    }
  }, [dispatch, isDeleted, navigate, id, user]);

  return (
    <Fragment>
      <MetaData title="All Users - Admin" />
      {usersLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productList-container">
            <p>All Users</p>
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
            title={`Delete User`}
            message={`Are you sure you want to delete this person? All data will be removed of this person if you delete it`}
            open={openDialog}
            deleteHandler={deleteHandler}
            cancelHandler={cancelHandler}
          />
        </div>
      )}
    </Fragment>
  );
};

export default UserList;
