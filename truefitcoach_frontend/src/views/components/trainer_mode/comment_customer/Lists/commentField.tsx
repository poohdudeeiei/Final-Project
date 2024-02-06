import { Box, Typography, Grid } from "@mui/material";
import FormRender from "../../../dynamic-form/form-render";
import { useState, useEffect } from "react";
import { AssignedCustomerType } from "@/models/pages/trainer-mode/appointment";
import Divider from "@mui/material/Divider";
interface CommentProps {
  customer?: AssignedCustomerType;
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

const CommentField = ({ customer }: CommentProps) => {
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
    <Box
      sx={{
        borderRadius: "10px",
        border: "3px solid rgb(0,0,0,0.6)",
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
      <Box sx={{ display: "flex", gap: "1rem", width: "100%",flexDirection:"column" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
          On date {customer?.customerId}
        </Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
          Course : {customer?.course_name}
        </Typography>
        <FormRender
          fields={formFields}
          confirmInputField={confirmInputField}
          setConfirmInputField={setConfirmInputField}
        />
      </Box>
    </Box>
  );
};

export default CommentField;
