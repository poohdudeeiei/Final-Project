import { Box, Button, Typography, Dialog } from "@mui/material";
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

interface DialogCommentListType {
  customer?: AssignedCustomerType;
  open: boolean;
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
}
type DynamicForm = {
  name: string;
  type: string;
  description: string;
}[];

const defaultFields: DynamicForm = [
  {
    name: "ProgressTraining",
    type: "text",
    description: "Field input for describing or planning about training",
  },
];

const additionalFields = [
  { name: "weight", type: "text", description: "weight" },
  { name: "height", type: "number", description: "height" },
];

export const DialogCommentField = ({
  customer,
  handleClose,
  open,
}: DialogCommentListType) => {
  const [confirmInputField, setConfirmInputField] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<DynamicForm>(defaultFields);

  useEffect(() => {
    let updatedFields: DynamicForm;

    if (confirmInputField) {
      updatedFields = [...defaultFields, ...additionalFields];
    } else {
      updatedFields = defaultFields;
    }

    setFormFields(updatedFields);
  }, [confirmInputField]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "80%",
            maxWidth: "1000px",
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
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
          gap: "1rem",
          overflow: "auto",
        }}
      >
        {" "}
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "primary.main",
          }}
        >
          Training Details Form
        </Typography>
        <Divider />
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Progress customer : {customer?.customer_name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
            On date {customer?.customerId}
          </Typography>
          <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
            Course : {customer?.course_name}
          </Typography>
          <Divider />
          <FormRender
            fields={formFields}
            confirmInputField={confirmInputField}
            setConfirmInputField={setConfirmInputField}
          />
        </Box>
        <Button onClick={(event) => handleClose(event, null)}>close</Button>
      </Box>
    </Dialog>
  );
};
