/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarkAsRead } from '../models/MarkAsRead';
import type { NotificationList } from '../models/NotificationList';
import type { RegisterDeviceRequest } from '../models/RegisterDeviceRequest';
import type { UnreadCount } from '../models/UnreadCount';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class NotificationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get notifications for the current user, paginated newest first
     * @param page 1-indexed page number
     * @param limit Page size. The caller knows another page exists when the response length equals this value.
     * @returns NotificationList List of notifications
     * @throws ApiError
     */
    public listNotifications(
        page: number = 1,
        limit: number = 20,
    ): CancelablePromise<NotificationList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/notifications',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Delete all notifications for the current user
     * @returns MarkAsRead All notifications deleted
     * @throws ApiError
     */
    public deleteAllNotifications(): CancelablePromise<MarkAsRead> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/notifications',
            errors: {
                401: `Unauthorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get unread notifications count
     * @returns UnreadCount Number of unread notifications
     * @throws ApiError
     */
    public getUnreadNotificationCount(): CancelablePromise<UnreadCount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/notifications/unread-count',
            errors: {
                401: `Unauthorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Mark a notification as read
     * @param notificationId ID of the notification to mark as read
     * @returns MarkAsRead Notification marked as read
     * @throws ApiError
     */
    public markNotificationRead(
        notificationId: string,
    ): CancelablePromise<MarkAsRead> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/notifications/{notificationId}/read',
            path: {
                'notificationId': notificationId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Notification not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Mark all notifications as read
     * @returns MarkAsRead All notifications marked as read
     * @throws ApiError
     */
    public markAllNotificationsRead(): CancelablePromise<MarkAsRead> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/notifications/read-all',
            errors: {
                401: `Unauthorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Register a device for push notifications
     * @param requestBody
     * @returns MarkAsRead Device registered successfully
     * @throws ApiError
     */
    public registerNotificationDevice(
        requestBody: RegisterDeviceRequest,
    ): CancelablePromise<MarkAsRead> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/notifications/devices',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request body`,
                401: `Unauthorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Remove device registration
     * @param token Device push notification token
     * @returns MarkAsRead Device registration removed
     * @throws ApiError
     */
    public removeNotificationDevice(
        token: string,
    ): CancelablePromise<MarkAsRead> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/notifications/devices/{token}',
            path: {
                'token': token,
            },
            errors: {
                401: `Unauthorized`,
                404: `Device registration not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Delete a specific notification
     * @param notificationId ID of the notification to delete
     * @returns MarkAsRead Notification deleted
     * @throws ApiError
     */
    public deleteNotification(
        notificationId: string,
    ): CancelablePromise<MarkAsRead> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/notifications/{notificationId}',
            path: {
                'notificationId': notificationId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Notification not found`,
                500: `Server error`,
            },
        });
    }
}
