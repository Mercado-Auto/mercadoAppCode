export default interface PaymentCard {
  cc_number: string;
  cc_name: string;
  cc_due_date: string;
  cc_brand: string;
  cc_cvv: string;
  installments: number;
}
