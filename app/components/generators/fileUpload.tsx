"use client";
import { Box, Button } from "@mui/material";
import FileUploadComponent from "../ui/FileUpload";
import { Dispatch, SetStateAction, useEffect, useState,useContext } from "react";
import Image from "next/image";
import { usePost } from "@/app/customHooks";
import QrContext from "@/app/context/QrContext";

type CompanyValues = {
  excel_file: File | null;
};



type companyDetails = {
  Name: string;
  KRA: string;
  Validity: number;
  date: number;
  expiry: number;
};

export default function QRFile() {
  const Qrcontext = useContext(QrContext);
  const [data, callApi, isLoading, errMessage] = usePost("cbsua", true);
  const [formValues, setFormValues] = useState<CompanyValues>({
    excel_file: null,
  });
  const[nameArrayComplete,setNameArrayComplete] = useState<companyDetails[]>([]);
  const fileUpload = (e: any) => {
    setFormValues({
      ...formValues,
      [Object.keys(e)[0]]: e[Object.keys(e)[0]],
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formUpload = new FormData();
    formUpload.append("excel_file", formValues.excel_file as File);

    callApi(formUpload, "/qrgen");
  };

  useEffect(() => {
    if (data.companies) {
      const nameArray:companyDetails[] = [];
      data.companies.forEach((e: any) => {
        nameArray.push(e);
      });
      setNameArrayComplete(nameArray)
    }
  }, [data]);


  useEffect(()=>{
    Qrcontext.setCompanyArray(nameArrayComplete)
  },[nameArrayComplete]);

  return (
    <>
      <p> Here are somethings to consider before uploading.</p>

      <ol style={{ marginBottom: 68 }}>
        <li>The format of the sheet should be as shown below</li>
        <Image
          src="/model.png"
          width={600}
          height={200}
          alt="Picture of the author"
        />
        <li>Use this feature if you have more than one company.</li>
        <li>You can use this feature to generate lost qr codes.</li>
      </ol>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FileUploadComponent
          text="Upload excel sheet"
          nameValue="excel_file"
          bring={fileUpload}
          customStyling={{ width: "100%" }}
          hideData={false}
          hideDelete={false}
          required
        />

        <Box marginTop={2}>
          <Button
            variant="contained"
            type="submit"
            disabled={formValues.excel_file === null}
          >
            Upload file
          </Button>
        </Box>
      </form>
    </>
  );
}
