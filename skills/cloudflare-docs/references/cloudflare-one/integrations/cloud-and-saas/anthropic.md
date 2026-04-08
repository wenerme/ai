---
title: Anthropic
description: The Anthropic integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Anthropic account that could leave you and your organization vulnerable.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/anthropic.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Anthropic

The Anthropic integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Anthropic account that could leave you and your organization vulnerable.

This integration covers the following Anthropic products:

* Claude Console (organizations, workspaces/projects, users, invites)
* Anthropic API Platform (organization and project API keys)

## Integration prerequisites

* An Anthropic [Team or Enterprise organization ↗](https://www.anthropic.com/pricing#team-&-enterprise)
* [Organization-level admin (or equivalent) privileges in Anthropic ↗](https://support.anthropic.com/articles/10186004-api-console-roles-and-permissions) to view organization metadata and manage API keys

## Integration permissions

For the Anthropic integration to function, Cloudflare CASB requires authorization via **API keys**:

* `Organization API key (organization-level)`: Grants read-only access to organization/workspace metadata, members and invites, and key metadata used for findings.
* (Optional) `Project API key (project-level)`: Grants read-only access to project metadata and keys when you include project scopes in the scan.

These credentials follow the principle of least privilege so that only the minimum required access is granted.

## Security findings

The Anthropic integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/anthropic.mdx.atom).

### API key hygiene

Detect API keys that may be unused or overdue for rotation.

| Finding type              | FindingTypeID                        | Severity |
| ------------------------- | ------------------------------------ | -------- |
| Anthropic: Unused API key | f343cd22-21f0-45a6-b6f7-39b1539a0f2b | Medium   |

### Access security

Flag organization access issues to help enforce best practices.

| Finding type                     | FindingTypeID                        | Severity |
| -------------------------------- | ------------------------------------ | -------- |
| Anthropic: High-privilege invite | a435d091-3bb1-42e1-bc98-32d80c6340a5 | High     |
| Anthropic: Stale pending invite  | 5667f7fa-4215-4a8e-80d7-4694ea33335b | Low      |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

| Finding type                                        | FindingTypeID                        | Severity |
| --------------------------------------------------- | ------------------------------------ | -------- |
| Anthropic: Downloadable File with DLP Profile match | 74ec2a38-0e69-48d4-80ed-a8faad5f40ef | High     |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/anthropic/","name":"Anthropic"}}]}
```
