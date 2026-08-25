---
description: Update your domain nameservers to Cloudflare for APO to work.
title: Change nameservers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt
> Use this file to discover all available pages before exploring further.

# Change nameservers

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/automatic-platform-optimization/get-started/change-nameservers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

After you [confirm your DNS records](https://developers.cloudflare.com/automatic-platform-optimization/get-started/confirm-dns-records/), change your nameservers.

Updating your domain to use Cloudflare's nameservers is a critical step to ensure Cloudflare can optimize and protect your site. Nameservers are your primary DNS controller and identify the location of your domain on the Internet.

Domain registrars can take up to 24 hours to process the nameserver updates. You will receive an email from Cloudflare once your site is activated.

## Lookup domain name registration

1. Visit [WHOIS ↗](https://lookup.icann.org/) to look up your domain name registration.
2. In the text field, enter your domain name without `https://www.` and select **Lookup**.
3. From **Domain Information**, make note of the nameserver information that displays. You will update those nameservers to point to Cloudflare.

We recommend keeping this browser tab or window open and opening a new tab or window for the next section.

## Update your nameserver with your domain registrar

1. Log in to the administrator account for your domain registrar.
2. Navigate to DNS Management.
3. Locate your nameserver information. Your nameservers should match the information from Step 3 of Lookup domain name registration.
4. Replace the existing nameserver information with the Cloudflare nameservers from Step 4 of Create the custom nameserver with Cloudflare.

Note

You may be prompted to confirm the nameserver change with your domain registrar. Confirm or continue after making the update.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/automatic-platform-optimization/get-started/change-nameservers/#page","headline":"Change nameservers · Cloudflare Automatic Platform Optimization docs","description":"Update your domain nameservers to Cloudflare for APO to work.","url":"https://developers.cloudflare.com/automatic-platform-optimization/get-started/change-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
