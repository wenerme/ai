---
title: Data loss prevention
description: How Data loss prevention works in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Compliance ](https://developers.cloudflare.com/search/?tags=Compliance) 

# Data loss prevention

Availability

Available as an add-on to Zero Trust Enterprise plans.

Users on Zero Trust Free and Pay-as-you-go plans can use the [Financial Information](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#financial-information) and [Social Security, Insurance, Tax, and Identifier Numbers](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#social-security-insurance-tax-and-identifier-numbers) predefined profiles, [payload logging](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-the-payload-of-matched-rules), and [false positive reporting](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#report-false-positives).

Cloudflare [Data Loss Prevention](https://www.cloudflare.com/learning/access-management/what-is-dlp/) (DLP) allows you to scan your web traffic and SaaS applications for the presence of sensitive data such as social security numbers, financial information, secret keys, and source code.

DLP scans HTTP traffic, SaaS application files, and AI prompts for sensitive data such as credit card numbers, credentials, and personally identifiable information.

Cloudflare does not write scanned content to disk. DLP encrypts and temporarily stores content in memory only. To retain matched content for review, configure [payload logging](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-the-payload-of-matched-rules) for encrypted payload copies or a [Logpush destination](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#send-dlp-forensic-copies-to-logpush-destination) to export full matching HTTP requests.

## Data classification

Data Classification extends Cloudflare DLP with reusable labels and data classes for organizing sensitive content. Use it to define sensitivity schemas, sensitivity levels, data tag groups, data tags, and reusable classification rules that can then be applied in custom DLP profiles.

To get started, refer to [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/).

## Data in transit

Data Loss Prevention complements [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) to detect sensitive data transferred in HTTP requests. DLP scans the HTTP body (excluding headers), which may include uploaded or downloaded files, chat messages, forms, and other web content. You can also use DLP with [Email security](https://developers.cloudflare.com/cloudflare-one/email-security/) to scan [outbound emails](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/).

DLP requires [Gateway HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/) with [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) to read the contents of HTTPS traffic in transit. The depth of visibility varies for each site or application. DLP does not scan any traffic that bypasses Cloudflare Gateway (such as traffic that matches a [Do Not Inspect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) policy).

To get started, refer to [Scan HTTP traffic with DLP](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/).

## Data at rest

Data Loss Prevention complements [Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) (Cloud Access Security Broker) to detect sensitive data stored in your SaaS applications. CASB connects directly to SaaS application APIs to retrieve and scan files, rather than reading files as they pass through Cloudflare Gateway. Because of this, Gateway and Cloudflare One Client settings (such as [Do Not Inspect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) policies and [Split Tunnel](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) configurations) do not affect data at rest scans.

To get started, refer to [Scan SaaS applications with DLP](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/).

## AI traffic

Data Loss Prevention integrates with [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/) to scan AI prompts and responses for sensitive data. When DLP is enabled on an AI Gateway, it inspects the text content of requests sent to AI providers and responses returned from AI models, without requiring Gateway HTTP filtering or TLS decryption.

To get started, refer to [Set up DLP for AI Gateway](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/).

## Troubleshooting

For help resolving common issues with DLP, refer to [Troubleshoot DLP](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/troubleshoot-dlp/).

## Supported file types

### Formats

DLP supports reporting and scanning the following file types:

* Text and CSV
* Microsoft Office 2007 and later (`.docx`, `.xlsx,` `.pptx`), including Microsoft 365
* PDF
* ZIP files containing the above

DLP will scan the text contained in text, Microsoft Office, and PDF files.

Note

ZIP files can be recursively compressed a maximum of 10 times.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}}]}
```
