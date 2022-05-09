import { Request, Response } from 'express';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';

export class CreateCompanyController {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {}

  public async handle(request: Request, response: Response) {
    const { name, cnpj, email, password } = request.body;

    try {
      const company = await this.createCompanyUseCase.execute({
        name,
        cnpj,
        email,
        password,
      });

      return response.status(200).json(company);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
