---
description: Permanently delete your Cloudflare user profile and remove all associated domains and billing information.
title: Delete your Cloudflare account
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete your Cloudflare account

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/user-profiles/delete-account/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

These steps do not apply to accounts under contract. Contact your account team for more information.

## Who can delete their account

If your account uses [Single-Sign On (SSO)](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/), your super administrator may need to delete your account on your behalf.

If your account does not use SSO, you can delete your account on your own.

## Prerequisites

Before Cloudflare can cancel your account and delete your personal information, you will need to follow the process below for each domain associated with your Cloudflare account:

* [Cancel your subscriptions or add-on services](https://developers.cloudflare.com/billing/manage/cancel-subscription/)
* [Remove your domain from Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/)
* [Remove Cloudflare nameservers at your domain registrar](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
* [Disable auto-renew for your Registrar domain(s)](https://developers.cloudflare.com/registrar/account-options/renew-domains#set-up-automatic-renewals)
* If you are using a Cloudflare [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), [update your DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) at your DNS provider to point to your website IPs or hostnames instead of Cloudflare.
* [Delete payment information](https://developers.cloudflare.com/billing/get-started/update-billing-info/#delete-a-payment-method)
* (_Optional_) [Download a copy of your invoices](https://developers.cloudflare.com/billing/manage/invoices/#download-invoice). Once deleted, the invoices will no longer be accessible and cannot be re-sent to you.

## Delete your Cloudflare account

When you sign up for Cloudflare, we create a user profile for you and an account named `youremail@example.com's account`, and your user profile is the admin for the newly create account. Your user profile is where you manage preferences like your password or language, while your account is where you'll manage Cloudflare product configurations.

Note

Your user profile can be invited to other Cloudflare accounts, so you may have access to more than one account.

When you delete your profile, the account associated with your profile and any accounts where you are the last active member will also be deleted. Deleting your account is permanent. Any accounts where you are the primary owner will also be deleted and any other users on those accounts will be removed.

After you delete your profile, you can use the email address with your profile to create a new account. In most cases, your email should be freed up to be used in a new signup right away. However, this may not be the same for users who have a lock on their account (for legal purposes).

All domains, subscriptions, and billing information on your account will be removed from Cloudflare.

1. Log in to the Cloudflare dashboard.
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Select **My Profile**.
3. Select **Delete this user**.
4. Select **Delete user**.
5. Follow the prompts to finish deleting your account.

Note

Cloudflare will purge your personal information within a year of a deletion request unless required to retain it for legal obligations (such as ongoing abuse investigations or pending litigation). Refer to the [Cloudflare Data Processing Addendum ↗](https://www.cloudflare.com/cloudflare-customer-dpa/) for further information about the deletion of personal information following the cancellation of your account.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/user-profiles/delete-account/#page","headline":"Delete your Cloudflare account · Cloudflare Fundamentals docs","description":"Permanently delete your Cloudflare user profile and remove all associated domains and billing information.","url":"https://developers.cloudflare.com/fundamentals/user-profiles/delete-account/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
