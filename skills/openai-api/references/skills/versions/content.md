# Content

## Get Skill Version Content

**get** `/skills/{skill_id}/versions/{version}/content`

Download a skill version zip bundle.

### Path Parameters

- `skill_id: string`

  The identifier of the skill.

- `version: string`

  The skill version number.

### Returns

`file`

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID/versions/$VERSION/content \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
