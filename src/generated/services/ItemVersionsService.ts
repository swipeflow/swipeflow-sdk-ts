/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateItemVersionRequest } from '../models/CreateItemVersionRequest';
import type { Item } from '../models/Item';
import type { ItemVersion } from '../models/ItemVersion';
import type { ItemVersionList } from '../models/ItemVersionList';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ItemVersionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a new version of an item
     * Creates a new version of an existing item. Only allowed when item status is 'pending' or 'change_requested'.
     * @param projectId Project ID
     * @param itemId Item ID
     * @param requestBody
     * @returns Item Version created successfully, returns updated item
     * @throws ApiError
     */
    public createItemVersion(
        projectId: string,
        itemId: string,
        requestBody: CreateItemVersionRequest,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/items/{itemId}/versions',
            path: {
                'projectId': projectId,
                'itemId': itemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Cannot create version for item with current status`,
                401: `Unauthorized`,
                404: `Project or item not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get all versions for an item
     * Retrieve all versions for a specific item with pagination
     * @param projectId Project ID
     * @param itemId Item ID
     * @param page Page number
     * @param limit Items per page
     * @param sortOrder Sort order by version number
     * @returns ItemVersionList List of versions with pagination info
     * @throws ApiError
     */
    public listItemVersions(
        projectId: string,
        itemId: string,
        page: number = 1,
        limit: number = 10,
        sortOrder: 'asc' | 'desc' = 'desc',
    ): CancelablePromise<ItemVersionList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/items/{itemId}/versions',
            path: {
                'projectId': projectId,
                'itemId': itemId,
            },
            query: {
                'page': page,
                'limit': limit,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or item not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a specific version
     * Retrieve a specific version by its version number. Version 1 always returns the original/current item.
     * @param projectId Project ID
     * @param itemId Item ID
     * @param version Version number (1, 2, 3, etc.)
     * @returns ItemVersion Version details
     * @throws ApiError
     */
    public getItemVersion(
        projectId: string,
        itemId: string,
        version: number,
    ): CancelablePromise<ItemVersion> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/items/{itemId}/versions/{version}',
            path: {
                'projectId': projectId,
                'itemId': itemId,
                'version': version,
            },
            errors: {
                400: `Invalid version number`,
                401: `Unauthorized`,
                404: `Project, item, or version not found`,
                500: `Internal server error`,
            },
        });
    }
}
