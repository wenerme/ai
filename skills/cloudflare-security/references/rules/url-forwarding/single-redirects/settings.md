---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Reference for Single Redirects settings, including wildcard, static, and dynamic URL redirects and how wildcard references are numbered.
title: Single Redirects settings
image: https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/og.png?v=a38a2e8a14395ce6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Single Redirects settings

The following sections describe the settings of redirect rules to configure static and dynamic URL redirects.

## Wildcard URL Redirect

Performs a URL redirect using [wildcard patterns](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) to match multiple requests. This method simplifies defining source and target URL patterns without needing complex expressions.

A wildcard URL redirect has the following configuration parameters:

- **Request URL**: Enter the [wildcard pattern](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) using the asterisk ( `*`) character to match multiple requests. For example, `https://*.example.com/files/*`. Each `*` matches any characters, including none. Matching ignores upper and lower case, but the captured values keep their original case.
- **Target URL**: Enter the target URL, which can be static (for example, `https://example.com`) or dynamic (for example, `https://example.com/${1}/files/${2}`). Use wildcard references such as `${1}` and `${2}` to define dynamic targets. Refer to [How wildcard references are numbered](#how-wildcard-references-are-numbered).
- **Status code**: The HTTP status code of the redirect response (*301 - Permanent Redirect* by default). Browsers can cache `301` and `308` redirects, and Cloudflare does not add a `Cache-Control` header to redirect responses, so consider `302` or `307` while you test a rule. Must be one of the following:
  - **301 - Permanent Redirect**: The page has permanently moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
  - **302 - Temporary Redirect**: The page has temporarily moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
  - **307 - Advanced: Temporary, HTTP method preserved**: The page has temporarily moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
  - **308 - Advanced: Permanent, HTTP method preserved**: The page has permanently moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
- **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default). When enabled, Cloudflare replaces any query string in the target URL with the query string of the original request. If the original request has no query string, the redirect URL has no query string. With a wildcard pattern, if the request URL ends with `*` and the target URL ends with the matching wildcard reference, the redirect keeps the query string even when this setting is disabled. Refer to [Query strings in wildcard patterns](#query-strings-in-wildcard-patterns).

<details>

<summary>

API information

</summary>

Wildcard URL redirects are regular <a href="#dynamic-url-redirect">dynamic URL redirects</a> that use the <a href="https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard_replace"><code>wildcard_replace()</code></a> function in the <code>target_url.expression</code> parameter.

The full syntax of the <code>"action_parameters"</code> field for a redirect rule performing a wildcard URL redirect is the following:

```json
"action_parameters": {
  "from_value": {
    "target_url": {
      "expression": "wildcard_replace(http.request.full_uri, r\"<REQUEST_URL_PATTERN>\", r\"<TARGET_URL_PATTERN>\")"
    },
    "status_code": <STATUS_CODE>,
    "preserve_query_string": <BOOLEAN_VALUE>
  }
}
```

The required parameters are <code>&lt;REQUEST_URL_PATTERN&gt;</code> and <code>&lt;TARGET_URL_PATTERN&gt;</code>.

The optional parameters can have the following values:

- <code>"status_code"</code> (integer):
  - <code>301</code> (permanent redirect)
  - <code>302</code> (temporary redirect)
  - <code>307</code> (temporary redirect, preserving original HTTP method)
  - <code>308</code> (permanent redirect, preserving original HTTP method)
- <code>"preserve_query_string"</code> (boolean): <code>true</code> or <code>false</code> (<code>false</code> if omitted)

</details>

### How wildcard references are numbered

Cloudflare numbers each `*` in the **Request URL** from left to right, starting at `${1}`. This includes the `*` in `http*`.

For example, with the request URL `http*://example.com/blog/*`:

| Reference | Captures | Value for `https://example.com/blog/hello` | Value for `http://example.com/blog/hello` |
| --- | --- | --- | --- |
| `${1}` | The `*` in `http*` | `s` | (empty) |
| `${2}` | The `*` after `/blog/` | `hello` | `hello` |

To keep the path in the target URL, use `${2}` (for example, `https://blog.example.com/${2}`).

To match only HTTPS requests, write the scheme explicitly. With the request URL `https://example.com/blog/*`, the path is `${1}`.

For a complete example, refer to [Redirect a website section to a subdomain](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-section-to-subdomain/).

Note

URL Rewrite Rules number wildcards differently. In a URL rewrite rule, Cloudflare numbers only the `*` characters in **Target path** or **Target query**. Refer to [Wildcard pattern parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/#wildcard-pattern-parameters).

### Query strings in wildcard patterns

Cloudflare matches the request URL against the full URL, including the query string. A request URL that does not end with `*`, such as `https://example.com/contact`, does not match `https://example.com/contact?ref=1`. To match a page with or without a query string, use a [custom filter expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) on the URI path, or end the request URL with `*`.

A `*` at the end of the request URL captures the rest of the path and the query string. For example, with the request URL `http*://example.com/blog/*` and the request `https://example.com/blog/hello?page=2`, `${2}` is `hello?page=2`.

As a result, a target URL that ends with a wildcard reference, such as `https://blog.example.com/${2}`, keeps the query string even if **Preserve query string** is disabled.

If **Preserve query string** is enabled, the query string appears only once in the redirect URL.

To redirect without the query string, use a custom filter expression instead of a wildcard pattern. Select the *Dynamic* type and build the target URL from the URI path only, for example `wildcard_replace(http.request.uri.path, "/blog/*", "https://blog.example.com/${1}")`, and keep **Preserve query string** disabled. With this rule, `https://example.com/blog/post?page=2` redirects to `https://blog.example.com/post`.

## Static URL redirect

Performs a static URL redirect with a given HTTP status code and optionally preserves the query string.

A static URL redirect has the following configuration parameters:

- **URL**: A literal string that will be used in the `Location` HTTP header returned in the redirect response. Include the URI scheme, such as `https://example.com/`. Cloudflare sends a URL without a scheme, such as `example.com`, unchanged, and browsers treat it as a relative path on the current hostname.
- **Status code**: The HTTP status code of the redirect response (*301 - Permanent Redirect* by default). Browsers can cache `301` and `308` redirects, and Cloudflare does not add a `Cache-Control` header to redirect responses, so consider `302` or `307` while you test a rule. Must be one of the following:
  - **301 - Permanent Redirect**: The page has permanently moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
  - **302 - Temporary Redirect**: The page has temporarily moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
  - **307 - Advanced: Temporary, HTTP method preserved**: The page has temporarily moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
  - **308 - Advanced: Permanent, HTTP method preserved**: The page has permanently moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
- **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default). When enabled, Cloudflare replaces any query string in the target URL with the query string of the original request. If the original request has no query string, the redirect URL has no query string.

<details>

<summary>

API information

</summary>

The full syntax of the <code>"action_parameters"</code> field for a redirect rule performing a static URL redirect is the following:

```json
"action_parameters": {
  "from_value": {
    "target_url": {
      "value": "<STATIC_URL_VALUE>"
    },
    "status_code": <STATUS_CODE>,
    "preserve_query_string": <BOOLEAN_VALUE>
  }
}
```

The only required parameter is <code>&lt;STATIC_URL_VALUE&gt;</code>.

The optional parameters can have the following values:

- <code>"status_code"</code> (integer):
  - <code>301</code> (permanent redirect)
  - <code>302</code> (temporary redirect)
  - <code>307</code> (temporary redirect, preserving original HTTP method)
  - <code>308</code> (permanent redirect, preserving original HTTP method)
- <code>"preserve_query_string"</code> (boolean): <code>true</code> or <code>false</code> (<code>false</code> if omitted)

</details>

## Dynamic URL redirect

Performs a dynamic URL redirect, where the target URL is determined by an expression. You can configure the redirect HTTP status code and whether to preserve the query string when redirecting.

A dynamic URL redirect has the following configuration parameters:

- **Expression**: An [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that defines the target URL of the redirect. The result of evaluating this expression will be used in the `Location` HTTP header returned in the redirect response. Refer to the [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) and [functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/) you can use in expressions.
- **Status code**: The HTTP status code of the redirect response (*301 - Permanent Redirect* by default). Browsers can cache `301` and `308` redirects, and Cloudflare does not add a `Cache-Control` header to redirect responses, so consider `302` or `307` while you test a rule. Must be one of the following:
  - **301 - Permanent Redirect**: The page has permanently moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
  - **302 - Temporary Redirect**: The page has temporarily moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.
  - **307 - Advanced: Temporary, HTTP method preserved**: The page has temporarily moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
  - **308 - Advanced: Permanent, HTTP method preserved**: The page has permanently moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
- **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default). When enabled, Cloudflare replaces any query string in the target URL with the query string of the original request. If the original request has no query string, the redirect URL has no query string.

<details>

<summary>

API information

</summary>

The full syntax of the <code>"action_parameters"</code> field for a redirect rule performing a dynamic URL redirect is the following:

```json
"action_parameters": {
  "from_value": {
    "target_url": {
      "expression": "<DYNAMIC_URL_EXPRESSION>"
    },
    "status_code": <STATUS_CODE>,
    "preserve_query_string": <BOOLEAN_VALUE>
  }
}
```

The only required parameter is <code>&lt;DYNAMIC_URL_EXPRESSION&gt;</code>.

The optional parameters can have the following values:

- <code>"status_code"</code> (integer):
  - <code>301</code> (permanent redirect)
  - <code>302</code> (temporary redirect)
  - <code>307</code> (temporary redirect, preserving original HTTP method)
  - <code>308</code> (permanent redirect, preserving original HTTP method)
- <code>"preserve_query_string"</code> (boolean): <code>true</code> or <code>false</code> (<code>false</code> if omitted)

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/#page","headline":"Single Redirects settings","description":"Reference for Single Redirects settings, including wildcard, static, and dynamic URL redirects and how wildcard references are numbered.","url":"https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/og.png?v=a38a2e8a14395ce6","dateModified":"2026-11-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
