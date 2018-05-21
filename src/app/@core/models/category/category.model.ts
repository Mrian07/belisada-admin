

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

// export class ListCategoryC1 {
//     dataCount: number;  
//     pageCount: number;
//     data: CategoryC1[];

//     constructor() {}
// }

// export class  CategoryC1{
//     categoryId: number;
//     iconUrl: string;
//     name: string;
//     nameEn: string;
//     parentId: number;
//     type: string;
//     imageUrl: string;
//     imageUrl2: string;
//     imageUrl3: string;
//     imageUrl4: string;
//     imageUrl5: string;
//     isActive: boolean;
//     constructor() {}
// }

// export class Category {
//     name: string;
//     nameEn: string;
//     type: string;
//     isActive: boolean;
// }

// export class AddCategory {
//     name: string;
//     nameEn: string;
//     isActive: boolean;
//     type: string;
//     status: number;  
//     message: string;
// }

// export class EditCategory {
//     brandId: number;
//     name: string;
//     nameEn: string;
//     isActive: boolean;
//     type: string;
//     status: number;  
//     message: string;
// }

// export class ChangeStatusCategory {
//     categoryId: number;
//     isActive: boolean;
// }