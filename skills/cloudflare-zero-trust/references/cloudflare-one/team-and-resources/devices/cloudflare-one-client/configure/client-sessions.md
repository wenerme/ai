---
description: Client sessions in Zero Trust.
title: Client sessions
image: https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/og.png?v=87c41abaadbbf5fd
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Client sessions

Last updated Nov 10, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Client sessions control how often users must re-authenticate with your identity provider (IdP) while using the Cloudflare One Client (formerly WARP). Unlike legacy VPNs, which enforce a single global session timeout, Cloudflare One allows you to set session timeouts per application or per policy. You can configure session timeouts for your [Access applications](#configure-warp-sessions-in-access) or as part of your [Gateway policies](#configure-warp-sessions-in-gateway).

When a user goes to a protected application or website, Cloudflare checks their device client session duration against the configured session timeout. If the session has expired, the user will be prompted to re-authenticate with the identity provider (IdP) used to enroll in the Cloudflare One Client.

![Cloudflare One Client prompts user to re-authenticate session.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=404,height=504,format=webp/_astro/warp-reauthenticate-session.BjGtdKWz.png)

*Note: Labels in this image may reflect a previous product name.*

A user's device client session duration resets to zero whenever they re-authenticate with the IdP, regardless of what triggered the authentication event.

## Prerequisites

Ensure that traffic can reach your IdP and `<your-team-name>.cloudflareaccess.com` through the Cloudflare One Client.

## Configure client sessions in Gateway

You can enforce device client session timeouts on any Gateway Network and HTTP policy that has an Allow action. If you do not specify a session timeout, the device client session will be unlimited by default.

Session timeouts have no impact on Gateway DNS policies. DNS policies remain active even when a user needs to re-authenticate.

To configure a session timeout for a Gateway policy:

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Traffic policies** > **Firewall policies**. Choose either **Network** or **HTTP**.
2. Add a policy and select the *Allow* action. Alternatively, choose any existing *Allow* policy.
3. Under **Step 4 - Configure policy settings**, select **Edit** next to **Enforce Cloudflare One Client session duration**.
4. Enter a session expiration time in `1h30m0s` format and save.
5. Save the policy.

1. Add the following permission to your [`cloudflare_api_token` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api_token):
   - `Zero Trust Write`
2. Choose a Network ( `l4`) or HTTP ( `http`) policy with an Allow action.
3. In the policy's [`rule_settings` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_gateway_policy), use the `check_session` argument to enable and configure a session timeout:

   ```tf
   resource "cloudflare_zero_trust_gateway_policy" "network_allow_wiki_IPs" {
   	name        = "Company Wiki Network policy"
   	enabled     = true
   	account_id  = var.cloudflare_account_id
   	description = "Managed by Terraform - Allow employees to access company wiki IPs."
   	precedence  = 103
   	action      = "allow"
   	filters     = ["l4"]
   	traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.wiki_IPs.id}"
   	identity    = "identity.email matches \".*@example.com\""

   	rule_settings = {
   		check_session = {
   			enforce = true
   			duration = "1h30m0s"
   		}
   	}
   }
   ```

Session checks are now enabled for the application protected by this policy. Users can continue to reach applications outside of the policy definition.

Enforce a global timeout

To enforce a global reauthentication event, set each of your Network or HTTP policies to the same device client session duration.

## Configure client sessions in Access Beta

You can allow users to log in to Access applications using their device client session. **Authenticate with Cloudflare One Client** is only supported for Access applications protected by Allow or Block policies.

To configure device client sessions for Access applications:

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Access controls** > **Access settings**.
2. Enable **Authenticate with Cloudflare One Client**.
3. Under **Session duration**, choose a session timeout value of up to 90 days. This timeout will apply to all Access applications that have **Authenticate with Cloudflare One Client** enabled.

Note

This timeout value does not apply to [device client session checks in Gateway policies](#configure-warp-sessions-in-gateway).

4. (Optional) To enable **Authenticate with Cloudflare One Client** by default for all existing and new applications, select **Apply to all Access applications**. You can override this default setting on a per-application basis when you [create](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/) or modify an Access application.
5. Select **Save**.

Users can now authenticate once with the Cloudflare One Client and have access to your Access applications for the configured period of time. The session timer resets when the user re-authenticates with the IdP used to enroll in the Cloudflare One Client.

## Reauthenticate silently with Entra ID Beta

<details>

<summary>

Feature availability

</summary>

| System | Availability | Minimum client version |
| --- | --- | --- |
| Windows | ✅ | 2026.9.2663.1 |
| macOS | ✅ | 2026.9.2663.1 |
| Linux | ❌ | |
| iOS | ❌ | |
| Android | ❌ | |
| ChromeOS | ❌ | |

</details>

With Device Credential Authentication, the Cloudflare One Client can renew a client session without opening a browser. When a session expires, the client asks the operating system for an Entra ID token for the signed-in user. Cloudflare verifies the token and re-evaluates your Access policies. If both checks pass, the session renews and the user does not see a reauthentication prompt.

If silent reauthentication fails, the client falls back to the [browser-based reauthentication flow](#manually-reauthenticate).

### Requirements

- Users enrolled the device in the Cloudflare One Client with your [Entra ID identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/).
- Windows devices are Microsoft Entra joined or Microsoft Entra hybrid joined.
- macOS devices have the [Microsoft Enterprise SSO plug-in ↗︎](https://learn.microsoft.com/entra/identity-platform/apple-sso-plugin) configured, for example through Intune Company Portal.
- The user is signed in to one Entra account from your tenant on the device.

### 1. Add redirect URIs in Entra ID

The client requests tokens with the same Entra application that you use for your Entra ID identity provider. Add the client's redirect URIs to that application:

1. In the [Microsoft Entra admin center ↗︎](https://entra.microsoft.com/), go to **Applications** > **App registrations** > **All applications** and select the application used by your Entra ID identity provider.
2. Go to **Authentication**, then select **Add a platform**.
3. Select **Mobile and desktop applications**.
4. Under **Custom redirect URIs**, enter the redirect URI for each operating system you deploy:

   | System | Redirect URI |
   | --- | --- |
   | Windows | `ms-appx-web://microsoft.aad.brokerplugin/<client-id>` |
   | macOS | `msauth.com.cloudflare.1dot1dot1dot1.macos://auth` |

   Replace `<client-id>` with the **Application (client) ID** of the application.
5. Select **Configure**.

### 2. Turn on Device Credential Authentication

Device Credential Authentication is a [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) setting. It is off by default.

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Team & Resources** > **Devices** > **Device profiles** > **General profiles**.
2. Locate the device profile you would like to update and select **Configure**.
3. Turn on **Device Credential Authentication**.
4. Select **Save profile**.

To change device profiles, you need an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Zero Trust Write` permissions.

To turn on Device Credential Authentication for a custom device profile, send a `PATCH` request to the [Devices API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/methods/edit/):

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Update a device settings profilebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"enable_device_credential_authentication": true
	}'
```

To turn on Device Credential Authentication for the default device profile, send a `PATCH` request to the [Devices API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/methods/edit/):

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zero Trust Write</code>

</details>

*Update the default device settings profilebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"enable_device_credential_authentication": true
	}'
```

It may take up to 10 minutes for newly updated settings to propagate to devices.

### Fallback to browser reauthentication

The Cloudflare One Client opens the browser-based reauthentication flow when silent reauthentication does not complete. This happens when:

- Entra ID requires user interaction to issue a token. For example, a Conditional Access policy requires multifactor authentication (MFA).
- The device has no Entra account from your tenant, or has more than one.
- The Entra account does not match the user registered to the device.
- An Access policy denies the user or requires an interactive step.
- The device session was revoked.
- The client cannot get a token from Entra ID within 90 seconds. The Cloudflare One Client enforces this limit, and it is not configurable.

## Force user interaction with IdP

If the user has an active browser session with the IdP, the Cloudflare One Client will use the existing browser cookies to re-authenticate and the user will not be prompted to re-enter their credentials. You can override this behavior to require explicit user interaction in the IdP.

### Supported IdPs

- [Microsoft Entra ID](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#force-user-interaction-during-warp-reauthentication)

## Manually reauthenticate

To manually refresh your Cloudflare Access session and update your group information from your identity provider (IdP), go to the following URL in your browser and fill in your [team name](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#what-is-a-team-domainteam-name):

`https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/refresh-identity`

Reauthenticating resets your [session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/) and fetches the latest group information from the organization's IdP.

## Limitations

- **Only one user per device** — If a device is already registered with User A, User B will not be able to log in on that device through the re-authentication flow. To switch the device registration to a different user, User A must first log out from Zero Trust (if [Allow device to leave organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-device-to-leave-organization) is enabled), or an admin can revoke the registration from **Team & Resources** > **Devices**. User B can then properly [enroll](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/).
- **Active connections are not terminated** — Active sessions such as SSH and RDP will remain connected beyond the timeout limit.
- **Binding Cookie is not supported** - **Authenticate with Cloudflare One Client** will not work for Access applications that have the [Binding Cookie](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#binding-cookie) enabled.

## Related resources

- [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) - Learn about the status messages displayed by the Cloudflare One Client during its connection process, and understand each stage as the client establishes a secure tunnel to Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/#page","headline":"Client sessions","description":"Client sessions in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/og.png?v=87c41abaadbbf5fd","dateModified":"2026-11-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft Entra ID"]}
```
