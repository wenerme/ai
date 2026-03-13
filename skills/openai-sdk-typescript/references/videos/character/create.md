## Create

`client.videos.character.create(CharacterCreateParamsbody, RequestOptionsoptions?): CharacterCreateResponse`

**post** `/videos/characters`

Create a character from an uploaded video.

### Parameters

- `body: CharacterCreateParams`

  - `name: string`

    Display name for this API character.

  - `video: Uploadable`

    Video file used to create a character.

### Returns

- `CharacterCreateResponse`

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

const character = await client.videos.character.create({
  name: 'x',
  video: fs.createReadStream('path/to/file'),
});

console.log(character.id);
```
