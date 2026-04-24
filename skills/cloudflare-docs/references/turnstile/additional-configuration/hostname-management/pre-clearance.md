---
title: Pre-clearance configuration
description: Configure Pre-clearance to reduce repeated challenges for visitors.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/turnstile/additional-configuration/hostname-management/pre-clearance.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Pre-clearance configuration

[Pre-clearance](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#pre-clearance-support-in-turnstile) allows Turnstile to issue clearance cookies that can be used across your Cloudflare-protected domains. This feature requires specific hostname configuration for proper functionality.

## Prerequisites

For pre-clearance to work correctly, you must:

1. Use a registered Cloudflare zone.  
The hostname must be a zone registered in your Cloudflare account. When configuring your widget via the dashboard, you can select from existing zones.
2. Select the registered Cloudflare zone with intended WAF rule to set pre-clearance.  
The zone you select must contain the WAF rule you wish to set pre-clearance through Turnstile.  
For example, if you have `example.com` and `app.example.com` as registered zones and you want to have Turnstile issue pre-clearance for `app.example.com`, you must select `app.example.com`.

## Validation

The clearance cookie `cf_clearance` will only be accepted on domains that match the widget's configured hostnames, are registered as zones in your Cloudflare account, and have challenges enabled through Cloudflare's security settings.

If pre-clearance is configured incorrectly, clearance cookies may become invalid and lead to additional challenge requests.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/additional-configuration/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/additional-configuration/hostname-management/","name":"Hostname management"}},{"@type":"ListItem","position":5,"item":{"@id":"/turnstile/additional-configuration/hostname-management/pre-clearance/","name":"Pre-clearance configuration"}}]}
```
