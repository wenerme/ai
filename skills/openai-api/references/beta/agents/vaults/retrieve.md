## Retrieve a vault

**get** `/vaults/{vault_id}`

Retrieves a vault by its ID. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

### Returns

- `Vault object { id, created_at, metadata, 2 more }`

  A collection of credentials that agent tools can use to authenticate to MCP servers.

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

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "metadata": {
    "foo": "string"
  },
  "name": "name",
  "object": "vault"
}
```
