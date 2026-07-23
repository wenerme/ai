---
description: Identity providers in Zero Trust integrations.
title: Identity providers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Identity providers

Last updated Jun 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare One integrates with your organization's identity provider to apply Cloudflare One and Secure Web Gateway policies. If you work with partners, contractors, or other organizations, you can integrate multiple identity providers simultaneously.

When you create a new Zero Trust organization, Cloudflare automatically configures the [Cloudflare identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/) as your default login method. Your users can authenticate with their existing Cloudflare account credentials without any additional setup, and you can add more identity providers at any time.

You can also send a [one-time PIN (OTP)](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) to approved email addresses. No configuration needed — simply add a user's email address to an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) and to the group that allows your team to reach the application. You can configure OTP and an identity provider at the same time to let users choose their own authentication method.

Adding an identity provider as a login method requires configuration both in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Integrations** \> **Identity providers** and with the identity provider itself. Consult our IdP-specific documentation to learn more about what you need to set up.

Note

Cloudflare One supports social identity providers that do not require administrator accounts, open source providers, and corporate providers. Cloudflare also supports using signed AuthN requests with SAML providers.

## Set up IdPs in Cloudflare One

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

Your IdP will now be listed in the **Login methods** card.

## Test IdPs in Cloudflare One

To test if an IdP is correctly configured:

1. Go to **Integrations** \> **Identity providers**.
2. Select **Test** next to the IdP you would like to test. This will attempt to connect to the IdP to verify if a valid connection is established.

### Your provider is connected

If your provider is connected, another window will open in your browser, with this message:

!["Your connection works\!" message displayed for a successful IdP test](https://developers.cloudflare.com/_astro/connected-idp.Dc_ZasM0_Z8c4gR.webp)

### Your provider is not connected

If your provider is not connected, another window will open in your browser. Along with an error message, you will receive a detailed explanation of why the test has failed.

## Use The API

We recommend that you use our dashboard to configure your identity providers. However, if you would like to use the [Cloudflare API ↗](https://api.cloudflare.com/), each of the identity provider topics covered here include an example API configuration snippet as well.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#page","headline":"Identity providers · Cloudflare One docs","description":"Identity providers in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
```
