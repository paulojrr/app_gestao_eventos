import { PrismaClient } from '@prisma/client';
import { MailHogMailProvider } from '../../providers/implementations/MailHogMailProvider';
import { PostgressCompanyRepository } from '../../repositories/implementations/PostgresCompanyRepository';
import { CreateCompanyController } from './CreateCompanyController';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';

const prisma = new PrismaClient();

const postgresCompanyRepository = new PostgressCompanyRepository(prisma);

const mailHogMailProvider = new MailHogMailProvider();

const createCompanyUseCase = new CreateCompanyUseCase(
  postgresCompanyRepository,
  mailHogMailProvider
);

const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
);

export { createCompanyUseCase, createCompanyController };
