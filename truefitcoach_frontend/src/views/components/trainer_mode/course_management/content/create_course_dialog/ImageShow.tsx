import { Box } from "@mui/system";
import React, { memo, useEffect, useRef } from "react";
import { string } from "yup";

interface ImageShowProps {
  courseImage: File | string | null;
}

const ImageShow = memo(({ courseImage }: ImageShowProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        backgroundImage:
          courseImage && typeof courseImage !== "string" && courseImage !== null
            ? `url(${URL.createObjectURL(courseImage)})`
            : `url(${courseImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></Box>
  );
});

export default ImageShow;
