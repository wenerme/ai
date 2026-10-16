---
description: Heuristics, machine learning, and behavioral analysis engines used to detect bots.
title: Bot detection engines
image: https://developers.cloudflare.com/bots/concepts/bot-detection-engines/og.png?v=9c9fae9edf429751
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Bot detection engines

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare uses multiple detection engines because different bot types require different detection strategies. Simple bots can be caught by pattern matching against known signatures, while sophisticated bots require machine learning and behavioral analysis.

The engines available to your domain depend on your plan.

## Heuristics

The **Heuristics** engine processes all requests. Cloudflare conducts a number of heuristic checks to identify automated traffic, and requests are matched against a growing database of malicious fingerprints.

## JavaScript detections

The [**JavaScript Detections (JSD)**](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/) engine identifies headless browsers and other malicious fingerprints. This engine performs a lightweight, invisible JavaScript injection on the client side of any request while honoring our [strict privacy standards ↗︎](https://www.cloudflare.com/privacypolicy/). We do not collect any personally identifiable information during the process. The JSD engine either blocks, challenges, or passes requests to other engines.

JSD is completely optional. To adjust your settings, configure Super Bot Fight Mode from **Security** > **Bots**.

## Adaptive Intelligence (Business and Enterprise)

**Adaptive Intelligence** is Cloudflare's machine learning engine, and it accounts for the majority of all bot detections. It distinguishes between human and automated traffic using large volumes of anonymized data from across Cloudflare's global network, which proxies billions of requests daily.

The engine uses supervised machine learning to determine the final bot score (1–99):

- **Input variables (X):** Request features, including headers, session characteristics, and browser signals, collected from traffic across the Cloudflare network.
- **Output variable (Y):** The predicted probability that a client is human, mapped to the final 1–99 bot score.

You can analyze the request features this model uses in your own logs, through [Logpull](https://developers.cloudflare.com/logs/logpull/) or [Logpush](https://developers.cloudflare.com/logs/logpush/).

Earlier models shipped as fixed versions, months or years apart. Adaptive Intelligence retrains more frequently, so it responds to new attack patterns as they emerge instead of on a fixed schedule.

Model updates do not change your WAF rules, challenge flows, or Bot Management configuration. However, bot scores can shift as the model learns, so periodically review rules that use bot score to confirm they still work as intended.

Enterprise customers with auto-updates to the machine learning model turned on get Adaptive Intelligence. To check or change the setting:

1. In the Cloudflare dashboard, go to the **Security Settings** page. [Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot Management**.
4. Under **Configurations**, select the edit icon for **Auto-update machine learning** and turn it on.

If you do not enable auto-updates, a fixed model version continues to score your traffic. To learn what changes when you enable auto-updates, refer to [Machine Learning models](https://developers.cloudflare.com/bots/reference/machine-learning-models/).

## Anomaly detection (Enterprise)

Deprecation notice

Cloudflare is deprecating the Anomaly Detection engine and is not onboarding new customers. Future behavioral detections will cover the same detection areas.

The **Anomaly Detection (AD)** engine is an optional detection engine that uses a form of unsupervised learning. Cloudflare records a baseline of your domain's traffic and uses the baseline to intelligently detect outlier requests. This approach is user agent-agnostic and can be turned on or off by your account team.

Cloudflare does not recommend AD for domains that use [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) or expect large amounts of API traffic. The AD engine immediately gives automated requests a score of one.

## Notes on detection

Cloudflare uses the `__cf_bm` cookie to smooth out the bot score and reduce false positives for actual user sessions.

The Bot Management cookie measures a single user's request pattern and applies it to the machine learning data to generate a reliable bot score for all of that user's requests.

For more details, refer to [Cloudflare Cookies](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/).

You can disable the `__cf_bm` cookie using the `bm_cookie_enabled` field [via the API](https://developers.cloudflare.com/api/resources/bot_management/methods/update/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/concepts/bot-detection-engines/#page","headline":"Bot detection engines","description":"Heuristics, machine learning, and behavioral analysis engines used to detect bots.","url":"https://developers.cloudflare.com/bots/concepts/bot-detection-engines/","inLanguage":"en","image":"https://developers.cloudflare.com/bots/concepts/bot-detection-engines/og.png?v=9c9fae9edf429751","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
