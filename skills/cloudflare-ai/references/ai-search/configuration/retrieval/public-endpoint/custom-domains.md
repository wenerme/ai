---
description: Serve an AI Search public endpoint from a hostname that you own, such as search.example.com.
title: Custom domains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom domains

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A custom domain serves your [public endpoint](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) from a hostname that you own, such as `search.example.com`, instead of the default `<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com` hostname.

The endpoints and request formats do not change. Only the hostname changes:

```txt
https://search.example.com/search
https://search.example.com/chat/completions
https://search.example.com/mcp
```

Custom domains are also the foundation for [restricting access with Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/), which lets users authenticate with your identity provider before they can query your indexed content.

## Requirements

* The public endpoint must already be enabled on the instance or namespace. Adding a custom domain to an instance without an active public endpoint returns error `7093`.
* The hostname must belong to a zone that is [added to the same Cloudflare account](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) and in an active state. A hostname on another account returns error `7090`.
* Each instance or namespace supports one custom domain.
* A hostname can only be attached to one public endpoint at a time. Reusing a hostname returns error `7091`.
* The hostname must be a fully qualified domain name of up to 253 characters, such as `search.example.com`. Wildcards are not supported. Hostnames are stored in lowercase.

## Add a custom domain

Set `public_endpoint_params.custom_domains` when you create or update an instance.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_ID>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": {
      "enabled": true,
      "custom_domains": ["search.example.com"]
    }
  }'
```

The same field is available on namespaces. Refer to [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/).

Cloudflare issues a certificate for the hostname and begins domain control validation.

public\_endpoint\_params is replaced in full

Every update replaces the entire `public_endpoint_params` object. Any field you omit reverts to its default. Send the complete object on every update, including `rate_limit`, `authorized_hosts`, and `default_domain_enabled`.

The one exception is `custom_domains`. Omitting it leaves your existing domains unchanged. Sending an empty array removes them.

When you omit `custom_domains` from an update, the response echoes it back as `null`. This reflects what the request contained, not the stored configuration. Send a `GET` request to read the current set of domains.

### Create the DNS record

Create a **proxied** `CNAME` record in the zone that owns your custom domain. The target is the default hostname of the public endpoint, which is `<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com`.

| Type  | Name   | Target                                          | Proxy status |
| ----- | ------ | ----------------------------------------------- | ------------ |
| CNAME | search | <PUBLIC\_ENDPOINT\_ID>.search.ai.cloudflare.com | Proxied      |

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CNAME",
    "name": "search",
    "content": "<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com",
    "proxied": true
  }'
```

Keep the record proxied

Set the record to **Proxied**, not **DNS only**. A proxied record routes traffic through your own zone before it reaches AI Search, so your zone settings apply first. This is what makes [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/), [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), and [Bot Management](https://developers.cloudflare.com/bots/) usable in front of your public endpoint.

The custom domain starts serving traffic once domain control validation completes.

## Turn off the default hostname

By default, a public endpoint answers on both the custom domain and the default `<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com` hostname. Set `default_domain_enabled` to `false` to serve the custom domain only. The default hostname then returns a `404` with error `60018`.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_ID>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": {
      "enabled": true,
      "custom_domains": ["search.example.com"],
      "default_domain_enabled": false
    }
  }'
```

Turn this off whenever you put security controls in front of the custom domain. Those controls run in your own zone, so any traffic that reaches the default hostname skips them. Refer to [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/).

Three rules apply:

* You cannot turn off the default hostname without at least one custom domain. The request returns error `7096`.
* Because `public_endpoint_params` is replaced in full, omitting `default_domain_enabled` on a later update resets it to `true` and makes the default hostname reachable again.
* Leave the `CNAME` record pointing at the default hostname. AI Search routes on the hostname the client requested, not the `CNAME` target, so the record keeps working after you turn the default hostname off.

## Remove a custom domain

Send `custom_domains` as an empty array. Cloudflare removes the certificate and stops routing the hostname.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_ID>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": {
      "enabled": true,
      "custom_domains": []
    }
  }'
```

If `default_domain_enabled` is `false`, removing the last custom domain in the same request returns error `7096`. Re-enable the default hostname first, then remove the domain.

Deleting the instance or namespace removes its custom domains and certificates.

## Errors

| Code  | Message                                                                   | Cause                                                            |
| ----- | ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 7090  | custom\_domain\_not\_a\_verified\_zone\_on\_this\_account                 | The hostname does not belong to an active zone on this account.  |
| 7091  | custom\_domain\_already\_in\_use                                          | The hostname is already attached to another public endpoint.     |
| 7092  | custom\_domain\_provisioning\_failed                                      | Certificate provisioning failed. Retry the request.              |
| 7093  | custom\_domains\_require\_an\_active\_public\_endpoint                    | The instance or namespace has no active public endpoint.         |
| 7096  | disabling\_the\_default\_domain\_requires\_at\_least\_one\_custom\_domain | default\_domain\_enabled was set to false with no custom domain. |
| 60018 | default domain disabled                                                   | A request reached the default hostname while it is turned off.   |

## Next steps

### [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/)

Require users to authenticate before they can query your public endpoint.

### [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/)

Rate limiting, allowed origins, and per-endpoint controls.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/#page","headline":"Custom domains · Cloudflare AI Search docs","description":"Serve an AI Search public endpoint from a hostname that you own, such as search.example.com.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
