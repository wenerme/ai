---
description: Reference information for Anthropic in Zero Trust integrations.
title: Anthropic
image: https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/og.png?v=787f204cd48c2228
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Anthropic

Last updated Oct 8, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Anthropic integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Anthropic account that could leave you and your organization vulnerable.

This integration covers the following Anthropic products:

- Claude Console (organizations, workspaces/projects, users, invites)
- Anthropic API Platform (organization and project API keys)

Note

To detect data loss prevention and posture findings, your organization must have Anthropic's Compliance API enabled. Contact your Anthropic representative to request access. When enabled, admin keys created in the Claude Console automatically include the `read:compliance_activities` scope.

## Integration prerequisites

- An Anthropic [Enterprise or Platform organization ↗︎](https://www.anthropic.com/pricing#team-&-enterprise)
- [Organization-level admin (or equivalent) privileges in Anthropic ↗︎](https://support.anthropic.com/articles/10186004-api-console-roles-and-permissions) to view organization metadata and manage API keys

## Integration permissions

For the Anthropic integration to function, Cloudflare CASB requires authorization via **API keys**:

- `Admin API key (organization-level)`: Grants read-only access to organization/workspace metadata, members and invites, key metadata, and compliance activities used for findings.
- (Optional) `Project API key (project-level)`: Grants read-only access to project metadata and keys when you include project scopes in the scan.

These credentials follow the principle of least privilege so that only the minimum required access is granted.

## Security findings

The Anthropic integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/anthropic.mdx.atom).

### API key hygiene

Detect API keys that may be unused or overdue for rotation.

| Finding type | FindingTypeID | Severity |
| --- | --- | --- |
| Anthropic: Unused API key | `7e9bcc48-9548-4404-9bb2-83847150fc17` | Medium |

### Access security

Flag organization access issues to help enforce best practices.

| Finding type | FindingTypeID | Severity |
| --- | --- | --- |
| Anthropic: High-privilege invite | `c4658dc8-3edf-4f14-920c-3843eabab095` | High |
| Anthropic: Stale pending invite | `43d50e14-9b07-48bc-a060-111a629fe19a` | Low |
| Anthropic: Claude Project visible across organization | `019e4777-9f9a-7285-b46a-5590116a6c50` | Medium |
| Anthropic: Claude Cowork enabled for role | `019e4777-9fa0-7b0e-9ce3-dfc3ac86c840` | High |
| Anthropic: Claude Connector Always Allowed enabled for role | `019e4777-9fa3-7155-b92d-c9fa5979803a` | High |
| Anthropic: Claude for Chrome enabled for role | `019e4777-9fa5-736a-85c9-4cfa73e23a09` | High |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

| Finding type | FindingTypeID | Severity |
| --- | --- | --- |
| Anthropic: Downloadable File with DLP Profile match | `c6546fee-b2b0-4151-9546-6008f9430706` | High |
| Anthropic: Claude Chat User Prompt with DLP Profile match | `719e347a-2fef-40f0-bd70-52d85996dfd2` | High |
| Anthropic: Claude Chat Assistant Response with DLP Profile match | `f2cd2eaf-b592-4bcc-8308-5975ac9a12bc` | High |
| Anthropic: Claude Chat Uploaded File with DLP Profile match | `c6afd6fa-6969-4214-afa8-a83a08cc611c` | High |
| Anthropic: Claude Chat Generated File with DLP Profile match | `15206512-4af6-466c-8f08-82a9151d4b79` | High |
| Anthropic: Claude Project File with DLP Profile match | `9e5d6c1d-66d7-4a5a-93f4-aa7971e4815a` | High |
| Anthropic: Claude Project Document with DLP Profile match | `40438417-a3f2-41ed-b370-51390e8c7594` | High |
| Anthropic: Claude Chat Artifact with DLP Profile match | `c3fc58b0-24f6-4cea-a99d-67555bceca01` | High |
| Anthropic: Claude Project Instructions with DLP Profile match | `e1d66413-79d6-46be-a841-a38a541d94a6` | High |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/#page","headline":"Anthropic","description":"Reference information for Anthropic in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/og.png?v=787f204cd48c2228","dateModified":"2026-10-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
