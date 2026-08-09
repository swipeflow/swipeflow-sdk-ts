# Changelog

All notable changes to the SwipeFlow TypeScript API Client will be documented in this file.

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
