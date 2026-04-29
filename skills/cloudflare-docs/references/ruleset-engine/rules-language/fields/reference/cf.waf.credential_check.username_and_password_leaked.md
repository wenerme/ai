---
title: cf.waf.credential_check.username_and_password_leaked
description: Indicates whether the auth credentials detected in the request (username-password pair) were previously leaked.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.waf.credential\_check.username\_and\_password\_leaked 

`cf.waf.credential_check.username_and_password_leaked` ` Boolean ` 

Indicates whether the auth credentials detected in the request (username-password pair) were previously leaked.

Requires a Cloudflare Pro plan or above. You must also enable [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/).

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
