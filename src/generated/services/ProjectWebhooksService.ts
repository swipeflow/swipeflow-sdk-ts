/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWebhookRequest } from '../models/CreateWebhookRequest';
import type { UpdateWebhookRequest } from '../models/UpdateWebhookRequest';
import type { Webhook } from '../models/Webhook';
import type { WebhookList } from '../models/WebhookList';
import type { WebhookLog } from '../models/WebhookLog';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProjectWebhooksService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create webhook
     * Create a new webhook for the project
     * @param projectId Project ID
     * @param requestBody
     * @returns Webhook Webhook created successfully
     * @throws ApiError
     */
    public createWebhook(
        projectId: string,
        requestBody: CreateWebhookRequest,
    ): CancelablePromise<Webhook> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/webhooks',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                401: `Unauthorized`,
                404: `Project not found`,
            },
        });
    }
    /**
     * List webhooks
     * Get all webhooks for the project
     * @param projectId Project ID
     * @returns WebhookList List of webhooks
     * @throws ApiError
     */
    public listWebhooks(
        projectId: string,
    ): CancelablePromise<WebhookList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks',
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
     * Update webhook
     * Update an existing webhook
     * @param projectId Project ID
     * @param webhookId Webhook ID
     * @param requestBody
     * @returns Webhook Webhook updated successfully
     * @throws ApiError
     */
    public updateWebhook(
        projectId: string,
        webhookId: string,
        requestBody: UpdateWebhookRequest,
    ): CancelablePromise<Webhook> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Delete webhook
     * Delete an existing webhook
     * @param projectId Project ID
     * @param webhookId Webhook ID
     * @returns void
     * @throws ApiError
     */
    public deleteWebhook(
        projectId: string,
        webhookId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Get webhook logs
     * Get delivery logs for a specific webhook
     * @param projectId Project ID
     * @param webhookId Webhook ID
     * @returns WebhookLog List of webhook delivery logs
     * @throws ApiError
     */
    public getWebhookLogs(
        projectId: string,
        webhookId: string,
    ): CancelablePromise<Array<WebhookLog>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/logs',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Test webhook
     * Send a test payload to the webhook
     * @param projectId Project ID
     * @param webhookId Webhook ID
     * @returns any Test webhook sent successfully
     * @throws ApiError
     */
    public testWebhook(
        projectId: string,
        webhookId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/test',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Get project webhook logs
     * Get all webhook delivery logs for the project
     * @param projectId Project ID
     * @returns WebhookLog List of all webhook delivery logs for the project
     * @throws ApiError
     */
    public listProjectWebhookLogs(
        projectId: string,
    ): CancelablePromise<Array<WebhookLog>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhook-logs',
            path: {
                'projectId': projectId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
            },
        });
    }
}
