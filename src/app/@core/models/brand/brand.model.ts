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
    brandName;
}

export class ChangeStatus {
    brandId: number;
    isActive: boolean;
}

export class Add {
    name: string;
    isActive: boolean;
    imageUrl: string;
    status: number;
    message: string;
}

export class Edit {
    name: string;
    brandId: number;
    isActive: boolean;
    imageUrl: string;
    status: number;
    message: string;
}

export class ManageBrand {
  dataCount: number;
  pageCount: number;
  data: ManageBrandList[];
}

export class ManageBrandList {
  brandId: number;
  name: string;
  imageUrl: string;
  isActive: boolean;
  isBrandCreatedSeller: boolean;
  status: string;
  statusCode: string;
}
