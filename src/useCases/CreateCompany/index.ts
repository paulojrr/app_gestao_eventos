import { PrismaClient } from '@prisma/client';
import { PostgressCompanyRepository } from '../../repositories/implementations/PostgresCompanyRepository';
import { CreateCompanyController } from './CreateCompanyController';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';

const prisma = new PrismaClient();

const postgresCompanyRepository = new PostgressCompanyRepository(prisma);

const createCompanyUseCase = new CreateCompanyUseCase(
  postgresCompanyRepository
);

const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
);

export { createCompanyUseCase, createCompanyController };
