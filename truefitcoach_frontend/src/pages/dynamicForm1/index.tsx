import * as React from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from "react-hook-form";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography, TextField, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import FormRender from "@/views/components/dynamic-form/form-render";

type FormValues = {
  field: {
    name: string;
    type: string;
    description: string;
  }[];
};

type DynamicForm = {
  name: string;
  type: string;
  description: string;
}[];

interface AddFieldDynamicProps {
  customer?: number;
}

export default function DynamicForm({ customer }: AddFieldDynamicProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      field: [{ name: "", type: "text", description: "" }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "field",
    control,
  });

  const [examForm, setExamForm] = useState<DynamicForm | null>([]);

  const onSubmit = (data: FormValues) => {
    console.log(data?.field);
    setExamForm(data?.field);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "85vh",
        overflow: "auto",
      }}
    >
      <Typography> Customer : {customer}</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {fields.map((field, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                borderColor: "red",
                borderStyle: "solid",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "0rem",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontWeight: "500" }}>Field name</Typography>

                <TextField
                  placeholder="name"
                  variant="standard"
                  {...register(`field.${index}.name` as const, {
                    required: true,
                  })}
                  // className={errors?.field?.[index]?.name ? error : ""}
                  defaultValue={field.name}
                />
                {errors?.field?.[index]?.name && (
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {/* {String(errors?.field?.[index]?.name)}* */}
                    Please Enter this field*
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // gap: "0rem",
                  flexDirection: "column",
                  // bgcolor: "",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>Field type</Typography>
                <Controller
                  control={control}
                  name={`field.${index}.type`}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <Select
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched/blur
                        value={value}
                      >
                        <MenuItem value={"text"}>Text</MenuItem>
                        <MenuItem value={"number"}>Number</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "0rem",
                  flexDirection: "column",
                  bgcolor: "",
                  width: "100%",
                }}
              >
                <Typography sx={{ fontWeight: "500" }}>Description</Typography>
                <TextField
                  variant="standard"
                  placeholder="description"
                  {...register(`field.${index}.description` as const, {
                    required: true,
                  })}
                  className={errors?.field?.[index]?.description ? "error" : ""}
                  defaultValue={field.description}
                />
                {errors?.field?.[index]?.description && (
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {/* {String(errors?.field?.[index]?.description?.message)}* */}
                    Please Enter this field*
                  </Typography>
                )}
              </Box>
              <Button
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                type="button"
                onClick={() => remove(index)}
              >
                DELETE
              </Button>
            </Box>
          );
        })}

        <Button
          type="button"
          onClick={() =>
            append({
              name: "",
              type: "text",
              description: "",
            })
          }
        >
          APPEND
        </Button>
        <Button type="submit">Submit</Button>
      </form>
      {examForm &&
        examForm.map((data, idx) => {
          return (
            <Box key={idx}>
              <Typography>
                {data?.name} {data?.description} {data?.type}
              </Typography>
            </Box>
          );
        })}
      {/* <FormRender fields={examForm || []}></FormRender> */}
    </Box>
  );
}
