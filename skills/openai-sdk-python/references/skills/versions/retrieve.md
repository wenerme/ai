## Retrieve

`skills.versions.retrieve(strversion, VersionRetrieveParams**kwargs)  -> SkillVersion`

**get** `/skills/{skill_id}/versions/{version}`

Get a specific skill version.

### Parameters

- `skill_id: str`

- `version: str`

  The version number to retrieve.

### Returns

- `class SkillVersion: …`

  - `id: str`

    Unique identifier for the skill version.

  - `created_at: int`

    Unix timestamp (seconds) for when the version was created.

  - `description: str`

    Description of the skill version.

  - `name: str`

    Name of the skill version.

  - `object: Literal["skill.version"]`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: str`

    Identifier of the skill for this version.

  - `version: str`

    Version number for this skill.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
skill_version = client.skills.versions.retrieve(
    version="version",
    skill_id="skill_123",
)
print(skill_version.id)
```
