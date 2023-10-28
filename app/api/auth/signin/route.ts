import bycrpt from "bcrypt";
import z from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/users";
import jwt from "jsonwebtoken";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  await dbConnect();

  const data = await request.json();
  const result = schema.safeParse(data);

  if (!result.success) {
    return new Response(JSON.stringify(result.error), { status: 400 });
  } else {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 400,
        });
      } else {
        const passwordCompare = bycrpt.compare(data.password, user.password);

        if (!passwordCompare) {
          return new Response(JSON.stringify({ message: "Invalid password" }), {
            status: 400,
          });
        } else {
          const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
          );

          return new Response(JSON.stringify({ token: token }), {
            status: 200,
          });
        }
      }
    } catch (error) {}
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
