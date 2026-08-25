---
description: Safe practices for deploying and updating content security rules.
title: Deploy content security rules in production
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy content security rules in production

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/client-side-security/best-practices/deploy-rules-in-production/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Only available to customers with Client-Side Security Advanced.

Follow the practices on this page when deploying or updating [content security rules](https://developers.cloudflare.com/client-side-security/rules/) in a production environment. Applying rule changes without a validation period can block legitimate resources and disrupt your application for end users.

## Update rules safely

When updating content security rules in production, avoid the following:

* Do not edit an existing rule directly in production without testing first.
* Do not change a rule action from _Log_ to _Allow_ without a validation period.
* Do not delete all rules at once.

Instead, follow these practices:

* Test changes in a staging environment before applying them in production.
* Use the _Log_ [rule action](https://developers.cloudflare.com/client-side-security/rules/#rule-actions) for at least seven days before switching to _Allow_.
* Update one rule at a time.
* Monitor [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/) for 24 hours after each change.
* Document a rollback procedure before making changes.

## Pre-enforcement checklist

Complete the following checklist before switching a content security rule from _Log_ to _Allow_:

* The rule was tested in _Log_ mode for a minimum of seven days.
* Reviewed all [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/) and confirmed there are no unexpected blocks.
* Added all legitimate third-party resources to the rule allowlist.
* Tested the application on all major browsers (Chrome, Firefox, Safari, Edge).
* Configured [alerts](https://developers.cloudflare.com/client-side-security/alerts/) for rule violations.
* There is a documented rollback procedure that is ready to execute.

Caution

Switching a rule from _Log_ to _Allow_ without completing this checklist may block resources required by your application. This will directly affect your end users.

## Rollback a rule change

If a rule change causes unexpected violations or blocks legitimate resources:

1. Switch the rule action back to _Log_ to stop blocking resources immediately.
2. Review the [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/) to identify which resources were blocked.
3. Update the rule to include any missing resources.
4. Repeat the validation process before switching back to _Allow_ (blocks resources not present in the allowlist).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/best-practices/deploy-rules-in-production/#page","headline":"Deploy content security rules in production · Client-side security docs","description":"Safe practices for deploying and updating content security rules.","url":"https://developers.cloudflare.com/client-side-security/best-practices/deploy-rules-in-production/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CSP"]}
```
