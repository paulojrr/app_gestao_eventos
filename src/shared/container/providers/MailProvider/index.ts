import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import { MailHogMailProvider } from './implementations/MailHogMailProvider';

container.registerSingleton<IMailProvider>(
  'MailHogMailProvider',
  MailHogMailProvider
);
