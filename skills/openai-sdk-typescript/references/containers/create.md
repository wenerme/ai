## Create

`client.containers.create(ContainerCreateParamsbody, RequestOptionsoptions?): ContainerCreateResponse`

**post** `/containers`

Create Container

### Parameters

- `body: ContainerCreateParams`

  - `name: string`

    Name of the container to create.

  - `expires_after?: ExpiresAfter`

    Container expiration time in seconds relative to the 'anchor' time.

    - `anchor: "last_active_at"`

      Time anchor for the expiration time. Currently only 'last_active_at' is supported.

      - `"last_active_at"`

    - `minutes: number`

  - `file_ids?: Array<string>`

    IDs of files to copy to the container.

  - `memory_limit?: "1g" | "4g" | "16g" | "64g"`

    Optional memory limit for the container. Defaults to "1g".

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

    Network access policy for the container.

    - `ContainerNetworkPolicyDisabled`

      - `type: "disabled"`

        Disable outbound network access. Always `disabled`.

        - `"disabled"`

    - `ContainerNetworkPolicyAllowlist`

      - `allowed_domains: Array<string>`

        A list of allowed domains when type is `allowlist`.

      - `type: "allowlist"`

        Allow outbound network access only to specified domains. Always `allowlist`.

        - `"allowlist"`

      - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

        Optional domain-scoped secrets for allowlisted domains.

        - `domain: string`

          The domain associated with the secret.

        - `name: string`

          The name of the secret to inject for the domain.

        - `value: string`

          The secret value to inject for the domain.

  - `skills?: Array<SkillReference | InlineSkill>`

    An optional list of skills referenced by id or inline data.

    - `SkillReference`

      - `skill_id: string`

        The ID of the referenced skill.

      - `type: "skill_reference"`

        References a skill created with the /v1/skills endpoint.

        - `"skill_reference"`

      - `version?: string`

        Optional skill version. Use a positive integer or 'latest'. Omit for default.

    - `InlineSkill`

      - `description: string`

        The description of the skill.

      - `name: string`

        The name of the skill.

      - `source: InlineSkillSource`

        Inline skill payload

        - `data: string`

          Base64-encoded skill zip bundle.

        - `media_type: "application/zip"`

          The media type of the inline skill payload. Must be `application/zip`.

          - `"application/zip"`

        - `type: "base64"`

          The type of the inline skill source. Must be `base64`.

          - `"base64"`

      - `type: "inline"`

        Defines an inline skill for this request.

        - `"inline"`

### Returns

- `ContainerCreateResponse`

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

const container = await client.containers.create({ name: 'name' });

console.log(container.id);
```
