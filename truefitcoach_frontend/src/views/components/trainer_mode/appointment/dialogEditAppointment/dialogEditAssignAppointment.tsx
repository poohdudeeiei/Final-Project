import { Dialog, Box } from "@mui/material";
import React, { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import FormAssignAppointment from "./formEditAssign";
import Button from "@mui/material";
import axios, { AxiosError } from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";

interface DialogEditAssignProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
  customer?: AssignedCustomer;
  setEvents?: React.Dispatch<React.SetStateAction<ProcessedEvent[]>>;
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

interface AssignedCustomer extends CustomerProps {
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  assign?: string;
}

const DialogEditAssignAppointment: React.FC<DialogEditAssignProps> = ({
  open,
  setOpen,
  handleClose,
  customer,
  setEvents,
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

  useEffect(() => {
    if (customer) {
      const user_data = {
        title: customer.title,
        start: customer.start,
        end: customer.end,
        description: customer.description,
      };

      reset(user_data);
    }
  }, [customer, reset]);

  const onSubmit = async (data: AssignTypeProps) => {
    const { title, start, end, description } = data;

    try {
      const result = await axios.put(
        process.env.NEXT_PUBLIC_ENDPOINT + "/trainer/put-Assigned",
        {
          event_id: customer?.event_id,
          title: title,
          start: start,
          end: end,
          description: description,
        }
      );
      if (result.status === 200) {
        // console.log("pass");
        console.log(result.data);
        await mutateAssigned();
        enqueueSnackbar(`Successfully done the edit appointment. `, {
          variant: "success",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.error?.length > 0
            ? `Unable to edit assignment Overlapping time of ${error.response?.data?.error?.length} activities`
            : "An unexpected error occurred.";

        reset();
        enqueueSnackbar(errorMessage, {
          variant: "error",
        });
        // console.log(error.response?.data.error);
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

export default DialogEditAssignAppointment;
