## Retrieve

`skills.retrieve(strskill_id)  -> Skill`

**get** `/skills/{skill_id}`

Get a skill by its ID.

### Parameters

- `skill_id: str`

### Returns

- `class Skill: …`

  - `id: str`

    Unique identifier for the skill.

  - `created_at: int`

    Unix timestamp (seconds) for when the skill was created.

  - `default_version: str`

    Default version for the skill.

  - `description: str`

    Description of the skill.

  - `latest_version: str`

    Latest version for the skill.

  - `name: str`

    Name of the skill.

  - `object: Literal["skill"]`

    The object type, which is `skill`.

    - `"skill"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
skill = client.skills.retrieve(
    "skill_123",
)
print(skill.id)
```
