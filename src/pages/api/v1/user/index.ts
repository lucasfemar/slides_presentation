import controller from "@/infra/controller";
import { ResourceCreationError, ValidationErrors } from "@/infra/errors";
import { validadeUserAuthentication } from "@/infra/middlewares";
import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { generateUserPassword } from "src/utils";
import { z } from "zod";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(validadeUserAuthentication, getHandler);
router.post(postHandler);

export default router.handler(controller.errorsHandler);

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const users = await prisma.users.findMany();
  return response.status(200).json(users);
}

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
  const userSchema = z.object({
    name: z.string({
      invalid_type_error: "O campo 'name' deve ser uma string válida.",
      required_error: "O campo 'name' é obrigátorio.",
    }),
    phone: z.string({
      invalid_type_error: "O campo 'phone' deve ser uma string válida.",
      required_error: "O campo 'phone' é obrigátorio.",
    }),
    ministery: z.string({
      invalid_type_error: "O campo 'ministery' deve ser uma string válida.",
    }),
    email: z
      .string({
        invalid_type_error: "O campo 'email' deve ser uma string válida.",
        required_error: "O campo 'email' é obrigatório.",
      })
      .email({
        message: "Email informado inválido.",
      }),
    password: z
      .string({
        invalid_type_error: "O campo 'password' deve ser uma string válida.",
        required_error: "O campo 'password' é obrigatório.",
      })
      .min(1, "O campo 'password' é obrigatório."),
  });

  const resultParse = userSchema.safeParse(request.body);
  if (!resultParse.success) {
    const errorsList = [];
    for (const error of resultParse.error.issues) {
      errorsList.push(error.message);
    }
    const publicErrorObject = new ValidationErrors({
      message: errorsList.join(";"),
    });
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject.toJSON());
  }

  const user = resultParse.data;
  const emailExists = await prisma.users.findUnique({
    where: { email: user.email },
  });

  if (emailExists) {
    const publicErrorObject = new ResourceCreationError({
      message: "Este email já existe.",
    });
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject.toJSON());
  }
  user.password = generateUserPassword(user.password);
  const createdUser = await prisma.users.create({
    data: { ...user, status: false },
  });
  return response.status(201).json(createdUser);
}
