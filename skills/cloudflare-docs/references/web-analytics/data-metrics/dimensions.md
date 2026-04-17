---
title: Dimensions
description: Dimensions available for filtering and grouping Web Analytics data.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web-analytics/data-metrics/dimensions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Dimensions

Dimensions are the labels used to describe different types of metrics or data. For example, **Referer** is the data collected from external links referring visits to a page, while **Browser** shows which browsers accessed your website.

Below you can find a list of the different dimensions you can use to filter Web Analytics:

* **Country**: The visitor's country.
* **Host**: The domain of the site's URL.
* **Path**: The links within your site referring visits to a page.
* **Referer**: The external links referring visits to a page. You can access `referer host` data on the dashboard. Additionally, you can access data for the `referer path` from the GraphQL API.
* **Device type**: The device visitors use to access a page (for example, desktop, mobile, or tablet).
* **Browser**: The web browser (for example, Chrome, Safari) visitors use to access your website.
* **Operating system**: The operating system visitors use to access a page.
* **Site**: The website's domain name. Used for high-level segmentation of data. For example, you can use it for a particular zone or gray-clouded website.
* **Exclude Bots**: Exclude bot traffic from the dataset. With this dimension set to `Yes`, the resulting dataset will be a closer representation of real user traffic.
![Web Analytics dimensions page](https://developers.cloudflare.com/_astro/dash-web_analytics-dimensions.DqK_-eil_Z1zFiTJ.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web-analytics/","name":"Cloudflare Web Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/web-analytics/data-metrics/","name":"Data and metrics"}},{"@type":"ListItem","position":4,"item":{"@id":"/web-analytics/data-metrics/dimensions/","name":"Dimensions"}}]}
```
