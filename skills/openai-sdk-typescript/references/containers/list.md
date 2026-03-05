## List

`client.containers.list(ContainerListParamsquery?, RequestOptionsoptions?): CursorPage<ContainerListResponse>`

**get** `/containers`

List Containers

### Parameters

- `query: ContainerListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `name?: string`

    Filter results by container name.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `ContainerListResponse`

  - `id: string`

    Unique identifier for the container.

  - `created_at: number`

    Unix timestamp (in seconds) when the container was created.

  - `name: string`

    Name of the container.

  - `object: string`

    The type of this object.

  - `status: string`

    Status of the container (e.g., active, deleted).

  - `expires_after?: ExpiresAfter`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor?: "last_active_at"`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes?: number`

      The number of minutes after the anchor before the container expires.

  - `last_active_at?: number`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit?: "1g" | "4g" | "16g" | "64g"`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy?: NetworkPolicy`

    Network access policy for the container.

    - `type: "allowlist" | "disabled"`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains?: Array<string>`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const containerListResponse of client.containers.list()) {
  console.log(containerListResponse.id);
}
```
