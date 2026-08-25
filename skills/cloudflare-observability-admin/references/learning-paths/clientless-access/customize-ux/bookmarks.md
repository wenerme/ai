---
description: Add bookmarks to the Access App Launcher.
title: Bookmarks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Bookmarks

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/bookmarks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Cloudflare One, you can show applications on the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) even if those applications are not secured behind Access. This way, users can access all the applications they need to work, all in one place — regardless of whether those applications are protected by Access.

Links to applications not protected by Access can be added as bookmarks. You can assign [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to control which users see the bookmark in the App Launcher. Users who do not match an Allow policy will not see the bookmark tile. Unlike policies for other Access application types, bookmark policies only affect visibility in the App Launcher and do not control access to the destination URL.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **Bookmarks**.
3. Name your application.
4. Enter your **Application URL**, for example `https://mybookmark.com`.
5. (Optional) To restrict who can see the bookmark, select an existing policy or create a new one. If you do not add any policies, the bookmark is visible to all users in your organization.

  * To use an existing policy, select **Select existing policies** and choose the policies you want to apply. Refer to [supported policies](#supported-policies) for policy limitations.
  * To create a new policy, select **Create new policy** and [build your policy rules](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).
6. Select **Next**.
7. Turn on **App Launcher visibility** if you want the application to be visible in the App Launcher. The toggle does not impact the ability for users to reach the application.
8. (Optional) To add a custom logo for your application, select **Custom** and enter the image URL.
Note
If you are having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
9. Select **Save**.

The application will show up on the Applications page labeled as `BOOKMARK`. You can always edit or delete your bookmarks, as you would any other application.

## Authentication logs

Bookmark applications do not generate individual [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/#authentication-logs) when a user selects the bookmark tile. Only the authentication event to the App Launcher itself is logged.

## Supported bookmark policies

Bookmark policies support all [Access policy selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors), including

* Identity-based selectors (such as emails, email domains, or identity provider groups)
* Location-based selectors (such as country or IP ranges)
* Device posture checks (requires installing the Cloudflare One Client)

The following policy features are not supported for bookmark applications:

* [Isolate application](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/)
* [Purpose justification](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/require-purpose-justification/)
* [Temporary authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/)

If you attempt to assign a policy that uses an unsupported feature, the dashboard will display an error.

Device posture policies

To show bookmarks only to users on managed devices, assign a policy that requires device posture checks (such as [Require Gateway](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-gateway/)). The bookmark will only appear in the App Launcher for users whose devices satisfy the posture requirements.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/bookmarks/#page","headline":"Bookmarks · Cloudflare Learning Paths","description":"Add bookmarks to the Access App Launcher.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/bookmarks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
