---
title: Review changed scripts
description: Learn how to review scripts on your domain after receiving a code change alert.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/detection/review-changed-scripts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Review changed scripts

Note

Only available to customers with Client-Side Security Advanced.

Cloudflare analyzes the JavaScript dependencies in the pages of your domain over time.

You can configure a notification for [code change alerts](https://developers.cloudflare.com/client-side-security/alerts/alert-types/#code-change-alert) to receive a daily notification about changed scripts in your domain.

When you receive such a notification:

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-3322)  
   * [ Old dashboard ](#tab-panel-3323)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Check the details of each changed script and validate if it is an expected change.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/detection/","name":"Detection"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/detection/review-changed-scripts/","name":"Review changed scripts"}}]}
```
