---
title: Custom origin server
description: A custom origin server lets you send traffic from one or more custom hostnames to somewhere besides your default proxy fallback, such as:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom origin server

A **custom origin server** lets you send traffic from one or more custom hostnames to somewhere besides your default proxy fallback, such as:

* `soap.stores.com` goes to `origin1.com`
* `towel.stores.com` goes to `origin2.com`

## Requirements

To use a custom origin server, you need to meet the following requirements:

* Each custom origin needs to be a valid hostname with a proxied (orange-clouded) A, AAAA, or CNAME record in your account's DNS. You cannot use an IP address.
* The DNS record for the custom origin server does not currently support wildcard values.

## Use a custom origin

To use a custom origin, select that option when [creating a new custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/) in the dashboard or include the `"custom_origin_server": your_custom_origin_server` parameter when using the API [POST command](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/).

## SNI rewrites

Note

Only certain customers have access to this feature. For more details, see the [Plans page](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/).

When Cloudflare establishes a connection to your default origin server, the `Host` header and SNI will both be the value of the original custom hostname.

However, if you configure that custom hostname with a custom origin, the value of the SNI will be that of the custom origin and the `Host` header will be the original custom hostname. Since these values will not match, you will not be able to use the [Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) on your origins.

To solve this problem, you can contact your account team to request an entitlement for **SNI rewrites**.

### SNI rewrite options

Choose how your custom hostname populates the SNI value with SNI rewrites:

* **Origin server name** (default): Set SNI to the custom origin  
   * If custom origin is `custom-origin.example.com`, then the SNI is `custom-origin.example.com`.
* **Host header**: Set SNI to the host header (or a host header override)  
   * If wildcards are not enabled and the hostname is `example.com`, then the SNI is `example.com`.  
   * If wildcards are enabled, the hostname is `example.com`, and a request comes to `www.example.com`, then the SNI is `www.example.com`.
* **Subdomain of zone**: Choose what to set as the SNI value (custom hostname or any subdomain)  
   * If wildcards are not enabled and a request comes to `example.com`, choose whether to set the SNI as `example.com` or `www.example.com`.  
   * If wildcards are enabled, you set the SNI to `example.com`, and a request comes to `www.example.com`, then the SNI is `example.com`.

Important

* Currently, SNI Rewrite is not supported for wildcard custom hostnames. Subdomains covered by a wildcard custom hostname send the custom origin server name as the SNI value.
* In the [O2O context](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) (when requests are originating from a proxied hostname on a zone also on Cloudflare), changing the SNI value to use host header is currently not supported.
* SNI overrides defined in an [Origin Rule](https://developers.cloudflare.com/rules/origin-rules/) will take precedence over SNI rewrites.
* SNI Rewrite usage is subject to the [Service-Specific Terms ↗](https://www.cloudflare.com/service-specific-terms-application-services/#ssl-for-saas-terms).

### Set an SNI rewrite

To set an SNI rewrite in the dashboard, choose your preferred option from **Origin SNI value** when [creating a custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/).

To set an SNI rewrite via the API, set the `custom_origin_sni` parameter when [creating a custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/):

* **Custom origin name** (default): Applies if you do not set the parameter
* **Host header**: Specify `":request_host_header:"`
* **Subdomain of zone**: Set to `"example.com"` or another subdomain of the custom hostname

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/","name":"Advanced Settings"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/","name":"Custom origin server"}}]}
```
