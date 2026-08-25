---
description: Send AI Gateway requests through a hostname that you own, such as ai.example.com.
title: Custom domains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom domains

Last updated Aug 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Custom domains let you send AI Gateway requests through a hostname that you own, such as `ai.example.com`, instead of the default `gateway.ai.cloudflare.com` endpoint.

The hostname identifies your account and gateway, so you can omit the account ID and gateway ID from request URLs. Requests go directly to AI Gateway provider-native routes and OpenAI-compatible `compat` routes.

Custom domains are also the foundation for [identity-aware controls with Cloudflare Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/), which let users authenticate with your identity provider before they can call your gateway.

Note

Custom domains work with the AI Gateway endpoint (`gateway.ai.cloudflare.com`). They do not work with the [Cloudflare REST API](https://developers.cloudflare.com/api/) (`api.cloudflare.com`).

## How it works

For example, if your custom domain is `ai.example.com`, an OpenAI provider request uses:

```txt
https://ai.example.com/openai/v1/chat/completions
```

Instead of:

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/v1/chat/completions
```

The same applies to the OpenAI-compatible endpoint. For example, `https://ai.example.com/compat/chat/completions` routes through the same gateway using the `compat` route.

## Set up a custom domain in the dashboard

To add a custom domain:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **AI** \> **AI Gateway**.
2. Select the gateway you want to configure.
3. Go to the **Domains** tab.
4. Select **Add Domain** and enter the hostname you want to use. Optionally, choose a subdomain.
5. AI Gateway automatically creates the DNS record in the dashboard.

After the domain is set up, you can send requests to it. To require users to authenticate before they can call the gateway, [set up Cloudflare Access on the domain](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/).

## Set up a custom domain via API

You can also create and manage custom domains through the Cloudflare API.

Unlike the dashboard, the API does not create the DNS record for you. After you create the custom domain, use the returned `cname_target` to create a proxied CNAME record for your hostname.

### Create a custom domain

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/ai-gateway/gateways/%7Bgateway_id%7D/custom-domains" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"domain": "ai.example.com",
		"zone_id": "395566f4c8a5b9d2a5fc0d457b007c44"
	}'
```

The response includes the custom domain status and the CNAME target:

```json
{
	"success": true,
	"result": {
		"hostname": "ai.example.com",
		"gateway_id": "my-gateway",
		"status": "pending_dcv",
		"cname_target": "<cname-target>",
		"created_at": 1782925200000,
		"modified_at": 1782925200000
	}
}
```

### Create the DNS record

Create a proxied CNAME record in the zone that owns your custom domain. Set `content` to the `cname_target` returned when you created the custom domain.

```bash
curl "https://api.cloudflare.com/client/v4/zones/%7Bzone_id%7D/dns_records" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"type": "CNAME",
		"name": "ai",
		"content": "<cname-target>",
		"proxied": true
	}'
```

The custom domain remains in `pending_dcv` until domain control validation completes.

### List custom domains

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/ai-gateway/gateways/%7Bgateway_id%7D/custom-domains" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

### Get a custom domain

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/ai-gateway/gateways/%7Bgateway_id%7D/custom-domains/%7Bhostname%7D" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

### Delete a custom domain

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/ai-gateway/gateways/%7Bgateway_id%7D/custom-domains/%7Bhostname%7D" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Example request

Send requests to the custom domain without the account ID or gateway ID in the path:

```bash
curl -X POST "https://ai.example.com/openai/v1/chat/completions" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

If the domain is protected by Cloudflare Access, the request must also include a valid Access token. For details, refer to [Cloudflare Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/).

## Limitations

Custom domains are not yet supported on the newer AI Gateway endpoints served through the [Cloudflare REST API](https://developers.cloudflare.com/api/) (`api.cloudflare.com`).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/#page","headline":"Custom domains · Cloudflare AI Gateway docs","description":"Send AI Gateway requests through a hostname that you own, such as ai.example.com.","url":"https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
