import { PrismaClient } from '.prisma/client';
import { PostgressCompanyRepository } from '../../repositories/implementations/PostgresCompanyRepository';
import { IRequestCreateCompany } from './CreateCompanyDTO';

describe('Create company', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    await prisma.company.deleteMany({});
  });

  it('Should be able to create a company', async () => {
    const companyData: IRequestCreateCompany = {
      name: 'Etec',
      cnpj: '33041260065290',
      email: '',
      password: 'Admin@12',
    };

    const postgressCompanyRepository = new PostgressCompanyRepository(prisma);
    const company = await postgressCompanyRepository.create(companyData);

    expect(company).toHaveProperty('id');
    expect(company.name).toEqual(companyData.name);
    expect(company.cnpj).toEqual(companyData.cnpj);
    expect(company.email).toBeFalsy();
    expect(company.actived).toBeFalsy();
    expect(company).toHaveProperty('created_at');
    expect(company).toHaveProperty('updated_at');
  });

  it('Should not be able to create a company with invalid name', async () => {
    const companyData: IRequestCreateCompany = {
      name: '',
      cnpj: '33041260065290',
      email: 'etec@etec.com',
      password: 'Admin@12',
    };

    const postgressCompanyRepository = new PostgressCompanyRepository(prisma);
    const company = await postgressCompanyRepository.create(companyData);

    expect(company).toHaveProperty('id');
    expect(company.name).toBeFalsy();
    expect(company.cnpj).toEqual(companyData.cnpj);
    expect(company.email).toEqual(companyData.email);
    expect(company.actived).toBeFalsy();
    expect(company).toHaveProperty('created_at');
    expect(company).toHaveProperty('updated_at');
  });

  it('Should not be able to create a company with invalid CNPJ', async () => {
    const companyData: IRequestCreateCompany = {
      name: 'Etec',
      cnpj: '3304126006529099',
      email: 'etec@etec.com',
      password: 'Admin@12',
    };

    const postgressCompanyRepository = new PostgressCompanyRepository(prisma);
    const company = await postgressCompanyRepository.create(companyData);

    expect(company).toHaveProperty('id');
    expect(company.name).toEqual(companyData.name);
    expect(company.cnpj).not.toHaveLength(14);
    expect(company.email).toEqual(companyData.email);
    expect(company.actived).toBeFalsy();
    expect(company).toHaveProperty('created_at');
    expect(company).toHaveProperty('updated_at');
  });
});
