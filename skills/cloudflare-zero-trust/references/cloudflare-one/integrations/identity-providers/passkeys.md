---
description: Configure passkeys as an Access login method, enroll a passkey, and manage or remove registered passkeys.
title: Passkeys
image: https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/passkeys/og.png?v=7a9d781f7be56e68
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Passkeys

Last updated Nov 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/passkeys/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Access supports passkeys as a login method. Users can sign in with a passkey instead of entering a password or one-time PIN (OTP).

Passkeys use WebAuthn to authenticate users with a device, security key, or password manager. The authenticator must support discoverable credentials and user verification, such as a fingerprint, face scan, or PIN.

## Set up passkeys

If **Passkeys** is already listed under **Identity providers**, select it to review its settings. Otherwise, add it:

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Integrations** > **Identity providers**. [Go to **Identity providers** ↗](https://one.dash.cloudflare.com/?to=/:account/one/integrations/identity-providers)
2. Select **Add an identity provider**.
3. Select **Passkeys**.
4. (Optional) Turn on **Automatically prompt on the login page** to open the browser's passkey prompt for returning users when they open the login page.
5. Select **Save**.

Send a `POST` request to the [Identity Providers endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/methods/create/) with `type` set to `passkeys`. Use an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Access: Organizations, Identity Providers, and Groups Write** permission.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Passkeys",
		"type": "passkeys",
		"config": {
				"login_page_auto_prompt": false
		}
	}'
```

Set `config.login_page_auto_prompt` to `true` to turn on automatic browser prompts for returning passkey users.

### Allow passkeys for an application

After adding the provider, allow it in your application's login methods.

1. Go to **Access controls** > **Applications**. [Go to **Applications** ↗](https://one.dash.cloudflare.com/?to=/:account/access/apps)
2. Find your application, open its menu, and select **Edit**.
3. Select **Login methods** to find the application's authentication settings.
4. If **Accept all available identity providers** is turned off, add **Passkeys** under **Choose available identity providers for this application**. Keep any other login methods that users need.
5. Select **Save**.

For the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/), allow **Passkeys** on its **Authentication** tab.

Passkey enrollment and sign-in do not grant access by themselves. Users must still match an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). Passkey authentication does not retrieve group memberships or custom attributes from another identity provider. Review policies that depend on those attributes before adding passkeys as an alternative login method.

## Enroll a passkey

Before enrolling, users need a compatible browser and passkey authenticator.

1. Open an application that allows passkey authentication.
2. On the Access login page, select **Sign in with a passkey**, then **Don't have a passkey? Set one up**.
3. Verify your identity using an available login method. If passkeys are the application's only login method, Access sends a verification code to your email address during enrollment.
4. Enter a name for the passkey and select **Add passkey**.
5. Follow your browser or operating system's prompts to save the passkey.
6. When setup finishes, select **Back to sign in**.

## Sign in with a passkey

1. Open an application that allows passkey authentication.
2. On the Access login page, select **Sign in with a passkey**.
3. Choose a saved passkey and complete your authenticator's verification prompt.

After verifying the passkey, Access evaluates your application's policies. You do not need to enter your email address to sign in with a passkey.

If automatic browser prompts are turned on, Access can start the passkey prompt for returning users. Users can cancel the prompt and choose another allowed login method. Supported browsers can also offer saved passkeys in the email field.

## Manage passkeys

Users can add, rename, or delete their own passkeys.

1. On the Access login page, select **Manage passkeys**.
2. Authenticate using an available login method.
3. On the management page, select **Add passkey**, **Rename passkey**, or **Delete passkey**. Confirm the change when prompted.

### Remove a user's passkey

Administrators can remove a passkey if a device is lost or a user needs to enroll again.

1. In the Cloudflare dashboard, go to **Zero Trust** > **Team & Resources** > **Users**. [Go to **Users** ↗](https://one.dash.cloudflare.com/?to=/:account/team-resources/users)
2. Select the user and open **User identity**.
3. In **Passkeys**, open the passkey's menu and select **Delete**.
4. Confirm that you want to remove the passkey.

You can also [delete a user's passkey through the API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/subresources/passkeys/methods/delete/).

Deleting a registered passkey prevents Access from accepting it for future sign-ins. To end a user's active Access sessions, [revoke their sessions](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#revoke-user-sessions).

## Troubleshoot passkey sign-in

If a saved passkey does not appear, check that it is available on the device or in the password manager you are using. Follow your browser's prompts to use a passkey from another device, if supported.

If you cannot use a registered passkey, choose another allowed login method or contact your administrator. To replace it, follow [Enroll a passkey](#enroll-a-passkey).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/passkeys/#page","headline":"Passkeys","description":"Configure passkeys as an Access login method, enroll a passkey, and manage or remove registered passkeys.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/passkeys/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/passkeys/og.png?v=7a9d781f7be56e68","dateModified":"2026-11-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
```
