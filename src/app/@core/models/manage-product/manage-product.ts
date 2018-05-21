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