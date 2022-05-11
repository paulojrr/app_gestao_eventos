import { inject, injectable } from 'tsyringe';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { AccountHelper } from '../../helpers/AccountHelper';
import { Company } from '../../infra/entities/Company';
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
    await AccountHelper.validateEmail(data.email);

    const isEmail = await this.companyRepository.findByEmail(data.email);

    if (isEmail) {
      throw new Error('Email already exists');
    }

    await Company.validateCNPJ(data.cnpj);

    const isCNPJ = await this.companyRepository.findByCNPJ(data.cnpj);

    if (isCNPJ) {
      throw new Error('CNPJ already exists');
    }

    const hashedPassword = await AccountHelper.hashPassword(data.password);

    data.password = hashedPassword;

    const company = await this.companyRepository.create(data);

    const token = await AccountHelper.generateToken(company.id);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'App Gestão de Eventos',
        email: 'gestaoeventos@gestaoeventos.com',
      },
      subject: 'Seja bem-vindo à plataforma de Gestão de Eventos',
      body: `Para realizar a confirmação da sua conta, click no link 
      http://${process.env.HOST}:${process.env.PORT}/company/validate-account/${data.email}?token=${token}`,
    });

    return company;
  }
}
