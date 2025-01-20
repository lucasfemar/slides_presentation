import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import jwt from "jsonwebtoken";

export default async function login(
  request: NextApiRequest,
  response: NextApiResponse,
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

  const token = jwt.sign(
    {
      email: userExists.email,
      name: userExists.name,
    },
    `${process.env.USERTOKEN}`,
    {
      subject: userExists.id,
      expiresIn: "7d",
    },
  );
  response.setHeader(
    "Set-Cookie",
    `auth=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
  );
  return response.status(200).json({
    message: "User authenticated successfully!",
  });
  // TODO
  // [] - Adicionar Middleware para validar se usuário esta logado
  // [] - Padronizar erros no backend
  // [] - Criar fluxo de logout
}
