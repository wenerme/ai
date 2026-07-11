> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

> Credit Limits and Rate Limits

export const Variant = {
  Free: 'free'
};

export const sep = ':';

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

export const FREE_MODEL_RATE_LIMIT_RPM = 20;

export const FREE_MODEL_NO_CREDITS_RPD = 50;

export const FREE_MODEL_HAS_CREDITS_RPD = 1000;

export const FREE_MODEL_CREDITS_THRESHOLD = 10;

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

export const StatusCode = ({code}) => {
  const [popupPosition, setPopupPosition] = useState(null);
  const openPopup = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = 288;
    const margin = 8;
    const left = Math.min(Math.max(rect.left + rect.width / 2 - width / 2, margin), window.innerWidth - width - margin);
    setPopupPosition({
      left,
      top: rect.bottom + margin,
      width
    });
  };
  const closePopup = () => setPopupPosition(null);
  const STATUS_CODE_INFO = {
    200: {
      name: 'OK',
      description: 'The request succeeded. For streaming responses, errors occurring after this status is sent arrive as SSE events instead.'
    },
    400: {
      name: 'Bad Request',
      description: 'The request is invalid or missing required parameters, or was blocked by CORS.'
    },
    401: {
      name: 'Unauthorized',
      description: 'Invalid credentials — the API key is missing, invalid, disabled, or the OAuth session expired.'
    },
    402: {
      name: 'Payment Required',
      description: 'Your account or API key has insufficient credits. Add credits to bring your balance above zero, or check per-key credit limits.'
    },
    403: {
      name: 'Forbidden',
      description: 'Insufficient permissions, a guardrail block, or the input was flagged by moderation.'
    },
    404: {
      name: 'Not Found',
      description: 'The requested resource does not exist.'
    },
    408: {
      name: 'Request Timeout',
      description: 'The request timed out before completing.'
    },
    429: {
      name: 'Too Many Requests',
      description: 'You are being rate limited — either by an OpenRouter platform limit (free-model caps, DDoS protection) or by the upstream provider. Retry with exponential backoff and honor the Retry-After header when present.'
    },
    500: {
      name: 'Internal Server Error',
      description: 'Something went wrong on the server while handling the request.'
    },
    502: {
      name: 'Bad Gateway',
      description: 'The chosen model is down or the provider returned an invalid response.'
    },
    503: {
      name: 'Service Unavailable',
      description: 'No available model provider meets your routing requirements. Consider relaxing provider preferences or adding fallback models.'
    }
  };
  const info = STATUS_CODE_INFO[code];
  if (!info) {
    return <code>{code}</code>;
  }
  return <span className="relative inline-block" onMouseEnter={openPopup} onMouseLeave={closePopup} onFocus={openPopup} onBlur={closePopup}>
      <code tabIndex={0} aria-label={`HTTP ${code} ${info.name}: ${info.description}`} className="cursor-help underline decoration-dotted underline-offset-4">
        {code}
      </code>
      {popupPosition && <span role="tooltip" className="fixed z-50 block rounded-lg border border-gray-950/10 bg-white p-3 text-left shadow-lg dark:border-white/10 dark:bg-gray-900" style={{
    left: popupPosition.left,
    top: popupPosition.top,
    width: popupPosition.width
  }}>
          <span className="mb-1 flex items-baseline gap-2">
            <code className="text-sm font-semibold">{code}</code>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {info.name}
            </span>
          </span>
          <span className="block text-xs font-normal leading-relaxed text-gray-600 dark:text-gray-400">
            {info.description}
          </span>
        </span>}
    </span>;
};

export const Template = ({children, data}) => {
  const replace = s => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in data) ? data[k] : `{{${k}}}`);
  const leafText = node => typeof node === 'string' ? node : node?.$$typeof && typeof node.props?.children === 'string' ? node.props.children : null;
  const collapseTokens = nodes => {
    const out = [];
    let i = 0;
    while (i < nodes.length) {
      const ta = leafText(nodes[i]);
      const tb = leafText(nodes[i + 1]);
      const tc = leafText(nodes[i + 2]);
      if (ta != null && tb != null && tc != null) {
        const m = (ta + tb + tc).match(/^([\s\S]*)\{\{(\w+)\}\}([\s\S]*)$/);
        if (m && (m[2] in data)) {
          out.push(m[1] + data[m[2]] + m[3]);
          i += 3;
          continue;
        }
      }
      out.push(nodes[i]);
      i++;
    }
    return out;
  };
  const process = node => {
    if (typeof node === 'string') return replace(node);
    if (Array.isArray(node)) return collapseTokens(node.map(process));
    if (node && typeof node === 'object') {
      if (node.$$typeof) return {
        ...node,
        props: process(node.props)
      };
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, process(v)]));
    }
    return node;
  };
  return <>{process(children)}</>;
};

<Tip>
  Making additional accounts or API keys will not affect your rate limits, as we
  govern capacity globally. We do however have different rate limits for
  different models, so you can share the load that way if you do run into
  issues.
</Tip>

OpenRouter enforces two kinds of limits:

| Limit type                      | What it governs                                                              | Error on exceeding                                      | Where to check                                |
| ------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| [Credit limits](#credit-limits) | How much you can spend (account balance and per-key credit caps)             | <StatusCode code={HTTPStatus.S402_Payment_Required} />  | `GET /api/v1/key` → `limit_remaining`         |
| [Rate limits](#rate-limits)     | How many requests you can make (free-model request caps and DDoS protection) | <StatusCode code={HTTPStatus.S429_Too_Many_Requests} /> | `X-RateLimit-*` headers on the error response |

## Checking Your Limits

To check the rate limit or credits left on an API key, make a GET request to `https://openrouter.ai/api/v1/key`.

<Template data={{ API_KEY_REF }}>
  <CodeGroup>
    ```typescript title="TypeScript SDK" lines theme={null}
    import { OpenRouter } from '@openrouter/sdk';

    const openRouter = new OpenRouter({
      apiKey: '{{API_KEY_REF}}',
    });

    const keyInfo = await openRouter.apiKeys.getCurrent();
    console.log(keyInfo);
    ```

    ```python title="Python" lines theme={null}
    import requests
    import json

    response = requests.get(
      url="https://openrouter.ai/api/v1/key",
      headers={
        "Authorization": f"Bearer {{API_KEY_REF}}"
      }
    )

    print(json.dumps(response.json(), indent=2))
    ```

    ```typescript title="TypeScript (Raw API)" lines theme={null}
    const response = await fetch('https://openrouter.ai/api/v1/key', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer {{API_KEY_REF}}',
      },
    });

    const keyInfo = await response.json();
    console.log(keyInfo);
    ```
  </CodeGroup>
</Template>

If you submit a valid API key, you should get a response of the form:

```typescript title="TypeScript" expandable lines theme={null}
type Key = {
  data: {
    label: string;
    limit: number | null; // Credit limit for the key, or null if unlimited
    limit_reset: string | null; // Type of limit reset for the key, or null if never resets
    limit_remaining: number | null; // Remaining credits for the key, or null if unlimited
    include_byok_in_limit: boolean;  // Whether to include external BYOK usage in the credit limit

    usage: number; // Number of credits used (all time)
    usage_daily: number; // Number of credits used (current UTC day)
    usage_weekly: number; // ... (current UTC week, starting Monday)
    usage_monthly: number; // ... (current UTC month)

    byok_usage: number; // Same for external BYOK usage
    byok_usage_daily: number;
    byok_usage_weekly: number;
    byok_usage_monthly: number;

    is_free_tier: boolean; // Whether the user has paid for credits before
    // rate_limit: { ... } // A deprecated object in the response, safe to ignore
  };
};
```

## Credit Limits

Credit limits govern how much you can spend. They come from two places:

1. **Account balance** — your available credits across the account. If your account has a negative credit balance, you may see <StatusCode code={HTTPStatus.S402_Payment_Required} /> errors, including for free models. Adding credits to put your balance above zero allows you to use those models again.
2. **Per-key credit limits** — an optional spending cap configured on an individual API key. The `limit`, `limit_reset`, and `limit_remaining` fields in the `GET /api/v1/key` response above describe this cap and how much of it remains.

### Handling 402 errors

To resolve <StatusCode code={HTTPStatus.S402_Payment_Required} /> errors:

* **Add credits** to bring your account balance above zero.
* **Check per-key limits.** If `limit_remaining` on the key is exhausted, raise the key's credit limit or wait for it to reset (see `limit_reset`).
* **Monitor proactively.** Call `GET /api/v1/key` as shown above to track `limit_remaining` and usage before requests start failing.

## Rate Limits

Rate limits govern how many requests you can make. There are a few rate limits that apply to certain types of requests, regardless of account status:

1. **Free usage limits**: If you're using a free model variant (with an ID ending in <code>{sep}{Variant.Free}</code>), the following limits apply:

| Credits purchased (all time)             | Requests per minute         | Requests per day             |
| ---------------------------------------- | --------------------------- | ---------------------------- |
| Less than {FREE_MODEL_CREDITS_THRESHOLD} | {FREE_MODEL_RATE_LIMIT_RPM} | {FREE_MODEL_NO_CREDITS_RPD}  |
| At least {FREE_MODEL_CREDITS_THRESHOLD}  | {FREE_MODEL_RATE_LIMIT_RPM} | {FREE_MODEL_HAS_CREDITS_RPD} |

2. **DDoS protection**: Cloudflare's DDoS protection will block requests that dramatically exceed reasonable usage.

### Handling 429 errors

Requests rejected with <StatusCode code={HTTPStatus.S429_Too_Many_Requests} /> fail with a standard [error response](/api/reference/errors-and-debugging):

```json lines theme={null}
{
  "error": {
    "code": 429,
    "message": "Rate limit exceeded",
    "metadata": {
      "error_type": "rate_limit_exceeded"
    }
  }
}
```

A <StatusCode code={HTTPStatus.S429_Too_Many_Requests} /> error can come from two places:

1. **OpenRouter** — you hit one of the platform limits above (free-model requests per minute or per day, or DDoS protection).
2. **The upstream provider** — the provider serving your request is rate limiting or at capacity. In this case `error.metadata.provider_code` carries the provider's original error code when available, and [fallback routing](/guides/routing/provider-selection) retries other providers for the same model automatically before the error reaches you. You can also specify [fallback models](/guides/routing/model-fallbacks) to try a different model when all providers for the first are exhausted.

<Note>
  Successful inference responses do not include `X-RateLimit-*` headers. When
  OpenRouter itself returns a <StatusCode code={HTTPStatus.S429_Too_Many_Requests} />
  error for a platform limit, the error response
  carries `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset`
  headers describing the limit that was hit. When every attempted provider
  returned a retry hint, the error response also carries a `Retry-After`
  header. To monitor your remaining quota before hitting a limit, call
  `GET /api/v1/key` as shown above.
</Note>

To resolve <StatusCode code={HTTPStatus.S429_Too_Many_Requests} /> errors:

* **Retry with exponential backoff.** Rate limits are transient; wait and retry rather than immediately re-sending. Honor the `Retry-After` header when present.
* **On free variants**, purchase at least {FREE_MODEL_CREDITS_THRESHOLD} credits to raise your daily limit, or switch to the paid variant of the model, which has no platform-level request cap.
* **For provider-side limits**, add [fallback models](/guides/routing/model-fallbacks) or relax [provider routing preferences](/guides/routing/provider-selection) so more providers are eligible to serve the request.

#### Mid-stream rate limits

If a rate limit is hit after streaming has started, the error arrives as an SSE event with `finish_reason: "error"` instead of an HTTP <StatusCode code={HTTPStatus.S429_Too_Many_Requests} />, since the <StatusCode code={HTTPStatus.S200_OK} /> status was already sent:

```text lines theme={null}
data: {"id":"cmpl-abc123","object":"chat.completion.chunk","created":1234567890,"model":"openai/gpt-4o","provider":"openai","error":{"code":429,"message":"Rate limit exceeded"},"choices":[{"index":0,"delta":{"content":""},"finish_reason":"error"}]}
```

See [Handling Errors During Streaming](/api/reference/streaming#handling-errors-during-streaming) for details and code examples.
