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
    <PageContainer>
      <Box
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
      </Box>
    </PageContainer>
  );
}
