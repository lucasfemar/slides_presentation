import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
import { z } from "zod";

export default async function login(
  request: NextApiRequest,
  // response: NextApiResponse,
) {
  const { body } = request;
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const { email, password } = loginSchema.parse(body);
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userExists) {
    throw new Error("Invalid credentials please try again!");
  }

  const isValidPassword = await bcrypt.compare(password, userExists.password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials please try again!");
  }
}
