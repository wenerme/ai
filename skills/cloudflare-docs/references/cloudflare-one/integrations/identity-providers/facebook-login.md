---
title: Facebook
description: Use these steps to set up Facebook as your identity provider.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/integrations/identity-providers/facebook-login.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Facebook

Use these steps to set up Facebook as your identity provider.

1. Go to [developers.facebook.com ↗](https://developers.facebook.com/).
2. Select **Create App** at the top-right. The **Create a New App ID** card displays.
3. Enter the **Display Name** and **Contact Email**.
4. Select **Create App ID**. The **Create a New App ID** window displays.
5. Enter the CAPTCHA code to proceed.
6. Select **Submit**.
7. On the **Facebook Login** card, select **Set Up**. A Quickstart card displays offering platform choices.
8. Select **Web**. The **Web** tab displays.
9. Enter your **Site URL**.
10. Select **Save**.
11. Select **Continue**. Ignore any JavaScript page that suggests that you install it on your site.
12. Select **Settings** \> **Basic**.
13. Copy the **App ID** and **App Secret**.  
![Facebook Settings with App ID and App Secret highlighted](https://developers.cloudflare.com/_astro/fb6.BYub0V9o_Z1pWgVC.webp)
14. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Integrations** \> **Identity providers**.
15. Under **Your identity providers**, select **Add new identity provider**.
16. Fill in the **App ID** and **App Secret** obtained from Facebook.
17. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
18. Select **Save**.
19. On [developers.facebook.com ↗](https://developers.facebook.com/), select **Facebook Login** \> **Settings** on the left-hand menu.
20. Ensure that the **Use Strict Mode for Redirect URIs** slider is set to **Yes**.
21. In the **Valid OAuth redirect URIs** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in [Cloudflare One ↗](https://one.dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
22. Select **Save Changes**.

To test that your connection is working, follow the steps on [SSO Integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one).

## Example API Configuration

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>"

  },

  "type": "facebook",

  "name": "my example idp"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/facebook-login/","name":"Facebook"}}]}
```
