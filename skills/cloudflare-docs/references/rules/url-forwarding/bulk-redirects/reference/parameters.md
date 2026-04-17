---
title: URL redirect parameters
description: Configurable parameters for Bulk Redirect rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/bulk-redirects/reference/parameters.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# URL redirect parameters

A URL redirect has a source URL, a target URL, a status code, and some additional parameters that affect its URL matching behavior and runtime behavior.

## Source URL

API field: `source_url` ` String `

The URL string that the incoming request URL must match for the redirect to be applied. This property is mandatory. The maximum length of the source URL is 32 KB.

The value must be a valid URL, but the URL scheme is not required (for example, `https`); when the scheme is omitted, the redirect applies to both `http` and `https` URL schemes.

A Bulk Redirect List cannot contain several URL redirects with the exact same source URL. The exact behavior of the [URL matching algorithm](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/#url-matching-algorithm), which matches an incoming request with the redirect's source URL, depends on the values of the [**Include subdomains**](#include-subdomains) and [**Subpath matching**](#subpath-matching) parameters.

For more information on the supported URL components, refer to [Supported URL components in Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/url-components/).

## Target URL

API field: `target_url` ` String `

The URL where the client will be redirected to when there is a match for the URL redirect. This property is mandatory. The maximum length of the target URL is 32 KB.

The value must be a valid URL. The final target URL depends on the values of the [**Preserve query string**](#preserve-query-string) and [**Preserve path suffix**](#preserve-path-suffix) parameters.

For more information on the supported URL components, refer to [Supported URL components in Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/url-components/).

## Subpath matching

API field: `subpath_matching` ` Boolean ` default: false

If `true`, the current redirect will apply the subpath matching algorithm to the request URL when determining if there is a match for the current URL redirect.

For example, a URL redirect from `/my-folder/` to `/other-folder/` with **Subpath matching** enabled will also redirect a request from `/my-folder/item` to `/other-folder/item`. However, the redirect will only include the `item` part when [**Preserve path suffix**](#preserve-path-suffix) is `true`.

For more information, refer to [Matching the source URL of redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/#matching-the-source-url-of-redirects).

## Include subdomains

API field: `include_subdomains` ` Boolean ` default: false

If `true`, the source URL hostname will also apply to any subdomains — the redirect will match for all subdomains to the left of the domain portion of the source URL, as well as the specified domain.

For example, a redirect with source URL defined as `http://example.com/about` will also apply to requests with source URL `http://a.example.com/about` or `http://a.b.example.com/about`.

For more information, refer to [Matching the source URL of redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/#matching-the-source-url-of-redirects).

## Preserve query string

API field: `preserve_query_string` ` Boolean ` default: false

If `true`, the redirect URL will keep the query string of the original request.

For example, a URL redirect from `/my-folder/` to `/other-folder/` with **Preserve query string** enabled will redirect a request from `/my-folder/?name=value` to `/other-folder/?name=value`. If **Preserve query string** is disabled, the request will be redirected from `/my-folder/?name=value` to `/other-folder/`.

## Preserve path suffix

API field: `preserve_path_suffix` ` Boolean ` default: true

Applicable only when [**Subpath matching**](#subpath-matching) is enabled. If `true`, defines that the redirect URL will include the remaining (non-matched) path elements of the source URL, if any.

For example, when both **Subpath matching** and **Preserve path suffix** are enabled, a URL redirect from `/my-folder/` to `/another-folder/` will redirect an incoming request from `/my-folder/foo` to `/another-folder/foo`. If **Preserve path suffix** is disabled, the same request would still match the URL redirect, but it would redirect from `/my-folder/foo` to `/another-folder/`.

## Status code

API field: `status_code` ` Integer ` default: 301  
API values: `301`, `302`, `307`, or `308`.

The HTTP status code returned to the client when redirecting:

* **301 - Permanent Redirect**: The page has permanently moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
* **302 - Temporary Redirect**: The page has temporarily moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
* **307 - Advanced: Temporary, HTTP method preserved**: The page has temporarily moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
* **308 - Advanced: Permanent, HTTP method preserved**: The page has permanently moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/bulk-redirects/","name":"Bulk Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/bulk-redirects/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/url-forwarding/bulk-redirects/reference/parameters/","name":"URL redirect parameters"}}]}
```
