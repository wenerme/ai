---
title: Troubleshooting
description: Resolve common APO issues including plugin detection and stale content.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

## WordPress plugin is undetected on Cloudflare dashboard

The WordPress plugin may go undetected on your Cloudflare dashboard for a few reasons.

* Versions older than 3.8.2 of the WordPress plugin are installed.  
   * **Solution:** Install version 4.4.0 of the WordPress plugin.
* Version 3.8.2 of the plugin is installed but existing cache plugins return stale responses, for example, without `cf-edge-cache` header.  
   * **Solution:** Enable APO from the WordPress plugin and purge the cache in the existing cache plugins.
* WordPress only runs on a subdomain, but WordPress and the WordPress plugin check against the apex domain.  
   * **Solution:** For additional information, see [Subdomains and subdirectories](https://developers.cloudflare.com/automatic-platform-optimization/reference/subdomain-subdirectories/)

If your Cloudflare dashboard cannot detect the WordPress plugin after trying the solutions above, ensure you completed all of the steps listed in [Activate the Cloudflare WordPress plugin](https://developers.cloudflare.com/automatic-platform-optimization/get-started/activate-cf-wp-plugin/).

Note

The Cloudflare APO WordPress plugin does not support multisite WordPress installation.

## WordPress returns stale content

If WordPress is returning stale content, [purge the cache](https://developers.cloudflare.com/cache/how-to/purge-cache/) when APO is enabled.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/automatic-platform-optimization/","name":"Automatic Platform Optimization"}},{"@type":"ListItem","position":3,"item":{"@id":"/automatic-platform-optimization/troubleshooting/","name":"Troubleshooting"}}]}
```
