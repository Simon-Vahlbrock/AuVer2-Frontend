import {SERVER_URL} from '../constants/server'

type ContentType = 'application/json' | 'application/merge-patch+json';

interface RequestOptions<Body> {
    accessToken?: string;
    auth?: boolean;
    body?: Body;
    contentType?: ContentType
    method:
        | 'GET'
        | 'HEAD'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'CONNECT'
        | 'OPTIONS'
        | 'TRACE'
        | 'PATCH';
    route?: string;
    showWaitCursor?: boolean;
    url?: string;
}

interface Meta {
    [key: string]: unknown;

    body?: BodyInit | null;
    method: string;
    url: string;
}

export interface RequestResult<Data = unknown> {
    [key: string]: unknown;

    data?: Data;
    error?: Error | undefined;
    meta: Meta;
    requestDuration?: number;
    retryAfter?: number;
    status?: number;
}

export const request = async <Data = null, Body = null>(
    {
        accessToken,
        auth = true,
        body,
        contentType = 'application/json',
        method,
        route = '',
        url = SERVER_URL,
    }: RequestOptions<Body>): Promise<RequestResult<Data>> => {
    const headers: HeadersInit = {};

    if (auth) {
        headers.Authorization = `bearer ${accessToken}`;
    }

    const requestData: RequestInit = {
        credentials: 'same-origin',
        headers,
        method,
    };

    if (method !== 'GET') {
        headers['Content-Type'] = contentType;

        if (body) {
            requestData.body = JSON.stringify(body);
        }
    }

    const result: RequestResult<Data> = {
        meta: {
            method,
            url: url + route,
            body: requestData.body,
        },
    };

    const requestStart: number = Date.now();

    try {
        const response: Response = await fetch(url + route, requestData);

        result.requestDuration = Date.now() - requestStart;
        result.status = response.status;

        try {
            const dataString = await response.text();

            if (dataString && dataString.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                result.data = JSON.parse(dataString);
            }
        } catch (error) {
            if (error) {
                // @ts-expect-error: Type is correct here
                result.error = error;
            }
        }

        if (response.status === 429) {
            const retryAfterHeaderValue = response.headers.get('retry-after');

            if (retryAfterHeaderValue) {
                let parsedRetryAfterValue;

                try {
                    parsedRetryAfterValue = parseInt(retryAfterHeaderValue, 10);

                    if (
                        typeof parsedRetryAfterValue === 'number' &&
                        !Number.isNaN(parsedRetryAfterValue)
                    ) {
                        result.retryAfter = parsedRetryAfterValue;
                    }
                } catch (error) {
                    if (error) {
                        // @ts-expect-error: Type is correct here
                        result.error = error;
                    }
                }
            }
        }
    } catch (error) {
        result.requestDuration = Date.now() - requestStart;

        if (error) {
            // @ts-expect-error: Type is correct here
            result.error = error;
        }
    }

    return result;
};
