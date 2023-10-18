import isEmail from "validator/lib/isEmail";
import isNumeric from "validator/lib/isNumeric";
import isLength from "validator/lib/isLength";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  return new Response("Hello World", { status: 200 });
}

export async function POST(request: Request) {
  //We expect the request to have a body with the following format:
  //{firstname: string, lastname: string, email: string, password: string, phonenumber: string}
  const data = await request.json();

  //Validate the data
  if (
    isEmail(data.email) &&
    isNumeric(data.phonenumber) &&
    isLength(data.password, { min: 8 }) &&
    data.password.length > 8 &&
    data.firstname.length > 0 &&
    data.lastname.length > 0
  ) {
    //Save the data to the database
    //Return a response
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);
  } else {
    return new Response("Invalid email", { status: 400 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
