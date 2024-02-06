import { Button, Typography, Dialog, useMediaQuery } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import DialogAssignAppointment from "./dialogAddAppointment/dialogAssignAppointment";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import Avatar from "@mui/material/Avatar";
import trainerImage from "../../../../../public/trainer-in-fitness-male3.png";
import DialogEditAssignAppointment from "./dialogEditAppointment/dialogEditAssignAppointment";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { SnackbarProvider, useSnackbar } from "notistack";
import { fetchDelete } from "@/services/api/fetcher";
import { APPOINTMENT_DELETE_EVENT } from "@/services/endpoint/trainer";
import { AssignedCustomerType } from "@/models/pages/trainer-mode/appointment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, useTheme } from "@mui/system";
import DynamicForm from "@/pages/dynamicForm1";
import { DialogProgress } from "./dialogProgressField/dialogProgresstField";
import { DialogCommentField } from "./DialogEditCommentField/dialogFieldComment";

type CustomerProps = {
  customerId: string;
  customer_name: string;
  course_name: string;
  trained: number;
};

interface ListCustomersDetail {
  customer?: CustomerProps;
  setEvents?: React.Dispatch<React.SetStateAction<ProcessedEvent[]>>;
  type?: string;
  assignedCustomer?: AssignedCustomerType;
  mutateAssign?: any;
  mutateAssigned?: any;
}

export default function AppointmentListCustomersDetail({
  customer,
  // setEvents,
  type,
  assignedCustomer,
  mutateAssign,
  mutateAssigned,
}: ListCustomersDetail) {
  const [assignOpen, setAssignOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [editFieldOpen, setEditFieldOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAssignOpen = () => {
    setAssignOpen(true);
  };

  const handleAssignClose = (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => {
    if (reason && reason == "backdropClick") {
      return;
    }
    setAssignOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickProgressOpen = () => {
    setProgress(true);
  };

  const handleProgressClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (assignedCustomer !== undefined) {
      handleClickProgressOpen();
    }
  };

  const handleProgressClose = (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => {
    if (reason && reason == "backdropClick") {
      return;
    }
    setProgress(false);
  };

  const handleEditFieldOpen = () => {
    setEditFieldOpen(true);
  };

  const handleEditFieldClose = (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => {
    if (reason && reason == "backdropClick") {
      return;
    }
    setEditFieldOpen(false);
  };

  const handleCancelAppoint = async (eventId: string) => {
    try {
      const deleteAssigned = await fetchDelete(
        eventId,
        APPOINTMENT_DELETE_EVENT
      );
      if (deleteAssigned && deleteAssigned?.status === 200) {
        mutateAssigned();
        enqueueSnackbar("Cancel assigned successful", { variant: "success" });
      } else {
        enqueueSnackbar("Cancel assigned failed", { variant: "error" });
      }
    } catch (error) {
      console.error("Error while canceling assigned:", error);
      enqueueSnackbar("Cancel assigned failed", { variant: "error" });
    }
    handleClose();
  };

  const theme = useTheme();
  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );
  const BreakPointBetween_sm_md = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const BreakPointBetween_md_lg = useMediaQuery(
    theme.breakpoints.between("md", "lg")
  );
  const BreakPointBetween_lg_xl = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointUp_lg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        bgcolor: "gray",
        paddingLeft: "10px",
        fontWeight: "600",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: "5px",
      }}
    >
      {type && type === "assigned" ? (
        <>
          <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Avatar alt={customer?.course_name}></Avatar>
            <Typography
              sx={{
                transition: "1s",
                fontSize: BreakPointDown_sm ? "12px" : "14px",
              }}
            >
              Customer : {assignedCustomer?.customer_name}
              <br />
              Course : {assignedCustomer?.course_name}
              <br />
              Round : {assignedCustomer?.trained}
              <br />
              Date : {assignedCustomer?.start.toDateString()} <br />
              Time : {
                assignedCustomer?.start.toTimeString().split(" ")[0]
              } - {assignedCustomer?.end.toTimeString().split(" ")[0]}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "5px" }}>
            {BreakPointDown_sm ? (
              <></>
            ) : (
              <Button
                variant="contained"
                color="success"
                sx={{ color: "white", fontSize: "10px", padding: "0px" }}
                onClick={handleProgressClick}
              >
                Summary
              </Button>
            )}
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: {
                    padding: "0px",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Button
                  variant="contained"
                  sx={{ color: "white", fontSize: "10px" }}
                  onClick={handleAssignOpen}
                >
                  edit
                </Button>
              </MenuItem>
              <MenuItem>
                {" "}
                <Button
                  variant="contained"
                  color="error"
                  sx={{ color: "white" }}
                  onClick={handleClickOpen}
                  startIcon={<DeleteIcon />}
                >
                  Cancel
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
                Cancel Assigned Appointment {assignedCustomer?.event_id}
              </Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to cancel the assigned appointment? Once
                canceled, the assignment will be removed and cannot be
                recovered.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  assignedCustomer &&
                  handleCancelAppoint(assignedCustomer.event_id)
                }
                autoFocus
              >
                Confirm Cancelation
              </Button>
            </DialogActions>
          </Dialog>
          {assignedCustomer && (
            <DialogProgress
              open={progress}
              handleClose={handleProgressClose}
              customer={assignedCustomer}
            />
          )}
          <DialogEditAssignAppointment
            open={assignOpen}
            setOpen={setAssignOpen}
            handleClose={handleAssignClose}
            customer={assignedCustomer}
            mutateAssigned={mutateAssigned}
          />
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Avatar alt={customer?.course_name}></Avatar>
            <Typography
              sx={{
                transition: "1s",
                fontSize: BreakPointDown_sm ? "12px" : "14px",
              }}
            >
              Customer : {customer?.customer_name}
              <br />
              Course : {customer?.course_name}
              <br />
              Trained : {customer?.trained}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={handleAssignOpen}
            >
              assign
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ color: "white" }}
              onClick={handleEditFieldOpen}
            >
              field
            </Button>
          </Box>
          <DialogAssignAppointment
            open={assignOpen}
            setOpen={setAssignOpen}
            handleClose={handleAssignClose}
            customer={customer}
            mutateAssign={mutateAssign}
            mutateAssigned={mutateAssigned}
          />
          <DialogCommentField
            open={editFieldOpen}
            customer={customer}
            handleClose={handleEditFieldClose}
          />
        </>
      )}
    </Box>
  );
}
