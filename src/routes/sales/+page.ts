// src/routes/+page.ts
import type { LoadData, SalesResponse } from '$lib/core/interfaces/sales';
import type { PageLoad } from './$types';


export const load: PageLoad = async ({ url, fetch }) => {
    
    const store = url.searchParams.get('store') || '';
    const start = url.searchParams.get('start') || '';
    const end = url.searchParams.get('end') || '';
    const type = (url.searchParams.get('type') as 'total' | 'average') || 'total';
 
    const apiParams = new URLSearchParams({ store, start, end, type });

    try {
        const response = await fetch(`/api/sales?${apiParams}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: SalesResponse = await response.json();

    

        return {
            items: data.items,
            store,
            start,
            end,
            type
        } satisfies LoadData;

    } catch (error) {
        console.error('Failed to load sales data:', error);
        return {
            items: [],
            store,
            start,
            end,
            type,
            error: error instanceof Error ? error.message : 'Failed to fetch sales data'
        } satisfies LoadData;
    }
};
