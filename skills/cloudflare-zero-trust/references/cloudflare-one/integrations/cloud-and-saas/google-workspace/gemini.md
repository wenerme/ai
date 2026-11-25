---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Reference information for Gemini for Google Workspace in Zero Trust integrations.
title: Gemini for Google Workspace
image: https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/og.png?v=48c0dbb76d382a5b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Gemini for Google Workspace

The Gemini for Google Workspace integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

- A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
- A Google Workspace user with [Super Admin privileges ↗︎](https://support.google.com/a/answer/2405986) and [Owner permissions ↗︎](https://cloud.google.com/iam/docs/understanding-roles) in the Google Cloud Platform (GCP) project used

## Integration permissions

Refer to [Google Workspace integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Gemini for Google Workspace integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/gemini.mdx.atom).

### User account settings

| Finding type | FindingTypeID | Severity | Description |
| --- | --- | --- | --- |
| Google Workspace: Admin user with Gemini license with two-factor authentication disabled | `4d179f48-ab14-4f20-a45c-2bcf8228d95d` | High | An administrator with a Gemini for Google Workspace license does not have two-factor authentication enabled. |
| Google Workspace: User with Gemini license with two-factor authentication disabled | `1b33c200-c0cc-4c55-99fa-92c16a98976e` | Medium | A user with a Gemini for Google Workspace license does not have two-factor authentication enabled. |

### Inactive or suspended users

| Finding type | FindingTypeID | Severity | Description |
| --- | --- | --- | --- |
| Google Workspace: Admin user suspended with AI Ultra license | `0d19a636-e4ca-4ab1-b590-7e0ff19c7fef` | Low | An administrator account with an AI Ultra (Gemini for Workspace) license is suspended. |
| Google Workspace: User suspended with AI Ultra license | `e642db61-dc20-4742-89c4-b8041ed237cb` | Low | A user account with an AI Ultra (Gemini for Workspace) license is suspended. |

### Gemini licensing

| Finding type | FindingTypeID | Severity | Description |
| --- | --- | --- | --- |
| Google Workspace: Admin user with AI Ultra license | `c7519b56-d42a-4eda-ba59-21a0b30ad94a` | Low | An administrator in Google Workspace is assigned an AI Ultra (Gemini for Workspace) license. |
| Google Workspace: User with AI Ultra license | `8299627e-19cd-4ae1-95ba-35ab6ec78413` | Low | A user in Google Workspace is assigned an AI Ultra (Gemini for Workspace) license. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/#page","headline":"Gemini for Google Workspace","description":"Reference information for Gemini for Google Workspace in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/og.png?v=48c0dbb76d382a5b","dateModified":"2026-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google","AI"]}
```
