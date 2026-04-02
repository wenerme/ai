---
title: Workers as your fallback origin
description: Learn how to use a Worker as the fallback origin for your SaaS zone.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/worker-as-origin.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Workers as your fallback origin

If you are building your application on [Cloudflare Workers](https://developers.cloudflare.com/workers/), you can use a Worker as the origin for your SaaS zone (also known as your fallback origin).

## How custom hostname traffic reaches your Worker

When customers point their domains to your SaaS zone (for example, `mystore.customer.com` CNAMEs to `service.saasprovider.com`), their traffic enters your Cloudflare zone. Any Worker routes configured on your zone will match this incoming traffic.

For example, if you have:

* Your SaaS zone: `saasprovider.com`
* Your fallback origin: `service.saasprovider.com`
* Customer's custom hostname: `mystore.customer.com` (pointed to your zone via CNAME)
* Worker route: `*/*`

When a visitor requests `mystore.customer.com`, Cloudflare routes that request through your zone. The `*/*` route pattern matches all traffic entering your zone, including traffic from custom hostnames like `mystore.customer.com`.

Note

You do not need to add individual Worker routes for each custom hostname. The wildcard route pattern (`*/*`) automatically captures all traffic entering your zone, including traffic from customer vanity domains.

## Set up a Worker as your fallback origin

1. In your SaaS zone, [create and set a fallback origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#1-create-fallback-origin). Ensure the fallback origin only has an [originless DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#originless-setups):  
   * **Example**: `service.example.com AAAA 100::`
2. In that same zone, navigate to **Workers Routes**.
3. Click **Add route**.
4. Configure a route to send traffic to your Worker. Choose one of the following options based on your needs:  
   * **Route all traffic to the Worker** (recommended for most SaaS applications):  
         * **Route**: `*/*`  
         * **Worker**: Select the Worker used for your SaaS application.  
   This pattern routes all traffic entering your zone to the Worker, including requests from custom hostnames (for example, `mystore.customer.com`) and requests to your own subdomains (for example, `app.saasprovider.com`).  
   * **Route all but specific routes to worker**:  
         * **Route**: `*/*`  
         * **Worker**: Select the Worker used for your SaaS application.  
         * Add a second route for your zone's own hostnames with **Worker** set to **None** to exclude them.  
   For example, if your zone is `saasprovider.com` and you want `api.saasprovider.com` to bypass the Worker, create an additional route `api.saasprovider.com/*` with no Worker assigned. More specific routes take precedence over wildcard routes.  
   * **Route only custom hostname traffic to the Worker**:  
   * **Route**: `vanity.customer.com`  
   * **Worker**: Select the Worker used for your SaaS application.
5. Click **Save**.

---

Zone name restriction

Do not configure a custom hostname which matches the zone name. For example, if your SaaS zone is `example.com`, do not create a custom hostname named `example.com`.

## Related resources

* [Hostname routing](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/hostname-routing/) \- Learn about advanced routing patterns, including dispatch Workers and O2O behavior.
* [Workers routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) \- Learn more about route pattern matching and validity rules.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/","name":"Advanced Settings"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/worker-as-origin/","name":"Workers as your fallback origin"}}]}
```
