## Retrieve an agent session artifact

**get** `/agents/sessions/{session_id}/artifacts/{artifact_id}`

Retrieves immutable metadata for one durable session artifact. See [session artifacts](/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).

### Path Parameters

- `session_id: string`

- `artifact_id: string`

### Returns

- `SessionArtifact object { id, created_at, environment_id, 5 more }`

  An immutable file published by a completed hosted session turn.

  - `id: string`

    The immutable artifact ID.

  - `created_at: number`

    The Unix timestamp, in seconds, when the artifact was published.

  - `environment_id: string`

    The ID of the environment that produced the artifact.

  - `object: "agent.session.artifact"`

    The object type. Always `agent.session.artifact`.

    - `"agent.session.artifact"`

  - `path: string`

    The original absolute file path in the execution environment.

  - `session_id: string`

    The ID of the session that owns the artifact.

  - `size_bytes: number`

    The immutable artifact size in bytes.

  - `turn_id: string`

    The ID of the completed turn that published the artifact.

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/artifacts/$ARTIFACT_ID \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "environment_id": "environment_id",
  "object": "agent.session.artifact",
  "path": "path",
  "session_id": "session_id",
  "size_bytes": 0,
  "turn_id": "turn_id"
}
```
