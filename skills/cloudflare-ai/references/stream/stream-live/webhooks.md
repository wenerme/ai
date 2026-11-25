---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Configure webhook notifications for Cloudflare Stream Live connect, disconnect, and error events.
title: Receive Live Webhooks
image: https://developers.cloudflare.com/stream/stream-live/webhooks/og.png?v=bd6e2a31ec0ddf75
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# Receive Live Webhooks

Stream Live offers webhooks to notify your service when an Input connects, disconnects, or encounters an error with Stream Live.

Note

Webhooks works differently for uploaded / on-demand videos. For more information, refer to [Using Webhooks](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/).

<details>

<summary>

Stream Live Notifications

</summary>

**Who is it for?**

Customers who are using <a href="https://developers.cloudflare.com/stream/">Stream</a> and want to receive webhooks with the status of their videos.

**Other options / filters**

You can input Stream Live IDs to receive notifications only about those inputs. If left blank, you will receive a list for all inputs.

The following input states will fire notifications. You can toggle them on or off:

- <code>live_input.connected</code>
- <code>live_input.disconnected</code>

**Included with**

Stream subscription.

**What should you do if you receive one?**

Stream notifications are entirely customizable by the customer. Action will depend on the customizations enabled.

</details>

## Subscribe to Stream Live Webhooks

1. In the Cloudflare dashboard, go to the **Notifications** page. [Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select the **Destinations** tab.
3. On the **Destinations** page under **Webhooks**, select **Create**.
4. Enter the information for your webhook and select **Save and Test**.
5. To create the notification, from the **Notifications** page, select the **All Notifications** tab.
6. Next to **Notifications**, select **Add**.
7. Under the list of products, locate **Stream** and select **Select**.
8. Enter a name and optional description.
9. Under **Webhooks**, select **Add webhook** and select your newly created webhook.
10. Select **Next**.
11. By default, you will receive webhook notifications for all Live Inputs. If you only wish to receive webhooks for certain inputs, enter a comma-delimited list of Input IDs in the text field.
12. When you are done, select **Create**.


*Example webhook payloadjson*

```json
{
  "name": "Live Webhook Test",
  "text": "Notification type: Stream Live Input\nInput ID: eb222fcca08eeb1ae84c981ebe8aeeb6\nEvent type: live_input.disconnected\nUpdated at: 2022-01-13T11:43:41.855717910Z",
  "data": {
    "notification_name": "Stream Live Input",
    "input_id": "eb222fcca08eeb1ae84c981ebe8aeeb6",
    "event_type": "live_input.disconnected",
    "updated_at": "2022-01-13T11:43:41.855717910Z"
  },
  "ts": 1642074233
}
```

The `event_type` property of the data object will either be `live_input.connected`, `live_input.disconnected`, or `live_input.errored`.

If there are issues detected with the input, the `event_type` will be `live_input.errored`. Additional data will be under the `live_input_errored` json key and will include a `code` with one of the values listed in [Error codes](https://developers.cloudflare.com/stream/stream-live/troubleshooting/#error-codes).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/stream-live/webhooks/#page","headline":"Receive Live Webhooks","description":"Configure webhook notifications for Cloudflare Stream Live connect, disconnect, and error events.","url":"https://developers.cloudflare.com/stream/stream-live/webhooks/","inLanguage":"en","image":"https://developers.cloudflare.com/stream/stream-live/webhooks/og.png?v=bd6e2a31ec0ddf75","dateModified":"2026-11-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
