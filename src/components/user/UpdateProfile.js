import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FaceIcon from "@mui/icons-material/Face";
import Profile from "../../images/Profile.png";

import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { updateUser } from "../../store/user-actions";
import { userActions } from "../../store/user-slice";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { profileLoading, user, isUpdated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      avatar: avatar,
    };
    dispatch(updateUser(userData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar && user.avatar.url) {
        setAvatarPreview(user.avatar.url);
      }
      setAvatar(user.avatar);
    }
    if (isUpdated) {
      navigate("/profile");
      dispatch(
        userActions.profileReducer({
          isUpdated: false,
        })
      );
      toast.success("Profile updated successfully");
    }
  }, [isUpdated, user, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title="update profile" />
      {profileLoading ? (
        <Loader />
      ) : (
        <div className="updateProfile-container">
          <div className="updateProfile-box">
            <div>
              <p>Update Profile</p>
            </div>
            <form
              className="update-form"
              onSubmit={updateSubmitHandler}
              encType="multipart/form-data"
            >
              <div className="update-name">
                <FaceIcon />
                <input
                  type="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="update-email">
                <EmailOutlinedIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div id="update-image">
                <img src={avatarPreview} alt="avatar preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(event) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                      }
                    };
                    reader.readAsDataURL(event.target.files[0]);
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
export default UpdateProfile;
