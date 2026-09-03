---
description: Configure custom DHCP options on the Cloudflare One Appliance DHCP server, including options for PXE, PXELINUX, and iPXE boot.
title: DHCP server options
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# DHCP server options

Last updated Sep 2, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When the Cloudflare One Appliance is configured as the DHCP server for a LAN, you can attach **custom DHCP options** to the leases it issues. This is commonly used for:

* **Network boot** of workstations or kiosks with PXE, PXELINUX, or iPXE (options 43, 60, 66, 67, 175, 209, and 210).
* **VoIP phone provisioning** (option 66 — TFTP server).
* **Vendor-specific client configuration** (option 43 with vendor sub-options).

DHCP options can only be configured when the appliance is acting as the DHCP server. They have no effect when the appliance is in [DHCP relay](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/) mode.

## Configure DHCP options

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select your Cloudflare One Appliance > **Edit**.
3. Select **Network Configuration**.
4. In **LAN configuration**, select **Add LAN** to create a new LAN, or select an existing LAN > **Edit**.
5. Make sure **This is a DHCP server** is selected.
6. In **DHCP server options**, select **Add DHCP option**.
7. Choose one of the listed common options, or select **Add custom option** to enter your own option code, type, and value.
8. Select **Save**.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

You can also configure DHCP options via the API and Terraform using the `dhcp_options` field on the LAN's `dhcp_server` configuration. Create a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/sites/subresources/lans/methods/update/) to update the LAN where you want to configure DHCP options:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Magic WAN Write`
* `Magic Transit Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"lan": {
				"static_addressing": {
						"dhcp_server": {
								"dhcp_options": [
										{
												"code": 67,
												"type": "text",
												"value": "boot/x64/pxelinux.0"
										}
								]
						}
				}
		}
	}'
```

## Option format

Each option is defined by three fields:

| Field | Description                                              | Example             |
| ----- | -------------------------------------------------------- | ------------------- |
| code  | The DHCP option code (1–254).                            | 67                  |
| type  | The value encoding: text, hex, ip, byte, short, integer. | text                |
| value | The option value, encoded per type.                      | boot/x64/pxelinux.0 |

### Value type encoding

| Type    | Format                                                                         | Example value       |
| ------- | ------------------------------------------------------------------------------ | ------------------- |
| text    | A UTF-8 string (max 255 bytes).                                                | boot/x64/pxelinux.0 |
| hex     | A colon-separated sequence of hex bytes, used for sub-options (max 255 bytes). | 01:04:aa:bb:cc      |
| ip      | A dotted-quad IPv4 address.                                                    | 10.20.30.40         |
| byte    | An unsigned 8-bit integer (0–255).                                             | 1                   |
| short   | An unsigned 16-bit integer (0–65535).                                          | 512                 |
| integer | An unsigned 32-bit integer (0–4294967295).                                     | 0                   |

### Restricted option codes

* Options `0` and `255` are reserved by [RFC 2132 ↗](https://www.rfc-editor.org/rfc/rfc2132) and cannot be configured.
* Options `3`, `6`, and `51` are managed by the Cloudflare One Appliance and cannot be configured, since they conflict with connector-managed configuration (default gateway, DNS servers, and lease time).
* Each option code can only be used once per LAN. Duplicate option codes are rejected.

## Common network boot options

The most frequently used network boot options are:

| Option | Type | Purpose                                                                                                                                          |
| ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 43     | hex  | Vendor-specific information. The vendor defines the sub-option layout.                                                                           |
| 60     | text | Vendor class identifier, typically PXEClient.                                                                                                    |
| 66     | text | TFTP server name.                                                                                                                                |
| 67     | text | Boot file name, for example ipxe.pxe or undionly.kpxe. iPXE also accepts a URI, such as an HTTP URL for an iPXE script.                          |
| 175    | hex  | Client-specific encapsulated options used by Etherboot and iPXE. IANA lists this option as tentatively assigned and does not define its payload. |
| 209    | text | PXELINUX configuration filename or path, loaded through TFTP.                                                                                    |
| 210    | text | PXELINUX TFTP path prefix, prepended to option 209.                                                                                              |

For a complete list of standard DHCP option codes, refer to the [IANA BOOTP/DHCP parameters registry ↗](https://www.iana.org/assignments/bootp-dhcp-parameters/bootp-dhcp-parameters.xhtml).

## Validation and apply behavior

Before applying a new DHCP options configuration, the appliance:

1. Stages the change to a temporary configuration file.
2. Validates the syntax with the underlying DHCP server.
3. **On success**, atomically swaps the staged configuration into place and reloads the DHCP server with no service interruption.
4. **On failure**, discards the change and returns the underlying validation error to the caller — shown as a field error in the dashboard, or in the API response for API and Terraform callers. The live DHCP service is never restarted with an unverified configuration.

This means a malformed option will be rejected at apply-time rather than disrupting DHCP service for clients on the LAN.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/#page","headline":"DHCP server options · Cloudflare WAN docs","description":"Configure custom DHCP options on the Cloudflare One Appliance DHCP server, including options for PXE, PXELINUX, and iPXE boot.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
