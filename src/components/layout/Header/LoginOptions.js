import { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ProfilePng from "../../../images/Profile.png";

import "./Profile.css";

import { useNavigate } from "react-router-dom";

const LoginOptions = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

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
        icon={<img className="speedDialIcon" src={ProfilePng} alt="Profile" />}
      >
        <SpeedDialAction
          icon={<LoginIcon />}
          tooltipTitle="login"
          onClick={() => {
            navigate("/login");
          }}
        />
      </SpeedDial>
    </Fragment>
  );
};
export default LoginOptions;
