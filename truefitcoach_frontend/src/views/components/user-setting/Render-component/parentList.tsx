import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { ReactNode, Children, cloneElement, useState } from "react";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

interface ParentListProps {
  children: ReactNode;
  dataBlock?: number[];
  dataLiked?: number[];
  dataBookmark?: number[];
}

export default function ParentList({
  children,
  dataBlock,
  dataBookmark,
  dataLiked,
}: ParentListProps) {
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

  // dataBookmark?.sort((a,b) => (a-b))

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        padding: BreakPointBetween_xs_sm
          ? "2rem 0.4rem"
          : BreakPointBetween_sm_md
          ? "2rem 2rem"
          : BreakPointBetween_md_lg
          ? "2rem 2rem" : BreakPointUp_lg? "2rem 7rem"
          : "2rem 2rem",
      }}
    >
      {dataBookmark?.map((data, index) => (
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          key={index}
          sx={{
            display: "flex",
            // bgcolor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Children.map(children, (child, index) =>
            cloneElement(child as React.ReactElement, {
              bookmark: data,
              title: "Poohdude",
            })
          )}
        </Grid>
      ))}
    </Grid>
  );
}
