import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ExamPic from "../../../../../public/trainer-in-fitness-male4.png";
import Grid from "@mui/material/Grid";
import "yup-phone-lite";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { ImagePath } from "@/lib/path/image";
import { Lightbox } from "react-modal-image";
import { FormImageProfileProps } from "@/models/pages/user_menu/edit-profile";
import { useTheme } from "@mui/system";
import { Card, Paper, useMediaQuery } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FormImageProfile = ({
  open,
  image_path,
  data,
  onClosePopup,
  photo,
  onImageSubmit,
  setPhoto,
  setImageLoading,
  imageLoading,
}: FormImageProfileProps) => {

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

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "1rem 0rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "30px",
          padding: "1rem",
          bgcolor: "",
          height: "auto",
        }}
      >
        {open && (
          <Lightbox
            medium={image_path}
            large={image_path}
            hideDownload={true}
            showRotate={true}
            alt={(data?.username as string) || ""}
            onClose={onClosePopup}
          />
        )}
        <Box
          onClick={onClosePopup}
          sx={{
            borderRadius: "10rem",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Image
            priority={true}
            alt="example"
            src={
              photo
                ? URL.createObjectURL(photo)
                : data && data?.profile_image !== null
                ? ImagePath(data.profile_image)
                : ExamPic
            }
            width={200}
            height={200}
            style={{
              objectFit: "cover",
              borderRadius: "10rem",
              border: "2px solid rgb(0, 0, 0,0.8)",
              width: "120px",
              height: "120px",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <form onSubmit={onImageSubmit}>
            {photo === null ? (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Change Image
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedFile = e.target.files?.[0];
                    setPhoto(selectedFile || null);
                    setImageLoading(true);
                    setTimeout(() => {
                      setImageLoading(false);
                    }, 1000);
                  }}
                />
              </Button>
            ) : imageLoading === true ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <CircularProgress />
                {/* <Typography sx={{color:"black",fontSize:"14px",fontWeight:"600"}}>Uploading</Typography> */}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignContent: "center",
                  flexDirection: BreakPointDown_lg?"row":"column",
                  gap: "10px",
                }}
              >
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setImageLoading(true);
                    setTimeout(() => {
                      setPhoto(null);
                      setImageLoading(false);
                    }, 1000);
                  }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </Grid>
  );
};

export default FormImageProfile;
