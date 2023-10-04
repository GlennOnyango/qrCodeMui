"use client";
import { PageContainer } from "@/app/components/navbars/PageContainer";
import QRImageDisplay from "@/app/components/ui/imageDisplay";
import QrContext from "@/app/context/QrContext";
import { useFetch } from "@/app/customHooks";
import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";

type CompanyObject = {
  Name: string;
  KRA: string;
  Validity: number;
  date: number;
  expiry: number;
};

export default function QRCodesPage() {
  const qrcontext = useContext(QrContext);
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

  const companyArrayPerm = useMemo(() => {
    return qrcontext.companyArray.length > 0
      ? qrcontext.companyArray
      : imageNames;
  }, [qrcontext.companyArray, imageNames]);

  return (
    <PageContainer>
      <Box
        padding={0}
        overflow={"auto"}
        height={"90vh"}
        bgcolor={"transparent "}
        flexGrow={1}
      >
        <Typography variant="h4" marginBottom={2} textAlign={"center"}>
          Company Qr codes
        </Typography>
        <Grid
          container
          spacing={2}
          p={2}
          overflow={"auto"}
        >
          {companyArrayPerm.map((e) => {
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
