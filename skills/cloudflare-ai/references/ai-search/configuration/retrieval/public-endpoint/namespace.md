---
description: Expose several AI Search instances through a single public endpoint scoped to a namespace.
title: Namespace public endpoints
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Namespace public endpoints

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

* Every entry must be an existing instance in that namespace. An unknown entry returns error `7097`.
* The list holds up to 10 instances.
* An empty list means nothing is searchable. This is the state a namespace starts in when you first enable the endpoint.
* Deleting an instance, or moving it to another namespace, removes it from the allowlist.

A request that resolves to no searchable instance returns a `404` with error `60013`. This response is identical whether the instance does not exist, is outside the allowlist, or the allowlist is empty, so callers cannot discover which instances a namespace contains.

Caution

`public_endpoint_params` is replaced in full on every update. Send the complete object, including `instances_allowed`, or omitted fields revert to their defaults. Omitting `instances_allowed` resets it to an empty list and makes the endpoint return `404` for every request.

## Search a subset of instances

By default, a request searches every instance in the allowlist. To narrow a single request, set `ai_search_options.instance_ids` in the request body.

```bash
curl https://ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com/search \
  --header "Content-Type: application/json" \
  --data '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ],
    "ai_search_options": {
      "instance_ids": ["docs", "support"]
    }
  }'
```

Every value must be in the allowlist. Rules for this field:

* Omitting the field, or setting it to `null`, searches the full allowlist.
* A malformed value, such as an empty array or a non-string entry, returns a `400` with error `60012`.
* A value outside the allowlist returns a `404` with error `60013`.

Note

The request body must be a JSON object. An array, a string, or an empty body returns a `400` with error `60015`.

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

| Code  | Message                                          | HTTP status | Cause                                                                |
| ----- | ------------------------------------------------ | ----------- | -------------------------------------------------------------------- |
| 7097  | instances\_allowed\_contains\_unknown\_instances | 400         | An entry in instances\_allowed is not an instance in this namespace. |
| 7099  | namespace\_modified\_concurrently\_please\_retry | 409         | Another update changed the namespace at the same time. Retry.        |
| 60012 | invalid ai\_search\_options.instance\_ids        | 400         | The instance\_ids value is malformed.                                |
| 60013 | ai\_search\_not\_found                           | 404         | No searchable instance matched the request.                          |
| 60014 | path not supported for namespace-kind hash       | 404         | The path is not /search, /chat/completions, or /mcp.                 |
| 60015 | request body must be a JSON object               | 400         | The request body is not a JSON object.                               |

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/#page","headline":"Namespace public endpoints · Cloudflare AI Search docs","description":"Expose several AI Search instances through a single public endpoint scoped to a namespace.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
