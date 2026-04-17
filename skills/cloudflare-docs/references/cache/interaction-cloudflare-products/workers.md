---
title: Customize cache behavior with Workers
description: Customize cache behavior with the Workers Cache API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cache/interaction-cloudflare-products/workers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Customize cache behavior with Workers

You can use [Workers](https://developers.cloudflare.com/workers/) to customize cache behavior on Cloudflare's CDN. Cloudflare Workers provide flexibility in handling assets and responses by running both before and after the cache. A Worker can be configured to run before a request reaches the cache, allowing for modifications to the request, and it can also be used to modify assets once they are returned from the cache.

The diagram below illustrates a common interaction flow between Workers and Cache.

![Workers and cache flow example flow diagram.](https://developers.cloudflare.com/_astro/workers-cache-flow.DBEQRofC_ZP2BOU.webp) 
1. A User (a) Requests a URI, and this request is directed to a Worker. The Worker can then interact with the request, either requesting the content further upstream using (b) fetch() or sending a (f) Response back to the User.
2. If the content is cached, the Cache will send a (e) Response back to the Worker which can now interact with the response before sending a (f) Response back to the user.
3. When using cache rules with Workers, the cache rule should not be set based on the user URL/host (a). Instead, the rule must match the properties of the URL in the fetch() (b) request — such as headers, hostname, or URL path — otherwise, the rule will not be applied.

Here are a few examples of how Workers can be used to customize cache behavior:

* **Modify Response**: Adjust or enhance content after it is retrieved from the cache, ensuring that responses are up-to-date or tailored to specific needs.
* **Signed URLs**: Generate URLs that are valid for a specific duration (for example, minutes, hours, days) to control access and enhance security.
* **Personalized Response**: Deliver personalized content based on user data while leveraging cached resources to reduce the load on the origin.
* **Reduce Latency**: Serve content from a location close to the user, decreasing load times and improving the user experience.

You can also use [Snippets](https://developers.cloudflare.com/rules/snippets/) as a free alternative for simple modifications and logic, bypassing the need for full Worker scripts. These lightweight scripts enable quick adjustments and optimizations, offering an efficient way to enhance your Cloudflare setup without the complexity and overhead of more extensive code deployments.

Note

When using Workers and [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/), some caveats and limitations may apply.

## Cache features in Workers

* **fetch()**: Allows interaction with Cloudflare's Cache and Tiered Cache, providing control over how requests are handled. To optimize caching behavior, you can set TTLs, define custom cache keys, and configure cache headers directly within a fetch request. For more details on these configurations, refer to [Cache using fetch](https://developers.cloudflare.com/workers/examples/cache-using-fetch/).
* **Cache API**: Enables storing and retrieving responses from Cloudflare's cache, limited to the cache in the local data center and excluding content stored in the Tiered Cache. To use the Cache API to store responses in Cloudflare's cache, refer to [Using the Cache API](https://developers.cloudflare.com/workers/examples/cache-api/).

To understand more about how Cache and Workers interact refer to [Cache in Workers](https://developers.cloudflare.com/workers/reference/how-the-cache-works/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/interaction-cloudflare-products/","name":"Interaction with Cloudflare products"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/interaction-cloudflare-products/workers/","name":"Customize cache behavior with Workers"}}]}
```
