## Delete

`skills.delete(strskill_id)  -> DeletedSkill`

**delete** `/skills/{skill_id}`

Delete a skill by its ID.

### Parameters

- `skill_id: str`

### Returns

- `class DeletedSkill: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["skill.deleted"]`

    - `"skill.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
deleted_skill = client.skills.delete(
    "skill_123",
)
print(deleted_skill.id)
```
