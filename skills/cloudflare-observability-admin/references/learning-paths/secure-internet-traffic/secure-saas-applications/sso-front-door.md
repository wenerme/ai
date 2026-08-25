---
description: Protect SaaS apps with Access for SaaS.
title: Single sign-on front door controls
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Single sign-on front door controls

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/sso-front-door/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Access for SaaS](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) functions as an identity proxy to add an additional authentication layer to your SaaS apps.

Access for SaaS integrates directly with your SaaS app using standard protocols (such as SAML) to become the primary enforcement point for user access. Access calls your identity provider (IdP) of choice and uses additional security signals about your users and devices to make policy decisions. Benefits of Access for SaaS include:

* A streamlined experience for users on both managed and unmanaged devices.
* Application of baseline policies requiring specific concepts such as device posture and endpoint control.
* Distinct access methodology for contractors.
* Flexibility to configure multiple SSO vendors simultaneously, freely switch between SSO vendors, and reduce reliance on a single vendor.

### SSO integrations

You can pair Access for SaaS with the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) to provide a full replacement to your organization's front door.

SCIM provisioning limitation

Access for SaaS supports SCIM passthrough in an API-only closed beta. If you require SCIM passthrough, contact your account team.

## Configure your SSO provider

If you cannot use Access for SaaS for some or all of your SaaS apps, you can accomplish most of the same outcomes through a combination of strong security controls on your managed devices and your [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) implementation. You can use your existing SSO provider to enforce a strong relationship between Cloudflare and your SaaS applications.

### Policies based on dedicated egress IPs

With [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/), you can set explicit egress locations globally and share these IPs with your SSO provider. With this Zero Trust security approach, your users must meet all of your Cloudflare requirements (such as being enrolled in the Cloudflare One Client or Browser Isolation) when they authenticate to your SSO provider. Using your dedicated egress IPs as a control mechanism within your SSO means you can set policies on the basis of which users are subject to security policy and inspection because they are guaranteed to be proxied through Cloudflare.

### Generic IdP multi-factor authentication

Similar to the dedicated egress IP option, many IdPs support a generic multi-factor authentication (MFA) method. You can use your IdP's generic MFA in conjunction with Cloudflare security policies to make your second factor a Cloudflare Access policy. This policy can check all of the security signals available in Access for SaaS. This method delivers user traffic data to Cloudflare and ensures that users cannot access SaaS applications without first being subject to granular security policy.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/sso-front-door/#page","headline":"Single sign-on front door controls · Cloudflare Learning Paths","description":"Protect SaaS apps with Access for SaaS.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/sso-front-door/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
```
