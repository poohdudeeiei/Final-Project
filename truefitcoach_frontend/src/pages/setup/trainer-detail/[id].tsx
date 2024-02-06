import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import TrainerPhoto from "../../../../public/trainer-in-fitness-male3.png";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ArchiveIcon from "@mui/icons-material/Archive";
import BlockIcon from "@mui/icons-material/Block";
import ReportIcon from "@mui/icons-material/Report";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import BlockDialog from "@/views/components/trainer-detail/Features/BlockDialog";
import ReportDialog from "@/views/components/trainer-detail/Features/ReportDialog";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Courses from "@/views/components/trainer-detail/Course/Courses";
import AboutMe from "@/views/components/trainer-detail/AboutMe/AboutMe";
import Reviews from "@/views/components/trainer-detail/Reviews/Reviews";
import { useTheme } from "@mui/system";
import { Paper, useMediaQuery } from "@mui/material";
import { useAuth } from "@/้hooks/useAuth";
import { useEffect } from "react";

export type TrainerDetailType = {
  nickname: string;
  firstName: string;
  lastName: string;
  experience: string;
  expertise: string;
  qualification: string;
  teachingStyle: string;
  location: String;
  detail: String;
};

const Detail: TrainerDetailType = {
  nickname: "Hertz",
  firstName: "Dechanuphap",
  lastName: "Anuwan",
  experience: "3 years",
  expertise: "Nutrition, Strength & Condition",
  qualification: "3 years",
  teachingStyle: "personal, group",
  location: "Germany, Rimsra",
  detail:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." ,
};

export default function TrainerDetail() {
  const {user} = useAuth();
  const router = useRouter();

  const [trainerDetail, setTrainer] = useState(null);
  const [liked, setLiked] = useState<Boolean>(false);

  // const [currentView, setCurrentView] = React.useState<string>("Courses");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [currentView, setCurrentView] = React.useState("1");

  const handleChangeView = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentView(newValue);
  };

  const handleView = (event: React.MouseEvent<HTMLElement>, view: string) => {
    if (view !== null) {
      setCurrentView(view);
    }
  };

  //----------Report Dialog Function---------------
  const handleLiked = () => {
    setLiked(!liked);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //----------Report Dialog Function---------------
  const [report, setReport] = React.useState(false);

  const handleReportOpen = () => {
    setReport(true);
  };

  const handleReportClose = (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => {
    // if (reason && reason == "backdropClick") {
    //   return;
    // }
    setReport(false);
  };

  //----------Block Dialog Function---------------------------
  const [block, setBlock] = React.useState(false);

  const handleBlockOpen = () => {
    setBlock(true);
  };

  const handleBlockClose = (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => {
    // if (reason && reason == "backdropClick") {
    //   return;
    // }
    setBlock(false);
  };
  //---------------------------------------------------
  const LinkCustomStyle = {
    textDecoration: "none",
    // bgcolor:"red",
    color: "black",
    fontWeight: "bold",
    padding: "10px 20px",
    transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
    borderRadius: "5px",
    ":hover": {
      backgroundColor: "rgba(255, 165, 0, 0.9)",
      color: "blue",
    },
  };

  useEffect(() => {}, [user]);

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

  return (
    <Box sx={{ userSelect: "none" }}>
      {" "}
      {/*Optional*/}
      <Box
        sx={{
          backgroundColor: "white",
          padding: "0.5% 10%",
          // minWidth:"50px",
          // maxWidth:"1600px",
          // width: "100%",
        }}
      >
        <Box
          fontSize={"18px"}
          sx={{
            display: "flex",
            backgroundColor: "",
            flexDirection: BreakPointBetween_xs_sm
              ? "column"
              : BreakPointBetween_sm_md
              ? "column"
              : BreakPointBetween_md_lg
              ? "row"
              : "row",
            padding: "15px 0px",
            maxWidth: "1440px",
          }}
        >
          <Box
            sx={{
              padding: "10px 10px",
              display: "flex",
              flexDirection: BreakPointBetween_xs_sm
                ? "column"
                : BreakPointBetween_sm_md
                ? "column"
                : BreakPointBetween_md_lg
                ? "row"
                : "row",
              gap: "20px",
              width: "100%",
              alignItems: "center",

              // backgroundColor: "rgba(255, 165, 0, 0.9)",
            }}
          >
            <Image
              src={TrainerPhoto}
              width={200}
              height={200}
              alt="hi"
              style={{ width: "150px", height: "150px", borderRadius: "10rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: BreakPointBetween_xs_sm
                  ? "center"
                  : BreakPointBetween_sm_md
                  ? "center"
                  : BreakPointBetween_md_lg
                  ? "normal"
                  : "normal",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "20px" }}>
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  {router.query.id}
                </span>{" "}
                {`(${Detail.nickname})`}
                {/* {user?.email} */}
              </Typography>

              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <StarIcon sx={{ color: "pink" }} />
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {"5 Ratings"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={handleLiked}>
              {liked && liked === true ? (
                <>
                  <FavoriteBorderIcon sx={{ color: "red", zIndex: "0" }} />
                </>
              ) : (
                <>
                  <FavoriteIcon sx={{ color: "red", zIndex: "0" }} />
                </>
              )}
            </IconButton>
            <IconButton onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: {
                    padding: "10px",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 0.5,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleBlockOpen}
                disableRipple
                sx={{ display: "flex", gap: "10px" }}
              >
                <BlockIcon />
                Block
              </MenuItem>
              <MenuItem
                onClick={handleReportOpen}
                disableRipple
                sx={{ display: "flex", gap: "10px" }}
              >
                <ReportIcon />
                Report
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={handleClose}
                disableRipple
                sx={{ display: "flex", gap: "10px" }}
              >
                <ArchiveIcon />
                Archive
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableRipple
                sx={{ display: "flex", gap: "10px" }}
              >
                <MoreHorizIcon />
                More
              </MenuItem>
            </Menu>
            <BlockDialog open={block} handleClose={handleBlockClose} />
            <ReportDialog open={report} handleClose={handleReportClose} />
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{ margin: "20px 0px", textIndent: "25px", maxWidth: "1440px" }}
        >
          {`${Detail.detail}`}
        </Box>
        <Divider />

        {/* <Box sx={{ margin: "10px 0px" }}>
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={handleView}
          >
            <ToggleButton value="Courses" aria-label="Courses">
              Courses
            </ToggleButton>
            <ToggleButton value="About-me" aria-label="About-me">
              About me
            </ToggleButton>
            <ToggleButton
              value="Reviews"
              aria-label="Reviews"
              sx={LinkCustomStyle}
            >
              Reviews
            </ToggleButton>
          </ToggleButtonGroup>
        </Box> */}
      </Box>
      {/* <Box
        sx={{
          margin: "10px 0px",
          padding: "0.5% 10%",
        }}
      >
        <RenderView view={currentView} />
      </Box> */}
      <Box
        sx={{
          margin: "1% 0px",
          padding: "0.5% 10%",
          bgcolor: "gray",
        }}
      >
        <TabContext value={currentView}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeView}
              aria-label="lab API tabs example"
            >
              <Tab label="Courses" value="1" />
              <Tab label="About me" value="2" />
              <Tab label="Reviews" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Courses />
          </TabPanel>
          <TabPanel value="2">
            <AboutMe />
          </TabPanel>
          <TabPanel value="3">
            <Reviews />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

TrainerDetail.guestGuard = true;