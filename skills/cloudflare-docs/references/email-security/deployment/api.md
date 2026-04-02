---
title: API
description: When you choose an API deployment for your Email Security (formerly Area 1) setup, email messages only reach Email Security after they have already reached a user's inbox.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# API

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

When you choose an **API deployment** for your [Email Security (formerly Area 1) setup](https://developers.cloudflare.com/email-security/deployment/), email messages only reach Email Security after they have already reached a user's inbox.

Then, through on integrations with your email provider, Email Security can [retract messages](https://developers.cloudflare.com/email-security/email-configuration/retract-settings/) based on your organization's policies.

![With API deployment, messages travel through Email Security's email filter after reaching your users.](https://developers.cloudflare.com/_astro/api-deployment-diagram.sJM5FAp1_Z2wt8Kh.webp) 

## Benefits

When you choose API deployment, you get the following benefits:

* Easy protection for complex email architectures, without requiring any change to mailflow operations.
* Agentless deployment for Microsoft 365 and Gmail.
* The initial email protection measures offered by your current email provider.

## Limitations

However, API deployment also has the following disadvantages:

* Email Security is dependent on your email provider's API infrastructure and outages will increase the message dwell time in the inbox.
* Email Security requires read and write access to mailboxes.
* Requires API support from your email provider (does not typically support on-premise providers).
* Your email provider may throttle API requests from Email Security.
* Detection rates may be lower if multiple solutions exist.
* Messages cannot be modified or quarantined.
* Certain URL rewrite schemes cannot be decoded (for example, Mimecast).

## Get started

For help getting started, refer to our [setup guides](https://developers.cloudflare.com/email-security/deployment/api/setup/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}}]}
```
