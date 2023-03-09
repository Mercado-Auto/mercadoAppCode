import * as Yup from 'yup';

export const AddressSchema = Yup.object().shape({
  city: Yup.string().required().min(2).max(128),
  complement: Yup.string().optional().min(0).max(256),
  district: Yup.string().required('Insira seu bairro'),
  number: Yup.string().required('Insira o número').min(1).max(128),
  cep: Yup.string().required('Por favor, insira seu cep').min(9).max(9),
  street: Yup.string().required('Insira seu logradouro').min(3).max(128),
});
