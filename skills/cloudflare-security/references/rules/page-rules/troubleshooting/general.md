---
description: Resolve common issues with Page Rules configuration.
title: Troubleshoot Page Rules - General
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshoot Page Rules - General

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/page-rules/troubleshooting/general/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Consider alternative [Rules](https://developers.cloudflare.com/rules/) options due to their enhanced configurability. Refer to the [migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

For more flexibility and customization, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Why is a page rule not working?

The most common reason that a page rule is not working — such as URL forwarding — is that the page rule you created is on a record that is not proxied by Cloudflare in your [DNS settings](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Consider an example where you have a page rule that redirects a subdomain (`subdomain.yoursitename.com`) back to your apex domain (`yoursitename.com`). If you do not have that record proxied in your DNS settings for the subdomain record, Cloudflare's proxy is not running over the record and a page rule will not work because it is going direct to your server.

## Error 500 (Internal server error)

### Root cause

This may be due to a configuration issue on a page rule. When creating a page rule that uses two wildcards, like a _Forwarding URL_ rule, it is possible to create a rule that mentions the second wildcard with the `$2` placeholder. Refer to the example below:

![Example Page Rule configuration with two wildcards. The forwarding URL contains a $2 placeholder, which will be replaced with the content matched by the second ](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=600,height=250,format=webp/_astro/page-rule-create.G2sl-mqe.png)

When updating the same rule, you can remove one of the wildcard in the **If the URL matches** field and save it. Refer to the example below:

![Incorrect Page Rule configuration with a single wildcard, but still using the $2 placeholder in the forwarding URL. This configuration causes ](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=600,height=250,format=webp/_astro/page-rule-update.C2mx06CJ.png)

If you do so, the `$2` placeholder reference a wildcard that does not exist anymore, and as such, an `Error 500 (Internal server error)` is thrown when a URL triggers the page rule.

### Resolution

Update the page rule and remove the reference `$2` to the second wildcard. If there is only one wildcard, then you can only use `$1`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/page-rules/troubleshooting/general/#page","headline":"Troubleshoot Page Rules - General · Cloudflare Rules docs","description":"Resolve common issues with Page Rules configuration.","url":"https://developers.cloudflare.com/rules/page-rules/troubleshooting/general/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
