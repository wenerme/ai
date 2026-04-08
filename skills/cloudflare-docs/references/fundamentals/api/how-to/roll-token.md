---
title: Roll tokens
description: If your token is lost or compromised, you can either create a new token or roll your token to generate a new secret. Rolling your API token into a new one will invalidate the previous token, but the access and permissions will be the same as the previous API token. The new token uses the scannable format, which allows credential scanning tools to detect leaked tokens.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/api/how-to/roll-token.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Roll tokens

If your token is lost or compromised, you can either create a new token or roll your token to generate a new secret. Rolling your API token into a new one will invalidate the previous token, but the access and permissions will be the same as the previous API token. The new token uses the [scannable format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which allows credential scanning tools to detect leaked tokens.

To roll your API token:

1. Go to **My Profile** \> **API Tokens**.  
[ Go to **API Tokens** ](https://dash.cloudflare.com/profile/api-tokens)
2. Next to the API token you want to roll, select the **three dot icon** \> **Roll**.
3. Select **Confirm** to generate a new API token.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/how-to/roll-token/","name":"Roll tokens"}}]}
```
