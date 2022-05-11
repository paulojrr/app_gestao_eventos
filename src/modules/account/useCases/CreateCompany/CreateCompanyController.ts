import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';

export class CreateCompanyController {
  public async handle(request: Request, response: Response) {
    const { name, cnpj, email, password } = request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    try {
      const company = await createCompanyUseCase.execute({
        name,
        cnpj,
        email,
        password,
      });

      return response.status(200).json(company);
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: err.message });
    }
  }
}
