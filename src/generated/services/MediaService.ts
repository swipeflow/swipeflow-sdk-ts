/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaDescriptor } from '../models/MediaDescriptor';
import type { MediaListPage } from '../models/MediaListPage';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MediaService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Confirm a completed direct upload (step 2 of 2)
     * Call after the direct-to-storage `PUT` completes. `HEAD`s the object, requires its actual size to equal the declared size, persists the opaque storage ETag, and moves the media to `uploaded`. Idempotent. A size mismatch fails completion, releases the reservation, and schedules the object for deletion. Returns the media record with a short-lived `contentUrl`.
     *
     * @param id
     * @returns MediaDescriptor Confirmed
     * @throws ApiError
     */
    public confirmMediaUpload(
        id: string,
    ): CancelablePromise<MediaDescriptor> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/media-uploads/{id}/confirm',
            path: {
                'id': id,
            },
            errors: {
                403: `Not allowed`,
                404: `Not found`,
                409: `No uploaded object found yet, size mismatch, or media not in upload_pending`,
            },
        });
    }
    /**
     * Redirect to a signed URL for the bytes
     * 302 to a signed storage URL, for header-authenticated callers holding a durable `media://<id>` reference. In-content references are resolved against the containing item/version's own `media[]` when it is read and normally do not hit this endpoint.
     *
     * @param id
     * @returns void
     * @throws ApiError
     */
    public getMediaContent(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/media/{id}/content',
            path: {
                'id': id,
            },
            errors: {
                302: `Redirect to the signed URL`,
                404: `Not found`,
            },
        });
    }
    /**
     * Media metadata
     * Returns the common descriptor plus lifecycle data — status, timestamps, `itemIds`, `etag`, and optional `md5`. `url`/`urlExpiresAt` are only non-null once `uploaded`.
     *
     * @param id
     * @returns MediaDescriptor Media metadata
     * @throws ApiError
     */
    public getMedia(
        id: string,
    ): CancelablePromise<MediaDescriptor> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/media/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Delete a media object
     * Moves the media to `delete_pending` and frees its bytes from the project's quota immediately; the sweep removes the stored object and leaves a `deleted` tombstone. Allowed for the uploader or an OWNER/ADMIN of the media's project. Works only while unattached (`itemIds` empty) — attached media is immutable and removed only with its project.
     *
     * @param id
     * @returns void
     * @throws ApiError
     */
    public deleteMedia(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/media/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Not allowed`,
                404: `Not found`,
                409: `Media is attached and cannot be deleted while attached`,
            },
        });
    }
    /**
     * Request a media upload ticket
     * Media is uploaded directly to storage, not through this API, in two steps. Step 1 (this call): send the filename, exact byte size, and MIME type; the response contains a presigned, exact-size, write-once `PUT` target (`upload.url` + `upload.headers`) that the client sends the raw bytes to with those exact headers, e.g. `curl -X PUT "$url" $(for k in ...; do echo -H "$k: ..."; done) --data-binary @path`. Step 2: `POST /v1/media-uploads/{id}/confirm` once the upload completes. From there, using the media is ordinary item usage, not a further upload step: attach it to an item and/or embed its `ref` inside the item's markdown/HTML content — refs are swapped for short-lived signed URLs when the item is read. The declared `fileSize` is reserved against the account's media quota immediately; an unconfirmed ticket is reclaimed after it expires.
     *
     * @param projectId
     * @param requestBody
     * @returns any Upload ticket issued (status `upload_pending`)
     * @throws ApiError
     */
    public createMediaUpload(
        projectId: string,
        requestBody: {
            filename: string;
            /**
             * Exact size in bytes.
             */
            fileSize: number;
            mimeType: string;
            /**
             * Optional base64 MD5, validated by storage during the PUT.
             */
            md5?: string;
        },
    ): CancelablePromise<(MediaDescriptor & {
        upload?: {
            url?: string;
            method?: 'PUT';
            headers?: Record<string, string>;
            expiresAt?: string;
        };
    })> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/media-uploads',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing or invalid fields`,
                403: `A VIEWER may read project media but not create it`,
                413: `File exceeds the per-file limit or would exceed the storage quota`,
            },
        });
    }
    /**
     * Project media storage usage and limit
     * Always project-scoped (`docs/media/DESIGN.md` §5.2) — `usedBytes` is charged to the project regardless of which member uploads, and includes bytes reserved by pending upload tickets and in-flight URL imports. `limitBytes`/`plan`/`seats` derive from the project OWNER's plan.
     *
     * @param projectId
     * @returns any OK
     * @throws ApiError
     */
    public getProjectMediaUsage(
        projectId: string,
    ): CancelablePromise<{
        usedBytes?: number;
        limitBytes?: number;
        plan?: 'free' | 'pro';
        seats?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/media/usage',
            path: {
                'projectId': projectId,
            },
            errors: {
                404: `Project not found or insufficient permissions`,
            },
        });
    }
    /**
     * List project media
     * Cursor-paginated, newest first. Excludes `deleted` tombstones unless `status` explicitly asks for them. Every row's signed URL shares one absolute expiry.
     *
     * @param projectId
     * @param cursor Opaque cursor from a previous response's nextCursor
     * @param limit
     * @param status
     * @param attached Filter to media with (true) or without (false) any itemIds
     * @returns MediaListPage A page of project media
     * @throws ApiError
     */
    public listProjectMedia(
        projectId: string,
        cursor?: string,
        limit: number = 20,
        status?: 'upload_pending' | 'import_pending' | 'uploaded' | 'delete_pending' | 'deleted',
        attached?: boolean,
    ): CancelablePromise<MediaListPage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/projects/{projectId}/media',
            path: {
                'projectId': projectId,
            },
            query: {
                'cursor': cursor,
                'limit': limit,
                'status': status,
                'attached': attached,
            },
            errors: {
                400: `Invalid status/limit/cursor`,
                404: `Project not found or insufficient permissions`,
            },
        });
    }
    /**
     * Import media from a URL
     * Downloads a file from the supplied HTTP or HTTPS URL and stores it in the project's media library. The import runs asynchronously. A successful request returns `202` with a media descriptor whose status is `import_pending`; use `GET /v1/media/{id}` to check when it becomes `uploaded`. File-size and storage limits for the project apply. The source URL is used only for the import and is not stored or returned.
     *
     * @param projectId
     * @param requestBody
     * @returns MediaDescriptor Import started (status import_pending)
     * @throws ApiError
     */
    public importMediaFromUrl(
        projectId: string,
        requestBody: {
            /**
             * HTTP or HTTPS URL of the file to import.
             */
            url: string;
            /**
             * Optional filename to use for the imported media.
             */
            fileName?: string;
        },
    ): CancelablePromise<MediaDescriptor> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/projects/{projectId}/media/import-url',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing or invalid url`,
                403: `A VIEWER may read project media but not create it`,
                404: `Project not found or insufficient permissions`,
                413: `The import exceeds the applicable file-size or storage limit`,
                503: `URL imports are unavailable in this environment`,
            },
        });
    }
}
