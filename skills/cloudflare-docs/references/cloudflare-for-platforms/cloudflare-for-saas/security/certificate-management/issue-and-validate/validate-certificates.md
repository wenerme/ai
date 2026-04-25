---
title: Validate
description: Learn which methods you should use to validate Cloudflare for SaaS certificates.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Validate

Before a certificate authority (CA) will issue a certificate for a domain, the requester must prove they have control over that domain. This process is known as domain control validation (DCV).

  
## DCV situations

### Non-wildcard certificates

Specific (non-wildcard) custom hostnames can use [HTTP based DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/) for certificate renewals, as long as:

* The hostname is pointing to the SaaS provider.
* The hostname's traffic is proxying through the Cloudflare network.

If your custom hostnames do not meet these requirements, use another validation method.

### Wildcard certificates

Wildcard custom hostnames require TXT-based validation. As the SaaS provider, you have two options for wildcard custom hostname certificate renewals:

  
* [DCV Delegation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/) (auto-issuance)
* [Manual](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/)

### Minimize downtime

If you want to minimize downtime, explore one of the following methods to issue and deploy the certificate before onboarding your customers:

* [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/): Place a one-time record at your authoritative DNS that allows Cloudflare to auto-renew all future certificate orders.
* [TXT validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/): Have your customers add a `TXT` record to their authoritative DNS.
* [Manual HTTP validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#http-manual): Add a `TXT` record at your origin.

### Minimize customer effort

If you value simplicity and your customers can handle a few minutes of downtime, you can rely on Cloudflare [automatic HTTP validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#http-automatic).

## Potential issues

To avoid or solve potential issues, refer to our [troubleshooting guide](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/","name":"Certificate management"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/","name":"Issue and validate certificates"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/","name":"Validate"}}]}
```
