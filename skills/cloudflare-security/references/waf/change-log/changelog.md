---
description: AI Security for Apps now supports an updated set of categories for detecting unsafe topics in incoming prompts.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# Changelog

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/change-log/changelog/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/waf.xml)

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

## 2026-08-25


**WAF Release - 2026-08-25**

This release moves four new detections from Log to Block, merges the XSS, HTML Injection - Script Tag - Beta rule into the original rule, and adds a Generic Rules - Remote Code Execution rule in Block mode.

**Key Findings**

- Four new detections move from Log to Block: HTTP/2 Request Smuggling - Request Body Anomaly and XSS - JavaScript Event Handler Coercion across Headers, Body, and URI.
- The XSS, HTML Injection - Script Tag - Beta rule is merged into the original rule.
- A Generic Rules - Remote Code Execution detection is added in Block mode.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...1489d892 | N/A | HTTP/2 Request Smuggling - Request Body Anomaly | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...20646260 | N/A | XSS - JavaScript Event Handler Coercion - Headers | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...d706d517 | N/A | XSS - JavaScript Event Handler Coercion - Body | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...660886c8 | N/A | XSS - JavaScript Event Handler Coercion - URI | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...c293b926 | N/A | XSS, HTML Injection - Script Tag - Beta | Log | Block | This rule is merged into the original rule "XSS, HTML Injection - Script Tag" (ID: ...7b58420b). |
| Cloudflare Managed Ruleset | ...2ca6cce3 | N/A | Generic Rules - Remote Code Execution | N/A | Block | This is a new detection. |

## 2026-08-20


**Leaked credentials detection now scans Authorization headers**

[Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) now scans the `Authorization` request header for Basic Authentication credentials. Previously, the detection only inspected request bodies, query strings, and headers for well-known web applications or custom detection locations, which meant credentials sent through HTTP Basic Authentication were not covered by default.

This new default scan location decodes the `Authorization: Basic <credentials>` header and compares the extracted username and password against Cloudflare's database of leaked credentials, the same way as other default scan locations. Matches populate the existing [leaked credentials fields](https://developers.cloudflare.com/waf/detections/leaked-credentials/#leaked-credentials-fields), such as `cf.waf.credential_check.password_leaked`, and trigger the [`Exposed-Credential-Check` managed transform header](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-leaked-credentials-checks-header) if configured, so you can reuse existing [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) without changes.

This change was applied automatically for zones with leaked credentials detection enabled. No configuration changes are required.

For more information, refer to [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/).

## 2026-08-17


**WAF Release - 2026-08-17**

This release updates WordPress remote code execution rule metadata in the Cloudflare Managed Ruleset and Cloudflare Free Ruleset to identify CVE-2026-65640.

**Key Findings**

- CVE-2026-65640: A remote code execution vulnerability affecting WordPress core and plugin components. Remote, unauthenticated attackers can execute arbitrary system commands to gain unauthorized access or establish backdoors on host servers.

**Impact**

The WordPress changes update rule metadata only; detection behavior and actions remain unchanged.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...3590a4ad | N/A | Wordpress - Remote Code Execution - CVE:CVE-2026-65640 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...cfe1a93c | N/A | Wordpress - Remote Code Execution - CVE:CVE-2026-65640 | Block | N/A | Rule metadata description refined. Detection unchanged. |

## 2026-08-11


**WAF Release - 2026-08-11**

This release introduces new protection for a remote code execution vulnerability in vBulletin and improves two existing detections.

**Key Findings**

- A new detection provides protection against vBulletin CVE-2026-61511.
- Two existing detections have been improved to strengthen coverage.

**Impact**

Successful exploitation of CVE-2026-61511 may lead to remote code execution on affected vBulletin systems, potentially resulting in unauthorized access, data exposure, service disruption, and broader compromise of the hosting environment. Administrators are strongly encouraged to apply vendor updates and recommended mitigations.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...94f3006b | N/A | vBulletin - Remote Code Execution - CVE:CVE-2026-61511 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...098b749e | N/A | Version Control - Information Disclosure - Beta | Log | Block | This rule is merged into the original rule "Version Control - Information Disclosure" (ID: ...0550c529) |
| Cloudflare Managed Ruleset | ...d56225d8 | N/A | vBulletin - Code Injection - Invalid image format - CVE:CVE-2019-17132 - Beta | Log | Block | This rule is merged into the original rule "vBulletin - Code Injection - Invalid image format - CVE:CVE-2019-17132" (ID: ...8fe9f1c7) |

## 2026-08-07


**WAF Release - 2026-08-07**

This release updates WordPress XSS rule metadata in the Cloudflare Managed Ruleset and Cloudflare Free Ruleset to identify XSS2Shell (CVE-2026-64638). It also disables the Command Injection - Obfuscation rule.

**Key Findings**

- CVE-2026-64638: A pre-authentication reflected cross-site scripting vulnerability affecting the WordPress login screen. Exploitation requires social engineering and explicit interaction by the target user. Under additional conditions, it may be escalated to remote code execution.

**Impact**

The WordPress changes update rule metadata only; detection behavior and actions remain unchanged.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...9c6dff1c | N/A | Wordpress - XSS - CVE:CVE-2026-64638 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Free Ruleset | ...9ab5ed95 | N/A | Wordpress - XSS - CVE:CVE-2026-64638 | Block | N/A | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...761e7a4c | N/A | Command Injection - Obfuscation | Block | Disabled | Detection logic has been deprecated |

## 2026-08-04


**WAF Release - 2026-08-04**

This release introduces new rules and updates Microsoft SharePoint RCE alongside enhanced SSRF cloud protection rule actions.

**Key Findings**

- CVE-2026-50522: An insecure deserialization vulnerability in Microsoft SharePoint Server. This may allow an unauthenticated attacker to execute arbitrary code using crafted requests.
- CVE-2026-66066: An improper input processing vulnerability in Ruby on Rails Active Storage image variant transformations. This may allow an unauthenticated attacker to perform arbitrary file reads and achieve Remote Code Execution (RCE) using maliciously crafted payload requests.
- Generic Cloud Protections: Added improved detection logic targeting Server-Side Request Forgery (SSRF) in cloud-hosted applications.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...052b07cf | N/A | Microsoft SharePoint - Remote Code Execution - CVE:CVE-2026-50522 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...3a5b40d6 | N/A | Rails - Arbitrary File Read & RCE - CVE:CVE-2026-66066 | Block | Block | This was labeled as File Upload - RCE. |
| Cloudflare Managed Ruleset | ...743a63ec | N/A | SSRF - Local - 2 - Beta | Disabled | - | This detection has been removed. |
| Cloudflare Managed Ruleset | ...c2e84e2d | N/A | SSRF - Cloud - Beta | Disabled | - | This detection has been removed. |
| Cloudflare Managed Ruleset | ...ab8af26f | N/A | SSRF - Cloud - 2 - Beta | Disabled | - | This detection has been removed. |
| Cloudflare Managed Ruleset | ...25ba9d7c | N/A | SSRF - Cloud | Disabled | Block | We are changing the action for this rule from Disabled to BLOCK |
| Cloudflare Managed Ruleset | ...01a076eb | N/A | SSRF - Local - Beta | Disabled | - | This detection has been removed. |

## 2026-07-29


**WAF Release - 2026-07-29**

This release introduces new rules and updates existing threat signatures to provide targeted protections for vulnerabilities in Nuxt Server Island components and Alibaba Fastjson deserialization routines, alongside enhanced protections for cloud metadata Server-Side Request Forgery (SSRF) and obfuscated command injection attempts.

**Key Findings**

- Nuxt Server Island - RCE(GHSA-9473-5f9j-94wq): An unauthenticated vulnerability in Nuxt Server Islands where remote attackers can supply arbitrary component names or props to endpoints. Manipulating these parameters allows unauthenticated component Remote Code Execution (RCE) on the server.
- Alibaba Fastjson JSONType Remote Code Execution: A unauthenticated remote code execution vulnerability in Alibaba Fastjson (≤ 1.2.83) during JSON deserialization. Under default configurations, attackers can execute arbitrary system commands, bypassing traditional classpath and gadget-based defenses.
- Generic Protections (SSRF & Command Injection): Added improved detection logic targeting Server-Side Request Forgery (SSRF) in cloud-hosted applications, alongside new rules targeting obfuscated command injection patterns across request parameters.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...c2e84e2d | N/A | SSRF - Cloud - Beta | Log | Block | This is an improved detection. |
| Cloudflare Managed Ruleset | ...761e7a4c | N/A | Command Injection - Obfuscation | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...7347c892 | N/A | Alibaba Fastjson JSONType Remote Code Execution - Body | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...8ec012ea | N/A | Nuxt Server Island - RCE | N/A | Block | This is a new detection.This was labeled as Generic Rules - RCE. |
| Cloudflare Managed Ruleset | ...3590a4ad | N/A | Generic Rules - RCE | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...9c6dff1c | N/A | Generic Rules - XSS | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...3a5b40d6 | N/A | File Upload - RCE | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...cfe1a93c | N/A | Generic Rules - RCE | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...9ab5ed95 | N/A | Generic Rules - XSS | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...1b7f9c67 | N/A | File Upload - RCE | N/A | Block | This is a new detection. |

## 2026-07-21


**WAF Release - 2026-07-21**

This release introduces new rules for vulnerabilities in Adobe ColdFusion, Next.js, WordPress alongside updates to existing rules thereby providing enhanced generic protections against Server-Side Request Forgery (SSRF), Local File Inclusion (LFI), and Cross-Site Scripting (XSS).

**WAF and framework adapter mitigations for Next.js vulnerabilities**

Multiple [security vulnerabilities ↗︎](https://nextjs.org/blog/july-2026-security-release) were disclosed and patched by the Next.js team through July 2026 security release. These include denial of service, middleware and proxy bypass, server-side request forgery, information disclosure, and cache poisoning across a range of severities.

Several of the disclosed vulnerabilities are not possible to block at WAF layer,we strongly recommend updating your application and its dependencies immediately. Patched versions are available through v16.2.11 (Active LTS) and v15.5.21 (Maintenance LTS) to address these issues.

| Advisory | CVE | Severity | Issue | WAF Coverage |
| --- | --- | --- | --- | --- |
| [Denial of Service in App Router using Server Actions](https://github.com/vercel/next.js/security/advisories/GHSA-m99w-x7hq-7vfj) | CVE-2026-64641 | High | Crafted requests targeting Next.js applications using App Router with at least one Server Action can lead to excessive CPU usage. The CPU usage blocks processing of further requests in the same process, leading to Denial of Service. | WAF rule Next.js - DoS - CVE-2026-64641 (...90dcdb0a) has been deployed to provide coverage. |
| [Middleware / Proxy bypass in App Router applications using Turbopack and single locale](https://github.com/vercel/next.js/security/advisories/GHSA-6gpp-xcg3-4w24) | CVE-2026-64642 | High | Next.js applications using App Router built with Turbopack and a single entry in config.i18n.locales are vulnerable to a middleware/proxy bypass. Accordingly, any authentication or security checks that a middleware/proxy may perform are bypassed. | This is a middleware bypass that unfortunately cannot be covered through Cloudflare WAF signature engine. |
| [Server-Side Request Forgery in rewrites via attacker-controlled destination hostname](https://github.com/vercel/next.js/security/advisories/GHSA-p9j2-gv94-2wf4) | CVE-2026-64645 | High | A rewrites() or redirects() rule that builds its external destination hostname from request-controlled input can be pointed at an arbitrary hostname, regardless of the rule's hostname suffix. For rewrites, this behavior enables Server-Side Request Forgery (SSRF); for redirects, Open Redirect can be achieved. | Existing SSRF rules provide adequate coverage for this vulnerability, no tailored WAF rule was developed. |
| [Server-Side Request Forgery in Server Actions on custom servers](https://github.com/vercel/next.js/security/advisories/GHSA-89xv-2m56-2m9x) | CVE-2026-64649 | High | When a Server Action forwards or redirects a request, an attacker can cause the server to send that outbound request to a malicious host (Server-Side Request Forgery). This requires the attacker’s request to control Host-associated headers. | WAF rule Next.js - SSRF - CVE-2026-64649 (...930091a3) has been deployed to provide coverage. |
| [Denial of Service in the Image Optimization API using SVGs](https://github.com/vercel/next.js/security/advisories/GHSA-q8wf-6r8g-63ch) | CVE-2026-64644 | Medium | When self-hosting Next.js with the default image loader, the Image Optimization API can optimize remotely hosted images if configured (not enabled by default). If those images contain malicious content, the images can cause CPU exhaustion in the /\_next/image endpoint. | Malicious request is unfortunately indistinguishable from a legitimate image optimization request, so no WAF rule has been created to address this vulnerability. |
| [Unbounded Server Action payload in Edge runtime](https://github.com/vercel/next.js/security/advisories/GHSA-4c39-4ccg-62r3) | CVE-2026-64646 | Medium | A crafted request can lead to memory consumption on Server Actions in the Edge runtime. Next.js applications which use App Router and have at least one Server Action are affected. | Unfortunately there is no one size fits all rule that can be deployed through WAF in lieu of custom bodySizeLimit configurations, so no WAF rule has been created to address this vulnerability. |
| [Unauthenticated disclosure of internal Server Function endpoints](https://github.com/vercel/next.js/security/advisories/GHSA-955p-x3mx-jcvp) | CVE-2026-64643 | Medium | In Next.js applications using App Router, Server Actions (use server) or use cache endpoint IDs can be globally disclosed. An attacker can use this for reconnaissance and as part of a broader attack chain. | WAF rule Next.js - Information Disclosure - CVE-2026-64643 (...72952826) has been deployed to provide coverage. |
| [Cache confusion of response bodies for requests with bodies](https://github.com/vercel/next.js/security/advisories/GHSA-68g3-v927-f742) | CVE-2026-64648 | Medium | A server-side fetch with a request body may return a cached response body from a different request to the same URL but different body. This only applies for fetch calls of the shape fetch(new Request(init), aDifferentInit) | This is an application logic bug that unfortunately cannot be covered through Cloudflare WAF signature engine. |
| [Cache confusion of response bodies for requests with bodies containing invalid UTF-8 byte sequences](https://github.com/vercel/next.js/security/advisories/GHSA-4633-3j49-mh5q) | CVE-2026-64647 | Medium | A server-side fetch with a request body may return a cached response body from a different request to the same URL but different body. This only applies when receiving request bodies which contain invalid UTF-8 characters. | This is an application logic bug that unfortunately cannot be covered through Cloudflare WAF signature engine. |

**Key Findings**

- CVE-2026-48276: A path traversal vulnerability in Adobe ColdFusion file upload mechanisms allows unauthenticated attackers to write or upload files to arbitrary locations outside designated directories on the origin server.
- CVE-2026-48282: A path traversal vulnerability in Adobe ColdFusion enables unauthenticated attackers to manipulate directory sequences and access restricted system files on the host filesystem.
- CVE-2026-60137: An unauthenticated SQL injection vulnerability affecting WordPress. Threat actors exploit unsanitized input parameters to execute arbitrary SQL queries, leading to unauthorized database access, record manipulation, or data exfiltration.
- CVE-2026-63030: A remote code execution vulnerability affecting WordPress core and plugin components. Remote, unauthenticated attackers can execute arbitrary system commands to gain unauthorized access or establish backdoors on host servers.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...215e7d31 | N/A | SSRF - Restricted Protocol | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...a935ee5d | N/A | SSRF - Obfuscated Host | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...1b0230ac | N/A | LFI - Path Traversal | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...61349c8b | N/A | Adobe ColdFusion - File Upload Path Traversal - CVE:CVE-2026-48276 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...9cb61eac | N/A | Adobe ColdFusion - Path Traversal - CVE:CVE-2026-48282 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...4ac5e21f | N/A | XSS — JS Bracket Concat Obfuscation - Body | Log | Disabled | This is a new detection. |
| Cloudflare Managed Ruleset | ...f31f5559 | N/A | XSS — JS Bracket Concat Obfuscation - Headers | Log | Disabled | This is a new detection. |
| Cloudflare Managed Ruleset | ...987984fd | N/A | XSS — JS Bracket Concat Obfuscation - URI | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...ed933fcc | N/A | Wordpress - SQL Injection - CVE:CVE-2026-60137 | N/A | Block | This was labeled as Generic Rules - SQLi. |
| Cloudflare Managed Ruleset | ...550664b6 | N/A | Wordpress - Remote Code Execution - CVE:CVE-2026-63030 | N/A | Block | This was labeled as Generic Rules - Unauthenticated RCE. |
| Cloudflare Free Ruleset | ...33697a1a | N/A | Wordpress - SQL Injection - CVE:CVE-2026-60137 | N/A | Block | This was labeled as Generic Rules - SQLi. |
| Cloudflare Free Ruleset | ...b5ec246a | N/A | Wordpress - Remote Code Execution - CVE:CVE-2026-63030 | N/A | Block | This was labeled as Generic Rules - Unauthenticated RCE. |
| Cloudflare Managed Ruleset | ...72952826 | N/A | Next.js - Information Disclosure - CVE-2026-64643 | N/A | Block | This was labeled as Generic Rules - Information Disclosure. |
| Cloudflare Managed Ruleset | ...930091a3 | N/A | Next.js - SSRF - CVE-2026-64649 | N/A | Block | This was labeled as Generic Rules - Auth Bypass - 2. |
| Cloudflare Managed Ruleset | ...63167195 | N/A | Next.js - Remote Code Execution - Cache Components | N/A | Block | This was labeled as Generic Rules - RCE. |
| Cloudflare Managed Ruleset | ...90dcdb0a | N/A | Next.js - DoS - CVE-2026-64641 | N/A | Block | This was labeled as Generic Rules - DoS. |
| Cloudflare Managed Ruleset | ...2049a60c | N/A | Generic Rules - Command Execution - Body - Beta | Disabled | - | This detection has been removed. |
| Cloudflare Managed Ruleset | ...836855a4 | N/A | Generic Rules - Command Execution - Header - Beta | Disabled | - | This detection has been removed. |
| Cloudflare Managed Ruleset | ...6d060a0d | N/A | Generic Rules - Command Execution - URI - Beta | Disabled | - | This detection has been removed. |

## 2026-07-17


**WAF Release - 2026-07-17 - Emergency**

This emergency release adds a new managed rule to block active exploitation of a critical remote code execution (RCE) and SQL injection (SQLi) vulnerability found in popular web frameworks.

**Key Findings**

- Generic Frameworks - Unauthenticated RCE: Attackers can execute arbitrary system commands with web server privileges by sending malicious input containing invalid path sequences during request processing.
- Generic Frameworks - SQLi: Attackers can execute unauthorized database queries due to a failure to sanitize input values within request parameters.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...550664b6 | N/A | Generic Rules - Unauthenticated RCE | N/A | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...ed933fcc | N/A | Generic Rules - SQLi | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...b5ec246a | N/A | Generic Rules - Unauthenticated RCE | N/A | Block | This is a new detection. |
| Cloudflare Free Ruleset | ...33697a1a | N/A | Generic Rules - SQLi | N/A | Block | This is a new detection. |

## 2026-07-14


**WAF Release - 2026-07-14**

This release introduces new rules targeting critical infrastructure vulnerabilities. These include an unauthenticated memory disclosure flaw in Citrix NetScaler ADC and Gateway (CVE-2026-8451) and a high-severity pre-authentication remote code execution (RCE) vulnerability in Progress Kemp LoadMaster (CVE-2026-8037).

**Key Findings**

- CVE-2026-8451: An insufficient input validation vulnerability affects Citrix NetScaler ADC and NetScaler Gateway appliances configured as a SAML Identity Provider (IdP). Remote, unauthenticated attackers can exploit this flaw by sending malformed requests to trigger a memory overread, allowing them to leak chunks of sensitive data from adjacent appliance memory.
- CVE-2026-8037: A critical OS command injection vulnerability in Progress Kemp LoadMaster load balancers allows unauthenticated remote attackers to achieve remote code execution (RCE).

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...76973ac4 | N/A | Citrix Netscaler ADC - Insufficient Input Validation - CVE:CVE-2026-8451 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...10233f36 | N/A | Progress Kemp LoadMaster - Remote Code Execution - CVE:CVE-2026-8037 | Log | Block | This is a new detection. |

## 2026-07-01


**WAF Release - 2026-07-01**

This release adds targeted coverage for a path traversal flaw in Fortinet FortiSandbox (CVE-2026-39813) and transitions the Anomaly:Header:User-Agent - Fake Bing or MSN Bot rule action from Block to Disabled.

**Key Findings**

- CVE-2026-39813: A path traversal vulnerability in Fortinet FortiSandbox allows remote, unauthenticated attackers to read arbitrary files from the underlying filesystem due to insufficient validation of user-supplied input paths.

| Ruleset | Rule ID | Legacy Rule ID | Description | Previous Action | New Action | Comments |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Managed Ruleset | ...d84c92c9 | N/A | Fortinet FortiSandbox - Path Traversal - CVE:CVE-2026-39813 | Log | Block | This is a new detection. |
| Cloudflare Managed Ruleset | ...c12cf9c8 | N/A | Anomaly:Header:User-Agent - Fake Bing or MSN Bot | Enabled | Disabled | We are changing the action for this rule from BLOCK to Disabled |

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/change-log/changelog/#page","headline":"Changelog","description":"AI Security for Apps now supports an updated set of categories for detecting unsafe topics in incoming prompts.","url":"https://developers.cloudflare.com/waf/change-log/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
