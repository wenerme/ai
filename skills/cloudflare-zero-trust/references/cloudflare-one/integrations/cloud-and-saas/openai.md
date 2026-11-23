---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Reference information for OpenAI in Zero Trust integrations.
title: OpenAI
image: https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/og.png?v=d2ec65b59efec2f1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAI

The OpenAI integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated OpenAI account that could leave you and your organization vulnerable.

This integration covers the following OpenAI products:

- ChatGPT Enterprise (Workspaces)
- OpenAI Platform Projects (API keys)
- GPTs (custom GPTs)

Note

Before you begin, ensure that OpenAI has enabled ChatGPT Enterprise Compliance API access for your organization. You will need a Project API key issued for your organization, your Organization ID, and your Workspace ID. These are available in your [OpenAI Project API Keys ↗︎](https://platform.openai.com/settings/organization/projects).

If Compliance API access is not yet turned on for your organization, refer to [Enable Compliance API access](#enable-combliane-api-access).

## Integration prerequisites

- An OpenAI organization with a ChatGPT Enterprise workspace
- Organization-level admin privileges to create and manage Admin API keys
- (Optional) A Project API key and the corresponding Project ID if you plan to include OpenAI Platform Projects in the scan scope

### Enable Compliance API access

Compliance API access is required to use the OpenAI CASB integration. To enable Compliance API access:

1. Contact `support@openai.com` to request access to the Compliance API for your organization and for the API key you will use with Cloudflare CASB. In your request, include:
   - The last four characters of the API key
   - The name of the API key
   - The name of the user who created the key
   - The requested scope ( `read`, `write`, or both)
2. OpenAI will verify the key and grant the requested Compliance API scopes.
3. After the scopes are granted, [add the OpenAI integration to CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/). When prompted, enter your Open AI Admin API key, Organization ID, and Workspace ID (available at `https://chatgpt.com/admin/settings`).

For more information, refer to the [OpenAI Help Center ↗︎](https://help.openai.com/articles/9261474-compliance-api-for-enterprise-customers).

## Integration permissions

For the OpenAI integration to function, Cloudflare CASB requires the following authorization via API keys:

- `Admin API key (organization-level)`: Grants read-only access to organization/workspace metadata, GPTs, users, invites, and audit/compliance objects exposed by the ChatGPT Enterprise Compliance API.
- (Optional) `Project API key (project-level)`: Grants read-only access to OpenAI Platform project metadata and keys.

These credentials follow the principle of least privilege so that only the minimum required access is granted.

## Security findings

The OpenAI integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/openai.mdx.atom).

### Model and tool governance

Flag risky tool and capability settings on custom GPTs.

| Finding type | FindingTypeID | Severity | ChatGPT Enterprise required |
| --- | --- | --- | --- |
| OpenAI: GPT with Custom Actions enabled | `6a0dfcff-bcbf-4dd3-8a6f-73c83ec9b564` | High | ✅ |
| OpenAI: GPT with Code Interpreter enabled | `203ba13f-3ba0-4d65-baf7-dd861de1ef70` | Medium | ✅ |
| OpenAI: GPT with web browsing enabled | `786369c9-7c68-4922-a949-0c5eacacf8ab` | Medium | ✅ |

### Publishing and sharing

Identify GPTs that are externally visible beyond your organization.

| Finding type | FindingTypeID | Severity | ChatGPT Enterprise required |
| --- | --- | --- | --- |
| OpenAI: GPT publicly accessible via GPT Store | `05c6b0f8-f5d9-4ee9-8a35-dc3a4d9884f8` | High | ✅ |
| OpenAI: GPT publicly accessible via public link | `10b14122-635b-431b-8485-a44eb897b005` | High | ✅ |

### API key hygiene

Detect API keys that may be stale, unused, or overdue for rotation.

| Finding type | FindingTypeID | Severity | ChatGPT Enterprise required |
| --- | --- | --- | --- |
| OpenAI: Admin API key not rotated | `1c2a1187-158e-470b-8605-311f88b93bbd` | High | ❌ |
| OpenAI: Project API key not rotated | `b0bb2471-2caf-4f18-90dd-15be50c72cdb` | High | ❌ |
| OpenAI: Unused admin API key | `655d1808-6a95-4c72-a10f-51caa0730e43` | Medium | ❌ |
| OpenAI: Unused project API key | `5fab5510-bdbe-40b2-917b-06ad330655a6` | Medium | ❌ |

### Access security

Flag user/invite issues to help enforce best practices.

| Finding type | FindingTypeID | Severity | ChatGPT Enterprise required |
| --- | --- | --- | --- |
| OpenAI: High-privilege invite | `b51e540f-30da-41ac-aed5-e6c83f9b18ed` | High | ❌ |
| OpenAI: Inactive user | `490c53da-038f-4e51-9622-8c1319497728` | Medium | ❌ |
| OpenAI: Stale pending invite | `af33ae0e-b87e-4a27-8b29-9bb21fc322f1` | Low | ❌ |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

| Finding type | FindingTypeID | Severity | ChatGPT Enterprise required |
| --- | --- | --- | --- |
| OpenAI: File in ChatGPT Conversation with DLP Profile match | `a269f21a-ab67-4bf5-b60c-73894ff44ac5` | High | ✅ |
| OpenAI: File in ChatGPT GPT with DLP Profile match | `852ad64e-31d7-4cd5-bc92-d9b75024291b` | High | ✅ |
| OpenAI: File in ChatGPT Project with DLP Profile match | `3fc07859-999e-4061-a08f-2e643e38439b` | High | ❌ |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/#page","headline":"OpenAI","description":"Reference information for OpenAI in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/og.png?v=d2ec65b59efec2f1","dateModified":"2026-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
