import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { auth } from '../../config/auth';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';

type Payload = {
  email: string;
  token: string;
};

@injectable()
export class ValidateAccountUseCase {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository
  ) {}

  async execute({ email, token }: Payload): Promise<any> {
    console.log(email);
    console.log(token);
    if (!email || !token) {
      throw new Error('Token not found');
    }

    try {
      const decoded = verify(token, auth.secret_token);
      console.log(decoded);
    } catch {
      throw new Error('Invalid token');
    }
  }
}
