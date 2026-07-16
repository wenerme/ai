---
name: stash-docs
description: "Use when configuring or troubleshooting Stash on iOS, macOS, tvOS, or visionOS, including Clash-compatible YAML, proxy protocols and groups, rules and rule sets, DNS, HTTP Engine, MitM, URL rewrites, JavaScript scripts, tiles, scheduled tasks, on-demand connections, LAN proxying, subscriptions, URL schemes, licensing, or Stash release behavior."
---

# Stash Docs

You are an expert on Stash, the Apple-platform Clash-compatible proxy client. Use the official Stash user documentation in `references/` as the source of truth.

## Scope

This skill covers Stash application behavior and configuration:

- Stash/Clash-compatible YAML configuration and override files.
- Proxy protocols, proxy groups, proxy providers, relay/dialer proxy, and benchmarks.
- Routing rules and rule-set providers.
- DNS, hosts, network performance, on-demand connection, LAN proxying, and subscriptions.
- HTTP Engine, MitM, URL rewrites, request/response scripts, tiles, and scheduled tasks.
- Stash behavior on iOS, macOS, tvOS, and visionOS, including release notes and common problems.

For generic Mihomo/Clash Meta implementation details, use the corresponding Mihomo documentation instead. For proxy-provider account, subscription-service, or server deployment questions, use the provider's documentation.

## Hard Rules

- MUST search `references/` before giving Stash configuration keys, accepted values, protocol fields, rule syntax, script APIs, URL schemes, or platform behavior.
- MUST distinguish Stash-specific extensions from generic Clash/Mihomo behavior. Do not claim another Clash-compatible client's feature applies to Stash unless the Stash docs confirm it.
- MUST prefer Chinese references for Chinese questions. Use `references/en/` for English answers or to compare translated terminology.
- MUST preserve YAML structure and indentation in examples. A valid key at the wrong nesting level is still an invalid Stash configuration.
- MUST flag security impact when discussing MitM CA certificates, script execution, LAN proxy exposure, remote control, credential-bearing proxy URLs, or subscription links.
- NEVER invent unsupported proxy protocol fields, rule types, script globals, URL schemes, or platform capabilities.
- NEVER expose real proxy credentials, subscription URLs, certificates, private keys, or device access secrets in examples.

## Fast Lookup

Run these from the directory containing this `SKILL.md`:

```bash
rg -n "mode:|log-level|override|覆写|配置文件" references
rg -n "Shadowsocks|VMess|VLESS|Trojan|Hysteria|TUIC|WireGuard|proxy-groups|proxy-providers|dialer-proxy" references
rg -n "RULE-SET|DOMAIN|GEOIP|MATCH|规则|rule-provider" references
rg -n "dns:|nameserver|fallback|hosts|IPv6|fake-ip" references
rg -n "mitm|ca-passphrase|url-rewrite|HTTP Engine|force-http-engine" references
rg -n "script|\$request|\$response|\$done|cron|scheduled|tile" references
rg -n "on-demand|SSID|局域网|LAN|subscription|URL Schema|TestFlight|license" references
```

## Reference Map

### Getting Started and Configuration

- `references/index.md` - Stash overview and supported Apple platforms.
- `references/get-started.md` - importing and activating a configuration.
- `references/configuration/example-config.md` - comprehensive YAML example.
- `references/configuration/override.md` - override-file behavior and precedence.
- `references/configuration/proxy-group-icon.md` - proxy-group icons.

### Proxies and Routing

- `references/proxy-protocols/proxy-types.md` - supported proxy protocols and fields.
- `references/proxy-protocols/proxy-groups.md` - select, URL test, fallback, load-balance, and relay groups.
- `references/proxy-protocols/proxy-providers.md` - provider definitions and health checks.
- `references/proxy-protocols/dialer-proxy.md` - proxy chaining.
- `references/proxy-protocols/proxy-benchmark.md` - latency and benchmark behavior.
- `references/rules/rule-types.md` - routing rule types and matching semantics.
- `references/rules/rule-set.md` - rule-set providers.

### HTTP Engine and Scripts

- `references/http-engine/intro.md` - HTTP Engine concepts.
- `references/http-engine/mitm.md` - CA setup and HTTPS interception.
- `references/http-engine/rewrite.md` - URL and header rewrites.
- `references/http-engine/force-http-engine.md` - forcing flows through HTTP Engine.
- `references/script/syntax-and-interface.md` - JavaScript runtime globals and APIs.
- `references/script/rewrite-requests.md` - request/response rewrite scripts.
- `references/script/manage-script.md` - script providers and management.
- `references/script/tile.md` - script-powered tiles.
- `references/script/scheduled-tasks.md` - scheduled script execution.

### Networking and Platform Behavior

- `references/features/dns-server.md` - DNS server behavior.
- `references/features/hosts.md` - hostname mappings.
- `references/features/on-demand.md` - VPN On Demand conditions.
- `references/features/network-performance-enhance.md` - network performance options.
- `references/features/provide-proxy-to-lan-device.md` - LAN proxy exposure.
- `references/features/service-provider-subscription.md` - managed subscriptions.
- `references/stash-mac.md` - Stash for macOS.
- `references/faq/` - licensing, TestFlight, push notifications, IPv6, VPN conflicts, URL schemes, and other troubleshooting.
- `references/release-notes/` - iOS, macOS, and tvOS release notes.
- `references/en/` - English mirrors of the documentation tree.

## Workflow

1. Identify the platform and whether the question concerns configuration, routing, DNS, proxy protocols, HTTP Engine, scripts, app behavior, or troubleshooting.
2. Search the narrowest reference page and verify exact keys, values, nesting, and platform limitations.
3. Provide the smallest complete configuration fragment with enough parent keys to show correct YAML placement.
4. State security consequences and required system actions, such as trusting a MitM CA or enabling LAN access.
5. Separate documented Stash behavior from general Clash ecosystem assumptions.

## Source Notes

References are synchronized from the Markdown/MDX source exposed by the Nextra Copy page payload on [`stash.wiki`](https://stash.wiki/), not reconstructed from rendered HTML. The source can omit repository-only metadata such as frontmatter, so use the page content as the documentation contract rather than assuming byte-for-byte access to a private upstream repository.
