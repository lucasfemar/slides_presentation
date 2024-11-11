import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { z } from "zod";

interface IApiService {
  [key: string]: any;
}

const apiService: IApiService = {
  GET: async (request: NextApiRequest) => {
    const users = await prisma.user.findMany();
    return users;
  },
  POST: async (request: NextApiRequest) => {
    const { body } = request;
    const userSchema = z.object({
      name: z.string(),
      phone: z.string(),
      ministery: z.string(),
      email: z.string(),
      password: z.string(),
      status: z.boolean(),
    });
    const user = userSchema.parse(body);
    const createdUser = await prisma.user.create({
      data: user,
    });
    return createdUser;
  },
};

async function createUser(request: NextApiRequest, response: NextApiResponse) {
  const ALLOWED_METHODS = ["GET", "POST", "DELETE"];
  const method = String(request.method);
  const isAllowed = ALLOWED_METHODS.find(
    (allowedItem) => allowedItem === method,
  );
  if (!isAllowed) {
    return response.json("METHOD IS NOT ALLOWED");
  }
  const result = await apiService[method](request);
  return response.json(result);
}

export default createUser;
