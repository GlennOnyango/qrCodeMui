"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usePost } from "./customHooks";
import { PageContainer } from "./components/navbars/PageContainer";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, callApi, isLoading, errMessage] = usePost();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callApi(formValues, "/auth/signin");
    //ctx.login(formValues);
  };

  useEffect(() => {
    if (data.email === "glenntedd@gmail.com") {
      console.log("done");

      router.push("/qr");
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
        className={styles.backgroundRight} sx={{ flexGrow: 1, backgroundColor: "blue",height:"60vh" }} p={4}>
          
        </Box>
      </Stack>

      <Stack direction={"row"} paddingX={4} pt={2}>
        <Box
          className={styles.backgroundLeft}
          sx={{ flexGrow: 1, backgroundColor: "blue",height:"60vh" }}
          p={4}>
            <Image src="/qr.png" width={500} height={500} alt="customer" />
          </Box>
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

      {/* <Box
        className={styles.main}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
        }}
        margin={0}
      >
        <Grid container spacing={2} className={styles.glass} width={"50vh"}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl variant="outlined" fullWidth sx={{ padding: "20px" }}>
              <Typography component="label" fontSize="16px" lineHeight="2">
                Your Email Address
              </Typography>
              <OutlinedInput
                required
                id="outlined-required"
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                onChange={handleInputChange}
                sx={{
                  borderRadius: "13px",
                  backgroundColor: "white",
                  marginBottom: "40px",
                }}
              />

              <FormControl variant="outlined">
                <Typography component="label" fontSize="16px" lineHeight="2">
                  Your Password
                </Typography>

                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                  name="password"
                  sx={{ borderRadius: "13px", backgroundColor: "white" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Typography
                component="a"
                textAlign="end"
                marginBottom={2}
                marginTop={2}
                color="primary.main"
                sx={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>

              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Box> */}
    </PageContainer>
  );
}
