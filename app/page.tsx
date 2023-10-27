import styles from "./page.module.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PageContainer } from "./components/navbars/PageContainer";

export default function Home() {
  return (

    <PageContainer>
      <Stack direction={"row"} paddingX={4} pt={2}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          p={4}
        >
          <Typography variant="body1">Secure and reliable</Typography>
          <Typography variant="h4" marginY={4}>
            Company QR
          </Typography>
          <Typography variant="subtitle1">
            {" "}
            Generate secure and reliable quick-response codes for your company
            needs. Get different formats from png,jpg and svg to use in your
            ceritificates. Get your company portal to manage generated QR codes.
            Get started by signing up.
          </Typography>
          <Box>
            <Button variant="contained" sx={{ marginTop: "20px" }}>
              Get Started
            </Button>
          </Box>
        </Box>
        <Box
          className={styles.backgroundRight}
          sx={{ flexGrow: 1, backgroundColor: "blue", height: "60vh" }}
          p={4}
        ></Box>
      </Stack>

      <Stack direction={"row"} paddingX={4} pt={2}>
        <Box
          className={styles.backgroundCustomer}
          sx={{ flexGrow: 1, backgroundColor: "blue", height: "60vh" }}
          p={4}
        ></Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          p={4}
        >
          <Typography variant="h4" marginY={4}>
            What our customers say
          </Typography>
          <Typography variant="subtitle1">
            {" "}
            Generate secure and reliable quick-response codes for your company
            needs. Get different formats from png,jpg and svg to use in your
            ceritificates. Get your company portal to manage generated QR codes.
            Get started by signing up.
          </Typography>
        </Box>
      </Stack>
    </PageContainer>
  );
}
