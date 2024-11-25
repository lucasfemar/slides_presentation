import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface IApiService {
  DELETE: (request: NextApiRequest) => Promise<any>;
}

const apiService: IApiService = {
  DELETE: async (request) => {
    try {
      const { id } = request.query; // Acessando id dos parâmetros de caminho
      console.log(id);
      if (typeof id !== "string") {
        throw new Error("Formato do ID inválido");
      }

      const deletedUser = await prisma.user.delete({
        where: { id: id as string },
      });

      return {
        statusCode: 200,
        body: {
          message: `Usuário ${deletedUser.name} deletado com sucesso!`,
          deletedUser,
        },
      };
    } catch (error) {
      console.error("Detalhe do Erro:", error);
      return {
        statusCode: 500,
        body: {
          error:
            error instanceof Error
              ? error.message
              : "Ocorreu um erro desconhecido",
        },
      };
    }
  },
};

async function handleRequest(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const ALLOWED_METHODS: Array<keyof IApiService> = ["DELETE"];
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
      return response
        .status(500)
        .json({ error: "Ocorreu um erro desconhecido" });
    }
  }
}

export default handleRequest;
