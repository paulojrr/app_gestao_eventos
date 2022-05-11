import { prismaClient } from '../../../../../shared/infra/prisma';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';
import {
  IRequestCreateCompany,
  IResponseCreateCompany,
} from '../../../useCases/CreateCompany/CreateCompanyDTO';

export class PostgresCompanyRepository implements ICompanyRepository {
  async findByEmail(email: string): Promise<IResponseCreateCompany | null> {
    const company = await prismaClient.company.findUnique({
      where: {
        email,
      },
    });

    return company;
  }

  async findByCNPJ(cnpj: string): Promise<IResponseCreateCompany | null> {
    const company = await prismaClient.company.findUnique({
      where: {
        cnpj,
      },
      select: {
        id: true,
        name: true,
        cnpj: true,
        email: true,
        actived: true,
        created_at: true,
        updated_at: true,
      },
    });

    return company;
  }

  async create(data: IRequestCreateCompany): Promise<IResponseCreateCompany> {
    const company = await prismaClient.company.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        email: data.email,
        password: data.password,
      },
    });

    const companyData = { ...company };

    return {
      id: companyData.id,
      name: companyData.name,
      cnpj: companyData.cnpj,
      email: companyData.email,
      actived: companyData.actived,
      created_at: companyData.created_at,
      updated_at: companyData.updated_at,
    };
  }

  async activeAccount(email: string): Promise<void> {
    await prismaClient.company.update({
      where: { email },
      data: { actived: true },
    });
  }
}
