export class List {
    dataCount: number;  
    pageCount: number;
    data: Spec[];

    constructor() {}
}

export class Spec {
    brandId: number;
    name: string;
    imageUrl: string;
    isActive: boolean;
    isMandatory: boolean;
    isInstanceAttribute: boolean;
}

export class Add {
    name: string;
    description: string;
    isMandatory: boolean;
    isInstanceAttribute: boolean;
}

export class Edit {
    name: string;
    description: string;
    attributeId: number;
    isMandatory: boolean;
    isInstanceAttribute: boolean;
}
