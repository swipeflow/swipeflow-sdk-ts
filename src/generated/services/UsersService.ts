/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditEventPage } from '../models/AuditEventPage';
import type { DeleteAccountRequest } from '../models/DeleteAccountRequest';
import type { RecentProjects } from '../models/RecentProjects';
import type { SuccessResponse } from '../models/SuccessResponse';
import type { UpdateProfilePicture } from '../models/UpdateProfilePicture';
import type { UpdateUserProfileRequest } from '../models/UpdateUserProfileRequest';
import type { UserProfile } from '../models/UserProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get user profile
     * Retrieve the current user's profile information
     * @param userIdOrMe The user ID or the string 'me' to refer to the authenticated user.
     * @returns UserProfile User profile
     * @throws ApiError
     */
    public getUserProfile(
        userIdOrMe: string,
    ): CancelablePromise<UserProfile> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/{userIdOrMe}/profile',
            path: {
                'userIdOrMe': userIdOrMe,
            },
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update user profile
     * Update the current user's profile information
     * @param userIdOrMe The user ID or the string 'me' to refer to the authenticated user.
     * @param requestBody
     * @returns UserProfile Profile updated successfully
     * @throws ApiError
     */
    public updateUserProfile(
        userIdOrMe: string,
        requestBody: UpdateUserProfileRequest,
    ): CancelablePromise<UserProfile> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/users/{userIdOrMe}/profile',
            path: {
                'userIdOrMe': userIdOrMe,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Delete user account
     * Permanently delete the user account and all associated data
     * @param userIdOrMe The user ID or the string 'me' to refer to the authenticated user.
     * @param requestBody
     * @returns SuccessResponse Account successfully deleted
     * @throws ApiError
     */
    public deleteUserAccount(
        userIdOrMe: string,
        requestBody?: DeleteAccountRequest,
    ): CancelablePromise<SuccessResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/users/{userIdOrMe}/profile',
            path: {
                'userIdOrMe': userIdOrMe,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `User not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Combined storage allowance and usage across every owned project
     * `limitBytes`/`plan`/`seats` are the user's combined plan quota (free allowance, or pro allowance × seats). `usedBytes` is the total across every project this user owns. `media` breaks that total down per project — other consumers of the same quota may join this response later.
     *
     * @param userIdOrMe The user ID or the string 'me'. Any other id is admin-only.
     * @returns any OK
     * @throws ApiError
     */
    public getUserStorageUse(
        userIdOrMe: string,
    ): CancelablePromise<{
        limitBytes?: number;
        plan?: 'free' | 'pro';
        seats?: number;
        usedBytes?: number;
        media?: {
            usedBytes?: number;
            projects?: Array<{
                projectId?: string;
                usedBytes?: number;
            }>;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/{userIdOrMe}/storage-use',
            path: {
                'userIdOrMe': userIdOrMe,
            },
            errors: {
                403: `Forbidden — only the user themself or an admin may view this`,
            },
        });
    }
    /**
     * Update profile picture
     * Upload a new profile picture
     * @param userIdOrMe The user ID or the string 'me' to refer to the authenticated user.
     * @param formData
     * @returns UpdateProfilePicture Profile picture updated successfully
     * @throws ApiError
     */
    public updateUserProfilePicture(
        userIdOrMe: string,
        formData: {
            /**
             * Profile picture file (max 5MB, image files only - will be converted to PNG)
             */
            picture?: Blob;
        },
    ): CancelablePromise<UpdateProfilePicture> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/users/{userIdOrMe}/profile-picture',
            path: {
                'userIdOrMe': userIdOrMe,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid file type or size`,
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get recent projects
     * Retrieve the current user's recently accessed projects
     * @param userIdOrMe The user ID or the string 'me' to refer to the authenticated user.
     * @returns RecentProjects List of recent projects
     * @throws ApiError
     */
    public listRecentProjects(
        userIdOrMe: string,
    ): CancelablePromise<RecentProjects> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/{userIdOrMe}/recent-projects',
            path: {
                'userIdOrMe': userIdOrMe,
            },
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List a user's audit events
     * Paginated, newest-first feed of the user's own activity — every audit event where
     * they are the actor or the subject — across all projects and account-level events
     * (profile, role, settings, API-key lifecycle). Use `me` or your own user id for your
     * personal feed. See `GET /v1/projects/{projectId}/audit-events` for a project's feed.
     *
     * @param userIdOrMe The user ID or the string 'me' to refer to the authenticated user.
     * @param cursor Opaque cursor from a previous response's nextCursor
     * @param limit
     * @param type Comma-separated AuditEventType values to filter by
     * @param projectId Narrow the feed to a single project
     * @param from
     * @param to
     * @returns AuditEventPage A page of audit events
     * @throws ApiError
     */
    public listUserAuditEvents(
        userIdOrMe: string,
        cursor?: string,
        limit: number = 20,
        type?: string,
        projectId?: string,
        from?: string,
        to?: string,
    ): CancelablePromise<AuditEventPage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/{userIdOrMe}/audit-events',
            path: {
                'userIdOrMe': userIdOrMe,
            },
            query: {
                'cursor': cursor,
                'limit': limit,
                'type': type,
                'projectId': projectId,
                'from': from,
                'to': to,
            },
            errors: {
                400: `Invalid query parameter`,
                401: `Unauthorized`,
                403: `Forbidden — non-admin requesting another user's feed`,
            },
        });
    }
}
