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
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import FormRender from "@/views/components/dynamic-form/form-render";
import RemoveIcon from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";

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

type CustomerProps = {
  customerId: string;
  customer_name: string;
  course_name: string;
  trained: number;
};

interface AddFieldDynamicProps {
  customer?: CustomerProps;
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

  const theme = useTheme();
  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );
  const BreakPointBetween_sm_md = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const BreakPointBetween_md_lg = useMediaQuery(
    theme.breakpoints.between("md", "lg")
  );
  const BreakPointBetween_lg_xl = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );
  const BreakPointUp_sm = useMediaQuery(theme.breakpoints.up("sm"));
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const BreakPointUp_md = useMediaQuery(theme.breakpoints.up("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: BreakPointDown_sm
          ? "0.2rem"
          : BreakPointBetween_sm_md
          ? "0.5rem"
          : "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "85vh",
        overflow: "auto",
        transition: "1s",
      }}
    >
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
                border: "solid 1px black",
                borderRadius: "5px",
                padding: "1.5rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
                  Field {index + 1}
                </Typography>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  color="error"
                  variant="outlined"
                  type="button"
                  onClick={() => remove(index)}
                  startIcon={<RemoveIcon />}
                >
                  DELETE
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: BreakPointUp_sm ? "row" : "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* Field Name */}
                <Box
                  sx={{
                    width: BreakPointUp_sm ? "50%" : "100%",
                    display: "flex",
                    gap: "0rem",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontWeight: "500" }}>Field name</Typography>

                  <TextField
                    placeholder="Enter field name"
                    variant="filled"
                    {...register(`field.${index}.name` as const, {
                      required: true,
                    })}
                    defaultValue={field.name}
                  />
                  <Box sx={{ height: "15px" }}>
                    {errors?.field?.[index]?.name && (
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        Please enter a name for this field*
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Field Type */}
                <Box
                  sx={{
                    width: BreakPointUp_sm ? "50%" : "100%",
                    display: "flex",
                    gap: "0rem",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontWeight: "500" }}>Field type</Typography>
                  <Controller
                    control={control}
                    name={`field.${index}.type`}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl
                        variant="filled"
                        sx={{ minWidth: 120, paddingBottom: "15px" }}
                      >
                        <Select
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        >
                          <MenuItem value={"text"}>Text</MenuItem>
                          <MenuItem value={"number"}>Number</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
              </Box>

              {/* Field Description */}
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
                  multiline
                  rows={4}
                  variant="filled"
                  placeholder="Enter field description"
                  {...register(`field.${index}.description` as const, {
                    required: true,
                  })}
                  className={errors?.field?.[index]?.description ? "error" : ""}
                  defaultValue={field.description}
                />
                <Box sx={{ height: "15px" }}>
                  {errors?.field?.[index]?.description && (
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Please enter a description for this field*
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ width: "120px", display: "flex", margin: "auto" }}
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

        <Button type="submit" variant="contained" sx={{ margin: "2rem 0rem" }}>
          Submit
        </Button>
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
