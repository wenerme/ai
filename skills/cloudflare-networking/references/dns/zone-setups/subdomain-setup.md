---
description: Add a subdomain as a standalone zone in Cloudflare.
title: Subdomain setup
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

#  Subdomain setup

Last updated Jun 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

When you use a subdomain setup, you can manage the [Cloudflare configurations](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) for one or more subdomains separately from those associated with your apex domain. This means that, on your [account homepage ↗](https://dash.cloudflare.com/?to=/:account/), you would find websites like `example.com` or `blog.example.com` listed as separate zones.

Note

This is different from simply creating a subdomain for a site you already have in Cloudflare. If you do not need separate Cloudflare configuration for your subdomain, refer to [Create a subdomain record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/).

You might use this setup when you want to share access to a specific subdomain's settings with different teams, but have stricter controls on your apex domain. For example, a subdomain setup could allow your documentation team to manage the Cloudflare configuration for `docs.example.com`, while preventing them from adjusting any settings on `example.com`.

Subdomain setups are also useful when different subdomains require entirely different settings. For example, you may have different requirements for `docs.example.com`, `blog.example.com`, and `community.example.com`.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | No   | No  | No       | Yes        |

Setup combinations

The availability of different setups depends on both the parent zone setup and the setup used for the child zone. Review the [available setups](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#available-setups) to understand what combinations are supported.

### Access applications

To use subdomain setups with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/), note that:

* If the child zone is in a pending state when you create the Access application, your configuration will not automatically apply when you activate the zone. You must also re-save the Access application once your subdomain setup is active.
* If you split out a subdomain which already has an Access application, you will also need to re-save the Access application to associate it with the new child zone.

## Resources

* [ Setup ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/)
* [ Enable DNSSEC ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/)
* [ Migrate to new account ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/move-to-new-account/)
* [ Rollback ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/rollback/)

## FAQ

### Why does my parent zone show DNS queries for child zone hostnames?

If you have both a parent zone (for example, `example.com`) and a child subdomain zone (for example, `sub.example.com`) on Cloudflare, the parent zone's DNS analytics may show queries for hostnames belonging to the child zone.

This is normal DNS behavior — recursive resolvers query the parent zone first to get the referral (NS records) pointing to the child zone's nameservers. These referral queries appear in the parent zone's analytics even though the authoritative answer comes from the child zone.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/#page","headline":"Subdomain setup · Cloudflare DNS docs","description":"Add a subdomain as a standalone zone in Cloudflare.","url":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
