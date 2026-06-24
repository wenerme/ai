# Versions

## Create a new immutable skill version.

`skills.versions.create(strskill_id, VersionCreateParams**kwargs)  -> SkillVersion`

**post** `/skills/{skill_id}/versions`

Create a new immutable skill version.

### Parameters

- `skill_id: str`

- `default: Optional[bool]`

  Whether to set this version as the default.

- `files: Optional[Union[Sequence[FileTypes], FileTypes]]`

  Skill files to upload (directory upload) or a single zip file.

  - `Sequence[FileTypes]`

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

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "description": "description",
  "name": "name",
  "object": "skill.version",
  "skill_id": "skill_id",
  "version": "version"
}
```

## List skill versions for a skill.

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

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "description": "description",
      "name": "name",
      "object": "skill.version",
      "skill_id": "skill_id",
      "version": "version"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Get a specific skill version.

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

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "description": "description",
  "name": "name",
  "object": "skill.version",
  "skill_id": "skill_id",
  "version": "version"
}
```

## Delete a skill version.

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

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "skill.version.deleted",
  "version": "version"
}
```

## Domain Types

### Deleted Skill Version

- `class DeletedSkillVersion: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["skill.version.deleted"]`

    - `"skill.version.deleted"`

  - `version: str`

    The deleted skill version.

### Skill Version

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

### Skill Version List

- `class SkillVersionList: …`

  - `data: List[SkillVersion]`

    A list of items

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

  - `first_id: Optional[str]`

    The ID of the first item in the list.

  - `has_more: bool`

    Whether there are more items available.

  - `last_id: Optional[str]`

    The ID of the last item in the list.

  - `object: Literal["list"]`

    The type of object returned, must be `list`.

    - `"list"`

# Content

## Download a skill version zip bundle.

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
