/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTriggerRequest } from '../models/CreateTriggerRequest';
import type { ProjectTrigger } from '../models/ProjectTrigger';
import type { RunTriggerRequest } from '../models/RunTriggerRequest';
import type { UpdateTriggerRequest } from '../models/UpdateTriggerRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProjectTriggersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Run a project trigger
     * Executes a manual trigger defined in the project's trigger configuration and sends the associated webhook.
     * @param projectId Project ID
     * @param triggerId Trigger ID
     * @param requestBody
     * @returns any Trigger executed successfully
     * @throws ApiError
     */
    public runTrigger(
        projectId: string,
        triggerId: string,
        requestBody: RunTriggerRequest,
    ): CancelablePromise<{
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/triggers/{triggerId}/run',
            path: {
                'projectId': projectId,
                'triggerId': triggerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                401: `Unauthorized`,
                404: `Project or trigger not found`,
            },
        });
    }
    /**
     * Get manual triggers
     * Get all manual triggers for a project
     * @param projectId Project ID
     * @returns ProjectTrigger List of manual triggers
     * @throws ApiError
     */
    public listTriggers(
        projectId: string,
    ): CancelablePromise<Array<ProjectTrigger>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/triggers',
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
     * Create manual trigger
     * Create a new manual trigger for a project
     * @param projectId Project ID
     * @param requestBody
     * @returns ProjectTrigger Trigger created successfully
     * @throws ApiError
     */
    public createTrigger(
        projectId: string,
        requestBody: CreateTriggerRequest,
    ): CancelablePromise<ProjectTrigger> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/triggers',
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
     * Update manual trigger
     * Update an existing manual trigger
     * @param projectId Project ID
     * @param triggerId Manual trigger ID
     * @param requestBody
     * @returns ProjectTrigger Trigger updated successfully
     * @throws ApiError
     */
    public updateTrigger(
        projectId: string,
        triggerId: string,
        requestBody: UpdateTriggerRequest,
    ): CancelablePromise<ProjectTrigger> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/projects/{projectId}/triggers/{triggerId}',
            path: {
                'projectId': projectId,
                'triggerId': triggerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                401: `Unauthorized`,
                404: `Project or trigger not found`,
            },
        });
    }
    /**
     * Delete trigger
     * Delete an existing manual trigger
     * @param projectId Project ID
     * @param triggerId Manual trigger ID
     * @returns void
     * @throws ApiError
     */
    public deleteTrigger(
        projectId: string,
        triggerId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/projects/{projectId}/triggers/{triggerId}',
            path: {
                'projectId': projectId,
                'triggerId': triggerId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or trigger not found`,
            },
        });
    }
}
