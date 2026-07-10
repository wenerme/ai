# Parts

## Add upload part

`client.uploads.parts.create(stringuploadID, PartCreateParamsbody, RequestOptionsoptions?): UploadPart`

**post** `/uploads/{upload_id}/parts`

Add upload part

### Parameters

- `uploadID: string`

- `body: PartCreateParams`

  - `data: Uploadable`

    The chunk of bytes for this Part.

### Returns

- `UploadPart`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: string`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: "upload.part"`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: string`

    The ID of the Upload object that this Part was added to.

### Example

```typescript
import fs from 'fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const uploadPart = await client.uploads.parts.create('upload_abc123', {
  data: fs.createReadStream('path/to/file'),
});

console.log(uploadPart.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "upload.part",
  "upload_id": "upload_id"
}
```

## Domain Types

### Upload Part

- `UploadPart`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: string`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: "upload.part"`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: string`

    The ID of the Upload object that this Part was added to.
