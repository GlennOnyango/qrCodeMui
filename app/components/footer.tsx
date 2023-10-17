import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        backgroundColor: "rgb(46, 54, 68)",
      }}
      paddingX={4}
      paddingY={4}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          textAlign={"center"}
          color={"white"}
          sx={{ fontWeight: 700 }}
        >
          @2023 Company QR. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
