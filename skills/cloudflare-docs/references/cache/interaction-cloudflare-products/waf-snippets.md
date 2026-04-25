---
title: Control cache access with WAF and Snippets
description: Control cache access using WAF custom rules and Snippets.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ S3 ](https://developers.cloudflare.com/search/?tags=S3) 

# Control cache access with WAF and Snippets

To limit access to the public bucket created for caching content, you can use Cloudflare's [WAF](https://developers.cloudflare.com/waf/custom-rules/use-cases/configure-token-authentication/). The WAF provides an additional security layer to filter requests and ensure that only authorized traffic reaches your bucket.

The following diagram illustrates the flow of a user's request through WAF, Cache, and R2.

flowchart LR
accTitle: Connections with Cloudflare
A[User's request] --> B[WAF] --> C[Cache] --> D[R2]

  
The WAF product uses token authentication to either sign or authenticate a request. You can then use this in either Workers or Snippets to control access.

## Presigned URLs

You can presign URLs similar to [S3 ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html), enabling you to share direct access to your content with a with an associated timeout. This approach can be implemented using a combination of Snippets, Rules, or Cloudflare Workers.

For optimal performance, we recommend separating the creation and validation processes as follows:

* [Snippets](https://developers.cloudflare.com/rules/snippets/examples/signing-requests/) for HMAC creation
* [Rules](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) for HMAC validation

In the Workers documentation, in the section [Signing requests](https://developers.cloudflare.com/workers/examples/signing-requests/), you can also find an example of how to verify a signed request using the HMAC.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/interaction-cloudflare-products/","name":"Interaction with Cloudflare products"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/interaction-cloudflare-products/waf-snippets/","name":"Control cache access with WAF and Snippets"}}]}
```
