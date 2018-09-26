export class Transaction {
  content: Content[];
  grandTotal: number;
  totalPages: number;
}

export class GetDataTransacition {
status: number;
message: number;
data: GetDataTranscationList;
}
export class Messa {
  status: any;
  message: any;
}

export class GetDataTranscationList {
  accountName: string;
  accountNumber: string;
  paymentNumber: string;
  transferFrom: string;
  news: string;
  nominal: any;
  status: any;
  transerDate: string;
  createdOrder: string;
  buyerName: string;
  grandTotal: number;
  orders: any[];
}

export class Content {
  transactionId: number;
  alamatPenerima: string;
  alamatSebagai: string;
  asuransi: number;
  buyerName: string;
  cartItems: CartItems[];
  courierCode: string;
  courierName: string;
  courierPrice: number;
  courierService: string;
  createdOrder: string;
  destinationId: number;
  destinations: Destinations[];
  invoiceNumber: string;
  statusPlaceHolderOrderSeller: string;
  namaPenerima: string;
  expiredConfirmationPaymentAdminDate: string;
  countdown: Countdown;
  noResi: string;
  orderNumber: string;
  originId: number;
  paymentMethod: string;
  paymentNumber: string;
  phonePenerima: string;
  expiredTime: any;
  transaction: transaction[];
  shipNumber: string;
  shippingAddressId: number;
  statusOrder: string;
  statusOrderCode: string;
  statusTracking: string;
  storeId: number;
  storeName: string;
  storeUrl: string;
  subTotal: number;
  total: number;
  totalWeight: number;
  useAsuransi: boolean;
}
export class Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  status: number;
  message: string;
}
export class transaction {
  cart: cart[];
  grandTotal: number;
}
export class cart {
  alamatPenerima: string;
  alamatSebagai: string;
  asuransi: number;
  cartItems: CartItems[];
  courierCode: string;
  courierName: string;
  courierPrice: number;
  courierService: string;
  destinationId: number;
  invoiceNumber: string;
  namaPenerima: string;
  noResi: string;
  orderNumber: string;
  originId: number;
  paymentMethod: string;
  paymentNumber: string;
  phonePenerima: string;
  shipNumber: string;
  shippingAddressId: number;
  statusOrder: string;
  statusOrderCode: string;
  statusTracking: string;
  storeId: number;
  storeName: string;
  storeUrl: string;
  subTotal: number;
  total: number;
  totalWeight: number;
  useAsuransi: boolean;


}

export class Destinations {
  destinationId: number;
  name: string;
  shippingAddressId: number

}

export class CartItems {
  courierCode: string;
  courierPrice: number;
  courierService: string;
  imageUrl: string;
  itemCartId: number;
  name: string;
  note: string;
  priceList: number;
  productId: number;
  quantity: number;
  specialPrice: number;
  subtotal: number;
  total: number;
  totalWeight: number;
  weightPerItem: number

}
