---
title: How do I enable HTTP2 Server Push in WordPress
description: Enable HTTP/2 Server Push with the WordPress plugin.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How do I enable HTTP2 Server Push in WordPress

HTTP/2 Server Push allows a website to push content to a browser, without having to wait for the HTML of one page to render first. In conjunction with the concurrency support built into HTTP/2, Server Push is able to dramatically reduce the amount of requests needed to load your website.

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005733367/http2-server-push-2.png
Article IDs: 115002816808 | How do I enable HTTP/2 Server Push in WordPress
](https://developers.cloudflare.com/_astro/hc-import-http2_server_push_2.CwfrU1Mt_66GP7.webp) 

Cloudflare supports HTTP/2 Server Push and it can be enabled for stylesheets and scripts using Cloudflare’s WordPress plugin. In order to utilise this feature, you must first ensure you have the Cloudflare WordPress plugin [installed and set up on your site](https://developers.cloudflare.com/automatic-platform-optimization/).

Once the plugin is installed, you can enable HTTP/2 Server Push by adding the following line to your `wp-config.php` file:

```

define('CLOUDFLARE_HTTP2_SERVER_PUSH_ACTIVE', true);


```

You should insert this line above where it says _"/\* That's all, stop editing! Happy blogging. \*/_", like follows:|

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005733547/Screen_Shot_2017-02-09_at_16.09.31.png
Article IDs: 115002816808 | How do I enable HTTP/2 Server Push in WordPress
](https://developers.cloudflare.com/_astro/hc-import-screen_shot_2017_02_09_at_16_09_31.CgPyEpOq_Tk4OA.webp) 

You should then start to see requests coming in which are initiated through Server Push, for example, in the Network tab of Chrome Development Tools you should see some assets have "Push" as the initiator:

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005787688/Screen-Shot-2016-04-26-at-15-08-59.png
Article IDs: 115002816808 | How do I enable HTTP/2 Server Push in WordPress
](https://developers.cloudflare.com/_astro/hc-import-screen_shot_2016_04_26_at_15_08_59.CUaoZjsJ_Z2audva.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/third-party-software/","name":"Third-Party Software"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/third-party-software/content-management-system-cms/","name":"Content Management System (CMS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/third-party-software/content-management-system-cms/how-do-i-enable-http2-server-push-in-wordpress/","name":"How do I enable HTTP2 Server Push in WordPress"}}]}
```
