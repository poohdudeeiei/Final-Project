import {
  Box,
  Button,
  Typography,
  Dialog,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { SnackbarProvider, useSnackbar } from "notistack";
import { UseFormHandleSubmit } from "react-hook-form";
import { AssignedCustomerType } from "@/models/pages/trainer-mode/appointment";
import { MouseEventHandler, useEffect, useState } from "react";
import FormRender from "@/views/components/dynamic-form/form-render";
import DynamicForm from "./dynamicForm";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

interface DialogCommentListType {
  customer?: CustomerProps;
  open: boolean;
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
}
type CustomerProps = {
  customerId: string;
  customer_name: string;
  course_name: string;
  trained: number;
};

export const DialogCommentField = ({
  customer,
  handleClose,
  open,
}: DialogCommentListType) => {
  const theme = useTheme();
  const BreakPointUp_sm = useMediaQuery(theme.breakpoints.up("sm"));
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const BreakPointUp_md = useMediaQuery(theme.breakpoints.up("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointBetween_sm_md = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "80%",
            maxWidth: "600px",
            minWidth: "320px",
            height: "auto",
          },
        },
      }}
      scroll="body"
      disableEscapeKeyDown
    >
      <Box
        sx={{
          borderRadius: "10px",
          boxShadow: "10px 10px 20px #aaaaaa",
          width: "100%",
          height: "90%",
          transition: "1s",
          bgcolor: "",
          display: "flex",
          flexDirection: "column",
          padding: BreakPointDown_sm
            ? "0.3rem"
            : BreakPointBetween_sm_md
            ? "0.4rem"
            : "0.3rem",
          gap: "1rem",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              transition:"1s",
              fontSize: BreakPointDown_sm? "24px":"30px",
              fontWeight: 700,
              padding: "0.5rem",
              color: "primary.main",
            }}
          >
            Field Training Form
          </Typography>
          <IconButton onClick={(event) => handleClose(event, null)}>
            <ClearIcon
              sx={{ fontSize: "30px", fontWeight: "700" }}
              color="error"
            />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:"1rem"
          }}
        >
          <Avatar sx={{width:"80px",height:"80px"}} alt={customer?.course_name}></Avatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
              {customer?.customer_name} <br />
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
              {customer?.course_name}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Divider />
          <DynamicForm customer={customer} />
        </Box>
      </Box>
    </Dialog>
  );
};
