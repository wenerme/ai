---
description: Connect Google Workspace to Cloudflare One with SAML authentication and SCIM user provisioning.
title: Google Workspace (SAML/SCIM)
image: https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace-saml/og.png?v=12ef42e0d93df431
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Workspace (SAML/SCIM)

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace-saml/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Connect Google Workspace to Cloudflare One using a custom SAML app. You can send group membership during authentication and configure System for Cross-domain Identity Management (SCIM) to synchronize user updates and deprovision users.

This setup uses the **SAML** identity provider in Cloudflare One. The dedicated [Google Workspace integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace/) does not support SCIM.

## Prerequisites

- A Google Workspace super administrator account.
- Your Cloudflare One team name.
- For SCIM, access to Google's custom SCIM profiles beta in your Google Admin console.

You can find your team name in the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com) under **Settings** > **Team name and domain** > **Team name**.

## Set up SAML authentication

### 1. Create a custom SAML app in Google Workspace

Create a [custom SAML app in Google Workspace ↗︎](https://knowledge.workspace.google.com/admin/apps/set-up-your-own-custom-saml-app):

1. In the [Google Admin console ↗︎](https://admin.google.com/), go to **Apps** > **Web and mobile apps**.
2. Select **Add app** > **Add custom SAML app**, enter an app name, and select **Continue**.
3. Copy Google's **SSO URL** and **Entity ID**, and download the signing certificate. You will use these values when you [add the SAML identity provider to Cloudflare One](#2-add-the-saml-identity-provider-to-cloudflare-one).
4. In **Service provider details**, set both **ACS URL** and **Entity ID** to `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`.
5. Set **Name ID format** to **EMAIL** and **Name ID** to the user's primary email address.
6. In **Attribute mapping**, map the user's primary email address to an **App attribute** named `email`.
7. (Optional) To send group membership to Cloudflare One, under **Group membership (optional)**, search for and select the Google groups to include. Set **App attribute** to `groups`. Use this exact name so Cloudflare recognizes the values as IdP groups rather than a custom SAML attribute.
8. Select **Finish**, then turn on the app for the users who will authenticate to Cloudflare One.

Google includes only the selected groups that the signing-in user belongs to, directly or indirectly. You can select up to 75 groups. If you rename a group in Google, select it again in the group membership mapping. Refer to Google's [group membership mapping documentation ↗︎](https://knowledge.workspace.google.com/admin/apps/about-group-membership-mapping).

Group membership is sent in the SAML assertion when a user authenticates. This mapping is separate from SCIM user provisioning; selecting groups as a SCIM provisioning scope does not send their memberships to Cloudflare One.

### 2. Add the SAML identity provider to Cloudflare One

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Integrations** > **Identity providers**.
2. Select **Add new identity provider** and select **SAML**.
3. Choose a descriptive name for your identity provider.
4. Enter Google's **SSO URL**, **Entity ID**, and signing certificate in **Single Sign on URL**, **IdP Entity ID or Issuer URL**, and **Signing certificate**, respectively.
5. Under **Optional configurations**, set **Email attribute name** to `email`. If you configured group membership mapping, add `groups` to **SAML attributes**.
6. Select **Save**.

Caution

Set a reminder for the signing certificate's expiry date. Before it expires, generate a new signing certificate in Google Workspace and update your Cloudflare configuration.

For additional SAML settings or Terraform configuration, refer to [Generic SAML 2.0](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/).

### 3. Test the connection

[Test the IdP integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) with a user who has access to the SAML app. If you configured group membership mapping, use a member of a mapped group and confirm that the returned identity includes the expected groups.

## Configure SCIM user provisioning (beta)

Google's custom SCIM profiles support automated user provisioning for SAML apps. The feature is in beta and must be available in your Google Admin console. Turn on the custom SAML app for at least one user before configuring SCIM.

Use the SAML identity provider

Enable SCIM on the **SAML** identity provider you created in Cloudflare One, not on the dedicated **Google Workspace** integration. Use the SCIM endpoint and secret from that same SAML identity provider.

### 1. Enable SCIM in Cloudflare One

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Integrations** > **Identity providers**.
2. Find the Google Workspace SAML integration and select **Edit**.
3. Turn on **Enable SCIM**.
4. (Optional) Configure the following settings:

- **Enable user deprovisioning**: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when they are removed from the SCIM application in Google Workspace SAML. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
- **Remove user seat on deprovision**: [Remove a user's seat](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) from your Cloudflare One account when they are removed from the SCIM application in Google Workspace SAML.
- **SCIM identity update behavior**: Choose what happens in Cloudflare One when the user's identity updates in Google Workspace SAML.
  - *Automatic identity updates*: Automatically update the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/) when Google Workspace SAML sends an updated identity or group membership through SCIM. This identity is used for Gateway policies and Cloudflare One Client [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/); Access will read the user's updated identity when they reauthenticate.
  - *Group membership change reauthentication*: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when their group membership changes in Google Workspace SAML. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). Access will read the user's updated group membership when they reauthenticate.
  - *No action*: Update the user's identity the next time they reauthenticate to Access or the Cloudflare One Client.

5. Select **Regenerate Secret**. Copy the **SCIM Endpoint** and **SCIM Secret**. You will need to enter these values into Google Workspace SAML.
6. Select **Save**.

The SCIM secret never expires, but you can manually regenerate the secret at any time.

Turn on **Enable user deprovisioning** if Google deprovisioning events should revoke active Access sessions. Google's configured deprovisioning delay still applies.

### 2. Configure autoprovisioning in Google Workspace

1. In the [Google Admin console ↗︎](https://admin.google.com/), go to **Apps** > **Web and mobile apps** and select the SAML app you created for Cloudflare One.
2. Under **Autoprovisioning**, select **Configure auto-provisioning**. Enter the Cloudflare **SCIM Secret** in **Access token**, then enter the **SCIM Endpoint** in **Endpoint URL**.
3. Review the discovered attribute mappings. Ensure that SCIM `userName` maps to the same primary email address used for SAML authentication.
4. (Optional) Limit provisioning to specific Google groups. This scopes which users are provisioned; it does not configure group membership synchronization. Users must also have access to the SAML app. Google excludes group members from secondary domains or outside your organization from provisioning.
5. Choose the deprovisioning actions and delays for users whose app access is turned off or whose Google accounts are suspended or deleted. Google can deactivate users or send a hard-delete request after the configured delay.
6. Choose a dedicated test user who has already authenticated to Cloudflare One and select **Test Connection**. This test creates, updates, and deletes the test user at the SCIM endpoint. Review the results before selecting **Finish**.
7. Return to the app's **Autoprovisioning** settings and set the toggle to **Active**. Finishing setup alone does not start provisioning.

This integration covers user lifecycle updates. Configure the [SAML `groups` attribute](#1-create-a-custom-saml-app-in-google-workspace) separately for group-based policies. Do not rely on SCIM provisioning scope to deliver group membership changes or revoke sessions when a user changes groups.

### 3. Verify SCIM provisioning

To check if user identities were updated in Cloudflare One, view your [SCIM provisioning logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/).

Note

New users must first [register the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) or authenticate to an Access application before SCIM provisioning can begin.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace-saml/#page","headline":"Google Workspace (SAML/SCIM)","description":"Connect Google Workspace to Cloudflare One with SAML authentication and SCIM user provisioning.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace-saml/og.png?v=12ef42e0d93df431","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google","SAML","SCIM"]}
```
