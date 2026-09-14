---
description: Learn about restrict external connections in this guide.
title: Restrict external connections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Restrict external connections

Last updated Apr 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/prevent-external-connections/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

To fully secure your origin, you should limit or restrict external connections to your origin server. These suggestions vary in their level of completeness and complexity and depend on your application and origin setup.

## Application layer

<details>

<summary>

Cloudflare Tunnel (HTTP / WebSockets)

</summary>

<a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/">Cloudflare Tunnel</a> connects your resources to Cloudflare without a publicly routable IP address, by creating an outbound-only connections to Cloudflare’s global network.

- **Security**: Very secure.
- **Availability**: All customers.
- **Challenges**: Requires installing the <code>cloudflared</code> daemon on origin server or virtual machine.

</details>

<details>

<summary>

HTTP Header Validation

</summary>

Only allow traffic with specific (and secret) HTTP headers.

- **Security**: Moderately secure.
- **Availability**: All customers.
- **Challenges**:
  - Requires more configuration efforts on application- and server-side to accept those headers.
  - Basic authentication is vulnerable to replay attacks. Because basic authentication does not encrypt user credentials, it is important that traffic always be sent over an encrypted SSL session.
  - There might be valid use cases for a mismatch in SNI / Host headers such as through <a href="https://developers.cloudflare.com/rules/origin-rules/features/">Origin or Page Rules</a>, <a href="https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/">Load Balancing</a>, or <a href="https://developers.cloudflare.com/workers/runtime-apis/request/">Workers</a>, which all offer HTTP Host Header overrides.
- **Process**:
  1. Use <a href="https://developers.cloudflare.com/rules/transform/request-header-modification/">Transform rules</a> or <a href="https://developers.cloudflare.com/workers/examples/alter-headers/">Workers</a> to add an HTTP Auth Header.
  2. Configure your origin server to restrict access based on the <a href="https://developers.cloudflare.com/workers/examples/auth-with-headers/">HTTP Auth Header</a> (or perform <a href="https://developers.cloudflare.com/workers/examples/basic-auth/">HTTP Basic Authentication</a>).
  3. Configure your origin server to restrict access based on the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Host">HTTP Host Header ↗</a>. Specifically, only allow requests which contain expected HTTP Host Header values, and reject all other requests.

</details>

<details>

<summary>

JSON Web Tokens (JWT) Validation

</summary>

Only allow traffic with the appropriate JWT.

- **Security**: Very secure.
- **Availability**: Some customers.
- **Challenges**:
  - Requires either installing incremental software or modifying application code.
  - Lots of manual work.
- **Resources**:
  - <a href="https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/">Validate JWTs for an Access application</a>
  - <a href="https://developers.cloudflare.com/api-shield/security/jwt-validation/">Validate JWTs for an API</a>

</details>

## Transport Layer

<details>

<summary>

Authenticated Origin Pulls

</summary>

<a href="https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/">Authenticated Origin Pulls</a> helps ensure requests to your origin server come from the Cloudflare network.

- **Security**: Very secure.
- **Availability**: All customers.
- **Challenges**:
  - Requires <a href="https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/">Full</a> or <a href="https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/">Full (strict)</a> encryption modes.
  - Requires more configuration efforts for application and server, such as uploading a certificate and configuring the server to use it.
  - For more strict security, you should upload your own certificate. Although Cloudflare provides you a certificate for easy configuration, this certificate only guarantees that a request is coming from the Cloudflare network.
  - Not scalable for large numbers of origin servers.

</details>

<details>

<summary>

Cloudflare Tunnel (SSH / RDP)

</summary>

<a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/">Cloudflare Tunnel</a> connects your resources to Cloudflare without a publicly routable IP address, by creating an outbound-only connections to Cloudflare’s global network.

- **Security**: Very secure.
- **Availability**: All customers.
- **Challenges**: Requires installing the <code>cloudflared</code> daemon on origin server or virtual machine.

</details>

## Network Layer

<details>

<summary>

Allowlist Cloudflare IP addresses

</summary>

Explicitly block all traffic that does not come from <a href="https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/">Cloudflare IP addresses</a> (or the IP addresses of your trusted partners, vendors, or applications).

- **Security**: Moderately secure.
- **Availability**: All customers.
- **Challenges**:
  - Requires allowlisting Cloudflare IP ranges at your origin server.
  - Vulnerable to IP spoofing.

</details>

<details>

<summary>

Cloudflare Magic Transit

</summary>

<a href="https://developers.cloudflare.com/magic-transit/">Cloudflare Magic Transit</a> is a network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**
  - Client's routers must:
    - Support anycast tunneling.
    - Allow configuration of at least one tunnel per Internet service provider (ISP).
    - Support maximum segment size (MSS) clamping.

</details>

<details>

<summary>

Cloudflare Network Interconnect

</summary>

<a href="https://developers.cloudflare.com/network-interconnect/">Cloudflare Network Interconnect</a> allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**
  - Requires some networking knowledge.
  - Only applies to some customer use cases.

</details>

<details>

<summary>

Dedicated CDN Egress IPs

</summary>

<a href="https://developers.cloudflare.com/smart-shield/get-started/#packages-and-availability">Smart Shield Advanced</a> provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 <a href="https://developers.cloudflare.com/waf/">WAF</a> and CDN

 services, as well as <a href="https://developers.cloudflare.com/spectrum/">Spectrum</a>. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing a small list of IP addresses through your layer 3 firewall.

- **Security**: Very secure.
- **Availability**: Enterprise-only.
- **Challenges**: Requires network-level firewall policies.

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/prevent-external-connections/#page","headline":"Restrict external connections · Cloudflare Learning Paths","description":"Learn about restrict external connections in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/prevent-external-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
