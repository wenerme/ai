---
title: Route /images to an S3 Bucket
description: Route requests with a URI path starting with `/images` to a specific AWS S3 bucket using Cloud Connector.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ AWS ](https://developers.cloudflare.com/search/?tags=AWS)[ S3 ](https://developers.cloudflare.com/search/?tags=S3) 

# Route /images to an S3 Bucket

Route requests with a URI path starting with `/images` to a specific AWS S3 bucket using Cloud Connector.

To route requests to `/images` on your domain to an AWS S3 bucket:

1. In the Cloudflare dashboard, go to the **Cloud Connector** page.  
[ Go to **Cloud Connector** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/cloud-connector)
2. Select **Amazon S3** as your [cloud provider](https://developers.cloudflare.com/rules/cloud-connector/providers/).
3. Enter the bucket URL. You can structure the URL in two ways:  
   * **Subdomain-style URL**: Set the hostname to `<BUCKET_NAME>.s3.amazonaws.com`. In this case, your files should be organized in the root of the bucket, meaning the URI path will map directly to the file. For example, `https://<YOUR_HOSTNAME>/images/file.jpg` will map to `https://<BUCKET_NAME>.s3.amazonaws.com/images/file.jpg`.  
   * **URI path-style URL**: Set the hostname to `s3.amazonaws.com`. Here, your bucket must include a folder named `images`, and files should be placed inside this folder. The URI path will then include the bucket name, like `https://<YOUR_HOSTNAME>/<BUCKET_NAME>/images/file.jpg` mapping to `https://s3.amazonaws.com/<BUCKET_NAME>/images/file.jpg`.
4. (Optional) Use [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/) to adjust the URL structure. For example, you can [create a URL rewrite](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/) that changes `/images` to `/<BUCKET_NAME>/images` to match the URI path-style URL structure.
5. (Optional) Use [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to adjust the caching behavior for objects returned from the bucket. For example, you can [create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) that caches every returned object matching the `/images/*` URI path for seven days:  
   * **If incoming requests match** \> Custom filter expression: `(starts_with(http.request.uri.path, "/images/"))`  
   * **Cache eligibility**: Eligible for cache  
         * **Edge TTL** \> Ignore cache-control header and use this TTL: _7 days_
6. Select **Next** and enter a descriptive name like `Route images to S3` in **Cloud Connector name**.
7. Under **If**, select **Custom filter expression** and enter the following expression:  
`http.request.full_uri wildcard "http*://<YOUR_HOSTNAME>/images/*"`  
Replace `<YOUR_HOSTNAME>` with desired hostname.
8. Select **Deploy** to activate the rule.

This setup will route all traffic matching `http*://<YOUR_HOSTNAME>/images/*` (HTTPS and HTTP requests) to your S3 bucket. Make sure to replace `<YOUR_HOSTNAME>` with your actual hostname and adjust the example paths according to your setup.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/cloud-connector/","name":"Cloud Connector"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/cloud-connector/examples/","name":"Cloud Connector examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/cloud-connector/examples/route-images-to-s3/","name":"Route /images to an S3 Bucket"}}]}
```
