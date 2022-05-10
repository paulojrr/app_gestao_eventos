import { inject, injectable } from 'tsyringe';
import { Company } from '../../entities/Company';
import { IMailProvider } from '../../providers/IMailProvider';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import {
  IRequestCreateCompany,
  IResponseCreateCompany,
} from './CreateCompanyDTO';

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
    @inject('MailHogMailProvider')
    private mailProvider: IMailProvider
  ) {}

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

    const hashedPassword = await Company.hashPassword(data.password);

    data.password = hashedPassword;

    const company = await this.companyRepository.create(data);

    const token = await Company.generateToken(company.id);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'App Gestão de Eventos',
        email: 'gestaoeventos@gestaoeventos.com',
      },
      subject: 'Seja bem-vindo á plataforma',
      body: `Para realizar a confirmação da conta, click no no link ${token}`,
    });

    return company;
  }
}
