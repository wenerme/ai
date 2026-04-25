---
title: URL rewrite parameters
description: Configurable parameters for URL rewrite rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# URL rewrite parameters

Static and dynamic URL rewrites have different parameters:

* A static URL rewrite requires a static value for the target URL.
* A dynamic URL rewrite requires an expression that, when evaluated, will define the target URL.

A URL rewrite with wildcard patterns is a simplified interface in the Cloudflare dashboard for creating dynamic URL rewrites with [wildcard matching and replacement](#wildcard-matching-and-replacement).

The maximum length of all parameter values in a URL rewrite (combined) is 4,096 characters. For example, you could provide a static value (or an expression) for the URI path with 2,048 characters and a static value (or expression) for the query string with 2,048 characters.

## API information

### Static URL rewrites

The full syntax of the `action_parameters` field for a static URL rewrite rule that rewrites both the URI path and the query string is the following:

```

"action_parameters": {

  "uri": {

    "path": {

      "value": "<URI_PATH_VALUE>"

    },

    "query": {

      "value": "<QUERY_STRING_VALUE>"

    }

  }

}


```

Explain Code

If you are only rewriting the URI path or the query string, omit the `query` or `path` parameter, respectively.

### Dynamic URL rewrites

The full syntax of the `action_parameters` field for a dynamic URL rewrite rule that rewrites both the URI path and the query string is the following:

```

"action_parameters": {

  "uri": {

    "path": {

      "expression": "<URI_PATH_EXPRESSION>"

    },

    "query": {

      "expression": "<QUERY_STRING_EXPRESSION>"

    }

  }

}


```

Explain Code

If you are only rewriting the URI path or the query string, omit the `query` or `path` parameter, respectively.

#### Wildcard matching and replacement

The syntax of a dynamic URL rewrite rule that rewrites both the URI path and the query string based on wildcard matching and replacement is the following:

```

{

  "expression": "(http.request.full_uri wildcard r\"<REQUEST_URL>\")",

  "action_parameters": {

    "uri": {

      "path": {

        "expression": "wildcard_replace(http.request.uri.path, r\"<PATH_TARGET_PATH>\", r\"<PATH_REWRITE_TO>\")"

      },

      "query": {

        "expression": "wildcard_replace(http.request.uri.query, r\"<QUERY_TARGET_QUERY>\", r\"<QUERY_REWRITE_TO>\")"

      }

    }

  },

  "action": "rewrite"

  // ...

}


```

Explain Code

The `<REQUEST_URL>`, `<PATH_TARGET_PATH>`, `<PATH_REWRITE_TO>`, `<QUERY_TARGET_QUERY>`, and `<QUERY_REWRITE_TO>` value placeholders correspond to the fields available in the Cloudflare dashboard when you select the **Wildcard pattern** option. For more information, refer to [Wildcard pattern parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/#wildcard-pattern-parameters).

Note

The `http.request.uri.query` field does not include the `?` delimiter at the beginning, which means that your `<QUERY_TARGET_QUERY>` value should not try to match an initial `?`.

### Different URL rewrite types in the same rule

The same rule can have different types of URL rewrites for the URI path and the query string. For example, a single rule can perform a **dynamic** URL rewrite of the URI path and a **static** URL rewrite of the query string. The syntax of such a rule would be the following:

```

"action_parameters": {

  "uri": {

    "path": {

      "expression": "<URI_PATH_EXPRESSION>"

    },

    "query": {

      "value": "<QUERY_STRING_VALUE>"

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/url-rewrite/","name":"URL Rewrite Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/url-rewrite/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/transform/url-rewrite/reference/parameters/","name":"URL rewrite parameters"}}]}
```
