import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { Box } from "@mui/material";
import { error } from "console";
import { ReactNode } from "react";
import BlankLayout from "@/layouts/blankLayout";

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

export default function InputFileUpload() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Your form submission logic here
    if (photo) {
      try {
        console.log("File submitted:", photo);
        // Add logic to handle the submitted file
        const formData = new FormData();
        formData.append("image", photo);
        const result = await axios.post(
          "http://localhost:8080/api/image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setImageName("http://localhost:8080/" + result.data.imageUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", padding: "4rem" }}
    >
      <Box sx={{ display: "flex" }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedFile = e.target.files?.[0];
              setPhoto(selectedFile || null);

              if (selectedFile) {
                setPreview(
                  selectedFile ? URL.createObjectURL(selectedFile) : null
                );
              } else {
                setPreview(null);
              }
            }}
          />
        </Button>
        <Button type="submit">Submit</Button>
      </Box>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ marginTop: "1rem", maxWidth: "100%" }}
        />
      )}
      {imageName && <img src={imageName} alt="eiei" />}
    </form>
  );
}

InputFileUpload.authGuard = true
// InputFileUpload.getLayout = function getLayout(page: ReactNode) {
//   return <BlankLayout>{page}</BlankLayout>;
// };