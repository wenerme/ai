---
description: Reference information for Download Cloudflare One Client stable releases in Zero Trust.
title: Download Cloudflare One Client stable releases
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Download Cloudflare One Client stable releases

Last updated Jun 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This page contains the stable Cloudflare One Client (formerly WARP) releases from the past year. We recommend using stable releases for production environments. You can download stable releases from the links below after checking requirements.

Cloudflare also offers an unstable [beta release track](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/) with the latest features and improvements, and an [LTS release track](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/lts-releases/) with extended support durations.

For more details on Cloudflare One Client support timelines and end-of-life (EOL) policies, refer to the [Support lifecycle](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/support-lifecycle/) page.

## Windows

[Download latest stable release](https://downloads.cloudflareclient.com/v1/download/windows/ga)

| **OS version**             | Windows 10 LTSC, Windows 11, Windows 365 Cloud PC running Windows 11 |
| -------------------------- | -------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                    |
| **.NET Framework version** | 4.7.2 or later                                                       |
| **HD space**               | 184 MB                                                               |
| **Memory**                 | 3 MB                                                                 |
| **Network interface type** | Wi-Fi or LAN                                                         |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                       |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

Latest release

**Version:** Windows2026.6.880.0**Date:** 2026-07-21**Size:** 59 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.6.880.0)

#### Release notes

This hotfix resolves a regression that caused a large increase in DNS-over-TCP queries to fallback and internal DNS servers. The client now sends fallback DNS queries over UDP first, falling back to TCP only when a response is truncated, instead of querying both protocols in parallel.

Previous version history (13)

Windows 2026.6.850.0

**Version:** Windows2026.6.850.0**Date:** 2026-07-07**Size:** 59 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.6.850.0)

#### Release notes

This hotfix addresses a Windows authentication issue in the embedded WebView2 browser. Single sign-on could fail to use the Windows primary account, causing users to be prompted for an interactive sign-in. The embedded authentication browser now allows SSO providers to use the OS primary account when available.

Windows 2026.6.822.0

**Version:** Windows2026.6.822.0**Date:** 2026-06-29**Size:** 59 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.6.822.0)

#### Release notes

This release introduces multiple features from our previous beta release into stable release, including:

* The client now applies DNS search suffixes configured in your [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles) / [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies). Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) for details.
* Added mandatory authentication. When enabled via MDM, the Cloudflare One Client blocks all Internet traffic from the moment the machine boots until the user authenticates, closing the visibility gap on newly deployed devices and during re-authentication. See the [announcement blog](https://blog.cloudflare.com/mandatory-authentication-mfa/) and [documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-no-auth-no-internet/) for details.
* Upgraded security of device registration to be hardware-backed. Registration tokens can now be generated in the TPM (with TPM 2.0+) whenever it is available to provide stronger protection against device impersonation. See [Hardware-backed registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/hardware-backed-registration/) for details.
* Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
* Added new warp-cli debug commands for interactive connection diagnosis. See [Extra debug logging](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging) for details.
* The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
* Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated [Cloudflare One MDM documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) for details.
* Added support for dashboard-managed client version deployments. Administrators can now upgrade or downgrade the client version on enrolled devices directly from the Zero Trust dashboard. See [Client version assignments](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/client-version-assignments/) for details.

**Additional Changes and improvements**

* Starting with 2026.6.822.0, the client unifies all API requests under the `api.devices.cloudflare.com` SNI, where previously both `zero-trust-client.cloudflareclient.com` and `notifications.cloudflareclient.com` were used. Review [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/) to ensure systems that rely on SNI inspection do not block the API traffic. The behavior of previous client versions is unaffected.
* Client Certificate device-posture checks now support template variables (e.g. `${serial_number}`, `${device_uuid}`) in the Subject Alternative Name field. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
* Improved accessibility by using high contrast colors and more defined color boundaries when high contrast is enabled in Windows Accessibility settings.
* Path MTU Discovery (PMTUD) is now enabled by default.
* The UseWebView2 registry value (HKLM\\SOFTWARE\\Cloudflare\\CloudflareWARP\\UseWebView2 = y) is once again honored by the new GUI for authentication, so administrators who prefer the embedded WebView2 browser for sign-in can opt back in. This setting was effectively ignored in the previous release; the default browser was always used. This key is now also honored for re-authentications.
* Fixed a crash in the authentication browser when navigating to a site that prompts for browser permissions (microphone, camera, notifications, etc.). The same fix had previously landed for the captive-portal browser; this extends it to the auth browser.
* Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.
* Fixed an issue where DNS queries would fail after the connection was idle, requiring users to retry.
* Fixed a high CPU issue when the device wakes from sleep.
* Users can now register with team names in any case format without errors.
* New UI fixes
  * Fixed an issue where users with invalid MDM configurations were returned to the onboarding screen after successful authentication.
  * Added a re-auth button and banner to the home screen so users don't miss it when their session expires.
  * Added clear error messaging when the Cloudflare certificate needs to be installed.
  * Brought back support for pausing the tunnel when connected to user-specified Wi-Fi networks for consumer users.
  * New client UI now surfaces Split tunnel configuration and Local Domain Fallback configuration.
  * Added ability to configure proxy mode for consumer users.
  * Added back the option to quit for consumer users.

**Known issues**

* Single sign-on in the embedded WebView2 authentication browser may fail to use the Windows primary account, prompting for an interactive sign-in.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* In rare cases, a registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click "Ok" with the default highlighted option.

Windows 2026.4.1390.0

**Version:** Windows2026.4.1390.0**Date:** 2026-05-26**Size:** 52.3 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.4.1390.0)

#### Release notes

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration authentication for devices via the integrated WebView2 browser is unavailable in this version as a temporary measure. As a result, the client will utilize the default browser on the device to complete the authentication process.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:
  * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while the client is connected.
  To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

Windows 2026.4.1350.0

**Version:** Windows2026.4.1350.0**Date:** 2026-05-11**Size:** 52.3 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.4.1350.0)

#### Release notes

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.

**Known issues**

* Registration authentication for devices via the integrated WebView2 browser is unavailable in this version as a temporary measure. As a result, the client will utilize the default browser on the device to complete the authentication process.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:
  * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while the client is connected.
  To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

Windows 2026.3.851.0

**Version:** Windows2026.3.851.0**Date:** 2026-04-07**Size:** 136 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.3.851.0)

#### Release notes

This release contains minor fixes and improvements.

The next stable release for Windows will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Fixed an issue causing Windows client tunnel interface initialization failure which prevented clients from establishing a tunnel for connection.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed packet capture failing on tunnel interface when the tunnel interface is renamed by SCCM VPN boundary support.
* Fixed unnecessary registration deletion caused by RDP connections in multi-user mode.
* Fixed increased tunnel interface start-up time due to a race between duplicate address detection (DAD) and disabling NetBT.
* Fixed tunnel failing to connect when the system DNS search list contains unexpected characters.
* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.
* Fixed an issue where degraded Windows Management Instrumentation (WMI) state could put the client in a failed connection state loop during initialization.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution. This warning will be omitted from future release notes. This Windows update was released in July 2025.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later. This warning will be omitted from future release notes. This Microsoft Security Intelligence update was released in May 2025.
* DNS resolution may be broken when the following conditions are all true:

  * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while the client is connected.
To work around this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface.

Windows 2026.1.150.0

**Version:** Windows2026.1.150.0**Date:** 2026-02-24**Size:** 137 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.1.150.0)

#### Release notes

This release contains minor fixes, improvements, and new features.

**Changes and improvements**

* Improvements to [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/). Fixed an issue where when switching from a pre-login registration to a user registration, Mobile Device Management (MDM) configuration association could be lost.
* Added a new feature to [manage NetBIOS over TCP/IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#netbios-over-tcpip) functionality on the Windows client. NetBIOS over TCP/IP on the Windows client is now disabled by default and can be enabled in [device profile settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/).
* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for the Windows [client certificate posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/) to ensure logged results are from checks that run once users log in.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed an issue causing DNS requests to fail with clients in Traffic and DNS mode.
* Improved service shutdown behavior in cases where the daemon is unresponsive.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.10.186.0

**Version:** Windows2025.10.186.0**Date:** 2026-01-13**Size:** 135 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.10.186.0)

#### Release notes

This release contains minor fixes, improvements, and new features. New features include the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect), and a new WARP client device posture check for [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/antivirus/).

**Changes and improvements**

* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.
* Fixed an issue that caused occasional audio degradation and increased CPU usage on Windows by optimizing route configurations for large [domain-based split tunnel rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#domain-based-split-tunnels).
* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where sending large messages to the daemon by Inter-Process Communication (IPC) could cause the daemon to fail and result in service interruptions.
* Added support for a new WARP client device posture check for [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/antivirus/). The check confirms the presence of an antivirus program on a Windows device with the option to check if the antivirus is up to date.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.9.558.0

**Version:** Windows2025.9.558.0**Date:** 2025-11-11**Size:** 136 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.9.558.0)

#### Release notes

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

**Changes and improvements**

* Fixed an inconsistency with [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings in multi-user environments when switching between users.
* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).
* Improvements for the [OS version](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/os-version/) WARP client check. Windows Updated Build Revision (UBR) numbers can now be checked by the client to ensure devices have required security patches and features installed.
* The WARP client now supports Windows 11 ARM-based machines. For information on known limitations, refer to the [Known limitations page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/known-limitations/#cloudflare-one-client-disconnected-on-windows-arm).

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.8.779.0

**Version:** Windows2025.8.779.0**Date:** 2025-10-07**Size:** 135 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.8.779.0)

#### Release notes

This release contains significant fixes and improvements.

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.7.176.0

**Version:** Windows2025.7.176.0**Date:** 2025-09-30**Size:** 134 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.7.176.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvement to maintain TCP connections to reduce interruptions in long-lived connections such as RDP or SSH.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* Improvements to maintain client connectivity during network changes.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.6.1400.0

**Version:** Windows2025.6.1400.0**Date:** 2025-08-21**Size:** 134 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.6.1400.0)

#### Release notes

This release contains a hotfix for pre-login for multi-user for the 2025.6.1135.0 release.

**Changes and improvements**

* Fixes an issue where new pre-login registrations were not being properly created.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about Win32/ClickFix.ABA being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, please reconnect the WARP client by toggling off and back on.

Windows 2025.6.1335.0

**Version:** Windows2025.6.1335.0**Date:** 2025-08-19**Size:** 134 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.6.1335.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Improvements to better manage multi-user pre-login registrations.
* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.5.943.0

**Version:** Windows2025.5.943.0**Date:** 2025-07-23**Size:** 130 MB

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.5.943.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Changes to the [SCCM VPN boundary support](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#sccm-vpn-boundary-support) feature to no longer restart the SMS Agent Host (`ccmexec.exe`) service.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with `KB5055523` installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:

  * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.
  * A custom DNS server address is configured on the primary network adapter.
  * The custom DNS server address on the primary network adapter is changed while WARP is connected.
To work around this issue, reconnect the WARP client by toggling off and back on.

## macOS

[Download latest stable release](https://downloads.cloudflareclient.com/v1/download/macos/ga)

| **OS version**             | Sonoma 14.0+, Sequoia 15.1+ (15.0.x is not supported), Tahoe 26.0+ |
| -------------------------- | ------------------------------------------------------------------ |
| **Processor**              | Intel or M series                                                  |
| **HD space**               | 75 MB                                                              |
| **Memory**                 | 35 MB                                                              |
| **Network interface type** | Wi-Fi or LAN                                                       |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                     |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

Latest release

**Version:** macOS2026.6.880.0**Date:** 2026-07-21**Size:** 152 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.6.880.0)

#### Release notes

This hotfix resolves a regression that caused a large increase in DNS-over-TCP queries to fallback and internal DNS servers. The client now sends fallback DNS queries over UDP first, falling back to TCP only when a response is truncated, instead of querying both protocols in parallel.

Previous version history (11)

macOS 2026.6.822.0

**Version:** macOS2026.6.822.0**Date:** 2026-06-29**Size:** 152 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.6.822.0)

#### Release notes

This release introduces multiple features from our previous beta release into stable release, including:

* The client now applies DNS search suffixes configured in your [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles) / [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies). Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) for details.
* Upgraded security of device registration to be hardware-backed. Registration tokens can now be generated in the Secure Enclave whenever available to provide stronger protection against device impersonation. See [Hardware-backed registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/hardware-backed-registration/) for details.
* Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
* Added new warp-cli debug commands for interactive connection diagnosis. See [Extra debug logging](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging) for details.
* The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
* Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated [Cloudflare One MDM documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) for details.
* Added support for dashboard-managed client version deployments. Administrators can now upgrade or downgrade the client version on enrolled devices directly from the Zero Trust dashboard. See [Client version assignments](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/client-version-assignments/) for details.

**Additional Changes and improvements**

* Starting with 2026.6.822.0, the client unifies all API requests under the `api.devices.cloudflare.com` SNI, where previously both `zero-trust-client.cloudflareclient.com` and `notifications.cloudflareclient.com` were used. Review [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/) to ensure systems that rely on SNI inspection do not block the API traffic. The behavior of previous client versions is unaffected.
* Client Certificate device-posture checks now support template variables (e.g. `${serial_number}`, `${device_uuid}`) in the Subject Alternative Name field. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
* Improved accessibility by using high contrast colors and more defined color boundaries when high contrast is enabled in the macOS Display settings.
* Path MTU Discovery (PMTUD) is now enabled by default.
* Fixed the in-client captive-portal browser rendering a blank "Success" page on some airline Wi-Fi networks. The browser now more consistently loads the airline's real portal page so users can complete sign-in from inside the client instead of having to open a separate browser.
* Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.
* Fixed an issue where DNS queries would fail after the connection was idle, requiring users to retry.
* Users can now register with team names in any case format without errors.
* New UI fixes
  * Fixed an issue where users with invalid MDM configurations were returned to the onboarding screen after successful authentication.
  * Added a re-auth button and banner to the home screen so users don't miss it when their session expires.
  * Added clear error messaging when the Cloudflare certificate needs to be installed.
  * Brought back support for pausing the tunnel when connected to user-specified Wi-Fi networks for consumer users.
  * New client UI now surfaces Split tunnel configuration and Local Domain Fallback configuration.
  * Added ability to configure proxy mode for consumer users.
  * Added back the option to quit for consumer users.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* When deploying with Microsoft Intune, the client may be repeatedly reinstalled because Intune adds the client's embedded framework bundles to its install-detection list, and those frameworks cannot be detected as installed on their own. See [Repeated reinstalls on macOS with Microsoft Intune](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/known-limitations/#repeated-reinstalls-on-macos-with-microsoft-intune) for the workaround.

macOS 2026.4.1390.0

**Version:** macOS2026.4.1390.0**Date:** 2026-05-26**Size:** 133 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.4.1390.0)

#### Release notes

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

macOS 2026.4.1350.0

**Version:** macOS2026.4.1350.0**Date:** 2026-05-11**Size:** 133 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.4.1350.0)

#### Release notes

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

macOS 2026.3.846.0

**Version:** macOS2026.3.846.0**Date:** 2026-04-02**Size:** 113 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.3.846.0)

#### Release notes

This release contains minor fixes and improvements.

The next stable release for macOS will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.

macOS 2026.1.150.0

**Version:** macOS2026.1.150.0**Date:** 2026-02-24**Size:** 115 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.1.150.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue with DNS server configuration failures that caused tunnel connection delays.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed an issue causing DNS requests to fail with clients in Traffic and DNS mode.

macOS 2025.10.186.0

**Version:** macOS2025.10.186.0**Date:** 2026-01-13**Size:** 111 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.10.186.0)

#### Release notes

This release contains minor fixes, improvements, and new features, including the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect).

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.

macOS 2025.9.558.0

**Version:** macOS2025.9.558.0**Date:** 2025-11-11**Size:** 111 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.9.558.0)

#### Release notes

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.8.779.0

**Version:** macOS2025.8.779.0**Date:** 2025-10-07**Size:** 108 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.8.779.0)

#### Release notes

This release contains significant fixes and improvements.

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.7.176.0

**Version:** macOS2025.7.176.0**Date:** 2025-09-30**Size:** 109 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.7.176.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed a bug preventing the `warp-diag captive-portal` command from running successfully due to the client not parsing SSID on macOS.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvements to maintain client connectivity during network changes.
* The WARP client now supports macOS Tahoe (version 26.0).

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.6.1335.0

**Version:** macOS2025.6.1335.0**Date:** 2025-08-19**Size:** 108 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.6.1335.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.5.943.0

**Version:** macOS2025.5.943.0**Date:** 2025-07-23**Size:** 96.7 MB

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.5.943.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.
* For macOS deployments, the WARP client can now be managed using an `mdm.xml` file placed in `/Library/Application Support/Cloudflare/mdm.xml`. This new configuration option offers an alternative to the still supported method of deploying a managed plist through an MDM solution.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## Linux

[Package repository](https://pkg.cloudflareclient.com/)

| **OS version**             | RHEL 9 [1](#user-content-fn-1), RHEL 10, Debian 12, Debian 13, Fedora 43, Fedora 44, Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, Ubuntu 26.04 LTS |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                                                                                         |
| **HD space**               | 75 MB                                                                                                                                     |
| **Memory**                 | 35 MB                                                                                                                                     |
| **Network interface type** | Wi-Fi or LAN                                                                                                                              |
| **MTU**                    | 1381 bytes recommended [2](#user-content-fn-2)                                                                                            |

## Footnotes

1. On RHEL 9 and later, enable the [Extra Packages for Enterprise Linux (EPEL) ↗](https://docs.fedoraproject.org/en-US/epel/) repository (`sudo dnf install epel-release`) before installing `cloudflare-warp`. EPEL provides dependencies required by the client UI. [↩](#user-content-fnref-1)
2. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-2)

Latest release

**Version:** Linux2026.6.880.0**Date:** 2026-07-21**Size:** 74.4 MB

AlmaLinux / RHEL 10 (arm64)AlmaLinux / RHEL 10 (x86-64)AlmaLinux / RHEL 9 (arm64)AlmaLinux / RHEL 9 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 43 (arm64)Fedora 43 (x86-64)Fedora 44 (arm64)Fedora 44 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)Ubuntu 26.04 (arm64)Ubuntu 26.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/almalinux10-arm/version/2026.6.880.0)

#### Release notes

This hotfix resolves a regression that caused a large increase in DNS-over-TCP queries to fallback and internal DNS servers. The client now sends fallback DNS queries over UDP first, falling back to TCP only when a response is truncated, instead of querying both protocols in parallel.

Previous version history (12)

Linux 2026.6.836.0

**Version:** Linux2026.6.836.0**Date:** 2026-07-01**Size:** 74.4 MB

Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 43 (arm64)Fedora 43 (x86-64)Fedora 44 (arm64)Fedora 44 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)Ubuntu 26.04 (arm64)Ubuntu 26.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/bookworm-arm/version/2026.6.836.0)

#### Release notes

This package is the same release as 2026.6.822.0, with a fix for our RPM package. Previously the repository served a single build to every OS version, so an install could pull a dependency that isn't available on that release. The repository now serves the correct build for each operating system version, so installs automatically pull the dependencies that version requires. Debian and Ubuntu were not affected.

If you installed version 2026.6.822.0 on an RPM-based distribution, we recommend refreshing your repository configuration:

```bash
sudo curl -fsSL https://pkg.cloudflareclient.com/cloudflare-warp-ascii.repo | sudo tee /etc/yum.repos.d/cloudflare-warp.repo
sudo dnf clean all
sudo dnf install cloudflare-warp

```

Linux 2026.6.822.0

**Version:** Linux2026.6.822.0**Date:** 2026-06-29**Size:** 76 MB

Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 43 (arm64)Fedora 43 (x86-64)Fedora 44 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)Ubuntu 26.04 (arm64)Ubuntu 26.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/bookworm-arm/version/2026.6.822.0)

#### Release notes

This release introduces multiple features from our previous beta release into stable release, including:

* The client now applies DNS search suffixes configured in your [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles) / [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies). Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) for details.
* Upgraded security of device registration to be hardware-backed. Registration tokens can now be generated in the TPM (with TPM 2.0+) whenever it is available to provide stronger protection against device impersonation. See [Hardware-backed registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/hardware-backed-registration/) for details.
* Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
* Added new warp-cli debug commands for interactive connection diagnosis. See [Extra debug logging](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging) for details.
* The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
* Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated [Cloudflare One MDM documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) for details.

**Additional changes and improvements**

* Starting with 2026.6.822.0, the client unifies all API requests under the `api.devices.cloudflare.com` SNI, where previously both `zero-trust-client.cloudflareclient.com` and `notifications.cloudflareclient.com` were used. Review [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/) to ensure systems that rely on SNI inspection do not block the API traffic. The behavior of previous client versions is unaffected.
* [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) functionality using the Cloudflare One Client is now supported on RHEL 9 and 10.
* Cloudflare Mesh now supports [hostname-based routing](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#hostname-routes).
* Client Certificate device-posture checks now support template variables (e.g. `${serial_number}`, `${device_uuid}`) in the Subject Alternative Name field. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
* Improved accessibility by using high contrast colors and more defined color boundaries when high contrast is enabled in the system display settings.
* Path MTU Discovery (PMTUD) is now enabled by default.
* Fixed the in-client captive-portal browser rendering a blank "Success" page on some airline Wi-Fi networks. The browser now more consistently loads the airline's real portal page so users can complete sign-in from inside the client instead of having to open a separate browser.
* Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.
* Fixed an issue where DNS queries would fail after the connection was idle, requiring users to retry.
* Fixed an issue where some Debian releases experienced inaccurate version reporting for posture checks.
* Users can now register with team names in any case format without errors.
* New UI fixes
  * Fixed an issue where users with invalid MDM configurations were returned to the onboarding screen after successful authentication.
  * Added a re-auth button and banner to the home screen so users don't miss it when their session expires.
  * Added clear error messaging when the Cloudflare certificate needs to be installed.
  * Brought back support for pausing the tunnel when connected to user-specified Wi-Fi networks for consumer users.
  * New client UI now surfaces Split tunnel configuration and Local Domain Fallback configuration.
  * Added ability to configure proxy mode for consumer users.
  * Added back the option to quit for consumer users.

For RHEL deployments, this release introduces a dependency on the [Extra Packages for Enterprise Linux](https://docs.fedoraproject.org/en-US/epel/) repository (EPEL). The EPEL repository provides packages that support the captive portal detection’s in-app browser authentication and system tray icon. See [Getting started with EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/) for instructions on enabling EPEL.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.

Linux 2026.4.1390.0

**Version:** Linux2026.4.1390.0**Date:** 2026-05-26**Size:** 79.9 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.4.1390.0)

#### Release notes

This release introduces the new Cloudflare One Client UI for Linux! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Official support for RHEL 9 has been added for Cloudflare Mesh nodes. To install the RHEL 9 package, the Extra Packages for Enterprise Linux (EPEL) repository must be active, as it contains dependencies required for the tray icon and captive portal webview.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

Linux 2026.4.1350.0

**Version:** Linux2026.4.1350.0**Date:** 2026-05-11**Size:** 79.9 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.4.1350.0)

#### Release notes

This release introduces the new Cloudflare One Client UI for Linux! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Official support for RHEL 9 has been added for Cloudflare Mesh nodes. To install the RHEL 9 package, the Extra Packages for Enterprise Linux (EPEL) repository must be active, as it contains dependencies required for the tray icon and captive portal webview.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

Linux 2026.3.846.0

**Version:** Linux2026.3.846.0**Date:** 2026-04-02**Size:** 57.2 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.3.846.0)

#### Release notes

This release contains minor fixes and improvements.

The next stable release for Linux will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.

Linux 2026.1.150.0

**Version:** Linux2026.1.150.0**Date:** 2026-02-24**Size:** 55.1 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.1.150.0)

#### Release notes

This release contains minor fixes and improvements.

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com).

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed issues causing DNS requests to fail with clients in Traffic and DNS mode or DNS only mode.

Linux 2025.10.186.0

**Version:** Linux2025.10.186.0**Date:** 2026-01-13**Size:** 52 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.10.186.0)

#### Release notes

This release contains minor fixes, improvements, and new features, including the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect).

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com).

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* Linux [disk encryption posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/disk-encryption/) now supports non-filesystem encryption types like `dm-crypt`.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where the GUI becomes unresponsive when the **Re-Authenticate in browser** button is clicked.
* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.

Linux 2025.9.558.0

**Version:** Linux2025.9.558.0**Date:** 2025-11-11**Size:** 54.7 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.9.558.0)

#### Release notes

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).

Linux 2025.8.779.0

**Version:** Linux2025.8.779.0**Date:** 2025-10-07**Size:** 51.4 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.8.779.0)

#### Release notes

This release contains significant fixes and improvements including an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

Linux 2025.7.176.0

**Version:** Linux2025.7.176.0**Date:** 2025-09-30**Size:** 52.7 MB

CentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Debian 13 (arm64)Debian 13 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.7.176.0)

#### Release notes

This release contains minor fixes and improvements including an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* Improvements to maintain client connectivity during network changes.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

Linux 2025.6.1335.0

**Version:** Linux2025.6.1335.0**Date:** 2025-08-19**Size:** 50.6 MB

buster-armbuster-intelCentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/buster-arm/version/2025.6.1335.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

Linux 2025.5.943.0

**Version:** Linux2025.5.943.0**Date:** 2025-07-23**Size:** 44.3 MB

buster-armbuster-intelCentOS / RHEL 8 (arm64)CentOS / RHEL 8 (x86-64)Debian 11 (arm64)Debian 11 (x86-64)Debian 12 (arm64)Debian 12 (x86-64)Fedora 34 (arm64)Fedora 34 (x86-64)Fedora 35 (arm64)Fedora 35 (x86-64)Ubuntu 20.04 (arm64)Ubuntu 20.04 (x86-64)Ubuntu 22.04 (arm64)Ubuntu 22.04 (x86-64)Ubuntu 24.04 (arm64)Ubuntu 24.04 (x86-64)

[Download](https://downloads.cloudflareclient.com/v1/download/buster-arm/version/2025.5.943.0)

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## iOS

| **OS version** | iOS 11+ |
| -------------- | ------- |

[Download from the iOS App Store ↗](https://apps.apple.com/us/app/cloudflare-one-agent/id6443476492) or search for "Cloudflare One Agent".

Migrate from 1.1.1.1

The legacy iOS client, [1.1.1.1: Faster Internet ↗](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), has been replaced by the Cloudflare One Agent. Learn more in our [migration guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/cloudflare-one-agent-migration/).

## Android

| **OS version** | 5.0+ |
| -------------- | ---- |

[Download from the Google Play store ↗](https://play.google.com/store/apps/details?id=com.cloudflare.cloudflareoneagent) or search for "Cloudflare One Agent".

Migrate from 1.1.1.1

The legacy Android client, [1.1.1.1 + WARP: Safer Internet ↗](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone), has been replaced by the Cloudflare One Agent. Learn more in our [migration guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/cloudflare-one-agent-migration/).

## ChromeOS

| **OS version** | Chromebooks manufactured after 2019 |
| -------------- | ----------------------------------- |

Chromebooks are supported by our [Android app](#android). All Chromebooks made after 2019 should fully support our Android app. If you have a Chromebook made before 2019, [refer to this list ↗](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-android-apps/) to verify that your device is supported.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#page","headline":"Download Cloudflare One Client stable releases · Cloudflare One docs","description":"Reference information for Download Cloudflare One Client stable releases in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
