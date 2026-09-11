# Changelog

All notable changes to the SwipeFlow TypeScript API Client will be documented in this file.

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
