---
title: Authenticated Gateway
description: Add security by requiring a valid authorization token for each request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Authenticated Gateway

AI Gateway requires a valid Cloudflare API token for each request. This prevents unauthorized access and protects against invalid requests that can inflate log storage usage.

When using the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), pass your Cloudflare API token in the standard `Authorization` header. When using [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) at `gateway.ai.cloudflare.com`, use the `cf-aig-authorization` header instead.

Note

The `cf-aig-authorization` header is used with the `gateway.ai.cloudflare.com` endpoints, which continue to work. For new integrations, we recommend using the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) at `api.cloudflare.com`, which uses the standard `Authorization` header.

## Setting up Authenticated Gateway using the dashboard

1. Go to the Settings for the specific gateway you want to enable authentication for.
2. Select **Create authentication token** to generate a custom token with the required `Run` permissions. Be sure to securely save this token, as it will not be displayed again.
3. Include the API token in each request:  
   * If using the REST API (`/ai/run`), include your Cloudflare API token in the standard `Authorization` header.  
   * If using [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) at `gateway.ai.cloudflare.com`, use the `cf-aig-authorization` header.
4. Return to the settings page and toggle on Authenticated Gateway.

## Example requests

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{"model": "openai/gpt-4.1-mini", "messages": [{"role": "user", "content": "What is Cloudflare?"}]}'


```

Using the OpenAI SDK:

JavaScript

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: CLOUDFLARE_API_TOKEN,

  baseURL: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`,

});


const response = await openai.chat.completions.create({

  model: "openai/gpt-4.1-mini",

  messages: [{ role: "user", content: "What is Cloudflare?" }],

});


```

Using the Vercel AI SDK:

JavaScript

```

import { createOpenAI } from "@ai-sdk/openai";


const openai = createOpenAI({

  apiKey: CLOUDFLARE_API_TOKEN,

  baseURL: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`,

});


```

## Expected behavior

Note

When an AI Gateway is accessed from a Cloudflare Worker using a **binding**, the `cf-aig-authorization` header does not need to be manually included.  
Requests made through bindings are **pre-authenticated** within the associated Cloudflare account.

The following table outlines gateway behavior based on the authentication settings and header status:

| Authentication Setting | Header Info    | Gateway State           | Response                                   |
| ---------------------- | -------------- | ----------------------- | ------------------------------------------ |
| On                     | Header present | Authenticated gateway   | Request succeeds                           |
| On                     | No header      | Error                   | Request fails due to missing authorization |
| Off                    | Header present | Unauthenticated gateway | Request succeeds                           |
| Off                    | No header      | Unauthenticated gateway | Request succeeds                           |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/configuration/authentication/","name":"Authenticated Gateway"}}]}
```
