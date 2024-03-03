import { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ProfilePng from "../../../images/Profile.png";

import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/user-actions";

const Profile = ({ user }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const orders = () => {
    navigate("/order/me");
  };
  const account = () => {
    navigate("/profile");
  };
  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        className="speed-dial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar && user.avatar.url ? user.avatar.url : ProfilePng}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            key={item.name}
            tooltipOpen={window.innerWidth < 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};
export default Profile;
