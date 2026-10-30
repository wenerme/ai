## Retrieve agent session artifact content

**get** `/agents/sessions/{session_id}/artifacts/{artifact_id}/content`

Downloads immutable session artifact bytes after the execution environment expires. See [session artifacts](/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).

### Path Parameters

- `session_id: string`

  The ID of the session that owns the artifact.

  `minLength: 0`, `maxLength: 1048576`

- `artifact_id: string`

  The immutable session artifact ID.

  `minLength: 0`, `maxLength: 1048576`

### Returns

`file`

Content type: `application/octet-stream`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/artifacts/$ARTIFACT_ID/content \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
