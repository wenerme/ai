## Get Character

`videos.get_character(strcharacter_id)  -> VideoGetCharacterResponse`

**get** `/videos/characters/{character_id}`

Fetch a character.

### Parameters

- `character_id: str`

### Returns

- `class VideoGetCharacterResponse: …`

  - `id: Optional[str]`

    Identifier for the character creation cameo.

  - `created_at: int`

    Unix timestamp (in seconds) when the character was created.

  - `name: Optional[str]`

    Display name for the character.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
response = client.videos.get_character(
    "char_123",
)
print(response.id)
```
