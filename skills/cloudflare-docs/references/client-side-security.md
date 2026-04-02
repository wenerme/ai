---
title: Client-side security
description: Cloudflare's client-side security is a comprehensive client-side security and privacy solution that allows you to ensure the safety of your website visitors' browsing environment.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Client-side security

Ensures the safety and privacy of your website visitors' browsing environment.

 Available on all plans 

Client-side security (formerly Page Shield) helps manage resources loaded by your website visitors — including scripts, their connections, and cookies — and triggers alert notifications when resources change or are considered malicious.

Learn how to [get started](https://developers.cloudflare.com/client-side-security/get-started/).

---

## Features

### Resource monitoring

Displays information about client-side resources loaded in your domain's pages.

[ Monitor client-side resources ](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/) 

### Page attribution

Find in which page a resource first appeared, and view a list of the latest occurrences of the resource in your pages.

[ Find resource occurrences ](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/#view-details) 

### Malicious script detection

Detects malicious scripts in your pages using threat intelligence and machine learning.

[ Review malicious scripts ](https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/) 

### Code change detection

Detects any changes in the scripts loaded in your pages.

[ Review changed scripts ](https://developers.cloudflare.com/client-side-security/detection/review-changed-scripts/) 

### Alerts

Receive notifications about newly detected scripts, scripts loaded from unknown domains, new scripts considered malicious, or code changes in your existing scripts.

[ Use Alerts ](https://developers.cloudflare.com/client-side-security/alerts/) 

### Content security rules

Content security rules define allowed resources on your websites. Use content security rules to enforce an allowlist of resources, effectively blocking resources not included in your rules.

[ Use Content security rules ](https://developers.cloudflare.com/client-side-security/rules/) 

## Availability

| Free                                                 | Pro | Business | Enterprise | Advanced |     |
| ---------------------------------------------------- | --- | -------- | ---------- | -------- | --- |
| Availability                                         | Yes | Yes      | Yes        | Yes      | Yes |
| Script monitoring                                    | Yes | Yes      | Yes        | Yes      | Yes |
| Connection monitoring                                | No  | No       | Yes        | Yes      | Yes |
| Cookie monitoring                                    | No  | No       | Yes        | Yes      | Yes |
| Page attribution                                     | No  | No       | Yes        | Yes      | Yes |
| New Resources Alerts and New Domain Alerts           | No  | No       | Yes        | Yes      | Yes |
| Malicious script detection and alerting              | No  | No       | No         | No       | Yes |
| Code change detection and alerting                   | No  | No       | No         | No       | Yes |
| Malicious connection detection and alerting          | No  | No       | No         | No       | Yes |
| Cookie monitoring advanced fields                    | No  | No       | No         | No       | Yes |
| Number of content security rules (positive blocking) | 0   | 0        | 0          | 0        | 5   |
| Number of Logpush jobs                               | 0   | 0        | 0          | 0        | 4   |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}}]}
```
