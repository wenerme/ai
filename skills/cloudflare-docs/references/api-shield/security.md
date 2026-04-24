---
title: Security
description: Discover, validate, and protect API endpoints with API Shield security features.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/security/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Security

Cloudflare offers the following features to help secure your APIs:

| Discovery & management                                                                                                         | Posture management                                                                                                  | Runtime protection                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/)                                          | [Volumetric Abuse Detection](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/)     | [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/)     |
| [Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/) | [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/)             | [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/)           |
| [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/)                                | [BOLA vulnerability detection](https://developers.cloudflare.com/api-shield/security/bola-vulnerability-detection/) | [Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) |
| [Risk labels](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels)             | [Mutual TLS (mTLS)](https://developers.cloudflare.com/api-shield/security/mtls/)                                    |                                                                                                   |
| [Vulnerability Scanner](https://developers.cloudflare.com/api-shield/security/vulnerability-scanner/)                          | [GraphQL query protection](https://developers.cloudflare.com/api-shield/security/graphql-protection/)               |                                                                                                   |

## Example Cloudflare solutions

Cloudflare's API Shield — together with other compatible Cloudflare products — helps protect your API from the issues detailed in the [OWASP® API Security Top 10 ↗](https://owasp.org/www-project-api-security/).

The following table provides examples of how you might match Cloudflare products to OWASP vulnerabilities:

| OWASP issue                                     | Example Cloudflare solution                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Broken Object Level Authorization               | [BOLA vulnerability detection](https://developers.cloudflare.com/api-shield/security/bola-vulnerability-detection/), [Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/), [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/), [Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/), [Vulnerability Scanner](https://developers.cloudflare.com/api-shield/security/vulnerability-scanner/) |
| Broken Authentication                           | [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/), [mTLS](https://developers.cloudflare.com/api-shield/security/mtls/), [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/), [Exposed Credential Checks](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/), [Bot Management](https://developers.cloudflare.com/bots/)                                                                                                                                                  |
| Broken Object Property Level Authorization      | [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/)                                                                                                                                                                                                                                                                                                                                                                                                             |
| Unrestricted Resource Consumption               | [Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/), [Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/), [Bot Management](https://developers.cloudflare.com/bots/), [GraphQL Query Protection](https://developers.cloudflare.com/api-shield/security/graphql-protection/)                                                                                                                                                                                                                                                   |
| Broken Function Level Authorization             | [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/)                                                                                                                                                                                                                                                                                                                                                                                                             |
| Unrestricted Access to Sensitive Business Flows | [Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/), [Bot Management](https://developers.cloudflare.com/bots/), [GraphQL Query Protection](https://developers.cloudflare.com/api-shield/security/graphql-protection/)                                                                                                                                                                                                                                                                                                                                |
| Server Side Request Forgery                     | [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), [WAF managed rules](https://developers.cloudflare.com/waf/managed-rules/), [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/)                                                                                                                                                                                                                                                                                                                                                  |
| Security Misconfiguration                       | [Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/), [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), [WAF managed rules](https://developers.cloudflare.com/waf/managed-rules/), [GraphQL Query Protection](https://developers.cloudflare.com/api-shield/security/graphql-protection/)                                                                                                                                                                                                                 |
| Improper Inventory Management                   | [Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/), [Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/#endpoint-schema-learning)                                                                                                                                                                                                                                                                                                                                                                                             |
| Unsafe Consumption of APIs                      | [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/), [WAF managed rules](https://developers.cloudflare.com/waf/managed-rules/)                                                                                                                                                                                                                                                                                                                                                                                                                                 |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}}]}
```
