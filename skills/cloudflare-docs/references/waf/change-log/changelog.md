---
title: Changelog
description: This week's release introduces a new detection for a Remote Code Execution (RCE) vulnerability in Apache ActiveMQ (CVE-2026-34197) and an updated signature for Magento 2 - Unrestricted File Upload. Alongside these detections, we are continuing our work on rule refinements to provide deeper security insights for our customers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/waf.xml) 

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

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                            | Previous Action | New Action | Comments                                                                                                                           |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------------------- | --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...ee159e2e | N/A            | Command Injection - Generic 8 - uri                                    | Log             | Block      | This is a new detection. Previous description was "Command Injection - Generic 8 - uri - Beta"                                     |
| Cloudflare Managed Ruleset | ...a15308cf | N/A            | Command Injection - Generic 8 - body                                   | Disabled        | Disabled   | Rule metadata description refined. Previous description was "Command Injection - Generic 8" (ID: ...413592e2  )                    |
| Cloudflare Managed Ruleset | ...a15308cf | N/A            | Command Injection - Generic 8 - body - Beta                            | Disabled        | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 8 - body" (ID: ...413592e2  )     |
| Cloudflare Managed Ruleset | ...7bd2d8fa | N/A            | MySQL - SQLi - Executable Comment - Body                               | Block           | Block      | Rule metadata description refined. Previous description was "MySQL - SQLi - Executable Comment" (ID: ...7bd2d8fa  )                |
| Cloudflare Managed Ruleset | ...958047ed | N/A            | MySQL - SQLi - Executable Comment - Beta                               | Log             | Block      | This is a new detection. This rule is merged into the original rule "MySQL - SQLi - Executable Comment - Body" (ID: ...7bd2d8fa  ) |
| Cloudflare Managed Ruleset | ...582cc559 | N/A            | MySQL - SQLi - Executable Comment - Headers                            | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...a16639d3 | N/A            | MySQL - SQLi - Executable Comment - URI                                | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...44f24211 | N/A            | Magento 2 - Unrestricted file upload - 2                               | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...bf170a17 | N/A            | Apache ActiveMQ - Remote Code Execution - CVE:CVE-2026-34197           | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...8c2ac1a7 | N/A            | SQLi - Sleep Function - Beta                                           | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Sleep Function" (ID: ...f77e8d54  )                    |
| Cloudflare Managed Ruleset | ...4dacaeb8 | N/A            | SQLi - Sleep Function - Headers                                        | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...ed4c9ece | N/A            | SQLi - Sleep Function - URI                                            | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...1dfa64df | N/A            | SQLi - Probing - uri                                                   | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...4c62e2e7 | N/A            | SQLi - Probing - header                                                | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...aab28ea1 | N/A            | SQLi - Probing - body                                                  | Disabled        | Disabled   | This is a new detection. This rule is merged into the original rule "SQLi - Probing" (ID: ...b4026c88  )                           |
| Cloudflare Managed Ruleset | ...20999be0 | N/A            | SQLi - Probing 2                                                       | Disabled        | Disabled   | This rule had duplicate detection logic and has been deprecated.                                                                   |
| Cloudflare Managed Ruleset | ...d7aa0008 | N/A            | SQLi - UNION in MSSQL - Body                                           | Disabled        | Disabled   | This rule has been renamed to differentiate from "SQLi - UNION in MSSQL" (ID: ...ee5e35fd  ) and contains updated rule logic.      |
| Cloudflare Managed Ruleset | ...a67d8561 | N/A            | SQLi - UNION - 3                                                       | Disabled        | Disabled   | This rule had duplicate detection logic and has been deprecated.                                                                   |
| Cloudflare Managed Ruleset | ...0af34bba | N/A            | XSS, HTML Injection - Embed Tag - URI                                  | Disabled        | Disabled   | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...70282f38 | N/A            | XSS, HTML Injection - Embed Tag - Headers                              | Log             | Block      | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...23f4d718 | N/A            | XSS, HTML Injection - IFrame Tag - Src and Srcdoc Attributes - Headers | Log             | Disabled   | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...6978def1 | N/A            | XSS, HTML Injection - Link Tag - Headers                               | Log             | Disabled   | This is a new detection.                                                                                                           |
| Cloudflare Managed Ruleset | ...ebd81645 | N/A            | XSS, HTML Injection - Link Tag - URI                                   | Disabled        | Disabled   | This is a new detection.                                                                                                           |

## 2026-04-15

  
**WAF Release - 2026-04-15**   

This week's release introduces a new detection for a critical Remote Code Execution (RCE) vulnerability in Mesop (CVE-2026-33057), alongside protections for high-impact vulnerabilities in Cisco Secure Firewall Management Center (CVE-2026-20079) and FortiClient EMS (CVE-2026-21643). Additionally, this release includes an update to our existing React Server DoS coverage to address recently identified resource exhaustion vectors (CVE-2026-23869).

**Key Findings**

* Cisco Secure FMC (CVE-2026-20079): A vulnerability in the web-based management interface of Cisco Secure Firewall Management Center (FMC) that allows an unauthenticated, remote attacker to execute arbitrary commands or bypass security filters.
* FortiClient EMS (CVE-2026-21643): A critical vulnerability in the FortiClient EMS permitting unauthorized access or administrative configuration manipulation via crafted HTTP requests.
* Mesop (CVE-2026-33057): A vulnerability in the Mesop Python-based UI framework where unauthenticated attackers can execute arbitrary code by sending specially crafted, Base64-encoded payloads in the request body.

**Impact**

Successful exploitation of these vulnerabilities could allow unauthenticated attackers to execute arbitrary code, gain administrative control over network management infrastructure, or trigger server-side resource exhaustion. Administrators are strongly encouraged to apply official vendor updates.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                                                                                                           |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| Cloudflare Managed Ruleset | ...aef9415b | N/A            | Cisco Secure FMC - RCE via upgradeReadinessCall - CVE:CVE-2026-20079 | Log             | Block      | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...ee7be621 | N/A            | FortiClient EMS - Pre-Auth SQL Injection - CVE:CVE-2026-21643        | Log             | Block      | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...c953a72b | N/A            | Mesop - Remote Code Execution - Base64 Payload - CVE:CVE-2026-33057  | Log             | Block      | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...50c08f6f | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 1 - Beta                   | Log             | Block      | This rule has been merged into the original rule "React Server - DOS - CVE:CVE-2026-23864 - 1" (ID: ...61680354  ) |
| Cloudflare Managed Ruleset | ...ebd81645 | N/A            | XSS, HTML Injection - Link Tag - URI (beta)                          | N/A             | Disabled   | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...0af34bba | N/A            | XSS, HTML Injection - Embed Tag - URI (beta)                         | N/A             | Disabled   | This is a new detection.                                                                                           |

## 2026-04-14

  
**Email obfuscation decode script is now non-render-blocking**   

The decode script injected by [Email Address Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) now loads with the `defer` attribute. This means the script no longer blocks page rendering. It downloads in parallel with HTML parsing and executes after the document is fully parsed, before the `DOMContentLoaded` event.

This improves page loading performance, contributing to better Core Web Vitals, for all zones with Email Address Obfuscation on. No action is required.

If you have custom JavaScript that depends on email addresses being decoded at a specific point during page load, note that the decode script now executes after HTML parsing completes rather than inline during parsing.

## 2026-04-07

  
**WAF Release - 2026-04-07**   

This week's release introduces new detections for a critical Remote Code Execution (RCE) vulnerability in MCP Server (CVE-2026-23744), alongside targeted protection for an authentication bypass vulnerability in SolarWinds products (CVE-2025-40552). Additionally, this release includes a new generic detection rule designed to identify and block Cross-Site Scripting (XSS) injection attempts leveraging "OnEvent" handlers within HTTP cookies.

**Key Findings**

* MCP Server (CVE-2026-23744): A vulnerability in the Model Context Protocol (MCP) server implementation where malformed input payloads can trigger a memory corruption state, allowing for arbitrary code execution.
* SolarWinds (CVE-2025-40552): A critical flaw in the authentication module allows unauthenticated attackers to bypass security filters and gain unauthorized access to the management console due to improper identity token validation.
* XSS OnEvents Cookies: This generic rule identifies malicious event handlers (such as onload or onerror) embedded within HTTP cookie values.

**Impact**

Successful exploitation of the MCP Server and SolarWinds vulnerabilities could allow unauthenticated attackers to execute arbitrary code or gain administrative control, leading to a full system takeover. Additionally, the new generic XSS detection prevents attackers from leveraging browser event handlers in cookies to hijack user sessions or execute malicious scripts.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                             | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...0aa410af | N/A            | Generic Rules - Command Execution - 5 - Body            | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...9131ec2f | N/A            | Generic Rules - Command Execution - 5 - Header          | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...551eb9e5 | N/A            | Generic Rules - Command Execution - 5 - URI             | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...d46229eb | N/A            | MCP Server - Remote Code Execution - CVE:CVE-2026-23744 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...a864b9c2 | N/A            | XSS - OnEvents - Cookies                                | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...a78ad04e | N/A            | SQLi - Evasion - Body                                   | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...40732d48 | N/A            | SQLi - Evasion - Headers                                | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...e68a99b5 | N/A            | SQLi - Evasion - URI                                    | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...3e8143d2 | N/A            | SQLi - LIKE 3 - Body                                    | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...70e7fb97 | N/A            | SQLi - LIKE 3 - URI                                     | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...4c538bd9 | N/A            | SQLi - UNION - 2 - Body                                 | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...61c439c9 | N/A            | SQLi - UNION - 2 - URI                                  | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...cf33ea10 | N/A            | SolarWinds - Auth Bypass - CVE:CVE-2025-40552           | Log             | Block      | This is a new detection. |

## 2026-03-30

  
**WAF Release - 2026-03-30**   

This week's release introduces new detections for a critical authentication bypass vulnerability in Fortinet products (CVE-2025-59718), alongside three new generic detection rules designed to identify and block HTTP Parameter Pollution attempts. Additionally, this release includes targeted protection for a high-impact unrestricted file upload vulnerability in Magento and Adobe Commerce.

**Key Findings**

* CVE-2025-59718: An improper cryptographic signature verification vulnerability in Fortinet FortiOS, FortiProxy, and FortiSwitchManager. This may allow an unauthenticated attacker to bypass the FortiCloud SSO login authentication using a maliciously crafted SAML message, if that feature is enabled on the device.
* Magento 2 - Unrestricted File Upload: A critical flaw in Magento and Adobe Commerce allows unauthenticated attackers to bypass security checks and upload malicious files to the server, potentially leading to Remote Code Execution (RCE).

**Impact**

Successful exploitation of the Fortinet and Magento vulnerabilities could allow unauthenticated attackers to gain administrative control or deploy webshells, leading to complete server compromise and data theft.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...2f7f95e9 | N/A            | Generic Rules - Parameter Pollution - Body                           | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...319731a4 | N/A            | Generic Rules - Parameter Pollution - Header - Form                  | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...def262dd | N/A            | Generic Rules - Parameter Pollution - URI                            | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...70a36147 | N/A            | Magento 2 - Unrestricted file upload                                 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...2ffcca9f | N/A            | Fortinet FortiCloud SSO - Authentication Bypass - CVE:CVE-2025-59718 | Log             | Block      | This is a new detection. |

## 2026-03-23

  
**WAF Release - 2026-03-23**   

This week's release focuses on new improvements to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                                               | Previous Action | New Action | Comments                                                                                                                                                                                  |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...97321c6c | N/A            | Command Injection - Generic 9 - URI Vector                                                                                | Log             | Disabled   | This is a new detection.                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...1eb7a999 | N/A            | Command Injection - Generic 9 - Header Vector                                                                             | Log             | Disabled   | This is a new detection.                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...0677175f | N/A            | Command Injection - Generic 9 - Body Vector                                                                               | Log             | Disabled   | This is a new detection.                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...479da68f | N/A            | PHP, vBulletin, jQuery File Upload - Code Injection, Dangerous File Upload - CVE:CVE-2018-9206, CVE:CVE-2019-17132 (beta) | Log             | Block      | This rule has been merged into the original rule "PHP, vBulletin, jQuery File Upload - Code Injection, Dangerous File Upload - CVE:CVE-2018-9206, CVE:CVE-2019-17132" (ID: ...824b817c  ) |

## 2026-03-12

  
**WAF Release - 2026-03-12 - Emergency**   

This week's release introduces new detections for vulnerabilities in Ivanti Endpoint Manager Mobile (CVE-2026-1281 and CVE-2026-1340), alongside a new generic detection rule designed to identify and block Cross-Site Scripting (XSS) injection attempts within the `Content-Security-Policy` (CSP) HTTP request header.

**Key Findings**

* CVE-2026-1281 & CVE-2026-1340: Ivanti Endpoint Manager Mobile processes HTTP requests through Apache RevwriteMap directives that pass user-controlled input to Bash scripts (`/mi/bin/map-appstore-url` and `/mi/bin/map-aft-store-url`). Bash scripts do not sanitize user input and are vulnerable to shell arithmetic expansion thereby allowing attackers to achieve unauthenticated remote code execution.
* Generic XSS in CSP Header: This rule identifies malicious payloads embedded within the request's `Content-Security-Policy` header. It specifically targets scenarios where web frameworks or applications trust and extract values directly from the CSP header in the incoming request without sufficient validation. Attackers can provide crafted header values to inject scripts or malicious directives that are subsequently processed by the server.

**Impact**

Successful exploitation of Ivanti EPMM vulnerability allows unauthenticated remote code execution and generic XSS in CSP header allows attackers to inject malicious scripts during page rendering. In environments using server-side caching, this poisoned XSS content can subsequently be cached and automatically served to all visitors.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                        | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------ | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...796ea2f6 | N/A            | Ivanti EPMM - Code Injection - CVE:CVE-2026-1281 CVE:CVE-2026-1340 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...ee964a8c | N/A            | Anomaly:Header:Content-Security-Policy                             | N/A             | Block      | This is a new detection. |

## 2026-03-02

  
**WAF Release - 2026-03-02**   

This week's release introduces new detections for vulnerabilities in SmarterTools SmarterMail (CVE-2025-52691 and CVE-2026-23760), alongside improvements to an existing Command Injection (nslookup) detection to enhance coverage.

**Key Findings**

* CVE-2025-52691: SmarterTools SmarterMail mail server is vulnerable to Arbitrary File Upload, allowing an unauthenticated attacker to upload files to any location on the mail server, potentially enabling remote code execution.
* CVE-2026-23760: SmarterTools SmarterMail versions prior to build 9511 contain an authentication bypass vulnerability in the password reset API permitting unaunthenticated to reset system administrator accounts failing to verify existing password or reset token.

**Impact**

Successful exploitation of these SmarterMail vulnerabilities could lead to full system compromise or unauthorized administrative access to mail servers. Administrators are strongly encouraged to apply vendor patches without delay.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                                                                                      |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...966ec6b1 | N/A            | SmarterMail - Arbitrary File Upload - CVE-2025-52691 | Log             | Block      | This is a new detection.                                                                      |
| Cloudflare Managed Ruleset | ...ee964a8c | N/A            | SmarterMail - Authentication Bypass - CVE-2026-23760 | Log             | Block      | This is a new detection.                                                                      |
| Cloudflare Managed Ruleset | ...75b64d99 | N/A            | Command Injection - Nslookup - Beta                  | Log             | Block      | This rule is merged into the original rule "Command Injection - Nslookup" (ID: ...b090ba9a  ) |

## 2026-02-16

  
**WAF Release - 2026-02-16**   

This week’s release introduces new detections for CVE-2025-68645 and CVE-2025-31125.

**Key Findings**

* CVE-2025-68645: A Local File Inclusion (LFI) vulnerability in the Webmail Classic UI of Zimbra Collaboration Suite (ZCS) 10.0 and 10.1 allows unauthenticated remote attackers to craft requests to the `/h/rest` endpoint, improperly influence internal dispatching, and include arbitrary files from the WebRoot directory.
* CVE-2025-31125: Vite, the JavaScript frontend tooling framework, exposes content of non-allowed files via `?inline&import` when its development server is network-exposed, enabling unauthorized attackers to read arbitrary files and potentially leak sensitive information.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...833761f7 | N/A            | Zimbra - Local File Inclusion - CVE:CVE-2025-68645     | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...950ed8c8 | N/A            | Vite - WASM Import Path Traversal - CVE:CVE-2025-31125 | Log             | Block      | This is a new detection. |

## 2026-02-10

  
**WAF Release - 2026-02-10**   

This week’s release changes the rule action from BLOCK to Disabled for Anomaly:Header:User-Agent - Fake Google Bot.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                 | Previous Action | New Action | Comments                                                        |
| -------------------------- | ----------- | -------------- | ------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...6aa0bef8 | N/A            | Anomaly:Header:User-Agent - Fake Google Bot | Enabled         | Disabled   | We are changing the action for this rule from BLOCK to Disabled |

## 2026-02-02

  
**WAF Release - 2026-02-02**   

This week’s release introduces new detections for CVE-2025-64459 and CVE-2025-24893.

**Key Findings**

* CVE-2025-64459: Django versions prior to 5.1.14, 5.2.8, and 4.2.26 are vulnerable to SQL injection via crafted dictionaries passed to QuerySet methods and the `Q()` class.
* CVE-2025-24893: XWiki allows unauthenticated remote code execution through crafted requests to the SolrSearch endpoint, affecting the entire installation.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                                                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...30698ff3 | N/A            | XWiki - Remote Code Execution - CVE:CVE-2025-24893 2 | Log             | Block      | This is a new detection.                                |
| Cloudflare Managed Ruleset | ...da8ba7e6 | N/A            | Django SQLI - CVE:CVE-2025-64459                     | Log             | Block      | This is a new detection.                                |
| Cloudflare Managed Ruleset | ...8d667511 | N/A            | NoSQL, MongoDB - SQLi - Comparison - 2               | Block           | Block      | Rule metadata description refined. Detection unchanged. |

## 2026-01-26

  
**WAF Release - 2026-01-26**   

This week’s release introduces new detections for denial-of-service attempts targeting React CVE-2026-23864 ([https://www.cve.org/CVERecord?id=CVE-2026-23864 ↗](https://www.cve.org/CVERecord?id=CVE-2026-23864)).

**Key Findings**

* CVE-2026-23864 ([https://www.cve.org/CVERecord?id=CVE-2026-23864 ↗](https://www.cve.org/CVERecord?id=CVE-2026-23864)) affects `react-server-dom-parcel`, `react-server-dom-turbopack`, and `react-server-dom-webpack` packages.
* Attackers can send crafted HTTP requests to Server Function endpoints, causing server crashes, out-of-memory exceptions, or excessive CPU usage.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                 | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...61680354 | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 1 | N/A             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...dcdffcf8 | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 2 | N/A             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...349edbc6 | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 3 | N/A             | Block      | This is a new detection. |

## 2026-01-20

  
**WAF Release - 2026-01-20**   

This week's release focuses on improvements to existing detections to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against SQL injection.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description              | Previous Action | New Action | Comments                                                                           |
| -------------------------- | ----------- | -------------- | ------------------------ | --------------- | ---------- | ---------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...68d90c8f | N/A            | SQLi - Comment - Beta    | Log             | Block      | This rule is merged into the original rule "SQLi - Comment" (ID: ...6d8d8fe4  )    |
| Cloudflare Managed Ruleset | ...faa045cf | N/A            | SQLi - Comparison - Beta | Log             | Block      | This rule is merged into the original rule "SQLi - Comparison" (ID: ...e7907480  ) |

## 2026-01-15

  
**WAF Release - 2026-01-15**   

This week's release focuses on improvements to existing detections to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against SQL Injection.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                   | Previous Action | New Action | Comments                                                                                |
| -------------------------- | ----------- | -------------- | ----------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...ad7dad3e | N/A            | SQLi - String Function - Beta | Log             | Block      | This rule is merged into the original rule "SQLi - String Function" (ID: ...d32b798c  ) |
| Cloudflare Managed Ruleset | ...9e553ad3 | N/A            | SQLi - Sub Query - Beta       | Log             | Block      | This rule is merged into the original rule "SQLi - Sub Query" (ID: ...743e66b1  )       |

## 2026-01-12

  
**WAF Release - 2026-01-12**   

This week's release focuses on improvements to existing detections to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against SQL Injection.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                        | Previous Action | New Action | Comments                                                                                     |
| -------------------------- | ----------- | -------------- | ---------------------------------- | --------------- | ---------- | -------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...48a1841a | N/A            | SQLi - AND/OR MAKE\_SET/ELT - Beta | Log             | Block      | This rule is merged into the original rule "SQLi - AND/OR MAKE\_SET/ELT" (ID: ...252d3934  ) |
| Cloudflare Managed Ruleset | ...9e553ad3 | N/A            | SQLi - Benchmark Function - Beta   | Log             | Block      | This rule is merged into the original rule "SQLi - Benchmark Function" (ID: ...2ebc44ad  )   |

## 2025-12-18

  
**WAF Release - 2025-12-18**   

This week's release focuses on improvements to existing detections to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                       | Previous Action | New Action | Comments                                                                                                                    |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...be5ec20c | N/A            | Atlassian Confluence - Code Injection - CVE:CVE-2021-26084 - Beta | Log             | Block      | This rule is merged into the original rule "Atlassian Confluence - Code Injection - CVE:CVE-2021-26084" (ID: ...69e0b97a  ) |
| Cloudflare Managed Ruleset | ...0d9206e3 | N/A            | PostgreSQL - SQLi - Copy - Beta                                   | Log             | Block      | This rule is merged into the original rule "PostgreSQL - SQLi - COPY" (ID: ...e7265a4e  )                                   |
| Cloudflare Managed Ruleset | ...0cd00ba7 | N/A            | Generic Rules - Command Execution - Body                          | Log             | Disabled   | This is a new detection.                                                                                                    |
| Cloudflare Managed Ruleset | ...cd679ad4 | N/A            | Generic Rules - Command Execution - Header                        | Log             | Disabled   | This is a new detection.                                                                                                    |
| Cloudflare Managed Ruleset | ...fd181fb3 | N/A            | Generic Rules - Command Execution - URI                           | Log             | Disabled   | This is a new detection.                                                                                                    |
| Cloudflare Managed Ruleset | ...7a95bc3a | N/A            | SQLi - Tautology - URI - Beta                                     | Log             | Block      | This rule is merged into the original rule "SQLi - Tautology - URI" (ID: ...b3de2e0a  )                                     |
| Cloudflare Managed Ruleset | ...432ac90d | N/A            | SQLi - WaitFor Function - Beta                                    | Log             | Block      | This rule is merged into the original rule "SQLi - WaitFor Function" (ID: ...d5faba59  )                                    |
| Cloudflare Managed Ruleset | ...596c741e | N/A            | SQLi - AND/OR Digit Operator Digit 2 - Beta                       | Log             | Block      | This rule is merged into the original rule "SQLi - AND/OR Digit Operator Digit" (ID: ...88d80772  )                         |
| Cloudflare Managed Ruleset | ...03b2f3fe | N/A            | SQLi - Equation 2 - Beta                                          | Log             | Block      | This rule is merged into the original rule "SQLi - Equation" (ID: ...a72a6b3a  )                                            |

## 2025-12-11

  
**WAF Release - 2025-12-11 - Emergency**   

This emergency release introduces rules for CVE-2025-55183 and CVE-2025-55184, targeting server-side function exposure and resource-exhaustion patterns, respectively.

**Key Findings**

Added coverage for Leaking Server Functions (CVE-2025-55183) and React Function DoS detection (CVE-2025-55184).

**Impact**

These updates strengthen protection for server-function abuse techniques (CVE-2025-55183, CVE-2025-55184) that may expose internal logic or disrupt application availability.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                           | Previous Action | New Action | Comments                                                            |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...fefb4e9b | N/A            | React - Leaking Server Functions - CVE:CVE-2025-55183 | N/A             | Block      | This was labeled as Generic - Server Function Source Code Exposure. |
| Cloudflare Free Ruleset    | ...251e86aa | N/A            | React - Leaking Server Functions - CVE:CVE-2025-55183 | N/A             | Block      | This was labeled as Generic - Server Function Source Code Exposure. |
| Cloudflare Managed Ruleset | ...102ec699 | N/A            | React - DoS - CVE:CVE-2025-55184                      | N/A             | Disabled   | This was labeled as Generic – Server Function Resource Exhaustion.  |

## 2025-12-10

  
**WAF Release - 2025-12-10 - Emergency**   

This additional week's emergency release introduces improvements to our existing rule for React – Remote Code Execution – CVE-2025-55182 - 2, along with two new generic detections covering server-side function exposure and resource-exhaustion patterns.

**Key Findings**

Enhanced detection logic for React – RCE – CVE-2025-55182, added Generic – Server Function Source Code Exposure, and added Generic – Server Function Resource Exhaustion.

**Impact**

These updates strengthen protection against React RCE exploitation attempts and broaden coverage for common server-function abuse techniques that may expose internal logic or disrupt application availability.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                       |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ------------------------------ |
| Cloudflare Managed Ruleset | ...15fce168 | N/A            | React - Remote Code Execution - CVE:CVE-2025-55182 - 2 | N/A             | Block      | This is an improved detection. |
| Cloudflare Free Ruleset    | ...74746aff | N/A            | React - Remote Code Execution - CVE:CVE-2025-55182 - 2 | N/A             | Block      | This is an improved detection. |
| Cloudflare Managed Ruleset | ...fefb4e9b | N/A            | Generic - Server Function Source Code Exposure         | N/A             | Block      | This is a new detection.       |
| Cloudflare Free Ruleset    | ...251e86aa | N/A            | Generic - Server Function Source Code Exposure         | N/A             | Block      | This is a new detection.       |
| Cloudflare Managed Ruleset | ...102ec699 | N/A            | Generic - Server Function Resource Exhaustion          | N/A             | Disabled   | This is a new detection.       |

## 2025-12-05

  
**Increased WAF payload limit for all plans**   

Cloudflare WAF now inspects request-payload size of up to 1 MB across all plans to enhance our detection capabilities for React RCE (CVE-2025-55182).

**Key Findings**

React payloads commonly have a default maximum size of 1 MB. Cloudflare WAF previously inspected up to 128 KB on Enterprise plans, with even lower limits on other plans.

**Update:** We later reinstated the maximum request-payload size the Cloudflare WAF inspects. Refer to [Updating the WAF maximum payload values](https://developers.cloudflare.com/changelog/2025-12-05-waf-max-payload-size-change/) for details.

## 2025-12-05

  
**Updating the WAF maximum payload values**   

We are reinstating the maximum request-payload size the Cloudflare WAF inspects, with WAF on Enterprise zones inspecting up to 128 KB.

**Key Findings**

On [December 5, 2025](https://developers.cloudflare.com/changelog/2025-12-05-rcs-vuln/), we initially attempted to increase the maximum WAF payload limit to 1 MB across all plans. However, an automatic rollout for all customers proved impractical because the increase led to a surge in false positives for existing managed rules.

This issue was particularly notable within the Cloudflare Managed Ruleset and the Cloudflare OWASP Core Ruleset, impacting customer traffic.

**Impact**

Customers on paid plans can increase the limit to 1 MB for any of their zones by contacting Cloudflare Support. Free zones are already protected up to 1 MB and do not require any action.

## 2025-12-03

  
**WAF Release - 2025-12-03 - Emergency**   

The WAF rule deployed yesterday to block unsafe deserialization-based RCE has been updated. The rule description now reads “React – RCE – CVE-2025-55182”, explicitly mapping to the recently disclosed React Server Components vulnerability. Detection logic remains unchanged.

**Key Findings**

Rule description updated to reference React – RCE – CVE-2025-55182 while retaining existing unsafe-deserialization detection.

**Impact**

Improved classification and traceability with no change to coverage against remote code execution attempts.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                      | Previous Action | New Action | Comments                                                |
| -------------------------- | ----------- | -------------- | -------------------------------- | --------------- | ---------- | ------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...5fb92fba | N/A            | React - RCE - CVE:CVE-2025-55182 | N/A             | Block      | Rule metadata description changed. Detection unchanged. |
| Cloudflare Free Ruleset    | ...99702280 | N/A            | React - RCE - CVE:CVE-2025-55182 | N/A             | Block      | Rule metadata description changed. Detection unchanged. |

## 2025-12-02

  
**WAF Release - 2025-12-02 - Emergency**   

This week's emergency release introduces a new rule to block a critical RCE vulnerability in widely-used web frameworks through unsafe deserialization patterns.

**Key Findings**

New WAF rule deployed for RCE Generic Framework to block malicious POST requests containing unsafe deserialization patterns. If successfully exploited, this vulnerability allows attackers with network access via HTTP to execute arbitrary code remotely.

**Impact**

* Successful exploitation allows unauthenticated attackers to execute arbitrary code remotely through crafted serialization payloads, enabling complete system compromise, data exfiltration, and potential lateral movement within affected environments.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description             | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...5fb92fba | N/A            | RCE Generic - Framework | N/A             | Block      | This is a new detection. |
| Cloudflare Free Ruleset    | ...99702280 | N/A            | RCE Generic - Framework | N/A             | Block      | This is a new detection. |

## 2025-12-01

  
**WAF Release - 2025-12-01**   

This week’s release introduces new detections for remote code execution attempts targeting Monsta FTP (CVE-2025-34299), alongside improvements to an existing XSS detection to enhance coverage.

**Key Findings**

* CVE-2025-34299 is a critical remote code execution flaw in Monsta FTP, arising from improper handling of user-supplied parameters within the file-handling interface. Certain builds allow crafted requests to bypass sanitization and reach backend PHP functions that execute arbitrary commands. Attackers can send manipulated parameters through the web panel to trigger command execution within the application’s runtime environment.

**Impact**

If exploited, the vulnerability enables full remote command execution on the underlying server, allowing takeover of the hosting environment, unauthorized file access, and potential lateral movement. As the flaw can be triggered without authentication on exposed Monsta FTP instances, it represents a severe risk for publicly reachable deployments.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                             | Previous Action | New Action | Comments                                                                                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------- | --------------- | ---------- | ---------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...a4fcc8a8 | N/A            | Monsta FTP - Remote Code Execution - CVE:CVE-2025-34299 | Log             | Block      | This is a new detection                                                                  |
| Cloudflare Managed Ruleset | ...b7492846 | N/A            | XSS - JS Context Escape - Beta                          | Log             | Block      | This rule is merged into the original rule "XSS - JS Context Escape" (ID: ...7a3769d3  ) |

## 2025-11-24

  
**WAF Release - 2025-11-24**   

This week highlights enhancements to detection signatures improving coverage for vulnerabilities in FortiWeb, linked to CVE-2025-64446, alongside new detection logic expanding protection against PHP Wrapper Injection techniques.

**Key Findings**

This vulnerability enables an unauthenticated attacker to bypass access controls by abusing the `CGIINFO` header. The latest update strengthens detection logic to ensure a reliable identification of crafted requests attempting to exploit this flaw.

**Impact**

* FortiWeb (CVE-2025-64446): Exploitation allows a remote unauthenticated adversary to circumvent authentication mechanisms by sending a manipulated `CGIINFO` header to FortiWeb’s backend CGI handler. Successful exploitation grants unintended access to restricted administrative functionality, potentially enabling configuration tampering or system-level actions.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                              | Previous Action | New Action | Comments                                                                                            |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------ | --------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...4e2e1a2e | N/A            | FortiWeb - Authentication Bypass via CGIINFO Header - CVE:CVE-2025-64446 | Log             | Block      | This is a new detection                                                                             |
| Cloudflare Managed Ruleset | ...b6c44ed5 | N/A            | PHP Wrapper Injection - Body - Beta                                      | Log             | Disabled   | This rule has been merged into the original rule "PHP Wrapper Injection - Body" (ID: ...1a3e521e  ) |
| Cloudflare Managed Ruleset | ...900f4015 | N/A            | PHP Wrapper Injection - URI - Beta                                       | Log             | Disabled   | This rule has been merged into the original rule "PHP Wrapper Injection - URI" (ID: ...8f76bd74  )  |

## 2025-11-21

  
**WAF Release - 2025-11-21**   

This week’s release introduces a critical detection for CVE-2025-61757, a vulnerability in the Oracle Identity Manager REST WebServices component.

**Key Findings**

This flaw allows unauthenticated attackers with network access over HTTP to fully compromise the Identity Manager, potentially leading to a complete takeover.

**Impact**

Oracle Identity Manager (CVE-2025-61757): Exploitation could allow an unauthenticated remote attacker to bypass security checks by sending specially crafted requests to the application's message processor. This enables the creation of arbitrary employee accounts, which can be leveraged to modify system configurations and achieve full system compromise.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...39fdbe7e | N/A            | Oracle Identity Manager - Pre-Auth RCE - CVE:CVE-2025-61757 | N/A             | Block      | This is a new detection. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/change-log/","name":"WAF changelog overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/change-log/changelog/","name":"Changelog"}}]}
```
