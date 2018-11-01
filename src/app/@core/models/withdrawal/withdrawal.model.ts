export class Withdrawal {
    content: Content[];
    last: true;
    totalPages: number;
    totalElements: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
}

export class Content {
    invoiceNumber: any;
    storeName: string;
    storeId: number;
    statusCode: number;
    status: string;
    grandTotal: number;
    expiredProcessDate: string;
    expiredProcessTime: number;
    withdrawId: number;
}

export class Bank{
    bankId: number;
    description: string;
    imageUrl: string;
    name: string
}

export class ProsesWd{
    bankAccountId: number;
    invoiceNumber: string;
    isWithdrawalAccepted: true;
    nominal: number;
    transferDate: string;
    withdrawId: number;
}

export class MainDetail{
    status: number;
    message: string;
    data: Detail;
}

export class Detail{
    storeName: string;
    storeId: number;
    statusCode: number;
    status: string;
    grandTotal: number;
    accountName: string;
    accountNumberDetail: string;
    withdrawId: number;
}

export class Transfer{
    bankAccountId: number;
    news: string;
    nominal: number;
    transferDate: string;
    withdrawId: number;
    status: number;
}

