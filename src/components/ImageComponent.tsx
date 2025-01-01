import React from "react";
import { Box } from "@mui/material";

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, width = "100%", height = "auto", borderRadius = 0 }) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width,
        height,
        borderRadius,
        objectFit: "cover", // Adjust as needed
      }}
    />
  );
};

export default ImageComponent;
