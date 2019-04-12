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
    masterProductId: number;
    maxPurhaseQty: number;
	productVariants:  VariantMaster[];
}

export class VariantMaster {
    isActive: boolean;
    masterVariantId: number;
    priceMax: number;
    priceMin: number;
    qty: number;
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

export class GetVariant {
    status: number;
    message: string;
    data: Variant;
}
export class Variant {
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
    guaranteeTime: number;
    shippers: [];
    pricelistlast: number;
    classificationValue: string;
    guaranteeTimeValue: string;
    discount: number;
    specialPrice: number;
    useVarian: boolean;
    spec: [];
    specification: SpecVariant[];
    approvalProductIssue: [];
    isStock	: boolean;
}

export class SpecVariant {
    attributeId: number;
    name: string;
    attributeValueId: number;
    isMandatory: boolean;
    isInstanceAttribute: boolean;
    value: string;
}

