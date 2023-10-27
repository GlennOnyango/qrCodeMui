"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { PageContainer } from "../../components/navbars/PageContainer";
import stepperImage from "../../../public/resources/createAccountStepper.svg";
import Image from "next/image";
import { useMutation } from "react-query";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  const mutation = useMutation((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return axios.post("/api/auth/signup", formValues);
  });

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
          justifyContent: "space-between",
          overflowY: "auto",
        }}
        margin={0}
        padding={4}
      >
        <form onSubmit={mutation.mutate}>
          <Stack
            spacing={4}
            direction={"column"}
            padding={4}
            width={"50vw"}
            className={styles.glass}
          >
            <Typography variant="h4" textAlign="center">
              Create Account
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <FormControl variant="outlined" fullWidth>
                <Typography component="label" fontSize="16px" lineHeight="2">
                  First Name
                </Typography>
                <OutlinedInput
                  required
                  id="outlined-required"
                  type="text"
                  name="firstname"
                  placeholder="john"
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
                  type="text"
                  name="lastname"
                  placeholder="Doe"
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
                  type="text"
                  name="phonenumber"
                  placeholder="07********"
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            overflowY: "hidden",
          }}
          margin={0}
          padding={4}
        >
          <Image
            src={stepperImage}
            alt="create account stepper"
            width={350}
            height={350}
          />
        </Box>
      </Box>
    </PageContainer>
  );
}
