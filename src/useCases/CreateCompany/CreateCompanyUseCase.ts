import { Company } from '../../entities/Company';
import { PostgressCompanyRepository } from '../../repositories/implementations/PostgresCompanyRepository';
import {
  IRequestCreateCompany,
  IResponseCreateCompany,
} from './CreateCompanyDTO';

export class CreateCompanyUseCase {
  constructor(private companyRepository: PostgressCompanyRepository) {}

  async execute(data: IRequestCreateCompany): Promise<IResponseCreateCompany> {
    await Company.valiteEmail(data.email);

    const isEmail = await this.companyRepository.findByEmail(data.email);

    if (isEmail) {
      throw new Error('Email already exists');
    }

    await Company.valiteCNPJ(data.cnpj);

    const isCNPJ = await this.companyRepository.findByCNPJ(data.cnpj);

    if (isCNPJ) {
      throw new Error('CNPJ already exists');
    }

    const company = await this.companyRepository.create(data);

    return company;
  }
}
