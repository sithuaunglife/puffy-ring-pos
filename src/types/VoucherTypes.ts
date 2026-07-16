export type OrderType = "Dine-in" | "Delivery" | "Takeaway";

export interface Voucher {
  id: string;
  invoiceId: string;
  orderType: OrderType;
  name: string;
  total: number;
  quantity: number;
  dateTime: string;
}
