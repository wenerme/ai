> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

> Rate Limits

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

## Rate Limits and Credits Remaining

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

There are a few rate limits that apply to certain types of requests, regardless of account status:

1. Free usage limits: If you're using a free model variant (with an ID ending in <code>{sep}{Variant.Free}</code>), you can make up to {FREE_MODEL_RATE_LIMIT_RPM} requests per minute. The following per-day limits apply:

* If you have purchased less than {FREE_MODEL_CREDITS_THRESHOLD} credits, you're limited to {FREE_MODEL_NO_CREDITS_RPD} <code>{sep}{Variant.Free}</code> model requests per day.

* If you purchase at least {FREE_MODEL_CREDITS_THRESHOLD} credits, your daily limit is increased to {FREE_MODEL_HAS_CREDITS_RPD} <code>{sep}{Variant.Free}</code> model requests per day.

2. **DDoS protection**: Cloudflare's DDoS protection will block requests that dramatically exceed reasonable usage.

If your account has a negative credit balance, you may see <code>{HTTPStatus.S402_Payment_Required}</code> errors, including for free models. Adding credits to put your balance above zero allows you to use those models again.
