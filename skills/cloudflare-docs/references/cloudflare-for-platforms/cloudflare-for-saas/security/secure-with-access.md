---
title: Secure with Cloudflare Access
description: Control access to custom hostnames using Cloudflare Access identity and device policies.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Secure with Cloudflare Access

Cloudflare Access provides visibility and control over who has access to your [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/). You can allow or block users based on identity, device posture, and other [Access rules](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

## Prerequisites

* You must have an active custom hostname. For setup instructions, refer to [Configuring Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).
* You must have a Cloudflare Zero Trust plan in your SaaS provider account. Learn more about [getting started with Zero Trust](https://developers.cloudflare.com/cloudflare-one/setup/).
* You can only run Access on custom hostnames if they are managed externally to Cloudflare or in a separate Cloudflare account. If the custom hostname zone is in the same account as the SaaS zone, the Access application will not be applied.

## Setup

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select your SaaS provider account and go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Add an application** and, for type of application, select **Self-hosted**.
3. Enter a name for your Access application and, in **Session Duration**, choose how often the user's [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) should expire.
4. Select **Add public hostname**.
5. For **Input method**, select _Custom_.
6. In **Hostname**, enter your custom hostname (for example, `mycustomhostname.com`).
7. Follow the remaining [self-hosted application creation steps](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to publish the application.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/","name":"Secure with Cloudflare Access"}}]}
```
