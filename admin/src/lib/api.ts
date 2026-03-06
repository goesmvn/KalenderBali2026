const API_BASE = '/api';

interface ApiOptions {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
}

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Unauthorized');
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'API Error');
    return data as T;
}

export const api = {
    get: <T>(path: string) => apiFetch<T>(path),
    post: <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'POST', body }),
    put: <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'PUT', body }),
    del: <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
};
