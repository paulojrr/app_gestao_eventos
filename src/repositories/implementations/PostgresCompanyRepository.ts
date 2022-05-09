import { PrismaClient } from '@prisma/client';
import {
  IRequestCreateCompany,
  IResponseCreateCompany,
} from '../../useCases/CreateCompany/CreateCompanyDTO';
import { ICompanyRepository } from '../ICompanyRepository';

export class PostgressCompanyRepository implements ICompanyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<IResponseCreateCompany | null> {
    const company = await this.prisma.company.findUnique({
      where: {
        email,
      },
    });

    return company;
  }

  async findByCNPJ(cnpj: string): Promise<IResponseCreateCompany | null> {
    const company = await this.prisma.company.findUnique({
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
    const company = await this.prisma.company.create({
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
}
