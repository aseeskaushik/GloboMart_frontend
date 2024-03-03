import { Fragment, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserForAdmin,
  loadUser,
  updateUserByAdmin,
} from "../../store/user-actions";
import Loader from "../layout/loader/Loader";
import { userActions } from "../../store/user-slice";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userForAdmin, userLoading, isUpdatedByAdmin, updateLoading, user } =
    useSelector((state) => state.user);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name.replace(/[^\w\s]/gi, "") === "" ||
      email.replace(/[^\w\s]/gi, "") === ""
    ) {
      toast.error("Invalid entries");
      return;
    }
    const userData = {
      name: name,
      email: email,
      role: role,
    };
    dispatch(updateUserByAdmin(id, userData));
  };

  useEffect(() => {
    dispatch(fetchUserForAdmin(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(userForAdmin).length !== 0) {
      setName(userForAdmin.name);
      setEmail(userForAdmin.email);
      setRole(userForAdmin.role);
    }
  }, [userForAdmin]);

  useEffect(() => {
    if (isUpdatedByAdmin) {
      toast.success("User Updated Successfully");
      dispatch(
        userActions.updateUserByAdmin({
          loading: false,
          isUpdated: false,
        })
      );
      if (user._id === userForAdmin._id && role === "user") {
        navigate("/");
        dispatch(loadUser());
      } else {
        navigate("/admin/users");
      }
    }
  }, [dispatch, isUpdatedByAdmin, navigate, userForAdmin, user, role]);

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        {userLoading ? (
          <Loader />
        ) : (
          <div className="newProduct-container">
            <form className="newProduct-form" onSubmit={submitHandler}>
              <h1>Update User</h1>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button type="submit" disabled={updateLoading || role === ""}>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateUser;
