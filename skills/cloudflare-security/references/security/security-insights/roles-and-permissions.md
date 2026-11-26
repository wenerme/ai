---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Review dashboard roles and API token permissions for viewing Security Insights, managing findings, and controlling scans.
title: Roles and permissions
image: https://developers.cloudflare.com/security/security-insights/roles-and-permissions/og.png?v=b778df88b4815e20
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

# Roles and permissions

Security Insights separates access to findings, on-demand scans, and automatic scan settings. Permissions also depend on the account, domain, and product associated with an insight.

## Dashboard roles

Assign [member roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/) for the accounts or domains a member needs. These account-scoped roles provide the following access:

| Role | View insights | Archive or restore insights | Start on-demand scans | Turn automatic scans on or off |
| --- | --- | --- | --- | --- |
| Security Center Admin | All products | All products | Yes | Yes |
| Administrator | All products | All products | Yes | Yes |
| Super Administrator - All Privileges | All products | All products | Yes | Yes |
| Security Center Read | All products | No | No | No |
| Administrator Read Only | All products | No | No | No |
| DNS | DNS | DNS | Yes | No |
| Firewall | WAF | WAF | Yes | No |
| Page Shield | Client-side security | Client-side security | Yes | No |
| Page Shield Read | Client-side security | No | No | No |
| SSL/TLS, Caching, Performance, Page Rules, and Customization | SSL/TLS | SSL/TLS | Yes | No |

The **Domain Administrator**, **Domain Administrator Read Only**, and **Domain DNS** roles provide read-only access to DNS insights for their assigned domains. These roles do not grant insight archiving, on-demand scans, or account-wide automatic scan settings.

Access to Security Insights does not grant permission to change the underlying product configuration. For example, resolving an insight by changing a zone setting requires permission to edit that setting.

For least privilege, use **Security Center Read** to review findings. Use **Security Center Admin** to manage findings and scans without granting general account administration. Product-specific roles limit which findings a member can view and archive, but their on-demand scan permission is not limited to that product.

## API token permissions

Create an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the permission for your endpoint:

| Permission | Read | Edit (includes Read) |
| --- | --- | --- |
| Account Security Center Insights | View findings, account scan history, and automatic scan settings. | Archive or restore findings, start account scans, and turn automatic scans on or off. |
| Zone Security Center Insights | View findings and zone scan history. | Archive or restore findings and start zone scans. |

### Account and zone scope

Account permissions apply to selected accounts, not individual domains. Use them with `/accounts/{account_id}/security-center/insights` and `/accounts/{account_id}/security-center/state`. The account insights endpoint can also return zone-level findings for some products, but not all.

Zone permissions apply to selected zones and cover all supported zone products. To restrict access to specific domains, select only those zones and use `/zones/{zone_id}/security-center/insights`. You do not need separate product permissions to read these insights. Zone permissions do not grant access to automatic scan settings.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/security-insights/roles-and-permissions/#page","headline":"Roles and permissions","description":"Review dashboard roles and API token permissions for viewing Security Insights, managing findings, and controlling scans.","url":"https://developers.cloudflare.com/security/security-insights/roles-and-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/security/security-insights/roles-and-permissions/og.png?v=b778df88b4815e20","dateModified":"2026-11-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
