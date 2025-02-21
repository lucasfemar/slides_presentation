import {
  InternalServerError,
  MethodNotAllowedError,
  ResourceCreationError,
} from "@/infra/errors";
import { validadeUserAuthentication } from "@/infra/middlewares";
import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { generateUserPassword } from "src/utils";
import { z } from "zod";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(validadeUserAuthentication);
router.get(getHandler);
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

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const users = await prisma.users.findMany();
  return response.status(200).json(users);
}

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
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
    const publicErrorObject = new ResourceCreationError({
      message: "Este email já existe.",
    });
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject.toJSON());
  }
  user.password = generateUserPassword(user.password);
  const createdUser = await prisma.users.create({ data: user });
  return response.status(201).json(createdUser);
}
