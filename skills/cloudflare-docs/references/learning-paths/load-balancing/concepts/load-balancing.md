---
title: What is load balancing?
description: On the Internet, load balancing is where you spread traffic across many servers.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/load-balancing/concepts/load-balancing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# What is load balancing?

On the Internet, load balancing is where you spread traffic across many servers.

This process reduces the strain on each server, making it more efficient and faster to respond to requests.

## How it works

Imagine a checkout line at the grocery store.

If only one register is open, the line is going to be long and move slowly. Additionally, the employee at the register is going to be stressed. They have a lot of work to do, likely without any breaks and with increasingly frustrated customers.

As the store manager, you could solve the problem by opening more checkout lines. Customers can spread out to different lines and move faster. And your employees can do their job without as much stress.

Much in the same way, a load balancer distributes traffic across many servers. Without load balancing, too many requests might hit the same server and make it work too hard.

![Too much traffic can overload one of your servers](https://developers.cloudflare.com/_astro/without-load-balancing-diagram.CA4vGt0s_Z1ng0lJ.webp) 

A load balancer spreads requests across your servers, which prevents any one server from working too hard. Load balancing also makes your servers more efficient and lets them respond faster to incoming requests.

![A load balancer distributes traffic across your servers](https://developers.cloudflare.com/_astro/with-load-balancing-diagram.J1vO69li_1zwJ7g.webp) 

## Related resources

For more background information on load balancers, refer to our [Learning Center ↗](https://www.cloudflare.com/learning/performance/what-is-load-balancing/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/concepts/load-balancing/","name":"What is load balancing?"}}]}
```
