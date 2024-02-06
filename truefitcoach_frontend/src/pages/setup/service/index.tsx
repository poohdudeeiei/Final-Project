import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Background1 from "../../../../public/video/background/background1.jpg";
import Background3 from "../../../../public/video/background/background3.jpg";
import Background4 from "../../../../public/video/background/background4.jpg";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/system";
import { Card, Paper, useMediaQuery } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import Link from "next/link";

interface CustomArrowProps {
  type: "next" | "prev";
  onClick?: React.MouseEventHandler<any> | undefined;
}

const Arrow: React.FC<CustomArrowProps> = ({ type, onClick }) => {
  if (type === "next") {
    const char = (
      <ArrowForwardIosIcon sx={{ color: "white", fontSize: "30px" }} />
    );

    return (
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: "5px",
          transform: "translateY(-100%)",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        {char}
      </span>
    );
  } else if (type === "prev") {
    const char = <ArrowBackIosIcon sx={{ color: "white", fontSize: "30px" }} />;

    return (
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-100%)",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        {char}
      </span>
    );
  }
};

export default function TrainerType() {
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
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointUp_lg = useMediaQuery(theme.breakpoints.up("lg"));

  let contentRender;

  const RenderHomeForSmallDevices = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    contentRender = (
      <Box
        sx={{
          userSelect: "none",
          padding: "30px 20px 30px 20px",
          backgroundColor: "gray",
          width: "100%",
          height: "90vh",
          maxHeight: "1000px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background3.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Slider
          {...settings}
          nextArrow={<Arrow type="next" />}
          prevArrow={<Arrow type="prev" />}
        >
          <Card
            sx={{
              borderRadius: "2rem",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background4.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "50%",
              height: "70vh",
              border: "2px solid white",
              position: "relative",
              zIndex: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                marginTop: "50px",
                padding: "10px",
                width: "100%",
                backgroundColor: "rgba(255, 165, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "0",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                Find Trainer
              </Typography>
            </Box>
            <Box
              sx={{
                marginBottom: "10%",
                position: "absolute",
                bottom: "0",
                display: "flex",
                justifyContent: "center", // Center along the X-axis (horizontally)
                width: "100%", // Ensure the box spans the entire width
              }}
            >
              <Link href="/setup/find_trainers">
                <Button
                  variant="contained"
                  sx={{
                    width: "fit-content",
                    color: "black",
                    bgcolor: "rgba(230, 165, 0, 0.9)",
                  }}
                >
                  See more
                </Button>
              </Link>
            </Box>
          </Card>
          <Card
            sx={{
              borderRadius: "2rem",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "70vh",
              border: "2px solid white",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                marginTop: "50px",
                padding: "10px",
                width: "100%",
                backgroundColor: "rgba(255, 165, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "0",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                Create Trainer Profile
              </Typography>
            </Box>
            <Box
              sx={{
                marginBottom: "10%",
                position: "absolute",
                bottom: "0",
                display: "flex",
                justifyContent: "center", // Center along the X-axis (horizontally)
                width: "100%", // Ensure the box spans the entire width
              }}
            >
              <Link href="/setup/create_trainer_profile">
                <Button
                  variant="contained"
                  sx={{
                    width: "fit-content",
                    color: "black",
                    bgcolor: "rgba(230, 165, 0, 0.9)",
                  }}
                >
                  See more
                </Button>
              </Link>
            </Box>
          </Card>
        </Slider>
      </Box>
    );
  };

  const RenderHomeForMediumDevices = () => {
    contentRender = (
      <Box
        sx={{
          userSelect: "none",
          padding: "30px 20px 30px 20px",
          backgroundColor: "gray",
          width: "100%",
          height: "90vh",
          maxHeight: "1000px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background3.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid sx={{ flexGrow: 1 }} container spacing={3} height={"100%"}>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: BreakPointDown_lg ? "center" : "flex-end",
            }}
          >
            <Card
              sx={{
                borderRadius: "2rem",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background4.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "90%",
                height: "60vh",
                border: "2px solid white",
                position: "relative",
                zIndex: 0,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  marginTop: "50px",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "rgba(255, 165, 0, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: "0",
                }}
              >
                <Typography sx={{ fontSize: "25px", fontWeight: "700" }}>
                  Find Trainer
                </Typography>
              </Box>
              <Box
                sx={{
                  marginBottom: "10%",
                  position: "absolute",
                  bottom: "0",
                  display: "flex",
                  justifyContent: "center", // Center along the X-axis (horizontally)
                  width: "100%", // Ensure the box spans the entire width
                }}
              >
                <Link href="/setup/find_trainers">
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      color: "black",
                      bgcolor: "rgba(230, 165, 0, 0.9)",
                    }}
                  >
                    See more
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: BreakPointDown_lg ? "center" : "flex-start",
            }}
          >
            <Card
              sx={{
                borderRadius: "2rem",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "90%",
                height: "60vh",
                border: "2px solid white",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  marginTop: "50px",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "rgba(255, 165, 0, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: "0",
                }}
              >
                <Typography sx={{ fontSize: "25px", fontWeight: "700" }}>
                  Create Trainer Profile
                </Typography>
              </Box>
              <Box
                sx={{
                  marginBottom: "10%",
                  position: "absolute",
                  bottom: "0",
                  display: "flex",
                  justifyContent: "center", // Center along the X-axis (horizontally)
                  width: "100%", // Ensure the box spans the entire width
                }}
              >
                <Link href="/setup/create_trainer_profile">
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      color: "black",
                      bgcolor: "rgba(230, 165, 0, 0.9)",
                    }}
                  >
                    See more
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const RenderHomeForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          userSelect: "none",
          padding: "30px 20px 30px 20px",
          backgroundColor: "gray",
          width: "100%",
          height: "100%",
          minHeight: "620px",
          maxHeight: "90vh",
          maxWidth: "2000px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background3.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid sx={{ flexGrow: 1 }} container spacing={3}>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: BreakPointDown_lg ? "center" : "flex-end",
            }}
          >
            <Card
              sx={{
                borderRadius: "2rem",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background4.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "80%",
                height: "70vh",
                border: "2px solid white",
                position: "relative",
                zIndex: 1,
                transition: "transform 0.2s, box-shadow 0.2s", // Add a smooth transition for the hover effect
                "&:hover": {
                  transform: "scale(1.01)", // Scale up the component on hover
                  boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.9)", // Add a subtle shadow on hover
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  marginTop: "50px",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "rgba(255, 165, 0, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: "0",
                }}
              >
                <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
                  Find Trainer
                </Typography>
              </Box>
              <Box
                sx={{
                  marginBottom: "10%",
                  position: "absolute",
                  bottom: "0",
                  display: "flex",
                  justifyContent: "center", // Center along the X-axis (horizontally)
                  width: "100%", // Ensure the box spans the entire width
                }}
              >
                <Link href="/setup/find_trainers">
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      color: "black",
                      bgcolor: "rgba(230, 165, 0, 0.9)",
                    }}
                  >
                    See more
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: BreakPointDown_lg ? "center" : "flex-start",
            }}
          >
            <Card
              sx={{
                borderRadius: "2rem",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "80%",
                height: "70vh",
                border: "2px solid white",
                position: "relative",
                zIndex: 1,
                transition: "transform 0.2s, box-shadow 0.2s", // Add a smooth transition for the hover effect
                "&:hover": {
                  transform: "scale(1.01)", // Scale up the component on hover
                  boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.9)", // Add a subtle shadow on hover
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  marginTop: "50px",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "rgba(255, 165, 0, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: "0",
                }}
              >
                <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
                  Create Trainer Profile
                </Typography>
              </Box>
              <Box
                sx={{
                  marginBottom: "10%",
                  position: "absolute",
                  bottom: "0",
                  display: "flex",
                  justifyContent: "center", // Center along the X-axis (horizontally)
                  width: "100%", // Ensure the box spans the entire width
                }}
              >
                <Link href="/setup/create_trainer_profile">
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      color: "black",
                      bgcolor: "rgba(230, 165, 0, 0.9)",
                    }}
                  >
                    See more
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  switch (true) {
    case BreakPointDown_md:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderHomeForMediumDevices();
      break;
    case BreakPointUp_lg:
      RenderHomeForBaseDevices();
      break;
    default:
      contentRender = <Box>Home Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
}

TrainerType.guestGuard = true;