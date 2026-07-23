---
description: Manage access control lists for DNS zone transfers.
title: Access Control Lists (ACLs)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Access Control Lists (ACLs)

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Access Control Lists (ACLs) define allowed source IP addresses from where servers accept incoming data or control messages.

When setting up new DNS zone transfers ([incoming](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) or [outgoing](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/)), you will need to update the ACL at your other DNS provider(s) to allow Cloudflare to communicate with their server(s). You can find the Cloudflare IP addresses you need to allow at your other DNS provider(s) at [Cloudflare IP addresses](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/).

For your Cloudflare account, you only need to [create a new ACL](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/) if you want to specify additional NOTIFY IPs that Cloudflare should listen to.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/#page","headline":"Access Control Lists (ACLs) · Cloudflare DNS docs","description":"Manage access control lists for DNS zone transfers.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
