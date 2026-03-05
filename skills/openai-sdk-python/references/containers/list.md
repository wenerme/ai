## List

`containers.list(ContainerListParams**kwargs)  -> SyncCursorPage[ContainerListResponse]`

**get** `/containers`

List Containers

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `name: Optional[str]`

  Filter results by container name.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class ContainerListResponse: …`

  - `id: str`

    Unique identifier for the container.

  - `created_at: int`

    Unix timestamp (in seconds) when the container was created.

  - `name: str`

    Name of the container.

  - `object: str`

    The type of this object.

  - `status: str`

    Status of the container (e.g., active, deleted).

  - `expires_after: Optional[ExpiresAfter]`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor: Optional[Literal["last_active_at"]]`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes: Optional[int]`

      The number of minutes after the anchor before the container expires.

  - `last_active_at: Optional[int]`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy: Optional[NetworkPolicy]`

    Network access policy for the container.

    - `type: Literal["allowlist", "disabled"]`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains: Optional[List[str]]`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.containers.list()
page = page.data[0]
print(page.id)
```
