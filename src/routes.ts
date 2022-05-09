import { Router } from 'express';
import { createCompanyController } from './useCases/CreateCompany';

const router = Router();

router.post('/company', (request, response) => {
  return createCompanyController.handle(request, response);
});

export { router };
