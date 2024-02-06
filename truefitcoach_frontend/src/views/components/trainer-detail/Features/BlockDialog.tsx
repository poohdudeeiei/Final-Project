import Dialog from "@mui/material/Dialog";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface BlockDialogProps {
  open: boolean;
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
}

const BlockDialog: React.FC<BlockDialogProps> = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      scroll="body"
      
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "60%",
            maxWidth: "700px",
            height: "auto",
          },
        },
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          padding: "5% 3%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
          {"Do you want to Block eiei or not?"}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: "3%" }}>
        <Typography>Eiei can not be :</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <NotInterestedIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Watch your post" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <NotInterestedIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Send message to you" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <NotInterestedIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Liked you" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <NotInterestedIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Find you profile" />
          </ListItem>
        </List>
      </Box>
      <Divider />
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => handleClose(event, null)}
        >
          Disagree
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={(event) => handleClose(event, null)}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockDialog;
