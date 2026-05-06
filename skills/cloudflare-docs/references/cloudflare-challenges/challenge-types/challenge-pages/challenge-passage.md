---
title: Challenge Passage
description: Set a time period during which visitors do not have to solve repeat challenges.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Cookies ](https://developers.cloudflare.com/search/?tags=Cookies) 

# Challenge Passage

When a visitor solves a [Cloudflare Challenge](https://developers.cloudflare.com/cloudflare-challenges/) \- as part of a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/) or [IP Access rule](https://developers.cloudflare.com/waf/tools/ip-access-rules/) \- you can set the **Challenge Passage** to prevent them from having to solve future Challenges for a specified period of time.

### How it works

When a visitor successfully solves a challenge, Cloudflare sets a [cf\_clearance cookie](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/#additional-cookies-used-by-the-challenge-platform) in their browser. This cookie specifies the duration your website is accessible to that visitor.

When that visitor tries to access other parts of your website, Cloudflare evaluates the cookie before presenting another challenge. If the cookie is still valid, no challenges will be shown.

When Cloudflare evaluates a `cf_clearance` cookie, a few extra minutes are included to account for clock skew. For XmlHTTP requests, an extra hour is added to the validation time to prevent breaking XmlHTTP requests for pages that set short lifetimes.

### Customize the Challenge Passage

By default, the `cf_clearance` cookie has a lifetime of 30 minutes. Cloudflare recommends a setting between 15 and 45 minutes.

To update the Challenge Passage (and the value of the `cf_clearance` cookie):

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Go to **Challenge passage**.
3. Select the edit icon to set a timeout duration.

### Limitations

The Challenge Passage does not apply to rate limiting rules.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/challenge-types/","name":"Available Challenges"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/challenge-types/challenge-pages/","name":"Interstitial Challenge Pages"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/","name":"Challenge Passage"}}]}
```
