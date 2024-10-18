import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function users(request: NextApiRequest, response: NextApiResponse) {
  const users = await prisma.user.findMany();

  response.status(200).json(users);
}
export default users;
