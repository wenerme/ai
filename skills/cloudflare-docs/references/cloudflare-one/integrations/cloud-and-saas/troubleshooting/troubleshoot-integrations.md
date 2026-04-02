---
title: Troubleshoot integrations
description: Cloudflare CASB detects when integrations are unhealthy or outdated.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-integrations.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshoot integrations

Cloudflare CASB detects when integrations are unhealthy or outdated.

Common integration issues include changes to SaaS app or cloud environment configurations, user access, or permission scope. Integrations may need to be updated to support new features or permissions.

## Identify unhealthy or outdated integrations

To identify unhealthy CASB integrations, go to **Integrations** \> **Cloud & SaaS integrations**. If an integration is unhealthy, CASB will set its status to **Broken**. If an integration is outdated, CASB will set its status to **Upgrade**.

## Repair an unhealthy integration

Repair limitation

If CASB does not support self-service repairs for an integration, you will need to [delete](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/#delete-an-integration) and recreate the integration to continue scanning.

You can repair unhealthy CASB integrations through your list of integrations or findings.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations** \> **Cloud & SaaS integrations**.
2. Choose your unhealthy integration.
3. Select **Reauthorize**.
4. In your SaaS app or cloud environment, reauthorize your account.

## Upgrade an integration

Upgrading an outdated integration will allow the integration to access new features and permissions.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations** \> **Cloud & SaaS integrations**.
2. Choose your outdated integration.
3. Select **Upgrade integration**.
4. In your SaaS app or cloud environment, upgrade your app and reauthorize your account.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-integrations/","name":"Troubleshoot integrations"}}]}
```
