---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Scan your account for misconfigurations and potential security risks across all domains.
title: Security Insights
image: https://developers.cloudflare.com/security/security-insights/og.png?v=b3f018517f96fa74
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

# Security Insights

User permission

Ensure your user has one of the necessary roles to access Security Insights. Refer to [Roles and permissions](https://developers.cloudflare.com/security/security-insights/roles-and-permissions/) for more information.

Security Insights provides you with a list of insights, covering different areas of your Cloudflare environment, such as: Cloudflare account settings, DNS record configurations, SSL/TLS certificates configurations, Cloudflare Access configurations and Cloudflare WAF configurations.

Security Insights includes the following checks:

| Insight name | Description |
| --- | --- |
| [AI Labyrinth not enabled](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/) | AI Labyrinth is not turned on for the domain. |
| [API endpoints with no authentication detected](https://developers.cloudflare.com/api-shield/security/authentication-posture/) | No successful requests to the affected endpoints carry a configured session identifier. |
| [Bot detection models not updated](https://developers.cloudflare.com/bots/reference/machine-learning-models/) | The domain does not use the latest bot detection model. |
| [Bot Fight Mode not enabled](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) | Bot Fight Mode is turned off for the domain. |
| [Client-side security not enabled](https://developers.cloudflare.com/client-side-security/get-started/) | Client-side security is not turned on for the domain. |
| [Cloudflare Access setup incomplete](https://developers.cloudflare.com/cloudflare-one/setup/) | The account has Access seats but has not configured a team domain. |
| [Dangling CNAME Record detected](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#cname) | A `CNAME` record points to an unavailable resource, creating a potential subdomain takeover risk. |
| [DDoS protection is not enforced](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/override-parameters/) | Global overrides prevent the HTTP DDoS Attack Protection managed ruleset from enforcing protection. |
| [DMARC policy does not block spoofed email](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#dmarc) | The Domain-based Message Authentication, Reporting, and Conformance (DMARC) policy does not enforce quarantine or rejection for all messages. |
| [Domains missing TLS Encryption](https://developers.cloudflare.com/ssl/get-started/) | An unproxied hostname does not accept HTTPS connections. |
| [Domains without "Always Use HTTPS"](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) | HTTP requests do not redirect to HTTPS, and Always Use HTTPS is turned off. |
| [Domains without HSTS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/) | HTTPS responses lack the HTTP Strict Transport Security (HSTS) header, and the domain's HSTS setting is turned off. |
| [Exposed RDP Servers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/) | A Remote Desktop Protocol (RDP) server is exposed to the public Internet. |
| [Improve your API session identifier](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/) | Traffic analysis identifies a session identifier that recognizes API clients more reliably than the current configuration. |
| [Inconsistent authentication detected on API endpoints](https://developers.cloudflare.com/api-shield/security/authentication-posture/) | Some successful requests to the affected endpoints carry a configured session identifier, while others do not. |
| [Increased API response latency detected](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels) | API endpoints show an increase in response latency. |
| [Increased API response sizes detected](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels) | API endpoints show an increase in response body size. |
| [Increased error rates detected on API endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels) | API endpoints show an increase in response errors. |
| [IP List not configured](https://developers.cloudflare.com/waf/tools/lists/custom-lists/) | Custom rules contain inline IP address sets that could use an IP list instead. |
| [Managed Rules not deployed](https://developers.cloudflare.com/waf/managed-rules/) | The domain does not deploy the Cloudflare Managed Ruleset or Cloudflare OWASP Core Ruleset. Refer to [Known limitations](#known-limitations). |
| [Managed Rules not enforced](https://developers.cloudflare.com/waf/managed-rules/) | A managed ruleset has a ruleset-level override action of *Log*. |
| [Minimum Version of TLS 1.2 not enforced](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) | A hostname accepts Transport Layer Security (TLS) versions older than TLS 1.2. |
| [Multiple SPF records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | A hostname publishes more than one Sender Policy Framework (SPF) record. |
| [New SaaS security issue(s) detected](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/) | Cloud Access Security Broker (CASB) integrations have active security findings. |
| [No DMARC record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#dmarc) | A hostname with mail exchange (`MX`) records has no DMARC policy. |
| [No Identity Provider integrated](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) | The account has Access seats but no configured identity provider. |
| [No SPF record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | A hostname with `MX` records has no SPF record. |
| [No Turnstile enabled](https://developers.cloudflare.com/turnstile/) | The account has no Turnstile widget configured. |
| [Not utilizing bot scores](https://developers.cloudflare.com/bots/concepts/bot-score/) | Bot Management is available, but the checked rules do not use bot scores. |
| [Obsolete SPF record type](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | A hostname uses the obsolete SPF DNS record type instead of a `TXT` record. |
| [Overprovisioned Access Policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) | An Access policy allows everyone to access an application. |
| [Possible Broken Object Level Authorization (BOLA) attacks detected](https://developers.cloudflare.com/api-shield/security/bola-vulnerability-detection/) | API traffic shows anomalous enumeration or parameter pollution patterns associated with potential authorization attacks. |
| [Prevent attackers from reusing clearance cookies](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/) | Challenge rules are configured without a rate limiting rule that blocks clearance cookie reuse. |
| [Reduce skip rules for improved protection](https://developers.cloudflare.com/waf/custom-rules/skip/) | More than 30% of enabled custom rules use the *Skip* action. |
| [Review CASB integration health](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/) | One or more CASB integrations are unhealthy. |
| [Security.txt not configured](https://developers.cloudflare.com/security-center/infrastructure/security-file/) | The domain does not have Cloudflare's `security.txt` feature turned on. |
| [Sensitive data in API responses detected](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#sensitive-data-detection) | API responses match Sensitive Data Detection rules. |
| [SPF record does not block unauthorized senders](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | The SPF policy allows or stays neutral for unauthorized senders. |
| [SPF record has conflicting fallbacks](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | The SPF record contains both an `all` mechanism and a `redirect` modifier. |
| [SPF record has invalid syntax](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | The SPF record contains invalid mechanisms or modifiers. |
| [SPF record needs more than 10 DNS lookups](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | Evaluating the SPF record requires more than 10 DNS lookups. |
| [SPF record uses the ptr mechanism](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#spf) | The SPF record uses the discouraged `ptr` mechanism. |
| [Stale bot settings](https://developers.cloudflare.com/bots/get-started/) | The domain has bot settings that no longer match its subscription. |
| [Standard Super Bot Fight Mode not enabled/optimized](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) | Super Bot Fight Mode settings differ from the recommended configuration. |
| [Unprotected Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/#2-connect-your-origin-to-cloudflare) | A Cloudflare Tunnel serves an application without a corresponding Access policy. |
| [Unproxied A Record detected](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) | An unproxied `A` record exposes an origin that accepts web connections directly. |
| [Unproxied AAAA Record detected](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) | An unproxied `AAAA` record exposes an origin that accepts web connections directly. |
| [Unproxied CNAME Record detected](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) | An unproxied `CNAME` record exposes an origin that accepts web connections directly. |
| [Upgrade to improved leaked credentials detection](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/) | The domain uses exposed credentials checks without the improved leaked credentials detection. |
| [Users without MFA](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/) | A Cloudflare account member has not turned on multi-factor authentication (MFA) and does not use single sign-on (SSO). |

## Known limitations

**Account-level managed rules**: The **Managed Rules not deployed** check evaluates zone-level deployments. For Enterprise zones in accounts with access to account-level managed rules, this check is skipped. The absence of this insight does not confirm your account-level managed rules configuration.

**Insight updates**: Configuration changes may not immediately update existing insights. An insight leaves the active list after the relevant check runs again and no longer detects the issue.

After reviewing an insight's risk, you can [archive it](https://developers.cloudflare.com/security/security-insights/review-insights/#archive-insights). Archiving hides the insight from the active list without changing your security configuration.

## More resources

For more information on available operations for Security Insights, refer to [Review Security Insights](https://developers.cloudflare.com/security/security-insights/review-insights/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/security-insights/#page","headline":"Security Insights","description":"Scan your account for misconfigurations and potential security risks across all domains.","url":"https://developers.cloudflare.com/security/security-insights/","inLanguage":"en","image":"https://developers.cloudflare.com/security/security-insights/og.png?v=b3f018517f96fa74","dateModified":"2026-11-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
