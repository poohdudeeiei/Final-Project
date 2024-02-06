
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { error } from "console";
import { useAuth } from "@/้hooks/useAuth";
import { useEffect } from "react";

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

  const auth = useAuth()

  const [photo, setPhoto] = useState<File[] | null>([]);
  const [preview, setPreview] = useState<string[] | null>([]);
  const [imageName, setImageName] = useState<string[] | null>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    if (photo) {
      try {
        // console.log("File submitted:", photo);
        // Add logic to handle the submitted file
        const formData = new FormData();
        formData.append("photos", photo[0]);
        formData.append("photos", photo[1]);
        formData.append("photos", photo[2]);
        const result = await axios.post(
          "http://localhost:8080/api/images",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setImageName(result.data?.imageLists);
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
            multiple
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedFiles = e.target.files;

              if (selectedFiles) {
                const filesArray: File[] = Array.from(selectedFiles);
                setPhoto(filesArray);

                // Optionally, you can set the preview as well
                setPreview(
                  filesArray.length > 0
                    ? filesArray.map((photo, idx) => {
                        return URL.createObjectURL(photo);
                      })
                    : null
                );
              } else {
                setPhoto(null);
                setPreview(null);
              }
            }}
          />
        </Button>
        <Button type="submit">Submit</Button>
      </Box>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Typography>Preview Photo</Typography>
        {preview &&
          preview.map((photo, idx) => {
            return (
              <img
                key={idx}
                src={photo}
                alt="Preview"
                style={{ marginTop: "1rem", width: "300px", height: "auto" }}
              />
            );
          })}
      </Box>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Typography>Uploaded Photo</Typography>
        {imageName &&
          imageName.map((path, idx) => {
            return (
              <img
                key={idx}
                src={"http://localhost:8080/" + path}
                alt="eiei"
                style={{ marginTop: "1rem", width: "300px", height: "auto" }}
              />
            );
          })}
      </Box>
    </form>
  );
}

InputFileUpload.guestGuard = true