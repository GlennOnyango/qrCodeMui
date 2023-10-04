import path from "path";
import fs from "fs/promises";
import QRCode from "qrcode";
import xlsx from "xlsx";
import { createHmac } from "crypto";
export async function GET(request: Request) {
  return new Response("Hello World", { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();

  const companyData = {
    name: "Flex",
    KRA: "ASDQ123ADQQ",
    validity: 1,
    date: "02/07/2023",
    expiry: "02/07/2023",
  };
  let verifyData = { company: { ...companyData } };

  const companyError = {
    name: "Flex",
    KRA: "ASDQ123ADQQ",
    validity: 0,
    date: "02/07/2023",
    expiry: "02/07/2023",
  };

  //verifyData = { company: { ...companyError } };

  if (decryptData(data.token)) {
    return new Response(JSON.stringify(verifyData), { status: 200 });
  } else {
    const errorData = { error: "error" };
    return new Response(JSON.stringify(errorData), { status: 200 });
  }
}

const decryptData = (token: string) => {
  let matcher = false;
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "companies.xlsx"
  );
  // Read the XLSX file
  const workbook = xlsx.readFile(filePath);

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert the worksheet data to JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  jsonData.forEach((data: any) => {
    const { Name, KRA, Validity, date, expiry } = data;
    const uniqueValue =
      `${Name}-${KRA}-${Validity}-${date}-${expiry}` + Date.now();
    //Encrypt the unique value
    const encryptedValue = createHmac("sha256", uniqueValue)
      .update("@%*haw12fgasd^8db129h1c k31c[1cv75x3pnee0e.e#@pe23,")
      .digest("hex");
    // console.log(encryptedValue, "-----", token);
    if (encryptedValue === token) {
      matcher = true;
    }
  });

  return matcher;
};
