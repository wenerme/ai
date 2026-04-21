---
title: Supported model types
description: Review which AI model types AI Gateway Guardrails evaluates for text generation, embeddings, and unknown models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/features/guardrails/supported-model-types.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Supported model types

AI Gateway's Guardrails detects the type of AI model being used and applies safety checks accordingly:

* **Text generation models**: Both prompts and responses are evaluated.
* **Embedding models**: Only the prompt is evaluated, as the response consists of numerical embeddings, which are not meaningful for moderation.
* **Unknown models**: If the model type cannot be determined, only the prompt is evaluated, while the response bypass Guardrails.

Note

Guardrails does not yet support streaming responses. Support for streaming is planned for a future update.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/guardrails/","name":"Guardrails"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/features/guardrails/supported-model-types/","name":"Supported model types"}}]}
```
