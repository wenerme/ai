---
title: Managed Transforms
description: Pre-built Transform Rules managed by Cloudflare for common use cases.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Managed Transforms

Managed Transforms allow you to perform common adjustments to HTTP request and response headers with pre-built, one-step configurations. The available adjustments include:

* Add bot protection request headers.
* Remove or add headers related to the visitor's IP address.
* Add request header when Cloudflare detects [leaked credentials](https://developers.cloudflare.com/waf/detections/leaked-credentials/).
* Add security-related response headers.
* Remove `X-Powered-By` response headers.

For a complete list, refer to [Available Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/).

When you enable a Managed Transform, Cloudflare internally deploys one or more Transform Rules to handle the common configuration you selected. These generated rules will not count against the [maximum number of Transform Rules](https://developers.cloudflare.com/rules/transform/#availability) available in your Cloudflare plan.

Enabled Managed Transforms will apply to all inbound requests for the [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) (domain or subdomain added to Cloudflare).

Note

The generated internal Transform Rules will not appear in the Transform Rules list in the Cloudflare dashboard.

## Next steps

For dashboard, API, and Terraform instructions, refer to [Configure Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/managed-transforms/","name":"Managed Transforms"}}]}
```
