export class ListCourir {
    courierId: number;
    name: string;
    isUse: boolean;
    imageurl: string;
    services: Services[];
}

export class Services {
    courierServiceId: number;
    courierId: number;
    name: string;
    code: any[];
    isUse: boolean;
}

export class UpdateCourir {
    courierId: number;
    courierServiceId: any[];
    uId: number;
}