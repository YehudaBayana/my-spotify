import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface AreYouSurePromptProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const AreYouSurePrompt: React.FC<AreYouSurePromptProps> = ({ open, title, description, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
    <DialogTitle id="dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="dialog-description">{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">No</Button>
      <Button onClick={onConfirm} color="primary" autoFocus>Yes</Button>
    </DialogActions>
  </Dialog>
);

export default AreYouSurePrompt;
