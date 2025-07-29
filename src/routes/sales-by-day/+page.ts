// src/routes/+page.ts
import type { DalesByDayApiResponse, SalesLoadData, Total } from '$lib/core/interfaces/sales';
import type { PageLoad } from './$types';




export const load: PageLoad = async ({ url, fetch }) => {

    // const store = url.searchParams.get('store') || '';
    const startDate = url.searchParams.get('startDate') || '';
    const endDate = url.searchParams.get('endDate') || '';
    const viewMode = (url.searchParams.get('viewMode') as 'total' | 'average') || 'total';

    const apiParams = new URLSearchParams({ startDate, endDate, viewMode });

    try {
        const response = await fetch(`https://mock.apidog.com/m1/1010601-996838-default/web-console/v1/sales/day-of-week?${apiParams}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: DalesByDayApiResponse = await response.json();

        return {
            items: data.data.salesInformation,
            total: data.data.total,
            // store,
            startDate,
            endDate,
            viewMode
        } satisfies SalesLoadData;

    } catch (error) {
        console.error('Failed to load sales data:', error);
        return {
            items: [],
            total: {} as Total,
            // store,
            startDate,
            endDate,
            viewMode,
            error: error instanceof Error ? error.message : 'Failed to fetch sales data'
        } satisfies SalesLoadData;
    }
};
