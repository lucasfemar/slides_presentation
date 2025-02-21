import prisma from "@/lib/prisma";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationError } from "./errors";

interface IPayload {
  sub: string;
  sessionId: string;
  exp: number;
}

export async function validadeUserAuthentication(
  request: NextApiRequest,
  response: NextApiResponse,
  next: any,
) {
  // Capturar token da sessão
  const token = request.cookies["auth"] || "";
  // Validar autenticidade do token
  try {
    const jwtDecoded = jwt.verify(
      token,
      `${process.env.USERTOKEN}`,
    ) as IPayload;

    // Validar no banco se o login esta ativo
    const { sessionId, sub } = jwtDecoded;
    const userSession = await prisma.userSessions.findFirst({
      where: {
        token: token,
        sessionId: sessionId,
        userId: sub,
      },
    });

    if (!userSession || !userSession.status) {
      const publicErrorObject = new AuthenticationError({
        message: "Esse token já expirou.",
      });
      return response
        .status(publicErrorObject.statusCode)
        .json(publicErrorObject.toJSON());
    }
    request.body = {
      ...request.body,
      user_id: sub,
    };
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      await prisma.userSessions.deleteMany({
        where: {
          token,
        },
      });
    }
    const publicErrorObject = new AuthenticationError();
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject.toJSON());
  }
  await next();
}
