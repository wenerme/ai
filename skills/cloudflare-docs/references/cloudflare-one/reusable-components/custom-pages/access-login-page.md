---
title: Access login page
description: Access login page in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# Access login page

You can customize the login page that is displayed to end users when they go to an Access application.

To change the appearance of your login page:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Reusable components** \> **Custom pages**.
2. Find the **Access login page** setting and select **Manage**.
3. Give the login page the look and feel of your organization by adding:  
   * Your organization's name  
   * A logo  
   * A custom header and footer  
   * A preferred background color  
Any changes you make will be reflected in real time in the **Preview** card.
4. Once you are satisfied with your customization, select **Save**.

The login page is now updated for all of your Access applications.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/custom-pages/","name":"Custom pages"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/custom-pages/access-login-page/","name":"Access login page"}}]}
```
