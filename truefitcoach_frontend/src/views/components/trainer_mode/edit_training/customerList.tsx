import { Box, Typography, Button } from "@mui/material";
import { useState, MouseEventHandler, ReactNode } from "react";

interface EditListCustomersProps {
  customer?: number;
  //   setComment?: React.Dispatch<React.SetStateAction<any>>;
  handleChangeCurrentEdit?: (customer: number) => void;
}

const CustomerList = ({
  customer,
  handleChangeCurrentEdit,
}: EditListCustomersProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (handleChangeCurrentEdit && customer !== undefined) {
      handleChangeCurrentEdit(customer); // assuming default value for customer is 0
      //   console.log(customer);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>Customer {customer}</Typography>
      <Button onClick={handleClick} sx={{ color: "black" }}>
        Add field
      </Button>
    </Box>
  );
};

export default CustomerList;
