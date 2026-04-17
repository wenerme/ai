---
title: API parameter reference
description: Configurable parameters for response header modification rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/response-header-modification/reference/parameters.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# API parameter reference

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

```

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

```

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

```

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

```

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/response-header-modification/","name":"Response Header Transform Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/response-header-modification/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/transform/response-header-modification/reference/parameters/","name":"API parameter reference"}}]}
```
