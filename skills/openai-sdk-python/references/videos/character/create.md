## Create

`videos.character.create(CharacterCreateParams**kwargs)  -> CharacterCreateResponse`

**post** `/videos/characters`

Create a character from an uploaded video.

### Parameters

- `name: str`

  Display name for this API character.

- `video: FileTypes`

  Video file used to create a character.

### Returns

- `class CharacterCreateResponse: …`

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
character = client.videos.character.create(
    name="x",
    video=b"raw file contents",
)
print(character.id)
```
