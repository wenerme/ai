---
description: Learn how to integrate PingOne as a SAML identity provider with Cloudflare One.
title: PingOne (SAML)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  PingOne (SAML)

Last updated Apr 30, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingone-saml/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The PingOne cloud platform from PingIdentity provides SSO identity management. Cloudflare Access supports PingOne as a SAML identity provider.

## Set up PingOne as a SAML provider

## 1\. Create an application in PingOne

1. In your PingIdentity environment, go to **Connections** \> **Applications**.
2. Select **Add Application**.
3. Enter an **Application Name**.
4. Select **SAML Application**.
5. Select **Configure**.
6. To fill in your Cloudflare Access metadata:

  1. Select **Import from URL**.
  2. Set the **Import URL** to:
```txt
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata
```
where `<your-team-name>` is your Cloudflare One team name. 3\. Select **Import**. 4\. **Save** the configuration.
7. In the **Configuration** tab, select **Download metadata** and save the XML metadata file. This file will be used in a later step to add PingOne to Cloudflare One.
8. In the **Attribute Mappings** tab, add the following required attributes (case sensitive) and select **Save**.

| Application attribute | Outgoing value |
| --------------------- | -------------- |
| email                 | Email Address  |
| givenName             | Given Name     |
| surName               | Family Name    |
These [SAML attributes](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#saml-attributes) tell Cloudflare Access who the user is.
9. Set the application to **Active**.

### 2\. Add PingOne to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **SAML**.
4. Upload your PingOne XML metadata file.
5. (Optional) To enable SCIM, refer to [Synchronize users and groups](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#synchronize-users-and-groups).
6. (Optional) Under **Optional configurations**, configure [additional SAML options](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#optional-configurations).
7. Select **Save**.

You can now [test your connection](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) and create [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) based on the configured login method and SAML attributes.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingone-saml/#page","headline":"PingOne (SAML) · Cloudflare One docs","description":"Learn how to integrate PingOne as a SAML identity provider with Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingone-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
