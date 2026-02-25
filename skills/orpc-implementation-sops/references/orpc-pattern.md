# oRPC Advanced Patterns

## Project Modules

- `common/contract` - Base Schema definitions (ResourceSchema, ListQueryInputSchema, etc.)
- `common/orpc` - Client utilities (createRpcContractClient, createOpenApiContractClient)
- `common/orpc/server` - Server utilities (handleRPCContract)

## Hono Integration

```typescript
import { implement, ORPCError } from '@orpc/server';

export function handleContract(app: AnyHono) {
  const os = implement(AppContract);
  const router = os
    .use(os.middleware(async ({ next }) => {
      try { return await next(); }
      catch (e) { throw new ORPCError('INTERNAL_SERVER_ERROR', { message: String(e) }); }
    }))
    .router(createAppContractImpl());

  handleRPCContract(app, router); // Registers /api/rpc/* and /api/*
}

// Composing implementations
export function createAppContractImpl() {
  const os = implement(AppContract);
  return {
    user: createUserContractImpl(),
    health: os.health.handler(async () => ({ ok: true })),
  };
}
```

## External REST API Modeling

oRPC can model external REST APIs with type safety using `OpenAPILink`:

```typescript
import { oc } from '@orpc/contract';
import { createOpenApiContractClient } from 'common/orpc';

// Define Contract for external API
export const ExternalApiContract = {
  users: {
    list: oc
      .input(z.object({ page: z.number().optional() }))
      .output(z.array(z.object({ id: z.string(), name: z.string() })))
      .route({ method: 'GET', path: '/users' }),
  },
};

// Create client for external API
const client = createOpenApiContractClient(ExternalApiContract, {
  url: 'https://api.example.com',
  apiKey: 'xxx',
});

const users = await client.users.list({ page: 1 });
```

## File/Blob Support

oRPC natively supports `File` and `Blob`, composable with complex data structures:

```typescript
// File upload
const upload = oc
  .input(z.object({ file: z.instanceof(File), metadata: z.object({ name: z.string() }) }))
  .output(z.object({ url: z.string() }));

// File download
const download = oc
  .input(z.object({ id: z.string() }))
  .output(z.instanceof(File));
```

## Event Iterator (SSE/Streaming)

Supports streaming responses, real-time updates, and SSE for AI chat, live data, etc.:

```typescript
import { eventIterator, withEventMeta } from '@orpc/server';

// Define streaming output
const stream = os
  .output(eventIterator(z.object({ message: z.string() })))
  .handler(async function* ({ input, lastEventId }) {
    // lastEventId supports resume from disconnect
    while (true) {
      yield withEventMeta({ message: 'Hello' }, { id: 'event-1', retry: 10000 });
      await sleep(1000);
    }
  });

// Client consumption
for await (const event of client.stream({})) {
  console.log(event.message);
}
```

## AsyncIterator / ReadableStream Conversion

```typescript
import { streamToAsyncIteratorClass, asyncIteratorToStream } from '@orpc/shared';

// ReadableStream → AsyncIterator
const iterator = streamToAsyncIteratorClass(readableStream);

// AsyncIterator → ReadableStream
const stream = asyncIteratorToStream(asyncIterator);
```
