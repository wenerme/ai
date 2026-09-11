## Delete a vault

**delete** `/vaults/{vault_id}`

Deletes a vault and all its credentials. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

### Returns

- `VaultDeleted object { id, deleted, object }`

  Confirmation that a vault was deleted.

  - `id: string`

    The ID of the deleted vault.

  - `deleted: boolean`

    Whether the resource was deleted. Always `true`.

  - `object: "vault.deleted"`

    The object type. Always `vault.deleted`.

    - `"vault.deleted"`

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vault.deleted"
}
```
