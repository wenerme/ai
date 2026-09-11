## List vaults

**get** `/vaults`

Lists vaults using ID-based pagination. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

- `limit: optional number or null`

  The maximum number of resources to return. Defaults to 20. Values are clamped between 1 and 100.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

- `status: optional VaultStatusFilter`

  Filter by one status or a list, such as `status=active` or `status[]=active&status[]=archived`. Both statuses are included by default.

  - `VaultStatus = "active" or "archived"`

    Whether a vault or credential is active or archived.

    - `"active"`

    - `"archived"`

  - `array of VaultStatus`

    - `"active"`

    - `"archived"`

### Returns

- `data: array of Vault`

  The resources returned in this page, in the requested sort order.

  - `id: string`

    The ID of the vault.

  - `created_at: number`

    The Unix timestamp, in seconds, when the vault was created.

  - `metadata: map[string]`

    Key-value pairs associated with the vault, such as an application or team identifier.

  - `name: string or null`

    The human-readable name of the vault, if set.

  - `object: "vault"`

    The object type. Always `vault`.

    - `"vault"`

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

- `object: "list"`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/vaults \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "metadata": {
        "foo": "string"
      },
      "name": "name",
      "object": "vault"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
