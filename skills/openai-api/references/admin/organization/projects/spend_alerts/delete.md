## Delete project spend alert

**delete** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Deletes a project spend alert.

### Path Parameters

- `project_id: string`

  The ID of the project to update.

- `alert_id: string`

  The ID of the spend alert to delete.

### Returns

- `ProjectSpendAlertDeleted object { id, deleted, object }`

  Confirmation payload returned after deleting a project spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "project.spend_alert.deleted"`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/spend_alerts/$ALERT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "project.spend_alert.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/spend_alerts/alert_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "id": "alert_abc123",
    "object": "project.spend_alert.deleted",
    "deleted": true
}
```
