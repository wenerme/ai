---
title: Error 1034
description: Troubleshoot Cloudflare 1034 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error 1034

## Error 1034: Edge IP Restricted

This error indicates that the IP address used for the domain is restricted by Cloudflare's edge validation.

### Common causes

#### Pointing to reserved IP addresses

Customers who previously pointed their domains to `1.1.1.1` will now encounter a `1034` error. This is due to edge validation checks in Cloudflare's systems to prevent misconfiguration and potential abuse.

**Resolution**: Ensure DNS records are pointed to IP addresses you control. If a placeholder IP address is needed for "originless" setups, use the IPv6 reserved address `100::` or the IPv4 reserved address `192.0.2.0`.

#### SaaS provider IP restrictions

If you are using a SaaS provider that uses [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/), the provider may restrict access to their infrastructure to validated IP addresses only. In this case, requests to their IP addresses from domains that are not properly configured with the provider will be blocked with a `1034` error.

**Resolution**: Verify that your domain is correctly configured with your SaaS provider. This typically involves:

1. Ensuring your DNS records point to the correct IP addresses or hostnames provided by your SaaS provider.
2. Confirming that your domain has been properly registered and validated with the SaaS provider's platform.
3. Contacting your SaaS provider's support team if you continue to experience this error after verifying your configuration.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1034/","name":"Error 1034"}}]}
```
