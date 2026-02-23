export interface BaseResource {
    id: number;
    created_at_human: string;
}

export type SuccessResponse<T> = {
    data: T;
};