---
description: Fix errors when upgrading a zone or subscription.
title: Resolve the zone cannot be upgraded error
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

# Resolve the zone cannot be upgraded error

Last updated May 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/billing/troubleshoot/resolve-zone-cannot-be-upgraded/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When trying to upgrade a domain or purchase a subscription, you may see an error that contains one of the following phrases:

* "this zone cannot be upgraded"
* "there is a problem with your billing profile"

## Causes

* Your account may have an outstanding unpaid balance.
* Another account previously associated with the domain or zone may have an outstanding unpaid balance.

## Solution

This message appears when the account or domain involved has an outstanding unpaid balance. For a domain, this may also be triggered by a previous account that owned the domain.

1. Check each Cloudflare account you have access to for an outstanding balance. Refer to [Email address and password](https://developers.cloudflare.com/fundamentals/user-profiles/change-password-or-email/) if you have forgotten these details.
2. To pay the balance, refer to [Pay an outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/#pay-an-outstanding-balance).
3. Wait 24 hours after paying this balance.
4. Attempt the upgrade again.

As a reference, the full error messages you may see are:

* "Due to a Billing related issue, the zone cannot be upgraded at this time. Please visit the Billing section to ensure there is no outstanding balance."
* "Refer to [https://cfl.re/3VUQyyL ↗](https://cfl.re/3VUQyyL) for assistance. For security reasons, there is a problem with your billing profile."

## Verify the fix

After you pay the outstanding balance and wait 24 hours, return to the domain or subscription you were trying to purchase and retry the upgrade.

## Related resources

* [Pay an outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/) — Resolve unpaid balances
* [Change domain plan](https://developers.cloudflare.com/billing/manage/change-plan/) — Upgrade or downgrade your plan
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Look up other billing error messages

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/troubleshoot/resolve-zone-cannot-be-upgraded/#page","headline":"Resolve the zone cannot be upgraded error · Cloudflare Billing docs","description":"Fix errors when upgrading a zone or subscription.","url":"https://developers.cloudflare.com/billing/troubleshoot/resolve-zone-cannot-be-upgraded/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
