## Delete Skill

**delete** `/skills/{skill_id}`

Delete a skill by its ID.

### Path Parameters

- `skill_id: string`

  The identifier of the skill to delete.

### Returns

- `DeletedSkill object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.deleted" (default: "skill.deleted")`

    - `"skill.deleted"`

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "skill.deleted"
}
```
