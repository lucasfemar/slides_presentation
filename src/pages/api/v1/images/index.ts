import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cwd = process.cwd();
    console.log('Current working directory:', cwd);
    
    const imagesDirectory = path.join(cwd, 'public', 'images');
    
    if (!fs.existsSync(imagesDirectory)) {
      console.error('Diretório de imagens não encontrado:', imagesDirectory);
      return res.status(404).json({ 
        error: 'Diretório de imagens não encontrado',
        directory: imagesDirectory
      });
    }

    console.log('Diretório de imagens encontrado:', imagesDirectory);
    
    const fileNames = fs.readdirSync(imagesDirectory);
    console.log('Arquivos encontrados:', fileNames);

    if (fileNames.length === 0) {
      return res.status(404).json({ 
        error: 'Nenhuma imagem encontrada no diretório',
        directory: imagesDirectory
      });
    }

    const validExtensions = /\.(jpg|jpeg|png|gif|svg)$/i;
    const images = fileNames
      .filter(file => validExtensions.test(file))
      .map(fileName => {
        // Garantir que o caminho da imagem comece com /
        const imagePath = `/images/${fileName}`.replace(/\\/g, '/');
        return {
          src: imagePath,
          alt: fileName.split('.')[0].replace(/_/g, ' ')
        };
      });
    
    console.log('Imagens processadas:', images);

    if (images.length === 0) {
      return res.status(404).json({ 
        error: 'Nenhum arquivo de imagem válido encontrado',
        foundFiles: fileNames
      });
    }

    res.status(200).json(images);
  } catch (error: any) {
    console.error('Erro ao ler diretório de imagens:', error);
    res.status(500).json({ 
      error: 'Falha ao carregar imagens', 
      details: error?.message || 'Erro desconhecido'
    });
  }
} 