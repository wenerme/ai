# Content

## Get Skill Content

**get** `/skills/{skill_id}/content`

Download a skill zip bundle by its ID.

### Path Parameters

- `skill_id: string`

  The identifier of the skill to download.

### Returns

`file`

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID/content \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
