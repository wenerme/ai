---
description: Integrate Hubspot with Access.
title: Hubspot
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Hubspot

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/hubspot-saas/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide covers how to configure [Hubspot ↗](https://knowledge.hubspot.com/account-security/set-up-single-sign-on-sso) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Hubspot Enterprise plan account

## 1\. Configure Hubspot

1. Go to **Settings** \> **Account**, then go to **Defaults** \> **Security**.
2. Select _Single Sign-on_.
3. Copy the values for _Audience URI_ and _Sign on URL_.

## 2\. Configure Cloudflare Access

1. In Cloudflare One, go to **Access controls** \> **Applications**, select **Create new application**, and select **SaaS application**.
2. Set the **Application type** to _Hubspot_.
3. Use the following Hubspot field mappings:

| Hubspot values | Cloudflare values              |
| -------------- | ------------------------------ |
| Audience URI   | Entity ID                      |
| Sign On URL    | Assertion Consumer Service URL |
4. Set **NameID** to _Email_.
5. Add any desired [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to your application.
6. Copy the **SSO endpoint** and **Access Entity ID**.
7. Save the application.

## 3\. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 4\. Finalize Hubspot configuration

1. Use the following field mappings:

| Cloudflare value | Hubspot value                        |
| ---------------- | ------------------------------------ |
| SSO endpoint     | Identity Provider Single Sign-on URL |
| Entity ID        | Identity Provider Identifier         |
| Public key       | Certificate                          |
2. Select **Verify** to validate the integration.

Your configuration is now complete. Hubspot SSO can be switched on for specific users or the entire account.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/hubspot-saas/#page","headline":"Hubspot · Cloudflare One docs","description":"Integrate Hubspot with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/hubspot-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
