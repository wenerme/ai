## Delete

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/groups/$GROUP_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
