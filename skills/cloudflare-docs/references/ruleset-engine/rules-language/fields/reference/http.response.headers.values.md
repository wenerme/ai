---
title: http.response.headers.values
description: The values of the headers in the HTTP response.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  http.response.headers.values 

`http.response.headers.values` ` Array<String> ` 

The values of the headers in the HTTP response.

The values are not pre-processed and retain the original case used in the response.

The order of header values is not guaranteed but will match [http.response.headers.names](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers.names/).

Duplicate headers are listed multiple times.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

**Note**: The availability of HTTP response fields depends on the exact Cloudflare feature and your Cloudflare plan.

Example value:

```

Example 1: ["application/json"]

Example 2: ["This header value is longer than 10 bytes"]


```

Example usage:

```

# Example 1: Check for specific header value.

any(http.response.headers.values[*] == "application/json")


# Example 2: Match requests according to the specified operator and the length/size entered for the header value.

any(len(http.response.headers.values[*])[*] gt 10)


```

Categories: 
* Response
* Headers

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
