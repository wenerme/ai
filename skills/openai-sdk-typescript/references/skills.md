# Skills

## Create

`client.skills.create(SkillCreateParamsbody?, RequestOptionsoptions?): Skill`

**post** `/skills`

Create a new skill.

### Parameters

- `body: SkillCreateParams`

  - `files?: Array<Uploadable> | Uploadable`

    Skill files to upload (directory upload) or a single zip file.

    - `Array<Uploadable>`

    - `Uploadable`

### Returns

- `Skill`

  - `id: string`

    Unique identifier for the skill.

  - `created_at: number`

    Unix timestamp (seconds) for when the skill was created.

  - `default_version: string`

    Default version for the skill.

  - `description: string`

    Description of the skill.

  - `latest_version: string`

    Latest version for the skill.

  - `name: string`

    Name of the skill.

  - `object: "skill"`

    The object type, which is `skill`.

    - `"skill"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const skill = await client.skills.create();

console.log(skill.id);
```

## List

`client.skills.list(SkillListParamsquery?, RequestOptionsoptions?): CursorPage<Skill>`

**get** `/skills`

List all skills for the current project.

### Parameters

- `query: SkillListParams`

  - `after?: string`

    Identifier for the last item from the previous pagination request

  - `limit?: number`

    Number of items to retrieve

  - `order?: "asc" | "desc"`

    Sort order of results by timestamp. Use `asc` for ascending order or `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `Skill`

  - `id: string`

    Unique identifier for the skill.

  - `created_at: number`

    Unix timestamp (seconds) for when the skill was created.

  - `default_version: string`

    Default version for the skill.

  - `description: string`

    Description of the skill.

  - `latest_version: string`

    Latest version for the skill.

  - `name: string`

    Name of the skill.

  - `object: "skill"`

    The object type, which is `skill`.

    - `"skill"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const skill of client.skills.list()) {
  console.log(skill.id);
}
```

## Retrieve

`client.skills.retrieve(stringskillID, RequestOptionsoptions?): Skill`

**get** `/skills/{skill_id}`

Get a skill by its ID.

### Parameters

- `skillID: string`

### Returns

- `Skill`

  - `id: string`

    Unique identifier for the skill.

  - `created_at: number`

    Unix timestamp (seconds) for when the skill was created.

  - `default_version: string`

    Default version for the skill.

  - `description: string`

    Description of the skill.

  - `latest_version: string`

    Latest version for the skill.

  - `name: string`

    Name of the skill.

  - `object: "skill"`

    The object type, which is `skill`.

    - `"skill"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const skill = await client.skills.retrieve('skill_123');

console.log(skill.id);
```

## Update

`client.skills.update(stringskillID, SkillUpdateParamsbody, RequestOptionsoptions?): Skill`

**post** `/skills/{skill_id}`

Update the default version pointer for a skill.

### Parameters

- `skillID: string`

- `body: SkillUpdateParams`

  - `default_version: string`

    The skill version number to set as default.

### Returns

- `Skill`

  - `id: string`

    Unique identifier for the skill.

  - `created_at: number`

    Unix timestamp (seconds) for when the skill was created.

  - `default_version: string`

    Default version for the skill.

  - `description: string`

    Description of the skill.

  - `latest_version: string`

    Latest version for the skill.

  - `name: string`

    Name of the skill.

  - `object: "skill"`

    The object type, which is `skill`.

    - `"skill"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const skill = await client.skills.update('skill_123', { default_version: 'default_version' });

console.log(skill.id);
```

## Delete

`client.skills.delete(stringskillID, RequestOptionsoptions?): DeletedSkill`

**delete** `/skills/{skill_id}`

Delete a skill by its ID.

### Parameters

- `skillID: string`

### Returns

- `DeletedSkill`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.deleted"`

    - `"skill.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const deletedSkill = await client.skills.delete('skill_123');

console.log(deletedSkill.id);
```

## Domain Types

### Deleted Skill

- `DeletedSkill`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.deleted"`

    - `"skill.deleted"`

### Skill

- `Skill`

  - `id: string`

    Unique identifier for the skill.

  - `created_at: number`

    Unix timestamp (seconds) for when the skill was created.

  - `default_version: string`

    Default version for the skill.

  - `description: string`

    Description of the skill.

  - `latest_version: string`

    Latest version for the skill.

  - `name: string`

    Name of the skill.

  - `object: "skill"`

    The object type, which is `skill`.

    - `"skill"`

### Skill List

- `SkillList`

  - `data: Array<Skill>`

    A list of items

    - `id: string`

      Unique identifier for the skill.

    - `created_at: number`

      Unix timestamp (seconds) for when the skill was created.

    - `default_version: string`

      Default version for the skill.

    - `description: string`

      Description of the skill.

    - `latest_version: string`

      Latest version for the skill.

    - `name: string`

      Name of the skill.

    - `object: "skill"`

      The object type, which is `skill`.

      - `"skill"`

  - `first_id: string | null`

    The ID of the first item in the list.

  - `has_more: boolean`

    Whether there are more items available.

  - `last_id: string | null`

    The ID of the last item in the list.

  - `object: "list"`

    The type of object returned, must be `list`.

    - `"list"`

# Content

## Retrieve

`client.skills.content.retrieve(stringskillID, RequestOptionsoptions?): Response`

**get** `/skills/{skill_id}/content`

Download a skill zip bundle by its ID.

### Parameters

- `skillID: string`

### Returns

- `unnamed_schema_3 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const content = await client.skills.content.retrieve('skill_123');

console.log(content);

const data = await content.blob();
console.log(data);
```

# Versions

## Create

`client.skills.versions.create(stringskillID, VersionCreateParamsbody?, RequestOptionsoptions?): SkillVersion`

**post** `/skills/{skill_id}/versions`

Create a new immutable skill version.

### Parameters

- `skillID: string`

- `body: VersionCreateParams`

  - `_default?: boolean`

    Whether to set this version as the default.

  - `files?: Array<Uploadable> | Uploadable`

    Skill files to upload (directory upload) or a single zip file.

    - `Array<Uploadable>`

    - `Uploadable`

### Returns

- `SkillVersion`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: number`

    Unix timestamp (seconds) for when the version was created.

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version"`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: string`

    Identifier of the skill for this version.

  - `version: string`

    Version number for this skill.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const skillVersion = await client.skills.versions.create('skill_123');

console.log(skillVersion.id);
```

## List

`client.skills.versions.list(stringskillID, VersionListParamsquery?, RequestOptionsoptions?): CursorPage<SkillVersion>`

**get** `/skills/{skill_id}/versions`

List skill versions for a skill.

### Parameters

- `skillID: string`

- `query: VersionListParams`

  - `after?: string`

    The skill version ID to start after.

  - `limit?: number`

    Number of versions to retrieve.

  - `order?: "asc" | "desc"`

    Sort order of results by version number.

    - `"asc"`

    - `"desc"`

### Returns

- `SkillVersion`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: number`

    Unix timestamp (seconds) for when the version was created.

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version"`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: string`

    Identifier of the skill for this version.

  - `version: string`

    Version number for this skill.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const skillVersion of client.skills.versions.list('skill_123')) {
  console.log(skillVersion.id);
}
```

## Retrieve

`client.skills.versions.retrieve(stringversion, VersionRetrieveParamsparams, RequestOptionsoptions?): SkillVersion`

**get** `/skills/{skill_id}/versions/{version}`

Get a specific skill version.

### Parameters

- `version: string`

  The version number to retrieve.

- `params: VersionRetrieveParams`

  - `skill_id: string`

    The identifier of the skill.

### Returns

- `SkillVersion`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: number`

    Unix timestamp (seconds) for when the version was created.

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version"`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: string`

    Identifier of the skill for this version.

  - `version: string`

    Version number for this skill.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const skillVersion = await client.skills.versions.retrieve('version', { skill_id: 'skill_123' });

console.log(skillVersion.id);
```

## Delete

`client.skills.versions.delete(stringversion, VersionDeleteParamsparams, RequestOptionsoptions?): DeletedSkillVersion`

**delete** `/skills/{skill_id}/versions/{version}`

Delete a skill version.

### Parameters

- `version: string`

  The skill version number.

- `params: VersionDeleteParams`

  - `skill_id: string`

    The identifier of the skill.

### Returns

- `DeletedSkillVersion`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.version.deleted"`

    - `"skill.version.deleted"`

  - `version: string`

    The deleted skill version.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const deletedSkillVersion = await client.skills.versions.delete('version', {
  skill_id: 'skill_123',
});

console.log(deletedSkillVersion.id);
```

## Domain Types

### Deleted Skill Version

- `DeletedSkillVersion`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.version.deleted"`

    - `"skill.version.deleted"`

  - `version: string`

    The deleted skill version.

### Skill Version

- `SkillVersion`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: number`

    Unix timestamp (seconds) for when the version was created.

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version"`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: string`

    Identifier of the skill for this version.

  - `version: string`

    Version number for this skill.

### Skill Version List

- `SkillVersionList`

  - `data: Array<SkillVersion>`

    A list of items

    - `id: string`

      Unique identifier for the skill version.

    - `created_at: number`

      Unix timestamp (seconds) for when the version was created.

    - `description: string`

      Description of the skill version.

    - `name: string`

      Name of the skill version.

    - `object: "skill.version"`

      The object type, which is `skill.version`.

      - `"skill.version"`

    - `skill_id: string`

      Identifier of the skill for this version.

    - `version: string`

      Version number for this skill.

  - `first_id: string | null`

    The ID of the first item in the list.

  - `has_more: boolean`

    Whether there are more items available.

  - `last_id: string | null`

    The ID of the last item in the list.

  - `object: "list"`

    The type of object returned, must be `list`.

    - `"list"`

# Content

## Retrieve

`client.skills.versions.content.retrieve(stringversion, ContentRetrieveParamsparams, RequestOptionsoptions?): Response`

**get** `/skills/{skill_id}/versions/{version}/content`

Download a skill version zip bundle.

### Parameters

- `version: string`

  The skill version number.

- `params: ContentRetrieveParams`

  - `skill_id: string`

    The identifier of the skill.

### Returns

- `unnamed_schema_4 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const content = await client.skills.versions.content.retrieve('version', { skill_id: 'skill_123' });

console.log(content);

const data = await content.blob();
console.log(data);
```
