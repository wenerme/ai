---
description: Configure the Access App Launcher portal.
title: App Launcher
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# App Launcher

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/app-launcher/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With the Access App Launcher, users can open all applications that they have access to from a single dashboard.

The App Launcher is available at a team domain unique to your Cloudflare Zero Trust account, for example `mycompany.cloudflareaccess.com`.

Users log in using one of the identity providers configured for the account. Once Access authenticates the user, the App Launcher displays applications they are authorized to use, in the form of application tiles. Selecting an application tile launches the application's hostname, sending the user to that tool as part of their SSO flow.

![App Launcher portal](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1866,height=1156,format=webp/_astro/app-launcher.BA8TF5r4.png)

## Enable the App Launcher

By default, the App Launcher is disabled. To enable it, you must configure a policy that defines which users can access the App Launcher.

To enable the App Launcher:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Access settings**.
2. Under the **Manage your App Launcher** card, select **Manage**.
3. On the **Policies** tab, [build a policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to define who can access your App Launcher portal. These rules do not impact permissions for the applications secured behind Access.
4. On the **Authentication** tab, choose the identity providers users can authenticate with.
5. Select **Save**.

The App Launcher is now available at `<your-team-name>.cloudflareaccess.com`. You can always edit your App Launcher rules by going to **Access controls** \> **Access settings**.

## Add a tile to the App Launcher

Tiles have a one-to-one relationship with each application you create in Access. The tile names displayed in the Access App Launcher portal correspond to the application names listed under **Access controls** \> **Applications**. For example, if you create one application for general access to your Jira deployment and a separate application that restricts requests to a particular Jira path, a user authorized for both will see separate tiles for each. If you add multiple hostnames to a single application, the user will only see the domain selected in the application's **App Launcher** settings.

To show an Access application in the App Launcher:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select an application and select **Configure**.
3. Go to **Experience settings**.
4. Select **Show application in App Launcher**. The App Launcher link will only appear for users who are allowed by your Access policies. Blocked users will not see the app in their App Launcher.
Note
This toggle does not impact the user's ability to reach the application. Allowed users can always reach the application via a direct link, regardless of whether the toggle is enabled. Blocked users will never have access to the application.
5. (Optional) To use a custom logo for the application tile, select **Use custom logo** and enter a link to your desired image.
Note
If you are having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
6. In **Application domains**, choose a domain to use for the App Launcher link.
7. (Optional) In **Tags**, add [custom tags](https://developers.cloudflare.com/cloudflare-one/reusable-components/tags/) so that users can more easily find the application in their App Launcher.

## Customize App Launcher appearance

To customize the App Launcher with your own branding, messages, and links, refer to the [Custom pages documentation](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/app-launcher-customization/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/app-launcher/#page","headline":"App Launcher · Cloudflare Learning Paths","description":"Configure the Access App Launcher portal.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/app-launcher/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
