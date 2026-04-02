---
title: Find BCC address and add domain
description: To set up Email security (formerly Area 1) for Gmail:
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/gsuite-bcc-setup/add-domain.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Find BCC address and add domain

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

To set up Email security (formerly Area 1) for Gmail:

1. Log in to the [Email security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Select the question mark, where you will be able to find your BCC address.
3. Once you found your address, select **Settings** (the gear icon), then select **New Domain**.
4. Fill in the information needed to add your domain:
* **Domain**: Enter the domain you want to set up BCC from Google.
* **Configured As**: Select Hops, enter `2`.
* **Forwarding To**: Enter `google.com`.
* **Outbound TLS**: Select **Forward all messages over TLS**.
* **Quarantine policy**: Ensure no policy is selected.
1. Select **Publish Domain**.

## Next steps

Now that you have found your BCC address and added your domain, continue with [Add BCC rules](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/bcc-rules-to-area1/) to add BCC rules to Email security.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":7,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/add-domain/","name":"Find BCC address and add domain"}}]}
```
