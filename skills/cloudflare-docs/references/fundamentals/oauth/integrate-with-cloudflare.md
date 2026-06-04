---
title: Integrate your OAuth client with Cloudflare
description: After registering an application, use these endpoints to integrate your OAuth client with Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Integrate your OAuth client with Cloudflare

After [registering an application](https://developers.cloudflare.com/fundamentals/oauth/create-an-oauth-client/), use these endpoints to integrate your OAuth client with Cloudflare.

* Jwks: `https://dash.cloudflare.com/.well-known/jwks.json`
* Open ID config: `https://dash.cloudflare.com/.well-known/openid-configuration`
* Authorization: `https://dash.cloudflare.com/oauth2/auth`
* Token: `https://dash.cloudflare.com/oauth2/token`
* Revoke: `https://dash.cloudflare.com/oauth2/revoke`
* Session logout: `https://dash.cloudflare.com/oauth2/logout`
* User info: `https://dash.cloudflare.com/oauth2/userinfo`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/oauth/","name":"OAuth Applications on Cloudflare"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/oauth/integrate-with-cloudflare/","name":"Integrate your OAuth client with Cloudflare"}}]}
```
