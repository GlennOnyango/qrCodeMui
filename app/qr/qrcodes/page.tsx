"use client";
import { PageContainer } from "@/app/components/navbars/PageContainer";
import QRImageDisplay from "@/app/components/ui/imageDisplay";
import { useFetch } from "@/app/customHooks";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type CompanyObject = {
  Name: string;
  KRA: string;
  Validity: number;
  date: number;
  expiry: number;
};

export default function QRCodesPage() {
  const [imageNames, setImageNames] = useState<CompanyObject[]>([]);
  const [data, callApi, isLoading] = useFetch();

  useEffect(() => {
    if (data.companies?.length > 0) {
      let nameArray: CompanyObject[] = [];
      data.companies.forEach((e: any) => {
        nameArray.push(e);
      });
      setImageNames(nameArray);
    }
    if (data.fetch === 0) {
      callApi("/qrgen");
    }
  }, [data]);

  return (
    <PageContainer>
      <Box padding={4} overflow={"auto"} bgcolor={"transparent"} flexGrow={1}>
        <Typography variant="h4" marginBottom={4} textAlign={"center"}>
          Company Qr codes
        </Typography>
        <Grid container spacing={2} p={2} overflow={"auto"}>
          {imageNames.map((e) => {
            return (
              <QRImageDisplay
                Name={e.Name}
                key={e.KRA}
                KRA={e.KRA}
                Validity={e.Validity}
                date={e.date}
                expiry={e.expiry}
              />
            );
          })}
        </Grid>
      </Box>
    </PageContainer>
  );
}
