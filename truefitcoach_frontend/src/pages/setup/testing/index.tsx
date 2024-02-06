import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Box, Paper, Typography, TextField } from "@mui/material";

type FormData = {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
};

const MultiStepForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const [currentStep, setCurrentStep] = useState<number>(1);

  const onSubmit = (data: FormData) => {
    // Handle form submission (e.g., send data to the server)
    console.log(data);
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <>
            <Typography variant="h6">Step 1</Typography>
            <Controller
              name="field1"
              control={control}
              defaultValue=""
              rules={{ required: "Field 1 is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Field 1"
                  fullWidth
                  variant="outlined"
                  error={Boolean(errors.field1)}
                  helperText={errors.field1 ? errors.field1.message : ""}
                />
              )}
            />

            <Controller
              name="field2"
              control={control}
              defaultValue=""
              rules={{ required: "Field 2 is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Field 2"
                  fullWidth
                  variant="outlined"
                  error={Boolean(errors.field2)}
                  helperText={errors.field2 ? errors.field2.message : ""}
                />
              )}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <Typography variant="h6">Step 2</Typography>
            <Controller
              name="field3"
              control={control}
              defaultValue=""
              rules={{ required: "Field 3 is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Field 3"
                  fullWidth
                  variant="outlined"
                  error={Boolean(errors.field3)}
                  helperText={errors.field3 ? errors.field3.message : ""}
                />
              )}
            />
            <Controller
              name="field4"
              control={control}
              defaultValue=""
              rules={{ required: "Field 4 is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Field 4"
                  fullWidth
                  variant="outlined"
                  error={Boolean(errors.field4)}
                  helperText={errors.field4 ? errors.field4.message : ""}
                />
              )}
            />
          </>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          {currentStep > 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}

          {currentStep < 2 && (
            <Button
              type="button" // Change to type="button" to prevent form submission
              variant="contained"
              color="primary"
              onClick={() => {
                if (currentStep === 1) {
                  if (Object.keys(errors).length === 0) {
                    setCurrentStep(currentStep + 1);
                  }
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              Next
            </Button>
          )}

          {currentStep === 2 && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default MultiStepForm;
