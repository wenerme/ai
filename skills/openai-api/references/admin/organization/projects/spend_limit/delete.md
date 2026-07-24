## Delete project spend limit

**delete** `/organization/projects/{project_id}/spend_limit`

Delete a project's hard spend limit.

### Path Parameters

- `project_id: string`

### Returns

- `ProjectSpendLimitDeleted object { deleted, object }`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "project.spend_limit.deleted"`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/spend_limit \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "project.spend_limit.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "project.spend_limit.deleted",
    "deleted": true
}
```
