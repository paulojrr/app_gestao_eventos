import { Company } from '../../entities/Company';
import { IMailProvider } from '../../providers/IMailProvider';
import { PostgressCompanyRepository } from '../../repositories/implementations/PostgresCompanyRepository';
import {
  IRequestCreateCompany,
  IResponseCreateCompany,
} from './CreateCompanyDTO';

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: PostgressCompanyRepository,
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

    const company = await this.companyRepository.create(data);

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
      body: 'Você já pode realizar o acesso a plataforma',
    });

    return company;
  }
}
