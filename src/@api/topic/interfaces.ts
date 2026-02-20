import { IBaseFilter, IBaseResponse } from "src/interface";

/**
 * Represents a topic item returned by the API. Derived from sample response.
 */
export interface ITopic {
    id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string | null;
    title: string;
    description: string;
    slug: string;
    orderPriority: number;
    [key: string]: unknown;
}

/**
 * Response type for the topic list endpoint.
 */
export type IGetTopicsResponse = IBaseResponse<ITopic[]>;

/**
 * Filter options specific to topics. Currently same as base filter.
 */
export interface ITopicFilter extends IBaseFilter { }
