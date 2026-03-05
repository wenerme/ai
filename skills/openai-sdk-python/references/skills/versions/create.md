## Create

`skills.versions.create(strskill_id, VersionCreateParams**kwargs)  -> SkillVersion`

**post** `/skills/{skill_id}/versions`

Create a new immutable skill version.

### Parameters

- `skill_id: str`

- `default: Optional[bool]`

  Whether to set this version as the default.

- `files: Optional[Union[SequenceNotStr[FileTypes], FileTypes]]`

  Skill files to upload (directory upload) or a single zip file.

  - `SequenceNotStr[FileTypes]`

    Skill files to upload (directory upload) or a single zip file.

  - `FileTypes`

    Skill zip file to upload.

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
skill_version = client.skills.versions.create(
    skill_id="skill_123",
)
print(skill_version.id)
```
