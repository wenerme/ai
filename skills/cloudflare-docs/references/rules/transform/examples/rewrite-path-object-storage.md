---
title: Rewrite path for object storage bucket
description: Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for `/files/...` URI paths to `/...`.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ URL rewrite ](https://developers.cloudflare.com/search/?tags=URL%20rewrite) 

# Rewrite path for object storage bucket

Create a URL rewrite rule (part of Transform Rules) to remove `/files/` from URI paths before routing request to your object storage bucket.

To remove `/files/` from URI paths before routing request to your object storage bucket, create a new URL rewrite rule and define a dynamic URL path rewrite using [wildcard pattern parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/#wildcard-pattern-parameters):

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `https://<YOUR_HOSTNAME>/files/*`

**Then rewrite the path and/or query**

* **Target path**: \[`/`\] `files/*`
* **Rewrite to**: \[`/`\] `${1}`

Make sure to replace `<YOUR_HOSTNAME>` with your actual hostname and adjust the example paths according to your setup. Then, use [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/) to route traffic to an object storage bucket.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/rewrite-path-object-storage/","name":"Rewrite path for object storage bucket"}}]}
```
