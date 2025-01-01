import React, { useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { getAuthUrl } from "./utils";
import { myColors } from "../../constants";

const NewLandingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const AUTH_URL = getAuthUrl();
  const drawStarsAndLines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw random stars
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2 + 1; // Random radius between 1 and 3
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    // Draw random curved lines
    for (let i = 0; i < 5; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const cpX = startX + (Math.random() * 50 - 25); // Random control point X
      const cpY = startY + (Math.random() * 50 - 25); // Random control point Y
      const endX = startX + (Math.random() * 50 - 25);
      const endY = startY + (Math.random() * 50 - 25);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const resizeCanvas = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          drawStarsAndLines(ctx, canvas.width, canvas.height);
        };
        resizeCanvas();

        // Redraw on window resize
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
      }
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        position: "relative",
        padding: 0,
        margin: 0,
        maxWidth: "100%",
        overflow: "hidden", // Ensure no overflow
        background: myColors.backgroundLP,
      }}
    >
      {/* Canvas for stars */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // Ignore interactions
        }}
      />

      {/* Left Image */}
      <Box
        component="img"
        src="/images/zikup_singer_1.png"
        alt="Left Side Image"
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "auto",
        }}
      />

      {/* Right Image */}
      <Box
        component="img"
        src="/images/zikup_singer_2.png"
        alt="Right Side Image"
        sx={{
          position: "absolute",
          right: 0,
          top: 90,
          height: "80%",
          width: "auto",
        }}
      />

      {/* Main Content */}
      <Typography variant="h2" gutterBottom>
        Welcome to Our Platform
      </Typography>
      <Typography marginBottom={15} variant="h6" gutterBottom>
        Explore our features and start your journey with us.
      </Typography>
      <Button href={AUTH_URL} variant="contained" color="primary">
        Get Started
      </Button>
    </Box>
  );
};

export default NewLandingPage;
