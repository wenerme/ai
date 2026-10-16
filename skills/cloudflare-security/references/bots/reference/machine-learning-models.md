---
description: Manage auto-updates for Bot Management machine learning models.
title: Machine Learning models
image: https://developers.cloudflare.com/bots/reference/machine-learning-models/og.png?v=2c5a51dacee49773
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Machine Learning models

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/bots/reference/machine-learning-models/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Enable auto-updates to the Machine Learning models

Enterprise customers with auto-updates to the machine learning model turned on get Adaptive Intelligence. To check or change the setting:

1. In the Cloudflare dashboard, go to the **Security Settings** page. [Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot Management**.
4. Under **Configurations**, select the edit icon for **Auto-update machine learning** and turn it on.

### What will change

Enabling auto-updates moves your traffic onto the model behind Adaptive Intelligence. This model retrains more frequently than fixed, numbered versions were released, so your bot score reflects newly identified attack patterns as the model learns them, rather than only when a new version ships.

If you are on an older, fixed Machine Learning model, you will see a score change to requests scored by the **Machine Learning** source as soon as you enable auto-updates.

### Risks of not updating

If you do not enable auto-updates, your traffic continues to be scored by your current fixed model version. Cloudflare does not maintain or monitor fixed model versions after they are superseded, and scoring accuracy degrades as attack patterns evolve beyond what that version was trained on.

### Model versions and release notes

The following table lists released versions through v9, the final fixed version. Enabling auto-updates moves you off numbered versions entirely, onto Adaptive Intelligence.

| Version | Release Notes | Launch Date |
| --- | --- | --- |
| v1 | First Machine Learning Model released. | Q1 2019 |
| v2 | Introduced dynamic inter-request features to leverage the Cloudflare network to detect new bots more accurately. <br><br>Feedback other Bot Management detection mechanisms to the machine learning model to more accurately detect bots. | Q1 2020 |
| v3 | Fixed accuracy issues under some conditions in the previous version. | Q2 2020 |
| v4 | Improved scoring for iOS devices. <br><br>Fixed scoring inaccuracy in Firefox builds. | Q1 2021 |
| v5 | Recalibrated model for the [removal of `_cfduid` cookie ↗︎](https://blog.cloudflare.com/deprecating-cfduid-cookie/). <br><br> Introduced new signals to reduce false negatives. | Q2 2021 |
| v6 | Significantly improved scoring for native Android application traffic. <br><br>Improved scoring on the newest versions of Chromium browsers. | Q1 2022 |
| v7 | Increased recognition of distributed botnets. <br><br>Improved HTTP/3 scoring. | Q1 2024 |
| v8 | Improved detection of residential proxies. <br><br>Increased weight on network level traffic characteristics. | Q2 2024 |
| v9 | Improved model consistency and model efficacy against randomization attack techniques | Q2 2025 |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/reference/machine-learning-models/#page","headline":"Machine Learning models","description":"Manage auto-updates for Bot Management machine learning models.","url":"https://developers.cloudflare.com/bots/reference/machine-learning-models/","inLanguage":"en","image":"https://developers.cloudflare.com/bots/reference/machine-learning-models/og.png?v=2c5a51dacee49773","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
