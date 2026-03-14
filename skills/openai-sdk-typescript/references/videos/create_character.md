## Create Character

`client.videos.createCharacter(VideoCreateCharacterParamsbody, RequestOptionsoptions?): VideoCreateCharacterResponse`

**post** `/videos/characters`

Create a character from an uploaded video.

### Parameters

- `body: VideoCreateCharacterParams`

  - `name: string`

    Display name for this API character.

  - `video: Uploadable`

    Video file used to create a character.

### Returns

- `VideoCreateCharacterResponse`

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

const response = await client.videos.createCharacter({
  name: 'x',
  video: fs.createReadStream('path/to/file'),
});

console.log(response.id);
```
