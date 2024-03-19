import { Fragment } from "react";
import logo from "../../images/logo.png";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Link } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAlt from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/admin/dashboard">
          <p>
            <Dashboard />
            Dashboard
          </p>
        </Link>
        <div>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem
              nodeId="1"
              label="Products"
              classes={{ label: "custom-tree-item-label" }}
            >
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>
              <Link to="/admin/product">
                <TreeItem nodeId="3" label="create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </div>
        <Link to="/admin/orders">
          <p>
            <ListAlt />
            Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <PeopleIcon />
            Users{" "}
          </p>
        </Link>
      </div>
    </Fragment>
  );
};

export default Sidebar;
