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

Last updated Aug 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When the Cloudflare One Appliance is configured as the DHCP server for a LAN, you can attach **custom DHCP options** to the leases it issues. This is commonly used for:

* **Network boot** of workstations or kiosks with PXE, PXELINUX, or iPXE (options 43, 60, 66, 67, 175, 209, and 210).
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
4. **On failure**, discards the change and returns the underlying validation error to the API caller. The live DHCP service is never restarted with an unverified configuration.

This means a malformed option will be rejected at apply-time rather than disrupting DHCP service for clients on the LAN.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/#page","headline":"DHCP server options · Cloudflare WAN docs","description":"Configure custom DHCP options on the Cloudflare One Appliance DHCP server, including options for PXE, PXELINUX, and iPXE boot.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
