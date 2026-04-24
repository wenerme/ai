---
title: Troubleshoot missing images
description: Fix missing or broken images after enabling image optimization.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Debugging ](https://developers.cloudflare.com/search/?tags=Debugging) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/images/troubleshooting/troubleshooting-missing-images.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Troubleshoot missing images

If images are missing from your website, other Cloudflare features may be interfering with those images.

To troubleshoot:

1. Perform one of the following actions:  
   * [Purge cache](https://developers.cloudflare.com/cache/how-to/purge-cache) for the URL of the missing image file.  
   * [Temporarily pause Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/).  
   * Disable [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/).
2. Retest the image load in a private browser tab.
3. If the issue is not fixed, try another of the actions suggested in Step 1.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/images/","name":"Image optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/images/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/images/troubleshooting/troubleshooting-missing-images/","name":"Troubleshoot missing images"}}]}
```
