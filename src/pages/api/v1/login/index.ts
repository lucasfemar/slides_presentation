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
  const userExists = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!userExists) {
    return response
      .status(401)
      .json({ message: "Invalid credentials please try again!" });
  }

  const isValidPassword = await bcrypt.compare(password, userExists.password);

  if (!isValidPassword) {
    return response
      .status(401)
      .json({ message: "Invalid credentials please try again!" });
  }
  // divide by 1000 to get the velue in second since JS crete it in millisecondes
  // Use math.floor() to remove decimals
  const sessionId = crypto.randomUUID();
  const expirationTime =
    Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      email: userExists.email,
      name: userExists.name,
      sessionId,
    },
    `${process.env.USERTOKEN}`,
    {
      subject: userExists.id,
      expiresIn: 7 * 24 * 60 * 60, // alredy in seconds
    },
  );
  await prisma.userSessions.create({
    data: {
      userId: userExists.id,
      sessionId,
      token,
      expirationTimestamp: expirationTime,
      status: true,
    },
  });
  response.setHeader("Set-Cookie", `auth=${token}`);
  return response.status(200).json({
    message: "User authenticated successfully!",
  });
  // TODO
  // [] - Adicionar Middleware para validar se usuário esta logado
  // [] - Padronizar erros no backend
  // [] - Criar fluxo de logout
}
