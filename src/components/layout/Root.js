import { Fragment } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";


const Root = () => {
  const { notification } = useSelector((state) => state.ui);
  return (
    <Fragment>
      <ToastContainer/>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      <Outlet />
    </Fragment>
  );
};
export default Root;
