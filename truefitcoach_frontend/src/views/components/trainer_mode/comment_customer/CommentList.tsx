import { Button, Typography, Box } from "@mui/material";
import { useState, MouseEventHandler, ReactNode } from "react";
import { AssignedCustomerType } from "@/models/pages/trainer-mode/appointment";

interface ListCustomersDetail {
  customer?: AssignedCustomerType;
  handleChangeComment?: (customer: AssignedCustomerType) => void;
}

const CommentList = ({
  customer,
  handleChangeComment,
}: ListCustomersDetail) => {
  
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (handleChangeComment && customer !== undefined) {
      handleChangeComment(customer);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        // height:"fit-content"
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
        {" "}
        Customer : {customer?.customer_name} <br /> Course : Increase muscle{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          bgcolor: "",
        }}
      >
        <Button
          onClick={handleClick}
          sx={{ color: "black", width: "100px", bgcolor: "gray" }}
        >
          summary
        </Button>
      </Box>
    </Box>
  );
};

export default CommentList;
