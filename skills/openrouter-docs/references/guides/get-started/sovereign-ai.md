> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Sovereign AI

Sovereign AI refers to a nation's or region's ability to develop, deploy, and control artificial intelligence systems within its own borders, using local infrastructure and under local regulatory frameworks. As AI becomes critical infrastructure, governments and enterprises increasingly require that AI workloads -- including the data they process -- remain within specific geographic and jurisdictional boundaries.

## Why Sovereign AI Matters

Sovereign AI is driven by two converging forces:

### Regulatory Compliance

Regulations like the EU AI Act, GDPR, and sector-specific rules (healthcare, finance, defense) impose strict requirements on where data can be processed and stored. Organizations operating across jurisdictions need infrastructure that respects these boundaries.

### Data Residency and Privacy

Sensitive data -- whether personal, financial, or classified -- may not legally or ethically leave a particular jurisdiction. Sovereign AI ensures that prompts and completions are processed entirely within a designated region, with no cross-border data transfers.

## How OpenRouter Enables Sovereign AI

OpenRouter provides several features that enable sovereign AI deployments today, allowing enterprises to maintain control over where their AI workloads are processed.

### EU In-Region Routing

For enterprise customers, OpenRouter supports EU in-region routing. When enabled, your requests are guaranteed to only be decrypted within the designated region, and are only routed to providers operating in that region. This means prompts and completions are processed entirely within the European Union -- they never leave the EU at any point in the request lifecycle.

To use EU in-region routing, send API requests through the EU-specific base URL:

```
https://eu.openrouter.ai
```

<CodeGroup>
  ```typescript title="TypeScript SDK"
  import { OpenRouter } from '@openrouter/sdk';

  const openRouter = new OpenRouter({
    apiKey: '<OPENROUTER_API_KEY>',
    serverURL: 'https://eu.openrouter.ai/api/v1',
  });

  const completion = await openRouter.chat.send({
    model: 'meta-llama/llama-3.3-70b-instruct',
    messages: [{ role: 'user', content: 'Hello' }],
    stream: false,
  });
  ```

  ```typescript title="TypeScript (fetch)"
  fetch('https://eu.openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-70b-instruct',
      messages: [{ role: 'user', content: 'Hello' }],
    }),
  });
  ```

  ```python title="Python"
  import requests

  headers = {
    'Authorization': 'Bearer <OPENROUTER_API_KEY>',
    'Content-Type': 'application/json',
  }

  response = requests.post('https://eu.openrouter.ai/api/v1/chat/completions', headers=headers, json={
    'model': 'meta-llama/llama-3.3-70b-instruct',
    'messages': [{ 'role': 'user', 'content': 'Hello' }],
  })
  ```

  ```bash title="cURL"
  curl https://eu.openrouter.ai/api/v1/chat/completions \
    -H "Authorization: Bearer <OPENROUTER_API_KEY>" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "meta-llama/llama-3.3-70b-instruct",
      "messages": [{"role": "user", "content": "Hello"}]
    }'
  ```
</CodeGroup>

<Info title="EU-only models list">
  To see which models are available for EU in-region routing, call `/api/v1/models/user` through the EU domain. [Learn more](/docs/api/api-reference/models/list-models-user)
</Info>

EU in-region routing is available for enterprise customers by request. [Contact our enterprise team](https://openrouter.ai/enterprise/form) to enable it for your account.

### Zero Data Retention (ZDR)

[Zero Data Retention](/docs/guides/features/zdr) ensures that providers do not store your prompts or responses. This is a key component of sovereign AI, as it guarantees that no data persists outside your control after a request completes.

Enable ZDR globally in your [privacy settings](https://openrouter.ai/settings/privacy) or per-request:

```json
{
  "model": "meta-llama/llama-3.3-70b-instruct",
  "messages": [{ "role": "user", "content": "Hello" }],
  "provider": {
    "zdr": true
  }
}
```

### Data Collection Controls

Control whether providers can collect your data with the `data_collection` parameter:

```json
{
  "provider": {
    "data_collection": "deny"
  }
}
```

When set to `"deny"`, your requests are only routed to providers that do not collect user data. This can also be configured as an account-wide default in your [privacy settings](https://openrouter.ai/settings/privacy).

## Building a Sovereign AI Stack with OpenRouter

Combining these features, you can build a fully sovereign AI deployment:

1. **Enable EU in-region routing** to keep all data within the EU
2. **Enforce ZDR** to prevent any data retention by providers
3. **Deny data collection** to prevent training on your data

This gives you a single API with unified billing while maintaining full control over data residency, privacy, and compliance -- without the complexity of managing relationships with individual providers in each region.

## Getting Started

Sovereign AI features are available to all OpenRouter users, with EU in-region routing available for enterprise customers. To get started:

* [Create an API key](https://openrouter.ai/settings/keys) and start using [provider routing](/docs/guides/routing/provider-selection) to control where your requests are processed
* Enable [ZDR](/docs/guides/features/zdr) and [data collection controls](/docs/guides/privacy/provider-logging) for privacy compliance
* [Contact our enterprise team](https://openrouter.ai/enterprise/form) to enable EU in-region routing and discuss additional sovereign AI requirements

For a complete enterprise setup guide, see the [Enterprise Quickstart](/docs/guides/get-started/enterprise-quickstart).