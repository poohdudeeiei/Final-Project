import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ServiceContent from "./content/ServiceContent";
import ContactIcon from "./content/ContactIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircleIcon from "@mui/icons-material/Circle";

export default function FirstLookContent() {
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
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const BreakPointUp_md = useMediaQuery(theme.breakpoints.up("md"));

  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlideInterval, setAutoSlideInterval] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const imageFiles = [
      "ImageSlideShow1.jpg",
      "ImageSlideShow2.jpg",
      "ImageSlideShow3.jpg",
      "ImageSlideShow4.jpg",
    ];
    const imageUrls = imageFiles.map((fileName) => `/slide_show/${fileName}`);
    const imagePromises = imageUrls.map((imageUrl) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => resolve(imageUrl);
        img.onerror = (error) => reject(error);
      });
    });

    Promise.all(imagePromises)
      .then((loadedImages) => {
        setImages(loadedImages);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });

    // console.log(imageUrls);
    setImages(imageUrls);
    // console.log(`Pic num ${currentIndex}`);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    setAutoSlideInterval(intervalId);
    return () => {
      clearInterval(intervalId);
    };
  }, [images]);

  const startAutoSlide = () => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    setAutoSlideInterval(intervalId);
  };

  const handleNext = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    startAutoSlide();
  };

  const handlePrev = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }

    startAutoSlide();
  };

  const ShortcutChange = (index: number) => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      setCurrentIndex(index);
    }

    startAutoSlide();
  };

  const RenderContentForSmallDevices = () => {
    contentRender = (
      <Grid
        container
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ServiceContent></ServiceContent>
        </Grid>

        {BreakPointUp_md && (
          <Box sx={{ position: "absolute", right: 0, marginRight: "10px" }}>
            <ContactIcon></ContactIcon>
          </Box>
        )}
      </Grid>
    );
    return contentRender;
  };

  const RenderContentForBaseDevices = () => {
    contentRender = (
      <Grid
        container
        sx={{
          position: "",
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Grid
          item
          xs={BreakPointBetween_lg_xl ? 12 : 6}
          sx={{
            display: "flex",
            justifyContent: BreakPointBetween_lg_xl ? "center" : "flex-start",
          }}
        >
          <ServiceContent></ServiceContent>
        </Grid>
        {BreakPointUp_xl && (
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "30px 80px 30px 80px",
                height: "550px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "35px",
                  color: "white",
                  border: "5px solid " + secondaryMainColor,
                  position: "relative",
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url(${images[currentIndex]})`,
                    backgroundRepeat: "no-repeat",
                    width: "95%",
                    height: "95%",
                    boxShadow: "0px 0px 10px black",
                    borderRadius: "25px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    transition: "background-image 3s",
                    opacity: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "15%",
                      height: "10%",
                      backgroundColor: secondaryMainColor + "BB",
                      position: "absolute",
                      right: 0,
                      borderRadius: "15px 0px 0px 15px",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      width: "15%",
                      height: "10%",
                      backgroundColor: secondaryMainColor + "BB",
                      position: "absolute",
                      left: 0,
                      borderRadius: "0px 15px 15px 0px",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      bottom: 20,
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {Array.from({ length: images.length }).map((_, index) => (
                      <Box
                        key={index}
                        sx={{ marginX: "5px" }}
                        onClick={() => ShortcutChange(index)}
                      >
                        <CircleIcon
                          sx={{
                            fontSize: "10px",
                            color:
                              index === currentIndex
                                ? primaryMainColor
                                : "white",
                            "&:hover": {
                              color: primaryMainColor,
                              border: "1px solid orange",
                              borderRadius: "50%",
                              cursor: "pointer",
                            },
                          }}
                        ></CircleIcon>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                <Box
                  onClick={handleNext}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 5px 5px 5px",
                    position: "absolute",
                    fontSize: "20px",
                    right: "5%",
                    "&:hover": {
                      color: "rgb(0,0,0,0.5)",
                    },
                  }}
                >
                  <ArrowForwardIosIcon
                    sx={{
                      color: "#242424",
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": {
                        bgcolor: primaryDarkColor,
                        borderRadius: "50%",
                        padding: "5px 5px 5px 5px",
                        fontSize: "32px",
                        color: primaryMainColor,
                      },
                    }}
                  ></ArrowForwardIosIcon>
                </Box>
                <Box
                  onClick={handlePrev}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 5px 5px 5px",
                    position: "absolute",
                    fontSize: "20px",
                    left: "5%",
                    "&:hover": {
                      color: "rgb(0,0,0,0.5)",
                    },
                  }}
                >
                  <ArrowBackIosNewIcon
                    sx={{
                      color: "#242424",
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": {
                        bgcolor: primaryDarkColor,
                        borderRadius: "50%",
                        padding: "5px 5px 5px 5px",
                        fontSize: "32px",
                        color: primaryMainColor,
                      },
                    }}
                  ></ArrowBackIosNewIcon>
                </Box>
              </Box>
            </Box>
          </Grid>
        )}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            marginRight: "10px",
          }}
        >
          <ContactIcon></ContactIcon>
        </Box>
      </Grid>
    );
    return contentRender;
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderContentForSmallDevices();
      break;
    case BreakPointBetween_sm_md:
      RenderContentForSmallDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderContentForSmallDevices();
      break;
    case BreakPointBetween_lg_xl:
      RenderContentForBaseDevices();
      break;
    case BreakPointUp_xl:
      RenderContentForBaseDevices();
      break;
    default:
      contentRender = <Box>First Look Content!</Box>;
      break;
  }

  return <>{contentRender}</>;
}
