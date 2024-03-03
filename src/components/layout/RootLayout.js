import { Fragment } from "react";
import NavBar from "./Header/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const RootLayout = () => {
  return (
    <Fragment>
      <NavBar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};
export default RootLayout;
