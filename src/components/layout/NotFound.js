import { Fragment } from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  return (
    <Fragment>
      <div className="not-found">
        <h1>Page Not Found</h1>
        <Link to="/">Go To Home</Link>
      </div>
    </Fragment>
  );
};

export default NotFound;
