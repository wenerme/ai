---
title: Enforce MFA
description: With Zero Trust policies, you can require that users log in to certain applications with specific types of multifactor authentication (MFA) methods. For example, you can create rules that only allow users to reach a given application if they authenticate with a physical hard key.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/policies/mfa-requirements.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Enforce MFA

With Zero Trust policies, you can require that users log in to certain applications with specific types of multifactor authentication (MFA) methods. For example, you can create rules that only allow users to reach a given application if they authenticate with a physical hard key.

This feature is only available if you are using the following identity providers:

* Okta
* Microsoft Entra ID (formerly Azure AD)
* OpenID Connect (OIDC)
* SAML

To enforce an MFA requirement to an application:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Access controls** \> **Applications**.
2. Find the application for which you want to enforce MFA and select **Configure**. Alternatively, [create a new application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/).
3. Go to **Policies**.
4. If your application already has a policy containing an identity requirement, find it and select **Configure**.  
Note  
The policy should contain an Include rule that uses identity-based selectors. For example, the Include rule could allow users who are part of a [rule group](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/), email domain, or identity provider group.
5. Add the following rule to the policy:  
| Rule type | Selector              | Value                                |  
| --------- | --------------------- | ------------------------------------ |  
| Require   | Authentication method | mfa - multiple-factor authentication |
6. Save the policy.

Important

**What happens if the user fails to present the required MFA method?**

Cloudflare Access will reject the user, even if they successfully login to the identity provider with an alternative method.

## Adding authentication methods into the JWT

When users authenticate with their identity provider, the identity provider then shares their username with Cloudflare Access. Cloudflare Access then writes that value into the JSON Web Token (JWT) generated for the user.

Certain identity providers can also share the multifactor authentication (MFA) method presented by the user to login. Cloudflare Access can add these values into the JWT and force. For example, if the user authenticated with their password and a physical hard key, the identity provider can send a confirmation to Cloudflare Access.

Cloudflare Access then stores that method into the same JWT issued to the user.

Cloudflare Access follows [RFC 8176 ↗](https://tools.ietf.org/html/rfc8176), Authentication Method Reference Values, to define authentication methods.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/mfa-requirements/","name":"Enforce MFA"}}]}
```
