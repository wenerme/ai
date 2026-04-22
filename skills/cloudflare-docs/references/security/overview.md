---
title: Security overview
description: Security overview provides an overview of your domain's security posture and allows you to quickly identify security action items that may need your attention.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security/overview.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Security overview

Security overview provides an overview of your domain's security posture and allows you to quickly identify security action items that may need your attention.

To access Security overview in the new security dashboard, go to the **Overview** page.

[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/security/overview) 

The Security overview page displays:

* Security action items
* Detection tools
* Traffic overview

## Security action items

**Security action items** shows you insights and recommendations related to misconfigurations, exposed infrastructure, and suspicious activity.

* **Action item types**:  
   * Suspicious activity  
   * Security insight
* **Criticality**: Your action items are ranked by the highest criticality, showing critical first, moderate, and low respectively.
* **Filters**: You can filter your action items by Criticality, Insight Type, and Security Category.  
   * Criticality:  
         * Low  
         * Moderate  
         * Critical  
   * Insight Types:  
         * Suspicious activity  
         * Exposed infrastructure  
         * Insecure configuration  
         * Configuration suggestion  
         * Compliance Violation  
         * Email Security  
         * Weak Authentication  
   * Security Category:  
         * Web application exploits  
         * AI exploits  
         * DDoS attacks  
         * Bot traffic  
         * API abuse  
         * Client-side abuse  
         * Fraud
* **Review**: Review your security action items for more detailed information and recommended actions to resolve.
* **Load more**: View the full list of security action items.

### Archive action items

You can archive security action items that you do not want to display in the main list. The following archive options are available:

* **False Positive**: Removes the action item from your active list and suppresses it indefinitely. Rationale text is optional.
* **Accept Risk**: Removes the action item from your active list and suppresses it indefinitely. Rationale text is required.
* **Other**: Removes the action item from your active list and suppresses it indefinitely. Rationale text is required.

You can move an action item from the archive back to the active list at any time.

Archiving suspicious activity

Archiving a detected suspicious activity will only archive that item from the security overview page. The suspicious activity will still appear in your security analytics dashboard.

### Audit log API endpoints

To view when an action item’s status was changed and the rationale provided for that change, use the following API commands to retrieve audit logs:

| Method | Path                                                                    | Description                                      |
| ------ | ----------------------------------------------------------------------- | ------------------------------------------------ |
| GET    | /api/accounts/{accountID}/insights/audit-log                            | List all audit logs for an account               |
| GET    | /api/accounts/{accountID}/insights/{insightID}/audit-log                | List audit logs for a specific issue             |
| GET    | /api/accounts/{accountID}/issues/audit-log                              | List all audit logs for account issues           |
| GET    | /api/accounts/{accountID}/issues/{insightID}/audit-log                  | List all audit logs for a specific issue         |
| GET    | /api/accounts/{accountID}/zones/{zoneID}/insights/audit-log             | List all audit logs for a domain                 |
| GET    | /api/accounts/{accountID}/zones/{zoneID}/insights/{insightID}/audit-log | List audit logs for a specific issue in a domain |

Refer to our [Security Center API documentation](https://developers.cloudflare.com/api/resources/security%5Fcenter) to review the action item audit logs by account, domain, or a specific `issue_id`.

## Detection tools

Review the available detection tools and what services are currently running to protect your domain against threats.

## Traffic overview

View the patterns and highlights from your domain's traffic in the past 30 days.

The Cloudflare dashboard displays:

* **Monthly requests**: View the monthly requests and traffic that has been mitigated by Cloudflare.
* **How you compare to your peers**: For enterprise plans, understand how your security posture compares to others in your industry protected by Cloudflare.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/overview/","name":"Security overview"}}]}
```
