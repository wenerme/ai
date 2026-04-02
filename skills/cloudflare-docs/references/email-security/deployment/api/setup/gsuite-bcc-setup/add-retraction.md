---
title: Add retraction
description: Email security (formerly Area 1) is continuously gathering new information about phishing campaigns. Users might have email messages in their inboxes that were scanned by Email security but not retracted initially because, at the time of scan, these email messages had not been identified as a threat. To mitigate risk, Email security offers you tools to re-evaluate email messages at a fixed time interval based on knowledge Cloudflare may have acquired since initial delivery. Any email messages that fit this new threat knowledge will be retracted.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/gsuite-bcc-setup/add-retraction.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Add retraction

1. On the [Email security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/), select **Domains** under **DOMAINS & ROUTING**, then select **NEW DOMAIN**. Fill in the information to add a new domain:  
   * On **FORWARDING TO**: Enter `Google.com`.  
   * Adjust **Hops** to 2.  
   * On **Outbound TLS**: Ensure you select **Forward all messages over TLS**.
2. Select **Publish Domain**.
3. Select **RETRACT SETTINGS** \> **Authorize Gmail**.
4. Upload the JSON file [previously generated](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/create-service-account/).
5. Under **DOMAINS**, select the domain you added previously, then select **SAVE**.

## Post delivery retractions for new threats

Email security (formerly Area 1) is continuously gathering new information about phishing campaigns. Users might have email messages in their inboxes that were scanned by Email security but not retracted initially because, at the time of scan, these email messages had not been identified as a threat. To mitigate risk, Email security offers you tools to re-evaluate email messages at a fixed time interval based on knowledge Cloudflare may have acquired since initial delivery. Any email messages that fit this new threat knowledge will be retracted.

You can enable two options:

* **Post Delivery Response**: Email security will continue to re-evaluate emails already delivered to your users' inboxes at a fixed time interval in search for phishing sites or campaigns not previously known to Cloudflare. If any email messages fitting these new criteria are found, Email security retracts them.
* **Phish Submission Response**: Email security will retract emails already delivered that are reported by your users as phishing, and are found to be malicious by Email security. Retraction will occur according to your configuration.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":7,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/add-retraction/","name":"Add retraction"}}]}
```
