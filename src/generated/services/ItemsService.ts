/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateItemRequest } from '../models/CreateItemRequest';
import type { Item } from '../models/Item';
import type { ItemList } from '../models/ItemList';
import type { ItemStatusSnapshot } from '../models/ItemStatusSnapshot';
import type { ItemStatusSnapshotList } from '../models/ItemStatusSnapshotList';
import type { ProcessItemRequest } from '../models/ProcessItemRequest';
import type { UpdateItemDecisionRequest } from '../models/UpdateItemDecisionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ItemsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get next pending item
     * Get the next pending item for review in the project
     * @param projectId Project ID
     * @returns Item Next pending item
     * @throws ApiError
     */
    public getNextItem(
        projectId: string,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/next-item',
            path: {
                'projectId': projectId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project not found or no pending items`,
            },
        });
    }
    /**
     * Add test items
     * Add sample test items to a project
     * @param projectId Project ID
     * @returns any Test items added successfully
     * @throws ApiError
     */
    public addTestItems(
        projectId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/add-test-items',
            path: {
                'projectId': projectId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
            },
        });
    }
    /**
     * Create a new item
     * Create a new item in a specific project
     * @param projectId Project ID
     * @param requestBody
     * @returns Item Item created successfully
     * @throws ApiError
     */
    public createItem(
        projectId: string,
        requestBody: CreateItemRequest,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/items',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get all items
     * Retrieve all items for a specific project
     * @param projectId Project ID
     * @param status Filter items by status
     * @param processed Filter by requester-side reconciliation state (see PUT /:itemId/processed). false surfaces every item still outstanding — pending, change_requested, and any approved/rejected item not yet marked processed — the durable backstop for anything a missed webhook delivery left stranded. true shows only what's been closed out. Omit to ignore this entirely.
     *
     * @param search Search term applied to item title or description
     * @param sortBy Field used to sort results
     * @param sortOrder Sort direction
     * @param page Page number
     * @param limit Items per page (max 100)
     * @param resolveMedia See GET /v1/projects/{projectId}/items/{itemId}'s resolveMedia — applied to every item in the page.
     * @returns ItemList List of items
     * @throws ApiError
     */
    public listItems(
        projectId: string,
        status?: 'pending' | 'approved' | 'rejected' | 'change_requested',
        processed?: boolean,
        search?: string,
        sortBy?: 'createdAt' | 'title' | 'status' | 'updatedAt',
        sortOrder: 'asc' | 'desc' = 'desc',
        page: number = 1,
        limit: number = 10,
        resolveMedia: boolean = false,
    ): CancelablePromise<ItemList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/items',
            path: {
                'projectId': projectId,
            },
            query: {
                'status': status,
                'processed': processed,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'page': page,
                'limit': limit,
                'resolveMedia': resolveMedia,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get slim status for multiple items
     * Batch variant of the single-item status endpoint — one round trip for N items instead of N. Ids that don't exist or aren't in this project are silently omitted from the result rather than causing an error.
     * @param projectId Project ID
     * @param ids Comma-separated item IDs (maximum 100 per request)
     * @returns ItemStatusSnapshotList Status of the requested items
     * @throws ApiError
     */
    public getItemStatuses(
        projectId: string,
        ids: string,
    ): CancelablePromise<ItemStatusSnapshotList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/items/status',
            path: {
                'projectId': projectId,
            },
            query: {
                'ids': ids,
            },
            errors: {
                400: `Missing, malformed, or excessive ids`,
                401: `Unauthorized`,
                404: `Project not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a specific item
     * Retrieve details of a specific item, optionally including all revisions
     * @param projectId Project ID
     * @param itemId Item ID
     * @param includeVersions Include all versions with full content (including current version)
     * @param resolveMedia When true, content.data has any embedded media://<id> ref substituted for a signed URL. media[] itself always carries a signed url/urlExpiresAt regardless of this flag. Default is the stable view: content.data keeps its durable media://<id> ref rather than a URL that will eventually expire.
     *
     * @returns Item Item details (with optional versions array)
     * @throws ApiError
     */
    public getItem(
        projectId: string,
        itemId: string,
        includeVersions: boolean = false,
        resolveMedia: boolean = false,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/items/{itemId}',
            path: {
                'projectId': projectId,
                'itemId': itemId,
            },
            query: {
                'includeVersions': includeVersions,
                'resolveMedia': resolveMedia,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or item not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Delete an item
     * Delete a specific item. Only pending items with no decisions and no prior versions can be deleted (admins are exempt) — a decided or revised item is audit history and is retained.
     *
     * @param projectId Project ID
     * @param itemId Item ID
     * @returns void
     * @throws ApiError
     */
    public deleteItem(
        projectId: string,
        itemId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/projects/{projectId}/items/{itemId}',
            path: {
                'projectId': projectId,
                'itemId': itemId,
            },
            errors: {
                400: `Item has decisions or prior versions and cannot be deleted`,
                401: `Unauthorized`,
                404: `Project or item not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get slim status for an item
     * Returns only status, version, and the latest decision — not content or metadata. The cheap alternative to GET /:itemId when polling for a decision.
     * @param projectId Project ID
     * @param itemId Item ID
     * @returns ItemStatusSnapshot Item status
     * @throws ApiError
     */
    public getItemStatus(
        projectId: string,
        itemId: string,
    ): CancelablePromise<ItemStatusSnapshot> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/items/{itemId}/status',
            path: {
                'projectId': projectId,
                'itemId': itemId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or item not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update item decision
     * Update the decision status of an item. When decision is 'change_requested', a comment is required.
     * @param projectId Project ID
     * @param itemId Item ID
     * @param requestBody
     * @returns Item Decision updated successfully
     * @throws ApiError
     */
    public updateItemDecision(
        projectId: string,
        itemId: string,
        requestBody: UpdateItemDecisionRequest,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/projects/{projectId}/items/{itemId}/decision',
            path: {
                'projectId': projectId,
                'itemId': itemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request (e.g., comment required for 'change_requested' decision)`,
                401: `Unauthorized`,
                404: `Project or item not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Mark an item's decision as processed
     * Records that the requester has finished acting on a decision — the durable pull-side backstop for reconciliation when a webhook was never delivered (no retries exist yet) or was delivered but not fully handled on the receiving end. Only valid once, and only from 'approved' or 'rejected'. A 'change_requested' item closes itself out when POST .../versions creates a new round instead — there's nothing to explicitly process until then. Reading a decision (GET /:itemId, GET /:itemId/status, or GET / with a status filter) never marks it processed on its own; this is the only thing that does, precisely so a caller that merely fetched a decision but hasn't finished acting on it is not mistaken for one that has.
     *
     * @param projectId Project ID
     * @param itemId Item ID
     * @param requestBody
     * @returns Item Item marked processed successfully
     * @throws ApiError
     */
    public markItemProcessed(
        projectId: string,
        itemId: string,
        requestBody?: ProcessItemRequest,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/projects/{projectId}/items/{itemId}/processed',
            path: {
                'projectId': projectId,
                'itemId': itemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Item isn't in a terminal state yet, or was already processed`,
                401: `Unauthorized`,
                404: `Project or item not found`,
                500: `Internal server error`,
            },
        });
    }
}
