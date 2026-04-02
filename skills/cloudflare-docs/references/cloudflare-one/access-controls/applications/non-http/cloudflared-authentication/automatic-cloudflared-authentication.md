---
title: Enable automatic cloudflared authentication
description: When users connect to an Access application through cloudflared, the browser prompts them to allow access by displaying this page:
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Enable automatic cloudflared authentication

When users connect to an Access application through `cloudflared`, the browser prompts them to allow access by displaying this page:

![Access request prompt page displayed after logging in with cloudflared.](https://developers.cloudflare.com/_astro/access-screen.BXZJ23p9_Mn6VE.webp) 

Automatic `cloudflared` authentication allows users to skip this login page if they already have an active IdP session.

To enable automatic `cloudflared` authentication:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Locate your application and select **Configure**.
3. Go to **Basic information** \> **Browser rendering settings**.
4. Turn on **Allow automatic Cloudflared authentication**.
5. Select **Save application**.

This option will still prompt a browser window in the background, but authentication will now happen automatically.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/","name":"Non-HTTP applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/","name":"Client-side cloudflared"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/","name":"Enable automatic cloudflared authentication"}}]}
```
