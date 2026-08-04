---
description: Detection IDs for identifying and mitigating automated account takeover attacks.
title: Account takeover detections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Account takeover detections

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Using the detection IDs below, you can detect and mitigate account takeover attacks. You can monitor the number of login requests for a given software and network combination, as well as the percentage of login errors. When it reaches a suspicious level, you can prevent these attacks by using [custom rules](https://developers.cloudflare.com/waf/custom-rules/), [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), and [Workers](https://developers.cloudflare.com/workers/).

| Detection ID | Description                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 201326592    | Matches traffic that is making a suspicious amount of login failures to the zone.                                                                                                                                                                                                                                                                                                  |
| 201326593    | Matches traffic that is making a suspicious amount of login attempts to the zone.                                                                                                                                                                                                                                                                                                  |
| 201326598    | Sets a dynamic threshold based on the normal traffic that is unique to the zone. When the ID matches a login failure, Bot Management sets the [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) to 29 and uses [anomaly detection](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/#anomaly-detection-enterprise) as its score source. |

Login {props.one} endpoints

Not all login endpoints are automatically detected.

Cloudflare evaluates and automatically detects your website or application's login endpoint, but non-traditional login endpoints may not be recognized.

For example, if you have a non-traditional login endpoint, you should label it with `cf-log-in` using the [endpoint labeling service](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/). Once you have applied the `cf-log-in` label, Cloudflare will use the labeled endpoint for account takeover detection decisions.

## Challenges for account takeover detections

Cloudflare's [Managed Challenge](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/#managed-challenge) can limit brute-force attacks on your login endpoints.

To access account takeover detections:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **Custom rule**.
3. Fill out the form using **Bot Detection IDs** along with other necessary information.
4. Select **Save as draft** to return to the rule later, or **Deploy** to deploy the rule.

```js

(any(cf.bot_management.detection_ids[*] eq 201326593))
```

## Limit logins with account takeover detections

Rate limiting rules can limit the number of logins from a particular IP, JA4 fingerprint, or country.

To use rate limiting rules with account takeover detections:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **Rate limiting rule**.
3. Fill out the form using the **Custom expression builder** and `cf.bot_management_detection_ids` along with other necessary information.
4. Select **Save as draft** to return to the rule later, or **Deploy** to deploy the rule.

Enhanced with leaked credential detections

The rule can be enhanced with Leaked Credential Checks. Refer to the [WAF documentation](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for more information on how to include leaked credentials and account takeover detections in a rate limiting rule.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/#page","headline":"Account takeover detections · Cloudflare bot solutions docs","description":"Detection IDs for identifying and mitigating automated account takeover attacks.","url":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Account takeover"]}
```
