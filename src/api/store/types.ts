export type TPurchaseAirtime = {
  amount: number;
  phone: string;
  serviceId: string;
};

export type TBuyData = {
  serviceId: string;
  phone: string;
  variationCode: string;
};

export type TCableMerchant = {
  serviceId: string;
  billersCode: string;
};

export type TCablePay = {
  serviceId: string;
  billersCode: string;
  variationCode: string;
  phone: string;
  type: string;
};
