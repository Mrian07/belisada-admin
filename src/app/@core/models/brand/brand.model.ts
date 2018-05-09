export class Create {
    name: string;  
    imageUrl: any;
    isActive: string;
    constructor() {}
}

export class Output {
    status: number;  
    message: string;
    constructor() {}
}

export class List {
    dataCount: number;  
    pageCount: number;
    data: Brand[];

    constructor() {}
}

export class Brand {
    brandId: number;
    name: string;
    imageUrl: string;
    isActive: boolean;
}
