---
title: JA3/JA4 fingerprint
description: JA3 and JA4 fingerprints help you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/bots/additional-configurations/ja3-ja4-fingerprint/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# JA3/JA4 fingerprint

[**JA3** ↗](https://github.com/salesforce/ja3) and [**JA4** ↗](https://github.com/FoxIO-LLC/ja4) **fingerprints** help you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.

JA4 fingerprint adds new functionality by sorting ClientHello extensions and reducing the total number of unique fingerprints for modern browsers.

Note

JA3 and JA4 fingerprints are only available to Enterprise customers who have purchased Bot Management.

If you want to use JA4 fingerprints and Signals Intelligence, your Workers script must be able to handle the absence of any field in the array, including:

* The possibility that the JA4 fingerprint could be missing.
* The possibility that the `ja4Signals` array could be missing.
* Results with `NaN` or `Infinity` values will be excluded from the array.

```

{

  "ja4Signals": {

    "h2h3_ratio_1h": 0.98826485872269,

    "heuristic_ratio_1h": 7.288895722013e-05,

    "reqs_quantile_1h": 0.99905741214752,

    "uas_rank_1h": 901,

    "browser_ratio_1h": 0.93640440702438,

    "paths_rank_1h": 655,

    "reqs_rank_1h": 850,

    "cache_ratio_1h": 0.18918327987194,

    "ips_rank_1h": 662,

    "ips_quantile_1h": 0.99926590919495

  },

  "jaSignalsParsed": {

    "ratios": {

      "h2h3_ratio_1h": 0.98826485872269,

      "heuristic_ratio_1h": 7.288895722013e-05,

      "browser_ratio_1h": 0.93640440702438,

      "cache_ratio_1h": 0.18918327987194

    },

    "ranks": {

      "uas_rank_1h": 901,

      "paths_rank_1h": 655,

      "reqs_rank_1h": 850,

      "ips_rank_1h": 662

    },

    "quantiles": {

      "reqs_quantile_1h": 0.99905741214752,

      "ips_quantile_1h": 0.99926590919495

    }

  }

}


```

Explain Code

When JA4 Signals are missing, the output appears as follows:

```

{

  "ja4Signals": {},

  "jaSignalsParsed": {

    "ratios": {},

    "ranks": {},

    "quantiles": {}

  }

}


```

Note

This sample was generated using [Workers' Cloudflare Object script](https://developers.cloudflare.com/workers/examples/accessing-the-cloudflare-object/).

The JA3 or JA4 fingerprint is an SSL/TLS-based identifier and can be null or empty in logs under specific circumstances:

* Since JA3 and JA4 are calculated during the TLS (SSL) handshake, they will not be present for non-encrypted HTTP traffic.
* The field may be empty when a [Worker](https://developers.cloudflare.com/workers/) sends a request to a zone that is either internal to Cloudflare's network (O2O traffic that is not proxied) or to a third-party origin, or when a Worker is routing traffic to the target zone.
* The fingerprints may be absent when Bot Management itself is skipped for a request, as the feature is responsible for calculating and populating these values.

Generally, [O2O traffic](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/) should include JA3 or JA4 fingerprints unless a Worker is used to route traffic from the eyeball (client-facing) zone to the target zone.

## Analytics

To get more information about potential bot requests, use these JA3 and JA4 fingerprints in:

* [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics/#enterprise-bot-management)
* [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) and [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/)
* [Analytics GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/), specifically the **HTTP Requests** dataset
* [Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/)

## Actions

To adjust how your application responds to specific fingerprints, use them with:

* [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/)
* [Transform Rules](https://developers.cloudflare.com/rules/transform/)
* [Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties)

## Use cases

### Block or allow certain traffic

A group of similar requests may share the same JA3 fingerprint. For this reason, JA3 may be useful in blocking an incoming threat. For example, if you notice that a bot attack is not caught by existing defenses, create a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) that blocks or challenges the JA3 used for the attack.

Alternatively, if existing defenses are blocking traffic that is actually legitimate, create a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) with the _Skip_ action allowing the JA3 seen across good requests.

JA3 may also be useful if you want to immediately remedy false positives or false negatives with Bot Management.

### Allow mobile traffic

Often, mobile application traffic will produce the same JA3 fingerprint across devices and users. This means you can identify your mobile application traffic by its JA3 fingerprint.

Use the JA3 fingerprint to [allow traffic](https://developers.cloudflare.com/waf/custom-rules/use-cases/challenge-bad-bots/#adjust-for-mobile-traffic) from your mobile application, but block or challenge remaining traffic.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/ja3-ja4-fingerprint/","name":"JA3/JA4 fingerprint"}}]}
```
