export interface Job {
    id?: number;
    contractId: number;
    description: string;
    operationDate: Date;
    paymentDate: Date;
    price: number;
    paid: number;
}
