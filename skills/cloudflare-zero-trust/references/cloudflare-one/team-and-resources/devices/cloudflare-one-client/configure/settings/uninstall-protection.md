---
description: Require an administrator code to uninstall the client on Windows.
title: Uninstall protection
image: https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/uninstall-protection/og.png?v=a27a0988970691ec
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Uninstall protection

Last updated Oct 28, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/uninstall-protection/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

<details>

<summary>

Feature availability

</summary>

| <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/">Client modes</a> | <a href="https://www.cloudflare.com/teams-pricing/">Zero Trust plans ↗︎</a> |
| --- | --- |
| All modes | All plans |

| System | Availability | Minimum client version |
| --- | --- | --- |
| Windows | ✅ | 2026.9.0.0 |
| macOS | ❌ | |
| Linux | ❌ | |
| iOS | ❌ | |
| Android | ❌ | |
| ChromeOS | ❌ | |

</details>

Uninstall protection protects the Cloudflare One Client (formerly WARP) on Windows against unauthorized modification or uninstallation. When it is on, users must provide an administrator-generated code to uninstall the client. Without a valid code, the uninstall is blocked.

## Protected actions

When uninstall protection is on, the Cloudflare One Client blocks the following actions until a valid code is entered:

- Uninstalling the client from **Settings** > **Apps**, Control Panel, or `msiexec`.
- Upgrading or downgrading the client with the `.msi` installer.
- Logging out of your Zero Trust organization from the client UI.
- Deleting the device registration with `warp-cli registration delete`.

On Windows 10 version 21H2 (build 19044) and later, the client also installs a file system driver. The driver blocks changes to client files in `C:\Program Files\Cloudflare` and `C:\ProgramData\Cloudflare`. It also blocks changes to the client's registry keys and services. The driver keeps enforcing these protections when the Cloudflare One Client service is stopped.

The driver also blocks changes to [MDM files](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/), such as `C:\ProgramData\Cloudflare\mdm.xml`. To change an MDM file on a protected device, [unlock the client](#unlock-the-client-with-warp-cli) first.

Note

Uninstall protection blocks the standard ways to remove the client. It is not a complete defense against a local administrator who tampers with the device directly.

## Uninstall codes

Cloudflare provides two types of codes. Both types expire after a duration you choose, from 1 to 24 hours.

Device-specific uninstall codes follow fixed one-hour blocks aligned to UTC hours. The duration starts at the beginning of the UTC hour in which you generate the code. For example, a one-hour code generated at 10:45 UTC expires at 11:00 UTC.

| Code | Format | Works on | Use when |
| --- | --- | --- | --- |
| Device-specific uninstall code | 7 digits | One device | A user needs to uninstall, upgrade, or downgrade manually |
| Account-wide uninstall token | 104-character string | Every device in an account | You uninstall, upgrade, or downgrade with MDM or scripts |

The Cloudflare One Client verifies both types of codes locally. The device does not need an Internet connection to accept a code.

When the client accepts a code, it turns off uninstall protection until the code expires, plus one hour. The extra hour lets a slow upgrade or uninstall finish. Uninstall protection turns back on automatically after this period.

Caution

An account-wide uninstall token works on every device in your account. You cannot revoke a token before it expires. Share tokens only with trusted administrators, and choose the shortest duration that fits your task.

## Turn on uninstall protection

Uninstall protection is a [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) setting. It is off by default. Changes to this setting are recorded in your [audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/).

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Team & Resources** > **Devices** > **Device profiles** > **General profiles**.
2. Locate the device profile you would like to update and select **Configure**.
3. Turn on **Device Management Protection**.
4. Select **Save profile**.

To change device profiles, you need an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Zero Trust Write` permissions.

To turn on uninstall protection for a custom device profile, send a `PATCH` request to the [Devices API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/methods/edit/):

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
		"uninstall_protection": true
	}'
```

To turn on uninstall protection for the default device profile, send a `PATCH` request to the [Devices API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/methods/edit/):

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
		"uninstall_protection": true
	}'
```

It may take up to 10 minutes for newly updated settings to propagate to devices.

The device must receive the updated profile before uninstall protection takes effect. After that, uninstall protection stays on when the device is offline.

## Generate an uninstall code

### Device-specific uninstall code

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Team & Resources** > **Devices**.
2. In **Your devices**, select the device.
3. Select the three dots (**...**) next to **Delete**, then select **Generate uninstall code**.
4. In **Duration (hours)**, enter how long the code is valid, from `1` to `24` hours.
5. Select **Generate code**.
6. Copy the 7-digit code and share it with the user.

Send a `POST` request to the [Devices API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/override_codes/methods/create/). Set `scope` to `device` and set `device_id` to the device ID. Set `duration_hours` to a value from `1` to `24`. The [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) needs at least `Zero Trust Read` permissions:

*Generate an uninstall protection override codebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/override_codes" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"type": "uninstall_protection",
		"scope": "device",
		"device_id": "$DEVICE_ID",
		"duration_hours": 4
	}'
```

The `code` field in the response contains the device-specific uninstall code:

```json
{
	"result": {
		"code": "1234567"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

To find the device ID, open the device in **Team & Resources** > **Devices** and copy the **ID** at the top of the page. You can also run `warp-cli registration show` on the device and copy the `Device ID` value.

A device-specific uninstall code only works on the device it was generated for.

### Account-wide uninstall token

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Team & Resources** > **Devices** > **Management**.
2. Under **Client control**, find **Account-wide uninstall token** and select **Generate token**.
3. In **Duration (hours)**, enter how long the token is valid, from `1` to `24` hours.
4. Select **Generate token**.
5. Copy the token.

Send a `POST` request to the [Devices API](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/override_codes/methods/create/). Set `scope` to `account` and do not include `device_id`. Set `duration_hours` to a value from `1` to `24`. The [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) needs at least `Zero Trust Read` permissions:

*Generate an uninstall protection override codebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/override_codes" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"type": "uninstall_protection",
		"scope": "account",
		"duration_hours": 4
	}'
```

The `code` field in the response contains the account-wide uninstall token.

## Uninstall a protected client

### Uninstall manually

To uninstall the Cloudflare One Client on a protected device:

1. Get a device-specific uninstall code from your administrator.
2. Start the uninstall. For example, go to **Settings** > **Apps** > **Installed apps** and uninstall the Cloudflare One Client.
3. When the installer prompts you, enter the device-specific uninstall code and select **Continue**.
4. If Windows asks for administrator approval, approve the request.

The uninstall continues after the client accepts the code. If you select **Cancel**, the uninstall stops and the client stays installed.

If the code is wrong or expired, the installer shows an error and you can enter the code again. After repeated wrong codes, the client makes you wait before you try again. The wait increases with each wrong code, up to one minute.

### Uninstall with MDM or a script

Silent uninstalls require an account-wide uninstall token. Pass the token to the installer in the `UNINSTALL_TOKEN` property:

```powershell
msiexec /x "<LOCAL_PACKAGE_PATH>" /qn UNINSTALL_TOKEN="<ACCOUNT_WIDE_UNINSTALL_TOKEN>"
```

To find the `.msi` package path, refer to [Uninstall the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#uninstall-the-cloudflare-one-client).

If the token is missing or invalid, `msiexec` exits with error code `1603` and the client stays installed. You cannot use a device-specific uninstall code in a silent uninstall.

The installer treats any uninstall that runs as the `SYSTEM` account as silent. This includes Microsoft Intune and other MDM tools, even when you use the `/qb` option.

## Upgrade or downgrade a protected client

Upgrades and downgrades with the `.msi` installer also require a code:

- **Manual upgrade or downgrade**: The installer prompts for a device-specific uninstall code.
- **Silent upgrade or downgrade**: Pass an account-wide uninstall token in the `UNINSTALL_TOKEN` property.

```powershell
msiexec /i "Cloudflare_WARP_<VERSION>.msi" /qn UNINSTALL_TOKEN="<ACCOUNT_WIDE_UNINSTALL_TOKEN>"
```

The following updates do not require a code:

- Updates delivered by [client version assignments](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/client-version-assignments/).
- Upgrades from a client version that does not support uninstall protection. Uninstall protection turns on after the upgrade completes.

### Silent downgrade to an earlier version

A silent downgrade to a client version earlier than 2026.9.0.0 ignores the `UNINSTALL_TOKEN` property. The earlier installer does not pass the token to the installed client, so the downgrade fails.

To downgrade silently, unlock the client with the account-wide uninstall token first, then run the earlier installer:

```powershell
warp-cli uninstall-protection unlock --account "<ACCOUNT_WIDE_UNINSTALL_TOKEN>"
msiexec /i "Cloudflare_WARP_<VERSION>.msi" /qn
```

Run both commands within the token's validity period. For more information, refer to [Unlock the client with warp-cli](#unlock-the-client-with-warp-cli).

Manual downgrades are not affected. The installer prompts for a device-specific uninstall code as usual.

## Unlock the client with warp-cli

You can turn off uninstall protection on a device with `warp-cli`. Use this before an action that does not go through the installer prompt, such as logging out of your Zero Trust organization.

To unlock with a device-specific uninstall code:

```sh
warp-cli uninstall-protection unlock --device <DEVICE_SPECIFIC_UNINSTALL_CODE>
```

To unlock with an account-wide uninstall token:

```sh
warp-cli uninstall-protection unlock --account <ACCOUNT_WIDE_UNINSTALL_TOKEN>
```

To check whether uninstall protection is on, and how long it stays off after an unlock:

```sh
warp-cli uninstall-protection show
```

```txt
Uninstall protection: disabled
Grace period remaining: 7140 seconds
```

If the Cloudflare One Client service is not running, `warp-cli` sends the code directly to the file system driver. Run `warp-cli` from an elevated command prompt in this case.

## Log out of a protected device

When uninstall protection is on, the client disables the **Logout** button.

This applies even when [Allow device to leave organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-device-to-leave-organization) is turned on. To log out, first [unlock the client](#unlock-the-client-with-warp-cli).

## Turn off uninstall protection

To turn off uninstall protection, turn off **Device Management Protection** in the device profile. If you use the API, set `uninstall_protection` to `false`.

Devices turn off uninstall protection after they receive the updated profile. Devices that are offline stay protected until they reconnect. To remove the client from an offline device, use an uninstall code.

## Troubleshooting

### Code is not accepted

Check the following:

- The code has not expired.
- A device-specific uninstall code was generated for this device. Codes do not work on other devices.
- The code was generated for the device's current ID. Run `warp-cli registration show` on the device and check that the `Device ID` value matches the **ID** of the device in **Team & Resources** > **Devices**.
- You entered a device-specific uninstall code in the installer prompt. The prompt does not accept account-wide uninstall tokens.

### Review logs

The installer writes lines that start with `Uninstall authorization:` to the [Windows Installer log ↗︎](https://learn.microsoft.com/en-us/troubleshoot/windows-client/application-management/enable-windows-installer-logging). To create a log, add `/l*v <PATH_TO_LOG_FILE>` to your `msiexec` command.

[Diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) include rejected codes and the actions that the file system driver blocked.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/uninstall-protection/#page","headline":"Uninstall protection","description":"Require an administrator code to uninstall the client on Windows.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/uninstall-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/uninstall-protection/og.png?v=a27a0988970691ec","dateModified":"2026-10-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Windows"]}
```
