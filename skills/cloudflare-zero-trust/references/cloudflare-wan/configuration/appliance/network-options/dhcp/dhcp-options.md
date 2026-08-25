---
description: Configure custom DHCP options on the Cloudflare One Appliance DHCP server, including options for PXE / iPXE boot.
title: DHCP server options
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# DHCP server options

Last updated May 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When the Cloudflare One Appliance is configured as the DHCP server for a LAN, you can attach **custom DHCP options** to the leases it issues. This is commonly used for:

* **PXE / iPXE boot** of workstations or kiosks (options 66, 67, 60, 43, 175, 209–211).
* **VoIP phone provisioning** (option 66 — TFTP server).
* **Vendor-specific client configuration** (option 43 with vendor sub-options).

DHCP options can only be configured when the appliance is acting as the DHCP server. They have no effect when the appliance is in [DHCP relay](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/) mode.

DHCP options are configured via the API and Terraform.

## Option format

Each option is defined by three fields:

| Field          | Description                                 | Example             |
| -------------- | ------------------------------------------- | ------------------- |
| option\_number | The DHCP option code (1–254).               | 67                  |
| type           | The value encoding: text, integer, hex, ip. | text                |
| value          | The option value, encoded per type.         | boot/x64/pxelinux.0 |

### Value type encoding

| Type    | Format                                                     | Example value       |
| ------- | ---------------------------------------------------------- | ------------------- |
| ip      | A dotted-quad IPv4 address.                                | 10.20.30.40         |
| integer | A decimal integer.                                         | 0                   |
| text    | A UTF-8 string.                                            | boot/x64/pxelinux.0 |
| hex     | A colon-separated sequence of bytes, used for sub-options. | 01:04:aa:bb:cc      |

## Common PXE / iPXE options

The most frequently used options for PXE / iPXE boot are:

| Option | Type       | Purpose                                                                     |
| ------ | ---------- | --------------------------------------------------------------------------- |
| 60     | text       | Vendor class identifier (typically PXEClient).                              |
| 66     | ip or text | TFTP server name or IP address (boot server).                               |
| 67     | text       | Bootfile name to load (for example ipxe.pxe or undionly.kpxe).              |
| 43     | hex        | Vendor-specific information; sub-option layout is vendor-defined.           |
| 175    | hex        | iPXE-specific encapsulated options (HTTP/HTTPS boot, iSCSI, DNS, and more). |
| 209    | text       | iPXE configuration file URI.                                                |
| 210    | text       | iPXE configuration file path prefix.                                        |
| 211    | text       | iPXE configuration file path.                                               |

For a complete list of standard DHCP option codes, refer to the [IANA BOOTP/DHCP parameters registry ↗](https://www.iana.org/assignments/bootp-dhcp-parameters/bootp-dhcp-parameters.xhtml).

## Validation and apply behavior

Before applying a new DHCP options configuration, the appliance:

1. Stages the change to a temporary configuration file.
2. Validates the syntax with the underlying DHCP server.
3. **On success**, atomically swaps the staged configuration into place and reloads the DHCP server with no service interruption.
4. **On failure**, discards the change and returns the underlying validation error to the API caller. The live DHCP service is never restarted with an unverified configuration.

This means a malformed option will be rejected at apply-time rather than disrupting DHCP service for clients on the LAN.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/#page","headline":"DHCP server options · Cloudflare WAN docs","description":"Configure custom DHCP options on the Cloudflare One Appliance DHCP server, including options for PXE / iPXE boot.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
