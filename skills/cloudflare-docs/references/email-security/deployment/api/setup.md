---
title: Setup
description: When you first get started with Email security (formerly Area 1), you will need to set up a way to connect your current mail environment with Email security.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Setup

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

When you first get started with Email security (formerly Area 1), you will need to set up a way to connect your current mail environment with Email security.

## BCC setup

Send messages to Email security via BCC configurations within your email provider:

* [Google Workspace BCC setup](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/)
* [Microsoft Exchange BCC setup](https://developers.cloudflare.com/email-security/deployment/api/setup/exchange-bcc-setup/)

## Journaling setup

Send messages to Email security via a Journaling configuration within your email provider:

* [Office 365 journaling setup](https://developers.cloudflare.com/email-security/deployment/api/setup/office365-journaling/)

## Microsoft Graph API

Send messages to Email security via a Microsoft Graph API configuration within your email provider:

* [Office 365 Microsoft Graph API setup](https://developers.cloudflare.com/email-security/deployment/api/setup/office365-graph-api/)

## Next steps

Regardless of your setup (BCC, journaling or MS Graph API), you may also want to set up either manual or automatic [retraction](https://developers.cloudflare.com/email-security/email-configuration/retract-settings/) to take post-delivery actions against suspicious messages.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}}]}
```
