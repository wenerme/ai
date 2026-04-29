---
title: Add a request header for subrequests from other zones
description: Create a request header transform rule to add an HTTP header when the Workers subrequest comes from a different zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Request modification ](https://developers.cloudflare.com/search/?tags=Request%20modification) 

# Add a request header for subrequests from other zones

Create a request header transform rule to add an HTTP header when the Workers subrequest comes from a different zone.

The following request header transform rule adds an HTTP header to Workers subrequests coming from a different zone:

Text in **Expression Editor** (replace `myappexample.com` with your domain):

```

(cf.worker.upstream_zone != "" and cf.worker.upstream_zone != "myappexample.com")


```

Selected operation under **Modify request header**: _Set static_

**Header name**: `X-External-Workers-Subrequest`

**Value**: `1`

The [cf.worker.upstream\_zone](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.worker.upstream%5Fzone/) field used in the rule expression is set to empty if the current request is not a Workers subrequest.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/add-request-header-subrequest-other-zone/","name":"Add a request header for subrequests from other zones"}}]}
```
