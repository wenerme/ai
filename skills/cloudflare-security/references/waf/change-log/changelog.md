---
description: This emergency release adds a new rule to the Cloudflare Managed Ruleset, disabled by default, for a vulnerability in Nuxt Image and IPX. The rule offers partial coverage. Please follow the advisory and patch to the latest version.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# Changelog

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/change-log/changelog/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/waf.xml)

## 2026-10-30


**WAF Release - 2026-10-30 - Emergency**

This emergency release adds a new rule to the Cloudflare Managed Ruleset, disabled by default, for a vulnerability in Nuxt Image and IPX. The rule offers partial coverage. Please follow the advisory and patch to the latest version.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...5b82bffe | N/A | Nuxt Image / IPX - Explicit GIF or Animation Modifier Exposure | N/A | Disabled | This is a new detection. |

## 2026-10-30


**WAF Release - 2026-10-30**

This release introduces updates to the underlying rule expressions for PHP out-of-memory (OOM) vulnerabilities CVE-2026-109618, CVE-2026-109619 and CVE-2026-115560. The improvements are iterative changes based on reports from Security Researchers as part of [PHP Capture the Flag (CTF) challenge ↗︎](https://blog.cloudflare.com/php-ctf).

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...545d163c | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #3 | Block | Block | Rule detection updated. |
| Cloudflare Free Ruleset | ...82dab691 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #3 | Block | Block | Rule detection updated. |
| Cloudflare Managed Ruleset | ...212afcc9 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #4 | Block | Block | Rule detection updated. |
| Cloudflare Free Ruleset | ...24b1a4c6 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #4 | Block | Block | Rule detection updated. |
| Cloudflare Response Ruleset | ...48d2242a | N/A | Default block for High confidence Signatures | Block | Block | Rule detection updated. |

## 2026-10-28


**WAF Release - 2026-10-28**

This release introduces updates to the underlying rule expressions for PHP out-of-memory (OOM) vulnerabilities CVE-2026-109618, CVE-2026-109619 and CVE-2026-115560. The improvements are iterative changes based on reports from Security Researchers as part of [PHP Capture the Flag (CTF) challenge ↗︎](https://blog.cloudflare.com/php-ctf).

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...9d9c073d | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619, CVE-2026-115560) #6 | Block | Block | Rule detection updated. |
| Cloudflare Free Ruleset | ...7975ce1b | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619, CVE-2026-115560) #6 | Block | Block | Rule detection updated. |

## 2026-10-25


**WAF Release - 2026-10-25 - Emergency - Cloudflare Managed Ruleset**

This emergency release will add two rules related to the Brotli vulnerability **CVE-2026-111497** to the Cloudflare Managed Ruleset. Both rules will be **enabled by default** with their action set to **Log**, providing visibility into matching requests so customers can evaluate the impact before choosing to block them.

**Rule behavior**

- **Brotli rule:** Matches incoming requests that declare Brotli request-body encoding ( `Content-Encoding: br`), including legitimate clients submitting Brotli-encoded request bodies. It does not match `Accept-Encoding: br` or affect Cloudflare's Brotli response-compression settings. The rule's default action is **Log**.
- **Next.js rule:** Matches requests to the Next.js image optimization endpoint ( `/_next/image`), including legitimate image optimization traffic. The default action is **Log** and does not block requests. Changing the action to **Block** may prevent optimized images from loading and disrupt image delivery for applications using this endpoint.

**Default behavior**

- Both rules will log matching requests without blocking them when the ruleset defaults are used.
- Customers will be able to review matches in analytics and configure a blocking action for either rule if desired.
- Enabling these rules in **Log** mode provides visibility only; it does not block requests matching these rules.

**Important: Check existing action overrides**

If you have configured a ruleset-level action override that applies **Block** to these rules, matching requests may be blocked as soon as the rules are deployed, despite their default **Log** action. This may result in false positives and block legitimate traffic.

Review your existing ruleset overrides before deployment. If you want to evaluate these rules without blocking traffic, configure rule-specific overrides to use **Log** and review matching requests before switching to **Block**.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...ca706f3c | N/A | Brotli - Request Content-Encoding - CVE:CVE-2026-111497 | N/A | Log | This is a new detection. |
| Cloudflare Managed Ruleset | ...402fe5bb | N/A | Next.js - Image Optimizer Path - CVE:CVE-2026-111497 | N/A | Log | This is a new detection. |

## 2026-10-22


**WAF Release - 2026-10-22 - Emergency - Cloudflare Managed Ruleset**

This emergency release updates the names and metadata of seven existing rules in the Cloudflare Managed Ruleset to identify CVE-2026-109618 and CVE-2026-109619. Detection logic and rule actions remain unchanged.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...c438d5dd | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...0a0c2f64 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #2 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...545d163c | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #3 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...212afcc9 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #4 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...1867b12e | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #5 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...9d9c073d | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #6 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...48143645 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #7 | Block | N/A | Rule metadata description refined. Detection unchanged. |

For more information, refer to [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

## 2026-10-22


**WAF Release - 2026-10-22 - Emergency - Cloudflare Free Ruleset**

This emergency release updates the names and metadata of seven existing rules in the Cloudflare Free Ruleset to identify CVE-2026-109618 and CVE-2026-109619. Detection logic and rule actions remain unchanged.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Free Ruleset | ...b5ccf32f | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...bcd95984 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #2 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...82dab691 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #3 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...24b1a4c6 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #4 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...302ede46 | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #5 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...7975ce1b | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #6 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...e8d613fa | N/A | PHP Remote Code Execution Attack (CVE-2026-109618, CVE-2026-109619) #7 | Block | N/A | Rule metadata description refined. Detection unchanged. |

For more information, refer to [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

## 2026-10-21


**WAF Release - 2026-10-21 - Emergency - Cloudflare Managed Ruleset**

This emergency release adds seven rules to the Cloudflare Managed Ruleset to detect anomalous request patterns.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...c438d5dd | N/A | Generic Rules - Anomalous Execution - 1 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...0a0c2f64 | N/A | Generic Rules - Anomalous Execution - 2 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...545d163c | N/A | Generic Rules - Anomalous Execution - 3 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...212afcc9 | N/A | Generic Rules - Anomalous Execution - 4 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...1867b12e | N/A | Generic Rules - Anomalous Execution - 5 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...9d9c073d | N/A | Generic Rules - Anomalous Execution - 6 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...48143645 | N/A | Generic Rules - Anomalous Execution - 7 | N/A | Block | This is a new detection. |

For more information, refer to [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

## 2026-10-21


**WAF Release - 2026-10-21 - Emergency - Cloudflare Free Ruleset**

This emergency release adds seven rules to the Cloudflare Free Ruleset to block anomalous request patterns.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Free Ruleset | ...b5ccf32f | N/A | Generic Rules - Anomalous Execution - 1 | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...bcd95984 | N/A | Generic Rules - Anomalous Execution - 2 | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...82dab691 | N/A | Generic Rules - Anomalous Execution - 3 | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...24b1a4c6 | N/A | Generic Rules - Anomalous Execution - 4 | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...302ede46 | N/A | Generic Rules - Anomalous Execution - 5 | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...7975ce1b | N/A | Generic Rules - Anomalous Execution - 6 | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...e8d613fa | N/A | Generic Rules - Anomalous Execution - 7 | N/A | Block | This is a new detection. |

For more information, refer to [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

## 2026-10-14


**WAF Release - 2026-10-14 - Emergency**

This emergency release adds a new managed rule to block active exploitation of a critical remote code execution (RCE) vulnerability found in popular web frameworks.

**Key Findings**

Key Findings

- Generic Rules - Remote Code Execution: Attackers can execute arbitrary system commands with web server privileges by sending malicious input containing invalid path sequences during request processing.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...fd1bf420 | N/A | Generic Rules - Remote Code Execution | N/A | Block | This is a new detection. |

## 2026-10-12


**WAF Release - 2026-10-12**

This release introduces new detections to mitigate recent vulnerabilities affecting TanStack and Atlassian products.

**Key Findings**

- CVE-2026-102989: A reflected Cross-Site Scripting (XSS) vulnerability affecting TanStack. Unauthenticated attackers can exploit this flaw to inject malicious scripts into web pages viewed by other users, potentially leading to session hijacking or unauthorized actions.
- CVE-2026-21589: An arbitrary file access vulnerability affecting Atlassian products. Threat actors can exploit this flaw to read unauthorized files on the target system, risking the exposure of sensitive configuration data.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...02751ef3 | N/A | Generic Rules - Template Injection - 2 - Beta | Disabled | Disabled | This rule is merged into the original rule "Generic Rules - Template Injection - 2" (ID: ...d3ed0123). |
| Cloudflare Managed Ruleset | ...4ee560b2 | N/A | TanStack - Reflected XSS - CVE:CVE-2026-102989 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...e919cd31 | N/A | Atlassian - Arbitrary File Access - CVE:CVE-2026-21589 | N/A | Block | This is a new detection. |

## 2026-10-09


**Failed detections field available in Rules**

You can now use `cf.appsec.request.failed_detections` to control how your rules handle requests when a security detection reports a failure.

The field is an `Array<String>` of detection IDs that reports failures from content scanning, WAF attack score, attack signature detection, leaked credentials detection, and AI prompt detections for personally identifiable information (PII), prompt injection, custom topics, and unsafe topics.

The field does not alter the existing behavior of detections. Use it in rules to choose how to handle requests with reported failures.

When no failures are reported, the field returns `[]`. You can use it on all plans, but your plan must still include the detections and rule features you want to use.

Supported rules:

- Custom rules at the zone and account levels
- Rate limiting rules at the zone and account levels
- Request Header Transform Rules at the zone level

Match any reported failure:

```txt
len(cf.appsec.request.failed_detections) gt 0
```

Match a reported leaked credentials detection failure:

```txt
any(cf.appsec.request.failed_detections[*] eq "waf_credential_check")
```

For more information, refer to the [Failed detections field reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.appsec.request.failed_detections/).

## 2026-10-07


**Updated unsafe topic detection for AI Security for Apps**

AI Security for Apps now supports an updated set of categories for detecting unsafe topics in incoming prompts.

The values available in [`cf.llm.prompt.unsafe_topic_categories`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_categories/) have changed. Existing WAF custom rules remain valid, but rules that reference a removed or renamed category will no longer match that category. Review any rules that use this field and update their expressions to use the currently supported values.

For category descriptions and configuration guidance, refer to [Unsafe topics](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/).

## 2026-10-06


**WAF Release - 2026-10-06**

This release introduces a new detection to mitigate a heap-based buffer overflow vulnerability in F5 BIG-IP, and enhances existing command injection protections by incorporating tested beta logic into the baseline rule.

**Key Findings**

- CVE-2026-94127: A heap-based buffer overflow vulnerability in F5 BIG-IP. Attackers can exploit this flaw to execute arbitrary code on the affected system.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...a056caff | N/A | Command Injection - Generic 8 - uri - Beta | Log | Block | This rule is merged into the original rule "Command Injection - Generic 8 - uri" (ID: ...ee159e2e). |
| Cloudflare Managed Ruleset | ...7206c737 | N/A | F5 BIG-IP - UnAuth Heap-Overflow - CVE:CVE-2026-94127 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...549f7356 | N/A | Next.js - Cache Poisoning - CVE:CVE-2026-94543 | Block | Block | Rule metadata description refined. Detection unchanged. |

## 2026-10-01


**WAF Release - 2026-10-01 - Emergency**

This update provides immediate defense against a vulnerability affecting Citrix NetScaler ADC and Gateway appliances, deploying protection against improper input validation vectors.

**Key Findings**

- CVE-2026-88771: An improper input validation vulnerability affecting Citrix NetScaler ADC and Gateway allows an unauthenticated attacker to execute arbitrary commands.

**Impact**

We strongly recommend that administrators apply the latest versions to fully secure origin servers. Additionally, customers should review configurations against applicable preconditions and follow standard incident response processes if signs of compromise are identified.

Detailed Rule Changes

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...827ab216 | N/A | Citrix Netscaler ADC and Gateway - Improper input validation - CVE:CVE-2026-88771 | N/A | Block | This is a new detection. |

## 2026-09-30


**WAF Release - 2026-09-30**

This release introduces new detections to enhance protection against a specific GitLab path traversal vulnerability, alongside advanced generic rules targeting HTTP request smuggling, directory traversal, and command injection attempts.

**Key Findings**

- CVE-2026-85706: A path traversal vulnerability affecting GitLab.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...cb14ded8 | N/A | Broken Access Control - Directory Traversal | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...0364bd7e | N/A | HTTP Request Smuggling - Request Body Anomaly - Beta | Log | Block | This rule is merged into the original rule "HTTP/2 Request Smuggling - Request Body Anomaly" (ID: ...1489d892). |
| Cloudflare Managed Ruleset | ...d498a69a | N/A | Command Injection - Generic 8 - body - Beta | Disabled | Disabled | This rule is merged into the original rule "Command Injection - Generic 8 - body" (ID: ...413592e2). |
| Cloudflare Managed Ruleset | ...87ae8cfc | N/A | GitLab - Path Traversal- CVE:CVE-2026-85706 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...549f7356 | N/A | Generic - Request routing cache inconsistency | N/A | Block | This is a new detection. |

## 2026-09-25


**WAF Release - 2026-09-25 - Emergency**

This update provides immediate defense against critical vulnerabilities affecting WordPress and JFrog Artifactory, including path traversal, local file inclusion (LFI), cross-site scripting (XSS), and authentication bypass exploits.

**Key Findings**

- CVE-2026-87902: A high-severity Path Traversal and Local File Inclusion (LFI) vulnerability affecting WordPress. Unauthenticated attackers can exploit this flaw to read arbitrary files on the host server, potentially exposing sensitive configuration data or system files.
- CVE-2026-42018 & CVE-2026-82329: Critical authentication bypass vulnerabilities affecting JFrog Artifactory. Successful exploitation allows unauthenticated attackers to bypass security controls and achieve unauthorized access to the Artifactory instance.

**Impact**

We strongly recommend that administrators apply the latest vendor patches for WordPress and JFrog Artifactory to fully secure origin servers.

Detailed Rule Changes

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...70a43f96 | N/A | Wordpress - Path Traversal, Local File Inclusion - CVE:CVE-2026-87902 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...909a4db4 | N/A | Wordpress - XSS - Comment | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...c797ef03 | N/A | JFrog Artifactory - Authentication Bypass - CVE:CVE-2026-42018 | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...a813ac74 | N/A | JFrog Artifactory - Authentication Bypass - CVE:CVE-2026-82329 | N/A | Block | This is a new detection. |

## 2026-09-22


**WAF Release - 2026-09-22**

This release introduces new threat detections to enhance protection against Server-Side Request Forgery (SSRF) attempts using non-standard IP notations or jar loopback payloads, alongside new defenses against Server-Side Template Injection (SSTI) targeting Jinja environments.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...5f21b651 | N/A | SSRF - Cloud,Link-Local non-standard IP notation | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...0f0313d6 | N/A | SSRF - Block jar HTTP loopback payload | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...75cd912a | N/A | SSRF - Local non-standard IP notation | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...a1ba83f6 | N/A | SSTI - Jinja Dangerous Globals Chain | Log | Block | This is a new detection. |

## 2026-09-15


**WAF Release - 2026-09-15**

This release introduces new threat detections to enhance protection against command injection attempts, Server-Side Request Forgery (SSRF) targeting cloud metadata, and information disclosure within version control history.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...ca453d31 | N/A | SSRF - Cloud - 3 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...e540f17f | N/A | Version Control - Information Disclosure - Beta | Log | Block | This rule is merged into the original rule "Version Control - Information Disclosure" (ID: ...0550c529). |
| Cloudflare Managed Ruleset | ...ba458b4b | N/A | Command Injection - Generic 10 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...7b58420b | N/A | XSS, HTML Injection - Script Tag | Block | Block | Reverts the detection changes introduced on August 25, 2026 |

## 2026-09-10


**WAF Release - 2026-09-10 - Emergency**

This update provides immediate defense against a high-severity, actively exploited zero-day vulnerability targeting Adobe Commerce and Magento Open Source storefronts.

**Key Findings**

- Adobe Commerce and Magento RCE (CVE-2026-75650 / "StyleSmuggler"): Unauthenticated Remote Code Execution (RCE) vulnerability caused by improper neutralization of special elements in the platform's template engine. Unauthenticated attackers can inject arbitrary PHP payloads through style properties to execute system commands and deploy persistent malware.

**Impact**

This emergency rule provides immediate edge-level mitigation and virtual patching, origin applications must be urgently updated. We strongly recommend to apply the hotfix outlined in Adobe Security Bulletin [APSB26-146](https://experienceleague.adobe.com/en/docs/commerce-knowledge-base/kb/announcements/commerce-apsb26-146) and immediately rotate all potentially exposed encryption keys, integration tokens, and system credentials, as patching alone does not remediate an existing compromise.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...440f5c55 | N/A | Adobe Commerce - Remote Code Execution - CVE:CVE-2026-75650 | N/A | Block | This is a new detection. |

## 2026-09-08


**WAF Release - 2026-09-08**

This release enhances detection logic for existing rules targeting Next.js remote code execution (RCE) vulnerabilities by consolidating active beta rules into baseline signatures.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...c76ba662 | N/A | Next.js - Image Optimizer Remote Code Execution via Crafted AVIF - Beta | Log | Block | This rule is merged into the original rule "Next.js - Image Optimizer Remote Code Execution via Crafted AVIF" (ID: ...80256efe). |
| Cloudflare Managed Ruleset | ...208457cf | N/A | Next.js - Remote Code Execution - CVE:CVE-2026-75604 - Beta | Log | Block | This rule is merged into the original rule "Next.js - Remote Code Execution - CVE:CVE-2026-75604" (ID: ...2ca6cce3). |

## 2026-09-07


**Enforce positive security with Application Profiles**

Application Profiles add a positive-security layer to Cloudflare WAF. Instead of looking only for requests that resemble known attacks, Application Profiles learn what valid requests to your application look like and identify traffic that deviates from the expected structure.

The first available profile type, Schema Profiles, can learn path variables, query parameters, headers, cookies, JSON bodies, and form-encoded bodies. Profiles model field types and constraints such as numeric ranges, string lengths, and character classes. After a profile becomes available, an always-on detection classifies requests as conforming or non-conforming without blocking traffic.

Use **Profile Analysis** in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to review conformance trends and sampled violation details before enforcing a profile. When you are ready to mitigate traffic, use a [Custom Rule](https://developers.cloudflare.com/waf/custom-rules/) to scope enforcement by hostname, path, operation, or other security signals such as Attack Score.

Customers with API Security already have access to Schema Profiles through Schema Learning and Schema Validation. Cloudflare is also opening a closed beta to invited Enterprise customers without API Security. Contact your Cloudflare account team to express interest.

For more information, refer to [Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/).

## 2026-09-07


**Attack Signature Detection is now available in Early Access**

Attack Signature Detection is now available in Early Access. It evaluates requests against Cloudflare attack signatures and records matches without applying a mitigation action, allowing you to investigate detected traffic before deciding how to respond.

In **Security Analytics** > **Attack Analysis**, you can review matching signature references, categories, confidence levels, and request outcomes. You can then use these fields in [Security Rules](https://developers.cloudflare.com/security/rules/) and combine them with request properties such as hostname, path, and HTTP method to apply scoped mitigation.

Attack Signature Detection uses the same signature definitions as [Cloudflare Managed Rules](https://developers.cloudflare.com/waf/managed-rules/), but it does not inherit your Managed Rules actions, overrides, or deployment configuration. Managed Rules remain the recommended baseline protection during Early Access.

Contact your Cloudflare account team to request access. For more information, refer to [Attack Signature Detection](https://developers.cloudflare.com/waf/detections/attack-signature-detection/).

## 2026-09-01


**Updated PII detection for AI Security for Apps**

AI Security for Apps now supports an updated set of categories for detecting personally identifiable information (PII) in incoming prompts.

The values available in [`cf.llm.prompt.pii_categories`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_categories/) have changed. Existing WAF custom rules remain valid, but rules that reference a removed or renamed category will no longer match that category. Review any rules that use this field and update their expressions to use the currently supported values.

For the complete category list and configuration guidance, refer to [PII detection](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/pii-detection/).

## 2026-09-01


**WAF Release - 2026-09-01**

This release introduces a new threat detection to enhance protection against SQL injection (SQLi) attempts exploiting complex query syntax.

**Key Findings**

- SQLi Protection: Improved coverage for SQL injection patterns involving WHERE comparisons combined with WITH clauses.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...bcfa0966 | N/A | SQLi - WHERE Comparison With WITH Clause | Log | Block | This is a new detection. |

## 2026-08-26


**WAF Release - 2026-08-26 - Emergency**

This emergency release updates an existing Next.js remote code execution rule to identify CVE-2026-75604 and adds a new rule for remote code execution in the Next.js Image Optimizer via crafted AVIF images.

**Key Findings**

- CVE-2026-75604 affects Windows-hosted Next.js applications using both the Pages Router and App Router without Cache Components and can lead to unauthenticated remote code execution.
- GHSA-2xp9-vwfh-vxw4 affects the Next.js Image Optimizer and can lead to unauthenticated remote code execution when it optimizes an attacker-controlled AVIF image.

**Impact**

Next.js recommends updating to version 16.3.3 or 15.5.24 to address these vulnerabilities.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...2ca6cce3 | N/A | Next.js - Remote Code Execution - CVE:CVE-2026-75604 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...80256efe | N/A | Next.js - Image Optimizer Remote Code Execution via Crafted AVIF | N/A | Block | This is a new detection. |

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/change-log/changelog/#page","headline":"Changelog","description":"This emergency release adds a new rule to the Cloudflare Managed Ruleset, disabled by default, for a vulnerability in Nuxt Image and IPX. The rule offers partial coverage. Please follow the advisory and patch to the latest version.","url":"https://developers.cloudflare.com/waf/change-log/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
