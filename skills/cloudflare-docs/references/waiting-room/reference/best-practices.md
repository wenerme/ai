---
title: Best practices
description: Follow these best practices to avoid potential issues and improve the visitor experience.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waiting-room/reference/best-practices.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Best practices

Follow these best practices to avoid potential issues and improve the visitor experience.

## Total active users

When specifying the **Total active users** in your [configuration settings](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/), set the value to `75%` of your origin's traffic capacity.

## Page path

When setting the waiting room **Path** in your [configuration settings](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/), pay attention to potential subpaths. Waiting rooms are enabled on all subpaths, meaning you might be sending more traffic to your waiting room than anticipated.

Additionally, if you have multiple waiting rooms, the waiting room with the most specific subpath takes precedence.

## Update during active queueing

### Waiting room template

If you want to provide your users with updated information or expectations when they are queueing, Cloudflare recommends that you update your [waiting room template](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room/). All changes will be visible to your users in close to real time.

### Configuration settings

When users are actively queueing, only make changes to your [configuration settings](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/) when necessary. These changes may impact the estimated wait time shown to end users, which might lead to user confusion.

### Queueing method

Though you can change your [queueing method](https://developers.cloudflare.com/waiting-room/reference/queueing-methods/), it may affect users if your waiting room is actively queueing:

* **From FIFO to Random**: Users will no longer be ordered based on their cookie timestamp, which may affect the displayed wait time.
* **From Random to FIFO**: Users will be ordered based on their cookie timestamp, meaning any new users move to the end of the FIFO queue.

Note

If you change the queueing method from FIFO > Random > FIFO, users will be ordered by their original entry time.

## Waiting Room and SEO

SEO crawlers may end up in a queue during active queueing. When this happens, your sites search results and SEO may be impacted. To avoid this, you can enable SEO Crawler Bypassing from the Waiting Room dashboard or via API. SEO Crawler Bypassing ensures that trusted SEO Crawlers, verified by Bot Management, are never placed in your waiting rooms. By not being queued, SEO crawlers are always able to crawl your site, which helps maintain your SEO and search results in major search engines.

By enabling this service, you understand that these verified crawlers are completely bypassing your waiting rooms. No waiting room settings or features will apply to this traffic.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}},{"@type":"ListItem","position":3,"item":{"@id":"/waiting-room/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/waiting-room/reference/best-practices/","name":"Best practices"}}]}
```
