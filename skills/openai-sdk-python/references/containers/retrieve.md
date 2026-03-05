## Retrieve

`containers.retrieve(strcontainer_id)  -> ContainerRetrieveResponse`

**get** `/containers/{container_id}`

Retrieve Container

### Parameters

- `container_id: str`

### Returns

- `class ContainerRetrieveResponse: …`

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
container = client.containers.retrieve(
    "container_id",
)
print(container.id)
```
