---
title: SSO integration
description: For added security and convenience, Email security (formerly Area 1) offers support for Security Assertion Markup Language based (SAML-based) single sign-on (SSO) logins. Organizations are able to choose between having users access Email security (formerly Area 1) with a username and password plus a two-factor authentication (2FA) code, or using an SSO provider, such as OneLogin or Okta.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/account-setup/sso/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# SSO integration

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

For added security and convenience, Email security (formerly Area 1) offers support for Security Assertion Markup Language based (SAML-based) single sign-on (SSO) logins. Organizations are able to choose between having users access Email security (formerly Area 1) with a username and password plus a two-factor authentication (2FA) code, or using an SSO provider, such as OneLogin or Okta.

## SAML configuration options

* **Identity Provider initiated (IDP-initiated) SAML**: IDP-initiated configurations (like Okta or OneLogin) require the IDP to be accessible to the Email security infrastructure in order to successfully authenticate users. At the most basic level, the user selects an application from their IDP. Then, the IDP communicates with Email security using a SAML assertion to provide identity information for the user requesting to login to the Email security dashboard.
* **Service Provider Initiated (SP-initiated) SAML**: SP-initiated configurations are the most common SAML authentication mechanisms. The main difference compared to IDP is that the service provider (like Email security) does not require any direct connection to the IDP in order to authenticate a user. The user's browser provides the ability for the SAML exchange to occur but the service provider and the IDP do not directly communicate with each other.

Email security (formerly Area 1) only supports IDP-initiated SAML setup at this point.

## Setup

For more details on setup, refer to the following resources:

* [ Generic SSO guide ](https://developers.cloudflare.com/email-security/account-setup/sso/generic-sso/)
* [ Okta guide ](https://developers.cloudflare.com/email-security/account-setup/sso/okta/)
* [ Azure guide ](https://developers.cloudflare.com/email-security/account-setup/sso/azure/)
* [ Cloudflare Access for SaaS ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/area-1/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/account-setup/","name":"Account setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/account-setup/sso/","name":"SSO integration"}}]}
```
