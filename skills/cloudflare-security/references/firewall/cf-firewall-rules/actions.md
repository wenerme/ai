---
description: Review available actions for firewall rules.
title: Firewall rules actions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Firewall rules actions

Last updated Apr 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The action of a firewall rule tells Cloudflare how to handle HTTP requests that have matched the rule expression.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

## Supported actions

The table below lists the actions available in firewall rules. These actions are listed in order of precedence. If the same request matches two different rules which have the same priority, precedence determines the action to take.

For example, the *Allow* action takes precedence over the *Block* action. In a case where a request matches a rule with the *Allow* action and another with the *Block* action, precedence resolves the tie, and Cloudflare allows the request.

There are two exceptions to this behavior: the *Log* and *Bypass* actions. Unlike other actions, *Log* and *Bypass* do not terminate further evaluation within firewall rules. This means that if a request matches two different rules and one of those rules specifies the *Log* or *Bypass* action, the second action will be triggered instead, even though *Log*/*Bypass* has precedence.

Note

For reference information on rule actions available for Cloudflare products powered by the Ruleset Engine, refer to [Rules language: Actions](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/).

| Action | Description | Order of precedence |
| --- | --- | --- |
| **Log**<br><br>API value:<br> `log` | <ul><li>Records matching requests in the Cloudflare Logs.</li><li>Only available for Enterprise plans.</li><li>Recommended for validating rules before committing to a more severe action.</li></ul> | 1 |
| **Bypass**<br><br>API value:<br> `bypass` | <ul><li>Allows user to dynamically disable Cloudflare security features for a request.</li><li>Available to all plans.</li><li>Matching requests exempt from evaluation by a user-defined list containing one or more of the following Cloudflare security features:<ul><li>[User Agent Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/)</li><li>[Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/)</li><li>[Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)</li><li>[Security Level (IP Reputation)](https://developers.cloudflare.com/waf/tools/security-level/)</li><li>[Rate Limiting](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/) (previous version, deprecated)</li><li>[Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/)</li><li>[WAF managed rules](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/) (previous version, deprecated)</li></ul>**Notes:**<ul><li>Currently, you cannot bypass Bot Fight Mode. For more information on this product, refer to [Cloudflare bot solutions](https://developers.cloudflare.com/bots/).</li><li>You cannot bypass the new [WAF managed rules](https://developers.cloudflare.com/waf/managed-rules/) using this action, only the previous version of WAF managed rules. To skip one or more managed rules in the new WAF for specific requests, [create an exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/).</li></ul></li><li>Requests which match the *Bypass* action are still subject to evaluation (and thus a challenge or block) within Firewall Rules, based on the order of execution.</li></ul> | 2 |
| **Allow**<br><br>API value:<br> `allow` | <ul><li>Matching requests are exempt from *Bypass*, *Block*, and challenge actions triggered by other firewall rules.</li><li>The scope of the *Allow* action is limited to firewall rules; matching requests are **not** exempt from action by other Cloudflare security products such as Bot Fight Mode, IP Access Rules, and WAF Managed Rules.</li><li>Matched requests will be mitigated if they are part of a DDoS attack.</li></ul> | 3 |
| **Interactive Challenge**<br><br>API value:<br> `challenge` | <ul><li>This option is not recommended. Instead, choose **Managed Challenge**, which issues interactive challenges to visitors only when necessary.</li><li>The client that made the request must pass an interactive challenge.</li><li>If successful, Cloudflare accepts the matched request; otherwise, it is blocked.</li><li>For additional information, refer to [Notes about challenge actions](#notes-about-challenge-actions).</li></ul> | 4 |
| ** Managed Challenge**<br><br>API value:<br> `managed_challenge` | <ul><li>Helps reduce the lifetimes of human time spent solving interactive challenges across the Internet.</li><li>Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge from the following actions based on specific criteria:<ul><li>Show a non-interactive challenge page.</li><li>Show an interactive challenge (such as requiring the visitor to click a button or to perform a task).</li></ul></li><li>For additional information, refer to [Notes about challenge actions](#notes-about-challenge-actions).</li></ul> | 5 |
| **Non-Interactive Challenge**<br><br>API value:<br> `js_challenge` | <ul><li>Useful for ensuring that bots and spam cannot access the requested resource; browsers, however, are free to satisfy the challenge automatically.</li><li>The client that made the request must pass a Non-Interactive Cloudflare challenge before proceeding.</li><li>If successful, Cloudflare accepts the matched request; otherwise, it is blocked.</li><li>For additional information, refer to [Notes about challenge actions](#notes-about-challenge-actions).</li></ul> | 6 |
| **Block**<br><br>API value:<br> `block` | Matching requests are denied access to the site. | 7 |

## Notes about challenge actions

When you configure a firewall rule with one of the challenge actions — *Non-Interactive Challenge*, *Managed Challenge*, or *Interactive Challenge* — and a request matches the rule, one of two things can happen:

- The request is blocked if the visitor fails the challenge
- The request is allowed if the visitor passes the challenge

In this last case, no further firewall rules will be processed. This means that the action of any later rules with a challenge or *Block* action also matching the request will not be applied, and the request will be allowed.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/#page","headline":"Firewall rules actions · Cloudflare Firewall Rules (deprecated) docs","description":"Review available actions for firewall rules.","url":"https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
