---
description: Secure Internet traffic and SaaS apps.
title: Understand and streamline policy creation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Understand and streamline policy creation

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Before you begin building security policies, there are a few key details about Gateway to review.

The next few modules will cover the breadth of types of policies and actions that can be accomplished by sending traffic through the Cloudflare Gateway inspection engine. This implementation guide assumes that your goals are to block threat actors from using attack vectors on your user base (such as malware, complex phishing attempts, and credential theft), as well as detection and prevention of threats to your corporate data (data loss prevention). These security threats may take internal and external forms. Separately, we will detail building threat prevention that uses our Remote Browser Isolation technology to maximally reduce the theoretical attack surface for your users.

This guide will provide you with a baseline of recommended policies to build and address common questions about policy building and accomplishing explicit outcomes.

## Objectives

By the end of this module, you will be able to:

* Understand the order Gateway enforces policies for filtering traffic.
* Create reusable lists for Gateway policies.
* Subscribe to indicator feeds for advanced threat intelligence.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/#page","headline":"Understand and streamline policy creation · Cloudflare Learning Paths","description":"Secure Internet traffic and SaaS apps.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
