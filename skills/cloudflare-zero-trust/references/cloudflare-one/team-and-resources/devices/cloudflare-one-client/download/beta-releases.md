---
description: Reference information for Download Cloudflare One Client beta releases in Zero Trust.
title: Download Cloudflare One Client beta releases
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Download Cloudflare One Client beta releases

Last updated Apr 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare tests new Cloudflare One Client features and improvements in an unstable beta release before adding them to the [stable release](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/). Beta releases are not recommended for production environments. To get early access to new features, download the latest beta client from the links below.

## Windows

[Download latest beta release](https://downloads.cloudflareclient.com/v1/download/windows/beta)

| **OS version** | Windows 10 LTSC, Windows 11, Windows 365 Cloud PC running Windows 11 |
| --- | --- |
| **Processor** | AMD64 / x86-64 or ARM64 / AArch64 |
| **.NET Framework version** | 4.7.2 or later |
| **HD space** | 184 MB |
| **Memory** | 3 MB |
| **Network interface type** | Wi-Fi or LAN |
| **MTU** | 1381 bytes recommended <sup>[1](#user-content-fn-1)</sup> |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

<details>

<summary>

Latest release

</summary>

**Version:** Windows 2026.8.1755.1**Date:** 2026-09-21**Size:** 60.1 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2026.8.1755.1">Download</a>

#### Release notes

This beta release includes the following changes and improvements:

- Fixed an issue that could briefly block traffic to split tunnel excluded resources while the client was connecting or reconnecting.
- Improved reauthentication reliability and fixed an issue where a reauthentication could force a new registration.
- Improved client reaction to the current network lowering its MTU.
- Added support for routing non-RFC 1918 local IPv4 networks through the WARP tunnel when unrestricted LAN inclusion is enabled by policy or MDM.
- Improved DNS reliability on networks with lower MTUs by clamping the TCP maximum segment size (MSS) for DNS-over-HTTPS connections sent through the tunnel.
- Improved API reliability by retrying requests dropped when reusing pooled connections.
- The client no longer requires the Windows WLAN AutoConfig service to be running.
- Implemented a service recovery mechanism backed by Windows scheduler task to start WARP service on system unlock if not already started.
- Fixed slow captive portal checks causing the client service to become unresponsive or restart while connecting.
- Fixed a race when switching tunnel protocols during key rotation that could prevent WireGuard from connecting.
- Fixed the client continuing to report 'No network' after a successful manual disconnect.
- Fixed Digital Experience Monitoring (DEX) HTTP tests failing TLS validation on Windows.
- Fixed the client UI crashing at startup when it could not write to the Windows registry.
- Fixed latency spikes and traffic interruptions during TPM-backed API authentication when hardware-backed registration is enabled.
- Fixed trailing whitespace in BIOS serial numbers causing serial-number and client-certificate device posture checks to fail.
- Fixed a client UI crash that could occur when the daemon connection was reset during an IPC request.
- Fixed a startup crash when date formatting data for the system locale had not yet loaded.

**Known issues**

- None

For Zero Trust documentation, see: <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/">https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/</a> For Consumer documentation, see: <a href="https://developers.cloudflare.com/warp-client/">https://developers.cloudflare.com/warp-client/</a>

</details>

<details>

<summary>

Previous version history (7)

</summary>

<details>

<summary>

Windows 2026.8.1290.1

</summary>

**Version:** Windows 2026.8.1290.1**Date:** 2026-09-09**Size:** 74.3 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2026.8.1290.1">Download</a>

#### Release notes

This beta release includes the following changes and improvements:

- Added support for routing non-RFC 1918 local IPv4 networks through the WARP tunnel when unrestricted LAN inclusion is enabled by policy or MDM.
- Improved DNS reliability on networks with lower MTUs by clamping the TCP maximum segment size (MSS) for DNS-over-HTTPS connections sent through the tunnel.
- Improved API reliability by retrying requests dropped when reusing pooled connections.
- The client no longer requires the Windows WLAN AutoConfig service to be running.
- Implemented a service recovery mechanism backed by Windows scheduler task to start WARP service on system unlock if not already started.
- Fixed slow captive portal checks causing the client service to become unresponsive or restart while connecting.
- Fixed a race when switching tunnel protocols during key rotation that could prevent WireGuard from connecting.
- Fixed the client continuing to report 'No network' after a successful manual disconnect.
- Fixed Digital Experience Monitoring (DEX) HTTP tests failing TLS validation on Windows.
- Fixed the client UI crashing at startup when it could not write to the Windows registry.
- Fixed latency spikes and traffic interruptions during TPM-backed API authentication when hardware-backed registration is enabled.
- Fixed trailing whitespace in BIOS serial numbers causing serial-number and client-certificate device posture checks to fail.
- Fixed a client UI crash that could occur when the daemon connection was reset during an IPC request.
- Fixed a startup crash when date formatting data for the system locale had not yet loaded.

**Known issues**

- None

For Zero Trust documentation, see: <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/">https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/</a><br> For Consumer documentation, see: <a href="https://developers.cloudflare.com/warp-client/">https://developers.cloudflare.com/warp-client/</a>

</details>

<details>

<summary>

Windows 2026.7.1210.1

</summary>

**Version:** Windows 2026.7.1210.1**Date:** 2026-07-31**Size:** 59.5 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2026.7.1210.1">Download</a>

#### Release notes

This beta release includes the following changes and improvements:

- Improved connection reliability: the client now swaps protocol order after repeated connectivity-check failures, which helps when HTTP/3 is blocked after the QUIC handshake.
- Fixed issue where a certificate error could be incorrectly displayed right after the connection is established.
- A <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes">DNS search domain</a> parsing failure no longer prevents connection.
- Fixed a <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol">MASQUE</a> issue where the tunnel could stall while uploading at a high rate.
- Fixed being unable to <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/">switch organizations</a> when the client was stuck in the "Device not in organization" state.
- Fixed the Home Screen dropdown popup not anchoring correctly.
- Fixed a crash during dialog dismissal.
- Increased tolerance for configurations with a large number of <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/">local domain fallback</a> resolver IPs, so DNS resolution behaves correctly even when more fallback resolvers are configured than recommended.
- Fixed a networking issue where IPv6 multicast routes were being assigned to the WARP tunnel interface.
- Fixed fatal errors on UI load on Windows 10.
- Fixed a crash during Windows notification initialization.
- Made the Windows <a href="https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/domain-joined/">domain-joined posture check</a> more reliable.
- Fixed orphaned credentials left behind on multi-user uninstall.
- A successful re-authentication will cause the <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/">device profile</a> to be re-evaluated.
- Improved <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/client-version-assignments/">dashboard-managed client updates</a> by running the updater only when needed.

</details>

<details>

<summary>

Windows 2026.5.1155.1

</summary>

**Version:** Windows 2026.5.1155.1**Date:** 2026-05-29**Size:** 56 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2026.5.1155.1">Download</a>

#### Release notes

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

- Right click context menu to access the most common client actions quickly
- Built-in captive portal login experience

**Additional Changes and improvements**

- The client now applies DNS search suffixes configured in your <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles">device profile</a> / <a href="https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies">network policy</a>. Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes">DNS search suffixes</a> for details.
- Administrators can now control which virtual networks (VNETs) are available to which users via WARP device profile settings in the Zero Trust dashboard. Previously, every VNET in the organization was visible to every device; you can now scope the VNET picker per profile so users only see the networks relevant to them. See <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#vnet-availability">VNET availability</a> for details.
- Added mandatory authentication. When enabled via MDM, the Cloudflare One Client blocks all Internet traffic from the moment the machine boots until the user authenticates, closing the visibility gap on newly deployed devices and during re-authentication. See the <a href="https://blog.cloudflare.com/mandatory-authentication-mfa/">announcement blog</a> and <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-no-auth-no-internet/">documentation</a> for details.
- Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
- Added new warp-cli debug commands for interactive connection diagnosis. See <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging">Extra debug logging</a> for details.
- The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
- Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization_configs">Cloudflare One MDM documentation</a> for details.
- Client Certificate device-posture checks now support template variables (e.g. <code>${serial_number}</code>, <code>${device_uuid}</code>) in the Subject Alternative Name field, matching what the documentation has always claimed. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
- The UseWebView2 registry value (HKLM\\SOFTWARE\\Cloudflare\\CloudflareWARP\\UseWebView2 = y) is once again honored by the new GUI for authentication, so administrators who prefer the embedded WebView2 browser for sign-in can opt back in. This setting was effectively ignored in the previous release; the default browser was always used. This key is now also honored for re-authentications.
- Fixed a crash in the authentication browser when navigating to a site that prompts for browser permissions (microphone, camera, notifications, etc.). The same fix had previously landed for the captive-portal browser; this extends it to the auth browser.
- Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.

**Known issues**

- An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
- Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
- Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via <code>warp-cli tunnel ip</code> and <code>warp-cli tunnel host</code>. UI support will be added in a future release.
- Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
- DNS resolution may be broken when the following conditions are all true:
  - The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  - A custom DNS server address is configured on the primary network adapter.
  - The custom DNS server address on the primary network adapter is changed while the client is connected.<br> To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

</details>

<details>

<summary>

Windows 2026.3.566.1

</summary>

**Version:** Windows 2026.3.566.1**Date:** 2026-03-10**Size:** 51.4 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2026.3.566.1">Download</a>

#### Release notes

This release contains minor fixes and introduces a brand new visual style for the client interface. The new Cloudflare One Client interface changes connectivity management from a toggle to a button and brings useful connectivity settings to the home screen. The redesign also introduces a collapsible navigation bar. When expanded, more client information can be accessed including connectivity, settings, and device profile information. If you have any feedback or questions, visit the <a href="https://community.cloudflare.com/t/introducing-the-new-cloudflare-one-client-interface/901362">Cloudflare Community forum</a> and let us know.

**Changes and improvements**

- Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
- Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
- Added monitoring for tunnel statistics collection timeouts.
- Switched tunnel congestion control algorithm to Cubic for improved reliability across platforms.
- Fixed packet capture failing on tunnel interface when the tunnel interface is renamed by SCCM VPN boundary support.
- Fixed unnecessary registration deletion caused by RDP connections in multi-user mode.
- Fixed increased tunnel interface start-up time due to a race between duplicate address detection (DAD) and disabling NetBT.
- Fixed tunnel failing to connect when the system DNS search list contains unexpected characters.
- Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
- Fixed an issue in proxy mode where the client could become unresponsive due to upstream connection timeouts.
- Fixed emergency disconnect state from a previous organization incorrectly persisting after switching organizations.
- Fixed initiating managed network detection checks when no network is available, which caused device profile flapping.

**Known issues**

- The client may unexpectedly terminate during captive portal login. To work around this issue, use a web browser to authenticate with the captive portal and then re-launch the client.
- An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
- The client may become stuck in a <code>Connecting</code> state. To resolve this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface. Alternatively, change the client's operation mode.
- The client may display an empty white screen upon the device waking from sleep. To resolve this issue, exit and then open the client to re-launch it.
- Canceling login during a single MDM configuration setup results in an empty page with no way to resume authentication. To work around this issue, exit and relaunch the client.
- For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum <a href="https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd">Windows 11 24H2 version KB5062553</a> or higher for resolution.
- Devices with KB5055523 installed may receive a warning about <code>Win32/ClickFix.ABA</code> being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to <a href="https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0">version 1.429.19.0</a> or later. This warning will be omitted from future release notes. This Microsoft Security Intelligence update was released in May 2025.
- DNS resolution may be broken when the following conditions are all true:
  - The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  - A custom DNS server address is configured on the primary network adapter.
  - The custom DNS server address on the primary network adapter is changed while the client is connected. To work around this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface.

</details>

<details>

<summary>

Windows 2026.1.89.1

</summary>

**Version:** Windows 2026.1.89.1**Date:** 2026-01-27**Size:** 137 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2026.1.89.1">Download</a>

#### Release notes

This release contains minor fixes, improvements, and new features.

**Changes and improvements**

- Improvements to <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/">multi-user mode</a>. Fixed an issue where when switching from a pre-login registration to a user registration, Mobile Device Management (MDM) configuration association could be lost.
- Added a new feature to <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#netbios-over-tcpip">manage NetBIOS over TCP/IP</a> functionality on the Windows client. NetBIOS over TCP/IP on the Windows client is now disabled by default and can be enabled in <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/">device profile settings</a>.
- Fixed an issue causing failure of the <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion">local network exclusion</a> feature when configured with a timeout of <code>0</code>.
- Improvement for the Windows <a href="https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/">client certificate posture check</a> to ensure logged results are from checks that run once users log in.
- Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.

**Known issues**

- For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum <a href="https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd">Windows 11 24H2 KB5062553</a> or higher for resolution.
- Devices with KB5055523 installed may receive a warning about <code>Win32/ClickFix.ABA</code> being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to <a href="https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0">version 1.429.19.0</a> or later.
- DNS resolution may be broken when the following conditions are all true:
  - WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  - A custom DNS server address is configured on the primary network adapter.
  - The custom DNS server address on the primary network adapter is changed while WARP is connected.

  To work around this issue, reconnect the WARP client by toggling off and back on.

</details>

<details>

<summary>

Windows 2025.10.118.1

</summary>

**Version:** Windows 2025.10.118.1**Date:** 2025-12-09**Size:** 136 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2025.10.118.1">Download</a>

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

- The <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/">Local Domain Fallback</a> feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
- <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode">Proxy mode</a> now supports transparent HTTP proxying in addition to CONNECT-based proxying.
- Fixed an issue where sending large messages to the WARP daemon by Inter-Process Communication (IPC) could cause WARP to crash and result in service interruptions.

**Known issues**

- For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum <a href="https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd">Windows 11 24H2 KB5062553</a> or higher for resolution.
- Devices with KB5055523 installed may receive a warning about <code>Win32/ClickFix.ABA</code> being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to <a href="https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0">version 1.429.19.0</a> or later.
- DNS resolution may be broken when the following conditions are all true:
  - WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  - A custom DNS server address is configured on the primary network adapter.
  - The custom DNS server address on the primary network adapter is changed while WARP is connected.

  To work around this issue, reconnect the WARP client by toggling off and back on.

</details>

<details>

<summary>

Windows 2025.9.173.1

</summary>

**Version:** Windows 2025.9.173.1**Date:** 2025-10-16**Size:** 135 MB

<a href="https://downloads.cloudflareclient.com/v1/download/windows/version/2025.9.173.1">Download</a>

#### Release notes

This release contains minor fixes, improvements, and new features including Path Maximum Transmission Unit Discovery (PMTUD). With PMTUD enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to debug connectivity issues.

**Changes and improvements**

- Improvements for <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/">Windows multi-user</a> to maintain the <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices">Global WARP override</a> state when switching between users.
- The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to debug connectivity issues.
- Deleting registrations no longer returns an error when succeeding.
- Path Maximum Transmission Unit Discovery (PMTUD) is now used to discover the effective MTU of the connection. This allows the client to improve connection performance optimized for the current network.

**Known issues**

- For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum <a href="https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd">Windows 11 24H2 KB5062553</a> or higher for resolution.
- Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server">Route traffic to fallback server</a>.
- Devices with KB5055523 installed may receive a warning about <code>Win32/ClickFix.ABA</code> being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to <a href="https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0">version 1.429.19.0</a> or later.
- DNS resolution may be broken when the following conditions are all true:
  - WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  - A custom DNS server address is configured on the primary network adapter.
  - The custom DNS server address on the primary network adapter is changed while WARP is connected.

  To work around this issue, reconnect the WARP client by toggling off and back on.

</details>

</details>

## macOS

[Download latest beta release](https://downloads.cloudflareclient.com/v1/download/macos/beta)

| **OS version** | Sequoia 15.1+ (15.0.x is not supported), Tahoe 26.0+, Golden Gate 27.0+ |
| --- | --- |
| **Processor** | Intel or M series |
| **HD space** | 75 MB |
| **Memory** | 35 MB |
| **Network interface type** | Wi-Fi or LAN |
| **MTU** | 1381 bytes recommended <sup>[1](#user-content-fn-1)</sup> |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

<details>

<summary>

Latest release

</summary>

**Version:** macOS 2026.8.1755.1**Date:** 2026-09-21**Size:** 166 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2026.8.1755.1">Download</a>

#### Release notes

This beta release includes the following changes and improvements:

- Fixed an issue that could briefly block traffic to split tunnel excluded resources while the client was connecting or reconnecting.
- Improved reauthentication reliability and fixed an issue where a reauthentication could force a new registration.
- Improved client reaction to the current network lowering its MTU.
- Added support for routing non-RFC 1918 local IPv4 networks through the WARP tunnel when unrestricted LAN inclusion is enabled by policy or MDM.
- Improved DNS reliability on networks with lower MTUs by clamping the TCP maximum segment size (MSS) for DNS-over-HTTPS connections sent through the tunnel.
- Improved API reliability by retrying requests dropped when reusing pooled connections.
- Fixed Extra Logging failing to capture packets across all interfaces.
- Fixed an issue that could prevent remote diagnostics from completing.
- Fixed DNS connectivity checks failing on IPv6-only networks.
- Fixed the client service exiting when its route-monitoring socket was closed after sleep or wake.
- Fixed DNS enforcement checks making the client service unresponsive on systems with large routing tables.
- Fixed slow captive portal checks causing the client service to become unresponsive or restart while connecting.
- Fixed a race when switching tunnel protocols during key rotation that could prevent WireGuard from connecting.
- Fixed the client continuing to report 'No network' after a successful manual disconnect.
- Fixed a client UI crash that could occur when the daemon connection was reset during an IPC request.
- Fixed a startup crash when date formatting data for the system locale had not yet loaded.

**Known issues**

- None

For Zero Trust documentation, see: <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/">https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/</a> For Consumer documentation, see: <a href="https://developers.cloudflare.com/warp-client/">https://developers.cloudflare.com/warp-client/</a>

</details>

<details>

<summary>

Previous version history (8)

</summary>

<details>

<summary>

macOS 2026.8.1290.1

</summary>

**Version:** macOS 2026.8.1290.1**Date:** 2026-09-09**Size:** 165 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2026.8.1290.1">Download</a>

#### Release notes

This beta release includes the following changes and improvements:

- Added support for routing non-RFC 1918 local IPv4 networks through the WARP tunnel when unrestricted LAN inclusion is enabled by policy or MDM.
- Improved DNS reliability on networks with lower MTUs by clamping the TCP maximum segment size (MSS) for DNS-over-HTTPS connections sent through the tunnel.
- Improved API reliability by retrying requests dropped when reusing pooled connections.
- Fixed Extra Logging failing to capture packets across all interfaces.
- Fixed an issue that could prevent remote diagnostics from completing.
- Fixed DNS connectivity checks failing on IPv6-only networks.
- Fixed the client service exiting when its route-monitoring socket was closed after sleep or wake.
- Fixed DNS enforcement checks making the client service unresponsive on systems with large routing tables.
- Fixed slow captive portal checks causing the client service to become unresponsive or restart while connecting.
- Fixed a race when switching tunnel protocols during key rotation that could prevent WireGuard from connecting.
- Fixed the client continuing to report 'No network' after a successful manual disconnect.
- Fixed a client UI crash that could occur when the daemon connection was reset during an IPC request.
- Fixed a startup crash when date formatting data for the system locale had not yet loaded.

**Known issues**

- None

For Zero Trust documentation, see: <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/">https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/</a><br> For Consumer documentation, see: <a href="https://developers.cloudflare.com/warp-client/">https://developers.cloudflare.com/warp-client/</a>

</details>

<details>

<summary>

macOS 2026.7.1210.1

</summary>

**Version:** macOS 2026.7.1210.1**Date:** 2026-07-31**Size:** 153 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2026.7.1210.1">Download</a>

#### Release notes

This beta release includes the following changes and improvements:

- Improved connection reliability: the client now swaps protocol order after repeated connectivity-check failures, which helps when HTTP/3 is blocked after the QUIC handshake.
- Fixed issue where a certificate error could be incorrectly displayed right after the connection is established.
- A <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes">DNS search domain</a> parsing failure no longer prevents connection.
- Fixed a <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol">MASQUE</a> issue where the tunnel could stall while uploading at a high rate.
- Fixed being unable to <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/">switch organizations</a> when the client was stuck in the "Device not in organization" state.
- Fixed the Home Screen dropdown popup not anchoring correctly.
- Fixed a crash during dialog dismissal.
- Increased tolerance for configurations with a large number of <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/">local domain fallback</a> resolver IPs, so DNS resolution behaves correctly even when more fallback resolvers are configured than recommended.
- Fixed the WARP client stealing window focus (for example, during reauth).
- Fixed a client crash when connecting to a captive portal over Wi-Fi.
- Fixed the system tray icon showing "disconnected" while the UI showed "connected".
- A successful re-authentication will cause the <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/">device profile</a> to be re-evaluated.
- Improved <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/client-version-assignments/">dashboard-managed client updates</a> by running the updater only when needed.

</details>

<details>

<summary>

macOS 2026.6.782.1

</summary>

**Version:** macOS 2026.6.782.1**Date:** 2026-06-24**Size:** 152 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2026.6.782.1">Download</a>

#### Release notes

This beta release introduces upgraded security of device registration to be hardware-backed. Registration tokens can now be generated in the Secure Enclave whenever available to provide stronger protection against device impersonation.

**Additional changes and improvements**

This release also introduces multiple fixes and improvements including:

- Improved accessibility by using high contrast colors and more defined color boundaries when high contrast is enabled in the macOS Display settings.
- Path MTU Discovery (PMTUD) is now enabled by default.
- Fixed an issue where DNS queries would fail after the connection was idle, requiring users to retry.
- Users can now register with team names in any case format without errors.
- New UI fixes
  - Fixed an issue where users with invalid MDM configurations were returned to the onboarding screen after successful authentication.
  - Added a re-auth button and banner to the home screen so users don't miss it when their session expires.
  - Added clear error messaging when the Cloudflare certificate needs to be installed.
  - Brought back support for pausing the tunnel when connected to user-specified Wi-Fi networks for consumer users.
  - New client UI now surfaces Split tunnel configuration and Local Domain Fallback configuration.
  - Added ability to configure proxy mode for consumer users.
  - Added back the option to quit for consumer users.

**Known issues**

- Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.

</details>

<details>

<summary>

macOS 2026.5.1155.1

</summary>

**Version:** macOS 2026.5.1155.1**Date:** 2026-05-29**Size:** 143 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2026.5.1155.1">Download</a>

#### Release notes

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

- Right click context menu to access the most common client actions quickly
- Built-in captive portal login experience

**Additional Changes and improvements**

- The client now applies DNS search suffixes configured in your <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles">device profile</a> / <a href="https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies">network policy</a>. Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes">DNS search suffixes</a> for details.
- Administrators can now control which virtual networks (VNETs) are available to which users via WARP device profile settings in the Zero Trust dashboard. Previously, every VNET in the organization was visible to every device; you can now scope the VNET picker per profile so users only see the networks relevant to them. See <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#vnet-availability">VNET availability</a> for details.
- Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
- Added new warp-cli debug commands for interactive connection diagnosis. See <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging">Extra debug logging</a> for details.
- The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
- Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization_configs">Cloudflare One MDM documentation</a> for details.
- Client Certificate device-posture checks now support template variables (e.g. <code>${serial_number}</code>, <code>${device_uuid}</code>) in the Subject Alternative Name field, matching what the documentation has always claimed. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
- Fixed the in-client captive-portal browser rendering a blank "Success" page on some airline Wi-Fi networks (United inflight Wi-Fi was the reported case). The browser now reliably loads the airline's real portal page so users can complete sign-in from inside the client instead of having to open a separate browser.
- Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.

**Known issues**

- Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
- Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via <code>warp-cli tunnel ip</code> and <code>warp-cli tunnel host</code>. UI support will be added in a future release.

</details>

<details>

<summary>

macOS 2026.3.566.1

</summary>

**Version:** macOS 2026.3.566.1**Date:** 2026-03-10**Size:** 128 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2026.3.566.1">Download</a>

#### Release notes

This release contains minor fixes and introduces a brand new visual style for the client interface. The new Cloudflare One Client interface changes connectivity management from a toggle to a button and brings useful connectivity settings to the home screen. The redesign also introduces a collapsible navigation bar. When expanded, more client information can be accessed including connectivity, settings, and device profile information. If you have any feedback or questions, visit the <a href="https://community.cloudflare.com/t/introducing-the-new-cloudflare-one-client-interface/901362">Cloudflare Community forum</a> and let us know.

**Changes and improvements**

- Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
- Fixed an issue in proxy mode where the client could become unresponsive due to upstream connection timeouts.
- Fixed emergency disconnect state from a previous organization incorrectly persisting after switching organizations.
- Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
- Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
- Added monitoring for tunnel statistics collection timeouts.
- Switched tunnel congestion control algorithm to Cubic for improved reliability across platforms.
- Fixed initiating managed network detection checks when no network is available, which caused device profile flapping.

**Known issues**

- The client may become stuck in a <code>Connecting</code> state. To resolve this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface. Alternatively, change the client's operation mode.
- The client may display an empty white screen upon the device waking from sleep. To resolve this issue, exit and then open the client to re-launch it.
- Canceling login during a single MDM configuration setup results in an empty page with no way to resume authentication. To work around this issue, exit and relaunch the client.

</details>

<details>

<summary>

macOS 2026.1.89.1

</summary>

**Version:** macOS 2026.1.89.1**Date:** 2026-01-27**Size:** 115 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2026.1.89.1">Download</a>

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

- Fixed an issue causing failure of the <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion">local network exclusion</a> feature when configured with a timeout of <code>0</code>.
- Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.

</details>

<details>

<summary>

macOS 2025.10.118.1

</summary>

**Version:** macOS 2025.10.118.1**Date:** 2025-12-09**Size:** 111 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2025.10.118.1">Download</a>

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

- The <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/">Local Domain Fallback</a> feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
- <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode">Proxy mode</a> now supports transparent HTTP proxying in addition to CONNECT-based proxying.

</details>

<details>

<summary>

macOS 2025.9.173.1

</summary>

**Version:** macOS 2025.9.173.1**Date:** 2025-10-16**Size:** 111 MB

<a href="https://downloads.cloudflareclient.com/v1/download/macos/version/2025.9.173.1">Download</a>

#### Release notes

This release contains minor fixes, improvements, and new features including Path Maximum Transmission Unit Discovery (PMTUD). With PMTUD enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to debug connectivity issues.

**Changes and improvements**

- The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to debug connectivity issues.
- Deleting registrations no longer returns an error when succeeding.
- Path Maximum Transmission Unit Discovery (PMTUD) is now used to discover the effective MTU of the connection. This allows the client to improve connection performance optimized for the current network.

**Known issues**

- macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
- Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server">Route traffic to fallback server</a>.

</details>

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/#page","headline":"Download Cloudflare One Client beta releases · Cloudflare One docs","description":"Reference information for Download Cloudflare One Client beta releases in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
