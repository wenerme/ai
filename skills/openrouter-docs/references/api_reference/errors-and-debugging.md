> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors and Debugging

> API Errors and Debugging

export const HTTPStatus = {
  S100_Continue: 100,
  S101_Switching_Protocols: 101,
  S102_Processing: 102,
  S200_OK: 200,
  S201_Created: 201,
  S202_Accepted: 202,
  S203_Non_Authoritative_Information: 203,
  S204_No_Content: 204,
  S205_Reset_Content: 205,
  S206_Partial_Content: 206,
  S207_Multi_Status: 207,
  S208_Already_Reported: 208,
  S300_Multiple_Choices: 300,
  S301_Moved_Permanently: 301,
  S302_Found: 302,
  S303_See_Other: 303,
  S304_Not_Modified: 304,
  S305_Use_Proxy: 305,
  S307_Temporary_Redirect: 307,
  S308_Permanent_Redirect: 308,
  S400_Bad_Request: 400,
  S401_Unauthorized: 401,
  S402_Payment_Required: 402,
  S403_Forbidden: 403,
  S404_Not_Found: 404,
  S405_Method_Not_Allowed: 405,
  S406_Not_Acceptable: 406,
  S407_Proxy_Authentication_Required: 407,
  S408_Request_Timeout: 408,
  S409_Conflict: 409,
  S410_Gone: 410,
  S411_Length_Required: 411,
  S412_Precondition_Failed: 412,
  S413_Payload_Too_Large: 413,
  S414_URI_Too_Long: 414,
  S415_Unsupported_Media_Type: 415,
  S416_Range_Not_Satisfiable: 416,
  S417_Expectation_Failed: 417,
  S418_Im_a_teapot: 418,
  S421_Misdirected_Request: 421,
  S422_Unprocessable_Entity: 422,
  S423_Locked: 423,
  S424_Failed_Dependency: 424,
  S425_Too_Early: 425,
  S426_Upgrade_Required: 426,
  S428_Precondition_Required: 428,
  S429_Too_Many_Requests: 429,
  S431_Request_Header_Fields_Too_Large: 431,
  S451_Unavailable_For_Legal_Reasons: 451,
  S498_Invalid_Token: 498,
  S499_Client_Closed_Request: 499,
  S500_Internal_Server_Error: 500,
  S501_Not_Implemented: 501,
  S502_Bad_Gateway: 502,
  S503_Service_Unavailable: 503,
  S504_Gateway_Timeout: 504,
  S505_HTTP_Version_Not_Supported: 505,
  S506_Variant_Also_Negotiates: 506,
  S507_Insufficient_Storage: 507,
  S508_Loop_Detected: 508,
  S510_Not_Extended: 510,
  S511_Network_Authentication_Required: 511,
  S520_Web_Server_Returned_Unknown_Error: 520,
  S521_Web_Server_Is_Down: 521,
  S522_Connection_Timed_Out: 522,
  S523_Origin_Unreachable: 523,
  S524_A_Timeout_Occurred: 524,
  S525_SSL_Handshake_Failed: 525,
  S526_Invalid_SSL_Certificate: 526,
  S529_Overloaded: 529,
  S530_Origin_DNS_Error: 530
};

For errors, OpenRouter returns a JSON response with the following shape:

```typescript lines theme={null}
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

```typescript lines theme={null}
const request = await fetch('https://openrouter.ai/...');
console.log(request.status); // Will be an error code unless the model started processing your request
const response = await request.json();
console.error(response.error?.code); // Will be an error code
console.error(response.error?.message);
```

## Error codes

* **{HTTPStatus.S400_Bad_Request}**: Bad Request (invalid or missing params, CORS)
* **{HTTPStatus.S401_Unauthorized}**: Invalid credentials (OAuth session expired, disabled/invalid API key)
* **{HTTPStatus.S402_Payment_Required}**: Your account or API key has insufficient credits. Add more credits and retry the request.
* **{HTTPStatus.S403_Forbidden}**: Forbidden (insufficient permissions, guardrail block, or moderation flag)
* **{HTTPStatus.S408_Request_Timeout}**: Your request timed out
* **{HTTPStatus.S429_Too_Many_Requests}**: You are being rate limited
* **{HTTPStatus.S502_Bad_Gateway}**: Your chosen model is down or we received an invalid response from it
* **{HTTPStatus.S503_Service_Unavailable}**: There is no available model provider that meets your routing requirements

## Retry-After header

On <code>{HTTPStatus.S429_Too_Many_Requests}</code> and <code>{HTTPStatus.S503_Service_Unavailable}</code> responses, OpenRouter may include a standard HTTP `Retry-After` response header indicating how many seconds to wait before retrying.

```http lines theme={null}
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

The OpenAI SDK, Anthropic SDK, Vercel AI SDK, and OpenRouter SDK already respect this header for backoff. If you're using `fetch` directly, honor it before retrying:

```typescript lines theme={null}
const res = await fetch('https://openrouter.ai/api/v1/chat/completions', { ... });
if (res.status === 429 || res.status === 503) {
  const retryAfter = Number(res.headers.get('Retry-After'));
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    await new Promise((r) => setTimeout(r, retryAfter * 1000));
    // retry the request
  }
}
```

## Moderation errors

If your input was flagged, the `error.metadata` will contain information about the issue. The shape of the metadata is as follows:

```typescript lines theme={null}
type ModerationErrorMetadata = {
  reasons: string[]; // Why your input was flagged
  flagged_input: string; // The text segment that was flagged, limited to 100 characters. If the flagged input is longer than 100 characters, it will be truncated in the middle and replaced with ...
  provider_name: string; // The name of the provider that requested moderation
  model_slug: string;
};
```

## Guardrail errors

On inference endpoints (`/chat/completions`, `/responses`, `/messages`), a request can be blocked before it reaches a provider — for example by a content filter or prompt-injection detector configured via [guardrails](/docs/guides/features/guardrails). When this happens, the response is a `403` with a message describing the block reason. The OpenRouter-shaped body below applies to `/chat/completions` and `/responses`; on `/messages` the block is returned as an Anthropic `permission_error` envelope (see [Anthropic Messages](#anthropic-messages-apiv1messages) below), with `openrouter_metadata` still carried at the top level when opted in:

```json lines theme={null}
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

When you opt in to [router metadata](/docs/guides/features/router-metadata) via the `X-OpenRouter-Experimental-Metadata: enabled` header, the 403 response also includes the full `openrouter_metadata` object with routing context and a `pipeline` array detailing the guardrail stages that ran:

```json expandable lines theme={null}
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

The `openrouter_metadata` object follows the same shape as on successful responses — see [Pipeline Stages](/docs/guides/features/router-metadata#pipeline-stages) for the full stage type and field reference.

## Provider errors

OpenRouter normalizes every upstream provider error into the stable, typed
`error_type` vocabulary documented under [Typed Error Codes](#typed-error-codes).
The same `error_type` values describe what went wrong whether the provider
error arrives in a non-streaming response body or as a mid-stream SSE event.
Native protocol codes (the Anthropic `error.type`, the Responses `error.code`)
are best-effort and can differ between formats — `error_type` is the field to
rely on across all of them.

For Chat Completions, a provider error that interrupts generation carries
`error_type` inside `error.metadata`:

```json lines theme={null}
{
  "error": {
    "code": 429,
    "message": "Rate limit exceeded",
    "metadata": {
      "error_type": "rate_limit_exceeded",
      "provider_code": "rate_limited"
    }
  }
}
```

The same value is carried on mid-stream errors and on the Anthropic and
Responses skins — see [Skin-Specific Error Formats](#skin-specific-error-formats)
for the exact wire location in each format.

### Masking and raw provider details

When a request fails with a `500`, the `message` is replaced with a generic
string and `provider_code` and `openrouter_metadata` are omitted, but
`error_type` is still present (`server`).

For non-500 errors, the upstream provider's own error code is surfaced in
`error.metadata.provider_code` when available. Opt-in routing context (which
provider was selected, fallback attempts, etc.) is carried in the
`openrouter_metadata` object when the request sets `X-OpenRouter-Metadata`
— it follows the same shape as on successful responses (routing-summary
fields only; see
[Pipeline Stages](/docs/guides/features/router-metadata#pipeline-stages)).

## When no content is generated

Occasionally, the model may not generate any content. This typically occurs when:

* The model is warming up from a cold start
* The system is scaling up to handle more requests

Warm-up times usually range from a few seconds to a few minutes, depending on the model and provider.

If you encounter persistent no-content issues, consider implementing a simple retry mechanism or trying again with a different provider or model that has more recent activity.

In some cases, you may still be charged for the prompt processing cost by the upstream provider, even if no content is generated.

## Streaming error formats

When using streaming mode (`stream: true`), errors are handled differently depending on when they occur:

### Pre-stream errors

Errors that occur before any tokens are sent follow the standard error format above, with appropriate HTTP status codes. At this stage the HTTP response hasn't been committed yet, so OpenRouter can:

* Return a proper HTTP error status (4xx/5xx)
* Silently retry with a different provider endpoint if [fallback routing](/docs/guides/routing/provider-selection) is enabled
* Apply rate-limit or auth checks before any work begins

You'll see pre-stream errors for issues like invalid API keys, malformed requests, or when every available provider endpoint is exhausted before streaming starts.

### Mid-stream errors

OpenRouter sends you the HTTP `200 OK` status and headers as soon as the provider accepts the request. That happens before the model produces a single token, and an HTTP status is final once sent.

Every failure after that point is therefore reported inside the response instead of in the status. A streaming request receives an SSE error event; a non-streaming request receives an error body. This includes provider errors that arrive before any token. Failover also stops once part of the answer has reached you, since your application already holds output from the first provider.

Common causes of mid-stream errors:

* **Provider disconnect** — the upstream connection drops after partial output (network issue, provider crash, load balancer timeout)
* **Provider timeout** — the model stops responding mid-generation and the read deadline expires
* **Token limit hit during generation** — the model reaches `max_tokens` or the context window fills up while producing output
* **Output content filter** — a content moderation system flags generated text after some of it was already streamed
* **Provider overload** — the upstream returns a rate-limit or capacity error after beginning to stream

<Note>
  If an attempt fails before any tokens reach you, OpenRouter automatically tries a backup provider. The `200 OK` has already been sent by then, so the status stays `200` even when every provider fails — the last error reaches you in the response body.
</Note>

Mid-stream errors are sent as Server-Sent Events (SSE) with a unified structure that includes both the error details and a completion choice:

```typescript expandable lines theme={null}
type MidStreamError = {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  provider: string;
  error: {
    code: number;       // HTTP status code (e.g. 400, 429, 502)
    message: string;
    metadata?: {
      error_type: string;     // Typed error code — see table below
      provider_code?: string; // Original upstream error code (omitted on 500s)
    };
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

```text lines theme={null}
data: {"id":"gen-abc123","object":"chat.completion.chunk","created":1234567890,"model":"openai/gpt-4o","provider":"OpenAI","error":{"code":429,"message":"Rate limit exceeded","metadata":{"error_type":"rate_limit_exceeded"}},"choices":[{"index":0,"delta":{"content":""},"finish_reason":"error"}]}
```

Key characteristics:

* The error appears at the **top level** alongside standard response fields
* `error.metadata.error_type` carries a typed code you can switch on programmatically — see [Typed Error Codes](#typed-error-codes) for the full list
* A `choices` array is included with `finish_reason: "error"` to properly terminate the stream
* The HTTP status remains `200 OK`, because the headers were sent before the error occurred
* The stream is terminated after this event
* On 500-class errors, `error.message` is replaced with a generic string and `provider_code` is omitted to prevent leaking upstream details

#### Non-streaming requests

Non-streaming requests send the status at the same point. If the provider returns headers and then fails, you receive a `200 OK` whose JSON body holds only an `error` object and no `choices`; its `id` identifies the generation when you report the failure. Check the body for an `error` field even on a `200`, rather than relying on the status alone.

## Typed error codes

When a provider error reaches your application, OpenRouter tags it with a
canonical `error_type` string — both on the non-streaming response body and
on mid-stream SSE events. Use this value, not the HTTP status code alone, to
programmatically distinguish error categories. It is stable across all three
API skins even when the native protocol code is lossy.

Where `error_type` appears depends on the skin and path:

* **Chat Completions**: `error.metadata.error_type` — on the mid-stream error
  chunk (see [Mid-Stream Errors](#mid-stream-errors)) and on the non-streaming
  response when a provider error interrupts generation.
* **Anthropic Messages**: `error.error_type` on the SSE `error` event and the
  non-streaming error envelope.
* **Responses**: top-level `error_type` on the failed response, for both the
  streaming `response.failed` event and the non-streaming JSON body.

The HTTP status each `error_type` maps to is listed in the tables below.

### Token and length limits

| `error_type`              | HTTP Status                   | Description                                                                                                                 |
| ------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `context_length_exceeded` | {HTTPStatus.S400_Bad_Request} | The combined input and output tokens exceed the model's context window.                                                     |
| `max_tokens_exceeded`     | {HTTPStatus.S400_Bad_Request} | Generation stopped because `max_tokens` (or `max_completion_tokens`) was reached.                                           |
| `token_limit_exceeded`    | {HTTPStatus.S400_Bad_Request} | A token budget enforced by OpenRouter (e.g. credit-based cap) was exceeded.                                                 |
| `string_too_long`         | {HTTPStatus.S400_Bad_Request} | A single string field in the request (system prompt, user message, etc.) exceeded the provider's per-field character limit. |

### Authentication and authorization

| `error_type`        | HTTP Status                        | Description                                                                                                                  |
| ------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `authentication`    | {HTTPStatus.S401_Unauthorized}     | The API key is missing, invalid, or revoked.                                                                                 |
| `permission_denied` | {HTTPStatus.S403_Forbidden}        | The key is valid but lacks the required permission or the request was blocked by a [guardrail](/docs/guides/features/guardrails). |
| `payment_required`  | {HTTPStatus.S402_Payment_Required} | The account or API key has insufficient credits. [Add credits](https://openrouter.ai/credits) and retry.                     |

### Rate limiting and availability

| `error_type`           | HTTP Status                           | Description                                                                                                                                  |
| ---------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `rate_limit_exceeded`  | {HTTPStatus.S429_Too_Many_Requests}   | Request- or token-level rate limit hit. Respect the `Retry-After` header before retrying.                                                    |
| `provider_overloaded`  | {HTTPStatus.S503_Service_Unavailable} | The upstream provider is temporarily overloaded. Retry after a short delay.                                                                  |
| `provider_unavailable` | {HTTPStatus.S502_Bad_Gateway}         | The upstream provider returned an invalid or empty response. OpenRouter may auto-retry with another provider if fallback routing is enabled. |

### Request validation

| `error_type`          | HTTP Status                            | Description                                                                                   |
| --------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `invalid_request`     | {HTTPStatus.S400_Bad_Request}          | A request parameter is malformed or missing.                                                  |
| `invalid_prompt`      | {HTTPStatus.S400_Bad_Request}          | A specific message in the `messages` array is invalid (e.g. unsupported role, empty content). |
| `not_found`           | {HTTPStatus.S404_Not_Found}            | The requested resource (model, file, etc.) does not exist.                                    |
| `precondition_failed` | {HTTPStatus.S412_Precondition_Failed}  | A precondition header (e.g. `If-Match`) was not satisfied.                                    |
| `payload_too_large`   | {HTTPStatus.S413_Payload_Too_Large}    | The request body exceeds the maximum allowed size.                                            |
| `unprocessable`       | {HTTPStatus.S422_Unprocessable_Entity} | The request is syntactically valid but semantically unprocessable.                            |

### Content policy

| `error_type`               | HTTP Status                   | Description                                                                          |
| -------------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `content_policy_violation` | {HTTPStatus.S400_Bad_Request} | The input or output was flagged by a content filter (provider- or OpenRouter-level). |
| `refusal`                  | {HTTPStatus.S400_Bad_Request} | The model explicitly refused to comply with the request (e.g. safety refusal).       |

### Image errors

| `error_type`               | HTTP Status                   | Description                                                                                                   |
| -------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `invalid_image`            | {HTTPStatus.S400_Bad_Request} | An image in the request is corrupt or unreadable.                                                             |
| `image_too_large`          | {HTTPStatus.S400_Bad_Request} | An image exceeds the provider's maximum file size or pixel dimensions.                                        |
| `image_too_small`          | {HTTPStatus.S400_Bad_Request} | An image is below the provider's minimum pixel dimensions.                                                    |
| `unsupported_image_format` | {HTTPStatus.S400_Bad_Request} | The image format is not supported by the provider.                                                            |
| `image_not_found`          | {HTTPStatus.S404_Not_Found}   | The referenced image URL or file ID could not be resolved.                                                    |
| `image_download_failed`    | {HTTPStatus.S400_Bad_Request} | OpenRouter could not download the image from the provided URL (DNS failure, timeout, non-200 response, etc.). |

### Generic

| `error_type` | HTTP Status                             | Description                                                                                                             |
| ------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `server`     | {HTTPStatus.S500_Internal_Server_Error} | An unexpected internal error. The upstream error message is masked on this type.                                        |
| `timeout`    | {HTTPStatus.S504_Gateway_Timeout}       | The provider did not respond within the allowed time.                                                                   |
| `unmapped`   | {HTTPStatus.S500_Internal_Server_Error} | An upstream error that doesn't map to any known category. `error.metadata.provider_code` may contain the original code. |

## Skin-specific error formats

OpenRouter exposes three API skins. Each translates the same internal provider error types into its own wire format, for non-streaming responses and in-stream errors alike. In every case `error_type` is the stable field; the wire location differs per skin.

### Chat Completions (`/api/v1/chat/completions`)

Mid-stream errors appear as a `chat.completion.chunk` with a top-level `error` object (shape shown [above](#mid-stream-errors)). The `error.metadata.error_type` field carries the typed code.

For non-streaming requests where a provider error occurs, the error is embedded in the final response alongside any partial content:

```json lines theme={null}
{
  "choices": [{
    "message": { "role": "assistant", "content": "partial output..." },
    "finish_reason": "error",
    "error": {
      "code": 502,
      "message": "Provider disconnected mid-stream",
      "metadata": { "error_type": "provider_unavailable" }
    }
  }]
}
```

### Responses API (`/api/v1/responses`)

The Responses API maps internal error types to the OpenAI Responses error code set. The mapping is narrower — many distinct internal types collapse to `server_error` — so the precise reason is preserved in a top-level `error_type` field on the response, outside the native `error` object:

| Internal `error_type`                                                                | Responses API `code`             |
| ------------------------------------------------------------------------------------ | -------------------------------- |
| `rate_limit_exceeded`                                                                | `rate_limit_exceeded`            |
| `context_length_exceeded`, `invalid_request`                                         | `invalid_prompt`                 |
| `content_policy_violation`                                                           | `image_content_policy_violation` |
| `authentication`, `provider_overloaded`, `provider_unavailable`, `timeout`, `server` | `server_error`                   |
| All others (including `invalid_prompt`)                                              | `server_error`                   |

Both the streaming terminal event and the non-streaming JSON body carry the canonical `error_type` at the top level of the response object. For example, an authentication failure collapses to the native `server_error` code but keeps `error_type: "authentication"`:

```json lines theme={null}
{
  "id": "resp_abc123",
  "status": "failed",
  "error": { "code": "server_error", "message": "Invalid credentials" },
  "error_type": "authentication"
}
```

Streaming errors surface as one of three SSE event types, each wrapping the same response object:

1. **`response.failed`** — terminal event when the response could not complete:
   ```json lines theme={null}
   {
     "type": "response.failed",
     "response": {
       "id": "resp_abc123",
       "status": "failed",
       "error": { "code": "server_error", "message": "Internal server error" },
       "error_type": "server"
     }
   }
   ```

2. **`response.error`** — error during response generation:
   ```json lines theme={null}
   {
     "type": "response.error",
     "error": { "code": "rate_limit_exceeded", "message": "Rate limit exceeded" }
   }
   ```

3. **`error`** — plain error event (matches upstream OpenAI behavior):
   ```json lines theme={null}
   {
     "type": "error",
     "error": { "code": "invalid_api_key", "message": "Invalid API key provided" }
   }
   ```

#### Error code transformations

Certain token/length errors are transformed into successful completions instead of failures:

| `error_type`              | Transformed To | Finish Reason |
| ------------------------- | -------------- | ------------- |
| `context_length_exceeded` | Success        | `length`      |
| `max_tokens_exceeded`     | Success        | `length`      |
| `token_limit_exceeded`    | Success        | `length`      |
| `string_too_long`         | Success        | `length`      |

This allows graceful handling of limit-based errors without treating them as failures.

### Anthropic Messages (`/api/v1/messages`)

The Anthropic Messages skin maps internal types to Anthropic-native error type strings:

| Internal `error_type`                                                         | Anthropic `error.type`  |
| ----------------------------------------------------------------------------- | ----------------------- |
| `authentication`                                                              | `authentication_error`  |
| `permission_denied`                                                           | `permission_error`      |
| `payment_required`                                                            | `billing_error`         |
| `not_found`, `image_not_found`                                                | `not_found_error`       |
| `rate_limit_exceeded`                                                         | `rate_limit_error`      |
| `provider_overloaded`                                                         | `overloaded_error`      |
| `timeout`                                                                     | `timeout_error`         |
| `context_length_exceeded`, `content_policy_violation`, `invalid_request`, ... | `invalid_request_error` |
| `provider_unavailable`, `server`, `unmapped`, ...                             | `api_error`             |

Because the native `error.type` is lossy (many internal types collapse to `api_error`), the canonical `error_type` is added inside the `error` object alongside it. This holds for both the non-streaming error envelope and mid-stream SSE `error` events.

Non-streaming error envelope (pre-Router errors such as authentication failures carry a `null` `request_id`; post-Router errors carry the `gen-` generation ID):

```json lines theme={null}
{
  "type": "error",
  "error": {
    "type": "authentication_error",
    "message": "Invalid credentials",
    "error_type": "authentication"
  },
  "request_id": null
}
```

Mid-stream errors are emitted as an SSE `error` event with the same shape:

```json lines theme={null}
{
  "type": "error",
  "error": {
    "type": "overloaded_error",
    "message": "Provider is temporarily overloaded",
    "error_type": "provider_overloaded"
  }
}
```

## Debugging

OpenRouter provides a `debug` option that allows you to inspect the exact request body that was sent to the upstream provider. This works with both the Chat Completions API (`/api/v1/chat/completions`) and the Responses API (`/api/v1/responses`). Useful for understanding how OpenRouter transforms your request parameters for different providers.

### Debug option shape

The debug option is an object with the following shape:

```typescript lines theme={null}
type DebugOptions = {
  echo_upstream_body?: boolean; // If true, returns the transformed request body sent to the provider
};
```

### Usage

To enable debug output, include the `debug` parameter in your request:

#### Chat Completions

<CodeGroup>
  ```typescript title="TypeScript" expandable lines theme={null}
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

  ```python title="Python" expandable lines theme={null}
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

#### Responses API

<CodeGroup>
  ```typescript title="TypeScript" expandable lines theme={null}
  fetch('https://openrouter.ai/api/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-haiku-4.5',
      stream: true,
      input: 'Hello!',
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

    if (parsed.type === 'response.debug') {
      console.log('\nDebug:', JSON.stringify(parsed.debug, null, 2));
    }
  }
  ```

  ```python title="Python" expandable lines theme={null}
  import requests
  import json

  response = requests.post(
    url="https://openrouter.ai/api/v1/responses",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "model": "anthropic/claude-haiku-4.5",
      "stream": True,
      "input": "Hello!",
      "debug": {
        "echo_upstream_body": True
      }
    }),
    stream=True
  )

  for line in response.iter_lines():
    if line:
      text = line.decode('utf-8')
      if 'response.debug' in text:
        print(text)
  ```
</CodeGroup>

### Debug response format

#### Chat Completions

When `debug.echo_upstream_body` is set to `true`, OpenRouter sends a debug chunk as the **first chunk** in the streaming response. This chunk has an empty `choices` array and includes a `debug` field with the transformed request body:

```json expandable lines theme={null}
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

#### Responses API

On the Responses API, debug data arrives as a `response.debug` SSE event:

```json lines theme={null}
{
  "type": "response.debug",
  "debug": {
    "echo_upstream_body": {
      "model": "claude-haiku-4-5-20251001",
      "messages": [
        { "role": "user", "content": "Hello!" }
      ],
      "stream": true,
      "max_tokens": 64000,
      "temperature": 1
    }
  },
  "sequence_number": 0
}
```

### Important notes

<Warning>
  **Streaming Only**

  The debug option **only works with streaming mode** (`stream: true`). Non-streaming requests will ignore the debug parameter.
</Warning>

<Warning>
  **Not for Production**

  The debug flag should **not be used in production environments**. It is intended for development and debugging purposes only, as it may potentially return sensitive information included in the request that was not intended to be visible elsewhere.
</Warning>

### Use cases

The debug output is particularly useful for:

1. **Understanding Parameter Transformations**: See how OpenRouter maps your parameters to provider-specific formats (e.g., how `max_tokens` is set, how `temperature` is handled).

2. **Verifying Message Formatting**: Check how OpenRouter combines and formats your messages for different providers (e.g., how system messages are concatenated, how user messages are merged).

3. **Checking Applied Defaults**: See what default values OpenRouter applies when parameters are not specified in your request.

4. **Debugging Provider Fallbacks**: When using provider fallbacks, a debug chunk will be sent for **each attempted provider**, allowing you to see which providers were tried and what parameters were sent to each.

### Privacy and redaction

OpenRouter will make a best effort to automatically redact potentially sensitive or noisy data from debug output. Remember that the debug option is not intended for production.
