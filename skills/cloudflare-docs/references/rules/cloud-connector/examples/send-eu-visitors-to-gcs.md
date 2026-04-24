---
title: Send EU visitors to a Google Cloud Storage bucket
description: Route all traffic from EU visitors to a Google Cloud Storage bucket using Cloud Connector.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/cloud-connector/examples/send-eu-visitors-to-gcs.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Send EU visitors to a Google Cloud Storage bucket

Route all traffic from EU visitors to a Google Cloud Storage bucket using Cloud Connector.

To route requests from visitors in the European Union to a Google Cloud Storage bucket:

1. In the Cloudflare dashboard, go to the **Cloud Connector** page.  
[ Go to **Cloud Connector** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/cloud-connector)
2. Select **Google Cloud Storage** as your [cloud provider](https://developers.cloudflare.com/rules/cloud-connector/providers/).
3. Enter the bucket URL. You can structure the URL in two ways:  
   * **Subdomain-style URL**: For `<BUCKET_NAME>.storage.googleapis.com`, your files should be organized in the root of the bucket. For example, `https://<YOUR_HOSTNAME>/index.html` will map to `https://<BUCKET_NAME>.storage.googleapis.com/index.html`.  
   * **URI path-style URL**: If you set the hostname to `storage.googleapis.com`, your bucket must include folders corresponding to the intended URI paths. For example, if you want `https://<YOUR_HOSTNAME>/eu/index.html` to map to a file in your bucket, the file should be placed at `https://storage.googleapis.com/<BUCKET_NAME>/eu/index.html`.
4. (Optional) Use [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/) to adjust the URL structure. For example, you can [create a URL rewrite](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/) that changes `/eu` to `/<BUCKET_NAME>` to match the URI path-style URL structure.
5. (Optional) Use [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to adjust the caching behavior for objects returned from the bucket. For example, you can [create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) that caches every returned object matching the `/eu` URI path for seven days (defined through the **Edge TTL** setting).
6. Select **Next** and enter a descriptive name like `Route EU visitors to GCP` in **Cloud Connector name**.
7. Under **If**, select **Custom filter expression** and enter the following expression:`(ip.src.is_in_european_union)`  
This expression targets traffic from European Union users.
8. Select **Deploy** to activate the rule.

This configuration will route traffic from EU visitors to your Google Cloud Storage bucket. Make sure to replace `<YOUR_HOSTNAME>` with your actual hostname and adjust the example paths according to your setup.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/cloud-connector/","name":"Cloud Connector"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/cloud-connector/examples/","name":"Cloud Connector examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/cloud-connector/examples/send-eu-visitors-to-gcs/","name":"Send EU visitors to a Google Cloud Storage bucket"}}]}
```
