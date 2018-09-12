export class ListCategory {
    dataCount: number;  
    pageCount: number;
    data: Category[];

    constructor() {}
}

export class  Category{
    categoryId: number;
    iconUrl: string;
    name: string;
    nameEn: string;
    parentId: number;
    type: string;
    imageUrl: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    imageUrl5: string;
    isActive: boolean;
    constructor() {}
}

export class AddCategory{
    name: string;
    nameEn: string;
    imageUrl: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    imageUrl5: string;
    type: string;
    iconUrl: string;
    message: string;
}

export class EditCategory{
    categoryId: number;
    name: string;
    nameEn: string;
    imageUrl: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    imageUrl5: string;
    type: string;
    iconUrl: string;
    message: string;
}

export class ActiveCategory{
    categoryId: number;
    isActive: string;
    message: string;
    status: number;
}

export class ListSpec{
    attributeId: number;
    isActive: string;
    name: string;
    description: string;
}

export class AddSpec{
    attributeId: number;
    categoryId:number;
    message: string;
    status: number;
}

export class EditSpec{
    name: string;
    description: string;
    attributeId: number;
    isMandatory: boolean;
    isInstanceAttribute: boolean;
}

export class DeleteSpec {
    attributeId: number;
    categoryId: number;
    message: string;
    status: number;
}

