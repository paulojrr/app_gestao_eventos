import crypto from 'crypto';
import Joi from 'joi';

export class Company {
  public readonly id: string;

  public name: string;
  public cnpj: string;
  public email: string;
  public password: string;
  public actived: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor(
    props: Omit<Company, 'id' | 'actived' | 'created_at' | 'updated_at'>,
    id?: string
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = crypto.randomUUID();
    }
  }

  static async validateCNPJ(cnpj: string): Promise<void> {
    const schema = Joi.string().length(14).required();

    const isCNPJ = await schema.validateAsync(cnpj);

    if (!isCNPJ) {
      throw new Error('Invalid CNPJ');
    }
  }
}
