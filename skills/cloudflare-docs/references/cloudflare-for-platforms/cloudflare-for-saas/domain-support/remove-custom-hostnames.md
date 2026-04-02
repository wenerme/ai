---
title: Remove custom hostnames
description: Learn how to remove custom hostnames for inactive customers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/domain-support/remove-custom-hostnames.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Remove custom hostnames

As a SaaS provider, your customers may decide to no longer participate in your service offering. If that happens, you need to stop routing traffic through those custom hostnames.

## Domains using Cloudflare

If your customer's domain is also using Cloudflare, they can stop routing their traffic through your custom hostname by updating their Cloudflare DNS.

If they update their [CNAME record](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#3-have-customer-create-cname-record) so that it no longer points to your `CNAME` target:

* The domain's traffic will not route through your custom hostname.
* The custom hostname will enter into a **Moved** state.

If the custom hostname is in a **Moved** state for seven days, it will transition into a **Deleted** state.

You should remove a customer's custom hostname from your zone if they decide to churn. This is especially important if your end customers are using Cloudflare because if the churned customer changes the DNS target to point away from your SaaS zone but you have not removed it, the custom hostname will continue to route to your service. This is a result of the [custom hostname priority logic](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/#hostname-priority).

## Domains not using Cloudflare

If your customer's domain is not using Cloudflare, you must remove a customer's custom hostname from your zone if they decide to churn.

* [ Dashboard ](#tab-panel-3346)
* [ API ](#tab-panel-3347)

1. In the Cloudflare dashboard, go to the **Custom Hostnames** page.  
[ Go to **Custom Hostnames** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames)
2. Select the custom hostname and select **Delete**.
3. A confirmation window will appear. Acknowledge the warning and select **Delete** again.

To delete a custom hostname and any issued certificates using the API, send a [DELETE request](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/delete/).

## For end customers

If your SaaS domain is also a [domain using Cloudflare](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/), you can use your Cloudflare DNS to remove your domain from your SaaS provider.

This means that - if you [remove the DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) pointing to your SaaS provider - Cloudflare will stop routing domain traffic through your SaaS provider and the associated custom hostname will enter a **Moved** state.

This also means that you need to keep DNS records pointing to your SaaS provider for as long as you are a customer. Otherwise, you could accidentally remove your domain from their services.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/","name":"Custom hostnames"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/remove-custom-hostnames/","name":"Remove custom hostnames"}}]}
```
