## List

`skills.versions.list(strskill_id, VersionListParams**kwargs)  -> SyncCursorPage[SkillVersion]`

**get** `/skills/{skill_id}/versions`

List skill versions for a skill.

### Parameters

- `skill_id: str`

- `after: Optional[str]`

  The skill version ID to start after.

- `limit: Optional[int]`

  Number of versions to retrieve.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order of results by version number.

  - `"asc"`

  - `"desc"`

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
page = client.skills.versions.list(
    skill_id="skill_123",
)
page = page.data[0]
print(page.id)
```
