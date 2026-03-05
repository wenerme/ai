## Delete

`skills.versions.delete(strversion, VersionDeleteParams**kwargs)  -> DeletedSkillVersion`

**delete** `/skills/{skill_id}/versions/{version}`

Delete a skill version.

### Parameters

- `skill_id: str`

- `version: str`

  The skill version number.

### Returns

- `class DeletedSkillVersion: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["skill.version.deleted"]`

    - `"skill.version.deleted"`

  - `version: str`

    The deleted skill version.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
deleted_skill_version = client.skills.versions.delete(
    version="version",
    skill_id="skill_123",
)
print(deleted_skill_version.id)
```
