import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import "./ChangePassword.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { userActions } from "../../store/user-slice";
import MetaData from "../layout/MetaData";
import { updatePassword } from "../../store/user-actions";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { profileLoading, isUpdated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeSubmitHandler = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New and Confirm passwords are not matched");
      return;
    }
    const passwords = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/profile");
      dispatch(
        userActions.profileReducer({
          isUpdated: false,
        })
      );
      toast.success("password changed successfully");
    }
  }, [isUpdated, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title="Channge Password" />
      {profileLoading ? (
        <Loader />
      ) : (
        <div className="changePassword-container">
          <div className="changePassword-box">
            <div>
              <p>Change Password</p>
            </div>
            <form
              className="changePassword-form"
              onSubmit={changeSubmitHandler}
            >
              <div className="old-password">
                <VpnKeyIcon />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(event) => {
                    setOldPassword(event.target.value);
                  }}
                />
              </div>
              <div className="new-password">
                <LockOpenOutlinedIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                  }}
                />
              </div>
              <div className="confirm-password">
                <LockOpenOutlinedIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default ChangePassword;
