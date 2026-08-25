---
description: Detect unauthorized advertisement of your IP prefixes.
title: Route Leak Detection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

# Route Leak Detection

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/byoip/route-leak-detection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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
[Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Locate **Route Leak Detection** from the list > **Select**.
4. Enter a name and description for the notification.
5. Enter one or more email addresses to receive the notifications.
6. Select **Save**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/byoip/route-leak-detection/#page","headline":"Route Leak Detection · Cloudflare BYOIP docs","description":"Detect unauthorized advertisement of your IP prefixes.","url":"https://developers.cloudflare.com/byoip/route-leak-detection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
