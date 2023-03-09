import * as Yup from 'yup';

export const RegisterUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(2, 'Campo inválido')
    .max(128),
  email: Yup.string()
    .email()
    .required('Campo obrigatório')
    .min(10, 'Email inválido')
    .max(128),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'A senha deve ter no minímo 8 caracteres')
    .max(128),
  password2: Yup.string()
    .required('Campo obrigatório')
    .oneOf([Yup.ref('password'), null], 'As senhas dever ser iguais'),
  identity: Yup.string().required('Campo obrigatório').min(18, 'CNPJ inválido'),
});
