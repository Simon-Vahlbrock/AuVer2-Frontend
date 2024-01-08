export interface ApiFunctionResult<T = null, E = null> {
    data?: T;
    error?: Error;
    errorData?: E;
    errorMessage?: string;
    retryAfter?: number;
    status?: number;
}
