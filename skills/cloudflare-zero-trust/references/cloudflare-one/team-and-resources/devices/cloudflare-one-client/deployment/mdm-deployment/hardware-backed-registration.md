---
description: Hardware-backed registration binds a Cloudflare One Client registration to a Secure Enclave or TPM key and authenticates API requests with mTLS.
title: Hardware-backed registration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Hardware-backed registration

Last updated Jun 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/hardware-backed-registration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum WARP version |
| -------- | ------------ | -------------------- |
| Windows  | ✅            | 2026.6.0             |
| macOS    | ✅            | 2026.6.0             |
| Linux    | ✅            | 2026.6.0             |
| iOS      | ❌            | N/A                  |
| Android  | ❌            | N/A                  |
| ChromeOS | ❌            | N/A                  |

Hardware-backed registration binds a device registration to a non-exportable private key stored in device hardware. The Cloudflare One Client uses this key to prove that API requests originate from the device that created the registration.

By default, the Cloudflare One Client stores its API token in the device keystore. An attacker who extracts that token can replay it from another device. Hardware-backed registration protects against this token extraction by requiring every API request to be authenticated with a key that never leaves the device hardware.

Before you turn on hardware-backed registration, note the following:

* **Re-registration is required.** Turning the setting on or off invalidates the existing registration and forces affected devices to register again. The Cloudflare One Client does not migrate a registration between hardware-backed and standard registration.
* **Configure it at the organization layer.** Set `hardware_backed_registration` in [organization\_configs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) so the setting applies consistently to every configuration for an organization.
* **Certificates expire.** The hardware-backed certificate is valid for 90 days. A device that stays offline until the certificate expires — for example, during an extended vacation — must register again.

## How it works

When hardware-backed registration is turned on, the Cloudflare One Client performs the following steps during [device registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/):

1. The client generates a non-exportable key pair in a hardware security module on the device.
2. The client creates a certificate signing request (CSR) for the key and sends it with the registration request.
3. Cloudflare issues a client certificate for the key and returns it to the client.
4. The client authenticates all subsequent API requests with [mutual TLS (mTLS)](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/), signing the TLS handshake with the hardware-backed key.

Cloudflare validates each request against the certificate stored for the registration. Requests that do not present the matching certificate are rejected. Because the private key cannot leave the device, an extracted API token alone is not enough to make valid API requests from another device.

The client renews the certificate automatically before it expires, reusing the existing hardware-backed key so the registration is preserved.

## Hardware requirements

Hardware-backed registration uses the security hardware available on each desktop platform:

| Operating system | Hardware                             |
| ---------------- | ------------------------------------ |
| Windows          | TPM 2.0                              |
| macOS            | Secure Enclave (T2 or Apple silicon) |
| Linux            | TPM 2.0                              |

Devices without a supported security module cannot complete a hardware-backed registration.

## Turn on hardware-backed registration

Hardware-backed registration is turned off by default. To turn it on, set the [hardware\_backed\_registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#hardware%5Fbacked%5Fregistration) parameter to `true` in the [organization\_configs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) layer of your [MDM configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/).

The following example turns on hardware-backed registration for the `example-team` organization:

```xml
<dict>
  <key>organization_configs</key>
  <dict>
    <key>example-team</key>
    <dict>
      <key>hardware_backed_registration</key>
      <true/>
    </dict>
  </dict>
  <key>configs</key>
  <array>
    <dict>
      <key>organization</key>
      <string>example-team</string>
    </dict>
  </array>
</dict>
```

## Limitations

Hardware-backed registration is available on Windows, macOS, and Linux only. Mobile platforms (iOS, Android, and ChromeOS) are not supported. The feature applies only to Zero Trust registrations that use an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) or a [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/). Consumer registrations are not supported.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/hardware-backed-registration/#page","headline":"Hardware-backed registration · Cloudflare One docs","description":"Hardware-backed registration binds a Cloudflare One Client registration to a Secure Enclave or TPM key and authenticates API requests with mTLS.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/hardware-backed-registration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS","TPM"]}
```
