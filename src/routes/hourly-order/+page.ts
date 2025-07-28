// src/routes/+page.ts
import type { HourlyOrdersApiResponse, LoadData, Tooltip } from '$lib/core/interfaces/order';
import type { PageLoad } from './$types';




export const load: PageLoad = async ({ url, fetch }) => {
    
    const store = url.searchParams.get('store') || '';
    const start = url.searchParams.get('start') || '';
    const end = url.searchParams.get('end') || '';
    const type = (url.searchParams.get('type') as 'total' | 'average') || 'total';
 
    const apiParams = new URLSearchParams({ store, start, end, type });

    try {
        // const response = await fetch(`/api/sales?${apiParams}`);
        const response = await fetch(`https://mock.apidog.com/m1/1010601-996838-default/store/hourly-orders`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: HourlyOrdersApiResponse = await response.json();

        return {
            items: data.data.ordersInformation,
            tooltip: data.data.tooltip,
            store,
            start,
            end,
            type
        } satisfies LoadData;

    } catch (error) {
        console.error('Failed to load sales data:', error);
        return {
            items: [],
            tooltip: {} as Tooltip,
            store,
            start,
            end,
            type,
            error: error instanceof Error ? error.message : 'Failed to fetch sales data'
        } satisfies LoadData;
    }
};
