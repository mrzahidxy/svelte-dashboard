// src/routes/+page.ts
import type { DalesByDayApiResponse, SalesLoadData, Total } from '$lib/core/interfaces/sales';
import type { PageLoad } from './$types';




export const load: PageLoad = async ({ url, fetch }) => {
    
    const store = url.searchParams.get('store') || '';
    const start = url.searchParams.get('start') || '';
    const end = url.searchParams.get('end') || '';
    const type = (url.searchParams.get('type') as 'total' | 'average') || 'total';
 
    const apiParams = new URLSearchParams({ store, start, end, type });

    try {
        // const response = await fetch(`/api/sales?${apiParams}`);
        const response = await fetch(`https://mock.apidog.com/m1/1010601-996838-default/v1/sales/item`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: DalesByDayApiResponse = await response.json();

        return {
            items: data.data.salesInformation,
            total: data.data.total,
            store,
            start,
            end,
            type
        } satisfies SalesLoadData;

    } catch (error) {
        console.error('Failed to load sales data:', error);
        return {
            items: [],
            total: {} as Total,
            store,
            start,
            end,
            type,
            error: error instanceof Error ? error.message : 'Failed to fetch sales data'
        } satisfies SalesLoadData;
    }
};
