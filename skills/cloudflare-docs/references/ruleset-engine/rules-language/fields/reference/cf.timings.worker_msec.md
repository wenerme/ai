---
title: cf.timings.worker_msec
description: The time spent executing a Cloudflare Worker in milliseconds.
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

#  cf.timings.worker\_msec 

`cf.timings.worker_msec` ` Integer ` 

The time spent executing a Cloudflare Worker in milliseconds.

This field provides the wall-clock time that a Cloudflare Worker spent handling the request, measured in milliseconds.

Use this field to identify slow Worker executions, set up alerts for performance regressions, or add Worker execution time as a request header using Transform Rules for downstream observability.

If the request did not invoke a Worker, the value of this field will be `0`.

Example value:

```

12


```

Example usage:

```

# Matches requests where the Worker execution time exceeded 500 milliseconds

cf.timings.worker_msec > 500


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
