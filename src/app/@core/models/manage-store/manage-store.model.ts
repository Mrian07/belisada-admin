export class exapmling {
    descript: string;
  }


export class List {
    data: IsiData[];
    pageCount: number;
  }
  export class IsiData {
  
    storeId: number;
    registeredDate: string;
    name: string;
    ownerStore: string;
    status: string;
    statusCode: string;
    verifiedById: number;
    verifiedByName: string;
  }


export class updateToko {
  
    statusCode: string;
    note: string;
    storeId: number;
  }

  export class detailToko {
    address: string;
    addressId: number;
    regionName: string;
    regionId: number;
    cityName: string;
    cityId: number;
    districtName: string;
    districtId: number;
    villageName: string;
    villageId: number;
    postal: string;
    ownerStore: string;
    phone: string;
    email: string;
  }


export class ListingItem {
    statusCode: string;
    status: string;
    statusId: number;
  
  }

  /*

    Sample Jika Jika di butuhkan


export class Example {
    constructor(
      public userId: number,
      public id: number,
      public name: string,
      public title: string,
      public body: string
    ) {}
  }

  */

