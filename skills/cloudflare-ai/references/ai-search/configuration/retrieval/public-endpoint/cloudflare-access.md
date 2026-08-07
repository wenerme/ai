---
description: Require users and agents to authenticate with your identity provider before they can query an AI Search public endpoint.
title: Cloudflare Access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Access

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A [public endpoint](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) is unauthenticated by design. Anyone who knows the URL can query your indexed content.

Put a [custom domain](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/) in front of the public endpoint and protect it with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/). Users then authenticate with your identity provider before any request reaches AI Search. This turns a public knowledge base into an internal one without writing an authentication layer.

## How it works

A custom domain is a hostname in a zone that you own. When the `CNAME` record for that hostname is **Proxied**, requests pass through your own zone before they reach AI Search:

flowchart LR
  A[Client] --> B["Your zone<br/>Access, WAF, Bots"]
  B --> C["AI Search<br/>public endpoint"]
  C --> D[Your indexed content]

Access runs in your zone, so it evaluates every request first. Requests that fail a policy never reach AI Search. AI Search needs no configuration to support this and applies its own [rate limits](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/#rate-limiting) afterwards.

This routing is called [orange-to-orange](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/). It requires the `CNAME` record to be proxied. A **DNS only** record bypasses your zone entirely, and Access never runs.

## Prerequisites

* A [custom domain](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/) on the instance or namespace you want to protect, with a **Proxied** `CNAME` record.
* Cloudflare Access enabled on your account.
* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) connected to Cloudflare Access, or Cloudflare's one-time PIN.

## 1\. Turn off the default hostname

Access only protects your custom domain. The default `<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com` hostname does not pass through your zone, so it keeps answering unauthenticated requests and defeats the policy you are about to write.

Set `default_domain_enabled` to `false` before you create the Access application.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_ID>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": {
      "enabled": true,
      "custom_domains": ["access.search.example.com"],
      "default_domain_enabled": false
    }
  }'
```

The default hostname now returns a `404` with error `60018`.

Caution

`public_endpoint_params` is replaced in full on every update. If a later update omits `default_domain_enabled`, it resets to `true` and the unauthenticated hostname starts serving again. Send the field on every update.

## 2\. Create an Access application

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Add an application** \> **Self-hosted**.
3. Name the application, for example `AI Search`.
4. Add the public hostname of your custom domain, for example `access.search.example.com`.
5. Save the application.

For the full set of options, refer to [Publish a self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

## 3\. Add policies

An application with no policy denies every request. Add at least one [Allow policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#allow) that describes who may query your content.

| Action | Rule type | Selector         | Value        |
| ------ | --------- | ---------------- | ------------ |
| Allow  | Include   | Emails ending in | @example.com |

Use the email, country, IP range, or identity provider group [selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#cloudflare-access-selectors) to match your organization. Refer to [Common policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/common-policies/) for more examples.

## 4\. Authenticate non-browser clients

Browsers follow the Access login redirect and receive a `CF_Authorization` cookie. MCP clients, backend services, and scripts cannot complete an interactive login, so they need a [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).

1. Go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. Select **Create Service Token**, name it, and choose a duration.
3. Copy the Client ID and Client Secret. The secret is shown only once.
4. Return to your Access application and add a second policy:

| Action       | Rule type | Selector      | Value            |
| ------------ | --------- | ------------- | ---------------- |
| Service Auth | Include   | Service Token | ai-search-client |

Send both credentials as headers on every request.

```bash
curl https://access.search.example.com/search \
  --header "Content-Type: application/json" \
  --header "CF-Access-Client-Id: <CLIENT_ID>" \
  --header "CF-Access-Client-Secret: <CLIENT_SECRET>" \
  --data '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ]
  }'
```

```json
{
	"mcpServers": {
		"ai-search": {
			"url": "https://access.search.example.com/mcp",
			"headers": {
				"CF-Access-Client-Id": "<CLIENT_ID>",
				"CF-Access-Client-Secret": "<CLIENT_SECRET>"
			}
		}
	}
}
```

Header support varies by MCP client. If your client cannot send custom headers, refer to [Secure MCP servers](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/secure-mcp-servers/) for identity-based alternatives, or use [cloudflared access curl](https://developers.cloudflare.com/cloudflare-one/access-controls/authenticate-agents/#make-requests-with-cloudflared-access-curl) for command-line requests.

## 5\. Verify

A request without credentials returns the Access login page instead of search results:

```bash
curl --include https://access.search.example.com/search \
  --header "Content-Type: application/json" \
  --data '{"messages":[{"content":"test","role":"user"}]}'
```

Confirm that the default hostname is closed:

```bash
curl https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/search \
  --header "Content-Type: application/json" \
  --data '{"messages":[{"content":"test","role":"user"}]}'
```

The response is a `404` with error code `60018`.

## Limitations

* **UI snippets on a public website stop working.** [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/) call the public endpoint from the visitor's browser. Behind Access, only visitors who pass your policies can use them. Use Access for internal sites, and leave the endpoint open for public marketing sites.
* **Cross-origin browser requests need an Access CORS configuration.** If a page on a different origin calls the protected hostname, configure CORS settings on the Access application in addition to the [allowed origins](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/#cors-configuration) on the public endpoint.
* **Rate limits still apply.** AI Search enforces its own rate limit after Access, and it is shared across all authenticated callers.
* **Allowed origins are not authentication.** The `authorized_hosts` setting sets CORS response headers, which only browsers honor. It does not stop a direct request from `curl` or a script.

## Alternatives

Once the `CNAME` record is proxied, other Cloudflare products also apply to the hostname:

| Product                                                                           | Use it to                                                |
| --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/)           | Allow specific countries, ASNs, IP ranges, or headers    |
| [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) | Apply per-client limits beyond the public endpoint limit |
| [Bot Management](https://developers.cloudflare.com/bots/)                         | Score and challenge automated traffic                    |
| [Turnstile](https://developers.cloudflare.com/turnstile/)                         | Verify humans before a browser client calls the endpoint |

## Next steps

### [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/)

Serve a public endpoint from a hostname that you own.

### [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/)

Rate limiting, allowed origins, and per-endpoint controls.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/#page","headline":"Cloudflare Access · Cloudflare AI Search docs","description":"Require users and agents to authenticate with your identity provider before they can query an AI Search public endpoint.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
