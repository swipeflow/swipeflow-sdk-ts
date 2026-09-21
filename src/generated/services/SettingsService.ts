/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Settings } from '../models/Settings';
import type { UpdateSettingsRequest } from '../models/UpdateSettingsRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SettingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get user settings
     * Retrieve the current user's settings
     * @returns Settings User settings
     * @throws ApiError
     */
    public getUserSettings(): CancelablePromise<Settings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/settings',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update user settings
     * Update the current user's settings
     * @param requestBody
     * @returns Settings Settings updated successfully
     * @throws ApiError
     */
    public updateUserSettings(
        requestBody: UpdateSettingsRequest,
    ): CancelablePromise<Settings> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/settings',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
}
