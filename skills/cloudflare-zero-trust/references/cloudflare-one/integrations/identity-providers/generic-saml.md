---
description: Generic SAML 2.0 in Zero Trust integrations.
title: Generic SAML 2.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Generic SAML 2.0

Last updated Aug 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare One integrates with any identity provider that supports SAML 2.0\. If your identity provider is not listed in the integration list of login methods in Cloudflare One, it can be configured using SAML 2.0 (or OpenID if OIDC based). Generic SAML can also be used if you would like to pass additional SAML headers or claims for an IdP in the integration list.

## Prerequisites

Minimum requirements for identity providers:

* The IdP must conform to SAML 2.0.
* The IdP must provide a **Single sign-on URL**, an **Entity ID or Issuer URL**, and a **Signing certificate**.
* The IdP must include the signing public key in the SAML response.

## 1\. Create an application in your identity provider

Most identity providers allow users to create an **Application**. In this context, an application is a set of parameters that the identity provider will then pass on to Cloudflare to establish an integration.

The typical setup requirements are:

1. Create a new integration in the identity provider with the type set as **SAML**.
2. Set both the **Entity/Issuer ID** and the **Single sign-on URL** to:
```txt
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
```
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
3. Set the **Name ID/Email format** to `emailAddress`.
4. (Optional) Set the signature policy to _Always Sign_.

### (Optional) Upload SAML metadata

If your identity provider supports metadata file configuration, you can use the default or identity provider specific metadata endpoint:

* **Default:** `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata`
* **Identity provider specific:** `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/<identity-provider-id>/saml-metadata`, where `<identity-provider-id>` is the `id` value obtained from [List Access identity providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/identity%5Fproviders/methods/list/). Use this endpoint if your IdP requires a configuration not defined in the default metadata file.

To download the SAML metadata file, copy-paste the metadata endpoint into a web browser and save the page as an `.xml` file. Upload this XML file to the identity provider.

## 2\. Add a SAML identity provider to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Select **Add new identity provider** and select **SAML**.
3. Choose a descriptive name for your identity provider.
4. Enter the **Single Sign on URL**, **IdP Entity ID or Issuer URL**, and **Signing certificate** obtained from your identity provider.
5. (Optional) To enable SCIM, refer to [Synchronize users and groups](#synchronize-users-and-groups).
6. (Optional) Under **Optional configurations**, configure [additional SAML options](#optional-configurations).
7. Select **Save**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):

  * `Access: Organizations, Identity Providers, and Groups Write`
2. Configure the [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource:
```tf
resource "cloudflare_zero_trust_access_identity_provider" "generic_saml_example" {
	account_id = var.cloudflare_account_id
	name       = "Generic SAML example"
	type       = "saml"
	config 		 = {
		sso_target_url = "https://example.com/1234/sso/saml"
		issuer_url = "https://example.com/1234"
		idp_public_certs = ["-----BEGIN CERTIFICATE-----\nXXXXX\n-----END CERTIFICATE-----"]
		sign_request = false
		email_attribute_name = "email"
		attributes = ["employeeID", "groups"]
	}
}
```

Caution

Set a reminder for the expiry date of the signing certificate obtained from your generic SAML identity provider. After the certificate expires, you will need to generate a new signing certificate and re-add it to your Cloudflare configuration via the Cloudflare dashboard or Terraform.

## 3\. Test the connection

You can now [test the IdP integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one). A success response should return the configured SAML attributes.

## Synchronize users and groups

The generic SAML integration allows you to synchronize user groups and automatically deprovision users using [SCIM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/).

SCIM affects Access and Gateway policy evaluation differently.

Access evaluates a user's identity and group membership from the SAML assertion or OIDC token returned by the identity provider during authentication. SCIM provides readable group names in the Access policy builder, but Access does not use SCIM group membership to evaluate a login. If you turn on **Enable user deprovisioning**, removing a user from the SCIM application revokes their active Access sessions. You can also configure SCIM to revoke sessions after group membership changes. Access evaluates the updated identity provider data when the user authenticates again.

Gateway evaluates identity-based policies against the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/). SCIM updates this identity when users or group memberships change, without waiting for the user to authenticate again. Cloudflare One Client device profiles use the same synchronized identity.

### Prerequisites

Your identity provider must support SCIM version 2.0.

### 1\. Enable SCIM in Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Find the IdP integration and select **Edit**.
3. Turn on **Enable SCIM**.
4. (Optional) Configure the following settings:
* **Enable user deprovisioning**: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when they are removed from the SCIM application in IdP. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
* **Remove user seat on deprovision**: [Remove a user's seat](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) from your Cloudflare One account when they are removed from the SCIM application in IdP.
* **SCIM identity update behavior**: Choose what happens in Cloudflare One when the user's identity updates in IdP.
  * _Automatic identity updates_: Automatically update the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/) when IdP sends an updated identity or group membership through SCIM. This identity is used for Gateway policies and Cloudflare One Client [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/); Access will read the user's updated identity when they reauthenticate.
  * _Group membership change reauthentication_: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when their group membership changes in IdP. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). Access will read the user's updated group membership when they reauthenticate.
  * _No action_: Update the user's identity the next time they reauthenticate to Access or the Cloudflare One Client.
1. Select **Regenerate Secret**. Copy the **SCIM Endpoint** and **SCIM Secret**. You will need to enter these values into IdP.
2. Select **Save**.

The SCIM secret never expires, but you can manually regenerate the secret at any time.

### 2\. Configure SCIM in the IdP

Setup instructions vary depending on the identity provider. In your identity provider, you will either need to edit the [original SSO application](#1-create-an-application-in-your-identity-provider) or create a new SCIM application. Refer to your identity provider's documentation for more details. For example instructions, refer to our [Okta](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/#synchronize-users-and-groups) or [JumpCloud](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/jumpcloud-saml/#synchronize-users-and-groups) guides.

#### IdP groups

If you would like to build policies based on IdP groups:

* Ensure that your IdP sends a `groups` field. The naming must match exactly (case insensitive). All other values will be sent as a SAML attribute.
* If your IdP requires a new SCIM application, ensure that its groups match the groups in the [original SSO application](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#1-create-an-application-in-your-identity-provider). Matching the groups keeps the Gateway identity synchronized with the groups that the IdP returns when the user authenticates to Access.

### 3\. Verify SCIM provisioning

To check if user identities were updated in Cloudflare One, view your [SCIM provisioning logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/).

Note

New users must first [register the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) or authenticate to an Access application before SCIM provisioning can begin.

## Optional configurations

SAML integrations support additional security and configuration options.

### Encrypt SAML assertions

SAML assertion encryption ensures that SAML assertions sent from your identity provider to Cloudflare Access are encrypted end-to-end.

Without encryption, SAML assertions are transmitted in plaintext after TLS termination, which means they could be visible to browser extensions or client-side malware. With encryption turned on, your IdP encrypts the assertion using a public certificate from Cloudflare, and only Access can decrypt it with the corresponding private key.

Note

SAML assertion encryption is separate from [signed AuthN requests](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/signed%5Fauthn/). Signing verifies the authenticity of SAML messages, while encryption adds an additional layer of security by protecting assertion contents. You can use both features together.

To turn on SAML assertion encryption:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Select your SAML identity provider and select **Edit**.
3. Under **SAML encryption**, turn on the **Enable SAML encryption** toggle. Access will automatically generate an encryption certificate.
4. Copy the displayed certificate (in PEM format) or the certificate set ID.
5. In your identity provider, upload the Cloudflare encryption certificate and turn on assertion encryption. Refer to your IdP documentation for the exact configuration steps.
6. Select **Save**.

After you turn on encryption, Access will reject any unencrypted assertions from the configured IdP. If you turn off encryption, Access will reject any encrypted assertions until encryption is turned back on.

#### Supported encryption algorithms

Access supports the following encryption algorithms:

| Algorithm type     | Supported values                                   |
| ------------------ | -------------------------------------------------- |
| Content encryption | AES-128-CBC, AES-256-CBC, AES-128-GCM, AES-256-GCM |
| Key transport      | RSA-OAEP (XML Encryption 1.0 and 1.1), RSA-1.5     |

Caution

RSA-1.5 is supported for compatibility but is considered insecure. Use RSA-OAEP when your identity provider supports it.

FedRAMP environments

FedRAMP High environments enforce stricter algorithm requirements. RSA-1.5 and RSA-OAEP 1.0 (`rsa-oaep-mgf1p`) are rejected. Use RSA-OAEP 1.1 with SHA-256 for key transport and AES-256-GCM or AES-256-CBC for content encryption.

#### Rotate encryption certificates

Encryption certificates are valid for one year. Thirty days before a certificate expires, Access automatically generates a replacement certificate. The expiring certificate remains valid until its expiration date, giving you time to upload the new certificate to your IdP.

To manually rotate a certificate:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Select your SAML identity provider and select **Edit**.
3. Under **SAML encryption**, select **Rotate certificate**.
4. Upload the new certificate to your identity provider.

Caution

If you rotate again before updating your IdP with the current certificate, the previous certificate will be immediately invalidated. This may break authentication for users whose IdP is still encrypting assertions with the old certificate.

### Sign SAML authentication request

This optional configuration signs the [Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/) with the Cloudflare Access public key to ensure that the JWT is coming from a legitimate source. The Cloudflare public key can be obtained at `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/certs`.

### Email attribute name

Many [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) depend on a user's email address. Some identity providers have a different naming for the email address attribute (for example, `Email`, `e-mail`, `emailAddress`). This can typically be checked in the identity provider's SAML test option.

Example in Okta:

![Preview the SAML assertion from the Okta dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1818,height=1016,format=webp/_astro/saml-assertion.z-CnJcdz.png)![Determine the email attribute name from the SAML assertion](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2512,height=960,format=webp/_astro/saml-attributes.B1LfosVi.png)

### SAML headers and attributes

Cloudflare Access supports SAML (Security Assertion Markup Language) attributes and SAML headers for all SAML IdP integrations.

[**SAML attributes**](#saml-attributes) refer to specific data points or characteristics that the IdP shares about the authenticated user. These attributes often include details like email address, name, or role, and are passed along to the service provider upon successful authentication.

[**SAML headers**](#saml-headers) are metadata in the SAML protocol communication which convey information about the sender, recipient, and the message itself. These headers can be leveraged to provide extra context or control over the communication.

#### SAML attributes

SAML attributes are added to the [Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/). These attributes can then be consumed by self-hosted or SaaS applications connected to Access. Any SAML attribute configured in the SAML integration must also be sent from the IdP.

Example in Okta:

![Configure Okta to send SAML attributes](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1928,height=1292,format=webp/_astro/attribute-statements.CXJ3Jtln.png)

How to receive these SAML attributes in Cloudflare:

![Configure Cloudflare to receive SAML attributes](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1066,height=886,format=webp/_astro/attributes-cloudflare.Dpoa5y0H.png)

#### SAML headers

If an application specifically requires SAML attributes upon sign-in, then the attributes can be passed as headers. The **Attribute name** should be the value coming from your IdP (for example, `department`). You can assign any **Header name** to the attribute. The header name will appear in the response headers when Access makes the initial authorization request to `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`.

#### Multi-record SAML attributes

Cloudflare Access extends support for multi-record SAML attributes such as groups. These attributes are parsed out and can be individually referenced in policies. This feature enables granular access control and precise user authorization in applications.

Cloudflare Access does not currently support partial attribute value references.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#page","headline":"Generic SAML 2.0 · Cloudflare One docs","description":"Generic SAML 2.0 in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
```
