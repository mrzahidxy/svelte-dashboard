// types.ts
export interface OrderInformation {
  time: string;                   // ISO-8601 date-time
  orderedSales: number;
  timesOrderedFirstTime: number;
  timesOrdered: number;
  itemsOrdered: number;
}

export interface Total {
  orderedSales: number;
  timesOrderedFirstTime: number;
  timesOrdered: number;
  itemsOrdered: number;
}

export interface Tooltip {
  orderedSales: string;           // human label
  timesOrderedFirstTime: string;  // human label
  timesOrdered: string;           // human label
  itemsOrdered: string;           // human label
}

export interface HourlyOrdersApiResponse {
  statusCode: number;
  message: string;
  data: {
    tooltip: Tooltip;
    ordersInformation: OrderInformation[];
    total: Total;
  };
}

export interface LoadData {
  items: OrderInformation[];
  tooltip: Tooltip;
  store: string;
  start: string;
  end: string;
  type: 'total' | 'average';
  error?: string;
}