> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Errors and Debugging

For errors, OpenRouter returns a JSON response with the following shape:

```typescript
type ErrorResponse = {
  error: {
    code: number;
    message: string;
    metadata?: Record<string, unknown>;
  };
};
```

The HTTP Response will have the same status code as `error.code`, forming a request error if:

* Your original request is invalid
* Your API key/account is out of credits

Otherwise, the returned HTTP response status will be <code>{HTTPStatus.S200_OK}</code> and any error occurred while the LLM is producing the output will be emitted in the response body or as an SSE data event.

Example code for printing errors in JavaScript:

```typescript
const request = await fetch('https://openrouter.ai/...');
console.log(request.status); // Will be an error code unless the model started processing your request
const response = await request.json();
console.error(response.error?.status); // Will be an error code
console.error(response.error?.message);
```

## Error Codes

* **{HTTPStatus.S400_Bad_Request}**: Bad Request (invalid or missing params, CORS)
* **{HTTPStatus.S401_Unauthorized}**: Invalid credentials (OAuth session expired, disabled/invalid API key)
* **{HTTPStatus.S402_Payment_Required}**: Your account or API key has insufficient credits. Add more credits and retry the request.
* **{HTTPStatus.S403_Forbidden}**: Forbidden (insufficient permissions, guardrail block, or moderation flag)
* **{HTTPStatus.S408_Request_Timeout}**: Your request timed out
* **{HTTPStatus.S429_Too_Many_Requests}**: You are being rate limited
* **{HTTPStatus.S502_Bad_Gateway}**: Your chosen model is down or we received an invalid response from it
* **{HTTPStatus.S503_Service_Unavailable}**: There is no available model provider that meets your routing requirements

## Retry-After Header

On <code>{HTTPStatus.S429_Too_Many_Requests}</code> and <code>{HTTPStatus.S503_Service_Unavailable}</code> responses, OpenRouter may include a standard HTTP `Retry-After` response header indicating how many seconds to wait before retrying.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

The OpenAI SDK, Anthropic SDK, Vercel AI SDK, and OpenRouter SDK already respect this header for backoff. If you're using `fetch` directly, honor it before retrying:

```typescript
const res = await fetch('https://openrouter.ai/api/v1/chat/completions', { ... });
if (res.status === 429 || res.status === 503) {
  const retryAfter = Number(res.headers.get('Retry-After'));
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    await new Promise((r) => setTimeout(r, retryAfter * 1000));
    // retry the request
  }
}
```

## Moderation Errors

If your input was flagged, the `error.metadata` will contain information about the issue. The shape of the metadata is as follows:

```typescript
type ModerationErrorMetadata = {
  reasons: string[]; // Why your input was flagged
  flagged_input: string; // The text segment that was flagged, limited to 100 characters. If the flagged input is longer than 100 characters, it will be truncated in the middle and replaced with ...
  provider_name: string; // The name of the provider that requested moderation
  model_slug: string;
};
```

## Guardrail Errors

On inference endpoints (`/chat/completions`, `/responses`, `/messages`), a request can be blocked before it reaches a provider — for example by a content filter or prompt-injection detector configured via [guardrails](/docs/guides/features/guardrails). When this happens, the response is a `403` with a message describing the block reason:

```json
{
  "error": {
    "code": 403,
    "message": "Request blocked: prompt injection patterns detected",
    "metadata": {
      "patterns": ["ignore all previous instructions"]
    }
  }
}
```

When you opt in to [router metadata](/docs/features/router-metadata) via the `X-OpenRouter-Experimental-Metadata: enabled` header, the 403 response also includes the full `openrouter_metadata` object with routing context and a `pipeline` array detailing the guardrail stages that ran:

```json
{
  "error": {
    "code": 403,
    "message": "Request blocked: prompt injection patterns detected",
    "metadata": {
      "patterns": ["ignore all previous instructions"]
    }
  },
  "openrouter_metadata": {
    "requested": "openai/gpt-4o",
    "strategy": "direct",
    "region": "iad",
    "summary": "available=1",
    "attempt": 1,
    "is_byok": false,
    "endpoints": {
      "total": 1,
      "available": [
        { "provider": "OpenAI", "model": "openai/gpt-4o", "selected": false }
      ]
    },
    "pipeline": [
      {
        "type": "guardrail",
        "name": "regex_pi_detection",
        "guardrail_id": "grd_abc123",
        "guardrail_scope": "api-key",
        "summary": "Blocked: prompt injection detected (1 pattern matched)",
        "data": {
          "action": "blocked",
          "detected": true,
          "engines": ["regex"],
          "patterns": ["ignore all previous instructions"]
        }
      }
    ]
  }
}
```

The `openrouter_metadata` object follows the same shape as on successful responses — see [Pipeline Stages](/docs/features/router-metadata#pipeline-stages) for the full stage type and field reference.

## Provider Errors

If the model provider encounters an error, the `error.metadata` will contain information about the issue. The shape of the metadata is as follows:

```typescript
type ProviderErrorMetadata = {
  provider_name: string; // The name of the provider that encountered the error
  raw: unknown; // The raw error from the provider
};
```

## When No Content is Generated

Occasionally, the model may not generate any content. This typically occurs when:

* The model is warming up from a cold start
* The system is scaling up to handle more requests

Warm-up times usually range from a few seconds to a few minutes, depending on the model and provider.

If you encounter persistent no-content issues, consider implementing a simple retry mechanism or trying again with a different provider or model that has more recent activity.

Additionally, be aware that in some cases, you may still be charged for the prompt processing cost by the upstream provider, even if no content is generated.

## Streaming Error Formats

When using streaming mode (`stream: true`), errors are handled differently depending on when they occur:

### Pre-Stream Errors

Errors that occur before any tokens are sent follow the standard error format above, with appropriate HTTP status codes.

### Mid-Stream Errors

Errors that occur after streaming has begun are sent as Server-Sent Events (SSE) with a unified structure that includes both the error details and a completion choice:

```typescript
type MidStreamError = {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  provider: string;
  error: {
    code: string | number;
    message: string;
  };
  choices: [{
    index: 0;
    delta: { content: '' };
    finish_reason: 'error';
    native_finish_reason?: string;
  }];
};
```

Example SSE data:

```text
data: {"id":"cmpl-abc123","object":"chat.completion.chunk","created":1234567890,"model":"openai/gpt-4o","provider":"openai","error":{"code":"server_error","message":"Provider disconnected"},"choices":[{"index":0,"delta":{"content":""},"finish_reason":"error"}]}
```

Key characteristics:

* The error appears at the **top level** alongside standard response fields
* A `choices` array is included with `finish_reason: "error"` to properly terminate the stream
* The HTTP status remains 200 OK since headers were already sent
* The stream is terminated after this event

## OpenAI Responses API Error Events

The OpenAI Responses API (`/api/v1/responses`) uses specific event types for streaming errors:

### Error Event Types

1. **`response.failed`** - Official failure event
   ```json
   {
     "type": "response.failed",
     "response": {
       "id": "resp_abc123",
       "status": "failed",
       "error": {
         "code": "server_error",
         "message": "Internal server error"
       }
     }
   }
   ```

2. **`response.error`** - Error during response generation
   ```json
   {
     "type": "response.error",
     "error": {
       "code": "rate_limit_exceeded",
       "message": "Rate limit exceeded"
     }
   }
   ```

3. **`error`** - Plain error event (undocumented but sent by OpenAI)
   ```json
   {
     "type": "error",
     "error": {
       "code": "invalid_api_key",
       "message": "Invalid API key provided"
     }
   }
   ```

### Error Code Transformations

The Responses API transforms certain error codes into successful completions with specific finish reasons:

| Error Code                | Transformed To | Finish Reason |
| ------------------------- | -------------- | ------------- |
| `context_length_exceeded` | Success        | `length`      |
| `max_tokens_exceeded`     | Success        | `length`      |
| `token_limit_exceeded`    | Success        | `length`      |
| `string_too_long`         | Success        | `length`      |

This allows for graceful handling of limit-based errors without treating them as failures.

## API-Specific Error Handling

Different OpenRouter API endpoints handle errors in distinct ways:

### OpenAI Chat Completions API (`/api/v1/chat/completions`)

* **No tokens sent**: Returns standalone `ErrorResponse`
* **Some tokens sent**: Embeds error information within the `choices` array of the final response
* **Streaming**: Errors sent as SSE events with top-level error field

### OpenAI Responses API (`/api/v1/responses`)

* **Error transformations**: Certain errors become successful responses with appropriate finish reasons
* **Streaming events**: Uses typed events (`response.failed`, `response.error`, `error`)
* **Graceful degradation**: Handles provider-specific errors with fallback behavior

### Error Response Type Definitions

```typescript
// Standard error response
interface ErrorResponse {
  error: {
    code: number;
    message: string;
    metadata?: Record<string, unknown>;
  };
}

// Mid-stream error with completion data
interface StreamErrorChunk {
  error: {
    code: string | number;
    message: string;
  };
  choices: Array<{
    delta: { content: string };
    finish_reason: 'error';
    native_finish_reason: string;
  }>;
}

// Responses API error event
interface ResponsesAPIErrorEvent {
  type: 'response.failed' | 'response.error' | 'error';
  error?: {
    code: string;
    message: string;
  };
  response?: {
    id: string;
    status: 'failed';
    error: {
      code: string;
      message: string;
    };
  };
}
```

## Debugging

OpenRouter provides a `debug` option that allows you to inspect the exact request body that was sent to the upstream provider. This is useful for understanding how OpenRouter transforms your request parameters to work with different providers.

### Debug Option Shape

The debug option is an object with the following shape:

```typescript
type DebugOptions = {
  echo_upstream_body?: boolean; // If true, returns the transformed request body sent to the provider
};
```

### Usage

To enable debug output, include the `debug` parameter in your request:

<CodeGroup>
  ```typescript title="TypeScript"
  fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-haiku-4.5',
      stream: true, // Debug only works with streaming
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello!' },
      ],
      debug: {
        echo_upstream_body: true,
      },
    }),
  });

  const text = await response.text();

  for (const line of text.split('\n')) {
    if (!line.startsWith('data: ')) continue;

    const data = line.slice(6);
    if (data === '[DONE]') break;

    const parsed = JSON.parse(data);

    if (parsed.debug?.echo_upstream_body) {
      console.log('\nDebug:', JSON.stringify(parsed.debug.echo_upstream_body, null, 2));
    }

    process.stdout.write(parsed.choices?.[0]?.delta?.content ?? '');
  }
  ```

  ```python title="Python"
  import requests
  import json

  response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "model": "anthropic/claude-haiku-4.5",
      "stream": True,
      "messages": [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": "Hello!" }
      ],
      "debug": {
        "echo_upstream_body": True
      }
    }),
    stream=True
  )

  for line in response.iter_lines():
    if line:
      text = line.decode('utf-8')
      if 'echo_upstream_body' in text:
        print(text)
  ```
</CodeGroup>

### Debug Response Format

When `debug.echo_upstream_body` is set to `true`, OpenRouter will send a debug chunk as the **first chunk** in the streaming response. This chunk will have an empty `choices` array and include a `debug` field containing the transformed request body:

```json
{
  "id": "gen-xxxxx",
  "provider": "Anthropic",
  "model": "anthropic/claude-haiku-4.5",
  "object": "chat.completion.chunk",
  "created": 1234567890,
  "choices": [],
  "debug": {
    "echo_upstream_body": {
      "system": [
        { "type": "text", "text": "You are a helpful assistant." }
      ],
      "messages": [
        { "role": "user", "content": "Hello!" }
      ],
      "model": "claude-haiku-4-5-20251001",
      "stream": true,
      "max_tokens": 64000,
      "temperature": 1
    }
  }
}
```

### Important Notes

<Warning title="Streaming Chat Completions Only">
  The debug option **only works with streaming mode** (`stream: true`) for the Chat Completions API. Non-streaming requests and Responses API requests will ignore the debug parameter.
</Warning>

<Warning title="Not for Production">
  The debug flag should **not be used in production environments**. It is intended for development and debugging purposes only, as it may potentially return sensitive information included in the request that was not intended to be visible elsewhere.
</Warning>

### Use Cases

The debug output is particularly useful for:

1. **Understanding Parameter Transformations**: See how OpenRouter maps your parameters to provider-specific formats (e.g., how `max_tokens` is set, how `temperature` is handled).

2. **Verifying Message Formatting**: Check how OpenRouter combines and formats your messages for different providers (e.g., how system messages are concatenated, how user messages are merged).

3. **Checking Applied Defaults**: See what default values OpenRouter applies when parameters are not specified in your request.

4. **Debugging Provider Fallbacks**: When using provider fallbacks, a debug chunk will be sent for **each attempted provider**, allowing you to see which providers were tried and what parameters were sent to each.

### Privacy and Redaction

OpenRouter will make a best effort to automatically redact potentially sensitive or noisy data from debug output. Remember that the debug option is not intended for production.