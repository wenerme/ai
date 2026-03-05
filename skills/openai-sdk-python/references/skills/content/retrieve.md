## Retrieve

`skills.content.retrieve(strskill_id)  -> BinaryResponseContent`

**get** `/skills/{skill_id}/content`

Download a skill zip bundle by its ID.

### Parameters

- `skill_id: str`

### Returns

- `BinaryResponseContent`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
content = client.skills.content.retrieve(
    "skill_123",
)
print(content)
data = content.read()
print(data)
```
