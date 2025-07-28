// types.ts
export interface SalesInformation {
  weekday: string;                       // "Wednesday" | "Sunday", etc.
  timesStoreOpened: number;
  netSales: number;
  totalDiscount: number;
  numberOfItemsAdded: number;
  numberOfGroups: number;
  netSalesPerGroup: number;
  numberOfPeople: number;
  netSalesPerPeople: number;
  productName: string;
  compositionRatio: number;
  numberOfSales: number;
  cost: number;
  grossProfit: number;
  grossProfitRatio: number;
  profitContributionRatio: number;
}

export interface Total {
  netSales: number;
  compositionRatio: number;
  numberOfSales: number;
  cost: number;
  grossProfit: number;
  grossProfitRatio: number;
  profitContributionRatio: number;
}

export interface DalesByDayApiResponse {
  statusCode: number;
  message: string;
  data: {
    salesInformation: SalesInformation[];
    total: Total;
  };
}

export interface SalesLoadData {
  items: SalesInformation[];
  total: Total;
  store: string;
  start: string;
  end: string;
  viewMode: 'total' | 'average';
  error?: string;
}