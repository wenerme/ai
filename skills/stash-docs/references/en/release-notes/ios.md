---
description: "Release notes for Stash on iOS, listing new features, improvements and fixes in each version."
---

## 3.4.0

### New Features
- Added icon search
- Added long-press option on Tailscale nodes to select Exit Node
- Fully re-engineered StashTun — reaches up to 9Gbps on iPhone 17 Pro, about 6× faster than before
- Added Tailscale Web login authentication
- Added visual editor for local overrides
- Optimized Tun performance when the network is unavailable
- Visual editor now supports editing Hysteria2 obfuscation modes
- Added local override editing
- Added Tailscale support — documentation: https://stash.wiki/proxy-protocols/proxy-types#tailscale
- Added support for VLESS-TCP-REALITY
- Added Hysteria2 salamander obfuscation mode
- Providers can now set custom request headers
- DNS Nameserver Policy supports GEOSITE matching and concurrent access to multiple Nameservers
- Added support for the TrustTunnel protocol
- Added gecko obfuscation support for Hysteria2

### Improvements
- Added an action button at the top right of the Override page
- Improved the override operation flow
- Visual editor now supports Tailscale type
- Improved status display for quick component toggles
- Improved the display of the TLS protocol visual editor
- Reorganized and refined the Settings page categories
- Improved network change detection
- Improved TUIC visual editing
- Obfuscation modes in visual editing are now selectable options
- Removed gVisor tunnel stack
- Enhanced VLESS visual editing interactions
- Optimized congestion control for the QUIC protocol
- Added visual editing support for TrustTunnel and Hysteria2 Gecko
- Tailscale visual editing no longer requires an auth-key
- Improved iCloud read/write events
- Improved TrustTunnel descriptions
- Comprehensive localization improvements
- Visual editor now supports AnyTLS
- Enhanced Darwin Tun compatibility
- Improved TUIC compatibility
- Optimized StashLink resource usage
- Stash DeviceID is now used as the default Tailscale hostname
- Improved CORS support for Private Network
- Optimized idle HTTP proxy requests
- Improved Block QUIC handling
- Refined speed test strategy and memory usage during network switching

### Fixes
- Fixed an issue where the Start button could be hidden on iPadOS in certain cases
- Improved reliability when switching overrides not taking effect
- Fixed abnormal button styles on iOS 27
- Fixed possible freeze issues caused by iCloud in some situations
- Fixed proxy page display errors in certain cases
- Optimized subscription fetching
- Fixed an issue where configuration might revert to Default when iCloud is unavailable
- Fixed UDP fragmentation for the Hysteria v1 protocol
- Fixed timing issues in VLESS UDP handshake
- Fixed an issue where uTLS could not enable skip-cert-verify
- Fixed an IPv6 CNAME configuration issue that could incorrectly return IPv4 records
- Fixed a possible StashLink speed test freeze issue
- Improved remote resource loading and fixed cases where failed downloads returned 0
- Improved Shadowsocks 2022 compatibility
- Fixed a crash issue where Tailscale could fail during network switching
- Fixed crash issues caused by invalid MRS resources
- Improved IP → domain reverse lookup strategy
- Tunnel traffic sniffing now activates earlier
- Improved latency after policy group refresh
- Fixed incorrect destination address when sending via WireGuard
- Fixed incorrect destination address for VLESS XUDP
- Fixed memory recycling delay in HTTP connectivity checks
- Fixed reconnection issues for the WireGuard protocol under certain conditions

> [!NOTE]
> Released on June 23, 2026

## 3.3.3

### New Features
- Added support for VLESS-TCP-REALITY

### Improvements
- Improved compatibility with Shadowsocks 2022

### Fixes
- Fixed an issue where the Start button might disappear when using large fonts on iPadOS
- Fixed an issue where StashLink speed tests might get stuck

> [!NOTE]
> Released on March 31, 2026

## 3.3.2

### Fixes
- Fixed an issue where the start button might not appear when using large text on iPadOS
- Fixed an issue where the visual editor AnyTLS might fail to save
- Optimized TUIC compatibility

> [!NOTE]
> Released on March 12, 2026

## 3.3.1

### Fixes
- Fixed an issue where the left-side interface on iPad could appear too small in some cases
- Fixed an issue where settings or tools could not be tapped in windowing mode on iPadOS 26

> [!NOTE]
> Released on February 26, 2026

## 3.3.0

### New Features
- Added dialer-proxy, allowing upstream proxies to be specified in proxy configurations, with support for TCP and UDP relay.
- Added support for AnyTLS.
- Added a Script Persistent Data management page.
- Added GeoSite Browser, allowing GEOSITE rules to be selected directly via a browser when adding GEOSITE-type rules, without manual input.
- Providers now support custom paths, initialization via payload files, and synchronization through iCloud.
- iPerf network bandwidth testing now supports chart visualization.
- Added support for binding network requests to specific interfaces (Wi-Fi / Cellular) on iOS.
- The Active Connections page now supports adding rules directly for current connections.
- Rewrite URL / Header / Body / Mock now each have independent editors.

### Optimizations & Improvements
- Overall optimization of the Override interface.
- Refactored the Third-Party Services page.
- Refactored the HTTP engine to improve performance when handling multiple Rewrite scenarios.
- Improved empty-state page display.
- Remote devices now support swipe-left to delete.
- Remote controller now shows proper prompts when remote devices disconnect.

### Bug Fixes
- Fixed an issue where filters were not displayed on iOS 26.
- Fixed several multilingual description issues.

> [!NOTE]
> Released on February 19, 2026

## 3.2.4

### Fixes
- Fixed an issue where running iPadOS Stash using MacCatalyst would cause unexpected behavior
- Fixed an issue where the navigation bar displayed incorrectly on iPadOS when using enlarged text
- Fixed a layout issue on iPadOS 26

> [!NOTE]
> Released on November 19, 2025

## 3.2.3

### Fixes
- Fixed an issue where running iPadOS Stash using MacCatalyst would cause unexpected behavior
- Fixed an issue where the navigation bar displayed incorrectly on iPadOS when using enlarged text

> [!NOTE]
> Released on November 18, 2025

## 3.2.2

### Optimizations
- Optimized the profile button style on the iOS 26 home page

> [!NOTE]
> Released on October 1, 2025

## 3.2.1

### New
- Added support for setting CNAME as hosts
- Added proxy-hosts: you can configure proxy-hosts to specify the IP requested by a remote server
- HTTP rewrite now supports Mock
Configuration details: https://stash.wiki/http-engine/rewrite#mock

- Added Collapsed Tile
To provide more customization space for “Third-Party Service” checks, we added Collapsed Tile, which uses the same script API as Tile. Collapsed Tile will appear in “Availability” and “Long Press Proxy - Proxy Information”. We also provide sample Tiles, which will be prompted for download when updating to Stash 3.2. Details: https://stash.wiki/script/tile

- Stash now generates a random API key upon first installation. All API operations require authentication via the HTTP header Authorization: Bearer `${secret}`. The API key can be changed in “More Settings”.
The API key is automatically synced via the user’s iCloud. When accessing other Stash devices under the same iCloud through “Tools” → “Remote Controller”, the API key will be filled in automatically.

- Added “Network Quality Test” page to evaluate network status via DNS response latency. Remote Controller can also view network quality of other devices (requires remote device version ≥ 3.2.0)
- “HTTP Inspection” page now supports showing request details before and after rewrite for easier debugging (remote debugging requires remote device version ≥ 3.2.0)
- Proxy list now supports switching sorting method: “By Configuration File” or “By Benchmark Results”
- Added long-press proxy information in Remote Controller (requires remote device version ≥ 3.2.0)
- Redesigned Override interface
- Transparent rewrite now supports regex parameters
- Added filter to Connections page
- Added filter to HTTP Inspection page
- Added local override for policy group icons
- Added background refresh for YAML configuration files
- Added “Reset Settings” in “More Settings” to restore Stash to default configuration

### Optimizations
- Optimized Connections interface
- Optimized HTTP Inspection interface
- Optimized DNS Inspection interface
- Optimized Override installation flow
- Optimized iPerf
- Optimized QUIC
- UI improvements on several pages, added transition animations (requires iOS 17 or later)

### Fixes
- Fixed compatibility issues between WireGuard and IPv6
- Fixed XUDP IPv6 connections
- Fixed Relay policy group not performing automatic speed tests in some cases
- Fixed issue where pinging domain names in Enhanced Mode may return incorrect IPs
- Fixed URL Transparent rewrite not correctly parsing parameters
- Fixed DNS hijacking compatibility with non-standard DNS queries

> [!NOTE]
> Released on September 28, 2025

## 3.2.0

### New
- Added support for setting CNAME as hosts
- Added proxy-hosts: you can configure proxy-hosts to specify the IP requested by a remote server
- HTTP rewrite now supports Mock
Configuration details: https://stash.wiki/http-engine/rewrite#mock

- Added Collapsed Tile
To provide more customization space for “Third-Party Service” checks, we added Collapsed Tile, which uses the same script API as Tile. Collapsed Tile will appear in “Availability” and “Long Press Proxy - Proxy Information”. We also provide sample Tiles, which will be prompted for download when updating to Stash 3.2. Details: https://stash.wiki/script/tile

- Stash now generates a random API key upon first installation. All API operations require authentication via the HTTP header Authorization: Bearer `${secret}`. The API key can be changed in “More Settings”.
The API key is automatically synced via the user’s iCloud. When accessing other Stash devices under the same iCloud through “Tools” → “Remote Controller”, the API key will be filled in automatically.

- Added “Network Quality Test” page to evaluate network status via DNS response latency. Remote Controller can also view network quality of other devices (requires remote device version ≥ 3.2.0)
- “HTTP Inspection” page now supports showing request details before and after rewrite for easier debugging (remote debugging requires remote device version ≥ 3.2.0)
- Proxy list now supports switching sorting method: “By Configuration File” or “By Benchmark Results”
- Added long-press proxy information in Remote Controller (requires remote device version ≥ 3.2.0)
- Redesigned Override interface
- Transparent rewrite now supports regex parameters
- Added filter to Connections page
- Added filter to HTTP Inspection page
- Added local override for policy group icons
- Added background refresh for YAML configuration files
- Added “Reset Settings” in “More Settings” to restore Stash to default configuration

### Optimizations
- Optimized Connections interface
- Optimized HTTP Inspection interface
- Optimized DNS Inspection interface
- Optimized Override installation flow
- Optimized iPerf
- Optimized QUIC
- UI improvements on several pages, added transition animations (requires iOS 17 or later)

### Fixes
- Fixed compatibility issues between WireGuard and IPv6
- Fixed XUDP IPv6 connections
- Fixed Relay policy group not performing automatic speed tests in some cases
- Fixed issue where pinging domain names in Enhanced Mode may return incorrect IPs
- Fixed URL Transparent rewrite not correctly parsing parameters
- Fixed DNS hijacking compatibility with non-standard DNS queries

> [!NOTE]
> Released on June 18, 2025

## 3.1.1

### New Features
- Support for VLESS XTLS-Vision
- Support for VLESS XTLS-REALITY
- Remote Rule Set now support MRS format rules
- Shadowsocks / Shadowsocks2022 now support configuring udp-port
- Shadowsocks / Shadowsocks2022 now support configuring udp-over-tcp v1 / v2
- Support for VLESS XUDP
- Added "benchmark-disabled" option for individual proxy latency test; setting it to true completely disables latency testing
- Proxy in the Visualization Editor now supports right-swipe to copy proxies
- Support for importing stoverride files from other apps or Files into Stash

### Optimizations
- Optimized "HTTP Inspection" page
  - Improved display of long text
  - Matching rule and proxy are shown in the list
  - Can jump to the Connection Details page of the HTTP request
  - Search box remembers the last search
- Optimized "Connections" page
  - Supports displaying more protocol types
  - Click on the hostname to jump to the related DNS query record
- Optimized "DNS Inspection" page
- Optimized "Remote Resources" page
- Fixed inaccurate IP info display on the homepage
- Optimized console.log in scripts — now supports logging objects, null, and undefined
- Reduced memory usage when rewriting large requests with scripts
- Refactored Remote Rule Set logic for improved performance and lower memory usage
- Improved GEOSITE performance
- Optimized latency test logic for Proxy Groups that include REJECT-DROP and REJECT type proxies
- Improved Stash Core stability

### Bug Fixes
- Fixed an issue where UDP might mistakenly send Fake IPs
- Fixed unnecessary DNS resolution under certain conditions
- Fixed bad udp address error in VLESS network diagnostics
- Fixed incorrect formatting of remote rule sets containing regex
- Fixed UDP error in VMess under some conditions
- Fixed request failures when using $httpClient in some scripts
- Fixed issues with certain requests failing during script rewriting
- Fixed inaccurate rule count statistics in some Remote Rule Set
- Fixed UI misalignment in some parts
- Fixed some crash

> [!NOTE]
> Released on May 27, 2025

## 3.1.0

### New Features
- Support for VLESS XTLS-Vision
- Support for VLESS XTLS-REALITY
- Remote Rule Set now support MRS format rules
- Shadowsocks / Shadowsocks2022 now support configuring udp-port
- Shadowsocks / Shadowsocks2022 now support configuring udp-over-tcp v1 / v2
- Support for VLESS XUDP
- Added "benchmark-disabled" option for individual proxy latency test; setting it to true completely disables latency testing
- Proxy in the Visualization Editor now supports right-swipe to copy proxies
- Support for importing stoverride files from other apps or Files into Stash

### Optimizations
- Optimized "HTTP Inspection" page
  - Improved display of long text
  - Matching rule and proxy are shown in the list
  - Can jump to the Connection Details page of the HTTP request
  - Search box remembers the last search
- Optimized "Connections" page
  - Supports displaying more protocol types
  - Click on the hostname to jump to the related DNS query record
- Optimized "DNS Inspection" page
- Optimized "Remote Resources" page
- Fixed inaccurate IP info display on the homepage
- Optimized console.log in scripts — now supports logging objects, null, and undefined
- Reduced memory usage when rewriting large requests with scripts
- Refactored Remote Rule Set logic for improved performance and lower memory usage
- Improved GEOSITE performance
- Optimized latency test logic for Proxy Groups that include REJECT-DROP and REJECT type proxies
- Improved Stash Core stability

### Bug Fixes
- Fixed an issue where UDP might mistakenly send Fake IPs
- Fixed unnecessary DNS resolution under certain conditions
- Fixed bad udp address error in VLESS network diagnostics
- Fixed incorrect formatting of remote rule sets containing regex
- Fixed UDP error in VMess under some conditions
- Fixed request failures when using $httpClient in some scripts
- Fixed issues with certain requests failing during script rewriting
- Fixed inaccurate rule count statistics in some Remote Rule Set
- Fixed UI misalignment in some parts
- Fixed some crash

> [!NOTE]
> Released on May 26, 2025

## 3.0.2

- Fixed an issue where UDP might unintentionally send a Fake IP
- Fixed compatibility issues between the HTTP Engine and certain servers
- Fixed a problem where Reject might incorrectly performs a DNS query

- Updated Social Media account information
X (Twitter): @StashAppDev / https://x.com/StashAppDev
Chat Group: @StashFans / https://t.me/StashFans
Channel: @StashFeed / https://t.me/StashFeed

> [!NOTE]
> Released on April 17, 2025

## 3.0.1

### New Features
- Added support for the ShadowSocks2022 protocol
- Added support for ShadowTLS
- Added support for AND, OR, NOT logical rules
- Added DOMAIN-WILDCARD rule
- Added DOMAIN-REGEX rule
- Added NETWORK rule with selectable values: tcp, udp
- Added PROTOCOL rule with selectable values: TCP, HTTP, HTTPS, UDP, QUIC
- Added URL-REGEX rule
- Added USER-AGENT rule
- Added body-rewrite feature, supporting:
  - request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
  - response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- Added support for sniffing TLS Client Hello to obtain SNI domain names
- When establishing a UDP connection, the system now attempts to use the target proxy to perform DNS queries to determine the destination IP
- Added support for sniffing QUIC / HTTP3
- The Connections page now displays more detailed TCP / UDP protocol information
- DoH and DoH3 now support User-Agent configuration
- Added BGP.Tools as an IP information provider
- Rewrites now support reading the zstd compression algorithm
- Visual editor:
  - Added support for reject-drop
  - Now supports modifying url-rewrite, header-rewrite, and body-rewrite
  - Now supports modifying scripts
- Long press to copy icon URLs

### Optimizations
- Significantly improved power efficiency, especially under low-load scenarios
- Optimized QUIC sniffing
- Optimized performance for bulk remote resource updates
- Optimized memory usage under high UDP concurrency
- Optimized memory pool allocation strategy
- Optimized long text display in the visual editor
- Optimized ECH implementation

### Bug Fixes
- Fixed an issue where icons might fail to import on the second attempt
- Fixed sorting issues in the visual editor

> [!NOTE]
> Released on April 2, 2025

## 3.0.0

### New Features
- Added support for the ShadowSocks2022 protocol
- Added support for ShadowTLS
- Added support for AND, OR, NOT logical rules
- Added DOMAIN-WILDCARD rule
- Added DOMAIN-REGEX rule
- Added NETWORK rule with selectable values: tcp, udp
- Added PROTOCOL rule with selectable values: TCP, HTTP, HTTPS, UDP, QUIC
- Added URL-REGEX rule
- Added USER-AGENT rule
- Added body-rewrite feature, supporting:
  - request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
  - response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- Added support for sniffing TLS Client Hello to obtain SNI domain names
- When establishing a UDP connection, the system now attempts to use the target proxy to perform DNS queries to determine the destination IP
- Added support for sniffing QUIC / HTTP3
- The Connections page now displays more detailed TCP / UDP protocol information
- DoH and DoH3 now support User-Agent configuration
- Added BGP.Tools as an IP information provider
- Rewrites now support reading the zstd compression algorithm
- Visual editor:
  - Added support for reject-drop
  - Now supports modifying url-rewrite, header-rewrite, and body-rewrite
  - Now supports modifying scripts
- Long press to copy icon URLs

### Optimizations
- Significantly improved power efficiency, especially under low-load scenarios
- Optimized QUIC sniffing
- Optimized performance for bulk remote resource updates
- Optimized memory usage under high UDP concurrency
- Optimized memory pool allocation strategy
- Optimized long text display in the visual editor
- Optimized ECH implementation

### Bug Fixes
- Fixed an issue where icons might fail to import on the second attempt
- Fixed sorting issues in the visual editor

> [!NOTE]
> Released on March 30, 2025

## 2.7.1

Happy New Year!

- Fixed an issue where certain service provider configurations could cause crashes

> [!NOTE]
> Released on January 1, 2025

## 2.7.0

### New Features
- iOS 18 Control Widget
- Added REJECT-DROP Policy
- Added GEOIP database updates during Stash runtime
- Added basic rewrite editing via a visual editor
- Added ip.im IP information provider
- Icons adapted for iOS 18 Dark and Tinted modes

### Improvements
- When updating remote resources, Stash will now use ETag for cache negotiation. If the resource hasn't changed, Stash won't re-download it, saving bandwidth for both users and rule set providers.
- When setting server-cert-fingerprint, there's no need to set skip-cert-verify to true
- Improved multilingual translations
- Optimized system DNS

### Fixes
- Fixed an issue where configuration file names would occasionally appear abnormal

> [!NOTE]
> Released on October 21, 2024

## 2.6.6

- Fixed an issue in version 2.6.5 where YAML whitespace could cause configuration file recognition errors
- Optimized QUIC

> [!NOTE]
> Released on September 11, 2024

## 2.6.5

- Optimized Sniffing
When connecting to a domain, Stash will initiate a TCP handshake for all resolved results simultaneously and use the connection that succeeds the fastest. Upon sniffing a domain, Stash triggers a DNS resolution to perform the above function. If the domain has no resolution in public DNS servers, it may cause a connection error. This version improves compatibility with unresolved domains.

- Enhanced HTTP Engine Compatibility for Hosts with Ports
- Happy Eyeballs Dual Stack Moved from Experimental to Stable. Enabling this will improve compatibility between IPv4 and IPv6 dual stack.
- Support for setting benchmark-url and benchmark-timeout in Proxy Providers
- Fixed Unexpected Jumping in Some UI Lists

> [!NOTE]
> Released on September 7, 2024

## 2.6.4

### New Features
- Support for Hysteria 2 port hopping feature
- Added support for SSH protocol
- Added support for Juicity protocol
- Shortcuts now support match_geosite syntax
- MitM feature will automatically disable when CA certificate is untrusted
- Ability to delete created certificates in the MitM settings page
- Added support for Russian language

### Improvements
- Optimized QUIC protocol 0-RTT
- Enhanced script Header compatibility
- Improved interaction on the Skip Proxy / Skip Tun page
- Reduced app size
- Optimized CA certificate logic, with issued certificates now valid for 10 years
- Improved interaction logic for installing CA certificates

### Fixes
- Fixed potential UI misalignment issue during drag-and-drop sorting in visual editing
- Fixed excessive space usage by cached files in some cases

> [!NOTE]
> Released on August 2, 2024

## 2.6.3

- Optimized the stability of WireGuard connections
- Improved the compatibility of Hysteria2 0-RTT on certain networks
- Enhanced the runtime MitM certificate generation process, reducing redundant calculations, improving performance, and saving power consumption
- Improved WireGuard using underlying-proxy to automatically recover from connection errors
- Fixed the issue where scripts could not run on systems below version 15.4

> [!NOTE]
> Released on June 18, 2024

## 2.6.2

- Fixed the issue where $persistentStore might not save correctly in certain situations.

> [!NOTE]
> Released on May 29, 2024

## 2.6.1

### New
- Stash is now optimized for sniffing, supporting more STOverrides under "Tunnel Proxy Only" mode.
- Now supports sniffing possible HTTP requests in TCP connections, including Method, Host, and URL.
- Supports DNS over HTTP/3.
- Supports Server Certificate Fingerprint Pinning for proxy servers, verifying the server certificate's SHA256 fingerprint during the TLS handshake when enabled.
- Added Script Hub to the tools.
- Supports collapsing policy groups by clicking on the policy group icon.

- Optimization
- Optimized script performance and memory usage, significantly improving script performance.
- Optimized performance based on the QUIC protocol.
- Optimized the speed when disconnecting VPN connections.

### Fixes
- Fixed the issue where QR codes could not be scanned on iPads.
- Fixed a potential crash in the visual editor.
- Fixed a recent issue with delayed memory release in scripts.
- Fixed incorrect exception handling in script $httpClient.
- Fixed the issue where $persistentStore.write could not save when the value passed was null or undefined.
- Fixed the issue where the status might not refresh after toggling switches in the Today Widget.
- Fixed script timeout exceptions.
- Fixed issues causing some scripts to fail execution.

> [!NOTE]
> Released on May 22, 2024

## 2.6.0

### New Features
- Added support for iOS 17 Interactive Widget
- Replaced JavaScript engine with a new engine that supports WebAPI
- Added support for DNS query following rules
- Added support for classical text rule sets
- Added support for one-click update for all overrides
- Added override categorization
- Added override icons
- Added support for proxying "Apple Push Notifications", "Wi-Fi Calling, MMS, SMS", "AirPlay, AirDrop"
- Script $environment now supports device-model
- Script $httpClient now supports parameters: timeout, insecure, auto-cookie, auto-redirect

- Enhancements
- Enhanced UDP compatibility
- Optimized Script memory usage
- Optimized override previews
- Optimized script $httpClient compatibility, fixing potential communication issues with some servers
- Enhanced visual DNS editing, now accessible from the homepage

### Fixes
- Fixed an issue with DNS over QUIC response timeouts
- Corrected the behavior of script $argument parameters; when not set, $argument is now undefined
- Addressed potential inaccuracies in matching with some large rule sets
- Fixed potential disconnection issues with doq
- Corrected an issue where connections from Stash internals were not properly recognized
- Fixed unresponsive import configuration issue
- Fixed a policy group crash
- Fixed an issue where overrides with the same name couldn't be installed

> [!NOTE]
> Released on April 2, 2024

## 2.5.6

- Fixed an issue where the toggle button state was incorrect in some cases
- Fixed an issue where some converted scripts could not be installed
- Corrected issues with concurrent scripts behaving abnormally in certain situations
- Optimized script memory usage
- The script's setTimeout() now supports parameters:
setTimeout(function, delay, param1, param2, /* …, */ paramN)

> [!NOTE]
> Released on December 15, 2023
