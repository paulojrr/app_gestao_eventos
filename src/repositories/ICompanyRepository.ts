import {
  IRequestCreateCompany,
  IResponseCreateCompany,
} from '../useCases/CreateCompany/CreateCompanyDTO';

export interface ICompanyRepository {
  findByEmail(email: string): Promise<IResponseCreateCompany | null>;
  findByCNPJ(cnpj: string): Promise<IResponseCreateCompany | null>;
  create(data: IRequestCreateCompany): Promise<IResponseCreateCompany>;
}
