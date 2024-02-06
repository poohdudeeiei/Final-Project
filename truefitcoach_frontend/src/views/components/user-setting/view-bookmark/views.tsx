import Card from "@mui/material/Card";
import Image from "next/image";
import photo from "../../../../../public/trainer-in-fitness-male3.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import TrainerDetail from "../../find_trainer/dataMock";
import Link from "next/link";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
interface BookmarkViewProps {
  bookmark?: number;
  title?: string;
}

export const ViewBookmark = ({ bookmark, title }: BookmarkViewProps) => {
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
  const BreakPointUp_md = useMediaQuery(theme.breakpoints.up("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointUp_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const secondaryDarkColor = theme.palette.secondary.dark;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let contentRender;

  const RenderTrainingForSmallDevice = () => {
    contentRender = (
      <Card
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          bgcolor: "gray",
          padding: "0px",
        }}
      >
        <Image
          src={photo}
          width={100}
          height={100}
          alt="eiei"
          style={{ width: "35%", height: "100px", borderRadius: "5px" }}
        />
        <Box sx={{ width: "55%", bgcolor: "" }}>
          <Link
            href="/setup/trainer-detail/Hertzy"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  display: "-webkit-box",
                }}
              >
                {" "}
                This is header of trainer bookmark
                {bookmark}. This is header of trainer bookmark-{title}
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Image
                  src={photo}
                  width={300}
                  height={300}
                  alt="eiei"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "5rem",
                  }}
                />
                <Typography sx={{ color: "black", fontSize: "12px" }}>
                  from {"Poohdude"}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                saved 6h ago
              </Typography>
            </Box>
          </Link>
        </Box>
        <IconButton onClick={handleClick} sx={{ width: "15%" }}>
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
              elevation: 0,
              sx: {
                width: "fit-content",
                padding: "0px",
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
            onClick={handleClose}
            disableRipple
            sx={{
              display: "flex",
              gap: "10px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            <BookmarkRemoveIcon sx={{ fontSize: "20px", color: "red" }} />
            Remove from bookmark
          </MenuItem>
        </Menu>
      </Card>
    );
  };

  const RenderTrainingForBaseDevice = () => {
    contentRender = // <Link
      (
        //   href="/setup/trainer-detail/Hertzy"
        //   style={{ textDecoration: "none" }}
        // >
        <Card
          sx={{
            width: BreakPointDown_sm
              ? "100%"
              : BreakPointBetween_sm_md
              ? "100%"
              : BreakPointUp_md
              ? "100%"
              : "300px",
            // bgcolor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: BreakPointDown_sm ? "row" : "column",
            transition: "transform 0.2s, box-shadow 0.2s", // Add a smooth transition for the hover effect
            "&:hover": {
              transform: "scale(1.03)", // Scale up the component on hover
              boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.9)", // Add a subtle shadow on hover
            },
          }}
        >
          <Image
            src={photo}
            width={300}
            height={300}
            alt="eiei"
            style={{ width: "100%", height: "auto" }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "1rem 1rem",
            }}
          >
            <Image
              src={photo}
              width={300}
              height={300}
              alt="eiei"
              style={{ width: "30px", height: "30px", borderRadius: "5rem" }}
            />
            <Typography sx={{ color: "gray" }}>from {"Poohdude"}</Typography>
            {/* <StarIcon sx={{ color: "pink" }} /> */}
          </Box>
          <Link
            href="/setup/trainer-detail/Hertzy"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0rem 1rem 1rem 1rem",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                {bookmark}. This is header of trainer bookmark-{title}
              </Typography>
              <Typography sx={{ overflow: "hidden" }}>
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and
              </Typography>
            </Box>
          </Link>
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
                elevation: 0,
                sx: {
                  width: "fit-content",
                  padding: "0px",
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
              onClick={handleClose}
              disableRipple
              sx={{
                display: "flex",
                gap: "10px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              <BookmarkRemoveIcon sx={{ fontSize: "20px", color: "red" }} />
              Remove from bookmark
            </MenuItem>
          </Menu>
        </Card>
        // </Link>
      );
  };
  switch (true) {
    case BreakPointDown_sm:
      RenderTrainingForSmallDevice();
      break;
    case BreakPointBetween_sm_md:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointBetween_md_lg:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointBetween_lg_xl:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointUp_xl:
      RenderTrainingForBaseDevice();
      break;
    default:
      contentRender = <Box>View Bookmarks Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
};

export default ViewBookmark;
