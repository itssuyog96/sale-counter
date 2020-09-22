import { PaymentMethod } from '../payment-method.enum';

export interface SaleEntry {
    method: PaymentMethod,
    amount: number,
    recordedOn: object,
    userId: string,
    date: string
}