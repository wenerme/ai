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
* **Archiving**: You can archive security action items you do not wish to display in the main list.
* **Load more**: View the full list of security action items.

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
