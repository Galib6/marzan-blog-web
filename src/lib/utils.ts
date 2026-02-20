export function toQueryString(params: Record<string, any>): string {
    const qp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
            qp.set(k, String(v));
        }
    });
    return qp.toString();
}