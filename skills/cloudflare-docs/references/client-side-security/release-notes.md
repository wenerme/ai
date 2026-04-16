---
title: Release notes
description: Track the latest updates and changes to client-side security features.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/release-notes.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Release notes

[ Subscribe to RSS ](https://developers.cloudflare.com/client-side-security/release-notes/index.xml)

## 2026-03-25

**Page Shield is now client-side security**

Cloudflare renamed Page Shield to client-side security. Cloudflare dashboard users still using the previous application security navigation in the dashboard can find the new client-side security section in **Security** \> **Client-side security**.  
Additionally, Page Shield policies are now called content security rules. This name matches the terminology already used in the new [application security dashboard](https://developers.cloudflare.com/security/).

## 2026-03-03

**Deprecated code behavior analysis scores**

Code behavior analysis scores have been removed from the malicious script details. The updated GNN and LLM-based detection approach has proven significantly more effective at identifying true positives, making the separate behavior analysis scores redundant.

Malicious code analysis scores and threat intelligence remain available for reviewing detected scripts. For more information, refer to [Review resources considered malicious](https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/).

## 2026-03-03

**LLM-assisted false positive reduction for malicious script detection**

Page Shield now includes an additional machine learning step, utilizing an LLM powered by Workers AI, to assist in analyzing the JavaScript code of scripts loaded by your website visitors. This enhancement specifically helps reduce the false positive rate of our detection engines, focusing your attention on true positives.

Cloudflare uses open-source models for this analysis, and customer data is not used to train these models. For more information, refer to [Malicious script and connection detection](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/).

## 2025-10-08

**Updated machine learning (ML) model**

The latest ML model has been deployed to all Page Shield add-on customers with better classification precision. Scripts with false positive classification may have a different pattern than the previous model deployment.

## 2025-09-12

**Scoped alerts now support policies in log mode**

[Scoped alerts](https://developers.cloudflare.com/client-side-security/alerts/) now take into account your Page Shield policies deployed in log mode. This allows you to simulate an end-to-end workflow before switching your policies to [allow mode](https://developers.cloudflare.com/client-side-security/rules/#rule-actions).

## 2025-05-20

**Updated machine learning (ML) model**

The latest ML model has been deployed to all Page Shield add-on customers with better classification precision. Scripts with false positive classification may have a different pattern than the previous model deployment.

## 2025-05-09

**Reports from browser extension injected resources are filtered out**

Script and connection reports caused by browser extension injections are now filtered out, helping you focus on managing application dependencies.

## 2024-12-02

**Alerts based on customer-defined policies**

You can now scope all of Page Shield's alert types to selected zones and their associated policies, alerting only on the resources that have been explicitly allowed.

## 2024-09-30

**New machine learning (ML) scores for detected scripts**

In addition to the global integrity score, Page Shield now provides individual script scores (from 1 to 99) for the following malicious code detections: Magecart, Crypto mining, and Malware.

## 2024-09-18

**Page Shield's script monitor now available in Free plan**

The Page Shield's script monitor feature is now available to all users, including users in the Free plan.

## 2024-09-18

**Page Shield policy changes now available in audit logs**

Cloudflare [Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) now include entries for any changes to Page Shield's policies.

## 2024-06-18

**Cookie Monitor now available**

Page Shield now captures HTTP cookies set and used by your web application. The [list of detected cookies](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/) in available in the Cloudflare dashboard or via API.

## 2024-06-14

**Added filter operators for scripts and connections**

You can now filter scripts and connections in the Cloudflare dashboard using the `does not contain` operator. Pages associated with scripts and connections can be filtered by `includes`, `starts with`, and `ends with`.

## 2024-04-26

**Suggestions for the default directive**

When creating a policy in the dashboard, default directive aggregates suggestions of monitored scripts and connections data, enabling defining default directive easier.

## 2024-04-04

**Individual threat intelligence categories**

Instead of aggregating categories of URL and domain data from threat intelligence, they are now listed per type.

## 2024-03-21

**Increase allowed length per policy**

Now each policy supports up to 6,000 characters.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/release-notes/","name":"Release notes"}}]}
```
