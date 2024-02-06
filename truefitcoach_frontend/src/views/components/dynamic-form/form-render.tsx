import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Button, TextField, Dialog } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { SnackbarProvider, useSnackbar } from "notistack";

type DynamicForm = {
  name: string;
  type: string;
  description: string;
}[];

type RenderDynamicFormProps = {
  fields: DynamicForm;
  confirmInputField?: boolean;
  setConfirmInputField?: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormRender = ({
  fields,
  setConfirmInputField,
  confirmInputField,
}: RenderDynamicFormProps) => {
  type FieldNamesObject = {
    [K in (typeof fields)[number]["name"]]: string | number;
  };

  const validationSchema = yup.object().shape(
    fields.reduce((acc, field) => {
      if (field.type === "text") {
        acc[field.name] = yup.string().required(`${field.name} is required`);
        // .min(5, `${field.name} minimum 5 strings`);
      } else if (field.type === "number") {
        acc[field.name] = yup
          .number()
          .min(0)
          .max(10000000)
          .typeError(`${field.name} must be a number`)
          .required();
        // .required(`${field.name} is required`);
      } else {
        acc[field.name] = yup.string().required();
      }
      return acc;
    }, {} as Record<string, any>)
  );

  const initialValues: FieldNamesObject = fields.reduce((acc, field) => {
    if (field.type === "number") {
      acc[field.name] = 0;
    } else {
      acc[field.name] = "";
    }
    return acc;
  }, {} as FieldNamesObject);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  useEffect(() => {
    // Reset the form when fields change
    reset(initialValues);
  }, [fields, reset]);

  const onSubmit = async (data: FieldNamesObject) => {
    console.log(data);
    handleClose();
  };

  const handleChangeInput = () => {
    if (setConfirmInputField) {
      setConfirmInputField((prevValue) => !prevValue);
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          gap: "1.5rem",
          flexDirection: "column",
          marginBottom: "2rem",
          width: "100%",
          transition: "1s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography>Add specific fields training</Typography>

          <Checkbox checked={confirmInputField} onChange={handleChangeInput} />
        </Box>

        {fields.map((data, index) => (
          <Box key={index}>
            {data.name === "ProgressTraining" && data.type === "text" && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "",
                  }}
                >
                  <Typography
                    sx={{
                      width: "fit-content",
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    {"Progress"}
                  </Typography>
                  <Controller
                    name={data.name}
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <TextField
                          // fullWidth
                          multiline
                          rows={4}
                          variant="filled"
                          value={value || ""}
                          onBlur={onBlur}
                          onChange={onChange}
                          placeholder="text input"
                          // helperText={errors[data.name] && String(errors[data.name]?.message)}
                        />
                      </>
                    )}
                  />
                </Box>
                {errors[data.name] && (
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {String(errors[data.name]?.message)}*
                  </Typography>
                )}
              </Box>
            )}
            {data.type === "text" && data.name !== "ProgressTraining" && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  // gap: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography
                    sx={{
                      width: "fit-content",
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    {data.name}
                  </Typography>
                  <Controller
                    name={data.name}
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <TextField
                          // sx={{ width: "" }}
                          variant="filled"
                          value={value || ""}
                          onBlur={onBlur}
                          onChange={onChange}
                          placeholder="text input"

                          // helperText={errors[data.name] && String(errors[data.name]?.message)}
                        />
                      </>
                    )}
                  />
                </Box>
                {errors[data.name] && (
                  <Typography
                    sx={{
                      // textIndent: "10%",
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {String(errors[data.name]?.message)}*
                  </Typography>
                )}
              </Box>
            )}
            {data.type === "number" && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography
                    sx={{
                      width: "fit-content",
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    {data.name}
                  </Typography>
                  <Controller
                    name={data.name}
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <TextField
                          // style={{ width: "90%" }}
                          value={value || ""}
                          onBlur={onBlur}
                          onChange={onChange}
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="filled"
                          // step="0.001"
                          // min="0"
                          // max="9999999"
                          placeholder={data.name.toLowerCase()}
                        />
                      </>
                    )}
                  />
                </Box>
                {errors[data.name] && (
                  <Typography
                    sx={{
                      // textIndent: "10%",
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {String(errors[data.name]?.message)}*
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Button
        // type="submit"
        disabled={!isValid}
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{ margin: "auto", display: "flex" }}
      >
        Confirm
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
            Confirm Training Results
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to confirm and submit the training results?
            Once confirmed, the results will be submitted and cannot be changed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleOpen(); // Close the confirmation dialog
              handleSubmit(onSubmit)(); // Submit the form
            }}
          >
            Confirm Submission
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default FormRender;
