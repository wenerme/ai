# Content

## Retrieve

`skills.versions.content.retrieve(strversion, ContentRetrieveParams**kwargs)  -> BinaryResponseContent`

**get** `/skills/{skill_id}/versions/{version}/content`

Download a skill version zip bundle.

### Parameters

- `skill_id: str`

- `version: str`

  The skill version number.

### Returns

- `BinaryResponseContent`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
content = client.skills.versions.content.retrieve(
    version="version",
    skill_id="skill_123",
)
print(content)
data = content.read()
print(data)
```
