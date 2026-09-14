/**
 * SwipeFlow TypeScript API Client
 * 
 * This package provides a type-safe client for the SwipeFlow API.
 * 
 * @example
 * ```typescript
 * import { SwipeFlowClient } from '@swipeflow/api';
 * 
 * const client = new SwipeFlowClient({
 *   BASE: 'https://api.swipeflow.io',
 *   HEADERS: {
 *     'X-API-Key': 'your-api-key'
 *   }
 * });
 * 
 * // List projects
 * const projects = await client.projects.getV1Projects();
 * 
 * // Create an item
 * const item = await client.items.postV1ProjectsItems('project-id', {
 *   title: 'Review this',
 *   content: { type: 'text', data: 'Content to review' }
 * });
 * ```
 */

// Re-export everything from the generated client
export * from './generated';

// Hand-written helpers (not part of the generated client)
export * from './media';
