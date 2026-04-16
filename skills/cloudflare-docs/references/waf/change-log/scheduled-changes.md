---
title: Scheduled changes
description: For other WAF updates, refer to the changelog.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Copy page

# Scheduled changes

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/waf.xml) 

## 2026-04-15

  
**WAF Release - Scheduled changes for 2026-04-20**   

| Announcement Date | Release Date | Release Behavior | Legacy Rule ID | Rule ID     | Description                                                                   | Comments                                                                                                                         |
| ----------------- | ------------ | ---------------- | -------------- | ----------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...ee159e2e | Command Injection - Generic 8 - uri - Beta                                    | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Disabled         | N/A            | ...a15308cf | Command Injection - Generic 8 - body - Beta                                   | This is a new detection. This rule will be merged into the original rule "Command Injection - Generic 8" (ID: ...413592e2  )     |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...958047ed | MySQL - SQLi - Executable Comment - Beta                                      | This is a new detection. This rule will be merged into the original rule "MySQL - SQLi - Executable Comment" (ID: ...7bd2d8fa  ) |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...582cc559 | MySQL - SQLi - Executable Comment - Headers                                   | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...         | This is a new detection.                                                      |                                                                                                                                  |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...a16639d3 | MySQL - SQLi - Executable Comment - URI                                       | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...44f24211 | Magento 2 - Unrestricted file upload - 2                                      | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...bf170a17 | Apache ActiveMQ - Remote Code Execution - CVE:CVE-2026-34197                  | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...1dfa64df | SQLi - Probing - uri - Beta                                                   | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...4c62e2e7 | SQLi - Probing - header - Beta                                                | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Disabled         | N/A            | ...aab28ea1 | SQLi - Probing - body - Beta                                                  | This is a new detection. This rule will be merged into the original rule "SQLi - Probing" (ID: ...b4026c88  )                    |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...8c2ac1a7 | SQLi - Sleep Function - Beta                                                  | This is a new detection. This rule will be merged into the original rule "SQLi - Sleep Function" (ID: ...f77e8d54  )             |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...4dacaeb8 | SQLi - Sleep Function - Headers                                               | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...ed4c9ece | SQLi - Sleep Function - URI                                                   | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...70282f38 | XSS, HTML Injection - Embed Tag - Headers (beta)                              | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...23f4d718 | XSS, HTML Injection - IFrame Tag - Src and Srcdoc Attributes - Headers (beta) | This is a new detection.                                                                                                         |
| 2026-04-15        | 2026-04-20   | Log              | N/A            | ...6978def1 | XSS, HTML Injection - Link Tag - Headers (beta)                               | This is a new detection.                                                                                                         |

For other WAF updates, refer to the [changelog](https://developers.cloudflare.com/waf/change-log/changelog/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/change-log/","name":"WAF changelog overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/change-log/scheduled-changes/","name":"Scheduled changes"}}]}
```
