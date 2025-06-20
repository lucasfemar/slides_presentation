export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  ministery: string;
  password: string;
  status: boolean;
}

export interface Image {
  id: string;
  ministery: string;
  start_date: Date;
  expire_date: Date;
  base64: string;
  mimetype: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}
