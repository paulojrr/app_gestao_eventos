import { hash } from 'bcrypt';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import { auth } from '../config/auth';
import { CompanyValidations } from './validations/CompanyValidations';

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

  static async valiteEmail(email: string): Promise<boolean> {
    const isValidEmail = await CompanyValidations.isValidEmail(email);

    if (!isValidEmail) {
      return false;
    }

    return true;
  }

  static async valiteCNPJ(cnpj: string): Promise<boolean> {
    const isValidCNPJ = await CompanyValidations.isValidCNPJ(cnpj);

    if (!isValidCNPJ) {
      return false;
    }

    return true;
  }

  static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);

    return hashedPassword;
  }

  static async generateToken(id: string): Promise<string> {
    const token = sign({}, auth.secret_token, {
      subject: id,
      expiresIn: auth.expiresIn,
    });

    return token;
  }
}
