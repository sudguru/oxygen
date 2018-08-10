export interface ContainerAsset {
    id?: number;
    container_id: number;
    party_id: number;
    datetime: Date;
    added: number;
    deducted: number;
    remarks: string;
    initial: boolean;
}
