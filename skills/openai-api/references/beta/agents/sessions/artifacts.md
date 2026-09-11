# Artifacts

## Retrieve agent session artifact content

**get** `/agents/sessions/{session_id}/artifacts/{artifact_id}/content`

Downloads immutable session artifact bytes after the execution environment expires. See [session artifacts](/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).

### Path Parameters

- `session_id: string`

- `artifact_id: string`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/artifacts/$ARTIFACT_ID/content \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete an agent session artifact

**delete** `/agents/sessions/{session_id}/artifacts/{artifact_id}`

Deletes an immutable session artifact without deleting its live environment file or original Files API object. See [session artifacts](/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).

### Path Parameters

- `session_id: string`

- `artifact_id: string`

### Returns

- `SessionArtifactDeleted object { id, deleted, object }`

  Confirmation that an immutable session artifact was deleted.

  - `id: string`

    The ID of the deleted session artifact.

  - `deleted: boolean`

    Whether the session artifact was deleted. Always `true`.

  - `object: "agent.session.artifact.deleted"`

    The object type. Always `agent.session.artifact.deleted`.

    - `"agent.session.artifact.deleted"`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/artifacts/$ARTIFACT_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "agent.session.artifact.deleted"
}
```

## List agent session artifacts

**get** `/agents/sessions/{session_id}/artifacts`

Lists immutable artifacts published by completed hosted session turns. See [session artifacts](/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).

### Path Parameters

- `session_id: string`

### Query Parameters

- `after: optional string or null`

  Return artifacts after this immutable artifact ID.

- `environment_id: optional string or null`

  Restrict the listing to artifacts produced by this environment.

- `limit: optional number or null`

  The maximum number of artifacts to return, between 1 and 100.

- `order: optional "asc" or "desc"`

  Sort by creation time and ID. Defaults to descending.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

### Returns

- `data: array of SessionArtifact`

  The resources returned in this page, in the requested sort order.

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

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

- `object: "list"`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/artifacts \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

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

## Domain Types

### Session Artifact

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

### Session Artifact Deleted

- `SessionArtifactDeleted object { id, deleted, object }`

  Confirmation that an immutable session artifact was deleted.

  - `id: string`

    The ID of the deleted session artifact.

  - `deleted: boolean`

    Whether the session artifact was deleted. Always `true`.

  - `object: "agent.session.artifact.deleted"`

    The object type. Always `agent.session.artifact.deleted`.

    - `"agent.session.artifact.deleted"`
