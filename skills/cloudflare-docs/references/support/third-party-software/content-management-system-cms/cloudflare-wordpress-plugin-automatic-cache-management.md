---
title: Cloudflare WordPress Plugin Automatic Cache Management
description: Manage automatic cache purging with the WordPress plugin.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Cloudflare WordPress Plugin Automatic Cache Management

## Overview

The Cloudflare WordPress plugin contains a feature called Automatic Cache Management. When a user adds, edits, or deletes a post, page, attachment, or comment - any associated URLs are purged from the Cloudflare cache.

When you switch a theme or customise a theme within the WordPress admin panel, the cache will automatically be cleared too.

Automatic Cache Management uses native hooks built into WordPress. The Cloudflare WordPress plugin purges the following cache URLs:

* deleted\_post
* edit\_post
* delete\_attachment
* autoptimize\_action\_cachepurged (for compatibility with the Autoptimize WordPress plugin)
* switch\_theme
* customize\_save\_after

---

## Enable Automatic Cache Management

To enable Automatic Cache Management after [installing the WordPress plugin](https://developers.cloudflare.com/automatic-platform-optimization/):

1. Log in to your WordPress account.
2. Click **Settings** and choose the Cloudflare plugin. The Cloudflare plugin home page appears.
3. Click **Enable** to the right of the **Automatic Cache** feature. A confirmation dialog appears.
4. Click **I'm sure** in the confirmation dialog to confirm.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/third-party-software/","name":"Third-Party Software"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/third-party-software/content-management-system-cms/","name":"Content Management System (CMS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/third-party-software/content-management-system-cms/cloudflare-wordpress-plugin-automatic-cache-management/","name":"Cloudflare WordPress Plugin Automatic Cache Management"}}]}
```
