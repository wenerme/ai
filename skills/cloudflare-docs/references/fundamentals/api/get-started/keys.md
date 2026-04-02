---
title: Get Global API key (legacy)
description: Global API key is the previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API key.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/api/get-started/keys.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get Global API key (legacy)

Global API key is the previous authorization scheme for interacting with the Cloudflare API. When possible, use [API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) instead of Global API key.

Note

Global API key is only available after the [account email address is verified](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/).

## Limitations

Global API key has multiple limitations when compared to API tokens:

* **Access to all Cloudflare resources** \- Global API key has access to all of a user's resources. This makes it impossible to safely use Global API key to access non-production resources when a user also has access to production resources.
* **Full permissions** \- Similarly, Global API key has the exact same permissions as the user, which means if the user can delete zones or change DNS records, so can the Global API key.
* **Limited to one per user** \- Only one Global API key can be provisioned per user. This complicates using Cloudflare's API in production systems where maintaining two secrets for accessing the API is important in the case one needs to be rolled.
* **Lack of advanced limits on usage** \- API tokens can be limited to specific time windows and expire or be limited to use from specific IP ranges.

For these reasons, Global API key is not recommended for new customers. Current customers using Global API key are encouraged to migrate and use API tokens instead.

## View your Global API key

To retrieve your Global API key:

1. In the Cloudflare dashboard and select **User Profile** \> **API Tokens**.  
[ Go to **Account API tokens** ](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. In the **API Keys** section, click `View` button of **Global API Key**.

## Change your Global API key

If your API key might be compromised, change your API key:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **My Profile** \> **API Tokens**.
3. In the **API Keys** section, find your key.
4. Select **Change**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/get-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/get-started/keys/","name":"Get Global API key (legacy)"}}]}
```
