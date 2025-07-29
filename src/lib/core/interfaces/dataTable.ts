// Column.ts
export interface Column<T> {
  key: keyof T;            // must be a valid property of your row object
  label: string;           // header text
  sortable?: boolean;      // default false
  tooltip?: string;        // optional description shown on hover
  align?: 'left' | 'center' | 'right';
  // optional renderers / formatters
  render?: (value: T[keyof T], row: T) => string | HTMLElement;
}

// Row.ts  (the shape of every element in your array)
export interface SalesRow {
  time: string;        // ISO date-time
  orderedSales: number;
  timesOrderedFirstTime: number;
  timesOrdered: number;
  itemsOrdered: number;
}