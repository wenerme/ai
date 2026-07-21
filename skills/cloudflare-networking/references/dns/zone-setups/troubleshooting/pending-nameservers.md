---
description: Troubleshoot a Cloudflare zone that stays in Pending Nameserver Update status after changing nameservers, including stale DNSSEC DS records.
title: Zone stuck in Pending Nameserver Update
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

#  Zone stuck in Pending Nameserver Update

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/pending-nameservers/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

If your nameservers are correctly set to Cloudflare but your zone remains in **Pending Nameserver Update** status, stale DNSSEC DS records at your registrar are the most common cause.

## Stale DNSSEC DS records

DS records belong to your **registrar** (where the domain is registered), not to Cloudflare. When you change DNS providers, DS records from the previous provider often remain at the registrar and cause Cloudflare's zone verification to fail.

**To check for stale DS records:**

```sh
dig DS yourdomain.com
```

If DS records are returned and you did not configure Cloudflare DNSSEC, these are stale records from your previous provider.

**To remove stale DS records:**

1. Log in to your domain registrar's control panel.
2. Find DNSSEC settings (may be under **Advanced DNS** or **Security**).
3. Remove all existing DS records.
4. Wait up to 24 hours for the DS removal to propagate.

After the stale DS records are removed and expire from cache, your Cloudflare zone will activate automatically. You can then turn on DNSSEC in the Cloudflare dashboard if needed.

For more information on DNSSEC configuration, refer to [Configure DNSSEC](https://developers.cloudflare.com/dns/dnssec/) and [Troubleshoot DNSSEC](https://developers.cloudflare.com/dns/dnssec/troubleshooting/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/troubleshooting/pending-nameservers/#page","headline":"Zone stuck in Pending Nameserver Update · Cloudflare DNS docs","description":"Troubleshoot a Cloudflare zone that stays in Pending Nameserver Update status after changing nameservers, including stale DNSSEC DS records.","url":"https://developers.cloudflare.com/dns/zone-setups/troubleshooting/pending-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
