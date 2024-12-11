import { useCallback } from "react";


export const useApi = () => {
    const fetchShowers = useCallback(async (): Promise<{ greeting: string }> => {
        return await fetchJson<{ greeting: string }>(`/api/showers`);
    }, []);

    const fetchNeoWs = useCallback(async (): Promise<{ greeting: string }> => {
        return await fetchJson<{ greeting: string }>(`/api/neows`);
    }, []);

    return {
        fetchShowers,
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
