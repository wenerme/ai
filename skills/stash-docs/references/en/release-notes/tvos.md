
## 3.3.3

### New Features
- Added support for VLESS-TCP-REALITY

### Improvements
- Improved compatibility with Shadowsocks 2022

### Fixes
- Fixed an issue where StashLink speed tests might get stuck

> [!NOTE]
> Released on March 31, 2026

## 3.3.0

### New Features
- Added dialer-proxy, allowing upstream proxies to be specified in proxy configurations, with support for TCP and UDP relay.
- Added support for AnyTLS.

### Bug Fixes
- Fixed several multilingual description issues.

> [!NOTE]
> Released on February 19, 2026

## 3.2.4

### Fixes
- Fixed an issue where Proxy Groups might not display correctly when launching the app for the first time.

> [!NOTE]
> Released on December 3, 2025

## 3.2.0

### New
- Added support for setting CNAME as hosts
- Added proxy-hosts: you can configure proxy-hosts to specify the IP requested by a remote server
- HTTP rewrite now supports Mock
Configuration details: https://stash.wiki/http-engine/rewrite#mock

- Stash now generates a random API key upon first installation. All API operations require authentication via the HTTP header Authorization: Bearer `${secret}`.
The API key is automatically synced via the user’s iCloud. When accessing other Stash devices under the same iCloud through Remote Controller, the API key will be filled in automatically.

- Transparent rewrite now supports regex parameters

### Optimizations
- Optimized QUIC

### Fixes
- Fixed compatibility issues between WireGuard and IPv6
- Fixed XUDP IPv6 connections
- Fixed Relay policy group not performing automatic speed tests in some cases
- Fixed issue where pinging domain names in Enhanced Mode may return incorrect IPs
- Fixed URL Transparent rewrite not correctly parsing parameters
- Fixed DNS hijacking compatibility with non-standard DNS queries

> [!NOTE]
> Released on September 27, 2025

## 3.1.1

### New Features
- Support for VLESS XTLS-Vision
- Support for VLESS XTLS-REALITY
- Remote Rule Set now support MRS format rules
- Shadowsocks / Shadowsocks2022 now support configuring udp-port
- Shadowsocks / Shadowsocks2022 now support configuring udp-over-tcp v1 / v2
- Support for VLESS XUDP
- Added "benchmark-disabled" option for individual proxy latency test; setting it to true completely disables latency testing

### Optimizations
- Fixed inaccurate IP info display on the homepage
- Reduced memory usage when rewriting large requests with scripts
- Refactored Remote Rule Set logic for improved performance and lower memory usage
- Improved GEOSITE performance
- Optimized latency test logic for Proxy Groups that include REJECT-DROP and REJECT type proxies
- Improved Stash Core stability

### Bug Fixes
- Fixed an issue where UDP might mistakenly send Fake IPs
- Fixed unnecessary DNS resolution under certain conditions
- Fixed incorrect formatting of remote rule sets containing regex
- Fixed UDP error in VMess under some conditions
- Fixed issues with certain requests failing during script rewriting
- Fixed inaccurate rule count statistics in some Remote Rule Set
- Fixed font color issue in light mode
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

### Optimizations
- Fixed inaccurate IP info display on the homepage
- Reduced memory usage when rewriting large requests with scripts
- Refactored Remote Rule Set logic for improved performance and lower memory usage
- Improved GEOSITE performance
- Optimized latency test logic for Proxy Groups that include REJECT-DROP and REJECT type proxies
- Improved Stash Core stability

### Bug Fixes
- Fixed an issue where UDP might mistakenly send Fake IPs
- Fixed unnecessary DNS resolution under certain conditions
- Fixed incorrect formatting of remote rule sets containing regex
- Fixed UDP error in VMess under some conditions
- Fixed issues with certain requests failing during script rewriting
- Fixed inaccurate rule count statistics in some Remote Rule Set
- Fixed font color issue in light mode
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
- Brand-new tvOS navigation bar
- Completely redesigned Policy Group
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
- Now displays more detailed TCP / UDP protocol information
- DoH and DoH3 now support User-Agent configuration
- Rewrites now support reading the zstd compression algorithm

### Optimizations
- Optimized QUIC sniffing
- Optimized performance for bulk remote resource updates
- Optimized memory usage under high UDP concurrency
- Optimized memory pool allocation strategy
- Optimized ECH implementation
- Improved software stability

> [!NOTE]
> Released on March 31, 2025

## 2.7.1

Happy New Year!

- Fixed an issue where certain service provider configurations could cause crashes

> [!NOTE]
> Released on January 1, 2025

## 2.7.0

### New Features
- Added REJECT-DROP Policy
- Added GEOIP database updates during Stash runtime

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

> [!NOTE]
> Released on September 7, 2024

## 2.6.4

### New Features
- Support for Hysteria 2 port hopping feature
- Added support for SSH protocol
- Added support for Juicity protocol
- Shortcuts now support match_geosite syntax
- Added support for Russian language

### Improvements
- Optimized QUIC protocol 0-RTT
- Reduced app size

> [!NOTE]
> Released on August 2, 2024

## 2.6.3

- Optimized the stability of WireGuard connections
- Improved the compatibility of Hysteria2 0-RTT on certain networks
- Enhanced the runtime MitM certificate generation process, reducing redundant calculations, improving performance, and saving power consumption
- Improved WireGuard using underlying-proxy to automatically recover from connection errors

> [!NOTE]
> Released on June 18, 2024

## 2.6.1

### New
- Stash is now optimized for sniffing, supporting more STOverrides under "Tunnel Proxy Only" mode.
- Now supports sniffing possible HTTP requests in TCP connections, including Method, Host, and URL.
- Supports DNS over HTTP/3.
- Supports Server Certificate Fingerprint Pinning for proxy servers, verifying the server certificate's SHA256 fingerprint during the TLS handshake when enabled.
- Built-in Script Hub support.
- Supports collapsing policy groups.

- Optimization
- Optimized performance based on the QUIC protocol.
- Optimized the speed when disconnecting VPN connections.

### Fixes
- Fixed a recent issue with delayed memory release in scripts.
- Fixed the issue where $persistentStore.write could not save when the value passed was null or undefined.
- Fixed script timeout exceptions.
- Fixed issues causing some scripts to fail execution.

> [!NOTE]
> Released on May 22, 2024

## 2.6.0

### New Features
- Added support for DNS query following rules
- Added support for classical text rule sets
- Script $environment now supports device-model
- Script $httpClient now supports parameters: timeout, insecure, auto-cookie, auto-redirect

- Enhancements
- Enhanced UDP compatibility
- Optimized Script memory usage
- Optimized script $httpClient compatibility, fixing potential communication issues with some servers

### Fixes
- Fixed an issue with DNS over QUIC response timeouts
- Corrected the behavior of script $argument parameters; when not set, $argument is now undefined
- Addressed potential inaccuracies in matching with some large rule sets
- Fixed potential disconnection issues with doq
- Corrected an issue where connections from Stash internals were not properly recognized

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
