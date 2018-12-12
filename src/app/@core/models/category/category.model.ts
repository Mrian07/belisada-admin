export class ListCategory {
  dataCount: number;
  pageCount: number;
  data: Category[];

  constructor() {}
}

export class  Category {
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

export class AddCategory {
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

export class EditCategory {
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

export class ActiveCategory {
  categoryId: number;
  isActive: string;
  message: string;
  status: number;
}

export class ListSpec {
  attributeId: number;
  isActive: string;
  name: string;
  description: string;
}

export class AddSpec {
  attributeId: number;
  categoryId: number;
  message: string;
  status: number;
}

export class EditSpec {
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

export class ProductDetailData {
  status: number;
  message: string;
  productId: number;
  name: string;
  nameEn: string;
  highlight: string;
  highlightEn: string;
  description: string;
  sku: string;
  brandId: number;
  brandName: string;
  storeId: number;
  classification: string;
  qty: number;
  qtyType: string;
  discount: number;
  statusCode: string;
  categoryOneId: number;
  categoryOneName: string;
  categoryTwoId: number;
  categoryTwoName: string;
  categoryThreeId: number;
  categoryThreeName: string;
  imageUrl: any[];
  pricelist: number;
  couriers: ListCorier[];
  isGuarantee: boolean;
  guaranteeType: string;
  guaranteeTime: string;
  pricelistlast: number;
  classificationValue: string;
  guaranteeTypeValue: string;
  guaranteeTimeValue: string;
  qtyTypeValue: string;
  version: number;
  weight: number;
  dimensionsWidth: number;
  specification: SpecificationList[];
  dimensionsheight: number;
  specialPrice: number;
  dimensionslength: number;
  isStock: false;
  approvalProductIssue: any[];
}
export class SpecificationList {
  attributeId: number;
  attributeValueId: number;
  isMandatory: boolean;
  isInstanceAttribute: boolean;
  value: string;
}
export class ListCorier {
  courierId: number;
  name: string;
  code: string;
  isUse: boolean;
}

export class AddVarian {
  // attributeId: number;
  // categoryId: number;
  // isVarian: boolean;
  message: string;
  status: number;
}
