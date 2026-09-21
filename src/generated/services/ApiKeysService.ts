/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIKey } from '../models/APIKey';
import type { APIKeyList } from '../models/APIKeyList';
import type { CreateAPIKey } from '../models/CreateAPIKey';
import type { CreateAPIKeyRequest } from '../models/CreateAPIKeyRequest';
import type { UpdateAPIKeyRequest } from '../models/UpdateAPIKeyRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ApiKeysService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List API keys
     * Retrieve a list of API keys for the authenticated user
     * @returns APIKeyList A list of API keys
     * @throws ApiError
     */
    public listApiKeys(): CancelablePromise<APIKeyList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/api-keys',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create new API key
     * Generate a new API key for the authenticated user
     * @param requestBody
     * @returns CreateAPIKey API key created successfully
     * @throws ApiError
     */
    public createApiKey(
        requestBody: CreateAPIKeyRequest,
    ): CancelablePromise<CreateAPIKey> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/api-keys',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update API key
     * Update an API key's name and/or permissions (partial update).
     * @param keyId
     * @param requestBody
     * @returns APIKey The updated API key
     * @throws ApiError
     */
    public updateApiKey(
        keyId: string,
        requestBody: UpdateAPIKeyRequest,
    ): CancelablePromise<APIKey> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/api-keys/{keyId}',
            path: {
                'keyId': keyId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                401: `Unauthorized`,
                404: `API key not found`,
            },
        });
    }
    /**
     * Delete API key
     * Delete an existing API key
     * @param keyId ID of the API key to delete
     * @returns void
     * @throws ApiError
     */
    public deleteApiKey(
        keyId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/api-keys/{keyId}',
            path: {
                'keyId': keyId,
            },
            errors: {
                401: `Unauthorized`,
                404: `API key not found`,
                500: `Internal server error`,
            },
        });
    }
}
