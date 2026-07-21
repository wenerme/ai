---
description: Learn how to troubleshoot issues with secondary nameservers.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

#  Troubleshooting

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/troubleshooting/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

When [updating your registrar](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/#4-update-registrar) with the Cloudflare secondary nameservers (`nsXXXX.secondary.cloudflare.com`), you get an error.

Note

The exact error message depends on the system. Some examples would be: `Entity reference not found`,` Authorization error`, `Unable to create foreign nameserver`.

Upon contacting your registrar, their services confirm that the Cloudflare nameservers cannot be added at this time.

---

## Cause

This issue may arise when one of the Cloudflare nameservers used for secondary setup is removed from the Verisign side.

---

## Solution

The Cloudflare engineering team needs to be engaged [through Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to make sure the nameserver gets registered again manually at Verisign.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/troubleshooting/#page","headline":"Troubleshooting secondary nameservers · Cloudflare DNS docs","description":"Learn how to troubleshoot issues with secondary nameservers.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
