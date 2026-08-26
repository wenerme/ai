---
description: This release moves four new detections from Log to Block, merges the XSS, HTML Injection - Script Tag - Beta rule into the original rule, and adds a Generic Rules - Remote Code Execution rule in Block mode.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# Changelog

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/change-log/changelog/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/waf.xml)

## 2026-08-25


**WAF Release - 2026-08-25**

This release moves four new detections from Log to Block, merges the XSS, HTML Injection - Script Tag - Beta rule into the original rule, and adds a Generic Rules - Remote Code Execution rule in Block mode.

**Key Findings**

* Four new detections move from Log to Block: HTTP/2 Request Smuggling - Request Body Anomaly and XSS - JavaScript Event Handler Coercion across Headers, Body, and URI.
* The XSS, HTML Injection - Script Tag - Beta rule is merged into the original rule.
* A Generic Rules - Remote Code Execution detection is added in Block mode.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                       | Previous Action | New Action | Comments                                                                                         |
| -------------------------- | ----------- | -------------- | ------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| Cloudflare Managed Ruleset | ...1489d892 | N/A            | HTTP/2 Request Smuggling - Request Body Anomaly   | Log             | Block      | This is a new detection.                                                                         |
| Cloudflare Managed Ruleset | ...20646260 | N/A            | XSS - JavaScript Event Handler Coercion - Headers | Log             | Block      | This is a new detection.                                                                         |
| Cloudflare Managed Ruleset | ...d706d517 | N/A            | XSS - JavaScript Event Handler Coercion - Body    | Log             | Block      | This is a new detection.                                                                         |
| Cloudflare Managed Ruleset | ...660886c8 | N/A            | XSS - JavaScript Event Handler Coercion - URI     | Log             | Block      | This is a new detection.                                                                         |
| Cloudflare Managed Ruleset | ...c293b926 | N/A            | XSS, HTML Injection - Script Tag - Beta           | Log             | Block      | This rule is merged into the original rule "XSS, HTML Injection - Script Tag" (ID: ...7b58420b). |
| Cloudflare Managed Ruleset | ...2ca6cce3 | N/A            | Generic Rules - Remote Code Execution             | N/A             | Block      | This is a new detection.                                                                         |

## 2026-08-20


**Leaked credentials detection now scans Authorization headers**

[Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) now scans the `Authorization` request header for Basic Authentication credentials. Previously, the detection only inspected request bodies, query strings, and headers for well-known web applications or custom detection locations, which meant credentials sent through HTTP Basic Authentication were not covered by default.

This new default scan location decodes the `Authorization: Basic <credentials>` header and compares the extracted username and password against Cloudflare's database of leaked credentials, the same way as other default scan locations. Matches populate the existing [leaked credentials fields](https://developers.cloudflare.com/waf/detections/leaked-credentials/#leaked-credentials-fields), such as `cf.waf.credential_check.password_leaked`, and trigger the [Exposed-Credential-Check managed transform header](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-leaked-credentials-checks-header) if configured, so you can reuse existing [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) without changes.

This change was applied automatically for zones with leaked credentials detection enabled. No configuration changes are required.

For more information, refer to [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/).

## 2026-08-17


**WAF Release - 2026-08-17**

This release updates WordPress remote code execution rule metadata in the Cloudflare Managed Ruleset and Cloudflare Free Ruleset to identify CVE-2026-65640.

**Key Findings**

* CVE-2026-65640: A remote code execution vulnerability affecting WordPress core and plugin components. Remote, unauthenticated attackers can execute arbitrary system commands to gain unauthorized access or establish backdoors on host servers.

**Impact**

The WordPress changes update rule metadata only; detection behavior and actions remain unchanged.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                                                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...3590a4ad | N/A            | Wordpress - Remote Code Execution - CVE:CVE-2026-65640 | Block           | N/A        | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset    | ...cfe1a93c | N/A            | Wordpress - Remote Code Execution - CVE:CVE-2026-65640 | Block           | N/A        | Rule metadata description refined. Detection unchanged. |

## 2026-08-11


**WAF Release - 2026-08-11**

This release introduces new protection for a remote code execution vulnerability in vBulletin and improves two existing detections.

**Key Findings**

* A new detection provides protection against vBulletin CVE-2026-61511.
* Two existing detections have been improved to strengthen coverage.

**Impact**

Successful exploitation of CVE-2026-61511 may lead to remote code execution on affected vBulletin systems, potentially resulting in unauthorized access, data exposure, service disruption, and broader compromise of the hosting environment. Administrators are strongly encouraged to apply vendor updates and recommended mitigations.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                   | Previous Action | New Action | Comments                                                                                                                              |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...94f3006b | N/A            | vBulletin - Remote Code Execution - CVE:CVE-2026-61511                        | Log             | Block      | This is a new detection.                                                                                                              |
| Cloudflare Managed Ruleset | ...098b749e | N/A            | Version Control - Information Disclosure - Beta                               | Log             | Block      | This rule is merged into the original rule "Version Control - Information Disclosure" (ID: ...0550c529)                               |
| Cloudflare Managed Ruleset | ...d56225d8 | N/A            | vBulletin - Code Injection - Invalid image format - CVE:CVE-2019-17132 - Beta | Log             | Block      | This rule is merged into the original rule "vBulletin - Code Injection - Invalid image format - CVE:CVE-2019-17132" (ID: ...8fe9f1c7) |

## 2026-08-07


**WAF Release - 2026-08-07**

This release updates WordPress XSS rule metadata in the Cloudflare Managed Ruleset and Cloudflare Free Ruleset to identify XSS2Shell (CVE-2026-64638). It also disables the Command Injection - Obfuscation rule.

**Key Findings**

* CVE-2026-64638: A pre-authentication reflected cross-site scripting vulnerability affecting the WordPress login screen. Exploitation requires social engineering and explicit interaction by the target user. Under additional conditions, it may be escalated to remote code execution.

**Impact**

The WordPress changes update rule metadata only; detection behavior and actions remain unchanged.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                          | Previous Action | New Action | Comments                                                |
| -------------------------- | ----------- | -------------- | ------------------------------------ | --------------- | ---------- | ------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...9c6dff1c | N/A            | Wordpress - XSS - CVE:CVE-2026-64638 | Block           | N/A        | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset    | ...9ab5ed95 | N/A            | Wordpress - XSS - CVE:CVE-2026-64638 | Block           | N/A        | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...761e7a4c | N/A            | Command Injection - Obfuscation      | Block           | Disabled   | Detection logic has been deprecated                     |

## 2026-08-04


**WAF Release - 2026-08-04**

This release introduces new rules and updates Microsoft SharePoint RCE alongside enhanced SSRF cloud protection rule actions.

**Key Findings**

* CVE-2026-50522: An insecure deserialization vulnerability in Microsoft SharePoint Server. This may allow an unauthenticated attacker to execute arbitrary code using crafted requests.
* CVE-2026-66066: An improper input processing vulnerability in Ruby on Rails Active Storage image variant transformations. This may allow an unauthenticated attacker to perform arbitrary file reads and achieve Remote Code Execution (RCE) using maliciously crafted payload requests.
* Generic Cloud Protections: Added improved detection logic targeting Server-Side Request Forgery (SSRF) in cloud-hosted applications.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                       | Previous Action | New Action | Comments                                                        |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...052b07cf | N/A            | Microsoft SharePoint - Remote Code Execution - CVE:CVE-2026-50522 | Log             | Block      | This is a new detection.                                        |
| Cloudflare Managed Ruleset | ...3a5b40d6 | N/A            | Rails - Arbitrary File Read & RCE - CVE:CVE-2026-66066            | Block           | Block      | This was labeled as File Upload - RCE.                          |
| Cloudflare Managed Ruleset | ...8242627b | N/A            | SSRF - Local                                                      | Disabled        | \-         | This detection has been removed.                                |
| Cloudflare Managed Ruleset | ...743a63ec | N/A            | SSRF - Local - 2 - Beta                                           | Disabled        | \-         | This detection has been removed.                                |
| Cloudflare Managed Ruleset | ...c2e84e2d | N/A            | SSRF - Cloud - Beta                                               | Disabled        | \-         | This detection has been removed.                                |
| Cloudflare Managed Ruleset | ...ab8af26f | N/A            | SSRF - Cloud - 2 - Beta                                           | Disabled        | \-         | This detection has been removed.                                |
| Cloudflare Managed Ruleset | ...25ba9d7c | N/A            | SSRF - Cloud                                                      | Disabled        | Block      | We are changing the action for this rule from Disabled to BLOCK |
| Cloudflare Managed Ruleset | ...01a076eb | N/A            | SSRF - Local - Beta                                               | Disabled        | \-         | This detection has been removed.                                |

## 2026-07-29


**WAF Release - 2026-07-29**

This release introduces new rules and updates existing threat signatures to provide targeted protections for vulnerabilities in Nuxt Server Island components and Alibaba Fastjson deserialization routines, alongside enhanced protections for cloud metadata Server-Side Request Forgery (SSRF) and obfuscated command injection attempts.

**Key Findings**

* Nuxt Server Island - RCE(GHSA-9473-5f9j-94wq): An unauthenticated vulnerability in Nuxt Server Islands where remote attackers can supply arbitrary component names or props to endpoints. Manipulating these parameters allows unauthenticated component Remote Code Execution (RCE) on the server.
* Alibaba Fastjson JSONType Remote Code Execution: A unauthenticated remote code execution vulnerability in Alibaba Fastjson (≤ 1.2.83) during JSON deserialization. Under default configurations, attackers can execute arbitrary system commands, bypassing traditional classpath and gadget-based defenses.
* Generic Protections (SSRF & Command Injection): Added improved detection logic targeting Server-Side Request Forgery (SSRF) in cloud-hosted applications, alongside new rules targeting obfuscated command injection patterns across request parameters.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                                                         |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ---------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...c2e84e2d | N/A            | SSRF - Cloud - Beta                                    | Log             | Block      | This is an improved detection.                                   |
| Cloudflare Managed Ruleset | ...761e7a4c | N/A            | Command Injection - Obfuscation                        | Log             | Block      | This is a new detection.                                         |
| Cloudflare Managed Ruleset | ...7347c892 | N/A            | Alibaba Fastjson JSONType Remote Code Execution - Body | Log             | Block      | This is a new detection.                                         |
| Cloudflare Managed Ruleset | ...8ec012ea | N/A            | Nuxt Server Island - RCE                               | N/A             | Block      | This is a new detection.This was labeled as Generic Rules - RCE. |
| Cloudflare Managed Ruleset | ...3590a4ad | N/A            | Generic Rules - RCE                                    | N/A             | Block      | This is a new detection.                                         |
| Cloudflare Managed Ruleset | ...9c6dff1c | N/A            | Generic Rules - XSS                                    | N/A             | Block      | This is a new detection.                                         |
| Cloudflare Managed Ruleset | ...3a5b40d6 | N/A            | File Upload - RCE                                      | N/A             | Block      | This is a new detection.                                         |
| Cloudflare Free Ruleset    | ...cfe1a93c | N/A            | Generic Rules - RCE                                    | N/A             | Block      | This is a new detection.                                         |
| Cloudflare Free Ruleset    | ...9ab5ed95 | N/A            | Generic Rules - XSS                                    | N/A             | Block      | This is a new detection.                                         |
| Cloudflare Free Ruleset    | ...1b7f9c67 | N/A            | File Upload - RCE                                      | N/A             | Block      | This is a new detection.                                         |

## 2026-07-21


**WAF Release - 2026-07-21**

This release introduces new rules for vulnerabilities in Adobe ColdFusion, Next.js, WordPress alongside updates to existing rules thereby providing enhanced generic protections against Server-Side Request Forgery (SSRF), Local File Inclusion (LFI), and Cross-Site Scripting (XSS).

**WAF and framework adapter mitigations for Next.js vulnerabilities**

Multiple [security vulnerabilities ↗](https://nextjs.org/blog/july-2026-security-release) were disclosed and patched by the Next.js team through July 2026 security release. These include denial of service, middleware and proxy bypass, server-side request forgery, information disclosure, and cache poisoning across a range of severities.

Several of the disclosed vulnerabilities are not possible to block at WAF layer,we strongly recommend updating your application and its dependencies immediately. Patched versions are available through v16.2.11 (Active LTS) and v15.5.21 (Maintenance LTS) to address these issues.

| Advisory                                                                                                                                                                         | CVE            | Severity | Issue                                                                                                                                                                                                                                                                                                                 | WAF Coverage                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Denial of Service in App Router using Server Actions](https://github.com/vercel/next.js/security/advisories/GHSA-m99w-x7hq-7vfj)                                                | CVE-2026-64641 | High     | Crafted requests targeting Next.js applications using App Router with at least one Server Action can lead to excessive CPU usage. The CPU usage blocks processing of further requests in the same process, leading to Denial of Service.                                                                              | WAF rule Next.js - DoS - CVE-2026-64641 (...90dcdb0a) has been deployed to provide coverage.                                                                                                     |
| [Middleware / Proxy bypass in App Router applications using Turbopack and single locale](https://github.com/vercel/next.js/security/advisories/GHSA-6gpp-xcg3-4w24)              | CVE-2026-64642 | High     | Next.js applications using App Router built with Turbopack and a single entry in config.i18n.locales are vulnerable to a middleware/proxy bypass. Accordingly, any authentication or security checks that a middleware/proxy may perform are bypassed.                                                                | This is a middleware bypass that unfortunately cannot be covered through Cloudflare WAF signature engine.                                                                                        |
| [Server-Side Request Forgery in rewrites via attacker-controlled destination hostname](https://github.com/vercel/next.js/security/advisories/GHSA-p9j2-gv94-2wf4)                | CVE-2026-64645 | High     | A rewrites() or redirects() rule that builds its external destination hostname from request-controlled input can be pointed at an arbitrary hostname, regardless of the rule's hostname suffix. For rewrites, this behavior enables Server-Side Request Forgery (SSRF); for redirects, Open Redirect can be achieved. | Existing SSRF rules provide adequate coverage for this vulnerability, no tailored WAF rule was developed.                                                                                        |
| [Server-Side Request Forgery in Server Actions on custom servers](https://github.com/vercel/next.js/security/advisories/GHSA-89xv-2m56-2m9x)                                     | CVE-2026-64649 | High     | When a Server Action forwards or redirects a request, an attacker can cause the server to send that outbound request to a malicious host (Server-Side Request Forgery). This requires the attacker’s request to control Host-associated headers.                                                                      | WAF rule Next.js - SSRF - CVE-2026-64649 (...930091a3) has been deployed to provide coverage.                                                                                                    |
| [Denial of Service in the Image Optimization API using SVGs](https://github.com/vercel/next.js/security/advisories/GHSA-q8wf-6r8g-63ch)                                          | CVE-2026-64644 | Medium   | When self-hosting Next.js with the default image loader, the Image Optimization API can optimize remotely hosted images if configured (not enabled by default). If those images contain malicious content, the images can cause CPU exhaustion in the /\_next/image endpoint.                                         | Malicious request is unfortunately indistinguishable from a legitimate image optimization request, so no WAF rule has been created to address this vulnerability.                                |
| [Unbounded Server Action payload in Edge runtime](https://github.com/vercel/next.js/security/advisories/GHSA-4c39-4ccg-62r3)                                                     | CVE-2026-64646 | Medium   | A crafted request can lead to memory consumption on Server Actions in the Edge runtime. Next.js applications which use App Router and have at least one Server Action are affected.                                                                                                                                   | Unfortunately there is no one size fits all rule that can be deployed through WAF in lieu of custom bodySizeLimit configurations, so no WAF rule has been created to address this vulnerability. |
| [Unauthenticated disclosure of internal Server Function endpoints](https://github.com/vercel/next.js/security/advisories/GHSA-955p-x3mx-jcvp)                                    | CVE-2026-64643 | Medium   | In Next.js applications using App Router, Server Actions (use server) or use cache endpoint IDs can be globally disclosed. An attacker can use this for reconnaissance and as part of a broader attack chain.                                                                                                         | WAF rule Next.js - Information Disclosure - CVE-2026-64643 (...72952826) has been deployed to provide coverage.                                                                                  |
| [Cache confusion of response bodies for requests with bodies](https://github.com/vercel/next.js/security/advisories/GHSA-68g3-v927-f742)                                         | CVE-2026-64648 | Medium   | A server-side fetch with a request body may return a cached response body from a different request to the same URL but different body. This only applies for fetch calls of the shape fetch(new Request(init), aDifferentInit)                                                                                        | This is an application logic bug that unfortunately cannot be covered through Cloudflare WAF signature engine.                                                                                   |
| [Cache confusion of response bodies for requests with bodies containing invalid UTF-8 byte sequences](https://github.com/vercel/next.js/security/advisories/GHSA-4633-3j49-mh5q) | CVE-2026-64647 | Medium   | A server-side fetch with a request body may return a cached response body from a different request to the same URL but different body. This only applies when receiving request bodies which contain invalid UTF-8 characters.                                                                                        | This is an application logic bug that unfortunately cannot be covered through Cloudflare WAF signature engine.                                                                                   |

**Key Findings**

* CVE-2026-48276: A path traversal vulnerability in Adobe ColdFusion file upload mechanisms allows unauthenticated attackers to write or upload files to arbitrary locations outside designated directories on the origin server.
* CVE-2026-48282: A path traversal vulnerability in Adobe ColdFusion enables unauthenticated attackers to manipulate directory sequences and access restricted system files on the host filesystem.
* CVE-2026-60137: An unauthenticated SQL injection vulnerability affecting WordPress. Threat actors exploit unsanitized input parameters to execute arbitrary SQL queries, leading to unauthorized database access, record manipulation, or data exfiltration.
* CVE-2026-63030: A remote code execution vulnerability affecting WordPress core and plugin components. Remote, unauthenticated attackers can execute arbitrary system commands to gain unauthorized access or establish backdoors on host servers.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                        | Previous Action | New Action | Comments                                                    |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------ | --------------- | ---------- | ----------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...215e7d31 | N/A            | SSRF - Restricted Protocol                                         | Log             | Block      | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...a935ee5d | N/A            | SSRF - Obfuscated Host                                             | Log             | Block      | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...1b0230ac | N/A            | LFI - Path Traversal                                               | Log             | Block      | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...61349c8b | N/A            | Adobe ColdFusion - File Upload Path Traversal - CVE:CVE-2026-48276 | Log             | Block      | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...9cb61eac | N/A            | Adobe ColdFusion - Path Traversal - CVE:CVE-2026-48282             | Log             | Block      | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...4ac5e21f | N/A            | XSS — JS Bracket Concat Obfuscation - Body                         | Log             | Disabled   | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...f31f5559 | N/A            | XSS — JS Bracket Concat Obfuscation - Headers                      | Log             | Disabled   | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...987984fd | N/A            | XSS — JS Bracket Concat Obfuscation - URI                          | Log             | Block      | This is a new detection.                                    |
| Cloudflare Managed Ruleset | ...ed933fcc | N/A            | Wordpress - SQL Injection - CVE:CVE-2026-60137                     | N/A             | Block      | This was labeled as Generic Rules - SQLi.                   |
| Cloudflare Managed Ruleset | ...550664b6 | N/A            | Wordpress - Remote Code Execution - CVE:CVE-2026-63030             | N/A             | Block      | This was labeled as Generic Rules - Unauthenticated RCE.    |
| Cloudflare Free Ruleset    | ...33697a1a | N/A            | Wordpress - SQL Injection - CVE:CVE-2026-60137                     | N/A             | Block      | This was labeled as Generic Rules - SQLi.                   |
| Cloudflare Free Ruleset    | ...b5ec246a | N/A            | Wordpress - Remote Code Execution - CVE:CVE-2026-63030             | N/A             | Block      | This was labeled as Generic Rules - Unauthenticated RCE.    |
| Cloudflare Managed Ruleset | ...72952826 | N/A            | Next.js - Information Disclosure - CVE-2026-64643                  | N/A             | Block      | This was labeled as Generic Rules - Information Disclosure. |
| Cloudflare Managed Ruleset | ...930091a3 | N/A            | Next.js - SSRF - CVE-2026-64649                                    | N/A             | Block      | This was labeled as Generic Rules - Auth Bypass - 2.        |
| Cloudflare Managed Ruleset | ...63167195 | N/A            | Next.js - Remote Code Execution - Cache Components                 | N/A             | Block      | This was labeled as Generic Rules - RCE.                    |
| Cloudflare Managed Ruleset | ...90dcdb0a | N/A            | Next.js - DoS - CVE-2026-64641                                     | N/A             | Block      | This was labeled as Generic Rules - DoS.                    |
| Cloudflare Managed Ruleset | ...2049a60c | N/A            | Generic Rules - Command Execution - Body - Beta                    | Disabled        | \-         | This detection has been removed.                            |
| Cloudflare Managed Ruleset | ...836855a4 | N/A            | Generic Rules - Command Execution - Header - Beta                  | Disabled        | \-         | This detection has been removed.                            |
| Cloudflare Managed Ruleset | ...6d060a0d | N/A            | Generic Rules - Command Execution - URI - Beta                     | Disabled        | \-         | This detection has been removed.                            |

## 2026-07-17


**WAF Release - 2026-07-17 - Emergency**

This emergency release adds a new managed rule to block active exploitation of a critical remote code execution (RCE) and SQL injection (SQLi) vulnerability found in popular web frameworks.

**Key Findings**

* Generic Frameworks - Unauthenticated RCE: Attackers can execute arbitrary system commands with web server privileges by sending malicious input containing invalid path sequences during request processing.
* Generic Frameworks - SQLi: Attackers can execute unauthorized database queries due to a failure to sanitize input values within request parameters.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                         | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...550664b6 | N/A            | Generic Rules - Unauthenticated RCE | N/A             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...ed933fcc | N/A            | Generic Rules - SQLi                | N/A             | Block      | This is a new detection. |
| Cloudflare Free Ruleset    | ...b5ec246a | N/A            | Generic Rules - Unauthenticated RCE | N/A             | Block      | This is a new detection. |
| Cloudflare Free Ruleset    | ...33697a1a | N/A            | Generic Rules - SQLi                | N/A             | Block      | This is a new detection. |

## 2026-07-14


**WAF Release - 2026-07-14**

This release introduces new rules targeting critical infrastructure vulnerabilities. These include an unauthenticated memory disclosure flaw in Citrix NetScaler ADC and Gateway (CVE-2026-8451) and a high-severity pre-authentication remote code execution (RCE) vulnerability in Progress Kemp LoadMaster (CVE-2026-8037).

**Key Findings**

* CVE-2026-8451: An insufficient input validation vulnerability affects Citrix NetScaler ADC and NetScaler Gateway appliances configured as a SAML Identity Provider (IdP). Remote, unauthenticated attackers can exploit this flaw by sending malformed requests to trigger a memory overread, allowing them to leak chunks of sensitive data from adjacent appliance memory.
* CVE-2026-8037: A critical OS command injection vulnerability in Progress Kemp LoadMaster load balancers allows unauthenticated remote attackers to achieve remote code execution (RCE).

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                              | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------ | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...76973ac4 | N/A            | Citrix Netscaler ADC - Insufficient Input Validation - CVE:CVE-2026-8451 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...10233f36 | N/A            | Progress Kemp LoadMaster - Remote Code Execution - CVE:CVE-2026-8037     | Log             | Block      | This is a new detection. |

## 2026-07-01


**WAF Release - 2026-07-01**

This release adds targeted coverage for a path traversal flaw in Fortinet FortiSandbox (CVE-2026-39813) and transitions the Anomaly:Header:User-Agent - Fake Bing or MSN Bot rule action from Block to Disabled.

**Key Findings**

* CVE-2026-39813: A path traversal vulnerability in Fortinet FortiSandbox allows remote, unauthenticated attackers to read arbitrary files from the underlying filesystem due to insufficient validation of user-supplied input paths.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                                                        |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...d84c92c9 | N/A            | Fortinet FortiSandbox - Path Traversal - CVE:CVE-2026-39813 | Log             | Block      | This is a new detection.                                        |
| Cloudflare Managed Ruleset | ...c12cf9c8 | N/A            | Anomaly:Header:User-Agent - Fake Bing or MSN Bot            | Enabled         | Disabled   | We are changing the action for this rule from BLOCK to Disabled |

## 2026-06-23


**WAF Release - 2026-06-23**

This week's release introduces new managed protection to address a critical pre-authentication OS command injection vulnerability in Ivanti Sentry (CVE-2026-10520).

**Key Findings**

* CVE-2026-10520: An OS command injection vulnerability in Ivanti Sentry allows remote, unauthenticated attackers to execute arbitrary system commands with root privileges. The flaw stems from improper sanitization of input strings parsed during internal configuration handling.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...242fdf83 | N/A            | Ivanti Sentry - Command Injection - CVE:CVE-2026-10520 | Log             | Block      | This is a new detection. |

## 2026-06-15


**Use Cloudforce One threat intelligence in WAF rules**

You can now match incoming requests against Cloudforce One threat intelligence in your WAF rules. A new detection looks up the client IP address of each request against the threat intelligence database. If the IP was involved in threat activity in the past seven days, Cloudflare populates `cf.intel.ip.*` fields that you can use in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/).

The detection populates the following fields. Use the [any()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#any) function with the `[*]` wildcard to match array values:

* `cf.intel.ip.datasets` — the dataset that flagged the IP address (`ddos` or `waf`).
* `cf.intel.ip.target_industries` — industries the IP address has targeted.
* `cf.intel.ip.attacker_names` — known threat actors associated with the IP address.
* `cf.intel.ip.attacker_countries` — source countries of the threat activity.
* `cf.intel.ip.target_countries` — countries the IP address has targeted.

For example, the following custom rule expression blocks requests from IP addresses associated with DDoS activity that have targeted France:

```txt
any(cf.intel.ip.target_countries[*] == "FR") and any(cf.intel.ip.datasets[*] == "ddos")
```

These fields work with the Cloudflare API and Terraform. Matches are logged in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

The threat intelligence detection is available to customers with an active [Cloudforce One](https://developers.cloudflare.com/security-center/cloudforce-one/) subscription. For more information, refer to [Threat intelligence](https://developers.cloudflare.com/waf/detections/threat-intelligence/).

## 2026-06-15


**WAF Release - 2026-06-15**

This week's release introduces new managed protection to address a critical SQL injection vulnerability in Ghost CMS (CVE-2026-26980) and a new generic rule designed to identify and block sophisticated SQL Injection (SQLi) bypass attempts leveraging obfuscated boolean logic. These rules protect affected installations from unauthorized data exfiltration at the network edge.

**Key Findings**

* CVE-2026-26980: A blind SQL injection vulnerability in the Ghost CMS Content API (versions 3.24.0 to 6.19.0) allows unauthenticated remote attackers to inject malicious SQL commands via query parameters due to improper input validation.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                           | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...b4c29bc6 | N/A            | Ghost CMS - SQLi - CVE:CVE-2026-26980 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...b56f403f | N/A            | SQLi - Obfuscated Boolean - URI       | Log             | Disabled   | This is a new detection. |

## 2026-06-09


**WAF Release - 2026-06-09**

This release introduces new detections for a critical SQL injection vulnerability in Drupal installations utilizing PostgreSQL (CVE-2026-9082), alongside targeted protection for an unsafe deserialization flaw in the Mirasvit Cache Warmer extension (CVE-2026-45247). Additionally, this release includes coverage for a prototype pollution vector in Axios (CVE-2026-40175) and a new generic rule designed to identify and block sophisticated SQL Injection (SQLi) bypass attempts leveraging obfuscated boolean logic.

**Key Findings**

* CVE-2026-9082: A database abstraction vulnerability affects Drupal sites configured with a PostgreSQL backend. Remote, unauthenticated attackers can exploit this flaw via crafted inputs to inject malicious SQL commands and access or manipulate backend data.
* CVE-2026-45247: A PHP Object Injection vulnerability exists in the Mirasvit Cache Warmer extension for Magento and Adobe Commerce. This flaw stems from unsafe deserialization of untrusted user input, enabling unauthenticated attackers to execute arbitrary code on the hosting server.
* CVE-2026-40175: A prototype pollution vulnerability affects the Axios HTTP client library. Attackers can exploit this to inject malicious properties into the global JavaScript object prototype, potentially causing application crashes (Denial of Service) or executing unauthorized code depending on the application structure.

**Impact**

Successful exploitation of these vulnerabilities could allow unauthenticated attackers to execute arbitrary code, manipulate database contents, or induce application crashes, leading to severe operational disruption or complete server compromise. These newly deployed signatures intercept these advanced malicious payloads at the edge before they can interact with vulnerable software configurations.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                       | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...387cf935 | N/A            | Axios - Prototype Pollution - CVE:CVE-2026-40175                  | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...417eb9e0 | N/A            | Drupal - PostgreSQL SQLi - CVE:CVE-2026-9082 - Body               | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...fd3857fd | N/A            | Drupal - PostgreSQL SQLi - CVE:CVE-2026-9082 - URI                | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...aee241d2 | N/A            | SQLi - Obfuscated Boolean - Body                                  | N/A             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...d8620070 | N/A            | SQLi - Obfuscated Boolean - Headers                               | N/A             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...e0be4d47 | N/A            | Mirasvit Cache Warmer - PHP Object Injection - CVE:CVE-2026-45247 | N/A             | Block      | This is a new detection. |

## 2026-05-20


**WAF Release - 2026-05-20**

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                                                                                                        |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...9e9c068d | N/A            | Sitecore - Cache Poisoning - CVE:CVE-2025-53693 Beta | N/A             | Block      | This rule is merged into the original rule "Sitecore - Cache Poisoning - CVE:CVE-2025-53693" (ID: ...7c5b669c). |

## 2026-05-15


**WAF Release - 2026-05-15 - Emergency**

This emergency release introduces two new rules to detect nginx heap buffer overflow and heap spray exploitation attempts targeting the rewrite module's `is_args` stale-state bug (CVE-2026-42945).

**Key Findings**

CVE-2026-42945: nginx Heap Buffer Overflow via Stale `is_args` in Rewrite Module

Successful exploitation allows remote attackers to trigger a heap buffer overflow in nginx's rewrite module by sending crafted URIs containing escapable characters. A length/copy pass mismatch in `ngx_http_script_copy_capture_code()` causes the copy pass to write escaped data into an undersized buffer, leading to heap corruption. This enables denial of service (worker process crash) and, with heap feng shui techniques, potential remote code execution.

We strongly recommend upgrading to nginx 1.30.1 (or later) immediately to address the underlying vulnerability. If you cannot upgrade immediately, avoid `rewrite` directives with `?` in the replacement string followed by `set` or `if` referencing capture groups.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...7e52be73 | N/A            | nginx - Remote Code Execution - Buffer Overread - CVE:CVE-2026-42945 | N/A             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...9df0ee6c | N/A            | nginx - Remote Code Execution - Heap Spray - CVE:CVE-2026-42945      | N/A             | Block      | This is a new detection. |

## 2026-05-11


**WAF Release - 2026-05-11**

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                | Previous Action | New Action | Comments                                                                                                                              |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...68b3c389 | N/A            | Remote Code Execution - Java Deserialization - Body - Beta | Block           | Disabled   | This is a new detection. This rule is merged into the original rule "Remote Code Execution - Java Deserialization" (ID: ...744305c4). |

## 2026-05-07


**WAF and framework adapter mitigations for React and Next.js vulnerabilities**

Multiple security vulnerabilities were disclosed by the React team and Vercel affecting React Server Components and Next.js. These include denial of service, middleware and proxy bypass, server-side request forgery, cross-site scripting, and cache poisoning issues across a range of severity levels.

**We strongly recommend updating your application and its dependencies immediately.** Patched versions are available for React (`react-server-dom-webpack`, `react-server-dom-parcel`, and `react-server-dom-turbopack` `19.0.6`, `19.1.7`, and `19.2.6`) and Next.js (`15.5.16` and `16.2.5`).

#### WAF protections

Cloudflare WAF rules deployed in response to prior React Server Component CVEs ([CVE-2025-55184 ↗](https://github.com/facebook/react/security/advisories/GHSA-2m3v-v2m8-q956) and [CVE-2026-23864 ↗](https://github.com/facebook/react/security/advisories/GHSA-83fc-fqcc-2hmg)) already provide coverage for the newly disclosed denial-of-service vulnerabilities. These rules are enabled by default with a Block action for all customers using the Cloudflare Managed Ruleset, including Free plan customers using the Free Managed Ruleset.

| Ruleset                    | Rule description                                                                                            | Rule ID                          | Default action |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------- |
| Cloudflare Managed Ruleset | React - DoS - [CVE-2025-55184 ↗](https://github.com/facebook/react/security/advisories/GHSA-2m3v-v2m8-q956) | 2694f1610c0b471393b21aef102ec699 | Block          |
| Cloudflare Managed Ruleset | React - DoS - [CVE-2026-23864 ↗](https://github.com/facebook/react/security/advisories/GHSA-83fc-fqcc-2hmg) | aaede80b4d414dc89c443cea61680354 | Block          |

The existing rules detect the underlying attack patterns generically. As a result, they apply to the new [CVE-2026-23870 ↗](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) denial-of-service vulnerability in Server Components and the corresponding Next.js advisory [GHSA-8h8q-6873-q5fj ↗](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj).

Cloudflare is investigating whether WAF rules can be safely and effectively deployed for three of the high-severity advisories: [CVE-2026-23870 ↗](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) / [GHSA-8h8q-6873-q5fj ↗](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj), [GHSA-267c-6grr-h53f ↗](https://github.com/vercel/next.js/security/advisories/GHSA-267c-6grr-h53f), and [GHSA-mg66-mrh9-m8jx ↗](https://github.com/vercel/next.js/security/advisories/GHSA-mg66-mrh9-m8jx). If it is possible to create a managed WAF rule that mitigates these CVEs and does not potentially break application behavior, Cloudflare will add additional managed WAF rules. These rules will be announced through the [WAF changelog](https://developers.cloudflare.com/waf/change-log/changelog/). Because these vulnerabilities were shared with Cloudflare with minimal advance notice, we are still investigating what WAF mitigations are possible.

Several of the disclosed vulnerabilities are not possible to block in WAF. We strongly recommend updating your applications so they are not purely reliant on WAF mitigations.

Customers on Pro, Business, or Enterprise plans should ensure that [Managed Rules are enabled](https://developers.cloudflare.com/waf/get-started/#1-deploy-the-cloudflare-managed-ruleset).

#### Next.js adapters

**Vinext:** [Vinext ↗](https://github.com/cloudflare/vinext) is a Vite plugin that reimplements the Next.js API surface. Vinext's latest release is not vulnerable to any of the disclosed CVEs. Vinext's architecture differs from stock Next.js in ways that sidestep the affected code paths. For example, it does not implement the PPR resume protocol, does not expose Pages Router data-route endpoints, and strips internal headers such as `x-nextjs-data` at request boundaries. As an extra layer of defense, we added a React `19.2.6` or later requirement when running `vinext init` ([PR #1118 ↗](https://github.com/cloudflare/vinext/pull/1118), [PR #1112 ↗](https://github.com/cloudflare/vinext/pull/1112)) to prevent accidentally running a vulnerable version of React with Vinext.

**OpenNext on Cloudflare:** OpenNext is an adapter that lets you deploy Next.js apps to the Cloudflare Workers platform. OpenNext itself is not directly vulnerable to the React denial-of-service CVE, but users must update the Next.js version in their application. The OpenNext team has updated the adapter to further harden against these vectors and released a new version of the Cloudflare adapter. Test fixtures and examples have been updated to use patched versions ([PR #1255 ↗](https://github.com/opennextjs/opennextjs-cloudflare/pull/1255)).

#### Summary of disclosed vulnerabilities

| Advisory                                                                                                                                                                                           | Severity | Issue                                                           | WAF status                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CVE-2026-23870 ↗](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) / [GHSA-8h8q-6873-q5fj ↗](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj) | High     | Denial of service in Server Components                          | **WAF rules in place:** 2694f1610c0b471393b21aef102ec699, aaede80b4d414dc89c443cea61680354Cloudflare is investigating additional managed WAF coverage |
| [GHSA-267c-6grr-h53f ↗](https://github.com/vercel/next.js/security/advisories/GHSA-267c-6grr-h53f)                                                                                                 | High     | Middleware bypass via segment-prefetch routes                   | Cloudflare is investigating if this can be safely and effectively mitigated by a managed WAF rule                                                     |
| [GHSA-mg66-mrh9-m8jx ↗](https://github.com/vercel/next.js/security/advisories/GHSA-mg66-mrh9-m8jx)                                                                                                 | High     | Denial of service via connection exhaustion in Cache Components | Cloudflare is investigating if this can be safely and effectively mitigated by a managed WAF rule                                                     |
| [GHSA-492v-c6pp-mqqv ↗](https://github.com/vercel/next.js/security/advisories/GHSA-492v-c6pp-mqqv)                                                                                                 | High     | Middleware bypass via dynamic route parameter injection         | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-c4j6-fc7j-m34r ↗](https://github.com/vercel/next.js/security/advisories/GHSA-c4j6-fc7j-m34r)                                                                                                 | High     | SSRF via WebSocket upgrades                                     | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-36qx-fr4f-26g5 ↗](https://github.com/vercel/next.js/security/advisories/GHSA-36qx-fr4f-26g5)                                                                                                 | High     | Middleware bypass in Pages Router i18n                          | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-ffhc-5mcf-pf4q ↗](https://github.com/vercel/next.js/security/advisories/GHSA-ffhc-5mcf-pf4q)                                                                                                 | Moderate | XSS via CSP nonces                                              | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-gx5p-jg67-6x7h ↗](https://github.com/vercel/next.js/security/advisories/GHSA-gx5p-jg67-6x7h)                                                                                                 | Moderate | XSS in beforeInteractive scripts                                | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-h64f-5h5j-jqjh ↗](https://github.com/vercel/next.js/security/advisories/GHSA-h64f-5h5j-jqjh)                                                                                                 | Moderate | Denial of service in Image Optimization API                     | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-wfc6-r584-vfw7 ↗](https://github.com/vercel/next.js/security/advisories/GHSA-wfc6-r584-vfw7)                                                                                                 | Moderate | Cache poisoning in RSC responses                                | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-vfv6-92ff-j949 ↗](https://github.com/vercel/next.js/security/advisories/GHSA-vfv6-92ff-j949)                                                                                                 | Low      | Cache poisoning via RSC cache-busting collisions                | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-3g8h-86w9-wvmq ↗](https://github.com/vercel/next.js/security/advisories/GHSA-3g8h-86w9-wvmq)                                                                                                 | Low      | Middleware redirect cache poisoning                             | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |

## 2026-05-07


**WAF Release - 2026-05-07 - Emergency**

This emergency release introduces a new rule to detect Next.js App Router middleware and proxy bypass attempts via segment-prefetch routes (CVE-2026-44575).

**Key Findings**

CVE-2026-44575: Next.js Middleware / Proxy Bypass in App Router Applications via Segment-Prefetch Routes

Successful exploitation allows unauthenticated attackers to bypass middleware or proxy-based authorization checks in affected Next.js App Router applications. This leads to unauthorized access to protected content, potential exposure of sensitive application data, and compromise of application security boundaries.

We strongly recommend upgrading to Next.js 15.5.16 or 16.2.5 (or later) immediately to address the underlying vulnerability. If you cannot upgrade immediately, enforce authorization in the underlying route or page logic instead of relying solely on middleware.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                             | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...e77e4a53 | N/A            | Next.js - Middleware Bypass via Invalid RSC Header - CVE:CVE-2026-44575 | N/A             | Disabled   | This is a new detection. |

## 2026-05-04


**WAF Release - 2026-05-04**

This week's release focuses on new detections to expand coverage across command injection, SQL injection, PHP object injection, remote code execution, and XSS attack vectors.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                    | Previous Action | New Action | Comments                                                                                                                                                                                                                                                                                     |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------- | --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...f0884a68 | N/A            | XSS, HTML Injection - Object Tag - Body (beta)                 | Log             | Block      | This is a new detection. This rule is merged into the original rule "XSS, HTML Injection - Object Tag" (ID: ...0c14e284).                                                                                                                                                                    |
| Cloudflare Managed Ruleset | ...ff012303 | N/A            | XSS, HTML Injection - Object Tag - Headers                     | Log             | Block      | This is a new detection. The rule previously known as "XSS, HTML Injection - Object Tag - Headers (beta)" is now renamed to "XSS, HTML Injection - Object Tag - Headers".                                                                                                                    |
| Cloudflare Managed Ruleset | ...16f921d9 | N/A            | XSS, HTML Injection - Object Tag - URI                         | Log             | Block      | This is a new detection. The rule previously known as "XSS, HTML Injection - Object Tag - URI (beta)" is now renamed to "XSS, HTML Injection - Object Tag - URI".                                                                                                                            |
| Cloudflare Managed Ruleset | ...dc90d21a | N/A            | Command Injection - Generic 9 - Body Vector - Beta             | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 9 - Body Vector" (ID: ...0677175f)                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...f8960375 | N/A            | Command Injection - Generic 9 - Header Vector - Beta           | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 9 - Header Vector" (ID: ...1eb7a999)                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...ef47a800 | N/A            | Command Injection - Generic 9 - URI Vector - Beta              | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 9 - URI Vector" (ID: ...97321c6c)                                                                                                                                                           |
| Cloudflare Managed Ruleset | ...beebf804 | N/A            | Command Injection - Sleep - Body                               | N/A             | Disabled   | This is a new detection. The rule previously known as "Command Injection Sleep" is now renamed to "Command Injection - Sleep - Body".                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...0d257566 | N/A            | Command Injection - Sleep - Headers                            | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...1856fe86 | N/A            | Command Injection - Sleep - URI                                | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...e6e43c37 | N/A            | Fortinet FortiSandbox - Command Injection - CVE:CVE-2026-39808 | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...88118795 | N/A            | Remote Code Execution - Common Bash Bypass - Headers           | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...9299d53b | N/A            | Remote Code Execution - Common Bash Bypass - URI               | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...b0bf33f9 | N/A            | Remote Code Execution - Common Bash Bypass - Body - Beta       | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Remote Code Execution - Common Bash Bypass Body" (ID: ...efb7e5b9). The rule previously known as "Remote Code Execution - Common Bash Bypass Beta" is now renamed to "Remote Code Execution - Common Bash Bypass Body". |
| Cloudflare Managed Ruleset | ...33bfe8b9 | N/A            | PHP Object Injection - 2 - Body - Beta                         | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "PHP Object Injection - 2" (ID: ...161aafdc)                                                                                                                                                                             |
| Cloudflare Managed Ruleset | ...29552387 | N/A            | PHP Object Injection - 2 - Headers                             | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...8104f4c5 | N/A            | PHP Object Injection - 2 - URI                                 | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...6a46201e | N/A            | SQLi - DROP - 2 - Beta                                         | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "SQLi - DROP - 2" (ID: ...48ac2221)                                                                                                                                                                                      |
| Cloudflare Managed Ruleset | ...8b7f85ee | N/A            | SQLi - DROP - 2 - Headers                                      | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...1546b5f0 | N/A            | SQLi - DROP - 2 - URI                                          | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...1e053dce | N/A            | SmarterMail - Remote Code Execution - CVE:CVE-2026-24423       | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                                                     |
| Cloudflare Managed Ruleset | ...d0023a36 | N/A            | SQLi - SELECT Expression - Body                                | Block           | Disabled   | Action changed                                                                                                                                                                                                                                                                               |
| Cloudflare Managed Ruleset | ...26cc211f | N/A            | SQLi - String Concatenation - URI                              | Block           | Disabled   | Action changed                                                                                                                                                                                                                                                                               |

## 2026-04-30


**WAF Release - 2026-04-30 - Emergency**

This emergency release introduces a new rule to block a cPanel & WHM Authentication Bypass related to CVE-2026-41940.

**Key Findings**

* CVE-2026-41940: A critical authentication bypass vulnerability in cPanel & WHM allows unauthenticated remote attackers to bypass authentication mechanisms and gain unauthorized administrative access to the web hosting control panel. This vulnerability affects the session validation logic, enabling attackers to craft malicious requests that circumvent normal authentication checks.

**Impact**

Successful exploitation allows unauthenticated attackers to gain administrative control over affected cPanel & WHM installations. This leads to complete server compromise, potential theft or manipulation of hosted data, and significant service disruption across managed environments.

We strongly recommend applying official vendor patches for cPanel & WHM immediately to address the underlying vulnerability.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                               | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...eb2b9e2f | N/A            | cPanel - Auth Bypass - CVE:CVE-2026-41940 | N/A             | Block      | This is a new detection. |

## 2026-04-27


**WAF Release - 2026-04-27**

This week's release focuses on new improvements to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                  | Previous Action | New Action | Comments                                                                                                                                                                                                                                                            |
| -------------------------- | ----------- | -------------- | -------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...80cec1dd | N/A            | PostgreSQL - SQLi - COPY - Beta              | Log             | Block      | This is a new detection. This rule is merged into the original rule "PostgreSQL - SQLi - COPY - Body (ID: ...e7265a4e). The rule previously known as "PostgreSQL - SQLi - COPY" is now renamed to "PostgreSQL - SQLi - COPY - Body".                                |
| Cloudflare Managed Ruleset | ...2903de89 | N/A            | PostgreSQL - SQLi - COPY - Headers           | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...1036cfa6 | N/A            | PostgreSQL - SQLi - COPY - URI               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...55ff389e | N/A            | SQLi - AND/OR MAKE\_SET/ELT - Beta           | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - AND/OR MAKE\_SET/ELT - Body" (ID: ...252d3934). The rule previously known as "SQLi - AND/OR MAKE\_SET/ELT" is now renamed to "SQLi - AND/OR MAKE\_SET/ELT - Body".                      |
| Cloudflare Managed Ruleset | ...346487f9 | N/A            | SQLi - AND/OR MAKE\_SET/ELT - Headers        | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...1ac6ceca | N/A            | SQLi - AND/OR MAKE\_SET/ELT - URI            | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...dd471337 | N/A            | SQLi - Common Patterns - Beta                | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Common Patterns - Body" (ID: ...cb5d0b9b). The rule previously known as "SQLi - Common Patterns" is now renamed to "SQLi - Common Patterns - Body".                                     |
| Cloudflare Managed Ruleset | ...975c07b7 | N/A            | SQLi - Common Patterns - Headers             | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...05b1b06b | N/A            | SQLi - Common Patterns - URI                 | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...dd0ba3c7 | N/A            | SQLi - Equation - Beta                       | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Equation - Body" (ID: ...c2eb3e7f). The rule previously known as "SQLi - Equation" is now renamed to "SQLi - Equation - Body".                                                          |
| Cloudflare Managed Ruleset | ...3d1c2384 | N/A            | SQLi - Equation - Headers                    | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...e1149ea6 | N/A            | SQLi - Equation - URI                        | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...205adbb0 | N/A            | SQLi - AND/OR Digit Operator Digit - Beta    | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - AND/OR Digit Operator Digit - Body" (ID: ...3893c564). The rule previously known as "SQLi - AND/OR Digit Operator Digit" is now renamed to "SQLi - AND/OR Digit Operator Digit - Body". |
| Cloudflare Managed Ruleset | ...ad2abbaa | N/A            | SQLi - AND/OR Digit Operator Digit - Headers | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...53acbc0d | N/A            | SQLi - AND/OR Digit Operator Digit - URI     | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...2b45a97d | N/A            | SQLi - Benchmark Function - Beta             | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Benchmark Function - Body" (ID: ...2ebc44ad). The rule previously known as "SQLi - Benchmark Function" is now renamed to "SQLi - Benchmark Function - Body".                            |
| Cloudflare Managed Ruleset | ...9889aadc | N/A            | SQLi - Benchmark Function - Headers          | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...491b28e9 | N/A            | SQLi - Benchmark Function - URI              | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...2aa649de | N/A            | SQLi - Comparison - Beta                     | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Comparison - Body" (ID: ...e7907480). The rule previously known as "SQLi - Comparison" is now renamed to "SQLi - Comparison - Body".                                                    |
| Cloudflare Managed Ruleset | ...39e3e013 | N/A            | SQLi - Comparison - Headers                  | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...f4bdb492 | N/A            | SQLi - Comparison - URI                      | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...a1ff3b34 | N/A            | SQLi - String Concatenation - Body - Beta    | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - String Concatenation - Headers" (ID: ...2116d2fe).The rule previously known as "SQLi - String Concatenation - Headers" is now renamed to "SQLi - String Concatenation - Body".          |
| Cloudflare Managed Ruleset | ...0d0e6c3b | N/A            | SQLi - String Concatenation - Headers        | Log             | Block      | This is a new detection.(Former Id was ...846d1940)                                                                                                                                                                                                                 |
| Cloudflare Managed Ruleset | ...26cc211f | N/A            | SQLi - String Concatenation - URI            | Log             | Block      | This is a new detection. (Former Id was ...8fae8c84)                                                                                                                                                                                                                |
| Cloudflare Managed Ruleset | ...eacc78ab | N/A            | SQLi - SELECT Expression - Beta              | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - SELECT Expression - Body" (ID: ...d0023a36). The rule previously known as "SQLi - SELECT Expression" is now renamed to "SQLi - SELECT Expression - Body".                               |
| Cloudflare Managed Ruleset | ...630bb223 | N/A            | SQLi - SELECT Expression - Headers           | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...dcd6efb5 | N/A            | SQLi - SELECT Expression - URI               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...18c47cea | N/A            | SQLi - ORD and ASCII - Beta                  | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - ORD and ASCII- Body" (ID: ...d0d207f9). The rule previously known as "SQLi - ORD and ASCII" is now renamed to "SQLi - ORD and ASCII- Body".                                             |
| Cloudflare Managed Ruleset | ...bdb1618f | N/A            | SQLi - ORD and ASCII - URI                   | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...1d0906b6 | N/A            | SQLi - ORD and ASCII - Headers               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |
| Cloudflare Managed Ruleset | ...9fe4eff5 | N/A            | SQLi - Destructive Operations                | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                            |

## 2026-04-21


**WAF Release - 2026-04-21**

This week's release introduces a new detection for a Remote Code Execution (RCE) vulnerability in Apache ActiveMQ (CVE-2026-34197) and an updated signature for Magento 2 - Unrestricted File Upload. Alongside these detections, we are continuing our work on rule refinements to provide deeper security insights for our customers.

**Key Findings**

* Apache ActiveMQ (CVE-2026-34197): A vulnerability in Apache ActiveMQ allows an unauthenticated, remote attacker to execute arbitrary code. This flaw occurs during the processing of specially crafted network packets, leading to potential full system compromise.
* Magento 2 - Unrestricted File Upload - 2: This is a follow-up enhancement to our existing protections for Magento and Adobe Commerce.

**Impact**

Successful exploitation of these vulnerabilities could allow unauthenticated attackers to execute arbitrary code or gain full administrative control over affected servers. We strongly recommend applying official vendor patches for Apache ActiveMQ and Magento to address the underlying vulnerabilities.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                            | Previous Action | New Action | Comments                                                                                                                                                                                                                                                        |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...ee159e2e | N/A            | Command Injection - Generic 8 - uri                                    | Log             | Block      | This is a new detection. Previous description was "Command Injection - Generic 8 - uri - Beta"                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...a15308cf | N/A            | Command Injection - Generic 8 - body - Beta                            | Disabled        | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 8 - body" (ID: ...413592e2). The rule previously known as "Command Injection - Generic 8" is now renamed to "Command Injection - Generic 8 - body".            |
| Cloudflare Managed Ruleset | ...958047ed | N/A            | MySQL - SQLi - Executable Comment - Beta                               | Log             | Block      | This is a new detection. This rule is merged into the original rule "MySQL - SQLi - Executable Comment - Body" (ID: ...7bd2d8fa) The rule previously known as "MySQL - SQLi - Executable Comment" is now renamed to "MySQL - SQLi - Executable Comment - Body". |
| Cloudflare Managed Ruleset | ...582cc559 | N/A            | MySQL - SQLi - Executable Comment - Headers                            | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...a16639d3 | N/A            | MySQL - SQLi - Executable Comment - URI                                | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...44f24211 | N/A            | Magento 2 - Unrestricted file upload - 2                               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...bf170a17 | N/A            | Apache ActiveMQ - Remote Code Execution - CVE:CVE-2026-34197           | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...8c2ac1a7 | N/A            | SQLi - Sleep Function - Beta                                           | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Sleep Function" (ID: ...f77e8d54)                                                                                                                                                   |
| Cloudflare Managed Ruleset | ...4dacaeb8 | N/A            | SQLi - Sleep Function - Headers                                        | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...ed4c9ece | N/A            | SQLi - Sleep Function - URI                                            | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...1dfa64df | N/A            | SQLi - Probing - uri                                                   | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...4c62e2e7 | N/A            | SQLi - Probing - header                                                | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...aab28ea1 | N/A            | SQLi - Probing - body                                                  | Disabled        | Disabled   | This is a new detection. This rule is merged into the original rule "SQLi - Probing" (ID: ...b4026c88)                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...20999be0 | N/A            | SQLi - Probing 2                                                       | Disabled        | Disabled   | This rule had duplicate detection logic and has been deprecated.                                                                                                                                                                                                |
| Cloudflare Managed Ruleset | ...d7aa0008 | N/A            | SQLi - UNION in MSSQL - Body                                           | Disabled        | Disabled   | This rule has been renamed to differentiate from "SQLi - UNION in MSSQL" (ID: ...ee5e35fd) and contains updated rule logic.                                                                                                                                     |
| Cloudflare Managed Ruleset | ...a67d8561 | N/A            | SQLi - UNION - 3                                                       | Disabled        | Disabled   | This rule had duplicate detection logic and has been deprecated.                                                                                                                                                                                                |
| Cloudflare Managed Ruleset | ...0af34bba | N/A            | XSS, HTML Injection - Embed Tag - URI                                  | Disabled        | Disabled   | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...70282f38 | N/A            | XSS, HTML Injection - Embed Tag - Headers                              | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...23f4d718 | N/A            | XSS, HTML Injection - IFrame Tag - Src and Srcdoc Attributes - Headers | Log             | Disabled   | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...6978def1 | N/A            | XSS, HTML Injection - Link Tag - Headers                               | Log             | Disabled   | This is a new detection.                                                                                                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...ebd81645 | N/A            | XSS, HTML Injection - Link Tag - URI                                   | Disabled        | Disabled   | This is a new detection.                                                                                                                                                                                                                                        |

## 2026-04-15


**WAF Release - 2026-04-15**

This week's release introduces a new detection for a critical Remote Code Execution (RCE) vulnerability in Mesop (CVE-2026-33057), alongside protections for high-impact vulnerabilities in Cisco Secure Firewall Management Center (CVE-2026-20079) and FortiClient EMS (CVE-2026-21643). Additionally, this release includes an update to our existing React Server DoS coverage to address recently identified resource exhaustion vectors (CVE-2026-23869).

**Key Findings**

* Cisco Secure FMC (CVE-2026-20079): A vulnerability in the web-based management interface of Cisco Secure Firewall Management Center (FMC) that allows an unauthenticated, remote attacker to execute arbitrary commands or bypass security filters.
* FortiClient EMS (CVE-2026-21643): A critical vulnerability in the FortiClient EMS permitting unauthorized access or administrative configuration manipulation via crafted HTTP requests.
* Mesop (CVE-2026-33057): A vulnerability in the Mesop Python-based UI framework where unauthenticated attackers can execute arbitrary code by sending specially crafted, Base64-encoded payloads in the request body.

**Impact**

Successful exploitation of these vulnerabilities could allow unauthenticated attackers to execute arbitrary code, gain administrative control over network management infrastructure, or trigger server-side resource exhaustion. Administrators are strongly encouraged to apply official vendor updates.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                                                                                                         |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...aef9415b | N/A            | Cisco Secure FMC - RCE via upgradeReadinessCall - CVE:CVE-2026-20079 | Log             | Block      | This is a new detection.                                                                                         |
| Cloudflare Managed Ruleset | ...ee7be621 | N/A            | FortiClient EMS - Pre-Auth SQL Injection - CVE:CVE-2026-21643        | Log             | Block      | This is a new detection.                                                                                         |
| Cloudflare Managed Ruleset | ...c953a72b | N/A            | Mesop - Remote Code Execution - Base64 Payload - CVE:CVE-2026-33057  | Log             | Block      | This is a new detection.                                                                                         |
| Cloudflare Managed Ruleset | ...50c08f6f | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 1 - Beta                   | Log             | Block      | This rule has been merged into the original rule "React Server - DOS - CVE:CVE-2026-23864 - 1" (ID: ...61680354) |
| Cloudflare Managed Ruleset | ...ebd81645 | N/A            | XSS, HTML Injection - Link Tag - URI (beta)                          | N/A             | Disabled   | This is a new detection.                                                                                         |
| Cloudflare Managed Ruleset | ...0af34bba | N/A            | XSS, HTML Injection - Embed Tag - URI (beta)                         | N/A             | Disabled   | This is a new detection.                                                                                         |

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/change-log/changelog/#page","headline":"Changelog · Cloudflare Web Application Firewall (WAF) docs","description":"This release moves four new detections from Log to Block, merges the XSS, HTML Injection - Script Tag - Beta rule into the original rule, and adds a Generic Rules - Remote Code Execution rule in Block mode.","url":"https://developers.cloudflare.com/waf/change-log/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
