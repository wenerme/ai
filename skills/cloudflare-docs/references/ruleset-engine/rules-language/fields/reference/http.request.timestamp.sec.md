---
title: http.request.timestamp.sec
description: The timestamp when Cloudflare received the request, expressed as UNIX time in seconds.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

#  http.request.timestamp.sec 

`http.request.timestamp.sec` ` Integer ` 

The timestamp when Cloudflare received the request, expressed as UNIX time in seconds.

The field value is 10 digits long.

When validating HMAC tokens in an expression, pass this field as the `currentTimestamp` argument to the [is\_timed\_hmac\_valid\_v0()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) validation function.

To obtain the timestamp milliseconds, use the [http.request.timestamp.msec](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.msec/) field.

Example value:

```

1484063137


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
