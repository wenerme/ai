## Update

`skills.update(strskill_id, SkillUpdateParams**kwargs)  -> Skill`

**post** `/skills/{skill_id}`

Update the default version pointer for a skill.

### Parameters

- `skill_id: str`

- `default_version: str`

  The skill version number to set as default.

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
skill = client.skills.update(
    skill_id="skill_123",
    default_version="default_version",
)
print(skill.id)
```
