## Delete organization spend alert

**delete** `/organization/spend_alerts/{alert_id}`

Deletes an organization spend alert.

### Path Parameters

- `alert_id: string`

### Returns

- `OrganizationSpendAlertDeleted object { id, deleted, object }`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "organization.spend_alert.deleted"`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/spend_alerts/$ALERT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.spend_alert.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/spend_alerts/alert_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "alert_abc123",
    "object": "organization.spend_alert.deleted",
    "deleted": true
}
```
