import { type DataEnvelope, type DataListEnvelope } from "./transportTypes";

export type Method = "GET" | "PUT" | "POST" | "DELETE"


export const API_ROOT = 'http://localhost:3000/api/v1'

export function rest(url: string, data?:unknown, method?: Method) {
    return fetch(url, {
        method: method ?? (data ? "POST" : "GET"),
        headers: {
            "Content-Type": "application/json",
        },
        body: (data ? JSON.stringify(data) : undefined),
    })
    .then(x => x.json())
}

export function api<T>(action: string, data?: unknown, method?: Method) : Promise<DataEnvelope<T>> {
    return rest(`${API_ROOT}/${action}`, data, method);
}

export function apiQuery<T>(action: string, q?: string) : Promise<DataEnvelope<T>> {
    return rest(`${API_ROOT}/${action}?q=${q}`);
}