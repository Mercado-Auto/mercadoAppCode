import * as Yup from "yup";

export const AddressSchema = Yup.object().shape({
	cep: Yup.string().required("Por favor, insira seu cep").min(6).max(128),
	city: Yup.string().required().min(2).max(128),
	street: Yup.string().required("Insira seu logradouro").min(3).max(128),
	number: Yup.string().required("Insira o número").min(1).max(128),
	district: Yup.string()
		.required("Insira seu bairro"),
	complement: Yup.string().optional().min(0).max(256),
});

function getErrorsFromValidationError(validationError: any) {
	const FIRST_ERROR = 0;
	return validationError.inner.reduce((errors: any, error: any) => {
		return {
			...errors,
			[error.path]: error.errors[FIRST_ERROR],
		};
	}, {});
}
