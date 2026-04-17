---
title: Create and manage widgets using the Cloudflare dashboard
description: Create and manage Turnstile widgets in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/turnstile/get-started/widget-management/dashboard.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create and manage widgets using the Cloudflare dashboard

The Cloudflare dashboard provides a user-friendly interface for creating and managing widgets.

## Create a widget

1. In the Cloudflare dashboard, go to the **Turnstile** page.  
[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Select **Add widget**.
3. Fill out the required information:  
   * **Widget name**: A descriptive name for your widget.  
   * **Hostname management**: Domains where the widget will be used.  
   * **Widget mode**: Choose from Managed, Non-Interactive, or Invisible.
4. (Optional) Configure **Pre-clearance support** for single-page applications.
5. Select **Create** to save your widget.
6. Copy your sitekey and secret key, and store the secret key securely.

## Manage existing widgets

You can view your widget details on the Cloudflare dashboard by selecting any existing widget to access analytics, settings, and performance metrics.

To update the widget configuration, go to any existing widget and select **Settings**. Select **Save** to apply your changes.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/get-started/widget-management/","name":"Widget management"}},{"@type":"ListItem","position":5,"item":{"@id":"/turnstile/get-started/widget-management/dashboard/","name":"Create and manage widgets using the Cloudflare dashboard"}}]}
```
