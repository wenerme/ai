---
description: "Release notes for Stash on macOS, listing new features, improvements and fixes in each version."
---

## 4.2.0

### New Features
- Improved the “Recent Requests” page with new Overview, Logs, and Request Headers sections
- Added a visual editor for configuration files
- Optimized activation and deactivation workflows
- Added visual editing for Overrides
- Added support for logging in by clicking a Tailscale node
- Support for creating connection rules from the Dashboard
- Improved Tun behavior when the network is unavailable
- Visual editor now supports editing Hysteria2 obfuscation modes
- Added local Override editing
- Added Tailscale support — documentation: https://stash.wiki/proxy-protocols/proxy-types#tailscale
- Added VLESS-TCP-REALITY support
- Added the Hysteria2 “salamander” obfuscation mode
- Providers can now set request headers
- DNS Nameserver Policy supports GEOSITE matching and concurrent access to multiple nameservers
- Added support for the TrustTunnel protocol
- PROCESS-NAME rules now support prefix matching when ending with “/”
- Added “gecko” support to Hysteria2 obfuscation modes
### Optimizations
- Improved the status bar
- Enhanced the Dashboard interface
- Improved the remote controller
- Optimized the “Recent Requests” page
- Added alerts when the status bar icon is hidden or blocked
- Icons now support macOS 26 visual effects
- Unified styles for several windows
- Reorganized and refined Settings page categories
- Improved network change detection
- Added Tailscale debug option
- Obfuscation modes in visual editor are now selectable options
- Removed gVisor tunnel stack
- Improved interactions in VLESS visual editing
- Optimized congestion control for the QUIC protocol
- Added visual editing support for TrustTunnel and Hysteria2 Gecko
- Tailscale visual editor no longer requires an auth-key
- Optimized iCloud read/write events
- Improved TrustTunnel descriptions
- Refined localization across all languages
- Enhanced StashTun DNS request handling
- Improved Darwin Tun compatibility
- Improved TUIC compatibility
- Reduced StashLink resource usage
- Stash DeviceID is now the default Tailscale hostname
- Improved CORS support for Private Network
- Optimized handling of idle HTTP proxy requests
- Improved Block QUIC processing
- Optimized speed test behavior and memory usage during network switching
### Fixes
- Fixed an issue where the status bar icon could appear blurry
- Fixed UI issues when showing GB/s in the status bar
- Improved the warning when the status bar icon is blocked by the notch
- Fixed display problems in Settings on macOS 12
- Improved outbound information display
- Added display of remote resource count
- Allowed quick clicking to copy the device ID
- Optimized the Helper installation process
- Improved handling of long process names
- Improved switching between built-in languages
- Fixed possible freezing issues caused by iCloud
- Fixed cases where the proxy page might not display correctly
- Enhanced subscription fetching
- Fixed an issue where profiles might revert to Default when iCloud is unavailable
- Fixed slow upload performance in StashTun
- Fixed possible crashes in StashLink
- Fixed UDP fragmentation issue in the Hysteria v1 protocol
- Fixed timing issue with VLESS UDP handshake
- Fixed uTLS issue preventing skip-cert-verify from being enabled
- Fixed IPv6 CNAME configurations that could return IPv4 records unexpectedly
- Fixed occasional hangs during StashLink speed tests
- Improved remote resource loading; fixed rare cases where download failures resulted in a 0 size
- Fixed Tailscale not working in Enhanced Mode
- Improved Shadowsocks 2022 compatibility
- Fixed possible Tailscale crashes during network switching
- Fixed crashes caused by invalid MRS resources
- Optimized reverse DNS (IP → Domain) strategy
- Tunnel traffic sniffing now activates earlier
- Improved policy group refresh latency
- Fixed incorrect send address issue in WireGuard
- Fixed incorrect send address issue in VLESS XUDP
- Fixed delayed memory cleanup in HTTP connectivity checks
- Fixed reconnection failure in certain WireGuard scenarios

> [!NOTE]
> Released on July 2, 2026

## 4.1.1

### Improvements
- Optimized the macOS 12 settings page
- Improved Shadowsocks 2022 compatibility
- Added support for VLESS-TCP-Reality
### Fixes
- Fixed a potential issue with the macOS 12 settings page
- Fixed an issue where StashLink speed tests might get stuck

> [!NOTE]
> Released on April 1, 2026

## 4.1.0

🎉 Stash for macOS 4.0 is officially released. Happy New Year 2026!
• New Features
- Added dialer-proxy, which can be used in proxy configuration to specify an upstream proxy and supports TCP and UDP relay
- Added AnyTLS support
- Providers now support specifying a path, initializing files through payload, and syncing through iCloud
• Improvements
- Refactored the HTTP engine to improve performance when handling multiple Rewrite scenarios
• Fixes
- Fixed a small number of multilingual description issues

> [!NOTE]
> Released on February 21, 2026

## 4.0.0

🎉 Stash for macOS 4.0 is officially released. Happy New Year 2026!
- Fixed an issue where background scans by cleanup utilities could cause Stash to require reactivation

> [!NOTE]
> Released on January 12, 2026

## 4.0.0

🎉 Stash for macOS 4.0 is officially released. Happy New Year 2026!
We are stepping into 2026 together with the brand-new Stash for macOS 4.0.
The Stash team sends our sincere New Year wishes to every user: may the new year bring you success and everything you hope for.
Stash for macOS 4.0 brings a fully redesigned interface. The new UI makes the information structure clearer, interactions more intuitive, and the visual design more modern.
Thank you for your continued support and trust in Stash.
Let us keep moving forward together in 2026,
and start a new chapter with the new Stash.
Once again, we wish you:
Happy New Year 2026! 🥂
- The Stash Team

> [!NOTE]
> Released on January 2, 2026

## 4.0.0

🎉 Stash for macOS 4.0 is officially released. Happy New Year 2026!
We are stepping into 2026 together with the brand-new Stash for macOS 4.0.
The Stash team sends our sincere New Year wishes to every user: may the new year bring you success and everything you hope for.
Stash for macOS 4.0 brings a fully redesigned interface. The new UI makes the information structure clearer, interactions more intuitive, and the visual design more modern.
Thank you for your continued support and trust in Stash.
Let us keep moving forward together in 2026,
and start a new chapter with the new Stash.
Once again, we wish you:
Happy New Year 2026! 🥂
- The Stash Team

> [!NOTE]
> Released on December 31, 2025

## 4.0.0

🎉 Stash for macOS 4.0 is officially released. Happy New Year 2026!
We are stepping into 2026 together with the brand-new Stash for macOS 4.0.
The Stash team sends our sincere New Year wishes to every user: may the new year bring you success and everything you hope for.
Stash for macOS 4.0 brings a fully redesigned interface. The new UI makes the information structure clearer, interactions more intuitive, and the visual design more modern.
Thank you for your continued support and trust in Stash.
Let us keep moving forward together in 2026,
and start a new chapter with the new Stash.
Once again, we wish you:
Happy New Year 2026! 🥂
- The Stash Team

> [!NOTE]
> Released on December 31, 2025

## 3.2.0

• Fixes
- Fixed an issue where Stash repeatedly prompted for activation or Helper installation after users cleaned the app with tools such as Tencent Lemon Cleaner or CleanMyMac

> [!NOTE]
> Released on October 30, 2025

## 3.1.0

• New
- When the virtual interface mode is set to Apple, Stash now returns correct ping information in Enhanced Mode and FakeIP, making it easier for developers to use
- Added support for VLESS XTLS-Vision
- Added support for VLESS XTLS-REALITY
- Remote rule sets now support MRS-format rules
- Shadowsocks / Shadowsocks2022 now support configuring udp-port
- Shadowsocks / Shadowsocks2022 now support configuring udp-over-tcp v1 / v2
- Added support for VLESS XUDP
- Added the benchmark-disabled option for single-proxy latency tests. When set to true, latency testing is completely disabled
• Improvements
- Improved inaccurate IP information on the home page
- Improved script console.log, which now supports printing objects, null, and undefined
- Optimized memory usage when rewriting large requests with scripts
- Refactored remote rule sets to improve performance and reduce memory usage
- Improved GEOSITE performance
- Improved latency-test logic for Proxy Groups that contain REJECT-DROP and REJECT proxies
- Improved Stash core stability
• Fixes
- Fixed an issue where UDP could unexpectedly send Fake IPs
- Fixed unnecessary DNS resolution in some cases
- Fixed incorrect formatting for some remote rule sets containing regular expressions
- Fixed VMess UDP issues in some situations
- Fixed some script failures when sending requests with $httpClient
- Fixed incorrect PID display for UDP requests in Dashboard
- Fixed some request rewriting issues when using scripts
- Fixed some crashes

> [!NOTE]
> Released on May 27, 2025

## 3.1.0

• New
- When the virtual interface mode is set to Apple, Stash now returns correct ping information in Enhanced Mode and FakeIP, making it easier for developers to use
- Added support for VLESS XTLS-Vision
- Added support for VLESS XTLS-REALITY
- Remote rule sets now support MRS-format rules
- Shadowsocks / Shadowsocks2022 now support configuring udp-port
- Shadowsocks / Shadowsocks2022 now support configuring udp-over-tcp v1 / v2
- Added support for VLESS XUDP
- Added the benchmark-disabled option for single-proxy latency tests. When set to true, latency testing is completely disabled
• Improvements
- Improved inaccurate IP information on the home page
- Improved script console.log, which now supports printing objects, null, and undefined
- Optimized memory usage when rewriting large requests with scripts
- Refactored remote rule sets to improve performance and reduce memory usage
- Improved GEOSITE performance
- Improved latency-test logic for Proxy Groups that contain REJECT-DROP and REJECT proxies
- Improved Stash core stability
• Fixes
- Fixed an issue where UDP could unexpectedly send Fake IPs
- Fixed unnecessary DNS resolution in some cases
- Fixed incorrect formatting for some remote rule sets containing regular expressions
- Fixed VMess UDP issues in some situations
- Fixed some script failures when sending requests with $httpClient
- Fixed incorrect PID display for UDP requests in Dashboard
- Fixed some request rewriting issues when using scripts
- Fixed some crashes

> [!NOTE]
> Released on May 26, 2025

## 3.0.2

- Fixed an issue where UDP could unexpectedly send Fake IPs
- Fixed HTTP engine compatibility issues with some servers
- Fixed an issue where Reject could incorrectly initiate DNS requests
- Updated social media account information:
X (Twitter): @StashAppDev / https://x.com/StashAppDev
Discussion group: @StashFans / https://t.me/StashFans
Channel: @StashFeed / https://t.me/StashFeed

> [!NOTE]
> Released on April 29, 2025

## 3.0.2

- Fixed an issue where UDP could unexpectedly send Fake IPs
- Fixed HTTP engine compatibility issues with some servers
- Fixed an issue where Reject could incorrectly initiate DNS requests
- Updated social media account information:
X (Twitter): @StashAppDev / https://x.com/StashAppDev
Discussion group: @StashFans / https://t.me/StashFans
Channel: @StashFeed / https://t.me/StashFeed

> [!NOTE]
> Released on April 17, 2025

## 3.0.0

• New
- Added support for the ShadowSocks2022 protocol
- Added support for ShadowTLS
- Added support for AND, OR, NOT logical rules
- Added DOMAIN-WILDCARD rule
- Added DOMAIN-REGEX rule
- Added NETWORK rule with selectable values: tcp, udp
- Added PROTOCOL rule with selectable values: TCP, HTTP, HTTPS, UDP, QUIC
- Added URL-REGEX rule
- Added USER-AGENT rule
- Added support for policy group icons
- Added body-rewrite support, including:
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- Added support for sniffing TLS Client Hello to obtain SNI domain names
- When initiating a UDP connection, Stash now attempts to use the target proxy to perform DNS queries and determine the destination IP
- Added support for sniffing QUIC / HTTP3
- The Connections page now displays more detailed TCP / UDP protocol information
- DoH and DoH3 now support UserAgent configuration
- Added BGP.Tools as an IP information provider
- Rewrite now supports reading zstd-compressed content
• Improvements
- Improved QUIC sniffing
- Improved the Dashboard UI
- Improved Dashboard interactions: when a connection is selected, the current connection is pinned
- Improved performance when resolving process information from Source Address with many connections
- Optimized memory usage under high UDP concurrency
- Optimized memory pool allocation strategy
- Optimized ECH implementation
• Fixes
- Fixed potential Dashboard performance issues with many connections, such as BT traffic
- Fixed an issue where Dashboard logs could not scroll
- Fixed an issue where Dashboard information could not be copied
- Fixed a potential sniffing failure in Chrome

> [!NOTE]
> Released on April 2, 2025

## 3.0.0

• New
- Added support for the ShadowSocks2022 protocol
- Added support for ShadowTLS
- Added support for AND, OR, NOT logical rules
- Added DOMAIN-WILDCARD rule
- Added DOMAIN-REGEX rule
- Added NETWORK rule with selectable values: tcp, udp
- Added PROTOCOL rule with selectable values: TCP, HTTP, HTTPS, UDP, QUIC
- Added URL-REGEX rule
- Added USER-AGENT rule
- Added support for policy group icons
- Added body-rewrite support, including:
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- Added support for sniffing TLS Client Hello to obtain SNI domain names
- When initiating a UDP connection, Stash now attempts to use the target proxy to perform DNS queries and determine the destination IP
- Added support for sniffing QUIC / HTTP3
- The Connections page now displays more detailed TCP / UDP protocol information
- DoH and DoH3 now support UserAgent configuration
- Added BGP.Tools as an IP information provider
- Rewrite now supports reading zstd-compressed content
• Improvements
- Improved QUIC sniffing
- Improved the Dashboard UI
- Improved Dashboard interactions: when a connection is selected, the current connection is pinned
- Improved performance when resolving process information from Source Address with many connections
- Optimized memory usage under high UDP concurrency
- Optimized memory pool allocation strategy
- Optimized ECH implementation
• Fixes
- Fixed potential Dashboard performance issues with many connections, such as BT traffic
- Fixed an issue where Dashboard logs could not scroll
- Fixed an issue where Dashboard information could not be copied
- Fixed a potential sniffing failure in Chrome

> [!NOTE]
> Released on April 2, 2025

## 3.0.0

• New
- Added support for the ShadowSocks2022 protocol
- Added support for ShadowTLS
- Added support for AND, OR, NOT logical rules
- Added DOMAIN-WILDCARD rule
- Added DOMAIN-REGEX rule
- Added NETWORK rule with selectable values: tcp, udp
- Added PROTOCOL rule with selectable values: TCP, HTTP, HTTPS, UDP, QUIC
- Added URL-REGEX rule
- Added USER-AGENT rule
- Added support for policy group icons
- Added body-rewrite support, including:
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- Added support for sniffing TLS Client Hello to obtain SNI domain names
- When initiating a UDP connection, Stash now attempts to use the target proxy to perform DNS queries and determine the destination IP
- Added support for sniffing QUIC / HTTP3
- The Connections page now displays more detailed TCP / UDP protocol information
- DoH and DoH3 now support UserAgent configuration
- Added BGP.Tools as an IP information provider
- Rewrite now supports reading zstd-compressed content
• Improvements
- Improved QUIC sniffing
- Improved the Dashboard UI
- Improved Dashboard interactions: when a connection is selected, the current connection is pinned
- Improved performance when resolving process information from Source Address with many connections
- Optimized memory usage under high UDP concurrency
- Optimized memory pool allocation strategy
- Optimized ECH implementation
• Fixes
- Fixed potential Dashboard performance issues with many connections, such as BT traffic
- Fixed an issue where Dashboard logs could not scroll
- Fixed an issue where Dashboard information could not be copied
- Fixed a potential sniffing failure in Chrome

> [!NOTE]
> Released on April 2, 2025

## 3.0.0

• New
- Added support for the ShadowSocks2022 protocol
- Added support for ShadowTLS
- Added support for AND, OR, NOT logical rules
- Added DOMAIN-WILDCARD rule
- Added DOMAIN-REGEX rule
- Added NETWORK rule with selectable values: tcp, udp
- Added PROTOCOL rule with selectable values: TCP, HTTP, HTTPS, UDP, QUIC
- Added URL-REGEX rule
- Added USER-AGENT rule
- Added support for policy group icons
- Added body-rewrite support, including:
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- Added support for sniffing TLS Client Hello to obtain SNI domain names
- When initiating a UDP connection, Stash now attempts to use the target proxy to perform DNS queries and determine the destination IP
- Added support for sniffing QUIC / HTTP3
- The Connections page now displays more detailed TCP / UDP protocol information
- DoH and DoH3 now support UserAgent configuration
- Added BGP.Tools as an IP information provider
- Rewrite now supports reading zstd-compressed content
• Improvements
- Improved QUIC sniffing
- Improved the Dashboard UI
- Improved Dashboard interactions: when a connection is selected, the current connection is pinned
- Improved performance when resolving process information from Source Address with many connections
- Optimized memory usage under high UDP concurrency
- Optimized memory pool allocation strategy
- Optimized ECH implementation
• Fixes
- Fixed potential Dashboard performance issues with many connections, such as BT traffic
- Fixed an issue where Dashboard logs could not scroll
- Fixed an issue where Dashboard information could not be copied
- Fixed a potential sniffing failure in Chrome

> [!NOTE]
> Released on April 2, 2025

## 2.7.1

Happy New Year!
- Fixed an issue where some service provider configurations could cause crashes

> [!NOTE]
> Released on January 1, 2025

## 2.7.0

New:
- Added REJECT-DROP policy
- Added support for updating the GEOIP database while Stash is running
- Added ip.im as an IP information provider
Improvements:
- When updating remote resources, Stash now uses ETag for cache negotiation. If the resource has not changed, Stash will not download it again, saving bandwidth for both users and rule-set providers.
- When server-cert-fingerprint is set, skip-cert-verify no longer needs to be set to true
- Optimized system DNS
Fixes:
- Fixed an issue where configuration file names could be abnormal in some cases

> [!NOTE]
> Released on October 22, 2024

## 2.6.6

- Improved sniffing
When connecting to a domain, Stash initiates TCP handshakes to all resolved addresses at the same time and uses the fastest successful connection. When a domain is sniffed, Stash triggers a DNS lookup for this feature. If the domain has no public DNS records, connection errors may occur. This version improves compatibility with unresolved domains.
- Optimized QUIC
- Improved HTTP engine compatibility with Host values that include ports
- Happy Eyeballs Dual Stack has moved from experimental to stable. When enabled, it improves IPv4/IPv6 dual-stack compatibility
- Added support for setting benchmark-url and benchmark-timeout in Proxy-Providers

> [!NOTE]
> Released on September 12, 2024

## 2.6.6

- Improved sniffing
When connecting to a domain, Stash initiates TCP handshakes to all resolved addresses at the same time and uses the fastest successful connection. When a domain is sniffed, Stash triggers a DNS lookup for this feature. If the domain has no public DNS records, connection errors may occur. This version improves compatibility with unresolved domains.
- Optimized QUIC
- Improved HTTP engine compatibility with Host values that include ports
- Happy Eyeballs Dual Stack has moved from experimental to stable. When enabled, it improves IPv4/IPv6 dual-stack compatibility
- Added support for setting benchmark-url and benchmark-timeout in Proxy-Providers

> [!NOTE]
> Released on September 11, 2024

## 2.6.4

• New
- Added support for Hysteria 2 port hopping
- Added SSH protocol support
- Added Juicity protocol support
- Shortcuts now support match_geosite syntax
• Improvements
- Optimized QUIC protocol 0-RTT
- Improved script Header compatibility
- Reduced app size
- Optimized CA certificate logic. Newly issued certificates are now valid for 10 years
• Fixes
- Fixed UI misalignment in some situations
- Fixed excessive cache file disk usage in some cases

> [!NOTE]
> Released on August 4, 2024

## 2.6.3

- Improved WireGuard connection stability
- Improved Hysteria2 0-RTT compatibility on some networks
- Optimized runtime MitM certificate generation to reduce repeated computation, improve performance, and save power
- Improved WireGuard with underlying-proxy so it can automatically recover from connection errors
- Fixed scripts not running on some systems

> [!NOTE]
> Released on June 23, 2024

## 2.6.3

- Improved WireGuard connection stability
- Improved Hysteria2 0-RTT compatibility on some networks
- Optimized runtime MitM certificate generation to reduce repeated computation, improve performance, and save power
- Improved WireGuard with underlying-proxy so it can automatically recover from connection errors
- Fixed scripts not running on some systems

> [!NOTE]
> Released on June 18, 2024

## 2.6.2

• Fixes
- Fixed an issue where $persistentStore might not save correctly in some cases

> [!NOTE]
> Released on May 29, 2024

## 2.6.1

• New
- Stash has optimized sniffing and now supports more overrides in “Tunnel Proxy Only”
- Stash now supports sniffing possible HTTP requests in TCP connections, including Method, Host, and URL
- Added support for DNS over HTTP/3
- Added Server Certificate Fingerprint Pinning for proxy servers. When enabled, Stash verifies the server certificate SHA256 fingerprint during TLS handshake
- Added Script Hub to Tools
• Improvements
- Optimized QUIC-based performance
- Optimized memory usage
• Fixes
- Fixed a recently introduced delayed script memory release issue
- Fixed incorrect exception handling in script httpclient
- Fixed an issue where script $persistentStore.write could not save null or undefined values
- Fixed script timeout exceptions
- Fixed some script execution failures

> [!NOTE]
> Released on May 22, 2024

## 2.6.0

• New
- Added support for sorting proxies by latency
- Replaced the JavaScript engine. The new engine supports WebAPI
- Added support for DNS queries to follow rules
- Added support for classical text rule sets
- Added support for one-click override installation
- Added override categories
- Added support for drag-and-drop override sorting
- Script $environment now supports device-model
- Script $httpClient now supports timeout, insecure, auto-cookie, and auto-redirect parameters
• Improvements
- Improved UDP compatibility
- Optimized Script memory
- Improved override preview
- Improved script $httpclient compatibility and fixed communication issues with some servers
• Fixes
- Fixed SSID rules not working on macOS 14
- Fixed DNS over QUIC response timeouts
- Corrected script $argument behavior: when argument is not set, $argument is undefined
- Corrected inaccurate matching for some very large rules
- Fixed possible disconnection caused by doq
- Fixed an issue where network connections from inside Stash could not be identified correctly

> [!NOTE]
> Released on April 3, 2024

## 2.5.6

- Fixed abnormal concurrent script behavior in some cases
- Optimized script memory usage
- Script setTimeout() now supports passing arguments:
setTimeout(function, delay, param1, param2, /* …, */ paramN)

> [!NOTE]
> Released on December 15, 2023

## 2.5.4

- Fixed some potential crashes
- Fixed scripts not running in some cases

> [!NOTE]
> Released on December 4, 2023

## 2.5.3

- Fixed a crash that could occur with UDP in some cases
- Fixed scheduled task scripts possibly not taking effect

> [!NOTE]
> Released on November 18, 2023

## 2.5.2

- Fixed GEOSITE-related issues
- Stash can now automatically block QUIC traffic in the MitM list and make it fall back to HTTP/1/2
- Fixed delayed home-page information updates
- Fixed a possible route-table crash in IPv6 environments
- Experimentally introduced Happy Eyeballs Dual Stack
When this feature is enabled, IPv6 and IPv4 are treated equally. In concurrent mode, for example, Stash attempts TCP handshakes to all A and AAAA records for a domain simultaneously and uses the fastest successful connection.

> [!NOTE]
> Released on November 9, 2023

## 2.4.2

- Optimized JavaScript Core
- Improved the macOS Sonoma menu

> [!NOTE]
> Released on September 27, 2023

## 2.4.0

- Added visual rule editing
- Added support for macOS Sonoma
- Added IPv6 Tun support
- Improved iCloud Drive
- Improved connecting to remote devices from Dashboard

> [!NOTE]
> Released on September 17, 2023

## 2.4.0

- Added visual rule editing
- Improved iCloud Drive
- Added IPv6 Tun support
- Added support for macOS Sonoma

> [!NOTE]
> Released on September 15, 2023

## 2.2.4

- Fixed a macOS Sonoma menu crash

> [!NOTE]
> Released on June 30, 2023

## 2.2.4

- Fixed a possible override preview crash in Simplified Chinese

> [!NOTE]
> Released on June 27, 2023

## 2.2.4

- Improved speed tests and health checks
- Clicking the Stash icon in Launchpad again now shows the control panel
- Configuration file changes now support live reload
- Improved iCloud file storage
- Overall application performance improvements
- Fixed an issue where Skip Proxy could not be saved in some cases
- Fixed auto speed tests failing in some cases
- Fixed remote resources failing to update automatically in some cases
- Bug fixes and improvements

> [!NOTE]
> Released on May 25, 2023

## 2.2.3

· Fixes
- Clicking the Stash icon in Launchpad again now shows the control panel
- Improved speed tests and health checks
- Fixed an issue where Skip Proxy could not be saved in some cases

> [!NOTE]
> Released on May 18, 2023

## 2.2.3

· Fixes
- Clicking the Stash icon in Launchpad again now shows the control panel
- Improved speed tests and health checks

> [!NOTE]
> Released on May 17, 2023

## 2.2.1

· Features
- Added the GEOSITE rule type.
- Script $httpClient now supports binary mode.
- $httpClient now supports specifying the outbound proxy policy through HTTP headers.
- Added Stash Remote Controller, allowing Stash on other devices to be controlled from Stash iOS / Stash Mac Dashboard. Saved remote devices are synced through iCloud.
- Added TLS Session Resumption to improve TLS handshake efficiency. This feature requires server-side support and can be checked on the Connections page.
- Added the no-track parameter. Connections matched by this rule will be hidden from the connection list.
· Improvements
- Optimized memory usage in scenarios with many nameserver-policy entries.
- Improved HTTP / TLS sniffing.
- Improved relay proxy group stability.
- Optimized DNS cache refresh strategy during network switches.
- Improved the Override installation experience.
· Fixes
- Fixed emoji escaping during override merging.
- Fixed a series of compatibility issues when downloading configurations.

> [!NOTE]
> Released on April 26, 2023

## 2.2.0

· Features
- Added the GEOSITE rule type.
- Script $httpClient now supports binary mode.
- $httpClient now supports specifying the outbound proxy policy through HTTP headers.
- Added Stash Remote Controller, allowing Stash on other devices to be controlled from Stash iOS / Stash Mac Dashboard. Saved remote devices are synced through iCloud.
- Added TLS Session Resumption to improve TLS handshake efficiency. This feature requires server-side support and can be checked on the Connections page.
- Added the no-track parameter. Connections matched by this rule will be hidden from the connection list.
· Improvements
- Optimized memory usage in scenarios with many nameserver-policy entries.
- Improved HTTP / TLS sniffing.
- Improved relay proxy group stability.
- Optimized DNS cache refresh strategy during network switches.
- Improved the Override installation experience.
· Fixes
- Fixed emoji escaping during override merging.
- Fixed a series of compatibility issues when downloading configurations.

> [!NOTE]
> Released on April 26, 2023

## 2.1.2

- Improved an issue where the main window closed automatically when opening the active connections window
- Improved active connections window performance

> [!NOTE]
> Released on March 18, 2023

## 2.1.2

- Added setup wizard
- Improved Dashboard
- Added Apple and Google Stack for Tun (Settings - Network Settings)
- The menu now shows active clients
- Improved the JavaScript engine
- The menu now shows active clients
- Added a workaround for TUIC protocol disconnections
- Improved compatibility when used together with other VPNs
- Fixed certificates not being trusted in some browsers
- Bug fixes and improvements

> [!NOTE]
> Released on March 16, 2023

## 2.1.2

- Added setup wizard
- Improved Dashboard
- Added Apple and Google Stack for Tun (Settings - Network Settings)
- The menu now shows active clients
- Improved the JavaScript engine
- The menu now shows active clients
- Added a workaround for TUIC protocol disconnections
- Improved compatibility when used together with other VPNs
- Bug fixes and improvements

> [!NOTE]
> Released on March 6, 2023

## 2.1.0

- Corrected behavior for some requests in the Stash HTTP engine
- Dashboard now shows timers
- Dashboard now shows device names in gateway mode
- Dashboard now shows device IPs in gateway mode
- Dashboard now supports searching by name
- Improved script header compatibility
- Added script environment variable $environment.system

> [!NOTE]
> Released on January 5, 2023

## 2.0.13

- Improved speed tests
- Fixed an issue where some button states were out of sync

> [!NOTE]
> Released on December 28, 2022

## 2.0.12

- Minor fixes and updates
- Added Proxy Group Benchmark to Control Center
- Added real-time network speed to Control Center
- Fixed Dashboard DNS filtering not working

> [!NOTE]
> Released on December 26, 2022

## 2.0.11

- Improved binary script support
- Scripts now support concurrent execution
- Adjusted parts of the QUIC protocol implementation
- Added support for using WireGuard as a Layer 4 proxy
- Added support for specifying the outbound network interface https://stash.wiki/proxy-protocols/proxy-types#direct-with-specified-interface
- Users can now disable proxy group connectivity checks by setting interval=-1
- Added support for specifying ports
- Improved menu bar icon display
- Improved menu speed-test results
- Optimized Hysteria memory usage. Please report if you encounter issues again
- Fixed configuration reload not taking effect in some cases
- Fixed garbled text for some processes
- Fixed some scripts not running
- Fixed Enhanced Mode being unavailable in some cases
- Fixed DNS not recovering in some situations
Script documentation:
https://stash.wiki/http-engine/script#配置格式
WireGuard documentation:
https://stash.wiki/proxy-protocols/proxy-types#wireguard
Note: WireGuard is not designed as a high-throughput proxy protocol. Stash needs to convert between Layer 3 and Layer 4 in user space, so the performance overhead is higher than common proxy protocols. On mobile devices, WireGuard throughput is generally lower than Layer 4 proxy protocols.

> [!NOTE]
> Released on December 21, 2022

## 2.0.11

- Improved binary script support
- Scripts now support concurrent execution
- Adjusted parts of the QUIC protocol implementation
- Added support for using WireGuard as a Layer 4 proxy
- Added support for specifying the outbound network interface https://stash.wiki/proxy-protocols/proxy-types#direct-with-specified-interface
- Users can now disable proxy group connectivity checks by setting interval=-1
- Added support for specifying ports
- Improved menu bar icon display
- Improved menu speed-test results
- Optimized Hysteria memory usage. Please report if you encounter issues again
- Fixed configuration reload not taking effect in some cases
- Fixed garbled text for some processes
- Fixed some scripts not running
- Fixed Enhanced Mode being unavailable in some cases
- Fixed DNS not recovering in some situations
Script documentation:
https://stash.wiki/http-engine/script#配置格式
WireGuard documentation:
https://stash.wiki/proxy-protocols/proxy-types#wireguard
Note: WireGuard is not designed as a high-throughput proxy protocol. Stash needs to convert between Layer 3 and Layer 4 in user space, so the performance overhead is higher than common proxy protocols. On mobile devices, WireGuard throughput is generally lower than Layer 4 proxy protocols.

> [!NOTE]
> Released on December 21, 2022

## 2.0.9

• Added binary script support
• Scripts now support concurrent mode
• Notifications now support stacking
• Improved menu speed-test results

> [!NOTE]
> Released on November 30, 2022

## 2.0.8

• Improved Dashboard data
• Improved translations

> [!NOTE]
> Released on November 24, 2022

## 2.0.7

• Fixed a potential crash

> [!NOTE]
> Released on November 19, 2022

## 2.0.6

• Fixed some memory leaks
• Fixed menu stuttering in some cases
• Fixed resource unavailable prompts in some cases
• Fixed SS V2RAY plugin format issues

> [!NOTE]
> Released on November 19, 2022

## 2.0.5

• Fixed some memory leaks

> [!NOTE]
> Released on November 17, 2022

## 2.0.5

• Improved performance
• Fixed a crash on the Overrides page
• Fixed a crash on the Remote Resources page
• Fixed remote resources failing to update

> [!NOTE]
> Released on November 15, 2022

## 2.0.4

• Improved speed tests
• Added support for installing certificates directly in Stash
• Fixed outbound mode UI issues in 2.0.2
• Fixed update-related crashes
• Other improvements and bug fixes

> [!NOTE]
> Released on November 14, 2022

## 2.0.3

• Improved speed tests
• Added support for installing certificates directly in Stash
• Fixed outbound mode UI issues in 2.0.2
• Other improvements and bug fixes

> [!NOTE]
> Released on November 14, 2022

## 2.0.2

• Added support for installing certificates directly in Stash
• Improved speed tests
• Other improvements and bug fixes

> [!NOTE]
> Released on November 14, 2022

## 2.0.1

• Added Skip Proxy settings
• Added support for modifying the TLS Client Hello fingerprint. See https://stash.wiki/features/tls-fingerprint
• Fixed translations not working on macOS 13
• Fixed a conflict between Hysteria and Enhanced Mode on macOS
• Fixed process names not being available in some cases
• Fixed missing destination IPs in some cases
• Reimplemented low-level QUIC code. Please report any issues you encounter

> [!NOTE]
> Released on November 10, 2022

## 2.0.0

> [!NOTE]
> Released on November 6, 2022

## 1.2.4

• Added “Install Override from URL”
• Fixed night mode UI layout issues
• Fixed configuration file changes not taking effect in some cases
• Rule editing through the UI is temporarily unavailable

> [!NOTE]
> Released on September 16, 2022

## 1.2.3

• Added launch at startup option
• Fixed Proxy Provider display issue
• Fixed Script failing to save Storage
• Fixed startup freezing in some cases
• Installing Overrides through “Download from URL” is temporarily unavailable
• Rule editing through the UI is temporarily unavailable

> [!NOTE]
> Released on September 15, 2022

## 1.2.2

• Fixed crashes after startup in some cases
• Fixed inability to switch proxies in global mode

> [!NOTE]
> Released on September 14, 2022

## 1.2.1

> [!NOTE]
> Released on September 13, 2022

## 1.2.0

> [!NOTE]
> Released on September 12, 2022

## 1.0

> [!NOTE]
> Released on September 9, 2022
