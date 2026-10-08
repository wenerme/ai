## Update a vault

**post** `/vaults/{vault_id}`

Updates the name or metadata of an active vault. Omitted fields remain unchanged. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

### Body Parameters

- `metadata: optional map[string]`

  Replaces all metadata. Omit to leave unchanged, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.

- `name: optional string or null`

  A replacement name. Omit to leave unchanged, or pass null to clear it. The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.

### Returns

- `Vault object { id, created_at, metadata, 2 more }`

  A collection of credentials for MCP servers and OpenAI-hosted environments.

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
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
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
