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
    sort: Sort[];
    content: DetailEventList[];
}

export class Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
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

