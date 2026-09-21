/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditEventPage } from '../models/AuditEventPage';
import type { CreateProjectRequest } from '../models/CreateProjectRequest';
import type { Project } from '../models/Project';
import type { ProjectList } from '../models/ProjectList';
import type { ToggleArchived } from '../models/ToggleArchived';
import type { ToggleStarred } from '../models/ToggleStarred';
import type { UpdateProjectRequest } from '../models/UpdateProjectRequest';
import type { UpdateProjectSettingsRequest } from '../models/UpdateProjectSettingsRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProjectsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get all projects
     * Retrieve a list of all projects for the authenticated user with pagination, search, and filtering options.
     * @param search Search term to filter projects by name or description
     * @param sort Sort projects by name, created date, updated date, total items, or pending items
     * @param fields Comma-separated list of fields to include (or exclude, starting with '-') in the response. Inclusion and exclusion of fields cannot be mixed.
     * @param page Page number for pagination
     * @param limit Number of items per page
     * @param status Filter projects by status
     * @param starred Filter projects by starred status
     * @param includeAll Include all projects (admin only - has no effect for non-admin users)
     * @param memberUserId Admin only - restrict the listing to projects this user is a member of
     * @param ownerUserId Admin only - restrict the listing to projects this user owns
     * @param createdFrom ISO date/datetime lower bound on project creation
     * @param createdTo ISO date/datetime upper bound on project creation (bare date = inclusive)
     * @param ownerStatus Admin only - restrict the listing to projects whose OWNER member's user account no longer exists
     * @returns ProjectList List of projects with pagination information
     * @throws ApiError
     */
    public listProjects(
        search?: string,
        sort: 'name' | 'createdAt' | 'updatedAt' | 'totalItems' | 'pendingItems' = 'updatedAt',
        fields?: string,
        page: number = 1,
        limit: number = 20,
        status?: 'active' | 'archived',
        starred?: boolean,
        includeAll: boolean = false,
        memberUserId?: string,
        ownerUserId?: string,
        createdFrom?: string,
        createdTo?: string,
        ownerStatus?: 'orphaned',
    ): CancelablePromise<ProjectList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects',
            query: {
                'search': search,
                'sort': sort,
                'fields': fields,
                'page': page,
                'limit': limit,
                'status': status,
                'starred': starred,
                'includeAll': includeAll,
                'memberUserId': memberUserId,
                'ownerUserId': ownerUserId,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
                'ownerStatus': ownerStatus,
            },
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a new project
     * Create a new project for the authenticated user
     * @param requestBody
     * @returns Project Project created successfully
     * @throws ApiError
     */
    public createProject(
        requestBody: CreateProjectRequest,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects',
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
     * Get a specific project
     * Retrieve details of a specific project by ID
     * @param projectId Project ID
     * @returns Project Project details
     * @throws ApiError
     */
    public getProject(
        projectId: string,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update a project
     * Update an existing project's details
     * @param projectId Project ID
     * @param requestBody
     * @returns Project Project updated successfully
     * @throws ApiError
     */
    public updateProject(
        projectId: string,
        requestBody: UpdateProjectRequest,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/projects/{projectId}',
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
     * Delete a project
     * Delete an existing project and all its associated items
     * @param projectId Project ID
     * @returns void
     * @throws ApiError
     */
    public deleteProject(
        projectId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Resolve or create a project by name
     * Looks up a project the caller belongs to with a matching name (case-insensitive) and returns it; if none exists, creates one. Lets a caller name a project without first checking whether it exists. Not a strict guarantee under concurrent calls with a brand-new name — see resolveOrCreateProject in ProjectService.
     * @param requestBody
     * @returns Project An existing project matched by name
     * @throws ApiError
     */
    public resolveProject(
        requestBody: CreateProjectRequest,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/resolve',
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
     * Update project settings
     * Update specific settings for a project
     * @param projectId Project ID
     * @param requestBody
     * @returns Project Settings updated successfully
     * @throws ApiError
     */
    public updateProjectSettings(
        projectId: string,
        requestBody: UpdateProjectSettingsRequest,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/projects/{projectId}/settings',
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
     * Toggle project archived status
     * Archive or unarchive a project
     * @param projectId Project ID
     * @returns ToggleArchived Project archived status toggled successfully
     * @throws ApiError
     */
    public toggleProjectArchived(
        projectId: string,
    ): CancelablePromise<ToggleArchived> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/toggle-archived',
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
     * Toggle project starred status
     * Star or unstar a project
     * @param projectId Project ID
     * @returns ToggleStarred Project starred status toggled successfully
     * @throws ApiError
     */
    public toggleProjectStarred(
        projectId: string,
    ): CancelablePromise<ToggleStarred> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/toggle-starred',
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
     * List project audit events
     * Paginated, newest-first activity feed for the project (epic #276). A platform admin
     * or a project OWNER/ADMIN sees every event. A regular member sees all non-sensitive
     * events plus any sensitive event (membership, webhook, API-key changes) they
     * performed or are the subject of.
     *
     * @param projectId Project ID
     * @param cursor Opaque cursor from a previous response's nextCursor
     * @param limit Page size
     * @param type Comma-separated list of AuditEventType values to filter by
     * @param actor Filter by the acting user's ID
     * @param subject Filter by the ID of the user the event is about
     * @param itemId Filter by target ID (alias of targetId)
     * @param targetId Filter by target ID
     * @param from Only events at or after this time
     * @param to Only events at or before this time
     * @returns AuditEventPage A page of audit events
     * @throws ApiError
     */
    public listProjectAuditEvents(
        projectId: string,
        cursor?: string,
        limit: number = 20,
        type?: string,
        actor?: string,
        subject?: string,
        itemId?: string,
        targetId?: string,
        from?: string,
        to?: string,
    ): CancelablePromise<AuditEventPage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/audit-events',
            path: {
                'projectId': projectId,
            },
            query: {
                'cursor': cursor,
                'limit': limit,
                'type': type,
                'actor': actor,
                'subject': subject,
                'itemId': itemId,
                'targetId': targetId,
                'from': from,
                'to': to,
            },
            errors: {
                400: `Invalid query parameter`,
                401: `Unauthorized`,
                404: `Project not found`,
            },
        });
    }
}
