---
title: WordPress Jetpack and Cloudflare
description: Configure Jetpack and Cloudflare to work together.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WordPress Jetpack and Cloudflare

## Overview

Cloudflare and Jetpack for WordPress should require no additional configuration to operate together. However we do have some security features designed to protect your Jetpack installation, read on below to learn more.

### Default Jetpack protection from Cloudflare

The Cloudflare WAF managed rule WP0007 protects the `xmlrpc.php` file on all Cloudflare plans to allow only Jetpack to use the `xmlrpc.php?for=jetpack` query string. Cloudflare does this by only allowing the IP range of Jetpack’s automation systems. As such, any attempt to access `xmlrpc.php?for=jetpack` from an IP that is not a genuine Jetpack IP address will be blocked with a `HTTP 403 Forbidden` message from Cloudflare. This in itself is nothing to worry about and improves the security of your website and does not affect the functionality of Jetpack whatsoever.

For more information about why this was originally implemented, take a look at our blog post on the subject:

[https://blog.cloudflare.com/our-waf-is-keeping-wordpress-jetpack-on-track/ ↗](https://blog.cloudflare.com/our-waf-is-keeping-wordpress-jetpack-on-track/)

### Additional WAF managed rules that can impact Jetpack

There is a specific rule in [Web Application Firewall (WAF) ↗](https://www.cloudflare.com/waf/) managed rules that if enabled will block Jetpack’s servers from administering your settings. The WAF managed rule “WP0002 - Block WordPress XML-RPC” rule is disabled by default, but when enabled it completely disables access to the `xmlrpc.php` file. As such, we only recommend enabling this rule as an emergency measure if your `xmlrpc.php` endpoint is being attacked.

For further guidance, please contact our Support team.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/third-party-software/","name":"Third-Party Software"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/third-party-software/content-management-system-cms/","name":"Content Management System (CMS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/third-party-software/content-management-system-cms/wordpress-jetpack-and-cloudflare/","name":"WordPress Jetpack and Cloudflare"}}]}
```
