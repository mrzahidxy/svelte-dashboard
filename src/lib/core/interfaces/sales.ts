export interface SalesItemByDay {
  dayOfWeek: string;
  count: number;
  totalSales: number;
  totalDiscount: number;
  itemsSold: number;
  groups: number;
  salesPerGroup: number;
  people: number;
  salesPerPeople: number;
}

export interface SalesResponse {
  start?: string;
  end?: string;
  store?: string;
  type: 'total' | 'average';
  items: SalesItemByDay[];
}

export interface LoadData {
  items: SalesItemByDay[];
  store: string;
  start: string;
  end: string;
  type: 'total' | 'average';
  error?: string;
}