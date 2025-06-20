import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer, { FileFilterCallback } from "multer";
import controller from "@/infra/controller";
import { ValidationErrors } from "@/infra/errors";

// Configurar multer com storage em memória e validação de tipo/size
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req: NextApiRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new ValidationErrors({ message: "Apenas arquivos PNG e JPEG são permitidos." }));
    }
  },
});

interface MulterNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

const router = createRouter<MulterNextApiRequest, NextApiResponse>();

// Desliga body parser padrão para permitir multer processar multipart
export const config = {
  api: {
    bodyParser: false,
  },
};

// Middleware multer para receber um arquivo no campo "image"
router.use(upload.single("image"));

router.post(async (req, res) => {
  if (!req.file) {
    const error = new ValidationErrors({ message: "Nenhuma imagem enviada." });
    return res.status(error.statusCode).json(error.toJSON());
  }

  const { originalname, mimetype, size, buffer } = req.file;

  // Converter buffer para base64
  const base64 = buffer.toString("base64");
  const base64Prefix = `data:${mimetype};base64,`;

  // Aqui você pode salvar no banco, armazenar no sistema de arquivos, etc.
  // Exemplo: retornar dados básicos da imagem e o base64
  return res.status(200).json({
    message: "Imagem recebida com sucesso",
    originalname,
    mimetype,
    size,
    base64Prefix,
    base64,
  });
});

export default router.handler(controller.errorsHandler);
