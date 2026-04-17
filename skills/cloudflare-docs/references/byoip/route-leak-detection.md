---
title: Route Leak Detection
description: Detect unauthorized advertisement of your IP prefixes.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/route-leak-detection.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Route Leak Detection

Route Leak Detection protects your routes on the Internet by notifying you when your traffic is routed somewhere it should not go, which could indicate a possible attack. Route Leak Detection also reduces the amount of time needed to mitigate leaks by providing you with timely notifications.

Cloudflare detects route leaks by using several sources of routing data to create a synthesis of how the Internet sees routes to BYOIP users. Cloudflare then watches these views to track any sudden changes that occur on the Internet. If the changes can be correlated to actions Cloudflare has taken, no further action is required. However, if changes have not been made, Cloudflare notifies you to inform you that your routes and users may be at risk.

## Enable Route Leak Detection

Route Leak Detection Alert

**Who is it for?**

[BYOIP customers](https://developers.cloudflare.com/byoip/) who want to receive a notification when their prefixes are advertised in places they should not be.

**Other options / filters**

None.

**Included with**

Purchase of BYOIP.

**What should you do if you receive one?**

Confirm your traffic is healthy. Reach out to your transit providers to ensure you are behaving as expected and ask them to follow up with any providers accepting the unauthorized routes.

You must be a user who has brought your own IP address to Cloudflare, which includes Magic Transit, Spectrum, and WAF users. Only prefixes advertised by Cloudflare qualify for Route Leak Detection.

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Locate **Route Leak Detection** from the list > **Select**.
4. Enter a name and description for the notification.
5. Enter one or more email addresses to receive the notifications.
6. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/route-leak-detection/","name":"Route Leak Detection"}}]}
```
