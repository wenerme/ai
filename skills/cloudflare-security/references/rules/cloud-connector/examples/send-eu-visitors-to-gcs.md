---
description: Route all traffic from EU visitors to a Google Cloud Storage bucket using Cloud Connector.
title: Send EU visitors to a Google Cloud Storage bucket
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Send EU visitors to a Google Cloud Storage bucket

Route all traffic from EU visitors to a Google Cloud Storage bucket using Cloud Connector.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/cloud-connector/examples/send-eu-visitors-to-gcs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To route requests from visitors in the European Union to a Google Cloud Storage bucket:

1. In the Cloudflare dashboard, go to the **Cloud Connector** page.
[Go to **Cloud Connector** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/cloud-connector)
2. Select **Google Cloud Storage** as your [cloud provider](https://developers.cloudflare.com/rules/cloud-connector/providers/).
3. Enter the bucket URL. You can structure the URL in two ways:

  * **Subdomain-style URL**: For `<BUCKET_NAME>.storage.googleapis.com`, your files should be organized in the root of the bucket. For example, `https://<YOUR_HOSTNAME>/index.html` will map to `https://<BUCKET_NAME>.storage.googleapis.com/index.html`.
  * **URI path-style URL**: If you set the hostname to `storage.googleapis.com`, your bucket must include folders corresponding to the intended URI paths. For example, if you want `https://<YOUR_HOSTNAME>/eu/index.html` to map to a file in your bucket, the file should be placed at `https://storage.googleapis.com/<BUCKET_NAME>/eu/index.html`.
4. (Optional) Use [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/) to adjust the URL structure. For example, you can [create a URL rewrite](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/) that changes `/eu` to `/<BUCKET_NAME>` to match the URI path-style URL structure.
5. (Optional) Use [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to adjust the caching behavior for objects returned from the bucket. For example, you can [create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) that caches every returned object matching the `/eu` URI path for seven days (defined through the **Edge TTL** setting).
6. Select **Next** and enter a descriptive name like `Route EU visitors to GCP` in **Cloud Connector name**.
7. Under **If**, select **Custom filter expression** and enter the following expression: `(ip.src.is_in_european_union)`
This expression targets traffic from European Union users.
8. Select **Deploy** to activate the rule.

This configuration will route traffic from EU visitors to your Google Cloud Storage bucket. Make sure to replace `<YOUR_HOSTNAME>` with your actual hostname and adjust the example paths according to your setup.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/cloud-connector/examples/send-eu-visitors-to-gcs/#page","headline":"Send EU visitors to a Google Cloud Storage bucket · Cloudflare Rules docs","description":"Route all traffic from EU visitors to a Google Cloud Storage bucket using Cloud Connector.","url":"https://developers.cloudflare.com/rules/cloud-connector/examples/send-eu-visitors-to-gcs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GCP","Geolocation"]}
```
