import { inject, injectable } from 'tsyringe';
import { AccountHelper } from '../../helpers/AccountHelper';
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

  async execute({ email, token }: Payload): Promise<void> {
    if (!email || !token) {
      throw new Error('Token or email not found');
    }

    await AccountHelper.validateEmail(email);

    await AccountHelper.verifyToken(token);

    const user = await this.companyRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid company email');
    }

    await this.companyRepository.activeAccount(email);
  }
}
