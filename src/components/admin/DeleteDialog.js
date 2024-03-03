import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";

import "./DeleteDialog.css";

const DeleteDialog = ({
  title,
  message,
  open,
  deleteHandler,

  cancelHandler,
}) => {
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={cancelHandler}
        aria-labelledby="responsive-dialog-title"
        className="delete-dialog"
      >
        <DialogTitle id="responsive-dialog-title" textAlign={"center"}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cancelHandler}>
            Cancel
          </Button>
          <Button onClick={deleteHandler} autoFocus color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
