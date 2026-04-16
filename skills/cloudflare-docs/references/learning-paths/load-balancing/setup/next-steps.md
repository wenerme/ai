---
title: Next steps
description: Your load balancer should be receiving production traffic (and you can confirm this by reviewing the analytics).
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/load-balancing/setup/next-steps.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Next steps

Your load balancer should be receiving production traffic (and you can confirm this by reviewing the [analytics](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/)).

Though your product is officially set up, you may want to consider the following suggestions.

## Usage-based notifications

Since this is a service with [usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/), Cloudflare recommends that you set up usage-based billing notifications to avoid unexpected bills.

To set up those notifications:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. On **Alert Type** of **Usage Based Billing**, click **Select**.
3. Fill out the following information:  
   * **Name**  
   * **Product**  
   * **Notification limit** (exact metric will vary based on product)  
   * **Notification email**  
Note  
Some plans also have access to alerts through [PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/) and [Webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/).
4. Select **Save**.

## Additional configuration options

You may want to further customize how your load balancer routes traffic or integrate your load balancer with other Cloudflare products:

* [ Additional DNS records ](https://developers.cloudflare.com/load-balancing/additional-options/additional-dns-records/)
* [ Cloudflare Tunnel (published applications) ](https://developers.cloudflare.com/load-balancing/additional-options/cloudflare-tunnel/)
* [ Spectrum ](https://developers.cloudflare.com/load-balancing/additional-options/spectrum/)
* [ Perform planned maintenance ](https://developers.cloudflare.com/load-balancing/additional-options/planned-maintenance/)
* [ Load shedding ](https://developers.cloudflare.com/load-balancing/additional-options/load-shedding/)
* [ DNS persistence ](https://developers.cloudflare.com/load-balancing/additional-options/dns-persistence/)
* [ Load Balancing with the China Network ](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-china/)
* [ Override HTTP Host headers ](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/)
* [ Custom load balancing rules ](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/)
* [ Integrate with PagerDuty ](https://developers.cloudflare.com/load-balancing/additional-options/pagerduty-integration/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/setup/next-steps/","name":"Next steps"}}]}
```
