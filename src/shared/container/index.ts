import { container } from 'tsyringe';
import { IMailProvider } from '../../providers/IMailProvider';
import { MailHogMailProvider } from '../../providers/implementations/MailHogMailProvider';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import { PostgresCompanyRepository } from '../../repositories/implementations/PostgresCompanyRepository';

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  PostgresCompanyRepository
);

container.registerSingleton<IMailProvider>(
  'MailHogMailProvider',
  MailHogMailProvider
);
