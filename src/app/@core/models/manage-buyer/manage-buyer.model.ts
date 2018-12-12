export class Buyer {
    dateOfJoin: Date;
    email: string;
    gender: string;
    isSuspended: Boolean;
    name: string;
    spent: number;
    userId: number;
}

export class BuyerPaging {
    data: Buyer[];
    dataCount: number;
    pageCount: number;
}

export class SuspendBuyer{
    isSuspended: boolean;
    userId: number;
}
