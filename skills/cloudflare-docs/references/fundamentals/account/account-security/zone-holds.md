---
title: Zone holds
description: Prevent other teams from adding your active Cloudflare zones to a different account by enabling zone holds.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/account/account-security/zone-holds.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Zone holds

Zone holds prevent other teams in your organization from adding zones that are already active in another account.

For example, you might already have an active Cloudflare zone for `example.com`. If another team does not realize this, they could add and activate `example.com` in another Cloudflare account, which may cause downtimes or security issues until the original zone could be re-activated.

Note

Zone holds are enabled by default for all Enterprise zones.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | No  | No       | No         | Yes |

## Enable zone holds

When you enable a zone hold, no one else can [add your zone](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to their Cloudflare account. If they attempt to, they will receive the following message:

_The zone name provided is subject to a hold which disallows the creation of this zone. Please contact the domain owner to have this hold removed._

To enable a zone hold:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. On the zone homepage, go to **Quick Actions**.
4. For **Zone Hold**, switch the toggle to **On**.

You also have the option to **Also prevent subdomains**, which prevents anyone in your organization from creating subdomains or custom hostnames related to your zone.

## Release zone holds

You may want to temporarily release a zone hold to allow another team to [register a subdomain](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) in a separate Cloudflare account, such as `docs.example.com`.

To release a zone hold:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. On the zone homepage, go to **Quick Actions**.
4. For **Zone Hold**, switch the toggle to **Off**.
5. Choose the length of your release.
6. Select **Release hold**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/zone-holds/","name":"Zone holds"}}]}
```
