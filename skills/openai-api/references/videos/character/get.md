## Get

**get** `/videos/characters/{character_id}`

Fetch a character.

### Path Parameters

- `character_id: string`

### Returns

- `id: string`

  Identifier for the character creation cameo.

- `created_at: number`

  Unix timestamp (in seconds) when the character was created.

- `name: string`

  Display name for the character.

### Example

```http
curl https://api.openai.com/v1/videos/characters/$CHARACTER_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
