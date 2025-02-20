import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(getHandler);
router.post(postHandler);

export default router.handler({
  onNoMatch: (request: NextApiRequest, response: NextApiResponse) => {
    return response.status(401).json({
      message: "Erro on Match",
    });
  },
  onError: (error, request: NextApiRequest, response: NextApiResponse) => {
    return response.status(401).json({
      message: "Error on error",
    });
  },
});

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const users = await prisma.users.findMany();
    return response.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Falha ao buscar usuários: ${error.message}`);
    } else {
      throw new Error(
        "Ocorreu um erro desconhecido ao buscar usuáriosn unknown error occurred while fetching users",
      );
    }
  }
}

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const userSchema = z.object({
      name: z.string(),
      phone: z.string(),
      ministery: z.string(),
      email: z.string().email(),
      password: z.string(),
      status: z.boolean(),
    });

    const user = userSchema.parse(request.body);

    const emailExists = await prisma.users.findUnique({
      where: { email: user.email },
    });

    if (emailExists) {
      throw new Error("Este email já existe");
    }
    user.password = bcrypt.hashSync(user.password, 10);
    const createdUser = await prisma.users.create({ data: user });
    return response.status(201).json(createdUser);
  } catch (error) {
    throw new Error(
      `Falha ao criar usuário: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
