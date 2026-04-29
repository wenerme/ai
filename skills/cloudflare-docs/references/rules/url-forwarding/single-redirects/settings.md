---
title: Single Redirects settings
description: Available settings for Single Redirect rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Single Redirects settings

The following sections describe the settings of redirect rules to configure static and dynamic URL redirects.

## Wildcard URL Redirect

Performs a URL redirect using [wildcard patterns](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) to match multiple requests. This method simplifies defining source and target URL patterns without needing complex expressions.

A wildcard URL redirect has the following configuration parameters:

* **Request URL**: Enter the [wildcard pattern](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) using the asterisk (`*`) character to match multiple requests. For example, `https://*.example.com/files/*`.
* **Target URL**: Enter the target URL, which can be static (for example, `https://example.com`) or dynamic (for example, `https://example.com/${1}/files/${2}`). Use [wildcard replacement](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) like `${1}`, `${2}`, etc., to define dynamic targets.
* **Status code**: The HTTP status code of the redirect response (_301 - Permanent Redirect_ by default). Must be one of the following:  
   * **301 - Permanent Redirect**: The page has permanently moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.  
   * **302 - Temporary Redirect**: The page has temporarily moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.  
   * **307 - Advanced: Temporary, HTTP method preserved**: The page has temporarily moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.  
   * **308 - Advanced: Permanent, HTTP method preserved**: The page has permanently moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
* **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default).

API information

Wildcard URL redirects are regular [dynamic URL redirects](#dynamic-url-redirect) that use the [wildcard\_replace()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) function in the `target_url.expression` parameter.

The full syntax of the `"action_parameters"` field for a redirect rule performing a wildcard URL redirect is the following:

```

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

The required parameters are `<REQUEST_URL_PATTERN>` and `<TARGET_URL_PATTERN>`.

The optional parameters can have the following values:

* `"status_code"` (integer):  
   * `301` (permanent redirect)  
   * `302` (temporary redirect)  
   * `307` (temporary redirect, preserving original HTTP method)  
   * `308` (permanent redirect, preserving original HTTP method)
* `"preserve_query_string"` (boolean): `true` or `false`

## Static URL redirect

Performs a static URL redirect with a given HTTP status code and optionally preserves the query string.

A static URL redirect has the following configuration parameters:

* **URL**: A literal string that will be used in the `Location` HTTP header returned in the redirect response.
* **Status code**: The HTTP status code of the redirect response (_301 - Permanent Redirect_ by default). Must be one of the following:  
   * **301 - Permanent Redirect**: The page has permanently moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.  
   * **302 - Temporary Redirect**: The page has temporarily moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.  
   * **307 - Advanced: Temporary, HTTP method preserved**: The page has temporarily moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.  
   * **308 - Advanced: Permanent, HTTP method preserved**: The page has permanently moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
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

* `"status_code"` (integer):  
   * `301` (permanent redirect)  
   * `302` (temporary redirect)  
   * `307` (temporary redirect, preserving original HTTP method)  
   * `308` (permanent redirect, preserving original HTTP method)
* `"preserve_query_string"` (boolean): `true` or `false`

## Dynamic URL redirect

Performs a dynamic URL redirect, where the target URL is determined by an expression. You can configure the redirect HTTP status code and whether to preserve the query string when redirecting.

A dynamic URL redirect has the following configuration parameters:

* **Expression**: An [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that defines the target URL of the redirect. The result of evaluating this expression will be used in the `Location` HTTP header returned in the redirect response. Refer to the [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) and [functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/) you can use in expressions.
* **Status code**: The HTTP status code of the redirect response (_301 - Permanent Redirect_ by default). Must be one of the following:  
   * **301 - Permanent Redirect**: The page has permanently moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.  
   * **302 - Temporary Redirect**: The page has temporarily moved to a new address. For `POST` requests, the client or browser might switch the HTTP method to `GET` when following the redirect.  
   * **307 - Advanced: Temporary, HTTP method preserved**: The page has temporarily moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.  
   * **308 - Advanced: Permanent, HTTP method preserved**: The page has permanently moved to a new address. The client or browser must preserve the original HTTP method (for example, `POST`) when following the redirect.
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

* `"status_code"` (integer):  
   * `301` (permanent redirect)  
   * `302` (temporary redirect)  
   * `307` (temporary redirect, preserving original HTTP method)  
   * `308` (permanent redirect, preserving original HTTP method)
* `"preserve_query_string"` (boolean): `true` or `false`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/single-redirects/","name":"Single Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/single-redirects/settings/","name":"Single Redirects settings"}}]}
```
