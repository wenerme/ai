---
description: Secure a private IP or hostname in Access.
title: Secure a private IP or hostname
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure a private IP or hostname

Last updated Aug 11, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can configure a self-hosted Access application to manage access to specific IPs or hostnames on your private network.

Note

This feature replaces the legacy [private network app type](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/).

## Prerequisites

* Private IPs and hostnames are reachable over the Cloudflare One Client, Cloudflare WAN (formerly Magic WAN) or Browser Isolation. For more details, refer to [Connect a private network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/).
* Private hostnames route to your custom DNS resolver through [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) or [Gateway resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/).
* Public IPs and hostnames can be used to define a private application, however the IP or hostname must route through Cloudflare via [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/), [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/), or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/).
* (Optional) Turn on [Gateway TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) if you want to use Access JWTs to manage [HTTPS application sessions](#https-applications).

## Add your application to Access

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Self-hosted and private**.
4. To add an application using its private IP:

  1. Select **Add private IP**.
  2. In **IP address**, enter the private IP or CIDR range that represents the application (for example, `10.0.0.1` or `172.16.0.0/12`).
  3. In **Port**, enter a single port or a port range used by your application (for example, `22` or `8000-8099`).
  Comma-separated lists of ports (such as `80, 443`) are not supported. To add multiple ports for a specific IP, you can select **Add private IP** and repeat the IP address with the other port. Alternatively, create a new Access application for the other port.
5. To add an application using its private hostname:

  1. Select **Add private hostname**.
  2. In **Hostname**, enter the private hostname of the application (for example, `wiki.internal.local`). You can use [wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) with private hostnames to protect multiple parts of an application that share a root path.
  3. In **Port**, enter a single port or a port range used by your application (for example, `22` or `8000-8099`).
Note

  * **HTTPS applications**: Private hostnames explicitly set to port `443` (not including port ranges such as `441-444`) must have a valid Server Name Indicator (SNI).
  * **Non-HTTPS applications**: Private hostnames on non-`443` ports do not require a valid SNI value and will be assigned an initial resolved IP. Ensure that the following IP addresses are not blocked by any firewalls or excluded from Gateway traffic:

    * **IPv4**: `172.64.128.0/20`
    * **IPv6**: `2606:4700:0cf1:4000::/64`
  This is the default range. You can [configure a custom initial resolved IP range](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/) for IPv4 if it conflicts with your existing network.
  For more details on private hostname routing, refer to [Connect a private hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/#prerequisites)
  1. Under **Access policies**, add an existing policy or [create a new policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) to control who can connect to your application. All Access applications are deny by default -- a user must match an Allow policy before they are granted access.
  2. Configure how users will authenticate:

    1. Select the [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) you want to enable for your application.
    2. (Recommended) If you plan to only allow access via a single IdP, turn on **Apply instant authentication**. End users will not be shown the [Cloudflare Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/). Instead, Cloudflare will redirect users directly to your SSO login event.
    3. (Recommended) Turn on **Authenticate with Cloudflare One Client** to allow users to authenticate to the application using their [Cloudflare One Client session identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). Turn this on if your application is not in the browser and cannot handle a `302` redirect.
  3. (Optional) Configure [independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#configure-independent-mfa-for-an-application) for the application.
  4. In **Session Duration**, choose how often the user's [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) should expire.
  Cloudflare checks every HTTP request to your application for a valid application token. If the user's application token (and global token) has expired, they will be prompted to reauthenticate with the IdP. For more information, refer to [Session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/).
  If the application is non-HTTPS or you do not have TLS decryption turned on, the session is tracked by the Cloudflare One Client per application.
  5. (Optional) Go to the **Additional settings** tab to customize the application experience:

    * **App Launcher customization**: Configure how this application appears to users in the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/).
    * **Allow clientless access**: Allow users to access this private hostname or IP without the Cloudflare One Client. Users who pass your Access policies will see a tile in their App Launcher which points to a prefixed URL such as `https://<your-teamname>.cloudflareaccess.com/browser/https://wiki.internal.local/`. The link will route traffic to the application through [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/). This setting is useful for users on unmanaged devices or contractors who cannot install a device client.
      :::note Ensure your [remote browser permissions](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) allow users of this application to open Clientless Web Isolation links.

  * **Custom block pages**: Choose what users will see when they are denied access to the application.

    * **Cloudflare default**: Reload the [login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and display a block message below the Cloudflare Access logo. The default message is `That account does not have access`, or you can enter a custom message.
    * **Redirect URL**: Redirect to the specified website.
    * **Custom page template**: Display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/) hosted in Cloudflare One.
  * The following settings only apply to private hostnames and require [Gateway TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/):
    * [**Cross-Origin Resource Sharing (CORS) settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/cors/)
    * [**Cookie settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#cookie-settings)
    * **401 Response for Service Auth policies**: Return a `401` response code when a user (or machine) makes a request to the application without the correct [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).
6. Select **Create**.

Users can now connect to your private application after authenticating with Cloudflare Access.

## Authentication flow

The authentication experience depends on the application's protocol.

### HTTPS applications

If [Gateway TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) is turned on and a user is accessing an HTTPS application on port `443`, Cloudflare Access will present a login page in the browser and issue an [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) to your origin. This is the same cookie-based authentication flow used by [self-hosted public apps](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

If [Gateway TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) is turned off, session management is [handled in the Cloudflare One Client](#other-non-http-applications) instead of in the browser.

Note

If your origin uses a self-signed or otherwise untrusted certificate, create a Gateway HTTP Allow policy for the origin with the [untrusted certificate action](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#untrusted-certificates) set to _Pass through_. Otherwise, Gateway will block the connection before it reaches Access.

### Plaintext HTTP applications

For applications served over plaintext HTTP on port `80`, Cloudflare Access presents an in-browser login page and issues an [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/), the same as HTTPS applications with Gateway TLS decryption. Gateway TLS decryption is not required because the traffic is already unencrypted.

### Other non-HTTP applications

For applications that are not HTTP or HTTPS (for example, SSH, RDP, or arbitrary TCP/UDP), the Cloudflare One Client manages the session. Users will receive an `Authentication required` pop-up notification from the Cloudflare One Client. When the user selects the notification, the Cloudflare One Client will open a browser window with your Access login page.

Ensure that your operating system allows notifications for the Cloudflare One Client. Your device may not display notifications if focus, do not disturb, or screen sharing settings are turned on. To turn on client notifications on macOS devices running DisplayLink software, you may have to allow system notifications when mirroring your display. For more information, refer to the [macOS documentation ↗](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac).

## Order of precedence

### Access vs Gateway policies

By default, Cloudflare will evaluate Access application policies after evaluating all [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/). To evaluate Access applications before or after specific Gateway policies:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**. In **Network**, [create a Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) with the following configuration:

| Selector           | Operator | Value     | Action |
| ------------------ | -------- | --------- | ------ |
| Access Private App | is       | _Present_ | Allow  |
2. Update the policy's [order of precedence](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence)using the dashboard or API.

Note

Users must pass the policies in your Access application before they are granted access. The Gateway Allow policy is strictly for routing and connectivity purposes.

### Private hostname vs private IP

An Access application defined by a private hostname takes precedence over an Access application defined by a private IP. For example, assume App-1 points to `wiki.internal.local` and App-2 points to `10.0.0.1`, but `wiki.internal.local` resolves to `10.0.0.1`. Users who go to `wiki.internal.local` will never match App-2; they will be allowed or blocked strictly based on App-1 Access policies (and [Gateway policies](#access-vs-gateway-policies)).

## Limitations

### Browser Isolation is not compatible with apps on non-`443` ports

Browser Isolation is not compatible with [self-hosted private applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) that use private IPs or hostnames on ports other than `443`. Trying to access self-hosted applications on non-`443` ports will result in a Gateway block page.

To use Browser Isolation for an application on a private IP address with a non-`443` port, configure a [private network application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/) instead.

### Google Chrome restricts access to private hostnames

Starting with [Chrome 142 ↗](https://developer.chrome.com/release-notes/142), Local Network Access (LNA) restricts requests from websites to local IP addresses. LNA is implemented at the Chromium engine level, so this affects all Chromium-based browsers (for example, Microsoft Edge, Brave, and Opera), not only Google Chrome. This can affect accounts whose Gateway initial resolved IP range is still drawn from Carrier-Grade NAT (CGNAT) address space (`100.64.0.0/10`) — for example, the legacy default range `100.80.0.0/16`, or a custom range configured within CGNAT space. These browsers categorize such addresses as belonging to a local network. When a website loaded from a public IP makes subrequests to a domain resolved through an initial resolved IP in this space, the browser treats this as a public-to-local network request and displays a prompt asking the user to allow access to devices on the local network. The browser blocks requests to these domains until the user accepts this prompt.

This commonly occurs when an Egress policy matches broadly used domains (such as `cloudfront.net` or `github.com`), causing subrequests from public pages to resolve into CGNAT space.

Accounts using the current default initial resolved IP range (`172.64.128.0/20`) are not affected, because this range is public Cloudflare address space rather than CGNAT. If your account was created before this default changed, or if you configured a custom CGNAT-space range, refer to [Configure initial resolved IPs](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/) to move to a non-CGNAT range instead of relying on the following browser workarounds.

The workarounds below use Google Chrome Enterprise policies. If your organization manages a different Chromium-based browser, consult that browser's enterprise policy documentation for an equivalent control.

#### Iframes

If the affected request originates from within an iframe (for example, an application embedded in a third-party portal), the iframe must declare the `local-network-access` permission for the browser prompt to appear in the parent frame:

* **Chrome 142-144**: Use the `allow="local-network-access"` attribute on the iframe element.
* **Chrome 145+**: The permission was split into `allow="local-network"` and `allow="loopback-network"`.

If iframes are nested, every iframe in the chain must include the appropriate attribute. Since third-party applications control their own iframe attributes, this may not be configurable by the end user.

#### Workarounds

To avoid this issue, choose one of the following options:

* **Override IP address space classification (Chrome 146+)**: Use the [LocalNetworkAccessIpAddressSpaceOverrides ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessIpAddressSpaceOverrides) Chrome Enterprise policy to reclassify your CGNAT-space initial resolved IP range (for example, `100.80.0.0/16`) as public. This is the most targeted fix because it only changes the classification for the initial resolved IP range rather than disabling security checks entirely.
* **Allow specific URLs (Chrome 140+)**: Use the [LocalNetworkAccessAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessAllowedForUrls) Chrome Enterprise policy to exempt specific websites from Local Network Access checks. Note that `https://*` is a valid entry to disable checks for all URLs.
* **Allow specific URLs (Chrome 146+)**: Use the [LocalNetworkAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAllowedForUrls) Chrome Enterprise policy, which replaces `LocalNetworkAccessAllowedForUrls` starting in Chrome 146.
* **Opt out of Local Network Access restrictions (Chrome 142-152)**: Use the [LocalNetworkAccessRestrictionsTemporaryOptOut ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessRestrictionsTemporaryOptOut) Chrome Enterprise policy to completely opt out of Local Network Access restrictions. This is a temporary policy and will be removed after Chrome 152.
* **Disable the Chrome feature flag**: Go to `chrome://flags` and set the **Local Network Access Checks** flag to _Disabled_. This approach is suitable for individual users but not for enterprise-wide deployment.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/#page","headline":"Secure a private IP or hostname · Cloudflare One docs","description":"Secure a private IP or hostname in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-11","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
