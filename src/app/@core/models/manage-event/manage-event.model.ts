export class Event {
    createdAt: string;
    updatedAt: string;
    id: number;
    eventName: string;
    joinEventStartDate: string;
    joinEventEndDate: string;
    showEventStartDate: string;
    showEventEndDate: string;
    eventStartDate: string;
    eventEndDate: string;
    eventStatus: string;
}

export class EventList {
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    pageable: Page[];
    sort: Sort[];
    content: DetailEventList[];
}

export class DetailEventList {
    createdAt: string;
    updatedAt: string;
    id: number;
    eventName: string;
    joinEventStartDate: string;
    joinEventEndDate: string;
    showEventStartDate: string;
    showEventEndDate: string;
    eventStartDate: string;
    eventEndDate: string;
    eventStatus: string;
}

export class MasterProduct {
    empty:  boolean;
    first:  boolean;
    last: boolean;
    number:	number;
    numberOfElements: number;
    pageable: Page[];
    size: number;
    sort: Sort[];
    totalElements: number;
    totalPages:	number;
    content: GetMasterProduct[];
}

export class GetMasterProduct {
    createdAt: string;
    id:	string
    masterProductId: number;
    maxPurhaseQty: number;
    productVariants: VariantMaster[];
    updatedAt: string;
}

export class PostMasterProduct {
    createdAt: string;
    id:	string;
    masterProductId: number;
    maxPurhaseQty: number;
	productVariants:  VariantMaster[];
    updatedAt:	string;

}

export class VariantMaster {
    createdAt: string;
    id: string;
    isActive: boolean;
    masterVariantId: number;
    priceMax: number;
    priceMin: number;
    qty: number;
    updatedAt: string;
}


export class Page {
    offset:	number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
	sort: Sort[];
    unpaged: boolean;
}

export class Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export class ProductList {
    dataCount: number;
    pageCount: number;
	data: Product[];
}

export class Product {
    productId: number;
    name: string;
    nameEn:	string;
    highlight: string;
    highlightEn: string;
    description: string;
    sku: string;
    brandId: number;
    brandName: string;
    storeId: number;
    weight:	number;
    dimensionsWidth: number;
    dimensionslength: number;
    dimensionsheight: number;
    classification:	string;
    qty: number;
    qtyType: string;
    status:	string;
    statusCode:	string;
    categoryOneId: number;
    categoryOneName: string;
    categoryTwoId: number;
    categoryTwoName: string;
    categoryThreeId: number;
    categoryThreeName: string;
    imageUrl: string[];
    pricelist: number;
    couriers: [];
    isGuarantee: boolean;
    guaranteeType: number;
    guaranteeTime: number;
    shippers: [];
    pricelistlast: number;
    classificationValue: string;	
    guaranteeTypeValue: string;
    guaranteeTimeValue: string;
    qtyTypeValue: string;	
    version: number;
    discount: number;
    specialPrice: number;
    useVarian: boolean;
    spec: [];
    specification: [];
    approvalProductIssue: [];
    isStock	: boolean;
}

export class ProductDetailList {
    status:	number;
    message: string;
	data: ProductDetail[];
}

export class ProductDetail {
    productId: number;
    name: string;
    brandName: string;
    storeId: number;
    storeName: string;
    storeUrl: string;
    storeImageUrl: string;
    pricelist: number;
    discount: number;
    specialPrice: number;
    imageUrl: string;
    locationId: number;
    locationName: string;
    iStock: boolean;
    qtyTypeValue: string;
    qtyType: string;
    categoryOneId: number;
    categoryOneName: string;
    categoryTwoId: number;
    categoryTwoName: string;
    categoryThreeId: number;
    categoryThreeName: string;
    weight: number;
    dimensionsWidth: number;
    dimensionslength: number;
    dimensionsheight: number;
    originId: number;
    qty: number;
    varians: Varians[];
}

export class Varians {
    attributeId: number;
    name: string;
    varians: Variant[];
}

export class Variant {
    attributeValueId: number;
    value: string;
}

