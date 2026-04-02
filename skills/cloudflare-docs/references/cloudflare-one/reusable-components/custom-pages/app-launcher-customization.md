---
title: App Launcher customization
description: You can display your own branding, messages, and links to users when they open the Access App Launcher.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/reusable-components/custom-pages/app-launcher-customization.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# App Launcher customization

Note

Only available on Pay-as-you-go and Enterprise plans.

You can display your own branding, messages, and links to users when they open the [Access App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/).

To customize the App Launcher appearance:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Reusable components** \> **Custom pages**.
2. Find the **App Launcher customization** setting and select **Manage**.
3. Give the App Launcher the look and feel of your organization by adding:  
   * Your organization's name  
   * A logo  
   * A preferred background color for the header  
   * A preferred background color for the page  
   * A custom footer with links to your organization's help desk or other internal resources.

Note

We recommend lighter background colors because the font defaults to black.

1. Next, customize the landing page that users will see when they login to the App Launcher. Available properties include:  
   * A custom title  
   * A custom subtitle  
   * An image  
   * A preferred color for the **Log in** button  
   * A preferred color for the **Log in** button text  
All of the properties configured in Step 3 will also apply to the landing page.
2. Once you are satisfied with your customization, select **Save**.

The App Launcher screens are now updated. To view your changes, select **Preview**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/custom-pages/","name":"Custom pages"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/custom-pages/app-launcher-customization/","name":"App Launcher customization"}}]}
```
