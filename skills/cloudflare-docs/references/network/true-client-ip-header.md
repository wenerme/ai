---
title: Understanding the True-Client-IP Header
description: Enabling the True-Client-IP Header adds the True-Client-IP header to all requests to your origin server, which includes the end user's IP address.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network/true-client-ip-header.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Understanding the True-Client-IP Header

Enabling the True-Client-IP Header adds the [True-Client-IP header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#true-client-ip-enterprise-plan-only) to all requests to your origin server, which includes the end user's IP address.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | No  | No       | No         | Yes |

## Add True-Client-IP Header

The recommended procedure to access client IP information is to [enable the **Add "True-Client-IP" header** Managed Transform](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-true-client-ip-header).

Note

To use this data, you will need to then retrieve it from the [True-Client-IP header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ipcountry).

## Additional resources

For additional guidance on using True-Client-IP Header with Cloudflare, refer to the following resources:

* [Available Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-true-client-ip-header)
* [Cloudflare HTTP headers](https://developers.cloudflare.com/fundamentals/reference/http-headers/#true-client-ip-enterprise-plan-only)
* [Restoring original visitor IPs](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network/","name":"Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/network/true-client-ip-header/","name":"Understanding the True-Client-IP Header"}}]}
```
