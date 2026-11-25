---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Enable automatic mitigation of random prefix attacks in the Cloudflare dashboard or via the API.
title: Setup
image: https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/og.png?v=96bb1374ef08a9cd
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Setup

In order to enable automatic mitigation of [random prefix attacks](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/):

1. Set up [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/setup/).
2. Enable attack mitigation on your DNS Firewall cluster.
   1. In the Cloudflare dashboard, go to the **DNS Firewall Clusters** page. [Go to **Clusters** ↗](https://dash.cloudflare.com/?to=/:account/dns-firewall/clusters)
   2. Select the cluster you want to update, then select **Edit**.
   3. Turn on **Attack mitigation** and choose whether Cloudflare should only mitigate attacks when the upstream is unhealthy.
   4. Select **Save**.

   Send a [`PATCH` request](https://developers.cloudflare.com/api/resources/dns_firewall/methods/edit/) to update your DNS Firewall cluster:<details><summary>

   Required API token permissions</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:
   - <code>DNS Firewall Write</code></details>

   *Update DNS Firewall Clusterbash*



   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
   	--request PATCH \
   	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
   	--json '{
   		"attack_mitigation": {
   				"enabled": true,
   				"only_when_upstream_unhealthy": true
   		}
   	}'
   ```

Once you turn on attack mitigation, Cloudflare returns a `REFUSED` response to queries that are part of a random prefix attack.

Note

If you do not specify otherwise, Cloudflare automatically sets the `only_when_upstream_unhealthy` parameter to true, which means that Cloudflare will only mitigate attacks when we detect that the upstream is unresponsive (possibly as a result of an attack).

## Choose a mitigation mode

The `only_when_upstream_unhealthy` setting controls when Cloudflare starts blocking queries identified as part of a random prefix attack.

| Mode | `only_when_upstream_unhealthy` | When to use |
| --- | --- | --- |
| **Conditional** (default) | `true` | Steady-state protection. Cloudflare blocks attack traffic only when your upstream nameservers are unresponsive. Reduces the risk of false positives — legitimate queries are less likely to be refused. Recommended for most deployments. |
| **Always on** | `false` | Active attack response. Cloudflare blocks identified attack traffic at all times, regardless of upstream health. Use this when your upstream is being overwhelmed. Some legitimate queries for subdomains not seen before may receive a `REFUSED` response. |

To check your current cluster configuration before making changes, send a [`GET` request](https://developers.cloudflare.com/api/resources/dns_firewall/methods/get/):

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Firewall Write</code>
- <code>DNS Firewall Read</code>

</details>

*DNS Firewall Cluster Detailsbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Identify the type of attack

DNS Firewall provides different levels of protection depending on the type of attack. Before applying mitigations, identify which pattern you are dealing with by inspecting a sample of query names hitting your upstream nameservers.

| Attack pattern | Description | DNS Firewall protection |
| --- | --- | --- |
| **Simple DNS flood** | The same query name, or a small set of names, repeated at high volume. | ✅ Strong — cached responses absorb the traffic. Increase cache TTL values. |
| **Random prefix attack** | Random-looking subdomains all ending with the same suffix (for example, `abc123.example.com`, `xyz456.example.com`). | Best-effort — use `attack_mitigation`. Refer to [Respond to an active random prefix attack](#respond-to-an-active-random-prefix-attack). |
| **Random-query attack** | Random subdomains across many different suffixes, or the targeted suffix is on the [Public Suffix List ↗︎](https://publicsuffix.org/) (for example, `co.uk`). | Partial — DNS Firewall can mitigate attacks targeting specific domain apexes. Attacks targeting an entire public suffix (such as `co.uk`) cannot be fully mitigated. |

## Respond to a simple DNS flood

If the same query names are being repeated at high volume, Cloudflare's cache is your primary defense. Apply the following settings via API or dashboard to maximise cache absorption.

### Increase cache TTL

Raising the cache TTL lets Cloudflare serve more responses from cache and reduces queries forwarded to your upstream nameservers:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Firewall Write</code>

</details>

*Update DNS Firewall Clusterbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"minimum_cache_ttl": 3600,
		"maximum_cache_ttl": 21600
	}'
```

Note

Increasing cache TTL reduces upstream load but also delays DNS change propagation to end users.

### Cache negative responses

If the attack includes queries for names that do not exist, enable negative response caching to prevent repeated lookups for `NXDOMAIN`, `REFUSED`, and `SERVFAIL` responses from reaching your upstream nameservers:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Firewall Write</code>

</details>

*Update DNS Firewall Clusterbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"negative_cache_ttl": 900
	}'
```

### Disable ANY queries

`ANY` queries are frequently used in DNS amplification attacks. If not already disabled, turn them off:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Firewall Write</code>

</details>

*Update DNS Firewall Clusterbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"deprecate_any_requests": true
	}'
```

Note

When enabled, DNS Firewall returns a `REFUSED` response to `ANY` queries instead of forwarding them to your upstream nameservers. This prevents `ANY` queries from being used as a DNS amplification vector. Refer to [RFC 8482 ↗︎](https://www.rfc-editor.org/rfc/rfc8482) for background on deprecating the `ANY` query type.

## Respond to an active random prefix attack

If your upstream nameservers are being overwhelmed by a random prefix attack, apply the following steps in order. All changes can be made via API. Rate limit configuration is not available in the dashboard.

### 1. Switch attack mitigation to always-on

Set `only_when_upstream_unhealthy` to `false` so that Cloudflare blocks identified attack traffic immediately, without waiting for your upstream to become unresponsive:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Firewall Write</code>

</details>

*Update DNS Firewall Clusterbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"attack_mitigation": {
				"enabled": true,
				"only_when_upstream_unhealthy": false
		}
	}'
```

### 2. Increase cache TTL

Raising the cache TTL lets Cloudflare serve more responses from cache, reducing the number of queries forwarded to your upstream nameservers:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Firewall Write</code>

</details>

*Update DNS Firewall Clusterbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"minimum_cache_ttl": 3600,
		"maximum_cache_ttl": 21600
	}'
```

Note

Increasing cache TTL reduces upstream load but also delays DNS change propagation to end users.

### 3. Set a rate limit

Rate limiting caps the number of uncached queries per second that Cloudflare forwards to your upstream nameservers, applied per data center. Queries that exceed the limit receive a `REFUSED` response. Rate limiting is disabled by default — set a value based on what your nameservers can sustain under normal load:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Firewall Write</code>

</details>

*Update DNS Firewall Clusterbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"ratelimit": 1000
	}'
```

Note

To disable rate limiting, set `ratelimit` to `null`.

Once the attack subsides, revert `only_when_upstream_unhealthy` to `true` and restore your normal cache TTL values to reduce the risk of false positives.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/#page","headline":"Setup","description":"Enable automatic mitigation of random prefix attacks in the Cloudflare dashboard or via the API.","url":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/og.png?v=96bb1374ef08a9cd","dateModified":"2026-11-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
