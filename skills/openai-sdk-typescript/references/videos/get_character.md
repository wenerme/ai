## Get Character

`client.videos.getCharacter(stringcharacterID, RequestOptionsoptions?): VideoGetCharacterResponse`

**get** `/videos/characters/{character_id}`

Fetch a character.

### Parameters

- `characterID: string`

### Returns

- `VideoGetCharacterResponse`

  - `id: string | null`

    Identifier for the character creation cameo.

  - `created_at: number`

    Unix timestamp (in seconds) when the character was created.

  - `name: string | null`

    Display name for the character.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.videos.getCharacter('char_123');

console.log(response.id);
```
