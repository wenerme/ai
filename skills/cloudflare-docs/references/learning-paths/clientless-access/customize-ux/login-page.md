---
title: Login page
description: The Access login page is where users select their identity provider (IdP) or One-Time PIN prior to accessing the application. Customers who only use one IdP usually enable Instant Auth for their applications, which redirects end users directly to the SSO login page. If you are using multiple IdPs, we recommend customizing the Access login page to match your branding and minimize user confusion.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/clientless-access/customize-ux/login-page.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Login page

The Access login page is where users select their identity provider (IdP) or One-Time PIN prior to accessing the application. Customers who only use one IdP usually enable **Instant Auth** for their applications, which redirects end users directly to the SSO login page. If you are using multiple IdPs, we recommend customizing the Access login page to match your branding and minimize user confusion.

## Customize the login page

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/customize-ux/","name":"Customize the end user experience"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/customize-ux/login-page/","name":"Login page"}}]}
```
