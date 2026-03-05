## List

`skills.list(SkillListParams**kwargs)  -> SyncCursorPage[Skill]`

**get** `/skills`

List all skills for the current project.

### Parameters

- `after: Optional[str]`

  Identifier for the last item from the previous pagination request

- `limit: Optional[int]`

  Number of items to retrieve

- `order: Optional[Literal["asc", "desc"]]`

  Sort order of results by timestamp. Use `asc` for ascending order or `desc` for descending order.

  - `"asc"`

  - `"desc"`

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
page = client.skills.list()
page = page.data[0]
print(page.id)
```
