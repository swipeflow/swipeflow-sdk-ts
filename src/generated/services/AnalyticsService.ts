/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DashboardAnalytics } from '../models/DashboardAnalytics';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AnalyticsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get dashboard analytics
     * Retrieve analytics data for the dashboard view
     * @param projectId Scope the analytics (including recent activity) to a single project
     * @returns DashboardAnalytics Dashboard analytics data
     * @throws ApiError
     */
    public getDashboardAnalytics(
        projectId?: string,
    ): CancelablePromise<DashboardAnalytics> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/analytics/dashboard',
            query: {
                'projectId': projectId,
            },
            errors: {
                400: `Invalid projectId`,
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
}
