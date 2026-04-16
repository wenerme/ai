---
title: Enhance Transform Rules
description: Forward verified JWT claims to your origin using Transform Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/security/jwt-validation/transform-rules.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Enhance Transform Rules

You can forward information from a [JSON Web Token (JWT)](https://developers.cloudflare.com/api-shield/security/jwt-validation/) to the origin in a header by creating [Transform Rules](https://developers.cloudflare.com/rules/transform/) using claims that Cloudflare has verified via the JSON Web Token.

Claims are available through the `http.request.jwt.claims` firewall fields.

For example, the following expression will extract the user claim from a token processed by the token configuration with `TOKEN_CONFIGURATION_ID`:

```

lookup_json_string(http.request.jwt.claims["<TOKEN_CONFIGURATION_ID>"][0], "claim_name")


```

Refer to [Configure JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/) for more information about creating a token configuration.

## Create a Transform Rule

As an example, to send the `x-send-jwt-claim-user` request header to the origin, you must create a Transform Rule:

1. In the Cloudflare dashboard, go to the **Rules overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Request Header Transform Rules**.
3. Enter a rule name and a filter expression, if applicable.
4. Choose **Set dynamic**.
5. Set the header name to `x-send-jwt-claim-user`.
6. Set the value to:  
```  
lookup_json_string(http.request.jwt.claims["<TOKEN_CONFIGURATION_ID>"][0], "claim_name")  
```  
`<TOKEN_CONFIGURATION_ID>` is your token configuration ID found in JWT validation and `claim_name` is the JWT claim you want to add to the header.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/security/jwt-validation/","name":"JSON Web Tokens validation"}},{"@type":"ListItem","position":5,"item":{"@id":"/api-shield/security/jwt-validation/transform-rules/","name":"Enhance Transform Rules"}}]}
```
