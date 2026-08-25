---
description: Set up a Zero Trust organization.
title: Create a Zero Trust organization
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a Zero Trust organization

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/initial-setup/create-zero-trust-org/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To start using Zero Trust features, create a Zero Trust organization in your Cloudflare account.

## Sign up for Zero Trust

To create a Zero Trust organization:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select **Zero Trust**.
2. On the onboarding screen, choose a team name. The team name is a unique, internal identifier for your Zero Trust organization. Users will enter this team name when they enroll their device manually, and it will be the subdomain for your App Launcher (as relevant). Your business name is the typical entry.
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) by going to **Zero Trust** \> **Settings**.
3. Complete your onboarding by selecting a subscription plan and entering your payment details. If you chose the **Zero Trust Free plan**, this step is still needed but you will not be charged.

When you create your organization, Cloudflare automatically adds the [Cloudflare identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/) as your default login method, so your users can sign in with their Cloudflare account credentials right away. You can add a [one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) or connect a [third-party identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) at any time.

## (Optional) Manage Zero Trust in Terraform

You can use the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest) to manage your Zero Trust organization alongside your other IT infrastructure. To get started with Terraform, refer to our [Terraform tutorial series](https://developers.cloudflare.com/terraform/tutorial/).

To add Zero Trust to your Terraform configuration:

1. [Sign up for Zero Trust](#sign-up-for-zero-trust) on the Cloudflare dashboard.
2. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):

  * `Access: Organizations, Identity Providers, and Groups Write`
3. Add the [cloudflare\_zero\_trust\_organization ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Forganization) resource:
```terraform
resource "cloudflare_zero_trust_organization" "<your-team-name>" {
	account_id                         = var.cloudflare_account_id
	name                               = "Acme Corporation"
	auth_domain                        = "<your-team-name>.cloudflareaccess.com"
}
```
Replace `<your-team-name>` with the Zero Trust organization name selected during [onboarding](#sign-up-for-zero-trust). You can also view your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Settings** \> **Team name and domain**.

You can now update Zero Trust organization settings using Terraform.

Tip

If you plan to manage all Zero Trust settings in Terraform, set the dashboard to [API/Terraform read-only mode](https://developers.cloudflare.com/cloudflare-one/api-terraform/#set-dashboard-to-read-only).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/initial-setup/create-zero-trust-org/#page","headline":"Create a Zero Trust organization · Cloudflare Learning Paths","description":"Set up a Zero Trust organization.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/initial-setup/create-zero-trust-org/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
