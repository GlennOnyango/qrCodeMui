"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import FileUploadComponent from "../components/ui/FileUpload";
import { useCallback, useEffect, useMemo, useState } from "react";
import QRFile from "../components/generators/fileUpload";
import QRForm from "../components/generators/formUpload";
import QRImageDisplay from "../components/ui/imageDisplay";

import styles from "./page.module.css";

type CompanyValues = {
  excel_file: File | null;
};

export default function QR() {
  const [formValues, setFormValues] = useState<CompanyValues>({
    excel_file: null,
  });

  const [formQr, setForm] = useState(true);
  const [imageNames, setImageNames] = useState<string[]>([]);

  const fileUpload = (e: any) => {
    setFormValues({
      ...formValues,
      [Object.keys(e)[0]]: e[Object.keys(e)[0]],
    });
  };

  const uploadedNames = (e: string[]) => {
    setImageNames(e);
  };

  return (
    <Stack direction="row" className={styles.forms} spacing={0}>
      <Box padding={4}  width={"50vw"} height={"100vh"}>
        <Typography variant="h4" marginBottom={4}>
          Generate company Qr codes
        </Typography>

        <Box display={"flex"} alignContent={"center"} justifyContent={"center"}>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <Button
              variant={formQr ? "contained" : "outlined"}
              onClick={() => setForm(true)}
            >
              Use Excel Sheet
            </Button>
            <Button
              variant={formQr ? "outlined" : "contained"}
              onClick={() => setForm(false)}
            >
              Use Form
            </Button>
          </ButtonGroup>
        </Box>

        <Box pt={4}>
          {formQr ? <QRFile sendImages={uploadedNames} /> : <QRForm />}
        </Box>
      </Box>

      <Box padding={4} overflow={"auto"} bgcolor={"transparent"} flexGrow={1}>
        <Typography variant="h4" marginBottom={4} textAlign={"center"}>
          Company Qr codes
        </Typography>
        <Grid container spacing={2} p={2} overflow={"auto"}>
          {imageNames.map((e) => {
            return <QRImageDisplay Name={e} key={e} />;
          })}
        </Grid>
      </Box>
    </Stack>
  );
}
