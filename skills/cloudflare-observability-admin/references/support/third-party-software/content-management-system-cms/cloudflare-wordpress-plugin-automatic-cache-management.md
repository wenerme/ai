---
description: Manage automatic cache purging with the WordPress plugin.
title: Cloudflare WordPress Plugin Automatic Cache Management
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare WordPress Plugin Automatic Cache Management

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/cloudflare-wordpress-plugin-automatic-cache-management/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/cloudflare-wordpress-plugin-automatic-cache-management/#page","headline":"Cloudflare WordPress Plugin Automatic Cache Management · Cloudflare Support docs","description":"Manage automatic cache purging with the WordPress plugin.","url":"https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/cloudflare-wordpress-plugin-automatic-cache-management/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
