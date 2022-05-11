import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ValidateAccountUseCase } from './ValidateAccountUseCase';

export class ValidateAccountController {
  async handle(request: Request, response: Response) {
    const email = request.params.email as string;
    const token = request.query.token as string;

    const validateAccountUseCase = container.resolve(ValidateAccountUseCase);

    try {
      const isValidToken = await validateAccountUseCase.execute({
        email,
        token,
      });

      return response.status(200).json(isValidToken);
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: err.message });
    }
  }
}
