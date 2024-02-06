import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ExamPic from "../../../../../public/trainer-in-fitness-male4.png";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import FormPersonal from "@/views/components/user-setting/setting-privacy/form-personal";
import { useTheme } from "@mui/system";
import { Card, Paper, useMediaQuery } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Control,
  UseFormWatch,
  UseFormHandleSubmit,
  UseFormReset,
  FieldErrors,
} from "react-hook-form";
import FormAddress from "@/views/components/user-setting/setting-privacy/form-image-profile";
import "yup-phone-lite";

type FormPersonalProps = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  tel: string;
  birthDate: Date;
  gender: string;
  congenitalDisease: string;
};

const defaultValues: FormPersonalProps = {
  email: "hi@kkumail.com",
  username: "hi",
  firstName: "hi",
  lastName: "ih",
  tel: "+66912342112",
  birthDate: new Date(),
  gender: "Men",
  congenitalDisease: "-",
};

export interface TrainerHistoryPropsType {
  errors: FieldErrors<FormPersonalProps>;
  control: Control<FormPersonalProps>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<FormPersonalProps>; // Pass the handleSubmit prop
  onSubmit: (data: FormPersonalProps) => void;
  reset: UseFormReset<FormPersonalProps>;
}

export default function EditProfile() {
  const [value, setValue] = React.useState("personal");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const schema: yup.ObjectSchema<FormPersonalProps> = yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required().min(1),
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    tel: yup.string().phone().required(),
    birthDate: yup.date().required(),
    gender: yup.string().required(),
    congenitalDisease: yup.string().required(),
  });

  const onSubmit = (data: FormPersonalProps) => {
    const { email, username, firstName, lastName, birthDate } = data;
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPersonalProps>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

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
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointUp_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <Box
      sx={{
        color: "white",
        bgcolor: "gray",
        margin: "1rem 2rem",
        padding: "2rem",
        height: "90vh",
        width: "100%",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              bgcolor: "",
              height: "auto",
            }}
          >
            <Image
              alt="example"
              src={ExamPic}
              width={200}
              height={200}
              style={{ borderRadius: "10rem", width: "120px", height: "120px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={10}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Personal " value="personal" />
                  <Tab label="Address" value="address" />
                  <Tab label="Item Three" value="3" />
                </TabList>
              </Box>
              <TabPanel value="personal">
                <FormPersonal
                  errors={errors}
                  control={control}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  reset={reset}
                />
              </TabPanel>
              <TabPanel value="address">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
