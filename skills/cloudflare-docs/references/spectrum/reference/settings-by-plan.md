---
title: Settings by plan
description: Certain fields in Spectrum request and response bodies require an Enterprise plan. To upgrade your plan, contact your account team.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/spectrum/reference/settings-by-plan.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Settings by plan

Certain fields in Spectrum request and response bodies require an Enterprise plan. To upgrade your plan, contact your account team.

Spectrum properties requiring an Enterprise plan:

| Name                 | Type    | Description                                                                                                                                                                                                                                                                                          | Example                                                   |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| origin\_dns          | object  | Method and parameters used to discover the origin server address via DNS. Valid record types are A, AAAA, SRV and empty (both A and AAA).A request must contain either an origin\_dns parameter or an origin\_direct parameter. When both are specified the service returns an HTTP 400 Bad Request. | origin\_dns: {type: A, name: mqtt.example.com, ttl: 1200} |
| origin\_port         | integer | The destination port at the origin.                                                                                                                                                                                                                                                                  | 22                                                        |
| proxy\_protocol      | string  | Enables Proxy Protocol to the origin. Spectrum supports v1, v2, and simple proxy protocols. Refer to [Proxy Protocol](https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/) for more details.                                                                                    | off                                                       |
| ip\_firewall         | boolean | Enables IP Access rules for this application.                                                                                                                                                                                                                                                        | true                                                      |
| tls                  | string  | Type of TLS termination for the application. Options are off (default, also known as Passthrough), flexible, full, and strict. Refer to [Configuration Options](https://developers.cloudflare.com/spectrum/reference/configuration-options/) for descriptions of each.                               | full                                                      |
| argo\_smart\_routing | boolean | Enables Argo Smart Routing for the application. Note that it is only available for TCP applications with traffic\_type set to direct.                                                                                                                                                                | true                                                      |

Review the [Spectrum API documentation](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/methods/list/) for example API requests.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/spectrum/","name":"Spectrum"}},{"@type":"ListItem","position":3,"item":{"@id":"/spectrum/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/spectrum/reference/settings-by-plan/","name":"Settings by plan"}}]}
```
