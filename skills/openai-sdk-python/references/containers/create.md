## Create

`containers.create(ContainerCreateParams**kwargs)  -> ContainerCreateResponse`

**post** `/containers`

Create Container

### Parameters

- `name: str`

  Name of the container to create.

- `expires_after: Optional[ExpiresAfter]`

  Container expiration time in seconds relative to the 'anchor' time.

  - `anchor: Literal["last_active_at"]`

    Time anchor for the expiration time. Currently only 'last_active_at' is supported.

    - `"last_active_at"`

  - `minutes: int`

- `file_ids: Optional[SequenceNotStr[str]]`

  IDs of files to copy to the container.

- `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

  Optional memory limit for the container. Defaults to "1g".

  - `"1g"`

  - `"4g"`

  - `"16g"`

  - `"64g"`

- `network_policy: Optional[NetworkPolicy]`

  Network access policy for the container.

  - `class ContainerNetworkPolicyDisabled: …`

    - `type: Literal["disabled"]`

      Disable outbound network access. Always `disabled`.

      - `"disabled"`

  - `class ContainerNetworkPolicyAllowlist: …`

    - `allowed_domains: List[str]`

      A list of allowed domains when type is `allowlist`.

    - `type: Literal["allowlist"]`

      Allow outbound network access only to specified domains. Always `allowlist`.

      - `"allowlist"`

    - `domain_secrets: Optional[List[ContainerNetworkPolicyDomainSecret]]`

      Optional domain-scoped secrets for allowlisted domains.

      - `domain: str`

        The domain associated with the secret.

      - `name: str`

        The name of the secret to inject for the domain.

      - `value: str`

        The secret value to inject for the domain.

- `skills: Optional[Iterable[Skill]]`

  An optional list of skills referenced by id or inline data.

  - `class SkillReference: …`

    - `skill_id: str`

      The ID of the referenced skill.

    - `type: Literal["skill_reference"]`

      References a skill created with the /v1/skills endpoint.

      - `"skill_reference"`

    - `version: Optional[str]`

      Optional skill version. Use a positive integer or 'latest'. Omit for default.

  - `class InlineSkill: …`

    - `description: str`

      The description of the skill.

    - `name: str`

      The name of the skill.

    - `source: InlineSkillSource`

      Inline skill payload

      - `data: str`

        Base64-encoded skill zip bundle.

      - `media_type: Literal["application/zip"]`

        The media type of the inline skill payload. Must be `application/zip`.

        - `"application/zip"`

      - `type: Literal["base64"]`

        The type of the inline skill source. Must be `base64`.

        - `"base64"`

    - `type: Literal["inline"]`

      Defines an inline skill for this request.

      - `"inline"`

### Returns

- `class ContainerCreateResponse: …`

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
container = client.containers.create(
    name="name",
)
print(container.id)
```
