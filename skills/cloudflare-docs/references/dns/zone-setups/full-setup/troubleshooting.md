---
title: Troubleshooting
description: Learn how to troubleshoot issues with a primary setup (full)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/zone-setups/full-setup/troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Troubleshooting

If you see unexpected results when [changing your nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), review the following troubleshooting questions.

## Is a DS record present at your registrar?

You need to remove any pre-Cloudflare **DS** records at your registrar to update your authoritative nameservers. This will disable DNSSEC and allow Cloudflare to resolve your domain name.

You can then [re-enable DNSSEC](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#4-re-enable-dnssec) in Cloudflare and at your registrar after you have changed your nameservers.

## Do the nameservers at your registrar exactly match the values provided by Cloudflare?

If the nameservers in your registrar do not exactly match those provided by Cloudflare, your domain will not resolve correctly.

## Are additional nameservers listed at your registrar?

If so, you should remove these nameservers.

You should have only Cloudflare nameservers listed at your registrar.

## Have you waited longer than 24 hours?

For some registrars, you will need to wait up to 24 hours for updates to your nameservers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/full-setup/","name":"Primary setup (Full)"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/full-setup/troubleshooting/","name":"Troubleshooting"}}]}
```
