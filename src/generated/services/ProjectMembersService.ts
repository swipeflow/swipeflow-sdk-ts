/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddProjectMemberRequest } from '../models/AddProjectMemberRequest';
import type { Project } from '../models/Project';
import type { UpdateProjectMemberRequest } from '../models/UpdateProjectMemberRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProjectMembersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Add project member
     * Add a new member to the project
     * @param projectId Project ID
     * @param requestBody
     * @returns Project Member added successfully
     * @throws ApiError
     */
    public addProjectMember(
        projectId: string,
        requestBody: AddProjectMemberRequest,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/members',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Project not found`,
                409: `Member already exists`,
            },
        });
    }
    /**
     * Update project member
     * Update a member's role in the project
     * @param projectId Project ID
     * @param memberId Member ID
     * @param requestBody
     * @returns Project Member updated successfully
     * @throws ApiError
     */
    public updateProjectMember(
        projectId: string,
        memberId: string,
        requestBody: UpdateProjectMemberRequest,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/projects/{projectId}/members/{memberId}',
            path: {
                'projectId': projectId,
                'memberId': memberId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Project or member not found`,
            },
        });
    }
    /**
     * Remove project member
     * Remove a member from the project
     * @param projectId Project ID
     * @param memberId Member ID
     * @returns void
     * @throws ApiError
     */
    public removeProjectMember(
        projectId: string,
        memberId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/projects/{projectId}/members/{memberId}',
            path: {
                'projectId': projectId,
                'memberId': memberId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Project or member not found`,
            },
        });
    }
}
