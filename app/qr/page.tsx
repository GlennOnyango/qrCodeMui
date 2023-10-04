"use client";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QRFile from "../components/generators/fileUpload";
import QRForm from "../components/generators/formUpload";
import { PageContainer } from "../components/navbars/PageContainer";
import Image from "next/image";

type companyDetails = {
  Name: string;
  KRA: string;
  Validity: number;
  date: number;
  expiry: number;
};

export default function QR() {
  const [formQr, setForm] = useState(true);
  const [imageNames, setImageNames] = useState<companyDetails[]>([]);

  const uploadedNames = (e: companyDetails[]) => {
    setImageNames(e);
  };

  return (
    <PageContainer>
      <Stack direction="row" spacing={0}>
        <Box
          padding={4}
          width={"50vw"}
          height={"90vh"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
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

        <Box padding={4} width={"50vw"} height={"90vh"}>
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

          <Box pt={4}>{formQr ? <QRFile /> : <QRForm />}</Box>
        </Box>
      </Stack>
    </PageContainer>
  );
}
