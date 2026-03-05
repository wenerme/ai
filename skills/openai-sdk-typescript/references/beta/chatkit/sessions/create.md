## Create

`client.beta.chatkit.sessions.create(SessionCreateParamsbody, RequestOptionsoptions?): ChatSession`

**post** `/chatkit/sessions`

Create a ChatKit session.

### Parameters

- `body: SessionCreateParams`

  - `user: string`

    A free-form string that identifies your end user; ensures this Session can access other objects that have the same `user` scope.

  - `workflow: ChatSessionWorkflowParam`

    Workflow that powers the session.

    - `id: string`

      Identifier for the workflow invoked by the session.

    - `state_variables?: Record<string, string | boolean | number>`

      State variables forwarded to the workflow. Keys may be up to 64 characters, values must be primitive types, and the map defaults to an empty object.

      - `string`

      - `boolean`

      - `number`

    - `tracing?: Tracing`

      Optional tracing overrides for the workflow invocation. When omitted, tracing is enabled by default.

      - `enabled?: boolean`

        Whether tracing is enabled during the session. Defaults to true.

    - `version?: string`

      Specific workflow version to run. Defaults to the latest deployed version.

  - `chatkit_configuration?: ChatSessionChatKitConfigurationParam`

    Optional overrides for ChatKit runtime configuration features

    - `automatic_thread_titling?: AutomaticThreadTitling`

      Configuration for automatic thread titling. When omitted, automatic thread titling is enabled by default.

      - `enabled?: boolean`

        Enable automatic thread title generation. Defaults to true.

    - `file_upload?: FileUpload`

      Configuration for upload enablement and limits. When omitted, uploads are disabled by default (max_files 10, max_file_size 512 MB).

      - `enabled?: boolean`

        Enable uploads for this session. Defaults to false.

      - `max_file_size?: number`

        Maximum size in megabytes for each uploaded file. Defaults to 512 MB, which is the maximum allowable size.

      - `max_files?: number`

        Maximum number of files that can be uploaded to the session. Defaults to 10.

    - `history?: History`

      Configuration for chat history retention. When omitted, history is enabled by default with no limit on recent_threads (null).

      - `enabled?: boolean`

        Enables chat users to access previous ChatKit threads. Defaults to true.

      - `recent_threads?: number`

        Number of recent ChatKit threads users have access to. Defaults to unlimited when unset.

  - `expires_after?: ChatSessionExpiresAfterParam`

    Optional override for session expiration timing in seconds from creation. Defaults to 10 minutes.

    - `anchor: "created_at"`

      Base timestamp used to calculate expiration. Currently fixed to `created_at`.

      - `"created_at"`

    - `seconds: number`

      Number of seconds after the anchor when the session expires.

  - `rate_limits?: ChatSessionRateLimitsParam`

    Optional override for per-minute request limits. When omitted, defaults to 10.

    - `max_requests_per_1_minute?: number`

      Maximum number of requests allowed per minute for the session. Defaults to 10.

### Returns

- `ChatSession`

  Represents a ChatKit session and its resolved configuration.

  - `id: string`

    Identifier for the ChatKit session.

  - `chatkit_configuration: ChatSessionChatKitConfiguration`

    Resolved ChatKit feature configuration for the session.

    - `automatic_thread_titling: ChatSessionAutomaticThreadTitling`

      Automatic thread titling preferences.

      - `enabled: boolean`

        Whether automatic thread titling is enabled.

    - `file_upload: ChatSessionFileUpload`

      Upload settings for the session.

      - `enabled: boolean`

        Indicates if uploads are enabled for the session.

      - `max_file_size: number | null`

        Maximum upload size in megabytes.

      - `max_files: number | null`

        Maximum number of uploads allowed during the session.

    - `history: ChatSessionHistory`

      History retention configuration.

      - `enabled: boolean`

        Indicates if chat history is persisted for the session.

      - `recent_threads: number | null`

        Number of prior threads surfaced in history views. Defaults to null when all history is retained.

  - `client_secret: string`

    Ephemeral client secret that authenticates session requests.

  - `expires_at: number`

    Unix timestamp (in seconds) for when the session expires.

  - `max_requests_per_1_minute: number`

    Convenience copy of the per-minute request limit.

  - `object: "chatkit.session"`

    Type discriminator that is always `chatkit.session`.

    - `"chatkit.session"`

  - `rate_limits: ChatSessionRateLimits`

    Resolved rate limit values.

    - `max_requests_per_1_minute: number`

      Maximum allowed requests per one-minute window.

  - `status: ChatSessionStatus`

    Current lifecycle state of the session.

    - `"active"`

    - `"expired"`

    - `"cancelled"`

  - `user: string`

    User identifier associated with the session.

  - `workflow: ChatKitWorkflow`

    Workflow metadata for the session.

    - `id: string`

      Identifier of the workflow backing the session.

    - `state_variables: Record<string, string | boolean | number> | null`

      State variable key-value pairs applied when invoking the workflow. Defaults to null when no overrides were provided.

      - `string`

      - `boolean`

      - `number`

    - `tracing: Tracing`

      Tracing settings applied to the workflow.

      - `enabled: boolean`

        Indicates whether tracing is enabled.

    - `version: string | null`

      Specific workflow version used for the session. Defaults to null when using the latest deployment.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatSession = await client.beta.chatkit.sessions.create({
  user: 'x',
  workflow: { id: 'id' },
});

console.log(chatSession.id);
```
