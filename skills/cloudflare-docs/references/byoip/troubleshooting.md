---
title: Troubleshooting
description: Review common troubleshooting scenarios for BYOIP.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/troubleshooting/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshooting

The following topics are useful for troubleshooting BYOIP issues.

## uRPF filtering and packet loss

Routers receive IP packets and forward the packets to the destination IP address. Unicast Reverse Path Forwarding (uRPF) is a security feature that can prevent spoofing attacks. uRPF operates under two modes: strict and loose mode.

Under **strict mode**, the router performs two checks on incoming packets to look for a matching entry in the source routing table and to determine whether the interface that received the packet can be used to reach the source. If the incoming IP packets pass both checks, the packets are forwarded; if the checks do not pass, the packets are dropped.

When uRPF is set to loose mode, the router performs a single check when it receives an IP packet to look for a source's matching entry in the routing table.

If you are experiencing packet loss as a result of an upstream ISP implementing uRPF filtering, contact your ISP and request the link be set to **loose mode**.

## Non-SNI support

Currently, BYOIP cannot be used with [legacy custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/) to support [non-SNI](https://developers.cloudflare.com/ssl/reference/browser-compatibility/#non-sni-support) requests.

Instead, you can use Address Maps to set a default SNI for IPs on your account or zone. Refer to [Setup](https://developers.cloudflare.com/byoip/address-maps/setup/#non-sni-support) for further guidance.

## Self-serve onboarding API errors

When onboarding BYOIP prefixes via the API, you may encounter the following errors:

| Error code                        | Meaning                                                                                                     | Resolution                                                                                                                                                                                                                                                                             |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prefix\_not\_valid\_and\_approved | The prefix has not passed IRR validation, RPKI validation, and ownership verification (or manual approval). | Verify all three validation steps have completed. If one or more are failing, check prefix registration with your Regional Internet Registry (RIR) and your RPKI ROA configuration. If validation is passing but you are still seeing this error, contact support for manual approval. |
| incomplete\_bgp\_deployment       | Cannot create a BGP prefix without a default edge service binding configured.                               | Configure a default edge service binding before creating BGP prefixes.                                                                                                                                                                                                                 |
| advertise\_state\_locked          | Cannot create a BGP prefix — the default edge service binding is still deploying.                           | Wait for the edge service binding deployment to complete, then retry.                                                                                                                                                                                                                  |

Note

Self-serve BYOIP onboarding is not supported when BYOIP is used as a Magic Transit on-ramp configuration. For more information, refer to [Magic Transit with CDN](https://developers.cloudflare.com/byoip/service-bindings/magic-transit-with-cdn/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/troubleshooting/","name":"Troubleshooting"}}]}
```
