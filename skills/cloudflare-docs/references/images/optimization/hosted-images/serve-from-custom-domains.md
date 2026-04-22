---
title: Serve images from custom domains
description: Deliver Cloudflare Images through your own custom domain using the cdn-cgi image delivery path.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/optimization/hosted-images/serve-from-custom-domains.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Serve images from custom domains

Image delivery is supported from all customer domains under the same Cloudflare account. To serve images through custom domains, an image URL should be adjusted to the following format:

```

https://example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>


```

Example with a custom domain:

```

https://example.com/cdn-cgi/imagedelivery/ZWd9g1K7eljCn_KDTu_MWA/083eb7b2-5392-4565-b69e-aff66acddd00/public


```

In this example, `<ACCOUNT_HASH>`, `<IMAGE_ID>` and `<VARIANT_NAME>` are the same, but the hostname and prefix path is different:

* `example.com`: Cloudflare proxied domain under the same account as the Cloudflare Images.
* `/cdn-cgi/imagedelivery`: Path to trigger `cdn-cgi` image proxy.
* `ZWd9g1K7eljCn_KDTu_MWA`: The Images account hash. This can be found in the Cloudflare Images Dashboard.
* `083eb7b2-5392-4565-b69e-aff66acddd00`: The image ID.
* `public`: The variant name.

## Custom paths

By default, Images are served from the `/cdn-cgi/imagedelivery/` path. You can use [Transform Rules](https://developers.cloudflare.com/rules/transform/) to rewrite URLs and serve images from custom paths.

### Basic version

Free and Pro plans support string matching rules (including wildcard operations) that do not require regular expressions.

This example lets you rewrite a request from `example.com/images` to `example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>`.

To create a rule:

1. In the Cloudflare dashboard, go to the **Rules Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Next to **URL Rewrite Rules**, select **Create rule**.
3. Under **If incoming requests match**, select **Wildcard pattern** and enter the following **Request URL** (update with your own domain):  
```  
https://example.com/images/*  
```
4. Under **Then rewrite the path and/or query** \> **Path**, enter the following values (using your account hash):  
   * **Target path**: \[`/`\] `images/*`  
   * **Rewrite to**: \[`/`\] `cdn-cgi/imagedelivery/<ACCOUNT_HASH>/${1}`
5. Select **Deploy** when you are done.

### Advanced version

Note

This feature requires a Business or Enterprise plan to enable regular expressions in Transform Rules. Refer to Cloudflare [Transform Rules Availability](https://developers.cloudflare.com/rules/transform/#availability) for more information.

This example lets you rewrite a request from `example.com/images/some-image-id/w100,h300` to `example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/some-image-id/width=100,height=300` and assumes Flexible variants feature is turned on.

To create a rule:

1. In the Cloudflare dashboard, go to the **Rules Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Next to **URL Rewrite Rules**, select **Create rule**.
3. Under **If incoming requests match**, select **Custom filter expression** and then select **Edit expression**.
4. In the text field, enter `(http.request.uri.path matches "^/images/.*$")`.
5. Under **Path**, select **Rewrite to**.
6. Select _Dynamic_ and enter the following in the text field.

```

regex_replace(

  http.request.uri.path,

  "^/images/(.*)\\?w([0-9]+)&h([0-9]+)$",

  "/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/${1}/width=${2},height=${3}"

)


```

## Limitations

When using a custom domain, it is not possible to directly set up WAF rules that act on requests hitting the `/cdn-cgi/imagedelivery/` path. If you need to set up WAF rules, you can use a Cloudflare Worker to access your images and a Route using your domain to execute the worker. For an example worker, refer to [Serve private images using signed URL tokens](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/hosted-images/","name":"Hosted images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/hosted-images/serve-from-custom-domains/","name":"Serve images from custom domains"}}]}
```
