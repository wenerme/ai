## Delete a vault credential

**delete** `/vaults/{vault_id}/credentials/{credential_id}`

Deletes a vault credential. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

- `credential_id: string`

### Returns

- `CredentialDeleted object { id, deleted, object }`

  Confirmation that a vault credential was deleted.

  - `id: string`

    The ID of the deleted credential.

  - `deleted: boolean`

    Whether the resource was deleted. Always `true`.

  - `object: "vault.credential.deleted"`

    The object type. Always `vault.credential.deleted`.

    - `"vault.credential.deleted"`

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID/credentials/$CREDENTIAL_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vault.credential.deleted"
}
```
