# Priority processing

Priority processing delivers significantly lower and more consistent latency compared to Standard processing while keeping pay-as-you-go flexibility.

Priority processing is ideal for high-value, user-facing applications with regular traffic where latency is paramount. Priority processing should not be used for data processing, evaluations, or other highly erratic traffic.

## Configuring Priority processing

Requests to the Responses or Completions endpoints can be configured to use Priority processing through either a request parameter, or a Project setting.

To opt-in to Priority processing at the request level, include the [`service_tier=priority`](https://platform.openai.com/docs/api-reference/responses/create#responses-create-service_tier) parameter for Completions or Responses.

Create a response with priority processing

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5",
    "input": "What does 'fit check for my napalm era' mean?",
    "service_tier": "priority"
  }'
```

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5",
  input: "What does 'fit check for my napalm era' mean?",
  service_tier: "priority"
});

console.log(response);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="What does 'fit check for my napalm era' mean?",
    service_tier="priority"
)
print(response)
```


To opt in at the Project level, navigate to the Settings page, select the General tab under Project, then change the Project Service Tier to Priority. Once configured on the project, requests that don't specify a `service_tier` will default to Priority. Note that requests for the project will be gradually transitioned to Priority over time.

The `service_tier` field in the [Responses](https://platform.openai.com/docs/api-reference/responses/object#responses/object-service_tier) or [Completions](https://platform.openai.com/docs/api-reference/chat/object#chat/object-service_tier) response objects will contain which service tier was used to process the request.

## Rate limits and ramp rate

**Baseline limits**

Priority consumption is treated like Standard for rate‑limit accounting. Use your usual retry and backoff logic. For a given model, the rate limit is shared between Standard and Priority processing.

**Ramp rate limit**

If your traffic ramps too quickly, some Priority requests may be downgraded to Standard and billed at Standard rates. If the ramp rate limit is exceeded, the response will show service_tier="default". Currently, the ramp rate limit may apply if you’re sending at least 1 million TPM and >50% TPM increase within 15 minutes.

To avoid triggering the ramp rate limit, we recommend:

- Ramp gradually when changing models or snapshots
- Use feature flags to shift traffic over hours, not instantly.
- Avoid large ETL or batch jobs on Priority

## Usage considerations

- Per token costs are billed at a premium to standard - see [pricing](https://developers.openai.com/api/docs/pricing) for more information.
- Cache discounts are still applied for priority processing requests.
- Priority processing applies for multimodal / image input requests as well.
- Requests handled with priority processing can be viewed in the dashboard using the "group by service tier" option.
- See the [pricing page](https://developers.openai.com/api/docs/pricing) for which models currently support Priority processing.
- Long context, fine-tuned models and embeddings are not yet supported.