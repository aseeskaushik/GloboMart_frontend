import { Fragment } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";

import ProfilePng from "../../images/Profile.png";
import { Link } from "react-router-dom";

import './Profile.css'

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Fragment>
      <MetaData title={`${user.name}'s profile`} />
      <div className="profile-container">
        <div>
          {/* <h1>My Profile</h1> */}
          <img
            src={user.avatar && user.avatar.url ? user.avatar.url : ProfilePng}
            alt={user.name}
          />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <Link to="/order/me">Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Profile;
