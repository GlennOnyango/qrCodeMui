export async function GET(request: Request) {
  return new Response("Hello World", { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();

  console.log(data)
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
  const errorData = { error: "error" };

  return new Response(JSON.stringify(errorData), { status: 200 });
}
