---
title: Rewrite path of moved section of a website
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rewrite path of moved section of a website

Create a URL rewrite rule (part of Transform Rules) to rewrite everything under `/blog/<PATH>` to `/marketing/<PATH>`.

To rewrite everything under `/blog/<PATH>` to `/marketing/<PATH>`, create a new URL rewrite rule and define a dynamic URL path rewrite using [wildcard pattern parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/#wildcard-pattern-parameters):

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `https://<YOUR_HOSTNAME>/blog/*`

**Then rewrite the path and/or query**

* **Target path**: \[`/`\] `blog/*`
* **Rewrite to**: \[`/`\] `marketing/${1}`

Make sure to replace `<YOUR_HOSTNAME>` with your actual hostname and adjust the example paths according to your setup.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/rewrite-moved-section/","name":"Rewrite path of moved section of a website"}}]}
```
