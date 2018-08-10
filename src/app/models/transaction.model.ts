export interface Transaction {
    id?: number;
    in_out: string;
    datetime: Date;
    user_id: number;
    from_party_id: number;
    from_staff_id: number;
    to_party_id: number;
    to_staff_id: number;
    remarks: string;
    transaction_detail: TransactionDetail[];
}

export interface TransactionDetail {
    id?: number;
    transaction_id: number;
    full_or_empty: string;
    container_id: number;
    container_quantity: number;
    product_id: number;
    product_quantity: number;
    product_rate: number;
    discount: number;
}
