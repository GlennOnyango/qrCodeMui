import path from "path";
import fs from "fs/promises";
import QRCode from "qrcode";
import xlsx from "xlsx";
import QR from "@/app/qr/page";
import { createHmac } from "crypto";
export async function GET(request: Request) {
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
    superFunction(
      Name,
      KRA,
      Validity,
      date,
      expiry,
      request.headers.get("origin")?.toString() as string
    );
  });

  const companies = { companies: jsonData };

  return new Response(JSON.stringify(companies), { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File = data.get("excel_file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //Save file to disk
  const filePath = path.join(process.cwd(), "public", "uploads", file.name);
  await fs.writeFile(filePath, buffer);

  // Read the XLSX file
  const workbook = xlsx.readFile(filePath);

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert the worksheet data to JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  jsonData.forEach((data: any) => {
    const { Name, KRA, Validity, date, expiry } = data;
    superFunction(
      Name,
      KRA,
      Validity,
      date,
      expiry,
      request.headers.get("origin")?.toString() as string
    );
  });

  return new Response(JSON.stringify({ companies: jsonData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const superFunction = async (
  name: string,
  KRA: string,
  validity: string,
  date: string,
  expiry: string,
  host: string
) => {
  // Generate a unique value
  const uniqueValue =
    `${name}-${KRA}-${validity}-${date}-${expiry}` + Date.now();

  //Encrypt the unique value
  const encryptedValue = createHmac("sha256", uniqueValue)
    .update("@%*haw12fgasd^8db129h1c k31c[1cv75x3pnee0e.e#@pe23,")
    .digest("hex");

  const qrLInk = `${host}/api/qr-validate/${encryptedValue}`;

  const filePath = path.join(process.cwd(), "public", "qrImages", name);

  // Generate the QR code image
  const qrImage = await QRCode.toFile(`${filePath}.png`, qrLInk);
};
