export class ManageProduct {
    userId: number;
    id: number;
    title: string;
    body: string;
    albumId: number;
    url: string;
    thumbnailUrl: string;

}

export class ListBrand {
    data: IsiDataBrand[];
    pageCount: number;
  }


  export class IsiDataBrand {
    brandId: number;
    name: string;
    imageUrl: string;
    isActive: boolean;
  }


  export class listingProduct {
    dataCount: number;
    pageCount: number;
    data : IsiListingProcut[];

  }

  export class IsiListingProcut {
    productId: number;
    createdDate: string;
    name: string;
    storeName: string;
    status: string;
    statusCode: string;
    verifiedById: string;
    verifiedByName: string;
  }

  export class deetailProd {
    message: string;
    status : number;
    data: detailListingProduct[];
  }

  export class detailListingProduct {
    productId: number;
    name: string;
    nameEn: string;
    highlight: string;
    highlightEn: string;
    description: string;
    descriptionEn: string;
    sku: string;
    brandId: string;
    brandName: string;
    createdDate: string;
    storeId: number;
    storeName: string;
    weight: number;
    volume: number;
    dimensionsWidth: number;
    dimensionslength: number;
    dimensionsheight: number;
    qty: number;
    status: string;
    statusCode: string;
    categoryOneId: number;
    categoryOneName: string;
    categoryTwoId: number;
    categoryTwoName: string;
    categoryThreeId: number;
    categoryThreeName: string;
    imageUrl : any[];
    pricelist: number;
    pricelistlast: number;
    classification: string;
    verifiedById: number;
    verifiedByName: string;
    isGuarantee: boolean;
    guaranteeType: string;
    guaranteeTime: string;
    issue: any[];
    couriers: couriers[];
  }

  export class couriers {
    courierId: number;
    name: string;
    code: string;
    isUse: boolean;

  }

  export class listingCategory {
    dataCount: number;
    pageCount: number;
    data : dataListingCategory[];

  }

  export class putProduct {
    brandId: number;
    categoryThreeId: number;
    note: string;
    productId: number;
    statusCode: string;
    message?: string;
    status?: string;
  }

  export class dataListingCategory {
    categoryId: number;
    name: string;
    nameEn: string;
    type: string;
    imageUrl: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    imageUrl5: string;
    isActive: boolean;
    parentId: number;
    iconUrl: string;
  }

 export class revise {
    statusCode: string;
    status: string;
    statusId: number;
    a: boolean;
 }

 export class AddProductRequest {
  status: any;
  message: any;
  brandId: number;
  brandName: string;
  categoryThreeId: number;
  classification: string;
  couriers: any[];
  description: string;
  descriptionEn: string;
  dimensionsWidth: number;
  dimensionsheight: number;
  dimensionslength: number;
  guaranteeTime: string;
  guaranteeType: string;
  highlight: string;
  highlightEn: string;
  imageUrl: string[];
  isGuarantee: boolean;
  name: string;
  nameEn: string;
  pricelist: number;
  specialPrice: number;
  discount: number;
  qty: number;
  specification: ProductSpecification[];
  volume: number;
  weight: number;
}


export class ProductSpecification {
  attributeId: number;
  attributeValueId: number;
  value: string;
}

export class BrandList {
  dataCount: number;
  pageCount: number;
  data: Brand[];
}

export class Brand {
  brandId: number;
  name: string;
  imageUrl: string;
  isActive: boolean;
}




export class CategoryList {
  dataCount: number;
  pageCount: number;
  data: Category[];
}

export class Category {
  categoryId: number;
  name: string;
  nameEn: string;
  type: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  imageUrl5: string;
  parentId: number;
  iconUrl: string;
}

export class CategoryAttribute {
  attributeId: number;
  name: string;
  description: string;
  isMandatory: boolean;
  isInstanceAttribute: boolean;
  data: AttributeValue[];
}
export class AttributeValue {
  attributeValueId: number;
  name: string;
  value: string;
  attributeId: number;
}

export class ManageProductListing {
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  content: detailListingProduct[];
}
