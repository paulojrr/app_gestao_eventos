export interface IRequestCreateCompany {
  name: string;
  cnpj: string;
  email: string;
  password: string;
}

export interface IResponseCreateCompany {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  actived: boolean;
  created_at: Date;
  updated_at?: Date;
}
