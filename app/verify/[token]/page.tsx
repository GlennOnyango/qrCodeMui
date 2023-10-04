"use client";
import { usePost } from "@/app/customHooks";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import styles from "./page.module.css";

export default function Verify({ params }: { params: { token: string } }) {
  const [data, callApi, isLoading] = usePost();

  useEffect(() => {
    if (params.token.length > 0 && Object.keys(data).length === 0) {
      callApi({ token: params.token }, "/verify");
    }
  }, [data, params.token]);

  const companyCheck = useMemo(() => {
    if (isLoading) {
      return (
        <Card>
          <CardContent>
            <CircularProgress />
          </CardContent>
          <CardActions>
            <Button size="small">Cancel</Button>
          </CardActions>
        </Card>
      );
    }
    if (data?.error) {
      return (
        <Card  className={styles.glass} elevation={2}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography variant={"h4"}>Illegal Certificate</Typography>
            <ErrorIcon color="error" sx={{ fontSize: "140px" }} />
            <Typography textAlign={"center"} variant={"body1"}>
              The scanned certificate has been generated illegally. Contact us
              to report any malpractice.
            </Typography>
          </CardContent>
        </Card>
      );
    } else if (data?.company?.validity === 0) {
      return (
        <Card className={styles.glass} elevation={2}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant={"h4"}>Certificate Expired</Typography>
            <WarningIcon color="error" sx={{ fontSize: "140px" }} />
            <Typography textAlign={"center"} variant={"body1"}>
              The scanned certificate has expired visit our offices to renew
              your certificate.
            </Typography>
          </CardContent>
        </Card>
      );
    } else if (data?.company?.validity === 1) {
      return (
        <Card className={styles.glass} elevation={2}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant={"h4"}>Company Verified</Typography>
            <BeenhereIcon color="success" sx={{ fontSize: "140px" }} />
            <Typography textAlign={"center"} variant={"body1"}>
              The company with the name{" "}
              <label style={{ color: "blue" }}>{data.company.name}</label> and
              KRA pin{" "}
              <label style={{ color: "blue" }}>{data.company.KRA}</label> is
              verified and has a legal certificate with number{" "}
              <label style={{ color: "blue" }}>0005123</label>
            </Typography>
          </CardContent>
        </Card>
      );
    }
  }, [data]);

  return (
    <Grid
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      className={styles.main}
      container
    >
      <Grid item lg={4} md={4} xs={10} xl={4}>{companyCheck}</Grid>
    </Grid>
  );
}
