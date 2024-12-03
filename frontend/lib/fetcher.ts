import { cookies } from 'next/headers';

interface FetcherOptions extends RequestInit {
    params?: Record<string, string>;
    query?: Record<string, string>;
}

export default async function fetcher<T>(
    endpoint: string,
    options: FetcherOptions = {}
): Promise<T> {
    const { params, query, ...fetchOptions } = options;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    let url = `${baseUrl}${endpoint}`;

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`:${key}`, value);
        });
    }

    if (query) {
        const queryString = new URLSearchParams(query).toString();
        url += `?${queryString}`;
    }

    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');

    const defaultOptions: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeader,
        },
    };

    try {
        const response = await fetch(url, {
            ...defaultOptions,
            ...fetchOptions,
            headers: {
                ...defaultOptions.headers,
                ...fetchOptions.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: 'Bir hata oluştu',
            }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

