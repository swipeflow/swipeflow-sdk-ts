# Changelog

All notable changes to the SwipeFlow TypeScript API Client will be documented in this file.

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
