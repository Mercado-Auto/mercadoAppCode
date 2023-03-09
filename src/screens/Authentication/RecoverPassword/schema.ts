import * as Yup from 'yup';

export const RecoverPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('email invalído')
    .required('Campo obrigatório')
    .min(9)
    .max(128),
});
