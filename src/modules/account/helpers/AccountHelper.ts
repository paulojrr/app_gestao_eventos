import { hash } from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { auth } from '../../../config/auth';

export class AccountHelper {
  static async validateEmail(email: string): Promise<void> {
    const schema = Joi.string().email().required();

    const isEmail = await schema.validateAsync(email);

    if (!isEmail) {
      throw new Error('Invalid email');
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);

    return hashedPassword;
  }

  static async verifyToken(token: string): Promise<void> {
    jwt.verify(token, auth.secret_token, (error) => {
      if (error) {
        throw new Error('Invalid token or expired');
      }
    });
  }

  static async generateToken(id: string): Promise<string> {
    const token = jwt.sign({}, auth.secret_token, {
      subject: id,
      expiresIn: auth.expiresIn,
    });

    return token;
  }
}
