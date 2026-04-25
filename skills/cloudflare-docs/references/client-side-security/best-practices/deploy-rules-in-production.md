---
title: Deploy content security rules in production
description: Safe practices for deploying and updating content security rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Deploy content security rules in production

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

Warning

Switching a rule from _Log_ to _Allow_ without completing this checklist may block resources required by your application. This will directly affect your end users.

## Rollback a rule change

If a rule change causes unexpected violations or blocks legitimate resources:

1. Switch the rule action back to _Log_ to stop blocking resources immediately.
2. Review the [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/) to identify which resources were blocked.
3. Update the rule to include any missing resources.
4. Repeat the validation process before switching back to _Allow_ (blocks resources not present in the allowlist).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/best-practices/deploy-rules-in-production/","name":"Deploy content security rules in production"}}]}
```
