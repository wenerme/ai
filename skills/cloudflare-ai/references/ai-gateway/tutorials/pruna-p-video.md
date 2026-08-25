---
description: Learn how to call prunaai/p-video on Replicate through AI Gateway
title: Use Pruna P-video through AI Gateway
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Use Pruna P-video through AI Gateway

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/tutorials/pruna-p-video/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial shows how to call the [Pruna's P-video ↗](https://replicate.com/prunaai/p-video) model on [Replicate](https://developers.cloudflare.com/ai-gateway/usage/providers/replicate/) through AI Gateway.

## Prerequisites

* A [Cloudflare account ↗](https://cloudflare.com/sign-up)
* A [Replicate account ↗](https://replicate.com/) with an API token

## 1\. Get a Replicate API token

1. Go to [replicate.com ↗](https://replicate.com/) and sign up for an account.
2. Once logged in, go to [replicate.com/settings/api-tokens ↗](https://replicate.com/account/api-tokens).
3. Select **Create token** and give it a name.
4. Copy the token and store it somewhere safe.

## 2\. Create an AI Gateway

[Go to **AI Gateway** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select **Create Gateway**.
4. Enter your **Gateway name**. Note: Gateway name has a 64 character limit.
5. In **Workers AI Billing**, choose how Workers AI requests through this gateway are billed:
  * **Standard billing** charges your Cloudflare account at the end of each billing cycle.
  * **Unified billing** deducts from your prepaid AI Gateway credit balance in real time.
6. Select **Create**.

To set up an AI Gateway using the API:

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:

  * `AI Gateway - Read`
  * `AI Gateway - Edit`
2. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [POST request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/create/) to the Cloudflare API.

Note your **Account ID** and **Gateway name** for use in later steps.

To add authentication to your gateway, refer to [Authenticated Gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/).

## 3\. Construct the gateway URL

Replace the standard Replicate API base URL with the AI Gateway URL:

```txt
# Instead of:
https://api.replicate.com/v1

# Use:
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate
```

For example, if your account ID is `abc123` and your gateway is `my-gateway`:

```txt
https://gateway.ai.cloudflare.com/v1/abc123/my-gateway/replicate
```

## 4\. Generate a video

P-video predictions generally complete within 30 seconds. Because this is under Replicate's 60-second synchronous limit, you can use the `Prefer: wait` header to send a request and get the result in a single call:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions \
  --header "Authorization: Bearer {replicate_api_token}" \
  --header "cf-aig-authorization: Bearer {cloudflare_api_token}" \
  --header "Content-Type: application/json" \
  --header "Prefer: wait" \
  --data '{
    "version": "prunaai/p-video",
    "input": {
      "prompt": "A cat walking through a field of flowers in slow motion",
      "duration": 5,
      "aspect_ratio": "16:9",
      "resolution": "720p",
      "fps": 24
    }
  }'
```

* `Authorization` — your Replicate API token (authenticates with Replicate).
* `cf-aig-authorization` — your Cloudflare API token (for authenticated gateways).
* `Prefer: wait` — blocks until the prediction completes instead of returning immediately.

For a full list of available input parameters, check out the [prunaai/p-video model page ↗](https://replicate.com/prunaai/p-video) on Replicate.

When the prediction completes, the response includes the `output` field with a URL to the generated video file.

## 5\. (Optional) Use async polling for longer requests

If your request may exceed 60 seconds (for example, with longer durations or higher resolutions), use async mode instead. Send the request without the `Prefer: wait` header:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions \
  --header "Authorization: Bearer {replicate_api_token}" \
  --header "cf-aig-authorization: Bearer {cloudflare_api_token}" \
  --header "Content-Type: application/json" \
  --data '{
    "version": "prunaai/p-video",
    "input": {
      "prompt": "A cat walking through a field of flowers in slow motion",
      "duration": 5,
      "aspect_ratio": "16:9",
      "resolution": "720p",
      "fps": 24
    }
  }'
```

The response includes a prediction `id`:

```json
{
  "id": "xyz789...",
  "status": "starting",
  "urls": {
    "get": "https://api.replicate.com/v1/predictions/xyz789...",
    "cancel": "https://api.replicate.com/v1/predictions/xyz789.../cancel"
  }
}
```

Poll the prediction status until it completes:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions/{prediction_id} \
  --header "Authorization: Bearer {replicate_api_token}" \
  --header "cf-aig-authorization: Bearer {cloudflare_api_token}"
```

Keep polling until `status` is `succeeded` (or `failed`). When complete, the `output` field contains a URL to the generated video file.

## Next steps

From here you can:

* Use [logging](https://developers.cloudflare.com/ai-gateway/observability/logging/) to monitor requests and debug issues.
* Set up [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) to control usage.
* Use other models on Replicate or our other [supported providers](https://developers.cloudflare.com/ai-gateway/usage/providers/) through AI Gateway.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/tutorials/pruna-p-video/#page","headline":"Use Pruna P-video through AI Gateway · Cloudflare AI Gateway docs","description":"Learn how to call prunaai/p-video on Replicate through AI Gateway","url":"https://developers.cloudflare.com/ai-gateway/tutorials/pruna-p-video/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
