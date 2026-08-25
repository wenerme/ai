---
description: Review security action and rule field values.
title: Security fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Security fields

Last updated Jul 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/reference/security-fields/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Security fields contain rules to block requests that contain specific types of content.

## SecurityActions

| Value                                | Action         | Description                                                                                                                                                                |
| ------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unknown                              | Unknown        | Take no other action.                                                                                                                                                      |
| allow                                | Allow          | Bypass all subsequent rules.                                                                                                                                               |
| block                                | Drop           | Block with an HTTP status code of 403, 429, or any other [4XX](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/) status code. |
| challenge                            | Challenge Drop | Issue an interactive challenge.                                                                                                                                            |
| jschallenge                          | Challenge Drop | Issue a non-interactive challenge.                                                                                                                                         |
| log                                  | Log            | Take no action other than logging the event.                                                                                                                               |
| connectionClose                      | Close          | Close connection.                                                                                                                                                          |
| challengeSolved                      | Allow          | Allow once interactive challenge solved.                                                                                                                                   |
| challengeBypassed                    | Allow          | Interactive challenge is not issued again because the visitor had previously passed an interactive challenge and a valid cf\_clearance cookie is present.                  |
| jschallengeSolved                    | Allow          | Allow once non-interactive challenge solved.                                                                                                                               |
| jschallengeBypassed                  | Allow          | Non-interactive challenge not issued because the visitor had previously passed a non-interactive or interactive challenge.                                                 |
| bypass                               | Allow          | Bypass all subsequent firewall rules.                                                                                                                                      |
| managedChallenge                     | Challenge Drop | Issue managed challenge.                                                                                                                                                   |
| managedChallengeNonInteractiveSolved | Allow          | Allow once the managed challenge is solved via non-interactive interstitial page.                                                                                          |
| managedChallengeInteractiveSolved    | Allow          | Allow once the managed challenged is solved via interactive interstitial page.                                                                                             |
| managedChallengeBypassed             | Allow          | Challenge was not presented because visitor had clearance from previous challenge.                                                                                         |

## SecuritySources

| Value           | Description                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| unknown         | Used if an event is received from a new source but the logging system has not been updated.                      |
| asn             | Allow or block based on autonomous system number.                                                                |
| country         | Allow or block based on country.                                                                                 |
| ip              | Allow or block based on IP address.                                                                              |
| ipRange         | Allow or block based on range of IP addresses.                                                                   |
| securityLevel   | Allow or block based on requester's security level.                                                              |
| zoneLockdown    | Restrict all access to a specific zone.                                                                          |
| waf             | Allow or block based on the WAF product settings. This is the WAF/managed rules system that is being phased out. |
| firewallRules   | Allow or block based on a zone's firewall rules configuration (deprecated).                                      |
| uaBlock         | Allow or block based on the Cloudflare User Agent Blocking product settings.                                     |
| rateLimit       | Allow or block based on a rate limiting rule, whether set by you or by Cloudflare.                               |
| bic             | Allow or block based on the Browser Integrity Check product settings.                                            |
| hot             | Allow or block based on the Hotlink Protection product settings.                                                 |
| l7ddos          | Allow or block based on the L7 DDoS product settings.                                                            |
| validation      | Allow or block based on a request that is invalid (cannot be customized.)                                        |
| botFight        | Allow or block based on the Bot Fight Mode (classic) product settings.                                           |
| botManagement   | Allow or block based on the Bot Management product settings.                                                     |
| dlp             | Allow or block based on the Data Loss Prevention product settings.                                               |
| firewallManaged | Allow or block based on WAF Managed Rules' settings.                                                             |
| firewallCustom  | Allow or block based on a rule configured in WAF custom rules.                                                   |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/reference/security-fields/#page","headline":"Security fields · Cloudflare Logs docs","description":"Review security action and rule field values.","url":"https://developers.cloudflare.com/logs/reference/security-fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
