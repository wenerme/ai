## Delete voice

**delete** `/audio/voices/{voice_id}`

Deletes a voice created from a text prompt or an audio sample.

Requires voice write permission and access to the voice's project. Access to voices created from recordings is limited to eligible customers. See the [custom voices guide](https://developers.openai.com/api/docs/guides/custom-voices).

Deleting a voice does not delete its consent recording. Deleting an already deleted voice returns a 404 error.

### Path Parameters

- `voice_id: string`

### Returns

- `VoiceDeleted object { id, deleted, object }`

  - `id: string`

    The voice identifier.

  - `deleted: boolean`

    Whether the voice was deleted.

  - `object: "audio.voice.deleted"`

    The object type, which is always `audio.voice.deleted`.

    - `"audio.voice.deleted"`

### Example

```http
curl https://api.openai.com/v1/audio/voices/$VOICE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "voice_1234",
  "deleted": true,
  "object": "audio.voice.deleted"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/voices/voice_1234 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "voice_1234",
  "object": "audio.voice.deleted",
  "deleted": true
}
```
