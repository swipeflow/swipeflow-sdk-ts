# Changelog

All notable changes to the SwipeFlow TypeScript API Client will be documented in this file.

## [0.8.0] - 2026-09-21

### Changed (breaking)
- The `/v1` OpenAPI spec now declares an `operationId` for every operation, so generated method names no
  longer derive from the URL. All 70 methods are renamed; parameters, request bodies and return types are
  unchanged. Old → new, by client property:

  - `client.analytics`
    - `getV1AnalyticsDashboard` → `getDashboardAnalytics`
  - `client.apiKeys`
    - `deleteV1ApiKeys` → `deleteApiKey`
    - `getV1ApiKeys` → `listApiKeys`
    - `patchV1ApiKeys` → `updateApiKey`
    - `postV1ApiKeys` → `createApiKey`
  - `client.billing`
    - `getV1Billing` → `getBilling`
    - `getV1BillingInvoices` → `listBillingInvoices`
  - `client.itemVersions`
    - `getV1ProjectsItemsVersions` → `listItemVersions`
    - `getV1ProjectsItemsVersions1` → `getItemVersion`
    - `postV1ProjectsItemsVersions` → `createItemVersion`
  - `client.items`
    - `deleteV1ProjectsItems` → `deleteItem`
    - `getV1ProjectsItems` → `listItems`
    - `getV1ProjectsItemsStatus` → `getItemStatuses`
    - `getV1ProjectsItems1` → `getItem`
    - `getV1ProjectsItemsStatus1` → `getItemStatus`
    - `getV1ProjectsNextItem` → `getNextItem`
    - `postV1ProjectsAddTestItems` → `addTestItems`
    - `postV1ProjectsItems` → `createItem`
    - `putV1ProjectsItemsDecision` → `updateItemDecision`
    - `putV1ProjectsItemsProcessed` → `markItemProcessed`
  - `client.media`
    - `deleteV1Media` → `deleteMedia`
    - `getV1Media` → `getMedia`
    - `getV1MediaContent` → `getMediaContent`
    - `getV1ProjectsMedia` → `listProjectMedia`
    - `getV1ProjectsMediaUsage` → `getProjectMediaUsage`
    - `postV1MediaUploadsConfirm` → `confirmMediaUpload`
    - `postV1ProjectsMediaUploads` → `createMediaUpload`
    - `postV1ProjectsMediaImportUrl` → `importMediaFromUrl`
  - `client.notifications`
    - `deleteV1Notifications` → `deleteAllNotifications`
    - `deleteV1NotificationsDevices` → `removeNotificationDevice`
    - `deleteV1Notifications1` → `deleteNotification`
    - `getV1Notifications` → `listNotifications`
    - `getV1NotificationsUnreadCount` → `getUnreadNotificationCount`
    - `postV1NotificationsDevices` → `registerNotificationDevice`
    - `putV1NotificationsReadAll` → `markAllNotificationsRead`
    - `putV1NotificationsRead` → `markNotificationRead`
  - `client.projectMembers`
    - `deleteV1ProjectsMembers` → `removeProjectMember`
    - `postV1ProjectsMembers` → `addProjectMember`
    - `putV1ProjectsMembers` → `updateProjectMember`
  - `client.projectTriggers`
    - `deleteV1ProjectsTriggers` → `deleteTrigger`
    - `getV1ProjectsTriggers` → `listTriggers`
    - `postV1ProjectsTriggers` → `createTrigger`
    - `postV1ProjectsTriggersRun` → `runTrigger`
    - `putV1ProjectsTriggers` → `updateTrigger`
  - `client.projectWebhooks`
    - `deleteV1ProjectsWebhooks` → `deleteWebhook`
    - `getV1ProjectsWebhookLogs` → `listProjectWebhookLogs`
    - `getV1ProjectsWebhooks` → `listWebhooks`
    - `getV1ProjectsWebhooksLogs` → `getWebhookLogs`
    - `postV1ProjectsWebhooks` → `createWebhook`
    - `postV1ProjectsWebhooksTest` → `testWebhook`
    - `putV1ProjectsWebhooks` → `updateWebhook`
  - `client.projects`
    - `deleteV1Projects` → `deleteProject`
    - `getV1Projects` → `listProjects`
    - `getV1Projects1` → `getProject`
    - `getV1ProjectsAuditEvents` → `listProjectAuditEvents`
    - `patchV1ProjectsSettings` → `updateProjectSettings`
    - `postV1Projects` → `createProject`
    - `postV1ProjectsResolve` → `resolveProject`
    - `postV1ProjectsToggleArchived` → `toggleProjectArchived`
    - `postV1ProjectsToggleStarred` → `toggleProjectStarred`
    - `putV1Projects` → `updateProject`
  - `client.settings`
    - `getV1Settings` → `getUserSettings`
    - `putV1Settings` → `updateUserSettings`
  - `client.users`
    - `deleteV1UsersProfile` → `deleteUserAccount`
    - `getV1UsersAuditEvents` → `listUserAuditEvents`
    - `getV1UsersProfile` → `getUserProfile`
    - `getV1UsersRecentProjects` → `listRecentProjects`
    - `getV1UsersStorageUse` → `getUserStorageUse`
    - `putV1UsersProfile` → `updateUserProfile`
    - `putV1UsersProfilePicture` → `updateUserProfilePicture`

### Removed
- Private billing operations are no longer part of the public spec, so `client.billing` only has
  `getBilling` (`GET /v1/billing`) and `listBillingInvoices` (`GET /v1/billing/invoices`). Removed:
  - `getV1BillingPlans`
  - `postV1BillingAttribution`
  - `postV1BillingCheckoutSession`
  - `postV1BillingPortalSession`
  - `postV1BillingRefresh`
  - `postV1BillingResume`
  - `postV1BillingSeats`

## [0.7.0] - 2026-09-14

### Changed (breaking)
- Regenerated from the `/v1` OpenAPI spec for the R2 storage migration and media read-model
  redesign (`swipeflow/swipeflow#361`, `docs/media/DESIGN.md`). Per that document's clean-break
  policy, the first media API is replaced rather than deprecated:
  - `MediaService.postV1ProjectsMedia` → `postV1ProjectsMediaUploads`
    (`POST /v1/projects/:projectId/media-uploads`), same 3-step signed-upload shape but the
    response's `upload` object now pins `Content-Length`/`If-None-Match: *` alongside
    `Content-Type`.
  - The confirmation step is `postV1MediaUploadsConfirm`
    (`POST /v1/media-uploads/:id/confirm`) — `finalize` naming is gone.
  - `MediaDescriptor` drops the old GCS/CRC32C-era fields; it now carries `status`
    (`upload_pending | import_pending | uploaded | delete_pending | deleted`), `itemIds`,
    an opaque storage `etag`, and an optional client-supplied `md5`.

### Added
- `postV1ProjectsMediaImports` (`POST /v1/projects/:projectId/media-imports`) — start an
  asynchronous, Workflow-backed capture of an expiring source URL; returns `202` with the
  media in `import_pending`. Poll `getV1Media` for the result; the source URL itself is
  never persisted or returned.
- `getV1ProjectsMedia` / `getV1ProjectsMediaUsage` — cursor-paginated project media listing
  and project usage/limit reporting.
- `deleteV1Media` — delete unattached media (`409` while attached).
- Hand-written `mediaRef`/`mediaRefPattern`/`extractMediaRefs` helpers (`src/media.ts`,
  not generated) for the opaque `media://<id>` durable reference described in
  `docs/media/DESIGN.md` §3 — format one, get a reusable match pattern, or pull every
  distinct id referenced in a content string.

### Notes
- No production consumer of the first media API existed, so this ships as one coordinated,
  non-additive contract change rather than a compatibility window (`docs/media/DESIGN.md` §14).

## [0.6.0] - 2026-09-11

### Added
- Regenerated from the `/v1` OpenAPI spec to pick up structured media attachments
  (`swipeflow/swipeflow#352`, building on the `MediaService` from 0.5.0):
  - `AttachedMedia` model (`id`, `ref`, `fileName`, `contentType`, `size`, optional
    `url`/`urlTtl`) on `Item.media` and `ItemVersion.media`
  - `media` (string id array) on `CreateItemRequest`/`CreateItemVersionRequest` — explicit
    attachment; omitted on a version-create carries the previous version's media forward
    verbatim, `[]` detaches everything
  - `resolveMedia` boolean query parameter (default `false`) on every item/version read
    method (`ItemsService.getV1ProjectsItems*`, `ItemVersionsService.getV1ProjectsItemsVersions*`)
    — opts into `content.data` substitution and `media[].url`/`urlTtl`; the stable,
    never-expiring `ref`-only view is the default

### Notes
- No breaking changes — `media` is a new optional field on the two request types, and
  `resolveMedia` is a new optional parameter each generated method already defaults.
- Regenerated against the live `/v1/openapi.json` after `#352` merged and deployed to prod.

## [0.5.0] - 2026-09-11

### Added
- Regenerated from the live `/v1` OpenAPI spec to pick up the new media subsystem
  (`swipeflow/swipeflow#328`) as a `MediaService`:
  - `POST /v1/projects/:projectId/media` — request a direct-to-storage upload ticket
    (`MediaService.postV1ProjectsMedia`); returns a signed upload target plus the media's
    durable `ref`
  - `POST /v1/media/:id/finalize` — confirm a completed upload, correcting quota to the
    actual byte count (`MediaService.postV1MediaFinalize`)
  - `GET /v1/media/:id` — media metadata, with a signed `contentUrl` once uploaded
    (`MediaService.getV1Media`)
  - `GET /v1/media/:id/content` and `GET /media/:id` — redirect to a short-lived signed URL
    for the bytes (`MediaService.getV1MediaContent`, `MediaService.getMedia`)
  - `DELETE /v1/media/:id` — tombstone a media object (`MediaService.deleteV1Media`)
  - `GET /v1/media/usage` — the caller's current media storage usage and plan limit
    (`MediaService.getV1MediaUsage`)

### Notes
- No breaking changes — an entirely new service, nothing existing moved or changed shape.
- As with the rest of this SDK, response bodies for the new endpoints are typed `any`: the
  backend's OpenAPI spec for `Media` doesn't declare a response schema yet (prose
  descriptions only), so the generator has nothing to type them from. Callers should treat
  responses as documented in `backend/src/controllers/MediaController.ts`'s `toResponse()`
  shape until that's tightened.

## [0.4.0] - 2026-08-09

### Added
- Regenerated from the live `/v1` OpenAPI spec to pick up:
  - `notifySelfActions` field on `Settings`/`UpdateSettingsRequest` — whether a user is notified about actions they themselves performed
  - `autoGridLandscape` field on `Settings`/`UpdateSettingsRequest` — whether the item queue auto-switches to grid view in landscape orientation (mobile/tablet) or on desktop-sized screens
  - `projectId` query parameter on `GET /v1/analytics/dashboard` (`AnalyticsService.getV1AnalyticsDashboard`) — scope the returned analytics, including recent activity, to a single project

### Notes
- No breaking changes — all three additions are new optional fields/parameters. `getV1AnalyticsDashboard`'s `projectId` is the method's only parameter, so there's no existing positional-argument call site to shift.

## [0.3.1] - 2026-08-06

### Fixed
- `build`/`generate-api` never cleaned their output directories first, so files from a prior generator layout (predating the current `src/generated/` structure — plain `models/`, `services/`, `core/`, `SwipeFlowClient.*` sitting at the top level of `dist/`, dated from before this package's early releases) kept getting bundled into every published tarball on top of the fresh output, undetected because `dist/index.d.ts` only re-exports `./generated` — the stale files were dead weight, never actually reachable through the package's public entry point, not a functional break. `build` now runs `rm -rf dist` first and `generate-api` now runs `rm -rf src/generated` first. Package size for 0.3.0 was 41.6 kB / 398 files; the same content republishes at 31.8 kB / 190 files with this fix.

## [0.3.0] - 2026-08-06

### Added
- Regenerated from the live `/v1` OpenAPI spec to pick up:
  - `PUT /v1/projects/:id/items/:itemId/processed` — mark an item's decision as processed, the requester-side reconciliation counterpart to (best-effort) webhook delivery (`ItemsService.putV1ProjectsItemsProcessed`)
  - `processed` field on `Item` (new `ItemProcessed` model: `processedAt`/`processedBy`/`action`), settable once and only from `approved`/`rejected`
  - `processed` query filter on `GET /v1/projects/:id/items` (`ItemsService.getV1ProjectsItems`), for sweeping everything still outstanding in one call
  - `item.processed` added to `WebhookEvent`
  - `ITEM_PROCESSED` added to `NotificationType`

### Notes
- No breaking changes — `ItemsService.getV1ProjectsItems`'s new `processed` parameter is inserted before the existing `search`/`sortBy`/etc. parameters in the generated method signature; callers using named/positional args in the same order as before will need to pass `undefined` for it, same as any other newly-inserted optional parameter from this generator.

## [0.2.0] - 2026-08-04

### Added
- Regenerated from the live `/v1` OpenAPI spec to pick up:
  - `POST /v1/projects/resolve` — resolve a project by name among the caller's own, or create it (`ProjectsService.postV1ProjectsResolve`)
  - `GET /v1/projects/:id/items/status` — batch slim status projection for multiple items (`ItemsService.getV1ProjectsItemsStatus`)
  - `GET /v1/projects/:id/items/:itemId/status` — slim status projection for a single item (`ItemsService.getV1ProjectsItemsStatus1`)
  - `idempotencyKey` on `CreateItemRequest`/`Item`

## [0.1.0] - 2025-11-17

### Added
- Initial release of `@swipeflow/api-client` SDK package
- Automatic OpenAPI spec fetching from `https://api.swipeflow.io/v1/openapi.json`
- TypeScript client generation using `openapi-typescript-codegen`
- Full type safety for all SwipeFlow API endpoints
- Support for all API services:
  - Projects
  - Items
  - Users
  - API Keys
  - Analytics
- Exported core types and utilities:
  - `SwipeFlowClient` - Main API client class
  - `BaseHttpRequest` - Base class for custom HTTP adapters
  - `CancelablePromise` - Promise type for requests
  - `ApiError` - Error handling
  - `OpenAPIConfig` - Configuration interface
  - `ApiRequestOptions` - Request options interface
- Comprehensive README with usage examples
- CommonJS build output for Node.js compatibility

### Notes
- This package is currently used internally by SwipeFlow integrations (Zapier, n8n, Make)
- Future releases will be published to npm for public use
