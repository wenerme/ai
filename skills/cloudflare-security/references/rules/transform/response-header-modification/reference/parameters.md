---
description: Configurable parameters for response header modification rules.
title: API parameter reference
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# API parameter reference

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/response-header-modification/reference/parameters/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To set an HTTP response header, overwriting any headers with the same name, use the following parameters in the `action_parameters` field:

* **operation**: `set`
* Include one of the following parameters to define a static or dynamic value:
  * **value**: Specifies a static value for the HTTP response header.
  * **expression**: Specifies the expression that defines a value for the HTTP response header.

To add an HTTP response header, keeping any existing headers with the same name, use the following parameters in the `action_parameters` field:

* **operation**: `add`
* Include one of the following parameters to define a static or dynamic value:
  * **value**: Specifies a static value for the HTTP response header.
  * **expression**: Specifies the expression that defines a value for the HTTP response header.

To remove an HTTP response header, set the following parameter in the `action_parameters` field:

* **operation**: `remove`

## Static header value parameters

The full syntax of the `action_parameters` field to define a static HTTP response header value is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": {
      "operation": "<set|add>",
      "value": "<URI_PATH_VALUE>"
    }
  }
}
```

## Dynamic header value parameters

The full syntax of the `action_parameters` field to define a dynamic HTTP response header value using an expression is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": {
      "operation": "<set|add>",
      "expression": "<EXPRESSION>"
    }
  }
}
```

Note

Check the [available fields and functions](https://developers.cloudflare.com/rules/transform/request-header-modification/reference/fields-functions/) you can use in an expression.

## Header removal parameters

The full syntax of the `action_parameters` field to remove an HTTP response header is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": {
      "operation": "remove"
    }
  }
}
```

## Different header modifications in the same rule

The same rule can modify different HTTP response headers using different operations. For example, a single rule can set the value of a header and remove a different header. The syntax of such a rule could be the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME_1>": {
      "operation": "set",
      "value": "<HEADER_VALUE_1>"
    },
    "<HEADER_NAME_2>": {
      "operation": "remove"
    }
  }
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/response-header-modification/reference/parameters/#page","headline":"API parameter reference · Cloudflare Rules docs","description":"Configurable parameters for response header modification rules.","url":"https://developers.cloudflare.com/rules/transform/response-header-modification/reference/parameters/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Response modification"]}
```
