import React from "react";
import DialogDetail from "./DialogDetail";
import DialogEnroll from "./DialogEnroll";

const RenderDialogContent = ({ content }: { content: string | null }) => {
  let currentContent;

  switch (content) {
    case "Detail":
        currentContent = <DialogDetail/> ;
      break;
    case "Enroll":
        currentContent = <DialogEnroll/>;
      break;
    // case "Register":
    //     currentContent = "Register";
    //   break;
    default:
        currentContent = ""; // Default to Courses if view is not recognized
  }

  return <>{currentContent}</>;
}

export default RenderDialogContent;
