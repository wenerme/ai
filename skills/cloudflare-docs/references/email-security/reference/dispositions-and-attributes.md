---
title: Dispositions and attributes
description: Email security uses a variety of factors to determine whether a given email message, domain, URL, or packet is part of a phishing campaign. These small pattern assessments are dynamic in nature and — in many cases — no single pattern will determine the final verdict.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reference/dispositions-and-attributes.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Dispositions and attributes

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

Email security uses a variety of factors to determine whether a given email message, domain, URL, or packet is part of a phishing campaign. These small pattern assessments are dynamic in nature and — in many cases — no single pattern will determine the final verdict.

Based on these patterns, Email security may add `X-Headers` to each email message that passes through our system.

## Dispositions

Any traffic that flows through Email security is given a final disposition, which represents our evaluation of that specific message. Each message will only receive one disposition header so your organization can take clear and specific actions on different message types.

You can use disposition values when [creating your quarantine policy](https://developers.cloudflare.com/email-security/email-configuration/domains-and-routing/domains/) or [setting up auto-retract](https://developers.cloudflare.com/email-security/email-configuration/retract-settings/).

### Available values

| Disposition                         | Description                                                                                                                                                                                 | Recommendation                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| MALICIOUS                           | Traffic invoked multiple phishing verdict triggers, met thresholds for bad behavior, and is associated with active campaigns.                                                               | Block                                                                      |
| SUSPICIOUS                          | Traffic associated with phishing campaigns (and is under further analysis by our automated systems).                                                                                        | Research these messages internally to evaluate legitimacy.                 |
| SPOOF                               | Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies (SPF, DKIM, DMARC) or has mismatching Envelope From and Header From values. | Block after investigating (can be triggered by third-party mail services). |
| UCE (Unsolicited Commercial Emails) | Traffic associated with non-malicious, commercial campaigns.                                                                                                                                | Route to existing Spam quarantine folder.                                  |
| BULK (dashboard only)               | Traffic often associated with newsletters or marketing campaigns. Refer to [Graymail ↗](https://en.wikipedia.org/wiki/Graymail%5F%28email%29) for more details.                             | Monitor or tag                                                             |

### Header structure

When Email security adds a disposition header to an email message, that header matches the following format:

```

X-Area1Security-Disposition: [Value]


```

Note that emails with a disposition of `SPAM` will be tagged with `UCE` (unsolicited commercial emails) in their headers:

```

X-Area1Security-Disposition: UCE


```

## Attributes

Traffic that flows through Email security can also receive one or more **Attributes**, which indicate that a specific condition has been met.

### Available values

| Attribute                                | Notes                                                                                                                                                                                                                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CUSTOM\_BLOCK\_LIST                      | This message matches a value you have defined in your custom block list.                                                                                                                                                                                         |
| NEW\_DOMAIN\_SENDER=<REGISTRATION\_DATE> | Alerts to mail from a newly registered domain. Formatted as yyyy-MM-dd HH:mm:ss ZZZ.                                                                                                                                                                             |
| NEW\_DOMAIN\_LINK=<REGISTRATION\_DATE>   | Alerts to mail with links pointing out to a newly registered domain. Formatted as yyyy-MM-dd HH:mm:ss ZZZ.                                                                                                                                                       |
| ENCRYPTED                                | Email message is encrypted.                                                                                                                                                                                                                                      |
| EXECUTABLE                               | Email message contains an executable file.                                                                                                                                                                                                                       |
| BEC                                      | Indicates that email address was contained in your [business email compromise (BEC)](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/) list. Associated with MALICIOUS or SPOOF dispositions. |

### Header structure

When Email security adds a disposition header to an email message, that header matches the following format.

```

X-Area1Security-Attribute: [Value]

X-Area1Security-Attribute: [Value2]


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reference/dispositions-and-attributes/","name":"Dispositions and attributes"}}]}
```
