## Update project service tier settings

**post** `/organization/projects/{project_id}/service_tier_settings`

Update the default or enabled service tiers atomically. Supply at least one field. Omitted fields keep their current values.

### Path Parameters

- `project_id: string`

  The ID of the project

### Body Parameters

Content type: `application/json`

- `default: optional "standard" or "fast" or "scale"`

  Default tier for requests that omit service_tier or use auto.

  - `"standard"`

  - `"fast"`

  - `"scale"`

- `enabled_tiers: optional "all" or array of ProjectOptionalServiceTier`

  Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.

  - `"all"`

    - `"all"`

  - `array of ProjectOptionalServiceTier`

    - `"flex"`

    - `"fast"`

    - `"ultrafast"`

### Returns

- `ProjectServiceTierSettings object { default, enabled_tiers, object }`

  - `default: "standard" or "fast" or "scale"`

    Default tier for requests that omit service_tier or use auto.

    - `"standard"`

    - `"fast"`

    - `"scale"`

  - `enabled_tiers: "all" or array of ProjectOptionalServiceTier`

    Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.

    - `"all"`

      - `"all"`

    - `array of ProjectOptionalServiceTier`

      - `"flex"`

      - `"fast"`

      - `"ultrafast"`

  - `object: "project.service_tier_settings" (default: "project.service_tier_settings")`

    - `"project.service_tier_settings"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_tier_settings \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "default": "standard"
        }'
```

#### 200 — Example

```json
{
  "default": "standard",
  "enabled_tiers": "all",
  "object": "project.service_tier_settings"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/service_tier_settings \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"default":"standard","enabled_tiers":[]}'
```

#### Response example

```json
{
  "object": "project.service_tier_settings",
  "default": "standard",
  "enabled_tiers": []
}
```
