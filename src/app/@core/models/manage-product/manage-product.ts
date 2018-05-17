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

 export class revise {
    statusCode: string;
    status: string;
    statusId: number;
 }