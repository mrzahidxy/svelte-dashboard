// src/routes/api/sales/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

// Generate random sales data
const stores = ['Store A', 'Store B', 'Store C'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const generateSalesData = (count: number) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return Array.from({ length: count }, (_, i) => {
    const dayOffset = Math.floor(Math.random() * now.getDate());
    const date = new Date(startOfMonth);
    date.setDate(startOfMonth.getDate() + dayOffset);
    const amount = Math.floor(Math.random() * 5000) + 100;
    const discount = Math.floor(Math.random() * (amount / 2));
    const items = Math.floor(Math.random() * 5) + 1;
    const groups = Math.floor(Math.random() * 3) + 1;
    const people = groups * (Math.floor(Math.random() * 4) + 1);
    const store = stores[Math.floor(Math.random() * stores.length)];

    return {
      id: i + 1,
      store,
      amount,
      discount,
      date: date.toISOString().split('T')[0],
      items,
      groups,
      people
    };
  });
};

const salesData = generateSalesData(500);

export const GET: RequestHandler = async ({ url }) => {
  const delay = Math.floor(Math.random() * 1000) + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const startDate = url.searchParams.get('start');
    const endDate = url.searchParams.get('end');
    const storeFilter = url.searchParams.get('store');
    const type = url.searchParams.get('type') === 'average' ? 'average' : 'total';

    const filtered = salesData.filter((s) => {
      const d = new Date(s.date);
      if (startDate && d < new Date(startDate)) return false;
      if (endDate && d > new Date(endDate)) return false;
      if (storeFilter && s.store !== storeFilter) return false;
      return true;
    });

    const dayAgg: Record<number, any> = {};
    filtered.forEach((s) => {
      const dow = new Date(s.date).getDay();
      if (!dayAgg[dow]) dayAgg[dow] = {
        count: 0,
        totalSales: 0,
        totalDiscount: 0,
        itemsSold: 0,
        groups: 0,
        people: 0
      };
      const a = dayAgg[dow];
      a.count++;
      a.totalSales += s.amount;
      a.totalDiscount += s.discount;
      a.itemsSold += s.items;
      a.groups += s.groups;
      a.people += s.people;
    });

    const items = Object.entries(dayAgg).map(([key, a], index) => {
      const factor = type === 'average' && a.count ? a.count : 1;
      return {
        id: index,
        dayOfWeek: weekdays[parseInt(key)],
        count: a.count,
        totalSales: a.totalSales / factor,
        totalDiscount: a.totalDiscount / factor,
        itemsSold: a.itemsSold / factor,
        groups: a.groups / factor,
        salesPerGroup: a.groups ? a.totalSales / a.groups : 0,
        people: a.people / factor,
        salesPerPeople: a.people ? a.totalSales / a.people : 0
      };
    });

    return json({ start: startDate, end: endDate, store: storeFilter, type, items });
  } catch (error) {
    console.error('Sales API error:', error);
    return json({ error: 'Failed to fetch sales data', items: [] }, { status: 500 });
  }
};
