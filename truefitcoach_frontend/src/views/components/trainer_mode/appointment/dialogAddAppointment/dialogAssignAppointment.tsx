import { Dialog, Box } from "@mui/material";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import FormAssignAppointment from "./formAssign";
import Button from "@mui/material";
import axios, { AxiosError } from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
interface DialogAssignProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
  customer?: CustomerProps;
  // setEvents?: React.Dispatch<React.SetStateAction<ProcessedEvent[]>>;
  mutateAssign?: any;
  mutateAssigned?: any;
}

type CustomerProps = {
  customerId: string;
  customer_name: string;
  course_name: string;
  trained: number;
};

type AssignTypeProps = {
  title: string;
  start: Date;
  end: Date;
  description: string;
  // assign: String;
};

const defaultValues: AssignTypeProps = {
  title: "",
  start: new Date(),
  end: new Date(),
  description: "",
  // assign: "",
};

const DialogAssignAppointment: React.FC<DialogAssignProps> = ({
  open,
  setOpen,
  handleClose,
  customer,
  // setEvents,
  mutateAssign,
  mutateAssigned,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const schema: yup.ObjectSchema<AssignTypeProps> = yup.object().shape({
    title: yup.string().required().min(1),
    start: yup.date().required(),
    end: yup.date().required().min(yup.ref("start")),
    description: yup.string().required().min(1),
    // assign: yup.string().required()
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignTypeProps>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AssignTypeProps) => {
    const { title, start, end, description } = data;

    console.log(data);

    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ENDPOINT + "/trainer/post-assign",
        {
          customerId: customer?.customerId,
          customer_name: customer?.customer_name,
          course_name: customer?.course_name,
          title: title,
          start: start,
          end: end,
          description: description,
          assign: customer?.customer_name,
        }
      );
      if (result.status === 200) {
        // console.log("pass");
        console.log(result.data);
        // await mutateAssign();
        await mutateAssigned();
        enqueueSnackbar(
          `Assigned an appointment to customer ${customer?.customer_name} `,
          { variant: "success" }
        );
        reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.error?.length > 0
            ? `Unable to make an appointment Overlapping time of ${error.response?.data?.error?.length} activities`
            : "An unexpected error occurred.";

        reset();
        enqueueSnackbar(errorMessage, {
          variant: "error",
        });
      } else {
        console.error("Unexpected error:", error);
      }
    }
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      scroll="body"
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "fit-content",
            maxWidth: "1000px",
            height: "auto",
          },
        },
        userSelect: "none",
      }}
    >
      {/* <Box>Assign Appointment</Box> */}
      <FormAssignAppointment
        errors={errors}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        handleClose={handleClose}
        customer={customer}
      />
    </Dialog>
  );
};

export default DialogAssignAppointment;
