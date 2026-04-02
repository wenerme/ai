---
title: Single Redirects settings
description: The following sections describe the settings of redirect rules to configure static and dynamic URL redirects.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/single-redirects/settings.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Single Redirects settings

The following sections describe the settings of redirect rules to configure static and dynamic URL redirects.

## Wildcard URL Redirect

Performs a URL redirect using [wildcard patterns](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) to match multiple requests. This method simplifies defining source and target URL patterns without needing complex expressions.

A wildcard URL redirect has the following configuration parameters:

* **Request URL**: Enter the [wildcard pattern](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) using the asterisk (`*`) character to match multiple requests. For example, `https://*.example.com/files/*`.
* **Target URL**: Enter the target URL, which can be static (for example, `https://example.com`) or dynamic (for example, `https://example.com/${1}/files/${2}`). Use [wildcard replacement](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) like `${1}`, `${2}`, etc., to define dynamic targets.
* **Status code**: The HTTP status code of the redirect response (_301_ by default). Must be one of the following: _301_ (Moved permanently), _302_ (Found, also known as Moved temporarily), _307_ (Temporary redirect), or _308_ (Permanent redirect).
* **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default).

## Static URL redirect

Performs a static URL redirect with a given HTTP status code and optionally preserves the query string.

A static URL redirect has the following configuration parameters:

* **URL**: A literal string that will be used in the `Location` HTTP header returned in the redirect response.
* **Status code**: The HTTP status code of the redirect response (_301_ by default). Must be one of the following: _301_ (Moved permanently), _302_ (Found, also known as Moved temporarily), _307_ (Temporary redirect), or _308_ (Permanent redirect).
* **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default).

API information

The full syntax of the `"action_parameters"` field for a redirect rule performing a static URL redirect is the following:

```

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

The only required parameter is `<STATIC_URL_VALUE>`.

The optional parameters can have the following values:

* `"status_code"` (integer): `301` (Moved permanently), `302` (Found, also known as Moved temporarily), `307` (Temporary redirect), or `308` (Permanent redirect).
* `"preserve_query_string"` (boolean): `true` or `false`.

## Dynamic URL redirect

Performs a dynamic URL redirect, where the target URL is determined by an expression. You can configure the redirect HTTP status code and whether to preserve the query string when redirecting.

A dynamic URL redirect has the following configuration parameters:

* **Expression**: An [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that defines the target URL of the redirect. The result of evaluating this expression will be used in the `Location` HTTP header returned in the redirect response. Refer to the [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) and [functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/) you can use in expressions.
* **Status code**: The HTTP status code of the redirect response (_301_ by default). Must be one of the following: _301_ (Moved permanently), _302_ (Found, also known as Moved temporarily), _307_ (Temporary redirect), or _308_ (Permanent redirect).
* **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default).

API information

The full syntax of the `"action_parameters"` field for a redirect rule performing a dynamic URL redirect is the following:

```

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

The only required parameter is `<DYNAMIC_URL_EXPRESSION>`.

The optional parameters can have the following values:

* `"status_code"` (integer): `301` (Moved permanently), `302` (Found, also known as Moved temporarily), `307` (Temporary redirect), or `308` (Permanent redirect).
* `"preserve_query_string"` (boolean): `true` or `false`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/single-redirects/","name":"Single Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/single-redirects/settings/","name":"Single Redirects settings"}}]}
```
