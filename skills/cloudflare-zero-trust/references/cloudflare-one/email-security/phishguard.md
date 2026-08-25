---
description: PhishGuard in Email Security.
title: PhishGuard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# PhishGuard

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

PhishGuard is a team of analysts that routinely inspects your email environment and responds to threats that come through your email inbox.

While Email security uses advanced technologies to protect your email inbox, PhishGuard offers an additional human component to protect your email environment against impersonation events, suspicious items, false negatives/false positives, and any new event that automated intelligent systems may miss due to a lack of context (for example, a compromised account activity).

PhishGuard only works on a post-delivery environment (only emails that have already landed in your email inbox are reviewed). As a result, PhishGuard analysts may [submit a message for review](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/#submit-messages-for-review) or [auto-move](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) based on their findings.

Caution

Auto-moves are mandatory for PhishGuard customers.

PhishGuard coordinates with the email detections team, allowing you to directly request immediate detection for specific items and implement custom detections unique to your needs. An example of this is requesting to block all PayPal traffic if you do not use PayPal for invoicing. This capability allows you to take ownership over the rules governing your email environment through PhishGuard's human intervention.

Additionally, PhishGuard analysts:

* Use real-time threat data to identify malicious activity. Email-based threats are responded to rapidly, and immediately reported and documented.
* Review every [user](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#user-submissions) and [team](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#team-submissions) submission so your security team can focus on more critical activities.
* Help you detect and mitigate threats faster, reducing the time attacks have access to your network. This also helps reducing business impact, because it prevents data breaches, financial loss, and reputational damage.

To use PhishGuard:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **PhishGuard**.

The dashboard will display the following metrics:

* ROI Calculator
* Insider threat defense
* Email threat hunting
* Actions
* API Status
* Managed email security operations
* Reports

## ROI Calculator

Use the ROI Calculator to compare triage durations and hourly rates to calculate PhishGuard's return on investment.

The ROI Calculator displays:

* Total aggregated saved number in USD dollars.
* Triage duration: The amount of time in minutes spent triaging the message.
* Hourly rate.

## Insider threat defense

An [insider threat ↗](https://www.cloudflare.com/en-gb/learning/access-management/what-is-an-insider-threat/) is a risk to an organization's security stemming from someone associated with the organization. PhishGuard looks for threat actor groups.

Insider threat defense on the dashboard displays **Insider leads** and **Insider reports generated**. **Insider leads** displays the number of emails identified as potential insider threat email. **Insider reports generated** displays the number of reports created based on insider leads.

## Email threat hunting

PhishGuard reviews suspicious and highly malicious activity in your email environment.

On the Cloudflare One dashboard, email threat hunting displays previously unknown phishing attacks.

Email threat hunting also gives you information on **Threat leads generated** and **Total reposts generated**.

## Actions

**Actions** allows you to review the most common actions taken by the PhishGuard team, such as escalations, threat hunts, and moves.

## API Status

API Status allows you to monitor and configure the current status of API message auto-moves and directory integrations.

Select **Message moves** to [configure auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/). Select **Directory integration** to [configure directories](https://developers.cloudflare.com/cloudflare-one/email-security/directories/).

## Managed email security operations

Managed email security operations allows you to review the results of phish submissions reviewed by the PhishGuard team.

It displays the following:

* Total [phish submissions](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/)
* Tracked incidents
* Median time to resolve
* Resolved track incidents

## Reports

Under Reports, you can review reports of threats discovered and resolved by the PhishGuard team.

If you select the three dots, you can:

* **View report details**: Report Details gives you the following information about each report:
  * **Overview**: An Overview of the report. This includes date and time of the report, type of attack performed, and more.
  * **Target and victimology**: Company targeted.
  * **Details**: Displays information such as delivery disposition, current disposition, ES Alert ID, Message-ID, Timestamp, Subject, and Attempted Fraudulent Amount.
  * **Indicators of compromise (IOC)**: [Indicators of compromise (IOC) ↗](https://www.cloudflare.com/en-gb/learning/security/what-are-indicators-of-compromise/) are information about a specific security breach that can help security teams determine if an attack has taken place.
* Preview email.
* [Move email](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/#page","headline":"PhishGuard · Cloudflare One docs","description":"PhishGuard in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
