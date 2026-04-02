---
title: Inline
description: With an Inline deployment for your Email Security (formerly Area 1) setup, Email Security evaluates email messages before they reach a user's inbox.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/inline/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Inline

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

With an **Inline deployment** for your [Email Security (formerly Area 1) setup](https://developers.cloudflare.com/email-security/deployment/), Email Security evaluates email messages before they reach a user's inbox.

More technically, Email Security becomes a hop in the SMTP processing chain and physically interacts with incoming email messages. Based on your policies, various messages are blocked before reaching the inbox.

![With inline deployment, messages travel through Email Security's email filter before reaching your users.](https://developers.cloudflare.com/_astro/inline-deployment-diagram.BP5ZohFt_GXYa5.webp) 

## Benefits

When you choose an inline deployment, you get the following benefits:

* Messages are processed and physically blocked before delivery to a user's mailbox.
* Your deployment is simpler, because any complex processing can happen downstream and without modification.
* Email Security can [modify delivered messages](https://developers.cloudflare.com/email-security/email-configuration/email-policies/text-addons/), adding subject or body mark-ups.
* Email Security can offer high availability and adaptive message pooling.
* You can set up advanced handling downstream for non-quarantined messages with [added X-headers](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/).

## Limitations

Inline deployments are not without their disadvantages. If you deploy Email Security as your MX record, you will have to make changes to your DNS. If not — and you deploy Email Security after your MX record — you will have a more complex SMTP architecture.

Additionally, this setup may require policy duplication on multiple solutions and the Mail Transfer Agent (MTA).

## Get started

For help getting started, refer to our [setup guides](https://developers.cloudflare.com/email-security/deployment/inline/setup/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/inline/","name":"Inline"}}]}
```
