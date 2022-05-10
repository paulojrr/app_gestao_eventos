import { Router } from 'express';
import { CreateCompanyController } from '../useCases/CreateCompany/CreateCompanyController';

const createCompanyController = new CreateCompanyController();

const companyRoutes = Router();

companyRoutes.post('/create', createCompanyController.handle);

export { companyRoutes };
