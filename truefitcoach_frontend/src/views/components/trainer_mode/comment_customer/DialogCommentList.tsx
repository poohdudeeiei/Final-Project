import { Button, Typography, Box } from "@mui/material";
import { useState, MouseEventHandler, ReactNode } from "react";
import { AssignedCustomerType } from "@/models/pages/trainer-mode/appointment";
import { DialogCommentField } from "./Lists/dialogCommentField";

interface ListCustomersDetail {
  customer?: AssignedCustomerType;
  handleChangeComment?: (customer: AssignedCustomerType) => void;
}

const DialogCommentList = ({
  customer,
  handleChangeComment,
}: ListCustomersDetail) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (handleChangeComment && customer !== undefined) {
      handleChangeComment(customer);
      handleClickOpen();
    }
  };

  const handleClose = (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => {
    if (reason && reason == "backdropClick") {
      return;
    }
    setOpen(false);
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
      {customer && (
        <DialogCommentField
          open={open}
          handleClose={handleClose}
          customer={customer}
        />
      )}
    </Box>
  );
};

export default DialogCommentList;
