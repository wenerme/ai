---
title: Gmail BCC setup
description: For customers using Gmail, setting up Email security via BCC is quick and easy. All you need to do is create a content compliance filter to send emails to Email security through BCC. The following email flow shows how this works:
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/gsuite-bcc-setup/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Gmail BCC setup

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

For customers using Gmail, setting up Email security via BCC is quick and easy. All you need to do is create a content compliance filter to send emails to Email security through BCC. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Gmail with Email security.](https://developers.cloudflare.com/_astro/gmail-bcc-flow.CbpHVmdE_Z2mSCIi.webp) 

To set up Gmail with Email security:

1. [Find your BCC address and add a domain](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/add-domain/).
2. [Add BCC rules](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/bcc-rules-to-area1/).
3. [Create a project on Google Cloud Console](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/create-project-gcp/).
4. [Create a service account](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/create-service-account/).
5. [Add retraction](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/add-retraction/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/","name":"Gmail BCC setup"}}]}
```
