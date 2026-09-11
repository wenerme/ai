## Create a vault

**post** `/vaults`

Creates a vault for the current project. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Body Parameters

- `metadata: optional map[string] or null`

  Key-value pairs to associate with the vault, such as an application or team identifier.

- `name: optional string`

  The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.

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
curl https://api.openai.com/v1/vaults \
    -X POST \
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
