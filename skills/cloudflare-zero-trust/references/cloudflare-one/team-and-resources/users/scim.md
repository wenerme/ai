---
description: How SCIM provisioning works in Zero Trust.
title: SCIM provisioning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# SCIM provisioning

Last updated Aug 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

System for Cross-domain Identity Management (SCIM) is an open standard protocol that allows identity providers to synchronize user identity information with cloud applications and services. After configuring SCIM, user identities that you create, edit, or delete in the identity provider are automatically updated across all supported applications. This makes it easier for IT admins to onboard new users, update their groups and permissions, and revoke access in the event of an employee termination or security breach.

Note

This section covers SCIM provisioning for Cloudflare Zero Trust only. To provision access to your Cloudflare account, you will need to set up a distinct [dashboard SSO SCIM integration](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/) in your IdP. You can assign users and groups to this new SCIM application to define who can access the Cloudflare dashboard.

Users provisioned via the [Zero Trust SCIM integration](#sync-users-and-groups-in-zero-trust-policies) will not have access to your Cloudflare dashboard unless you have manually added them to your [Cloudflare dashboard SSO application](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/).

## Supported identity providers

Cloudflare One supports SCIM provisioning for all SAML and OIDC identity providers that use SCIM version `2.0`.

## Sync users and groups in Zero Trust policies

Cloudflare Access can automatically deprovision users from Zero Trust after they are deactivated in the identity provider and display synchronized group names in the Access and Gateway policy builders. Cloudflare does not provision new users in Zero Trust when they are added to the identity provider -- users must first register a device with the Cloudflare One Client or authenticate to an Access application.

SCIM affects Access and Gateway policy evaluation differently.

Access evaluates a user's identity and group membership from the SAML assertion or OIDC token returned by the identity provider during authentication. SCIM provides readable group names in the Access policy builder, but Access does not use SCIM group membership to evaluate a login. If you turn on **Enable user deprovisioning**, removing a user from the SCIM application revokes their active Access sessions. You can also configure SCIM to revoke sessions after group membership changes. Access evaluates the updated identity provider data when the user authenticates again.

Gateway evaluates identity-based policies against the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/). SCIM updates this identity when users or group memberships change, without waiting for the user to authenticate again. Cloudflare One Client device profiles use the same synchronized identity.

To set up SCIM for Zero Trust, refer to our [SSO integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) guides.

## Common provider-specific issues

SCIM behavior depends on the identity provider configuration as well as Cloudflare.

Common issues include:

* **Okta**: User sync and group sync are separate. Make sure **Push Groups** is configured if you expect groups to appear in Zero Trust policies.
* **Microsoft Entra ID**: Group sync only occurs for groups included in the provisioning scope. The `userName` attribute should match the user's email address in Cloudflare One.

If users appear but groups do not, verify the IdP-side SCIM app first before troubleshooting Cloudflare policy behavior.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/#page","headline":"SCIM provisioning · Cloudflare One docs","description":"How SCIM provisioning works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SCIM"]}
```
