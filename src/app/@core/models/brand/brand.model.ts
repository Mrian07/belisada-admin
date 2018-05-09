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

export class ChangeStatus {
    brandId: number;
    isActive: boolean;
}

export class edit {
    name: string;
    brandId: number;
    isActive: boolean;
    imageUrl: string;
    status: number;  
    message: string;
}

// export class Create {
//     name: string;  
//     imageUrl: any;
//     isActive: string;
//     constructor() {}
// }

// export class Output {
//     status: number;  
//     message: string;
//     constructor() {}
// }


