---
description: Configure your Cloudflare zone for PCI DSS compliance — set minimum TLS version, configure approved cipher suites, and understand how Cloudflare interacts with PCI ASV scans.
title: PCI DSS compliance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# PCI DSS compliance

Last updated Sep 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Payment Card Industry Data Security Standard (PCI DSS) applies to any organization that stores, processes, or transmits payment card data. When your site or application runs behind Cloudflare, several PCI DSS requirements apply to how Cloudflare handles your traffic — and some require explicit configuration on your zone.

This guide walks through the Cloudflare configuration steps required for PCI DSS compliance, explains how Cloudflare interacts with PCI Approved Scanning Vendor (ASV) scans, and lists known scanner false positives.

## Cloudflare's PCI DSS certification

Cloudflare is certified as a **Level 1 PCI DSS Service Provider** — the highest certification level. You can obtain Cloudflare's current Attestation of Compliance (AOC) from the [Cloudflare Trust Hub ↗](https://www.cloudflare.com/trust-hub/compliance-resources/pci-dss/).

Note

Cloudflare's AOC covers Cloudflare's own infrastructure. It does not automatically extend to your zone or application. You are responsible for configuring Cloudflare correctly and securing your own systems.

## Shared responsibility

| Area | Cloudflare | You |
| --- | --- | --- |
| TLS protocol support | Supports TLS 1.2 and 1.3 on all plans | Set minimum TLS version to 1.2 on your zone |
| Cipher suites | Offers PCI DSS-approved cipher suites | Enable the PCI DSS cipher suite profile on your zone. Configuring cipher suites requires an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) subscription. |
| Vulnerability patching | Patches Cloudflare infrastructure (ROBOT, Sweet32, and others) | Keep your origin server and any third-party software patched |
| Client-side scripts | Client-Side Security Advanced inventories and monitors payment page scripts | Enable and configure Client-Side Security |

## Configure TLS settings

Steps 1 and 2 are required for PCI DSS compliance. Step 3 is Cloudflare's recommendation for a stronger configuration but is not mandated by PCI DSS v4.0, which sets TLS 1.2 as the minimum. A PCI scan checks each layer independently — completing only Steps 1 and 2 is sufficient to meet the standard.

### Step 1: Set minimum TLS version to 1.2

PCI DSS requirement 4.2.1 mandates strong cryptography for cardholder data in transit, with TLS 1.2 as the minimum acceptable version. TLS 1.0 and TLS 1.1 are not considered strong cryptography under PCI DSS.

1. In the Cloudflare dashboard, go to **SSL/TLS** > **Edge Certificates**. [Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Minimum TLS Version**, select **TLS 1.2** or higher.

Refer to [Minimum TLS Version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) for API and Terraform options.

### Step 2: Configure PCI DSS cipher suites

PCI DSS prohibits weak and deprecated cipher algorithms. You must restrict your zone to the PCI DSS-approved cipher list.

Prerequisite

Cipher suite customization requires an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) subscription.

Note

- You cannot configure specific TLS 1.3 cipher suites. When you [enable TLS 1.3](#step-3-enable-tls-13-recommended), Cloudflare automatically uses all supported TLS 1.3 cipher suites, all of which meet PCI DSS requirements. The cipher list in this step applies to TLS 1.2 connections only.
- Updating cipher suites triggers certificate redeployment, which may take a few minutes. Wait before running a verification scan.

Follow the steps in [Customize cipher suites (dashboard)](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/dashboard/) and select the cipher suites from the PCI DSS profile listed in [Compliance standards](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/#pci-dss). Alternatively, use the API:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zone Settings Write</code>

</details>

*Edit zone settingbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ciphers" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"value": [
				"ECDHE-ECDSA-AES128-GCM-SHA256",
				"ECDHE-RSA-AES128-GCM-SHA256",
				"ECDHE-ECDSA-AES256-GCM-SHA384",
				"ECDHE-RSA-AES256-GCM-SHA384",
				"ECDHE-ECDSA-CHACHA20-POLY1305",
				"ECDHE-RSA-CHACHA20-POLY1305"
		]
	}'
```

### Step 3: Enable TLS 1.3 (recommended)

TLS 1.3 provides stronger security guarantees than TLS 1.2, eliminates several legacy handshake patterns, and is recommended alongside TLS 1.2 for a stronger, future-proof configuration. It is not required for PCI DSS compliance, which mandates TLS 1.2 as the minimum.

1. In the Cloudflare dashboard, go to **SSL/TLS** > **Edge Certificates**. [Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Enable **TLS 1.3**.

Refer to [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/) for API and Terraform options.

## Verify your configuration

After applying all settings, confirm that non-compliant connections are rejected.

### Use an online TLS scanner

Online TLS scanners give you an external view of your configuration — the same perspective a PCI ASV scan sees. Two commonly used options are:

- [SSL Labs Server Test ↗](https://www.ssllabs.com/ssltest/) — enter your domain and review the report. Check that TLS 1.0 and TLS 1.1 are rejected, TLS 1.2 or higher is supported, and no weak or deprecated cipher suites are negotiated.
- [SSL Shopper SSL Checker ↗](https://www.sslshopper.com/ssl-checker.html) — validates your certificate chain and TLS configuration from an external vantage point.

Note

Cloudflare does not endorse any specific third-party tool. Use any scanner that fits your workflow — what matters is verifying from outside the Cloudflare dashboard.

### Use openssl

`openssl s_client` lets you test specific TLS versions from the command line. Connections using TLS 1.0 or TLS 1.1 should fail:

```sh
# Should fail — TLS 1.0 rejected
openssl s_client -connect example.com:443 -tls1

# Should fail — TLS 1.1 rejected
openssl s_client -connect example.com:443 -tls1_1
```

A rejected connection returns an error such as:

```sh
4087F5C1E27F0000:error:0A00042E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version
```

To confirm which cipher suite is negotiated over TLS 1.2:

```sh
openssl s_client -connect example.com:443 -tls1_2 2>/dev/null | grep -E "Protocol|Cipher"
```

The output should show a cipher from the PCI DSS-approved list — for example `ECDHE-RSA-AES128-GCM-SHA256`.

### Use curl

To confirm TLS 1.0 and TLS 1.1 are rejected:

```sh
# Should fail — TLS 1.0 rejected
curl https://example.com --tls-max 1.0 -svo /dev/null

# Should fail — TLS 1.1 rejected
curl https://example.com --tls-max 1.1 -svo /dev/null
```

A rejected connection returns an error such as:

```sh
* error:1400442E:SSL routines:CONNECT_CR_SRVR_HELLO:tlsv1 alert
```

### Check from the dashboard

On the **Edge Certificates** page, select **View current ciphers** to see the cipher suites configured on your zone.

Note

The dashboard shows your configured cipher suites. The ciphers actually negotiated in a TLS handshake depend on the connecting client and certificate algorithm (RSA vs. ECDSA). Use SSL Labs or `openssl s_client` for the external view that a PCI scanner sees.

## Cloudflare Pages

It is not possible to configure minimum TLS version or cipher suites for `*.pages.dev` hostnames. These settings only apply to zones you control in the Cloudflare dashboard.

For payment pages hosted on a Pages project, use a [custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/) attached to a zone you control. Zone-level TLS and cipher suite settings apply to traffic served through that custom domain.

## PCI DSS v4 client-side requirements

PCI DSS v4.0 introduced two requirements for scripts running in the consumer's browser on payment pages:

| Requirement | Description | Cloudflare feature |
| --- | --- | --- |
| **6.4.3** | Maintain an inventory of all scripts on payment pages, with authorization and integrity checks | Page Shield |
| **11.6.1** | Detect and alert on unauthorized changes to HTTP security headers and payment page content | Page Shield |

Refer to [Client-side security and PCI DSS compliance](https://developers.cloudflare.com/client-side-security/reference/pci-dss/) for setup guidance.

## PCI ASV scans

PCI DSS requires quarterly vulnerability scans by an Approved Scanning Vendor (ASV). When your domain is proxied through Cloudflare, ASV scanners interact with Cloudflare's edge network rather than your origin server directly. Several behaviors commonly arise.

### TCP source port behavior

Some ASV tools report a **TCP Source Port Pass Firewall** finding against Cloudflare-proxied IP addresses. This is a false positive caused by how Cloudflare's anycast network handles TCP connections — the behavior is a property of Cloudflare's infrastructure, not a vulnerability in your environment.

If your QSA or scanning tool flags this finding, provide:

- Cloudflare's current [Attestation of Compliance (AOC) ↗](https://www.cloudflare.com/trust-hub/compliance-resources/pci-dss/)
- Documentation that your domain is proxied through Cloudflare as a PCI DSS Level 1 Service Provider

Your QSA can treat this as a compensating control or documented exception based on Cloudflare's shared responsibility boundary.

### WAF and DDoS blocking ASV scanners

ASV scanners send attack-pattern traffic — SQL injection probes, XSS payloads, vulnerability fingerprinting — to test your application. Cloudflare's WAF blocks many of these probes, which is correct WAF behavior, but it can prevent the scanner from completing its assessment.

To allow a scan without disabling your WAF:

1. Obtain the source IP ranges used by your ASV vendor.
2. Create a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/) that skips managed ruleset matching for those IP ranges, scoped to your scan maintenance window.
3. Remove or disable the rule immediately after the scan completes.

Caution

Keep the WAF exception as narrow as possible — scoped to the scanner's IP range only. Remove it as soon as scanning is complete.

### Non-standard ports

Cloudflare proxies a [defined set of HTTP and HTTPS ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/). For ports outside that list, Cloudflare's anycast network may cause those ports to appear open at the TCP layer even though they are not proxied — the TCP connection is accepted at the edge but HTTP/HTTPS requests are blocked at the application layer before reaching your origin.

If an ASV scan targets non-proxied ports, findings for those ports reflect Cloudflare's edge behavior rather than your origin. Configure your scan to target the ports your application actually serves on, and provide your QSA with the [network ports reference](https://developers.cloudflare.com/fundamentals/reference/network-ports/) to document the expected behavior.

## Vulnerability mitigations

Cloudflare applies these mitigations by default across all proxied zones. No configuration is needed.

Cloudflare does not support:

- Header compression in TLS
- Header compression in SPDY 3.1
- RC4
- SSL 3.0
- Renegotiation with clients
- DHE cipher suites
- Export-grade ciphers

Cloudflare mitigates:

- CRIME
- BREACH
- POODLE
- RC4 cryptographic weaknesses
- SSL renegotiation attacks
- Protocol downgrade attacks
- FREAK
- LogJam
- Sweet32 — 3DES is disabled for TLS 1.1 and 1.2. For TLS 1.0, Cloudflare rotates session keys before the 32 GB threshold required for a successful attack

All Cloudflare servers are patched against Heartbleed, Lucky Thirteen, and CCS injection vulnerability.

## Common scanner false positives

### ROBOT

Security scans that report **Return of Bleichenbacher's Oracle Threat (ROBOT)** against a Cloudflare-proxied domain are false positives. Cloudflare validates RSA PKCS#1 v1.5 padding in real time and substitutes a random session key if padding is incorrect, eliminating any exploitable oracle.

### Sweet32 (CVE-2016-2183)

If a scanner flags Sweet32, verify that TLS 1.0 is disabled on your zone. Refer to [Set minimum TLS version to 1.2](#step-1-set-minimum-tls-version-to-12) for steps. With TLS 1.0 disabled, the 3DES cipher suites where Sweet32 applies are not in use and the finding does not apply to your environment.

### `_cfuvid` cookie missing Secure flag

Cloudflare sets the `_cfuvid` cookie on some zones for rate limiting. Some scanners may report this cookie as missing the `Secure` attribute if they scan over HTTP. If your ASV raises this finding, confirm that your ASV is scanning HTTPS endpoints and that your zone redirects HTTP traffic to HTTPS. Refer to [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) for setup steps.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/#page","headline":"PCI DSS compliance","description":"Configure your Cloudflare zone for PCI DSS compliance — set minimum TLS version, configure approved cipher suites, and understand how Cloudflare interacts with PCI ASV scans.","url":"https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS","Compliance"]}
```
