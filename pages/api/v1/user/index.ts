import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { z } from "zod";
 
interface IApiService {
  GET: (request: NextApiRequest) => Promise<any>;
  POST: (request: NextApiRequest) => Promise<any>;
  DELETE: (request: NextApiRequest) => Promise<any>;
}

const apiService: IApiService = {
  GET: async (request) => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao buscar usuários: ${error.message}`);
      } else {
        throw new Error("Ocorreu um erro desconhecido ao buscar usuáriosn unknown error occurred while fetching users");
      }
    }
  },

  POST: async (request) => { 
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
 
      const emailExists = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (emailExists) {
        throw new Error("Este email já existe");
      }
 
      const createdUser = await prisma.user.create({ data: user });
      return createdUser;
    } catch (error) {
      throw new Error(`Fala para criar usuário: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  DELETE: async (request) => {
    try {
      const { id } = request.query; // Acessando id dos parâmetros de caminho
      if (typeof id !== "string") {
        throw new Error("Formato do ID inválido");
      }
  
      const deletedUser = await prisma.user.delete({
        where: { id: id as string },
      });
  
      return {
        statusCode: 200,
        body: { message: `Usuário ${deletedUser.name} deletado com sucesso!`, deletedUser },
      };
    } catch (error) {
      console.error("Detalhe do Erro:", error);
      return { 
        statusCode: 500, 
        body: { error: error instanceof Error ? error.message : "Ocorreu um erro desconhecido" }
      };
    }
  },  
}
 
async function handleRequest(request: NextApiRequest, response: NextApiResponse) {
  const ALLOWED_METHODS: Array<keyof IApiService> = ["GET", "POST", "DELETE"];
  const method = request.method as keyof IApiService;

  if (!ALLOWED_METHODS.includes(method)) {
    return response.status(405).json({ message: "Método não permitido" });
  }

  try {
    const result = await apiService[method](request);
    return response.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({ error: error.message });
    } else {
      return response.status(500).json({ error: "Ocorreu um erro desconhecido" });
    }
  }
}

export default handleRequest;
