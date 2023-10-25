"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  Box,
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import { usePost } from "../../customHooks";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { PageContainer } from "../../components/navbars/PageContainer";

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
    <PageContainer footerShow>
      <Box
        className={styles.main}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          height: "80vh",
        }}
        margin={0}
        padding={4}
      >
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={4}
            direction={"column"}
            padding={4}
            width={"50vw"}
            className={styles.glass}
          >
            <Typography variant="h4" textAlign="center">Create Account</Typography>
            <Stack direction={"row"} spacing={2}>
              <FormControl variant="outlined" fullWidth>
                <Typography component="label" fontSize="16px" lineHeight="2">
                  First Name
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
                  }}
                />
              </FormControl>
              <FormControl variant="outlined" fullWidth>
                <Typography component="label" fontSize="16px" lineHeight="2">
                  Last Name
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
                  }}
                />
              </FormControl>
            </Stack>

            <Stack direction={"row"} spacing={2}>
              <FormControl variant="outlined" fullWidth>
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
                  }}
                />
              </FormControl>

              <FormControl variant="outlined" fullWidth>
                <Typography component="label" fontSize="16px" lineHeight="2">
                  Phone number
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
                  }}
                />
              </FormControl>
            </Stack>

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
          </Stack>
        </form>
      </Box>
    </PageContainer>
  );
}
