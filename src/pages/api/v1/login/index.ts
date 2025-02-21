import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import jwt from "jsonwebtoken";
import {
  AuthenticationError,
  InternalServerError,
  MethodNotAllowedError,
} from "@/infra/errors";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(postHandler);

export default router.handler({
  onNoMatch: onNoMachHandler,
  onError: onErrorHandler,
});

function onErrorHandler(
  error: any,
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const publicErrorObject = new InternalServerError({
    cause: error,
  });
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onNoMachHandler(request: NextApiRequest, response: NextApiResponse) {
  const publicErrorObject = new MethodNotAllowedError();
  return response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
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
    const publicErrorObject = new AuthenticationError({
      message: "Credenciais invalidas, por favor tente novamente.",
    });
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject.toJSON());
  }

  const isValidPassword = await bcrypt.compare(password, userExists.password);

  if (!isValidPassword) {
    const publicErrorObject = new AuthenticationError({
      message: "Credenciais invalidas, por favor tente novamente.",
    });
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject.toJSON());
  }
  // divide by 1000 to get the velue in second since JS crete it in millisecondes
  // Use math.floor() to remove decimals
  const sessionId = crypto.randomUUID();
  const expirationTime =
    Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      email: userExists.email,
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
}
