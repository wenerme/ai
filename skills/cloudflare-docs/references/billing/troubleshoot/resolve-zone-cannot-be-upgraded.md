---
title: Resolve the zone cannot be upgraded error
description: Fix errors when upgrading a zone or subscription.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Resolve the zone cannot be upgraded error

When trying to upgrade a domain or purchase a subscription, you may see an error that contains one of the following phrases:

* "this zone cannot be upgraded"
* "there is a problem with your billing profile"

## Causes

* Your account may have an outstanding unpaid balance
* Another account previously associated with the domain / zone your purchase relates to has an outstanding unpaid balance

## Solution

This message appears when the account or domain involved has an outstanding unpaid balance. In the case of a domain, this may also be triggered by a previous account that owned the domain. To resolve this you will need to:

1. Check each Cloudflare account you have access to for an outstanding balance. Refer to [Email address and password](https://developers.cloudflare.com/fundamentals/user-profiles/change-password-or-email/) if you have forgotten these details.
2. Refer to [Pay an outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/#pay-an-outstanding-balance) to pay this balance
3. Wait 24 hours after paying this balance
4. Attempt to upgrade again

As a reference, the full error messages you may see are:

* "Due to a Billing related issue, the zone cannot be upgraded at this time. Please visit the Billing section to ensure there is no outstanding balance."
* "Refer to [https://cfl.re/3VUQyyL ↗](https://cfl.re/3VUQyyL) for assistance. For security reasons, there is a problem with your billing profile."

## Related resources

* [Pay an outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/) — Resolve unpaid balances
* [Change domain plan](https://developers.cloudflare.com/billing/manage/change-plan/) — Upgrade or downgrade your plan
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Look up other billing error messages

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/troubleshoot/","name":"Troubleshoot"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/troubleshoot/resolve-zone-cannot-be-upgraded/","name":"Resolve the zone cannot be upgraded error"}}]}
```
