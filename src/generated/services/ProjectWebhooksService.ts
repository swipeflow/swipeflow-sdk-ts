/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackfillRequest } from '../models/BackfillRequest';
import type { BackfillResult } from '../models/BackfillResult';
import type { CreateWebhookRequest } from '../models/CreateWebhookRequest';
import type { ReconciliationEventPage } from '../models/ReconciliationEventPage';
import type { ReplayDeliveriesRequest } from '../models/ReplayDeliveriesRequest';
import type { ReplayDeliveriesResult } from '../models/ReplayDeliveriesResult';
import type { RotateWebhookSecretRequest } from '../models/RotateWebhookSecretRequest';
import type { RotateWebhookSecretResponse } from '../models/RotateWebhookSecretResponse';
import type { UpdateWebhookRequest } from '../models/UpdateWebhookRequest';
import type { Webhook } from '../models/Webhook';
import type { WebhookCursor } from '../models/WebhookCursor';
import type { WebhookDelivery } from '../models/WebhookDelivery';
import type { WebhookDeliveryDetail } from '../models/WebhookDeliveryDetail';
import type { WebhookDeliveryPage } from '../models/WebhookDeliveryPage';
import type { WebhookDeliveryStatus } from '../models/WebhookDeliveryStatus';
import type { WebhookList } from '../models/WebhookList';
import type { WebhookLogPage } from '../models/WebhookLogPage';
import type { WebhookTest } from '../models/WebhookTest';
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
     * Paginated delivery logs for a specific webhook, newest-first.
     * @param projectId Project ID
     * @param webhookId Webhook ID
     * @param status Restrict to successful or failed deliveries
     * @param eventType Restrict to a single event type
     * @param deliveryId Restrict to the attempts of a single delivery
     * @param search Case-insensitive text match against event type, error and response body/snippet
     * @param cursor
     * @param limit
     * @returns WebhookLogPage Page of webhook delivery logs
     * @throws ApiError
     */
    public getWebhookLogs(
        projectId: string,
        webhookId: string,
        status?: 'success' | 'failed',
        eventType?: string,
        deliveryId?: string,
        search?: string,
        cursor?: string,
        limit?: number,
    ): CancelablePromise<WebhookLogPage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/logs',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            query: {
                'status': status,
                'eventType': eventType,
                'deliveryId': deliveryId,
                'search': search,
                'cursor': cursor,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Test webhook
     * Queues one signed `test` request to the webhook's URL. It is sent once, without retries, and doesn't affect the webhook's health or suspension. Poll the returned test for the result; it also appears in the webhook's logs.
     * @param projectId Project ID
     * @param webhookId Webhook ID
     * @returns WebhookTest Test queued
     * @throws ApiError
     */
    public testWebhook(
        projectId: string,
        webhookId: string,
    ): CancelablePromise<WebhookTest> {
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
     * Get a webhook test
     * The state of a queued test, and the receiver's response once it has been sent.
     * @param projectId
     * @param webhookId
     * @param testId
     * @returns WebhookTest Webhook test
     * @throws ApiError
     */
    public getWebhookTest(
        projectId: string,
        webhookId: string,
        testId: string,
    ): CancelablePromise<WebhookTest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/tests/{testId}',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
                'testId': testId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project, webhook or test not found`,
            },
        });
    }
    /**
     * Rotate webhook secret
     * Rotates in a new signing secret. The outgoing secret keeps signing alongside it (`X-Swipeflow-Signature-Previous`) for the grace period, so receivers can move over without a dropped-signature window.
     * @param projectId
     * @param webhookId
     * @param requestBody
     * @returns RotateWebhookSecretResponse Secret rotated. The new secret is included once and never returned again.
     * @throws ApiError
     */
    public rotateWebhookSecret(
        projectId: string,
        webhookId: string,
        requestBody?: RotateWebhookSecretRequest,
    ): CancelablePromise<RotateWebhookSecretResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/rotate-secret',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Reactivate a suspended webhook
     * Clears a failure-rate suspension and re-enqueues any deliveries that were held while suspended. Always client/owner-driven — never automatic.
     * @param projectId
     * @param webhookId
     * @returns Webhook Webhook reactivated
     * @throws ApiError
     */
    public reactivateWebhook(
        projectId: string,
        webhookId: string,
    ): CancelablePromise<Webhook> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/reactivate',
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
     * Get the webhook's reconciliation cursor
     * The event-id watermark a receiver can persist and resume from — everything at or before it is settled for this webhook.
     * @param projectId
     * @param webhookId
     * @returns WebhookCursor Current cursor
     * @throws ApiError
     */
    public getWebhookCursor(
        projectId: string,
        webhookId: string,
    ): CancelablePromise<WebhookCursor> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/cursor',
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
     * List events for reconciliation
     * Events of the webhook's subscribed types, oldest-first, so a receiver that fell behind (or was suspended) can ask "what did I miss".
     * @param projectId
     * @param webhookId
     * @param after Public event id to list strictly after (exclusive). Typically the webhook's cursor.
     * @param limit
     * @returns ReconciliationEventPage Page of events
     * @throws ApiError
     */
    public listWebhookReconciliationEvents(
        projectId: string,
        webhookId: string,
        after?: string,
        limit?: number,
    ): CancelablePromise<ReconciliationEventPage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/events',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            query: {
                'after': after,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * List a webhook's deliveries
     * Paginated delivery history, newest-first.
     * @param projectId
     * @param webhookId
     * @param status One or more statuses (repeat the param, or pass a comma-separated list)
     * @param eventType
     * @param cursor
     * @param limit
     * @returns WebhookDeliveryPage Page of deliveries
     * @throws ApiError
     */
    public listWebhookDeliveries(
        projectId: string,
        webhookId: string,
        status?: Array<WebhookDeliveryStatus>,
        eventType?: string,
        cursor?: string,
        limit?: number,
    ): CancelablePromise<WebhookDeliveryPage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/deliveries',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            query: {
                'status': status,
                'eventType': eventType,
                'cursor': cursor,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Bulk-replay terminal deliveries
     * Re-queues terminal deliveries (default status `dead`) as new delivery rows, capped at 200 per call.
     * @param projectId
     * @param webhookId
     * @param requestBody
     * @returns ReplayDeliveriesResult Replay result
     * @throws ApiError
     */
    public replayWebhookDeliveries(
        projectId: string,
        webhookId: string,
        requestBody?: ReplayDeliveriesRequest,
    ): CancelablePromise<ReplayDeliveriesResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/deliveries/replay',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Get a delivery
     * A single delivery, including its full attempt timeline.
     * @param projectId
     * @param webhookId
     * @param deliveryId
     * @returns WebhookDeliveryDetail Delivery detail
     * @throws ApiError
     */
    public getWebhookDelivery(
        projectId: string,
        webhookId: string,
        deliveryId: string,
    ): CancelablePromise<WebhookDeliveryDetail> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/deliveries/{deliveryId}',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
                'deliveryId': deliveryId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project, webhook or delivery not found`,
            },
        });
    }
    /**
     * Replay a delivery
     * Re-queues the delivery as a new row (`replayOf` the original), leaving the original's own history untouched.
     * @param projectId
     * @param webhookId
     * @param deliveryId
     * @returns WebhookDelivery The new (replay) delivery
     * @throws ApiError
     */
    public replayWebhookDelivery(
        projectId: string,
        webhookId: string,
        deliveryId: string,
    ): CancelablePromise<WebhookDelivery> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/deliveries/{deliveryId}/replay',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
                'deliveryId': deliveryId,
            },
            errors: {
                400: `The original event has expired and can no longer be replayed`,
                401: `Unauthorized`,
                404: `Project, webhook or delivery not found`,
            },
        });
    }
    /**
     * Backfill deliveries for a range of events
     * Creates and enqueues deliveries for events in range not already covered. Safe to re-run — already-covered events are left alone. Capped at 500 events per call.
     * @param projectId
     * @param webhookId
     * @param requestBody
     * @returns BackfillResult Backfill result
     * @throws ApiError
     */
    public backfillWebhookDeliveries(
        projectId: string,
        webhookId: string,
        requestBody?: BackfillRequest,
    ): CancelablePromise<BackfillResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/webhooks/{webhookId}/backfill',
            path: {
                'projectId': projectId,
                'webhookId': webhookId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Project or webhook not found`,
            },
        });
    }
    /**
     * Get project webhook logs
     * Paginated webhook delivery logs across the project, newest-first.
     * @param projectId Project ID
     * @param status Restrict to successful or failed deliveries
     * @param eventType Restrict to a single event type
     * @param deliveryId Restrict to the attempts of a single delivery
     * @param search Case-insensitive text match against event type, error and response body/snippet
     * @param cursor
     * @param limit
     * @returns WebhookLogPage Page of webhook delivery logs for the project
     * @throws ApiError
     */
    public listProjectWebhookLogs(
        projectId: string,
        status?: 'success' | 'failed',
        eventType?: string,
        deliveryId?: string,
        search?: string,
        cursor?: string,
        limit?: number,
    ): CancelablePromise<WebhookLogPage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/webhook-logs',
            path: {
                'projectId': projectId,
            },
            query: {
                'status': status,
                'eventType': eventType,
                'deliveryId': deliveryId,
                'search': search,
                'cursor': cursor,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
            },
        });
    }
}
