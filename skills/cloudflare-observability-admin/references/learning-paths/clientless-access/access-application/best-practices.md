---
description: Follow recommended deployment best practices.
title: Best practices
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Best practices

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/clientless-access/access-application/best-practices/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Learn best practices for building scalable Access applications and policies.

## Create reusable policy components

If you have many policies that contain duplicate rules, we recommend [building a rule group](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/) and referencing it across multiple policies. For example, you could define a rule group for "corporate users", which has both device posture check requirements and specific emails, or just “developers”, which references a group in your identity provider.

## Define your domain structure

Access applications have an inherently flexible and powerful domain structure capability. Your domain structure should achieve your application security goals without being overly permissive or overly restrictive. Before designing applications for production, review the [Application paths documentation](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) to understand how path definitions work and how to use wildcards.

### Multiple domains in an application

Many customers who have workflows designed around internal web applications, especially those that were built internally, often see challenges related to interdependencies on multiple internal services. Separately, there can be challenges related to SPAs (Single-Page Applications) that make deploying clientless access difficult. For example, an application may have iFrames or other embedded systems that rely on different internal and/or external addresses.

If your internal service operates in this way, we recommend specifying multiple top-level domains in a single Access application. Otherwise, if the goal of using multiple domains is to streamline or simplify policy creation, we recommend making one primary domain per application, and automating the rest of your deployment [using Terraform](https://developers.cloudflare.com/learning-paths/clientless-access/terraform/) or another Infrastructure as Code (IaC) service.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/access-application/best-practices/#page","headline":"Best practices · Cloudflare Learning Paths","description":"Follow recommended deployment best practices.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/access-application/best-practices/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
