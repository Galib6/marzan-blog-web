// lib/fetcher.server.ts
// ─────────────────────────────────────────────────────────────────────────────
// SERVER-SIDE FETCHER
// Uses native `fetch` because Next.js extends it with cache/revalidate options.
// Use this in Server Components, generateStaticParams, and Route Handlers.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = {
    revalidate?: number | false;   // seconds | false = cache forever
    tags?: string[];               // for on-demand revalidation
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    headers?: HeadersInit;
};

export async function serverFetch<T>(
    endpoint: string,
    {
        revalidate = 300,       // default: 5 minutes ISR
        tags = [],
        method = 'GET',
        body,
        headers = {},
    }: FetchOptions = {},
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        next: {
            revalidate: revalidate === false ? false : revalidate,
            tags: tags.length > 0 ? tags : undefined,
        },
    });

    if (!res.ok) {
        throw new Error(
            `Fetch failed: ${method} ${url} → ${res.status} ${res.statusText}`,
        );
    }

    return res.json() as Promise<T>;
}

// ─── Convenience presets ───────────────────────────────────────────────────────

/** Cached forever — revalidates only on redeploy or manual tag invalidation */
export const staticFetch = <T>(endpoint: string, tags?: string[]) =>
    serverFetch<T>(endpoint, { revalidate: false, tags });

/** ISR — revalidates every N seconds (default 5 min) */
export const isrFetch = <T>(endpoint: string, seconds = 300, tags?: string[]) =>
    serverFetch<T>(endpoint, { revalidate: seconds, tags });

/** Always fresh — no caching (like SSR getServerSideProps) */
export const dynamicFetch = <T>(endpoint: string) =>
    serverFetch<T>(endpoint, { revalidate: 0 });