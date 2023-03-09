import * as Yup from 'yup';
import valid from 'card-validator';

export const PaymentInfoSchema = Yup.object().shape({
  number: Yup.string()
    .test(
      'test-number',
      'Cartão Inválido!',
      (value) => valid.number(value).isValid,
    )
    .required('Campo obrigatório'),
  name: Yup.string()
    .required('Campo obrigatório')
    .max(50, 'Máximo 50 caracteres'),
  dateMon: Yup.string()
    .required('Campo obrigatório')
    .min(1)
    .max(12, 'Valor máximo 12'),
  dateYear: Yup.string()
    .required('Campo obrigatório')
    .min(0)
    .max(9999, 'Valor máximo 9999'),
  cvv: Yup.number()
    .required('Campo obrigatório')
    .min(0)
    .max(999, 'Valor máximo 999'),
  installments: Yup.object().required('Campo obrigatório'),
});
