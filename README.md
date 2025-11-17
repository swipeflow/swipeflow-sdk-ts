# @swipeflow/api-client

TypeScript API client for [SwipeFlow](https://swipeflow.io) - the human-in-the-loop approval platform.

## Installation

```bash
npm install @swipeflow/api-client
```

## Usage

```typescript
import { SwipeFlowClient } from '@swipeflow/api-client';

// Initialize the client
const client = new SwipeFlowClient({
  BASE: 'https://api.swipeflow.io/v1',
  HEADERS: {
    'X-API-Key': 'your-api-key-here'
  }
});

// List all projects
const projects = await client.projects.getV1Projects();

// Create an item for review
const item = await client.items.postV1ProjectsItems('project-id', {
  title: 'Review this document',
  description: 'Please review and approve',
  content: {
    type: 'text',
    data: 'Content that needs approval'
  }
});

// Make a decision on an item
await client.items.putV1ProjectsItemsDecision('project-id', 'item-id', {
  decision: 'approved',
  comment: 'Looks good!'
});
```

## API Reference

This client is automatically generated from the SwipeFlow OpenAPI specification and provides full TypeScript type safety for all API endpoints.

### Available Services

- **projects** - Project management
- **items** - Item creation and retrieval
- **users** - User profile management
- **apiKeys** - API key management
- **analytics** - Usage analytics

## Authentication

Get your API key from the [SwipeFlow Dashboard](https://app.swipeflow.io/settings/api-keys).

## Documentation

- [API Documentation](https://swipeflow.io/docs/api)
- [SwipeFlow Documentation](https://swipeflow.io/docs)

## License

MIT
