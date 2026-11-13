---
description: Expose several AI Search instances through a single public endpoint scoped to a namespace.
title: Namespace public endpoints
image: https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/og.png?v=f40ee0336faa3652
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Namespace public endpoints

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) can expose its own public endpoint. A single URL then searches across several instances in that namespace and merges the results. Use one when a single search experience covers content that lives in several instances, such as documentation, a blog, and a support portal.

A namespace endpoint serves the same paths and takes the same settings as an instance endpoint, including [custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/) and [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/). Refer to [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/). This page covers what is specific to namespaces.

## Enable a namespace public endpoint

Set `public_endpoint_params` on the namespace and list the instances to expose in `instances_allowed`.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/<NAMESPACE>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": {
      "enabled": true,
      "instances_allowed": ["docs", "blog", "support"]
    }
  }'
```

The response returns the generated `public_endpoint_id`. A namespace hostname is prefixed with `ns-`:

```txt
https://ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com/search
```

Enabling a namespace endpoint does not change the instance endpoints inside it. Each is enabled and disabled separately.

## The instances allowlist

`instances_allowed` controls which instances the endpoint can reach.

- Every entry must be an existing instance in that namespace. An unknown entry returns error `7097`.
- The list holds up to 10 instances.
- An empty list means nothing is searchable. This is the state a namespace starts in when you first enable the endpoint.
- Deleting an instance, or moving it to another namespace, removes it from the allowlist.

While the allowlist is empty, every request returns a `404` with error `60013`.

Caution

`public_endpoint_params` is replaced in full on every update. Send the complete object, including `instances_allowed`, or omitted fields revert to their defaults. Omitting `instances_allowed` resets it to an empty list and makes the endpoint return `404` for every request.

## Search the allowlist

Every request searches all instances in the allowlist and merges the results. You cannot narrow a request to a subset of instances. If the request body includes `ai_search_options.instance_ids`, the endpoint replaces it with the full allowlist.

```bash
curl https://ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com/search \
  --header "Content-Type: application/json" \
  --data '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ]
  }'
```

To search a different set of instances, update `instances_allowed`, or query the instances from a [Workers binding or the REST API](https://developers.cloudflare.com/ai-search/how-to/search-multiple-sources/).

Note

The request body must be a JSON object. An array or a string returns a `400` with error `60015`. An empty body is treated as an empty JSON object.

## Disable a namespace public endpoint

Set `public_endpoint_params` to `null`. This clears the configuration and stops serving traffic, but keeps the identifier so the URL is reused if you enable the endpoint again.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/<NAMESPACE>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": null
  }'
```

## Errors

| Code | Message | HTTP status | Cause |
| --- | --- | --- | --- |
| `7097` | `instances_allowed_contains_unknown_instances` | 400 | An entry in `instances_allowed` is not an instance in this namespace. |
| `7099` | `namespace_modified_concurrently_please_retry` | 409 | Another update changed the namespace at the same time. Retry. |
| `60013` | `ai_search_not_found` | 404 | The allowlist is empty, so no instance is searchable. |
| `60014` | `path not supported for namespace-kind hash` | 404 | The path is not `/search`, `/chat/completions`, or `/mcp`. |
| `60015` | `request body must be a JSON object` | 400 | The request body is not a JSON object. |

## Next steps

### [Namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/)

Group instances into namespaces and manage them from a Workers binding.

### [Search across multiple instances](https://developers.cloudflare.com/ai-search/how-to/search-multiple-sources/)

Query several instances from a Worker or the REST API.

### [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/)

Serve a namespace public endpoint from a hostname that you own.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/#page","headline":"Namespace public endpoints","description":"Expose several AI Search instances through a single public endpoint scoped to a namespace.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/og.png?v=f40ee0336faa3652","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
