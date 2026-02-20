import { isrFetch, serverFetch } from 'src/lib/fetcher.server';
import { IGetTopicsResponse, ITopic, ITopicFilter } from './interfaces';

function toQueryString(params: Record<string, any>): string {
    const qp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
            qp.set(k, String(v));
        }
    });
    return qp.toString();
}

export async function getTopics(
    filter: ITopicFilter = {},
): Promise<IGetTopicsResponse> {
    const { page = 1, limit = 10, ...rest } = filter;
    const qs = toQueryString({ page, limit, ...rest });
    return isrFetch<IGetTopicsResponse>(
        `/api/v1/web/topics?${qs}`,
    );
}

export async function getTopic(id: string): Promise<ITopic> {
    return serverFetch<ITopic>(
        `/api/v1/web/topics/${encodeURIComponent(id)}`,
    );
}
