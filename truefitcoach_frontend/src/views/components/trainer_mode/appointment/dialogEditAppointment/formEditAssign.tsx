import { Control, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Card,
  Paper,
  useMediaQuery,
  Button,
  Typography,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { useForm, Controller } from "react-hook-form";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

type AssignTypeProps = {
  title: string;
  start: Date;
  end: Date;
  description: string;
  // assign: String;
};

export interface FormEditAssignTypes {
  errors: FieldErrors<AssignTypeProps>;
  control: Control<AssignTypeProps>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<AssignTypeProps>; // Pass the handleSubmit prop
  onSubmit: (data: AssignTypeProps) => void; // Pass the onSubmit prop
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
  customer?: CustomerProps;
}

type CustomerProps = {
  customerId: string;
  customer_name: string;
  course_name: string;
  trained: number;
};

const FormEditAssignAppointment: React.FC<FormEditAssignTypes> = ({
  errors,
  control,
  handleSubmit,
  onSubmit,
  customer,
  handleClose,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DateTimePicker','DateTimePicker']}> */}
      <Box sx={{ margin: "1rem 1.5rem 0.5rem 1.5rem" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "30px" }}>
          {" "}
          Edit appointment
        </Typography>
        <Typography>assign to customer : {customer?.customerId}</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <Box>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    fullWidth
                    sx={{
                      input: { color: "black", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white", // Change the color of the underline to white
                      },
                    }}
                    id="title"
                    label="Title"
                    // placeholder="title"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              {errors.title && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.title.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Box>
                <Controller
                  name="start"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DateTimePicker
                      label="Start"
                      value={dayjs(value)}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.start && (
                  <Typography
                    sx={{
                      color: "#E32D00",
                      fontSize: "12px",
                      fontWeight: "550",
                    }}
                  >
                    {errors.start.message}
                  </Typography>
                )}
              </Box>

              <Box>
                <Controller
                  name="end"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DateTimePicker
                      label="End"
                      value={dayjs(value)}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.end && (
                  <Typography
                    sx={{
                      color: "#E32D00",
                      fontSize: "12px",
                      fontWeight: "550",
                    }}
                  >
                    {errors.end.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    fullWidth
                    sx={{
                      input: { color: "black", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white", // Change the color of the underline to white
                      },
                    }}
                    id="description"
                    label="Description"
                    // placeholder="description"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              {errors.description && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.description.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                bgcolor: "",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ color: "black", width: "50%" }}
                onClick={(event) => handleClose(event, null)}
              >
                Cancel
              </Button>
              <Button sx={{ width: "50%" }} type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
        {/* </DemoContainer> */}
      </Box>
    </LocalizationProvider>
  );
};

export default FormEditAssignAppointment;
