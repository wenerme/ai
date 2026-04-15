---
title: Scheduled changes
description: This week's release introduces new detections for a critical Remote Code Execution (RCE) vulnerability in MCP Server (CVE-2026-23744), alongside targeted protection for an authentication bypass vulnerability in SolarWinds products (CVE-2025-40552). Additionally, this release includes a new generic detection rule designed to identify and block Cross-Site Scripting (XSS) injection attempts leveraging &#34;OnEvent&#34; handlers within HTTP cookies.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Copy page

# Scheduled changes

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/waf.xml) 

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

## 2025-11-17

  
**WAF Release - 2025-11-17**   

This week highlights enhancements to detection signatures improving coverage for vulnerabilities in DELMIA Apriso, linked to CVE-2025-6205.

**Key Findings**

This vulnerability allows unauthenticated attackers to gain privileged access to the application. The latest update provides enhanced detection logic for resilient protection against exploitation attempts.

**Impact**

* DELMIA Apriso (CVE-2025-6205): Exploitation could allow an unauthenticated remote attacker to bypass security checks by sending specially crafted requests to the application's message processor. This enables the creation of arbitrary employee accounts, which can be leveraged to modify system configurations and achieve full system compromise.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                     | Previous Action | New Action | Comments                                                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------- | --------------- | ---------- | ------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...d256f4bc | N/A            | DELMIA Apriso - Auth Bypass - CVE:CVE-2025-6205 | Log             | Block      | This is a new detection.                                |
| Cloudflare Managed Ruleset | ...1a3e521e | N/A            | PHP Wrapper Injection - Body                    | N/A             | Disabled   | Rule metadata description refined. Detection unchanged. |
| Cloudflare Managed Ruleset | ...8f76bd74 | N/A            | PHP Wrapper Injection - URI                     | N/A             | Disabled   | Rule metadata description refined. Detection unchanged. |

## 2025-11-10

  
**WAF Release - 2025-11-10**   

This week’s release introduces new detections for Prototype Pollution across three common vectors: URI, Body, and Header/Form.

**Key Findings**

* These attacks can affect both API and web applications by altering normal behavior or bypassing security controls.

**Impact**

Exploitation may allow attackers to change internal logic or cause unexpected behavior in applications using JavaScript or Node.js frameworks. Developers should sanitize input keys and avoid merging untrusted data structures.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                         | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...606285e6 | N/A            | Generic Rules - Prototype Pollution - URI           | Log             | Disabled   | This is a new detection |
| Cloudflare Managed Ruleset | ...4f59ff26 | N/A            | Generic Rules - Prototype Pollution - Body          | Log             | Disabled   | This is a new detection |
| Cloudflare Managed Ruleset | ...7efbeb39 | N/A            | Generic Rules - Prototype Pollution - Header - Form | Log             | Disabled   | This is a new detection |

## 2025-11-05

  
**WAF Release - 2025-11-05 - Emergency**   

This week’s emergency release introduces a new detection signature that enhances coverage for a critical vulnerability in the React Native Metro Development Server, tracked as CVE-2025-11953.

**Key Findings**

The Metro Development Server exposes an HTTP endpoint that is vulnerable to OS command injection (CWE-78). An unauthenticated network attacker can send a crafted request to this endpoint and execute arbitrary commands on the host running Metro. The vulnerability affects Metro/cli-server-api builds used by React Native Community CLI in pre-patch development releases.

**Impact**

Successful exploitation of CVE-2025-11953 may result in remote command execution on developer workstations or CI/build agents, leading to credential and secret exposure, source tampering, and potential lateral movement into internal networks. Administrators and developers are strongly advised to apply the vendor's patches and restrict Metro’s network exposure to reduce this risk.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...c8e30c5b | N/A            | React Native Metro - Command Injection - CVE:CVE-2025-11953 | N/A             | Block      | This is a New Detection |

## 2025-11-03

  
**WAF Release - 2025-11-03**   

This week highlights enhancements to detection signatures improving coverage for vulnerabilities in Adobe Commerce and Magento Open Source, linked to CVE-2025-54236.

**Key Findings**

This vulnerability allows unauthenticated attackers to take over customer accounts through the Commerce REST API and, in certain configurations, may lead to remote code execution. The latest update provides enhanced detection logic for resilient protection against exploitation attempts.

**Impact**

* Adobe Commerce (CVE-2025-54236): Exploitation may allow attackers to hijack sessions, execute arbitrary commands, steal data, and disrupt storefronts, resulting in confidentiality and integrity risks for merchants. Administrators are strongly encouraged to apply vendor patches without delay.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                       |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | ------------------------------ |
| Cloudflare Managed Ruleset | ...cb6d5fe5 | 100774C        | Adobe Commerce - Remote Code Execution - CVE:CVE-2025-54236 | Log             | Block      | This is an improved detection. |

## 2025-10-30

  
**WAF Release - 2025-10-30 - Emergency**   

This week’s release introduces a new detection signature that enhances coverage for a critical vulnerability in Oracle E-Business Suite, tracked as CVE-2025-61884.

**Key Findings**

The flaw is easily exploitable and allows an unauthenticated attacker with network access to compromise Oracle Configurator, which can grant access to sensitive resources and configuration data. The affected versions include 12.2.3 through 12.2.14.

**Impact**

Successful exploitation of CVE-2025-61884 may result in unauthorized access to critical business data or full exposure of information accessible through Oracle Configurator. Administrators are strongly advised to apply vendor's patches and recommended mitigations to reduce this exposure.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                         | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...8827402f | N/A            | Oracle E-Business Suite - SSRF - CVE:CVE-2025-61884 | N/A             | Block      | This is a New Detection |

## 2025-10-24

  
**WAF Release - 2025-10-24 - Emergency**   

This week’s release introduces a new detection signature that enhances coverage for a critical vulnerability in Windows Server Update Services (WSUS), tracked as CVE-2025-59287.

**Key Findings**

The vulnerability allows unauthenticated attackers to potentially achieve remote code execution. The updated detection logic strengthens defenses by improving resilience against exploitation attempts targeting this flaw.

**Impact**

Successful exploitation of CVE-2025-59287 could enable attackers to hijack sessions, execute arbitrary commands, exfiltrate sensitive data, and disrupt storefront operations. These actions pose significant confidentiality and integrity risks to affected environments. Administrators should apply vendor patches immediately to mitigate exposure.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                           | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...bd72ba08 | N/A            | Windows Server - Deserialization - CVE:CVE-2025-59287 | N/A             | Block      | This is a New Detection |

## 2025-10-23

  
**WAF Release - 2025-10-23 - Emergency**   

This week highlights enhancements to detection signatures improving coverage for vulnerabilities in Adobe Commerce and Magento Open Source, linked to CVE-2025-54236.

**Key Findings**

This vulnerability allows unauthenticated attackers to take over customer accounts through the Commerce REST API and, in certain configurations, may lead to remote code execution. The latest update enhances detection logic to provide more resilient protection against exploitation attempts.

**Impact**

Adobe Commerce (CVE-2025-54236): Exploitation may allow attackers to hijack sessions, execute arbitrary commands, steal data, and disrupt storefronts, resulting in confidentiality and integrity risks for merchants. Administrators are strongly encouraged to apply vendor patches without delay.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...c6ef59a1 | N/A            | Adobe Commerce - Remote Code Execution - CVE:CVE-2025-54236 | N/A             | Block      | This is a New Detection |

## 2025-10-20

  
**WAF Release - 2025-10-20**   

This week’s update introduces an enhanced rule that expands detection coverage for a critical vulnerability in Oracle E-Business Suite. It also improves an existing rule to provide more reliable coverage in request processing.

**Key Findings**

New WAF rule deployed for Oracle E-Business Suite (CVE-2025-61882) to block unauthenticated attacker's network access via HTTP to compromise Oracle Concurrent Processing. If successfully exploited, this vulnerability may result in remote code execution.

**Impact**

* Successful exploitation of CVE-2025-61882 allows unauthenticated attackers to execute arbitrary code remotely by chaining multiple weaknesses, enabling lateral movement into internal services, data exfiltration, and large-scale extortionware deployment within Oracle E-Business Suite environments.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                              | Previous Action | New Action | Comments                                                                                                    |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------ | --------------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...2b4101ab | 100598A        | Remote Code Execution - Common Bash Bypass - Beta                        | Log             | Block      | This rule is merged into the original rule "Remote Code Execution - Common Bash Bypass" (ID: ...50cec478  ) |
| Cloudflare Managed Ruleset | ...a1118614 | 100916A        | Oracle E-Business Suite - Remote Code Execution - CVE:CVE-2025-61882 - 2 | Log             | Block      | This is a New Detection                                                                                     |
| Cloudflare Managed Ruleset | ...c22b51d3 | N/A            | HTTP Truncated                                                           | N/A             | Disabled   | This is a New Detection                                                                                     |

## 2025-10-17

  
**New detections released for WAF managed rulesets**   

This week we introduced several new detections across Cloudflare Managed Rulesets, expanding coverage for high-impact vulnerability classes such as SSRF, SQLi, SSTI, Reverse Shell attempts, and Prototype Pollution. These rules aim to improve protection against attacker-controlled payloads that exploit misconfigurations or unvalidated input in web applications.

**Key Findings**

New detections added for multiple exploit categories:

SSRF (Server-Side Request Forgery) — new rules targeting both local and cloud metadata abuse patterns (Beta).

SQL Injection (SQLi) — rules for common patterns, sleep/time-based injections, and string/wait function exploitation across headers and URIs.

SSTI (Server-Side Template Injection) — arithmetic-based probe detections introduced across URI, header, and body fields.

Reverse Shell and XXE payloads — enhanced heuristics for command execution and XML external entity misuse.

Prototype Pollution — new Beta rule identifying common JSON payload structures used in object prototype poisoning.

PHP Wrapper Injection and HTTP Parameter Pollution detections — to catch path traversal and multi-parameter manipulation attempts.

Anomaly Header Checks — detecting CRLF injection attempts in header names.

**Impact**

These updates help detect multi-vector payloads that blend SSRF + RCE or SQLi + SSTI attacks, especially in cloud-hosted applications with exposed metadata endpoints or unsafe template rendering.

Prototype Pollution and HTTP parameter pollution rules address emerging JavaScript supply-chain exploitation patterns increasingly seen in real-world incidents.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...589f2a1d | N/A            | Anomaly:Header - name - CR, LF                       | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...132fab7e | N/A            | Generic Rules - Reverse Shell - Body                 | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...1a027008 | N/A            | Generic Rules - Reverse Shell - Header               | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...958d0486 | N/A            | Generic Rules - Reverse Shell - URI                  | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...8e0cf7ad | N/A            | Generic Rules - XXE - Body                           | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...bf8aab5e | N/A            | Generic Rules - SQLi - Common Patterns - Header URI  | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...2e466337 | N/A            | Generic Rules - SQLi - Sleep Function - Header URI   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...b686ab47 | N/A            | Generic Rules - SQLi - String Function - Header URI  | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...b0633709 | N/A            | Generic Rules - SQLi - WaitFor Function - Header URI | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...01a076eb | N/A            | SSRF - Local - Beta                                  | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...743a63ec | N/A            | SSRF - Local - 2 - Beta                              | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...c2e84e2d | N/A            | SSRF - Cloud - Beta                                  | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...ab8af26f | N/A            | SSRF - Cloud - 2 - Beta                              | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...e6e8dc5b | N/A            | SSTI - Arithmetic Probe - URI                        | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...2550d794 | N/A            | SSTI - Arithmetic Probe - Header                     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...659d12a6 | N/A            | SSTI - Arithmetic Probe - Body                       | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...1a3e521e | N/A            | PHP Wrapper Injection                                | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...8f76bd74 | N/A            | PHP Wrapper Injection                                | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...091e296d | N/A            | HTTP parameter pollution                             | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...e34214ef | N/A            | Prototype Pollution - Common Payloads - Beta         | N/A             | Disabled   | This is a New Detection |

## 2025-10-13

  
**WAF Release - 2025-10-13**   

This week’s highlights include a new JinJava rule targeting a sandbox-bypass flaw that could allow malicious template input to escape execution controls. The rule improves detection for unsafe template rendering paths.

**Key Findings**

New WAF rule deployed for JinJava (CVE-2025-59340) to block a sandbox bypass in the template engine that permits attacker-controlled type construction and arbitrary class instantiation; in vulnerable environments this can escalate to remote code execution and full server compromise.

**Impact**

* CVE-2025-59340 — Exploitation enables attacker-supplied type descriptors / Jackson `ObjectMapper` abuse, allowing arbitrary class loading, file/URL access (LFI/SSRF primitives) and, with suitable gadget chains, potential remote code execution and system compromise.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                         | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...c04bab5f | 100892         | JinJava - SSTI - CVE:CVE-2025-59340 | Log             | Block      | This is a New Detection |

## 2025-10-07

  
**WAF Release - 2025-10-07 - Emergency**   

This week highlights multiple critical Cisco vulnerabilities (CVE-2025-20363, CVE-2025-20333, CVE-2025-20362). This flaw stems from improper input validation in HTTP(S) requests. An authenticated VPN user could send crafted requests to execute code as root, potentially compromising the device. The initial two rules were made available on September 28, with a third rule added today, October 7, for more robust protection.

* Cisco (CVE-2025-20333, CVE-2025-20362, CVE-2025-20363): Multiple vulnerabilities that could allow attackers to exploit unsafe deserialization and input validation flaws. Successful exploitation may result in arbitrary code execution, privilege escalation, or command injection on affected systems.

**Impact**

Cisco (CVE-2025-20333, CVE-2025-20362, CVE-2025-20363): Exploitation enables attackers to escalate privileges or achieve remote code execution via command injection. Administrators are strongly advised to apply vendor updates immediately.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                                                            | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...3a4d1bd6 | 100788B        | Cisco Secure Firewall Adaptive Security Appliance - Remote Code Execution - CVE:CVE-2025-20333, CVE:CVE-2025-20362, CVE:CVE-2025-20363 | N/A             | Block      | This is a New Detection |

## 2025-10-06

  
**WAF Release - 2025-10-06**   

This week’s highlights prioritise an emergency Oracle E-Business Suite RCE rule deployed to block active, high-impact exploitation. Also addressed are high-severity Chaos Mesh controller command-injection flaws that enable unauthenticated in-cluster RCE and potential cluster compromise, plus a form-data multipart boundary issue that permits HTTP Parameter Pollution (HPP). Two new generic SQLi detections were added to catch inline-comment obfuscation and information disclosure techniques.

**Key Findings**

* New emergency rule released for Oracle E-Business Suite (CVE-2025-61882) addressing an actively exploited remote code execution vulnerability in core business application modules. Immediate mitigation deployed to protect enterprise workloads.
* Chaos Mesh (CVE-2025-59358,CVE-2025-59359,CVE-2025-59360,CVE-2025-59361): A GraphQL debug endpoint on the Chaos Controller Manager is exposed without authentication; several controller mutations (`cleanTcs`, `killProcesses`, `cleanIptables`) are vulnerable to OS command injection.
* Form-Data (CVE-2025-7783): Attackers who can observe `Math.random()` outputs and control request fields in form-data may exploit this flaw to perform HTTP parameter pollution, leading to request tampering or data manipulation.
* Two new generic SQLi detections added to enhance baseline coverage against inline-comment obfuscation and information disclosure attempts.

**Impact**

* CVE-2025-61882 — Oracle E-Business Suite remote code execution (emergency detection): attacker-controlled input can yield full system compromise, data exfiltration, and operational outage; immediate blocking enforced.
* CVE-2025-59358 / CVE-2025-59359 / CVE-2025-59360 / CVE-2025-59361 — Unauthenticated command-injection in Chaos Mesh controllers allowing remote code execution, cluster compromise, and service disruption (high availability risk).
* CVE-2025-7783 — Predictable multipart boundaries in form-data enabling HTTP Parameter Pollution; results include request tampering, parameter overwrite, and downstream data integrity loss.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...8650f52f | 100882         | Chaos Mesh - Missing Authentication - CVE:CVE-2025-59358             | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...2b8c3680 | 100883         | Chaos Mesh - Command Injection - CVE:CVE-2025-59359                  | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...ef859a04 | 100884         | Chaos Mesh - Command Injection - CVE:CVE-2025-59361                  | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...961f26a7 | 100886         | Form-Data - Parameter Pollution - CVE:CVE-2025-7783                  | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...26a4074c | 100888         | Chaos Mesh - Command Injection - CVE:CVE-2025-59360                  | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...31101b2f | 100916         | Oracle E-Business Suite - Remote Code Execution - CVE:CVE-2025-61882 | N/A             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...29aa43c3 | 100917         | Generic Rules - SQLi - Inline Comment Injection                      | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...73c10b6f | 100918         | Generic Rules - SQLi - Information Disclosure                        | N/A             | Disabled   | This is a New Detection |

## 2025-10-03

  
**WAF Release - 2025-10-03**   

**Managed Ruleset Updated**

This update introduces 21 new detections in the Cloudflare Managed Ruleset (all currently set to Disabled mode to preserve remediation logic and allow quick activation if needed). The rules cover a broad spectrum of threats - SQL injection techniques, command and code injection, information disclosure of common files, URL anomalies, and cross-site scripting.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                             | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...d61fac74 | 100902         | Generic Rules - Command Execution - 2   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...514aeeb8 | 100908         | Generic Rules - Command Execution - 3   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...8d46a6f4 | 100910         | Generic Rules - Command Execution - 4   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...1bd0a329 | 100915         | Generic Rules - Command Execution - 5   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...5e51450a | 100899         | Generic Rules - Content-Type Abuse      | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...7996012f | 100914         | Generic Rules - Content-Type Injection  | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...93209312 | 100911         | Generic Rules - Cookie Header Injection | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...0f373b3f | 100905         | Generic Rules - NoSQL Injection         | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...78a0ed04 | 100913         | Generic Rules - NoSQL Injection - 2     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...5d649624 | 100907         | Generic Rules - Parameter Pollution     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...fd1c674e | 100906         | Generic Rules - PHP Object Injection    | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...34c88168 | 100904         | Generic Rules - Prototype Pollution     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...3ab43f7e | 100897         | Generic Rules - Prototype Pollution 2   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...0d94ee22 | 100903         | Generic Rules - Reverse Shell           | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...d5add8e3 | 100909         | Generic Rules - Reverse Shell - 2       | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...565c78b0 | 100898         | Generic Rules - SSJI NoSQL              | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...12b837a0 | 100896         | Generic Rules - SSRF                    | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...11c4fb00 | 100895         | Generic Rules - Template Injection      | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...d3ed0123 | 100895A        | Generic Rules - Template Injection - 2  | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...7501a1d9 | 100912         | Generic Rules - XXE                     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...dc55cdb6 | 100900         | Relative Paths - Anomaly Headers        | N/A             | Disabled   | This is a New Detection |

## 2025-09-29

  
**WAF Release - 2025-09-29**   

This week highlights four important vendor- and component-specific issues: an authentication bypass in SimpleHelp (CVE-2024-57727), an information-disclosure flaw in Flowise Cloud (CVE-2025-58434), an SSRF in the WordPress plugin Ditty (CVE-2025-8085), and a directory-traversal bug in Vite (CVE-2025-30208). These are paired with improvements to our generic detection coverage (SQLi, SSRF) to raise the baseline and reduce noisy gaps.

**Key Findings**

* SimpleHelp (CVE-2024-57727): Authentication bypass in SimpleHelp that can allow unauthorized access to management interfaces or sessions.
* Flowise Cloud (CVE-2025-58434): Information-disclosure vulnerability in Flowise Cloud that may expose sensitive configuration or user data to unauthenticated or low-privileged actors.
* WordPress:Plugin: Ditty (CVE-2025-8085): SSRF in the Ditty WordPress plugin enabling server-side requests that could reach internal services or cloud metadata endpoints.
* Vite (CVE-2025-30208): Directory-traversal vulnerability in Vite allowing access to filesystem paths outside the intended web root.

**Impact**

These vulnerabilities allow attackers to gain access, escalate privileges, or execute actions that were previously unavailable:

* SimpleHelp (CVE-2024-57727): An authentication bypass that can let unauthenticated attackers access management interfaces or hijack sessions — enabling lateral movement, credential theft, or privilege escalation within affected environments.
* Flowise Cloud (CVE-2025-58434): Information-disclosure flaw that can expose sensitive configuration, tokens, or user data; leaked secrets may be chained into account takeover or privileged access to backend services.
* WordPress:Plugin: Ditty (CVE-2025-8085): SSRF that enables server-side requests to internal services or cloud metadata endpoints, potentially allowing attackers to retrieve credentials or reach otherwise inaccessible infrastructure, leading to privilege escalation or cloud resource compromise.
* Vite (CVE-2025-30208): Directory-traversal vulnerability that can expose filesystem contents outside the web root (configuration files, keys, source code), which attackers can use to escalate privileges or further compromise systems.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                                                                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | ----------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...8c2e30fb | 100717         | SimpleHelp - Auth Bypass - CVE:CVE-2024-57727               | Log             | Block      | This rule is merged to 100717 in legacy WAF and ...958094d3  in new WAF |
| Cloudflare Managed Ruleset | ...d58b886b | 100775         | Flowise Cloud - Information Disclosure - CVE:CVE-2025-58434 | Log             | Block      | This is a New Detection                                                 |
| Cloudflare Managed Ruleset | ...9bce1ff4 | 100881         | WordPress:Plugin:Ditty - SSRF - CVE:CVE-2025-8085           | Log             | Block      | This is a New Detection                                                 |
| Cloudflare Managed Ruleset | ...ddc329dd | 100887         | Vite - Directory Traversal - CVE:CVE-2025-30208             | Log             | Block      | This is a New Detection                                                 |

## 2025-09-28

  
**WAF Release - 2025-09-28 - Emergency**   

This week highlights multiple critical Cisco vulnerabilities (CVE-2025-20363, CVE-2025-20333, CVE-2025-20362). This flaw stems from improper input validation in HTTP(S) requests. An authenticated VPN user could send crafted requests to execute code as root, potentially compromising the device.

**Key Findings**

* Cisco (CVE-2025-20333, CVE-2025-20362, CVE-2025-20363): Multiple vulnerabilities that could allow attackers to exploit unsafe deserialization and input validation flaws. Successful exploitation may result in arbitrary code execution, privilege escalation, or command injection on affected systems.

**Impact**

Cisco (CVE-2025-20333, CVE-2025-20362, CVE-2025-20363): Exploitation enables attackers to escalate privileges or achieve remote code execution via command injection.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                                                            | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...9ee0ab84 | 100788         | Cisco Secure Firewall Adaptive Security Appliance - Remote Code Execution - CVE:CVE-2025-20333, CVE:CVE-2025-20362, CVE:CVE-2025-20363 | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...d30f768e | 100788A        | Cisco Secure Firewall Adaptive Security Appliance - Remote Code Execution - CVE:CVE-2025-20333, CVE:CVE-2025-20362, CVE:CVE-2025-20363 | N/A             | Disabled   | This is a New Detection |

## 2025-09-26

  
**WAF Release - 2025-09-26**   

**Managed Ruleset Updated**

This update introduces 11 new detections in the Cloudflare Managed Ruleset (all currently set to Disabled mode to preserve remediation logic and allow quick activation if needed). The rules cover a broad spectrum of threats - SQL injection techniques, command and code injection, information disclosure of common files, URL anomalies, and cross-site scripting.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                               | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...a67d8561 | 100859A        | SQLi - UNION - 3                          | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...4de80468 | 100889         | Command Injection - Generic 9             | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...f2be3ddf | 100890         | Information Disclosure - Common Files - 2 | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...80a252a8 | 100891         | Anomaly:URL - Relative Paths              | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...7e7d3865 | 100894         | XSS - Inline Function                     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...3792565c | 100895         | XSS - DOM                                 | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...42978e38 | 100896         | SQLi - MSSQL Length Enumeration           | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...3ab43f7e | 100897         | Generic Rules - Code Injection - 3        | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...c1686741 | 100898         | SQLi - Evasion                            | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...20999be0 | 100899         | SQLi - Probing 2                          | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...b4026c88 | 100900         | SQLi - Probing                            | N/A             | Disabled   | This is a New Detection |

## 2025-09-24

  
**WAF Release - 2025-09-24 - Emergency**   

This week highlights a critical vendor-specific vulnerability: a deserialization flaw in the License Servlet of Fortra’s GoAnywhere MFT. By forging a license response signature, an attacker can trigger deserialization of arbitrary objects, potentially leading to command injection.

**Key Findings**

* GoAnywhere MFT (CVE-2025-10035): Deserialization vulnerability in the License Servlet that allows attackers with a forged license response signature to deserialize arbitrary objects, potentially resulting in command injection.

**Impact**

GoAnywhere MFT (CVE-2025-10035): Exploitation enables attackers to escalate privileges or achieve remote code execution via command injection.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...e08b39f3 | 100787         | Fortra GoAnywhere - Auth Bypass - CVE:CVE-2025-10035 | N/A             | Block      | This is a New Detection |

## 2025-09-22

  
**WAF Release - 2025-09-22**   

This week emphasizes two critical vendor-specific vulnerabilities: a full elevation-of-privilege in Microsoft Azure Networking (CVE-2025-54914) and a server-side template injection (SSTI) leading to remote code execution (RCE) in Skyvern (CVE-2025-49619). These are complemented by enhancements in generic detections (SQLi, SSRF) to improve baseline coverage.

**Key Findings**

* Azure (CVE-2025-54914): Vulnerability in Azure Networking allowing elevation of privileges.
* Skyvern (CVE-2025-49619): Skyvern ≤ 0.1.85 has a server-side template injection (SSTI) vulnerability in its Prompt field (workflow blocks) via Jinja2\. Authenticated users with low privileges can get remote code execution (blind).
* Generic SQLi / SSRF improvements: Expanded rule coverage to detect obfuscated SQL injection patterns and SSRF across host, local, and cloud contexts.

**Impact**

These vulnerabilities allow attackers to escalate privileges or execute code under conditions where previously they could not:

* Azure CVE-2025-54914 enables an attacker from the network with no credentials to gain high-level access within Azure Networking; could lead to full compromise of networking components.
* Skyvern CVE-2025-49619 allows authenticated users with minimal privilege to exploit SSTI for remote code execution, undermining isolation of workflow components.
* The improvements for SQLi and SSRF reduce risk from common injection and request-based attacks.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                                                             |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | -------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...6a135cbf | 100146         | SSRF - Host - 2                                             | Log             | Disabled   | This is a New Detection                                              |
| Cloudflare Managed Ruleset | ...57035abf | 100146B        | SSRF - Local - 2                                            | Log             | Disabled   | This is a New Detection                                              |
| Cloudflare Managed Ruleset | ...bbe18d50 | 100146C        | SSRF - Cloud - 2                                            | Log             | Disabled   | This is a New Detection                                              |
| Cloudflare Managed Ruleset | ...956c1961 | 100714         | Azure - Auth Bypass - CVE:CVE-2025-54914                    | Log             | Block      | This is a New Detection                                              |
| Cloudflare Managed Ruleset | ...c5ced231 | 100758         | Skyvern - Remote Code Execution - CVE:CVE-2025-49619        | Log             | Block      | This is a New Detection                                              |
| Cloudflare Managed Ruleset | ...84a619a1 | 100773         | Next.js - SSRF                                              | Log             | Block      | This is a New Detection                                              |
| Cloudflare Managed Ruleset | ...983ff2dd | 100774         | Adobe Commerce - Remote Code Execution - CVE:CVE-2025-54236 | Log             | Block      | This is a New Detection                                              |
| Cloudflare Managed Ruleset | ...0380a1a6 | 100800\_BETA   | SQLi - Obfuscated Boolean - Beta                            | Log             | Block      | This rule has been merged into the original rule (ID: ...5563445f  ) |

## 2025-09-15

  
**WAF Release - 2025-09-15**   

**This week's update**

This week's focus highlights newly disclosed vulnerabilities in DevOps tooling, data visualization platforms, and enterprise CMS solutions. These issues include sensitive information disclosure and remote code execution, putting organizations at risk of credential leakage, unauthorized access, and full system compromise.

**Key Findings**

* Argo CD (CVE-2025-55190): Exposure of sensitive information could allow attackers to access credential data stored in configurations, potentially leading to compromise of Kubernetes workloads and secrets.
* DataEase (CVE-2025-57773): Insufficient input validation enables JNDI injection and insecure deserialization, resulting in remote code execution (RCE). Successful exploitation grants attackers control over the application server.
* Sitecore (CVE-2025-53694): A sensitive information disclosure flaw allows unauthorized access to confidential information stored in Sitecore deployments, raising the risk of data breaches and privilege escalation.

**Impact**

These vulnerabilities expose organizations to serious risks, including credential theft, unauthorized access, and full system compromise. Argo CD's flaw may expose Kubernetes secrets, DataEase exploitation could give attackers remote execution capabilities, and Sitecore's disclosure issue increases the likelihood of sensitive data leakage and business impact.

Administrators are strongly advised to apply vendor patches immediately, rotate exposed credentials, and review access controls to mitigate these risks.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...2ee2085f | 100646         | Argo CD - Information Disclosure - CVE:CVE-2025-55190s | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...f5e20788 | 100874         | DataEase - JNDI injection - CVE:CVE-2025-57773         | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...005a12fd | 100880         | Sitecore - Information Disclosure - CVE:CVE-2025-53694 | Log             | Block      | This is a New Detection |

## 2025-09-08

  
**WAF Release - 2025-09-08**   

**This week's update**

This week’s focus highlights newly disclosed vulnerabilities in web frameworks, enterprise applications, and widely deployed CMS plugins. The vulnerabilities include SSRF, authentication bypass, arbitrary file upload, and remote code execution (RCE), exposing organizations to high-impact risks such as unauthorized access, system compromise, and potential data exposure. In addition, security rule enhancements have been deployed to cover general command injection and server-side injection attacks, further strengthening protections.

**Key Findings**

* Next.js (CVE-2025-57822): Improper handling of redirects in custom middleware can lead to server-side request forgery (SSRF) when user-supplied headers are forwarded. Attackers could exploit this to access internal services or cloud metadata endpoints. The issue has been resolved in versions 14.2.32 and 15.4.7\. Developers using custom middleware should upgrade and verify proper redirect handling in `next()` calls.
* ScriptCase (CVE-2025-47227, CVE-2025-47228): In the Production Environment extension in Netmake ScriptCase through 9.12.006 (23), two vulnerabilities allow attackers to reset admin accounts and execute system commands, potentially leading to full compromise of affected deployments.
* Sar2HTML (CVE-2025-34030): In Sar2HTML version 3.2.2 and earlier, insufficient input sanitization of the plot parameter allows remote, unauthenticated attackers to execute arbitrary system commands. Exploitation could compromise the underlying server and its data.
* Zhiyuan OA (CVE-2025-34040): An arbitrary file upload vulnerability exists in the Zhiyuan OA platform. Improper validation in the `wpsAssistServlet` interface allows unauthenticated attackers to upload crafted files via path traversal, which can be executed on the web server, leading to remote code execution.
* WordPress:Plugin:InfiniteWP Client (CVE-2020-8772): A vulnerability in the InfiniteWP Client plugin allows attackers to perform restricted actions and gain administrative control of connected WordPress sites.

**Impact**

These vulnerabilities could allow attackers to gain unauthorized access, execute malicious code, or take full control of affected systems. The Next.js SSRF flaw may expose internal services or cloud metadata endpoints to attackers. Exploitations of ScriptCase and Sar2HTML could result in remote code execution, administrative takeover, and full server compromise. In Zhiyuan OA, the arbitrary file upload vulnerability allows attackers to execute malicious code on the web server, potentially exposing sensitive data and applications. The authentication bypass in WordPress InfiniteWP Client enables attackers to gain administrative access, risking data exposure and unauthorized control of connected sites.

Administrators are strongly advised to apply vendor patches immediately, remove unsupported software, and review authentication and access controls to mitigate these risks.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                    | Previous Action | New Action | Comments                                                                                                                                      |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------------ | --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...963d7afc | 100007D        | Command Injection - Common Attack Commands Args                                | Log             | Block      | This rule has been merged into the original rule "Command Injection - Common Attack Commands" (ID: ...28345b9b  ) for New WAF customers only. |
| Cloudflare Managed Ruleset | ...8230a75b | 100617         | Next.js - SSRF - CVE:CVE-2025-57822                                            | Log             | Block      | This is a New Detection                                                                                                                       |
| Cloudflare Managed Ruleset | ...a22dabf1 | 100659\_BETA   | Common Payloads for Server-Side Template Injection - Beta                      | Log             | Block      | This rule is merged into the original rule "Common Payloads for Server-Side Template Injection" (ID: ...a28a42c4  )                           |
| Cloudflare Managed Ruleset | ...b416b7ca | 100824B        | CrushFTP - Remote Code Execution - CVE:CVE-2025-54309 - 3                      | Log             | Disabled   | This is a New Detection                                                                                                                       |
| Cloudflare Managed Ruleset | ...5db1fa6b | 100848         | ScriptCase - Auth Bypass - CVE:CVE-2025-47227                                  | Log             | Disabled   | This is a New Detection                                                                                                                       |
| Cloudflare Managed Ruleset | ...2c62d330 | 100849         | ScriptCase - Command Injection - CVE:CVE-2025-47228                            | Log             | Disabled   | This is a New Detection                                                                                                                       |
| Cloudflare Managed Ruleset | ...ef971afd | 100872         | WordPress:Plugin:InfiniteWP Client - Missing Authorization - CVE:CVE-2020-8772 | Log             | Block      | This is a New Detection                                                                                                                       |
| Cloudflare Managed Ruleset | ...bab19b0b | 100873         | Sar2HTML - Command Injection - CVE:CVE-2025-34030                              | Log             | Block      | This is a New Detection                                                                                                                       |
| Cloudflare Managed Ruleset | ...f24c0fbe | 100875         | Zhiyuan OA - Remote Code Execution - CVE:CVE-2025-34040                        | Log             | Block      | This is a New Detection                                                                                                                       |

## 2025-09-04

  
**WAF Release - 2025-09-04 - Emergency**   

**This week's update**

This week, new critical vulnerabilities were disclosed in Sitecore’s Sitecore Experience Manager (XM), Sitecore Experience Platform (XP), specifically versions 9.0 through 9.3, and 10.0 through 10.4\. These flaws are caused by unsafe data deserialization and code reflection, leaving affected systems at high risk of exploitation.

**Key Findings**

* CVE-2025-53690: Remote Code Execution through Insecure Deserialization
* CVE-2025-53691: Remote Code Execution through Insecure Deserialization
* CVE-2025-53693: HTML Cache Poisoning through Unsafe Reflections

**Impact**

Exploitation could allow attackers to execute arbitrary code remotely on the affected system and conduct cache poisoning attacks, potentially leading to further compromise. Applying the latest vendor-released solution without delay is strongly recommended.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                           | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...0ee2c15e | 100878         | Sitecore - Remote Code Execution - CVE:CVE-2025-53691 | N/A             | Block      | This is a new detection |
| Cloudflare Managed Ruleset | ...7c5b669c | 100631         | Sitecore - Cache Poisoning - CVE:CVE-2025-53693       | N/A             | Block      | This is a new detection |
| Cloudflare Managed Ruleset | ...6c410240 | 100879         | Sitecore - Remote Code Execution - CVE:CVE-2025-53690 | N/A             | Block      | This is a new detection |

## 2025-09-01

  
**WAF Release - 2025-09-01**   

**This week's update**

This week, a critical vulnerability was disclosed in Fortinet FortiWeb (versions 7.6.3 and below, versions 7.4.7 and below, versions 7.2.10 and below, and versions 7.0.10 and below), linked to improper parameter handling that could allow unauthorized access.

**Key Findings**

* Fortinet FortiWeb (CVE-2025-52970): A vulnerability may allow an unauthenticated remote attacker with access to non-public information to log in as any existing user on the device via a specially crafted request.

**Impact**

Exploitation could allow an unauthenticated attacker to impersonate any existing user on the device, potentially enabling them to modify system settings or exfiltrate sensitive information, posing a serious security risk. Upgrading to the latest vendor-released version is strongly recommended.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                                                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...c49b7cf8 | 100586         | Fortinet FortiWeb - Auth Bypass - CVE:CVE-2025-52970 | Log             | Disabled   | This is a New Detection                                 |
| Cloudflare Managed Ruleset | ...790c9dde | 100136C        | XSS - JavaScript - Headers and Body                  | N/A             | N/A        | Rule metadata description refined. Detection unchanged. |

## 2025-08-29

  
**WAF Release - 2025-08-29 - Emergency**   

**This week's update**

This week, new critical vulnerabilities were disclosed in Next.js’s image optimization functionality, exposing a broad range of production environments to risks of data exposure and cache manipulation.

**Key Findings**

* CVE-2025-55173: Arbitrary file download from the server via image optimization.
* CVE-2025-57752: Cache poisoning leading to unauthorized data disclosure.

**Impact**

Exploitation could expose sensitive files, leak user or backend data, and undermine application trust. Given Next.js’s wide use, immediate patching and cache hardening are strongly advised.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...9ff4bfe3 | 100613         | Next.js - Dangerous File Download - CVE:CVE-2025-55173 | N/A             | Block      | This is a new detection |
| Cloudflare Managed Ruleset | ...69b9ea7d | 100616         | Next.js - Information Disclosure - CVE:CVE-2025-57752  | N/A             | Block      | This is a new detection |

## 2025-08-25

  
**WAF Release - 2025-08-25**   

**This week's update**

This week, critical vulnerabilities were disclosed that impact widely used open-source infrastructure, creating high-risk scenarios for code execution and operational disruption.

**Key Findings**

* Apache HTTP Server – Code Execution (CVE-2024-38474): A flaw in Apache HTTP Server allows attackers to achieve remote code execution, enabling full compromise of affected servers. This vulnerability threatens the confidentiality, integrity, and availability of critical web services.
* Laravel (CVE-2024-55661): A security flaw in Laravel introduces the potential for remote code execution under specific conditions. Exploitation could provide attackers with unauthorized access to application logic and sensitive backend data.

**Impact**

These vulnerabilities pose severe risks to enterprise environments and open-source ecosystems. Remote code execution enables attackers to gain deep system access, steal data, disrupt services, and establish persistent footholds for broader intrusions. Given the widespread deployment of Apache HTTP Server and Laravel in production systems, timely patching and mitigation are critical.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                           | Previous Action | New Action | Comments                                                                                                                            |
| -------------------------- | ----------- | -------------- | --------------------------------------------------------------------- | --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...28050359 | 100822\_BETA   | WordPress:Plugin:WPBookit - Remote Code Execution - CVE:CVE-2025-6058 | N/A             | Disabled   | This was merged in to the original rule "WordPress:Plugin:WPBookit - Remote Code Execution - CVE:CVE-2025-6058" (ID: ...194f7b2d  ) |
| Cloudflare Managed Ruleset | ...3bdcdbad | 100831         | Apache HTTP Server - Code Execution - CVE:CVE-2024-38474              | Log             | Disabled   | This is a New Detection                                                                                                             |
| Cloudflare Managed Ruleset | ...02eaac5b | 100846         | Laravel - Remote Code Execution - CVE:CVE-2024-55661                  | Log             | Disabled   | This is a New Detection                                                                                                             |

## 2025-08-22

  
**WAF Release - 2025-08-22**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                     | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...5fcca5c8 | 100850         | Command Injection - Generic 2                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...744305c4 | 100851         | Remote Code Execution - Java Deserialization    | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...2b083459 | 100852         | Command Injection - Generic 3                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...efb7e5b9 | 100853         | Remote Code Execution - Common Bash Bypass Beta | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...78513ad7 | 100854         | XSS - Generic JavaScript                        | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...e9a5daac | 100855         | Command Injection - Generic 4                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...480f6093 | 100856         | PHP Object Injection                            | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...d4ae0a33 | 100857         | Generic - Parameter Fuzzing                     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...1121ee45 | 100858         | Code Injection - Generic 4                      | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...20de01e3 | 100859         | SQLi - UNION - 2                                | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...c0177e21 | 100860         | Command Injection - Generic 5                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...85f4d7b3 | 100861         | Command Execution - Generic                     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...3fa8ee7f | 100862         | GraphQL Injection - 2                           | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...c7a41d4b | 100863         | Command Injection - Generic 6                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...65e3c165 | 100864         | Code Injection - Generic 2                      | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...161aafdc | 100865         | PHP Object Injection - 2                        | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...1cc3c3f8 | 100866         | SQLi - LIKE 2                                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...48ac2221 | 100867         | SQLi - DROP - 2                                 | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...1f4eec13 | 100868         | Code Injection - Generic 3                      | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...2755f99e | 100869         | Command Injection - Generic 7                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...413592e2 | 100870         | Command Injection - Generic 8                   | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...d2dd41b5 | 100871         | SQLi - LIKE 3                                   | N/A             | Disabled   | This is a New Detection |

## 2025-08-18

  
**WAF Release - 2025-08-18**   

**This week's update**

This week, a series of critical vulnerabilities were discovered impacting core enterprise and open-source infrastructure. These flaws present a range of risks, providing attackers with distinct pathways for remote code execution, methods to breach internal network boundaries, and opportunities for critical data exposure and operational disruption.

**Key Findings**

* SonicWall SMA (CVE-2025-32819, CVE-2025-32820, CVE-2025-32821): A remote authenticated attacker with SSLVPN user privileges can bypass path traversal protections. These vulnerabilities enable a attacker to bypass security checks to read, modify, or delete arbitrary files. An attacker with administrative privileges can escalate this further, using a command injection flaw to upload malicious files, which could ultimately force the appliance to reboot to its factory default settings.
* Ms-Swift Project (CVE-2025-50460): An unsafe deserialization vulnerability exists in the Ms-Swift project's handling of YAML configuration files. If an attacker can control the content of a configuration file passed to the application, they can embed a malicious payload that will execute arbitrary code and it can be executed during deserialization.
* Apache Druid (CVE-2023-25194): This vulnerability in Apache Druid allows an attacker to cause the server to connect to a malicious LDAP server. By sending a specially crafted LDAP response, the attacker can trigger an unrestricted deserialization of untrusted data. If specific "gadgets" (classes that can be abused) are present in the server's classpath, this can be escalated to achieve Remote Code Execution (RCE).
* Tenda AC8v4 (CVE-2025-51087, CVE-2025-51088): Vulnerabilities allow an authenticated attacker to trigger a stack-based buffer overflow. By sending malformed arguments in a request to specific endpoints, an attacker can crash the device or potentially achieve arbitrary code execution.
* Open WebUI (CVE-2024-7959): This vulnerability allows a user to change the OpenAI URL endpoint to an arbitrary internal network address without proper validation. This flaw can be exploited to access internal services or cloud metadata endpoints, potentially leading to remote command execution if the attacker can retrieve instance secrets or access sensitive internal APIs.
* BentoML (CVE-2025-54381): The vulnerability exists in the serialization/deserialization handlers for multipart form data and JSON requests, which automatically download files from user-provided URLs without proper validation of internal network addresses. This allows attackers to fetch from unintended internal services, including cloud metadata and localhost.
* Adobe Experience Manager Forms (CVE-2025-54254): An Improper Restriction of XML External Entity Reference ('XXE') vulnerability that could lead to arbitrary file system read in Adobe AEM (≤6.5.23).

**Impact**

These vulnerabilities affect core infrastructure, from network security appliances like SonicWall to data platforms such as Apache Druid and ML frameworks like BentoML. The code execution and deserialization flaws are particularly severe, offering deep system access that allows attackers to steal data, disrupt services, and establish a foothold for broader intrusions. Simultaneously, SSRF and XXE vulnerabilities undermine network boundaries, exposing sensitive internal data and creating pathways for lateral movement. Beyond data-centric threats, flaws in edge devices like the Tenda router introduce the tangible risk of operational disruption, highlighting a multi-faceted threat to the security and stability of key enterprise systems.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                        | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...418d9a3b | 100574         | SonicWall SMA - Remote Code Execution - CVE:CVE-2025-32819, CVE:CVE-2025-32820, CVE:CVE-2025-32821 | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...1e6fefdb | 100576         | Ms-Swift Project - Remote Code Execution - CVE:CVE-2025-50460                                      | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...08ac45b3 | 100585         | Apache Druid - Remote Code Execution - CVE:CVE-2023-25194                                          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...e4855472 | 100834         | Tenda AC8v4 - Auth Bypass - CVE:CVE-2025-51087, CVE:CVE-2025-51088                                 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...022ab542 | 100835         | Open WebUI - SSRF - CVE:CVE-2024-7959                                                              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...6339f132 | 100837         | SQLi - OOB                                                                                         | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...b83d2625 | 100841         | BentoML - SSRF - CVE:CVE-2025-54381                                                                | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...739180d2 | 100841A        | BentoML - SSRF - CVE:CVE-2025-54381 - 2                                                            | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...6ab910c2 | 100841B        | BentoML - SSRF - CVE:CVE-2025-54381 - 3                                                            | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...2197ec51 | 100845         | Adobe Experience Manager Forms - XSS - CVE:CVE-2025-54254                                          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...96f34ce3 | 100845A        | Adobe Experience Manager Forms - XSS - CVE:CVE-2025-54254 - 2                                      | Log             | Block      | This is a New Detection |

## 2025-08-11

  
**WAF Release - 2025-08-11**   

This week's update focuses on a wide range of enterprise software, from network infrastructure and security platforms to content management systems and development frameworks. Flaws include unsafe deserialization, OS command injection, SSRF, authentication bypass, and arbitrary file upload — many of which allow unauthenticated remote code execution. Notable risks include Cisco Identity Services Engine and Ivanti EPMM, where successful exploitation could grant attackers full administrative control of core network infrastructure and popular web services such as WordPress, SharePoint, and Ingress-Nginx, where security bypasses and arbitrary file uploads could lead to complete site or server compromise.

**Key Findings**

* Cisco Identity Services Engine (CVE-2025-20281): Insufficient input validation in a specific API of Cisco Identity Services Engine (ISE) and ISE-PIC allows an unauthenticated, remote attacker to execute arbitrary code with root privileges on an affected device.
* Wazuh Server (CVE-2025-24016): An unsafe deserialization vulnerability in Wazuh Server (versions 4.4.0 to 4.9.0) allows for remote code execution and privilege escalation. By injecting unsanitized data, an attacker can trigger an exception to execute arbitrary code on the server.
* CrushFTP (CVE-2025-54309): A flaw in AS2 validation within CrushFTP allows remote attackers to gain administrative access via HTTPS on systems not using the DMZ proxy feature. This flaw can lead to unauthorized file access and potential system compromise.
* Kentico Xperience CMS (CVE-2025-2747, CVE-2025-2748): Vulnerabilities in Kentico Xperience CMS could enable cross-site scripting (XSS), allowing attackers to inject malicious scripts into web pages. Additionally, a flaw could allow unauthenticated attackers to bypass the Staging Sync Server's authentication, potentially leading to administrative control over the CMS.
* Node.js (CVE-2025-27210): An incomplete fix for a previous vulnerability (CVE-2025-23084) in Node.js affects the `path.join()` API method on Windows systems. The vulnerability can be triggered using reserved Windows device names such as `CON`, `PRN`, or `AUX`.
* WordPress:Plugin:Simple File List (CVE-2025-34085, CVE-2020-36847): This vulnerability in the Simple File List plugin for WordPress allows an unauthenticated remote attacker to upload arbitrary files to a vulnerable site. This can be exploited to achieve remote code execution on the server.  
(Note: CVE-2025-34085 has been rejected as a duplicate.)
* GeoServer (CVE-2024-29198): A Server-Side Request Forgery (SSRF) vulnerability exists in GeoServer's Demo request endpoint, which can be exploited where the Proxy Base URL has not been configured.
* Ivanti EPMM (CVE-2025-6771): An OS command injection vulnerability in Ivanti Endpoint Manager Mobile (EPMM) before versions 12.5.0.2, 12.4.0.3, and 12.3.0.3 allows a remote, authenticated attacker with high privileges to execute arbitrary code.
* Microsoft SharePoint (CVE-2024-38018): This is a remote code execution vulnerability affecting Microsoft SharePoint Server.
* Manager-IO (CVE-2025-54122): A critical unauthenticated full read Server-Side Request Forgery (SSRF) vulnerability is present in the proxy handler of both Manager Desktop and Server editions up to version 25.7.18.2519\. This allows an unauthenticated attacker to bypass network isolation and access internal services.
* Ingress-Nginx (CVE-2025-1974): A vulnerability in the Ingress-Nginx controller for Kubernetes allows an attacker to bypass access control rules. An unauthenticated attacker with access to the pod network can achieve arbitrary code execution in the context of the ingress-nginx controller.
* PaperCut NG/MF (CVE-2023-2533): A Cross-Site Request Forgery (CSRF) vulnerability has been identified in PaperCut NG/MF. Under specific conditions, an attacker could exploit this to alter security settings or execute arbitrary code if they can deceive an administrator with an active login session into clicking a malicious link.
* SonicWall SMA (CVE-2025-40598): This vulnerability could allow an unauthenticated attacker to bypass security controls. This allows a remote, unauthenticated attacker to potentially execute arbitrary JavaScript code.
* WordPress (CVE-2025-5394): The "Alone – Charity Multipurpose Non-profit WordPress Theme" for WordPress is vulnerable to arbitrary file uploads. A missing capability check allows unauthenticated attackers to upload ZIP files containing webshells disguised as plugins, leading to remote code execution.

**Impact**

These vulnerabilities span a broad range of enterprise technologies, including network access control systems, monitoring platforms, web servers, CMS platforms, cloud services, and collaboration tools. Exploitation techniques range from remote code execution and command injection to authentication bypass, SQL injection, path traversal, and configuration weaknesses.

A critical flaw in perimeter devices like Ivanti EPMM or SonicWall SMA could allow an unauthenticated attacker to gain remote code execution, completely breaching the primary network defense. A separate vulnerability within Cisco's Identity Services Engine could then be exploited to bypass network segmentation, granting an attacker widespread internal access. Insecure deserialization issues in platforms like Wazuh Server and CrushFTP could then be used to run malicious payloads or steal sensitive files from administrative consoles. Weaknesses in web delivery controllers like Ingress-Nginx or popular content management systems such as WordPress, SharePoint, and Kentico Xperience create vectors to bypass security controls, exfiltrate confidential data, or fully compromise servers.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                        | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...51bc8df1 | 100538         | GeoServer - SSRF - CVE:CVE-2024-29198                                              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...c9e0b290 | 100548         | Ivanti EPMM - Remote Code Execution - CVE:CVE-2025-6771                            | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...ad93cda8 | 100550         | Microsoft SharePoint - Remote Code Execution - CVE:CVE-2024-38018                  | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...1dca5738 | 100562         | Manager-IO - SSRF - CVE:CVE-2025-54122                                             | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...2e9137e1 | 100565         | Cisco Identity Services Engine - Remote Code Execution - CVE:CVE-2025-20281        | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...5d8102e1 | 100567         | Ingress-Nginx - Remote Code Execution - CVE:CVE-2025-1974                          | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...99105c43 | 100569         | PaperCut NG/MF - Remote Code Execution - CVE:CVE-2023-2533                         | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...2c81dc88 | 100571         | SonicWall SMA - XSS - CVE:CVE-2025-40598                                           | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...926c96d4 | 100573         | WordPress - Dangerous File Upload - CVE:CVE-2025-5394                              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...40ec2fda | 100806         | Wazuh Server - Remote Code Execution - CVE:CVE-2025-24016                          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...2401fa3b | 100824         | CrushFTP - Remote Code Execution - CVE:CVE-2025-54309                              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...74920ace | 100824A        | CrushFTP - Remote Code Execution - CVE:CVE-2025-54309 - 2                          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...c7e63549 | 100825         | AMI MegaRAC - Auth Bypass - CVE:CVE-2024-54085                                     | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...b79037e6 | 100826         | Kentico Xperience CMS - Auth Bypass - CVE:CVE-2025-2747                            | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...caf261aa | 100827         | Kentico Xperience CMS - XSS - CVE:CVE-2025-2748                                    | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...6f1c2d12 | 100828         | Node.js - Directory Traversal - CVE:CVE-2025-27210                                 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...0341fccc | 100829         | WordPress:Plugin:Simple File List - Remote Code Execution - CVE:CVE-2025-34085     | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...4cefeeda | 100829A        | WordPress:Plugin:Simple File List - Remote Code Execution - CVE:CVE-2025-34085 - 2 | Log             | Disabled   | This is a New Detection |

## 2025-08-07

  
**WAF Release - 2025-08-07 - Emergency**   

This week’s highlight focuses on two critical vulnerabilities affecting key infrastructure and enterprise content management platforms. Both flaws present significant remote code execution risks that can be exploited with minimal or no user interaction.

**Key Findings**

* Squid (≤6.3) — CVE-2025-54574: A heap buffer overflow occurs when processing Uniform Resource Names (URNs). This vulnerability may allow remote attackers to execute arbitrary code on the server. The issue has been resolved in version 6.4.
* Adobe AEM (≤6.5.23) — CVE-2025-54253: Due to a misconfiguration, attackers can achieve remote code execution without requiring any user interaction, posing a severe threat to affected deployments.

**Impact**

Both vulnerabilities expose critical attack vectors that can lead to full server compromise. The Squid heap buffer overflow allows remote code execution by crafting malicious URNs, which can lead to server takeover or denial of service. Given Squid’s widespread use as a caching proxy, this flaw could be exploited to disrupt network traffic or gain footholds inside secure environments.

Adobe AEM’s remote code execution vulnerability enables attackers to run arbitrary code on the content management server without any user involvement. This puts sensitive content, application integrity, and the underlying infrastructure at extreme risk. Exploitation could lead to data theft, defacement, or persistent backdoor installation.

These findings reinforce the urgency of updating to the patched versions — Squid 6.4 and Adobe AEM 6.5.24 or later — and reviewing configurations to prevent exploitation.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                 | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...ef7e015b | 100844         | Adobe Experience Manager Forms - Remote Code Execution - CVE:CVE-2025-54253 | N/A             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...baec057a | 100840         | Squid - Buffer Overflow - CVE:CVE-2025-54574                                | N/A             | Block      | This is a New Detection |

## 2025-08-04

  
**WAF Release - 2025-08-04**   

This week's highlight focuses on a series of significant vulnerabilities identified across widely adopted web platforms, from enterprise-grade CMS to essential backend administration tools. The findings reveal multiple vectors for attack, including critical flaws that allow for full server compromise and others that enable targeted attacks against users.

**Key Findings**

* Sitecore (CVE-2025-34509, CVE-2025-34510, CVE-2025-34511): A hardcoded credential allows remote attackers to access administrative APIs. Once authenticated, they can exploit an additional vulnerability to upload arbitrary files, leading to remote code execution.
* Grafana (CVE-2025-4123): A cross-site scripting (XSS) vulnerability allows an attacker to redirect users to a malicious website, which can then execute arbitrary JavaScript in the victim's browser.
* LaRecipe (CVE-2025-53833): Through Server-Side Template Injection, attackers can execute arbitrary commands on the server, potentially access sensitive environment variables, and escalate access depending on server configuration.
* CentOS WebPanel (CVE-2025-48703): A command injection vulnerability could allow a remote attacker to execute arbitrary commands on the server.
* WordPress (CVE-2023-5561): This vulnerability allows unauthenticated attackers to determine the email addresses of users who have published public posts on an affected website.
* WordPress Plugin - WPBookit (CVE-2025-6058): A missing file type validation allows unauthenticated attackers to upload arbitrary files to the server, creating the potential for remote code execution.
* WordPress Theme - Motors (CVE-2025-4322): Due to improper identity validation, an unauthenticated attacker can change the passwords of arbitrary users, including administrators, to gain access to their accounts.

**Impact**

These vulnerabilities pose a multi-layered threat to widely adopted web technologies, ranging from enterprise-grade platforms like Sitecore to everyday solutions such as WordPress, and backend tools like CentOS WebPanel. The most severe risks originate in remote code execution (RCE) flaws found in Sitecore, CentOS WebPanel, LaRecipe, and the WPBookit plugin. These allow attackers to bypass security controls and gain deep access to the server, enabling them to steal sensitive data, deface websites, install persistent malware, or use the compromised server as a launchpad for further attacks.

The privilege escalation vulnerability is the Motors theme, which allows for a complete administrative account takeover on WordPress sites. This effectively hands control of the application to an attacker, who can then manipulate content, exfiltrate user data, and alter site functionality without needing to breach the server itself.

The Grafana cross-site scripting (XSS) flaw can be used to hijack authenticated user sessions or steal credentials, turning a trusted user's browser into an attack vector.

Meanwhile, the information disclosure flaw in WordPress core provides attackers with valid user emails, fueling targeted phishing campaigns that aim to secure the same account access achievable through the other exploits.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                               | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...52f30a13 | 100535A        | Sitecore - Dangerous File Upload - CVE:CVE-2025-34510, CVE:CVE-2025-34511 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...5045a97f | 100535         | Sitecore - Information Disclosure - CVE:CVE-2025-34509                    | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...579cd3e0 | 100543         | Grafana - Directory Traversal - CVE:CVE-2025-4123                         | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...0cbd9abc | 100545         | WordPress - Information Disclosure - CVE:CVE-2023-5561                    | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...8f634977 | 100820         | CentOS WebPanel - Remote Code Execution - CVE:CVE-2025-48703              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...82ae64c1 | 100821         | LaRecipe - SSTI - CVE:CVE-2025-53833                                      | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...194f7b2d | 100822         | WordPress:Plugin:WPBookit - Remote Code Execution - CVE:CVE-2025-6058     | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...0bf1b661 | 100823         | WordPress:Theme:Motors - Privilege Escalation - CVE:CVE-2025-4322         | Log             | Block      | This is a New Detection |

## 2025-07-28

  
**WAF Release - 2025-07-28**   

This week’s update spotlights several vulnerabilities across Apache Tomcat, MongoDB, and Fortinet FortiWeb. Several flaws related with a memory leak in Apache Tomcat can lead to a denial-of-service attack. Additionally, a code injection flaw in MongoDB's Mongoose library allows attackers to bypass security controls to access restricted data.

**Key Findings**

* Fortinet FortiWeb (CVE-2025-25257): An improper neutralization of special elements used in a SQL command vulnerability in Fortinet FortiWeb versions allows an unauthenticated attacker to execute unauthorized SQL code or commands.
* Apache Tomcat (CVE-2025-31650): A improper Input Validation vulnerability in Apache Tomcat that could create memory leak when incorrect error handling for some invalid HTTP priority headers resulted in incomplete clean-up of the failed request.
* MongoDB (CVE-2024-53900, CVE:CVE-2025-23061): Improper use of `$where` in match and a nested `$where` filter with a `populate()` match in Mongoose can lead to search injection.

**Impact**

These vulnerabilities target user-facing components, web application servers, and back-end databases. A SQL injection flaw in Fortinet FortiWeb can lead to data theft or system compromise. A separate issue in Apache Tomcat involves a memory leak from improper input validation, which could be exploited for a denial-of-service (DoS) attack. Finally, a vulnerability in MongoDB's Mongoose library allows attackers to bypass security filters and access unauthorized data through malicious search queries.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                              | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------ | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...3461ec9e | 100804         | BerriAI - SSRF - CVE:CVE-2024-6587                                       | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...0cb13e1d | 100812         | Fortinet FortiWeb - Remote Code Execution - CVE:CVE-2025-25257           | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...67fae7f7 | 100813         | Apache Tomcat - DoS - CVE:CVE-2025-31650                                 | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...4b6a5bb1 | 100815         | MongoDB - Remote Code Execution - CVE:CVE-2024-53900, CVE:CVE-2025-23061 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...688f8e79 | 100816         | MongoDB - Remote Code Execution - CVE:CVE-2024-53900, CVE:CVE-2025-23061 | Log             | Block      | This is a New Detection |

## 2025-07-21

  
**WAF Release - 2025-07-21 - Emergency**   

This week's update highlights several high-impact vulnerabilities affecting Microsoft SharePoint Server. These flaws, involving unsafe deserialization, allow unauthenticated remote code execution over the network, posing a critical threat to enterprise environments relying on SharePoint for collaboration and document management.

**Key Findings**

* Microsoft SharePoint Server (CVE-2025-53770): A critical vulnerability involving unsafe deserialization of untrusted data, enabling unauthenticated remote code execution over the network. This flaw allows attackers to execute arbitrary code on vulnerable SharePoint servers without user interaction.
* Microsoft SharePoint Server (CVE-2025-53771): A closely related deserialization issue that can be exploited by unauthenticated attackers, potentially leading to full system compromise. The vulnerability highlights continued risks around insecure serialization logic in enterprise collaboration platforms.

**Impact**

Together, these vulnerabilities significantly weaken the security posture of on-premise Microsoft SharePoint Server deployments. By enabling remote code execution without authentication, they open the door for attackers to gain persistent access, deploy malware, and move laterally across enterprise environments.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...2168f6f0 | 100817         | Microsoft SharePoint - Deserialization - CVE:CVE-2025-53770 | N/A             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...8de656c4 | 100818         | Microsoft SharePoint - Deserialization - CVE:CVE-2025-53771 | N/A             | Block      | This is a New Detection |

For more details, also refer to [our blog ↗](https://blog.cloudflare.com/cloudflare-protects-against-critical-sharepoint-vulnerability-cve-2025-53770/).

## 2025-07-21

  
**WAF Release - 2025-07-21**   

This week's update spotlights several critical vulnerabilities across Citrix NetScaler Memory Disclosure, FTP servers and network application. Several flaws enable unauthenticated remote code execution or sensitive data exposure, posing a significant risk to enterprise security.

**Key Findings**

* Wing FTP Server (CVE-2025-47812): A critical Remote Code Execution (RCE) vulnerability that enables unauthenticated attackers to execute arbitrary code with root/SYSTEM-level privileges by exploiting a Lua injection flaw.
* Infoblox NetMRI (CVE-2025-32813): A remote unauthenticated command injection flaw that allows an attacker to execute arbitrary commands, potentially leading to unauthorized access.
* Citrix Netscaler ADC (CVE-2025-5777, CVE-2023-4966): A sensitive information disclosure vulnerability, also known as "Citrix Bleed2", that allows the disclosure of memory and subsequent remote access session hijacking.
* Akamai CloudTest (CVE-2025-49493): An XML External Entity (XXE) injection that could lead to read local files on the system by manipulating XML input.

**Impact**

These vulnerabilities affect critical enterprise infrastructure, from file transfer services and network management appliances to application delivery controllers. The Wing FTP RCE and Infoblox command injection flaws offer direct paths to deep system compromise, while the Citrix "Bleed2" and Akamai XXE vulnerabilities undermine system integrity by enabling session hijacking and sensitive data theft.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                       | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...3461ec9e | 100804         | BerriAI - SSRF - CVE:CVE-2024-6587                                | Log             | Log        | This is a New Detection |
| Cloudflare Managed Ruleset | ...5199b58a | 100805         | Wing FTP Server - Remote Code Execution - CVE:CVE-2025-47812      | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...919a91a4 | 100807         | Infoblox NetMRI - Command Injection - CVE:CVE-2025-32813          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...7899130f | 100808         | Citrix Netscaler ADC - Buffer Error - CVE:CVE-2025-5777           | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...d1cf8e08 | 100809         | Citrix Netscaler ADC - Information Disclosure - CVE:CVE-2023-4966 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...6e70469f | 100810         | Akamai CloudTest - XXE - CVE:CVE-2025-49493                       | Log             | Block      | This is a New Detection |

## 2025-07-14

  
**WAF Release - 2025-07-14**   

This week’s vulnerability analysis highlights emerging web application threats that exploit modern JavaScript behavior and SQL parsing ambiguities. Attackers continue to refine techniques such as attribute overloading and obfuscated logic manipulation to evade detection and compromise front-end and back-end systems.

**Key Findings**

* XSS – Attribute Overloading: A novel cross-site scripting technique where attackers abuse custom or non-standard HTML attributes to smuggle payloads into the DOM. These payloads evade traditional sanitization logic, especially in frameworks that loosely validate attributes or trust unknown tokens.
* XSS – onToggle Event Abuse: Exploits the lesser-used onToggle event (triggered by elements like `<details>`) to execute arbitrary JavaScript when users interact with UI elements. This vector is often overlooked by static analyzers and can be embedded in seemingly benign components.

**Impact**

These vulnerabilities target both user-facing components and back-end databases, introducing potential vectors for credential theft, session hijacking, or full data exfiltration. The XSS variants bypass conventional filters through overlooked HTML behaviors, while the obfuscated SQLi enables attackers to stealthily probe back-end logic, making them especially difficult to detect and block.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                 | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...2aa3d845 | 100798         | XSS - Attribute Overloading | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...37548d06 | 100799         | XSS - OnToggle              | Log             | Block      | This is a New Detection |

## 2025-07-07

  
**Increased IP List Limits for Enterprise Accounts**   

We have significantly increased the limits for [IP Lists](https://developers.cloudflare.com/waf/tools/lists/) on Enterprise plans to provide greater flexibility and control:

* **Total number of lists**: Increased from 10 to 1,000.
* **Total number of list items**: Increased from 10,000 to 500,000.

Limits for other list types and plans remain unchanged. For more details, refer to the [lists availability](https://developers.cloudflare.com/waf/tools/lists/#availability).

## 2025-07-07

  
**WAF Release - 2025-07-07**   

This week’s roundup uncovers critical vulnerabilities affecting enterprise VoIP systems, webmail platforms, and a popular JavaScript framework. The risks range from authentication bypass to remote code execution (RCE) and buffer handling flaws, each offering attackers a path to elevate access or fully compromise systems.

**Key Findings**

* Next.js - Auth Bypass: A newly detected authentication bypass flaw in the Next.js framework allows attackers to access protected routes or APIs without proper authorization, undermining application access controls.
* Fortinet FortiVoice (CVE-2025-32756): A buffer error vulnerability in FortiVoice systems that could lead to memory corruption and potential code execution or service disruption in enterprise telephony environments.
* Roundcube (CVE-2025-49113): A critical RCE flaw allowing unauthenticated attackers to execute arbitrary PHP code via crafted requests, leading to full compromise of mail servers and user inboxes.

**Impact**

These vulnerabilities affect core business infrastructure, from web interfaces to voice communications and email platforms. The Roundcube RCE and FortiVoice buffer flaw offer potential for deep system access, while the Next.js auth bypass undermines trust boundaries in modern web apps.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                             | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...7eb35ee6 | 100795         | Next.js - Auth Bypass                                   | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...c329aeb0 | 100796         | Fortinet FortiVoice - Buffer Error - CVE:CVE-2025-32756 | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...ab314023 | 100797         | Roundcube - Remote Code Execution - CVE:CVE-2025-49113  | Log             | Disabled   | This is a New Detection |

## 2025-06-16

  
**WAF Release - 2025-06-16**   

This week’s roundup highlights multiple critical vulnerabilities across popular web frameworks, plugins, and enterprise platforms. The focus lies on remote code execution (RCE), server-side request forgery (SSRF), and insecure file upload vectors that enable full system compromise or data exfiltration.

**Key Findings**

* Cisco IOS XE (CVE-2025-20188): Critical RCE vulnerability enabling unauthenticated attackers to execute arbitrary commands on network infrastructure devices, risking total router compromise.
* Axios (CVE-2024-39338): SSRF flaw impacting server-side request control, allowing attackers to manipulate internal service requests when misconfigured with unsanitized user input.
* vBulletin (CVE-2025-48827, CVE-2025-48828): Two high-impact RCE flaws enabling attackers to remotely execute PHP code, compromising forum installations and underlying web servers.
* Invision Community (CVE-2025-47916): A critical RCE vulnerability allowing authenticated attackers to run arbitrary code in community platforms, threatening data and lateral movement risk.
* CrushFTP (CVE-2025-32102, CVE-2025-32103): SSRF vulnerabilities in upload endpoint processing permit attackers to pivot internal network scans and abuse internal services.
* Roundcube (CVE-2025-49113): RCE via email processing enables attackers to execute code upon viewing a crafted email — particularly dangerous for webmail deployments.
* WooCommerce WordPress Plugin (CVE-2025-47577): Dangerous file upload vulnerability permits unauthenticated users to upload executable payloads, leading to full WordPress site takeover.
* Cross-Site Scripting (XSS) Detection Improvements: Enhanced detection patterns.

**Impact**

These vulnerabilities span core systems — from routers to e-commerce to email. RCE in Cisco IOS XE, Roundcube, and vBulletin poses full system compromise. SSRF in Axios and CrushFTP supports internal pivoting, while WooCommerce’s file upload bug opens doors to mass WordPress exploitation.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...35fefd53 | 100783         | Cisco IOS XE - Remote Code Execution - CVE:CVE-2025-20188                  | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...8332af5d | 100784         | Axios - SSRF - CVE:CVE-2024-39338                                          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...2e1648d2 | 100785         | vBulletin - Remote Code Execution - CVE:CVE-2025-48827, CVE:CVE-2025-48828 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...0edcf1ef | 100786         | Invision Community - Remote Code Execution - CVE:CVE-2025-47916            | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...d6f5eb48 | 100791         | CrushFTP - SSRF - CVE:CVE-2025-32102, CVE:CVE-2025-32103                   | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...30baa18a | 100792         | Roundcube - Remote Code Execution - CVE:CVE-2025-49113                     | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...229ba236 | 100793         | XSS - Ontoggle                                                             | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...fa338296 | 100794         | WordPress WooCommerce Plugin - Dangerous File Upload - CVE:CVE-2025-47577  | Log             | Block      | This is a New Detection |

## 2025-06-09

  
**WAF Release - 2025-06-09**   

This week’s update spotlights four critical vulnerabilities across CMS platforms, VoIP systems, and enterprise applications. Several flaws enable remote code execution or privilege escalation, posing significant enterprise risks.

**Key Findings**

* WordPress OttoKit Plugin (CVE-2025-27007): Privilege escalation flaw allows unauthenticated attackers to create or elevate user accounts, compromising WordPress administrative control.
* SAP NetWeaver (CVE-2025-42999): Remote Code Execution vulnerability enables attackers to execute arbitrary code on SAP NetWeaver systems, threatening core ERP and business operations.
* Fortinet FortiVoice (CVE-2025-32756): Buffer error vulnerability may lead to memory corruption and potential code execution, directly impacting enterprise VoIP infrastructure.
* Camaleon CMS (CVE-2024-46986): Remote Code Execution vulnerability allows attackers to gain full control over Camaleon CMS installations, exposing hosted content and underlying servers.

**Impact**

These vulnerabilities target widely deployed CMS, ERP, and VoIP systems. RCE flaws in SAP NetWeaver and Camaleon CMS allow full takeover of business-critical applications. Privilege escalation in OttoKit exposes WordPress environments to full administrative compromise. FortiVoice buffer handling issues risk destabilizing or fully compromising enterprise telephony systems.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...0debd86e | 100769         | WordPress OttoKit Plugin - Privilege Escalation - CVE:CVE-2025-27007 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...5f57b448 | 100770         | SAP NetWeaver - Remote Code Execution - CVE:CVE-2025-42999           | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...4df8857a | 100779         | Fortinet FortiVoice - Buffer Error - CVE:CVE-2025-32756              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...3b840107 | 100780         | Camaleon CMS - Remote Code Execution - CVE:CVE-2024-46986            | Log             | Block      | This is a New Detection |

## 2025-06-02

  
**WAF Release - 2025-06-02**   

This week’s roundup highlights five high-risk vulnerabilities affecting SD-WAN, load balancers, and AI platforms. Several flaws enable unauthenticated remote code execution or authentication bypass.

**Key Findings**

* Versa Concerto SD-WAN (CVE-2025-34026, CVE-2025-34027): Authentication bypass vulnerabilities allow attackers to gain unauthorized access to SD-WAN management interfaces, compromising network segmentation and control.
* Kemp LoadMaster (CVE-2024-7591): Remote Code Execution vulnerability enables attackers to execute arbitrary commands, potentially leading to full device compromise within enterprise load balancing environments.
* AnythingLLM (CVE-2024-0759): Server-Side Request Forgery (SSRF) flaw allows external attackers to force the LLM backend to make unauthorized internal network requests, potentially exposing sensitive internal resources.
* Anyscale Ray (CVE-2023-48022): Remote Code Execution vulnerability affecting distributed AI workloads, allowing attackers to execute arbitrary code on Ray cluster nodes.
* Server-Side Request Forgery (SSRF) - Generic & Obfuscated Payloads: Ongoing advancements in SSRF payload techniques observed, including obfuscation and expanded targeting of cloud metadata services and internal IP ranges.

**Impact**

These vulnerabilities expose critical infrastructure across networking, AI platforms, and SaaS integrations. Unauthenticated RCE and auth bypass flaws in Versa Concerto, Kemp LoadMaster, and Anyscale Ray allow full system compromise. AnythingLLM and SSRF payload variants expand attack surfaces into internal cloud resources, sensitive APIs, and metadata services, increasing risk of privilege escalation, data theft, and persistent access.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                 | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...39b52f02 | 100764         | Versa Concerto SD-WAN - Auth Bypass - CVE:CVE-2025-34027    | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...a34edb97 | 100765         | Versa Concerto SD-WAN - Auth Bypass - CVE:CVE-2025-34026    | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...0d99b2db | 100766         | Kemp LoadMaster - Remote Code Execution - CVE:CVE-2024-7591 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...95aa3a4f | 100767         | AnythingLLM - SSRF - CVE:CVE-2024-0759                      | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...840a0966 | 100768         | Anyscale Ray - Remote Code Execution - CVE:CVE-2023-48022   | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...9d16ee18 | 100781         | SSRF - Generic Payloads                                     | N/A             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...5c963d9d | 100782         | SSRF - Obfuscated Payloads                                  | N/A             | Disabled   | This is a New Detection |

## 2025-05-28

  
**Updated attack score model**   

We have deployed an updated attack score model focused on enhancing the detection of multiple false positives (FPs).

As a result of this improvement, some changes in observed attack scores are expected.

## 2025-05-27

  
**WAF Release - 2025-05-27**   

This week’s roundup covers nine vulnerabilities, including six critical RCEs and one dangerous file upload. Affected platforms span cloud services, CI/CD pipelines, CMSs, and enterprise backup systems. Several are now addressed by updated WAF managed rulesets.

**Key Findings**

* Ingress-Nginx (CVE-2025-1098): Unauthenticated RCE via unsafe annotation handling. Impacts Kubernetes clusters.
* GitHub Actions (CVE-2025-30066): RCE through malicious workflow inputs. Targets CI/CD pipelines.
* Craft CMS (CVE-2025-32432): Template injection enables unauthenticated RCE. High risk to content-heavy sites.
* F5 BIG-IP (CVE-2025-31644): RCE via TMUI exploit, allowing full system compromise.
* AJ-Report (CVE-2024-15077): RCE through untrusted template execution. Affects reporting dashboards.
* NAKIVO Backup (CVE-2024-48248): RCE via insecure script injection. High-value target for ransomware.
* SAP NetWeaver (CVE-2025-31324): Dangerous file upload flaw enables remote shell deployment.
* Ivanti EPMM (CVE-2025-4428, 4427): Auth bypass allows full access to mobile device management.
* Vercel (CVE-2025-32421): Information leak via misconfigured APIs. Useful for attacker recon.

**Impact**

These vulnerabilities expose critical components across Kubernetes, CI/CD pipelines, and enterprise systems to severe threats including unauthenticated remote code execution, authentication bypass, and information leaks. High-impact flaws in Ingress-Nginx, Craft CMS, F5 BIG-IP, and NAKIVO Backup enable full system compromise, while SAP NetWeaver and AJ-Report allow remote shell deployment and template-based attacks. Ivanti EPMM’s auth bypass further risks unauthorized control over mobile device fleets.

GitHub Actions and Vercel introduce supply chain and reconnaissance risks, allowing malicious workflow inputs and data exposure that aid in targeted exploitation. Organizations should prioritize immediate patching, enhance monitoring, and deploy updated WAF and IDS signatures to defend against likely active exploitation.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                      | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...d127592a | 100746         | Vercel - Information Disclosure                                  | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...95442495 | 100754         | AJ-Report - Remote Code Execution - CVE:CVE-2024-15077           | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...dfee7ae4 | 100756         | NAKIVO Backup - Remote Code Execution - CVE:CVE-2024-48248       | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...1c52f6d0 | 100757         | Ingress-Nginx - Remote Code Execution - CVE:CVE-2025-1098        | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...95442495 | 100759         | SAP NetWeaver - Dangerous File Upload - CVE:CVE-2025-31324       | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...5366ccc1 | 100760         | Craft CMS - Remote Code Execution - CVE:CVE-2025-32432           | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...eb40686b | 100761         | GitHub Action - Remote Code Execution - CVE:CVE-2025-30066       | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...60fc041c | 100762         | Ivanti EPMM - Auth Bypass - CVE:CVE-2025-4428, CVE:CVE-2025-4427 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...ebafdfe6 | 100763         | F5 Big IP - Remote Code Execution - CVE:CVE-2025-31644           | Log             | Disabled   | This is a New Detection |

## 2025-05-19

  
**WAF Release - 2025-05-19**   

This week's analysis covers four vulnerabilities, with three rated critical due to their Remote Code Execution (RCE) potential. One targets a high-traffic frontend platform, while another targets a popular content management system. These detections are now part of the Cloudflare Managed Ruleset in _Block_ mode.

**Key Findings**

* Commvault Command Center (CVE-2025-34028) exposes an unauthenticated RCE via insecure command injection paths in the web UI. This is critical due to its use in enterprise backup environments.
* BentoML (CVE-2025-27520) reveals an exploitable vector where serialized payloads in model deployment APIs can lead to arbitrary command execution. This targets modern AI/ML infrastructure.
* Craft CMS (CVE-2024-56145) allows RCE through template injection in unauthenticated endpoints. It poses a significant risk for content-heavy websites with plugin extensions.
* Apache HTTP Server (CVE-2024-38475) discloses sensitive server config data due to misconfigured`mod_proxy` behavior. While not RCE, this is useful for pre-attack recon.

**Impact**

These newly detected vulnerabilities introduce critical risk across modern web stacks, AI infrastructure, and content platforms: unauthenticated RCEs in Commvault, BentoML, and Craft CMS enable full system compromise with minimal attacker effort.

Apache HTTPD information leak can support targeted reconnaissance, increasing the success rate of follow-up exploits. Organizations using these platforms should prioritize patching and monitor for indicators of exploitation using updated WAF detection rules.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                           | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...75129820 | 100745         | Apache HTTP Server - Information Disclosure - CVE:CVE-2024-38475      | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...26a517f1 | 100747         | Commvault Command Center - Remote Code Execution - CVE:CVE-2025-34028 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...d7619ccb | 100749         | BentoML - Remote Code Execution - CVE:CVE-2025-27520                  | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...f15bfda4 | 100753         | Craft CMS - Remote Code Execution - CVE:CVE-2024-56145                | Log             | Block      | This is a New Detection |

## 2025-05-08

  
**Improved Payload Logging for WAF Managed Rules**   

We have upgraded WAF Payload Logging to enhance rule diagnostics and usability:

* **Targeted logging**: Logs now capture only the specific portions of requests that triggered WAF rules, rather than entire request segments.
* **Visual highlighting**: Matched content is visually highlighted in the UI for faster identification.
* **Enhanced context**: Logs now include surrounding context to make diagnostics more effective.
![Log entry showing payload logging details](https://developers.cloudflare.com/_astro/2025-05-payload-logging-update.1M29LjNm_Z23wApX.webp) 

Payload Logging is available to all Enterprise customers. If you have not used Payload Logging before, check how you can [get started](https://developers.cloudflare.com/waf/managed-rules/payload-logging/).

**Note:** The structure of the `encrypted_matched_data` field in Logpush has changed from `Map<Field, Value>` to `Map<Field, {Before: bytes, Content: Value, After: bytes}>`. If you rely on this field in your Logpush jobs, you should review and update your processing logic accordingly.

## 2025-05-05

  
**WAF Release - 2025-05-05**   

This week's analysis covers five CVEs with varying impact levels. Four are rated critical, while one is rated high severity. Remote Code Execution vulnerabilities dominate this set.

**Key Findings**

GFI KerioControl (CVE-2024-52875) contains an unauthenticated Remote Code Execution (RCE) vulnerability that targets firewall appliances. This vulnerability can let attackers gain root level system access, making this CVE particularly attractive for threat actors.

The SonicWall SMA vulnerabilities remain concerning due to their continued exploitation since 2021\. These critical vulnerabilities in remote access solutions create dangerous entry points to networks.

**Impact**

Customers using the Managed Ruleset will receive rule coverage following this week's release. Below is a breakdown of the recommended prioritization based on current exploitation trends:

* GFI KerioControl (CVE-2024-52875) - Highest priority; unauthenticated RCE
* SonicWall SMA (Multiple vulnerabilities) - Critical for network appliances
* XWiki (CVE-2025-24893) - High priority for development environments
* Langflow (CVE-2025-3248) - Important for AI workflow platforms
* MinIO (CVE-2025-31489) - Important for object storage implementations

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                        | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...d0b7a392 | 100724         | GFI KerioControl - Remote Code Execution - CVE:CVE-2024-52875                                      | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...717a9e42 | 100748         | XWiki - Remote Code Execution - CVE:CVE-2025-24893                                                 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...e9cf745d | 100750         | SonicWall SMA - Dangerous File Upload - CVE:CVE-2021-20040, CVE:CVE-2021-20041, CVE:CVE-2021-20042 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...d29da333 | 100751         | Langflow - Remote Code Execution - CVE:CVE-2025-3248                                               | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...caa7b208 | 100752         | MinIO - Auth Bypass - CVE:CVE-2025-31489                                                           | Log             | Block      | This is a New Detection |

## 2025-04-26

  
**WAF Release - 2025-04-26 - Emergency**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                        | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...19fcc883 | 100755         | React.js - Router and Remix Vulnerability - CVE:CVE-2025-43864, CVE:CVE-2025-43865 | Block           | Block      | This is a New Detection |

## 2025-04-22

  
**WAF Release - 2025-04-22**   

Each of this week's rule releases covers a distinct CVE, with half of the rules targeting Remote Code Execution (RCE) attacks. Of the 6 CVEs covered, four were scored as critical, with the other two scored as high.

When deciding which exploits to tackle, Cloudflare tunes into the attackers' areas of focus. Cloudflare's network intelligence provides a unique lens into attacker activity – for instance, through the volume of blocked requests related with CVE exploits after updating WAF Managed Rules with new detections.

From this week's releases, one indicator that RCE is a "hot topic" attack type is the fact that the Oracle PeopleSoft RCE rule accounts for half of all of the new rule matches. This rule patches CVE-2023-22047, a high-severity vulnerability in the Oracle PeopleSoft suite that allows unauthenticated attackers to access PeopleSoft Enterprise PeopleTools data through remote code execution. This is particularly concerning because of the nature of the data managed by PeopleSoft – this can include payroll records or student profile information. This CVE, along with five others, are addressed with the latest detection update to WAF Managed Rules.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                        | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------ | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...a5be3327 | 100738         | GitLab - Auth Bypass - CVE:CVE-2023-7028                           | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...6c9531fa | 100740         | Splunk Enterprise - Remote Code Execution - CVE:CVE-2025-20229     | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...f40bbc2b | 100741         | Oracle PeopleSoft - Remote Code Execution - CVE:CVE-2023-22047     | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...5462167c | 100742         | CrushFTP - Auth Bypass - CVE:CVE-2025-31161                        | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...caa7b208 | 100743         | Ivanti - Buffer Error - CVE:CVE-2025-22457                         | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...d52139a8 | 100744         | Oracle Access Manager - Remote Code Execution - CVE:CVE-2021-35587 | Log             | Disabled   | This is a New Detection |

## 2025-04-14

  
**WAF Release - 2025-04-14**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                    | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...d6b2d36c | 100739A        | Next.js - Auth Bypass - CVE:CVE-2025-29927 - 2 | Log             | Disabled   | This is a New Detection |

## 2025-04-02

  
**WAF Release - 2025-04-02**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                             | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...622f0483 | 100732         | Sitecore - Code Injection - CVE:CVE-2025-27218                                          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...0f101cca | 100733         | Angular-Base64-Upload - Remote Code Execution - CVE:CVE-2024-42640                      | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...1bbcd247 | 100734         | Apache Camel - Remote Code Execution - CVE:CVE-2025-29891                               | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...90aea1ca | 100735         | Progress Software WhatsUp Gold - Remote Code Execution - CVE:CVE-2024-4885              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...d9d8c5f2 | 100737         | Apache Tomcat - Remote Code Execution - CVE:CVE-2025-24813                              | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...a28a42c4 | 100659         | Common Payloads for Server-side Template Injection                                      | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...daa4b037 | 100659         | Common Payloads for Server-side Template Injection - Base64                             | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...48f6a9cf | 100642         | LDAP Injection                                                                          | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...e0713e9f | 100642         | LDAP Injection Base64                                                                   | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...1bc977d1 | 100005         | DotNetNuke - File Inclusion - CVE:CVE-2018-9126, CVE:CVE-2011-1892, CVE:CVE-2022-31474  | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...bb70a463 | 100527         | Apache Struts - CVE:CVE-2021-31805                                                      | N/A             | Block      | N/A                     |
| Cloudflare Managed Ruleset | ...0c99546a | 100702         | Command Injection - CVE:CVE-2022-24108                                                  | N/A             | Block      | N/A                     |
| Cloudflare Managed Ruleset | ...9a5581d0 | 100622C        | Ivanti - Command Injection - CVE:CVE-2023-46805, CVE:CVE-2024-21887, CVE:CVE-2024-22024 | N/A             | Block      | N/A                     |
| Cloudflare Managed Ruleset | ...06d0b009 | 100536C        | GraphQL Command Injection                                                               | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...1651d0c8 | 100536         | GraphQL Injection                                                                       | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...af00f61d | 100536A        | GraphQL Introspection                                                                   | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...a41e5b67 | 100536B        | GraphQL SSRF                                                                            | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...433e5b3d | 100559A        | Prototype Pollution - Common Payloads                                                   | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...4816b26f | 100559A        | Prototype Pollution - Common Payloads - Base64                                          | N/A             | Disabled   | N/A                     |
| Cloudflare Managed Ruleset | ...fcea5ed2 | 100734         | Apache Camel - Remote Code Execution - CVE:CVE-2025-29891                               | N/A             | Disabled   | N/A                     |

## 2025-03-22

  
**WAF Release - 2025-03-22 - Emergency**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------ | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...f472013e | 100739         | Next.js - Auth Bypass - CVE:CVE-2025-29927 | N/A             | Disabled   | This is a New Detection |

## 2025-03-22

  
**New Managed WAF rule for Next.js CVE-2025-29927.**   

**Update: Mon Mar 24th, 11PM UTC**: Next.js has made further changes to address a smaller vulnerability introduced in the patches made to its middleware handling. Users should upgrade to Next.js versions `15.2.4`, `14.2.26`, `13.5.10` or `12.3.6`. **If you are unable to immediately upgrade or are running an older version of Next.js, you can enable the WAF rule described in this changelog as a mitigation**.

**Update: Mon Mar 24th, 8PM UTC**: Next.js has now [backported the patch for this vulnerability ↗](https://github.com/advisories/GHSA-f82v-jwr5-mffw) to cover Next.js v12 and v13\. Users on those versions will need to patch to `13.5.9` and `12.3.5` (respectively) to mitigate the vulnerability.

**Update: Sat Mar 22nd, 4PM UTC**: We have changed this WAF rule to opt-in only, as sites that use auth middleware with third-party auth vendors were observing failing requests.

**We strongly recommend updating your version of Next.js (if eligible)** to the patched versions, as your app will otherwise be vulnerable to an authentication bypass attack regardless of auth provider.

#### Enable the Managed Rule (strongly recommended)

This rule is opt-in only for sites on the Pro plan or above in the [WAF managed ruleset](https://developers.cloudflare.com/waf/managed-rules/).

To enable the rule:

1. Head to Security > WAF > Managed rules in the Cloudflare dashboard for the zone (website) you want to protect.
2. Click the three dots next to **Cloudflare Managed Ruleset** and choose **Edit**
3. Scroll down and choose **Browse Rules**
4. Search for **CVE-2025-29927** (ruleId: `34583778093748cc83ff7b38f472013e`)
5. Change the **Status** to **Enabled** and the **Action** to **Block**. You can optionally set the rule to Log, to validate potential impact before enabling it. Log will not block requests.
6. Click **Next**
7. Scroll down and choose **Save**

This will enable the WAF rule and block requests with the `x-middleware-subrequest` header regardless of Next.js version.

#### Create a WAF rule (manual)

For users on the Free plan, or who want to define a more specific rule, you can create a [Custom WAF rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) to block requests with the `x-middleware-subrequest` header regardless of Next.js version.

To create a custom rule:

1. Head to Security > WAF > Custom rules in the Cloudflare dashboard for the zone (website) you want to protect.
2. Give the rule a name - e.g. `next-js-CVE-2025-29927`
3. Set the matching parameters for the rule match any request where the `x-middleware-subrequest` header `exists` per the rule expression below.

Terminal window

```

(len(http.request.headers["x-middleware-subrequest"]) > 0)


```

1. Set the action to 'block'. If you want to observe the impact before blocking requests, set the action to 'log' (and edit the rule later).
2. **Deploy** the rule.
![Next.js CVE-2025-29927 WAF rule](https://developers.cloudflare.com/_astro/waf-rule-cve-2025-29927.0i0XiweZ_Z8mlyw.webp) 

#### Next.js CVE-2025-29927

We've made a WAF (Web Application Firewall) rule available to all sites on Cloudflare to protect against the [Next.js authentication bypass vulnerability ↗](https://github.com/advisories/GHSA-f82v-jwr5-mffw) (`CVE-2025-29927`) published on March 21st, 2025.

**Note**: This rule is not enabled by default as it blocked requests across sites for specific authentication middleware.

* This managed rule protects sites using Next.js on Workers and Pages, as well as sites using Cloudflare to protect Next.js applications hosted elsewhere.
* This rule has been made available (but not enabled by default) to all sites as part of our [WAF Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) and blocks requests that attempt to bypass authentication in Next.js applications.
* The vulnerability affects almost all Next.js versions, and has been fully patched in Next.js `14.2.26` and `15.2.4`. Earlier, interim releases did not fully patch this vulnerability.
* **Users on older versions of Next.js (`11.1.4` to `13.5.6`) did not originally have a patch available**, but this the patch for this vulnerability and a subsequent additional patch have been backported to Next.js versions `12.3.6` and `13.5.10` as of Monday, March 24th. Users on Next.js v11 will need to deploy the stated workaround or enable the WAF rule.

The managed WAF rule mitigates this by blocking _external_ user requests with the `x-middleware-subrequest` header regardless of Next.js version, but we recommend users using Next.js 14 and 15 upgrade to the patched versions of Next.js as an additional mitigation.

## 2025-03-19

  
**WAF Release - 2025-03-19 - Emergency**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                    | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------ | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...a2cafae7 | 100736         | Generic HTTP Request Smuggling | N/A             | Disabled   | This is a New Detection |

## 2025-03-17

  
**WAF Release - 2025-03-17**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                            | Previous Action | New Action | Comments                                          |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------- | --------------- | ---------- | ------------------------------------------------- |
| Cloudflare Managed Ruleset | ...e59ec18a | 100725         | Fortinet FortiManager - Remote Code Execution - CVE:CVE-2023-42791, CVE:CVE-2024-23666 | Log             | Block      |                                                   |
| Cloudflare Managed Ruleset | ...1dbf58df | 100726         | Ivanti - Remote Code Execution - CVE:CVE-2024-8190                                     | Log             | Block      |                                                   |
| Cloudflare Managed Ruleset | ...0ad61fa7 | 100727         | Cisco IOS XE - Remote Code Execution - CVE:CVE-2023-20198                              | Log             | Disabled   | Fixed action value in changelog; no rule changes. |
| Cloudflare Managed Ruleset | ...7ee56b66 | 100728         | Sitecore - Remote Code Execution - CVE:CVE-2024-46938                                  | Log             | Block      |                                                   |
| Cloudflare Managed Ruleset | ...a6752a38 | 100729         | Microsoft SharePoint - Remote Code Execution - CVE:CVE-2023-33160                      | Log             | Block      |                                                   |
| Cloudflare Managed Ruleset | ...98d47b69 | 100730         | Pentaho - Template Injection - CVE:CVE-2022-43769, CVE:CVE-2022-43939                  | Log             | Block      |                                                   |
| Cloudflare Managed Ruleset | ...69fe1e0d | 100700         | Apache SSRF vulnerability CVE-2021-40438                                               | N/A             | Block      |                                                   |

## 2025-03-11

  
**WAF Release - 2025-03-11 - Emergency**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                        | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | -------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...73febb31 | 100731         | Apache Camel - Code Injection - CVE:CVE-2025-27636 | N/A             | Block      | This is a New Detection |

## 2025-03-10

  
**WAF Release - 2025-03-10**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...b2a51e3d | 100722         | Ivanti - Information Disclosure - CVE:CVE-2025-0282        | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...259073d5 | 100723         | Cisco IOS XE - Information Disclosure - CVE:CVE-2023-20198 | Log             | Block      | This is a New Detection |

## 2025-03-07

  
**Updated leaked credentials database**   

Added new records to the leaked credentials database. The record sources are: Have I Been Pwned (HIBP) database, RockYou 2024 dataset, and another third-party database.

## 2025-03-03

  
**WAF Release - 2025-03-03**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                 | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...93e63099 | 100721         | Ivanti - Remote Code Execution - CVE:CVE-2024-13159, CVE:CVE-2024-13160, CVE:CVE-2024-13161 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...cac42ce2 | 100596         | Citrix Content Collaboration ShareFile - Remote Code Execution - CVE:CVE-2023-24489         | N/A             | Block      |                         |

## 2025-02-24

  
**WAF Release - 2025-02-24**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                           | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...4916911e | 100718A        | SonicWall SSLVPN 2 - Auth Bypass - CVE:CVE-2024-53704 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...c382fdec | 100720         | Palo Alto Networks - Auth Bypass - CVE:CVE-2025-0108  | Log             | Block      | This is a New Detection |

## 2025-02-18

  
**WAF Release - 2025-02-18**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                         | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | --------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...a2ffa4b8 | 100715         | FortiOS - Auth Bypass - CVE:CVE-2024-55591          | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...5a883e12 | 100716         | Ivanti - Auth Bypass - CVE:CVE-2021-44529           | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...958094d3 | 100717         | SimpleHelp - Auth Bypass - CVE:CVE-2024-57727       | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...3b66df22 | 100718         | SonicWall SSLVPN - Auth Bypass - CVE:CVE-2024-53704 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...9184699f | 100719         | Yeti Platform - Auth Bypass - CVE:CVE-2024-46507    | Log             | Block      | This is a New Detection |

## 2025-02-11

  
**WAF Release - 2025-02-11**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                               | Previous Action | New Action | Comments                |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| Cloudflare Managed Ruleset | ...483b4c26 | 100708         | Aviatrix Network - Remote Code Execution - CVE:CVE-2024-50603             | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...7e924ca3 | 100709         | Next.js - Remote Code Execution - CVE:CVE-2024-46982                      | Log             | Disabled   | This is a New Detection |
| Cloudflare Managed Ruleset | ...83a7d8ff | 100710         | Progress Software WhatsUp Gold - Directory Traversal - CVE:CVE-2024-12105 | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...baa8eb34 | 100711         | WordPress - Remote Code Execution - CVE:CVE-2024-56064                    | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...87f5d34e | 100712         | WordPress - Remote Code Execution - CVE:CVE-2024-9047                     | Log             | Block      | This is a New Detection |
| Cloudflare Managed Ruleset | ...bf72cf8a | 100713         | FortiOS - Auth Bypass - CVE:CVE-2022-40684                                | Log             | Block      | This is a New Detection |

## 2025-02-04

  
**Updated leaked credentials database**   

Added new records to the leaked credentials database from a third-party database.

## 2025-01-21

  
**WAF Release - 2025-01-21**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                  | Previous Action | New Action | Comments                         |
| -------------------------- | ----------- | -------------- | ---------------------------- | --------------- | ---------- | -------------------------------- |
| Cloudflare Managed Ruleset | ...b090ba9a | 100303         | Command Injection - Nslookup | Log             | Block      | This was released as ...b8d152f4 |
| Cloudflare Managed Ruleset | ...49e6b538 | 100534         | Web Shell Activity           | Log             | Block      | This was released as ...82fe4e7f |

## 2025-01-13

  
**WAF Release - 2025-01-13**   

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                   | Previous Action | New Action | Comments      |
| -------------------------- | ----------- | -------------- | --------------------------------------------------------------------------------------------- | --------------- | ---------- | ------------- |
| Cloudflare Managed Ruleset | ...f49e5840 | 100704         | Cleo Harmony - Auth Bypass - CVE:CVE-2024-55956, CVE:CVE-2024-55953                           | Log             | Block      | New Detection |
| Cloudflare Managed Ruleset | ...a6d43bc2 | 100705         | Sentry - SSRF                                                                                 | Log             | Block      | New Detection |
| Cloudflare Managed Ruleset | ...ce6311bb | 100706         | Apache Struts - Remote Code Execution - CVE:CVE-2024-53677                                    | Log             | Block      | New Detection |
| Cloudflare Managed Ruleset | ...2233da1f | 100707         | FortiWLM - Remote Code Execution - CVE:CVE-2023-48782, CVE:CVE-2023-34993, CVE:CVE-2023-34990 | Log             | Block      | New Detection |
| Cloudflare Managed Ruleset | ...e31d972a | 100007C\_BETA  | Command Injection - Common Attack Commands                                                    | Disabled        |            |               |

## 2025-01-06

  
**WAF Release - 2025-01-06**   

| Ruleset             | Rule ID     | Legacy Rule ID | Description                                                                                               | Previous Action | New Action | Comments      |
| ------------------- | ----------- | -------------- | --------------------------------------------------------------------------------------------------------- | --------------- | ---------- | ------------- |
| Cloudflare Specials | ...9da08beb | 100678         | Pandora FMS - Remote Code Execution - CVE:CVE-2024-11320                                                  | Log             | Block      | New Detection |
| Cloudflare Specials | ...ecdf3d02 | 100679         | Palo Alto Networks - Remote Code Execution - CVE:CVE-2024-0012, CVE:CVE-2024-9474                         | Log             | Block      | New Detection |
| Cloudflare Specials | ...a40f2a35 | 100680         | Ivanti - Command Injection - CVE:CVE-2024-37397                                                           | Log             | Block      | New Detection |
| Cloudflare Specials | ...58ae3c89 | 100681         | Really Simple Security - Auth Bypass - CVE:CVE-2024-10924                                                 | Log             | Block      | New Detection |
| Cloudflare Specials | ...e37f2da6 | 100682         | Magento - XXE - CVE:CVE-2024-34102                                                                        | Log             | Block      | New Detection |
| Cloudflare Specials | ...5054c752 | 100683         | CyberPanel - Remote Code Execution - CVE:CVE-2024-51567                                                   | Log             | Block      | New Detection |
| Cloudflare Specials | ...dfe93d7b | 100684         | Microsoft SharePoint - Remote Code Execution - CVE:CVE-2024-38094, CVE:CVE-2024-38024, CVE:CVE-2024-38023 | Log             | Block      | New Detection |
| Cloudflare Specials | ...1454c856 | 100685         | CyberPanel - Remote Code Execution - CVE:CVE-2024-51568                                                   | Log             | Block      | New Detection |
| Cloudflare Specials | ...e92362e5 | 100686         | Seeyon - Remote Code Execution                                                                            | Log             | Block      | New Detection |
| Cloudflare Specials | ...b9f1c9f8 | 100687         | WordPress - Remote Code Execution - CVE:CVE-2024-10781, CVE:CVE-2024-10542                                | Log             | Block      | New Detection |
| Cloudflare Specials | ...0d7ca374 | 100688         | ProjectSend - Remote Code Execution - CVE:CVE-2024-11680                                                  | Log             | Block      | New Detection |
| Cloudflare Specials | ...a5260b70 | 100689         | Palo Alto GlobalProtect - Remote Code Execution - CVE:CVE-2024-5921                                       | Log             | Block      | New Detection |
| Cloudflare Specials | ...d007118b | 100690         | Ivanti - Remote Code Execution - CVE:CVE-2024-37404                                                       | Log             | Block      | New Detection |
| Cloudflare Specials | ...c3e49f64 | 100691         | Array Networks - Remote Code Execution - CVE:CVE-2023-28461                                               | Log             | Block      | New Detection |
| Cloudflare Specials | ...fcc6f5bb | 100692         | CyberPanel - Remote Code Execution - CVE:CVE-2024-51378                                                   | Log             | Block      | New Detection |
| Cloudflare Specials | ...b615335e | 100693         | Symfony Profiler - Auth Bypass - CVE:CVE-2024-50340                                                       | Log             | Block      | New Detection |
| Cloudflare Specials | ...09d08c8a | 100694         | Citrix Virtual Apps - Remote Code Execution - CVE:CVE-2024-8069                                           | Log             | Block      | New Detection |
| Cloudflare Specials | ...8aafb2f5 | 100695         | MSMQ Service - Remote Code Execution - CVE:CVE-2023-21554                                                 | Log             | Block      | New Detection |
| Cloudflare Specials | ...11b7a8c7 | 100696         | Nginxui - Remote Code Execution - CVE:CVE-2024-49368                                                      | Log             | Block      | New Detection |
| Cloudflare Specials | ...45954c7e | 100697         | Apache ShardingSphere - Remote Code Execution - CVE:CVE-2022-22733                                        | Log             | Block      | New Detection |
| Cloudflare Specials | ...f5311209 | 100698         | Mitel MiCollab - Auth Bypass - CVE:CVE-2024-41713                                                         | Log             | Block      | New Detection |
| Cloudflare Specials | ...b3e5e46e | 100699         | Apache Solr - Auth Bypass - CVE:CVE-2024-45216                                                            | Log             | Block      | New Detection |

For other WAF updates, refer to the [changelog](https://developers.cloudflare.com/waf/change-log/changelog/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/change-log/","name":"WAF changelog overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/change-log/scheduled-changes/","name":"Scheduled changes"}}]}
```
