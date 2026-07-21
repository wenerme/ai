---
description: Connect your identity provider to Cloudflare.
title: Configure an identity provider (recommended)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

#  Configure an identity provider (recommended)

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/configure-idp/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

An [identity provider (IdP)](https://www.cloudflare.com/learning/access-management/what-is-an-identity-provider/) stores and manages users' digital identities. You can integrate your existing identity provider with Cloudflare Zero Trust in order to manage user access to your private network. This requires configuration both in Cloudflare and with the identity provider itself.

Note

Some admins choose to test by authenticating with a [one-time PIN (OTP)](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) instead of an IdP. OTP can also be used as an alternative login method for contractors or other guests that are not part of your IdP.

To add an identity provider:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. In the **Your identity providers** card, select **Add new identity provider**.
3. Select the identity provider you want to add.
If you do not see your identity provider listed, these providers can typically still be enabled. If they support OIDC or OAuth, select the [generic OIDC](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/) option. If they support SAML, select the [generic SAML](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/) option. Cloudflare supports all SAML and OIDC providers and can integrate with the majority of OAuth providers. If your provider supports both SAML and OIDC, we recommend OIDC for ease of configuration.
4. Fill in the necessary fields to set up your identity provider.
Each identity provider will have different required fields for you to fill in. Step-by-step instructions are shown in the dashboard side panel. Alternatively, refer to the [IdP-specific documentation](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).
5. Once you have filled in the necessary fields, select **Save**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):

  * `Access: Organizations, Identity Providers, and Groups Write`
2. Add an identity provider to Cloudflare One using the [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource. For example, to add a Microsoft Entra ID integration:
```tf
resource "cloudflare_zero_trust_access_identity_provider" "microsoft_entra_id" {
	account_id = var.cloudflare_account_id
	name       = "Entra ID example"
	type       = "azureAD"
	config 		 = {
		client_id                  = var.entra_id_client_id
		client_secret              = var.entra_id_client_secret
		directory_id               = var.entra_id_directory_id
		support_groups             = true
		}
}
```
Each identity provider integration has different required attributes. You will need to obtain these attribute values from your identity provider. For more information, refer to the [IdP-specific documentation](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).
If you do not see your identity provider listed, these providers can typically still be enabled. If they support OIDC or OAuth, use the [generic OIDC](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/) option. If they support SAML, use the [generic SAML](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/) option. Cloudflare supports all SAML and OIDC providers and can integrate with the majority of OAuth providers. If your provider supports both SAML and OIDC, we recommend OIDC for ease of configuration.

Users will now be able to select this IdP when they are prompted to authenticate.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/configure-idp/#page","headline":"Configure an identity provider (recommended) · Cloudflare Learning Paths","description":"Connect your identity provider to Cloudflare.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/configure-idp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
