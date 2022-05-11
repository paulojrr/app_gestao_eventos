import { Router } from 'express';
import { CreateCompanyController } from '../../../../modules/account/useCases/CreateCompany/CreateCompanyController';
import { ValidateAccountController } from '../../../../modules/account/useCases/ValidateAccount/ValidateAccountController';

const createCompanyController = new CreateCompanyController();
const validaAccountController = new ValidateAccountController();

const companyRoutes = Router();

companyRoutes.post('/create', createCompanyController.handle);
companyRoutes.get('/validate-account/:email', validaAccountController.handle);

export { companyRoutes };
