import { useState } from 'react';

interface FormData {
  nome: string;
  celular: string;
  ministerio: string;
  email: string;
  senha: string;
  id: string;
}

export const useSubmitData = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  return { formData, setFormData };
};
