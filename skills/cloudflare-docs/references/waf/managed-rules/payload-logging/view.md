---
title: View the payload content in the dashboard
description: View the content of the matched rule payload in the dashboard by entering your private key.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/managed-rules/payload-logging/view.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# View the payload content in the dashboard

View the content of the matched rule payload in the dashboard by entering your private key.

1. Open [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/):  
   * [  New dashboard ](#tab-panel-6840)  
   * [ Old dashboard ](#tab-panel-6841)  
   1. In the Cloudflare dashboard, go to the **Analytics** page.  
   [ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)  
   2. Select the **Events** tab.  
   * In the Cloudflare dashboard, go to **Security** \> **Events**.
2. Under **Sampled logs**, expand the details of an event triggered by a rule whose managed ruleset has payload logging enabled.
3. Under **Matched service**, select **Decrypt payload match**.  
![Example of a security event with available payload match data \(still encrypted\)](https://developers.cloudflare.com/_astro/payload-logging-example.CMWUOj2Y_Z1y9S1d.webp)
4. Enter your private key in the pop-up window and select **Decrypt**.  
Note  
The private key is not sent to a Cloudflare server. The decryption occurs entirely in the browser.

If the private key you entered decrypts the encrypted payload successfully, the dashboard will show the name of the fields that matched and the matched string in clear text, along with some text appearing before and after the match.

![Viewing the decrypted payload match data after entering your private key in the dashboard](https://developers.cloudflare.com/_astro/payload-decrypted.DoVOmjx4_2nII9B.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/payload-logging/","name":"Log the payload of matched rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/payload-logging/view/","name":"View the payload content in the dashboard"}}]}
```
