import { container } from 'tsyringe';
import { PostgresCompanyRepository } from '../../modules/account/infra/repositories/prisma/PostgresCompanyRepository';
import { ICompanyRepository } from '../../modules/account/repositories/ICompanyRepository';
import './providers/';

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  PostgresCompanyRepository
);
