import { useCallback } from "react";
import { ShowerInfo } from '@meteor-time/shared';

export interface Shower { sstr: string; dateTime: Date; description: string }

export type ShowerDetails = ShowerInfo | {
    discovery: { date: Date };
    historicalApproaches: { date: Date }[];
    orbitalInformation: { firstObservation: Date };
};

export const useApi = () => {
    const fetchShowers = useCallback(async (): Promise<{ showers: Shower[] }> => {
        const data = await fetchJson<{ showers: { sstr: string; dateTime: string; description: string }[] }>(`/api/showers`);
        return { ...data, showers: data.showers.map(s => ({ ...s, dateTime: new Date(s.dateTime) })) };
    }, []);

    const fetchShower = useCallback(async (sstr: string): Promise<ShowerDetails> => {
        const data = await fetchJson<ShowerInfo>(`/api/showers/${sstr}`);
        return {
            ...data,
            discovery: { ...data.discovery, date: new Date(data.discovery.date) },
            historicalApproaches: data.historicalApproaches.map(historicalApproach => ({ ...historicalApproach, date: new Date(historicalApproach.date) })),
            orbitalInformation: { ...data.orbitalInformation, firstObservation: new Date(data.orbitalInformation.firstObservation) }
        };
    }, []);

    const fetchNeoWs = useCallback(async (): Promise<{ greeting: string }> => {
        return await fetchJson<{ greeting: string }>(`/api/neows`);
    }, []);

    return {
        fetchShowers,
        fetchShower,
        fetchNeoWs
    };
};

interface FetchOpts {
    method?: string;
    body?: Record<string, any>;
}

const fetchJson = async <T>(url: string, opts: FetchOpts = {}): Promise<T> => {
    const response = await rawFetch(url, opts);
    return await formatResponse<T>(response);
};

const rawFetch = async (url: string, { method, body }: FetchOpts = {}): Promise<Response> => {
    const headers: Record<string, string> = {};
    if (body) headers["Content-Type"] = "application/json";
    const init: RequestInit = { method: method || "GET", headers };
    if (body) init.body = JSON.stringify(body);
    return await fetch(url, init);
};

const formatResponse = async <T>(response: Response) => {
    if (response.status >= 400)
        throw Error(`Request failed with status: ${response.status}, ${response.statusText}`);
    return (await response.json()) as T;
};
