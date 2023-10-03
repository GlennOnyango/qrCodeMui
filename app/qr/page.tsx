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
import { useFetch } from "../customHooks";
import { PageContainer } from "../components/navbars/PageContainer";
import Image from "next/image";

type CompanyValues = {
  excel_file: File | null;
};

export default function QR() {
  const [formQr, setForm] = useState(true);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [data, callApi, isLoading] = useFetch();

  const uploadedNames = (e: string[]) => {
    setImageNames(e);
  };

  useEffect(() => {
    if (data.companies?.length > 0) {
      let nameArray: string[] = [];
      data.companies.forEach((e: any) => {
        nameArray.push(e.Name);
      });
      setImageNames(nameArray);
    }
    if (data.fetch === 0) {
      callApi("/qrgen");
    }
  }, [data]);

  return (
    <PageContainer>
      <Stack direction="row" spacing={0}>
        <Box padding={4} width={"50vw"} height={"100vh"} display={"flex"}flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Image
            src="/pakpro-logo.png"
            width={300}
            height={300}
            alt="Picture of the author"
          />
          <Typography variant="h4" marginBottom={4} textAlign={"center"}>
            Use the form on the right side to generate QR codes
          </Typography>
          <Typography variant="body1" textAlign={"center"}>
            You can toggle between the joint button to choose between file
            upload and form filling.
          </Typography>
        </Box>

        <Box padding={4} width={"50vw"} height={"100vh"}>
          <Box
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
          >
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
      </Stack>
    </PageContainer>
  );
}
