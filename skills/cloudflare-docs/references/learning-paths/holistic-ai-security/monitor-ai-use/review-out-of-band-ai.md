---
title: Review out-of-band AI use
description: If your organization does not use the Cloudflare device client, or does not proxy HTTP traffic, you can still get valuable data about shadow AI usage if you use the Google Workspace, Microsoft 365, or GitHub integrations for the Cloudflare Cloud Access Security Broker (CASB).
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Review out-of-band AI use

If your organization does not use the Cloudflare device client, or does not proxy HTTP traffic, you can still get valuable data about shadow AI usage if you use the [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/), [Microsoft 365](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/), or [GitHub](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/github/) integrations for the Cloudflare Cloud Access Security Broker (CASB).

The CASB provides detailed information about your SaaS environment, including changes to sensitive data, content, and application settings. It works even if your users do not have the Cloudflare device client installed. By using CASB integrations with your core Single Sign-On (SSO) provider, you can see if users have authenticated to any third-party applications. This offers a clear, non-invasive way to understand tool usage across your organization without needing to deploy a client.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/","name":"Monitor AI usage at your organization"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai/","name":"Review out-of-band AI use"}}]}
```
