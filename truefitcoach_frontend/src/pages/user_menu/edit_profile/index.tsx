import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ExamPic from "../../../../public/trainer-in-fitness-male4.png";
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
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/้hooks/useAuth";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/services/api/fetcher";
import { GET_AND_EDIT_USER_DATA } from "@/services/endpoint/user";
import { ImagePath } from "@/lib/path/image";
import ModalImage, { Lightbox } from "react-modal-image";
import FormImageProfile from "@/views/components/user-setting/setting-privacy/form-image-profile";
import {
  FormPersonalProps,
  TrainerHistoryPropsType,
} from "@/models/pages/user_menu/edit-profile";

export default function user_profile() {
  const [value, setValue] = React.useState("personal");
  const [photo, setPhoto] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const auth = useAuth();

  const {
    data,
    error,
    mutate: mutateUser,
  } = useSWR(
    auth.token !== null ? [GET_AND_EDIT_USER_DATA, auth.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const defaultValues: FormPersonalProps = {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "+66661231234",
    birthDate: new Date(),
    gender: "Men",
    congenitalDisease: "",
  };

  const schema: yup.ObjectSchema<FormPersonalProps> = yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required().min(1),
    first_name: yup.string().required().min(1),
    last_name: yup.string().required().min(1),
    phone_number: yup.string().phone().required(),
    birthDate: yup.date().required(),
    gender: yup.string().required(),
    congenitalDisease: yup.string().required(),
  });

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

  useEffect(() => {
    if (data) {
      const current_user_data: FormPersonalProps = {
        email: data.email || "",
        username: data?.username || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        phone_number: data?.phone_number || "+66",
        birthDate: data?.birth_date || new Date(),
        gender: data?.gender || "" ,
        congenitalDisease: data?.congenital_disease || "",
      };

      reset(current_user_data);
    }
  }, [data, reset]);

  const onSubmit = async (data: FormPersonalProps) => {
    const {
      email,
      username,
      first_name,
      last_name,
      birthDate,
      phone_number,
      gender,
      congenitalDisease,
    } = data;

    if (data) {
      try {
        const result = await axios.put(
          "http://localhost:8080/user/edit-user",
          {
            email: email,
            first_name: first_name,
            last_name: last_name,
            username: username,
            birth_date: birthDate,
            phone_number: phone_number,
            gender: gender,
            congenital_disease: congenitalDisease,
          },
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        if (result.status === 200) {
          mutateUser();
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("User updated!");
      }
    }
  };

  const onImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setImageLoading(true);
    e.preventDefault();

    if (photo) {
      try {
        const formData = new FormData();
        formData.append("profile", photo);
        const result = await axios.post(
          "http://localhost:8080/user/user-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: auth.token,
            },
          }
        );
        if (result.status === 200) {
          console.log(result.data);
          mutateUser({
            ...data,
            profile_image: result.data.profile_image,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setImageLoading(false);
          setPhoto(null);
        }, 2000);
      }
    }
  };

  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;
  let contentRender;
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

  // State for open popup
  const [open, setOpen] = useState(false);
  const onClosePopup: () => void = () => {
    setOpen((prev) => !prev);
  };

  const image_path: string =
    data && data?.profile_image !== null
      ? (ImagePath(data.profile_image) as string)
      : "../../../../public/trainer-in-fitness-male4.png";

  return (
    <Box
      sx={{
        color: "white",
        bgcolor: "white",
        padding: BreakPointUp_lg
          ? "2% 10%"
          : BreakPointBetween_md_lg
          ? "2% 7%"
          : BreakPointDown_md
          ? "2% 2%"
          : "0rem",
        height: BreakPointDown_lg?"fit-content":"85dvh",
        width: "100dvw",
      }}
    >
      <Grid container spacing={0} sx={{ bgcolor: "" }}>
        <FormImageProfile
          open={open}
          image_path={image_path}
          data={data}
          onClosePopup={onClosePopup}
          photo={photo}
          onImageSubmit={onImageSubmit}
          setPhoto={setPhoto}
          setImageLoading={setImageLoading}
          imageLoading={imageLoading}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={1}
          sx={{
            // bgcolor: "black",
            display: "flex",
            justifyContent: "center",
            height: BreakPointDown_lg ? "0.5px" : "auto",
          }}
        >
          <Divider
            orientation={BreakPointDown_lg ? "horizontal" : "vertical"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
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
