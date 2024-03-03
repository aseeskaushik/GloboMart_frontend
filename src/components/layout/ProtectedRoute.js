import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component, isAdmin }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
    return;
  };
  return (
    <Fragment>
      {isAuthenticated === false && redirectToLogin()}
      {isAdmin === true && user.role !== "admin" && redirectToLogin()}
      {component}
    </Fragment>
  );
};
export default ProtectedRoute;
