# @swipeflow/sdk

TypeScript SDK for [SwipeFlow](https://swipeflow.io) - the human-in-the-loop approval platform.

## Installation

```bash
npm install @swipeflow/sdk
```

## Usage

```typescript
import { SwipeFlowClient } from '@swipeflow/sdk';

// Initialize the client
const client = new SwipeFlowClient({
  BASE: 'https://api.swipeflow.io',
  HEADERS: {
    'X-API-Key': 'your-api-key-here'
  }
});

// List all projects
const projects = await client.projects.listProjects();

// Create an item for review
const item = await client.items.createItem('project-id', {
  title: 'Review this document',
  description: 'Please review and approve',
  content: {
    type: 'text',
    data: 'Content that needs approval'
  }
});

// Make a decision on an item
await client.items.updateItemDecision('project-id', 'item-id', {
  decision: 'approved',
  comment: 'Looks good!'
});
```

## API Reference

This client is automatically generated from the SwipeFlow OpenAPI specification and provides full TypeScript type safety for all API endpoints.

### Available Services

- **projects** - Project management
- **items** - Item creation and retrieval
- **media** - Direct-to-storage uploads, URL imports, and media metadata/listing
- **users** - User profile management
- **apiKeys** - API key management
- **analytics** - Usage analytics

## Authentication

Get your API key from the [SwipeFlow Dashboard](https://app.swipeflow.io/settings/api-keys).

## Documentation

- [API Documentation](https://swipeflow.io/docs/api)
- [SwipeFlow Documentation](https://swipeflow.io/docs)

## Development

Everything under `src/generated` is generated from the public OpenAPI spec and committed; never edit it by hand.

```bash
npm ci
npm run generate   # download https://api.swipeflow.io/v1/openapi.json and regenerate src/generated
npm run build      # compile to dist/
```

Commit the resulting changes to `src/generated`. Publishing runs `npm run generate` first and refuses to publish if the committed sources are out of date.

## License

MIT
