import z from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/users";
import bycrpt from "bcrypt";

const schema = z.object({
  firstname: z.string().min(1, "First name cannot be empty"),
  lastname: z.string().min(1, "Last name cannot be empty"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phonenumber: z
    .number()
    .min(10, "Invalid phone number")
    .max(12, "Invalid phone number"),
});

export async function POST(request: Request) {
  //We expect the request to have a body with the following format:
  //{firstname: string, lastname: string, email: string, password: string, phonenumber: string}

  await dbConnect();

  const data = await request.json();

  const result = schema.safeParse(data);

  if (!result.success) {
    return new Response(JSON.stringify(result.error), { status: 400 });
  } else {
    //Do something with the data
    try {
      const createPassword = {
        ...data,
        password: await bycrpt.hash(data.password, 10),
      };
      const user = await User.create(
        createPassword
      ); /* create a new model in the database */
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 400 });
    }
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
