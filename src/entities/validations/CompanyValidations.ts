import Joi from 'joi';

export class CompanyValidations {
  static async isValidEmail(email: string) {
    const schema = Joi.string().email().required();

    try {
      const isEmail = await schema.validateAsync(email);
      return isEmail;
    } catch (err) {
      console.log(err);
      throw new Error('Invalid email');
    }
  }

  static async isValidCNPJ(cnpj: string) {
    const schema = Joi.string().length(14).required();

    try {
      const isCNPJ = await schema.validateAsync(cnpj);
      return isCNPJ;
    } catch (err) {
      throw new Error('Invalid CNPJ');
    }
  }
}
