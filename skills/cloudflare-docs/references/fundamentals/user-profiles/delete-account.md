---
title: Delete your Cloudflare account
description: If your account uses Single-Sign On (SSO), your super administrator may need to delete your account on your behalf.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/user-profiles/delete-account.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Delete your Cloudflare account

Note

These steps do not apply to accounts under contract. Contact your account team for more information.

## Who can delete their account

If your account uses [Single-Sign On (SSO)](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/), your super administrator may need to delete your account on your behalf.

If your account does not use SSO, you can delete your account on your own.

## Prerequisites

Before Cloudflare can cancel your account and delete your personal information, you will need to follow the process below for each domain associated with your Cloudflare account:

* [Cancel your subscriptions or add-on services](https://developers.cloudflare.com/billing/cancel-subscription/)
* [Remove your domain from Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/)
* [Remove Cloudflare nameservers at your domain registrar](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
* [Disable auto-renew for your Registrar domain(s)](https://developers.cloudflare.com/registrar/account-options/renew-domains#set-up-automatic-renewals)
* If you are using a Cloudflare [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), [update your DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) at your DNS provider to point to your website IPs or hostnames instead of Cloudflare.
* [Delete payment information](https://developers.cloudflare.com/billing/update-billing-info/#delete-a-payment-method)
* (_Optional_) [Download a copy of your invoices](https://developers.cloudflare.com/billing/invoices/#download-invoice). Once deleted, the invoices will no longer be accessible and cannot be re-sent to you.

## Delete your Cloudflare account

When you sign up for Cloudflare, we create a user profile for you and an account named `youremail@example.com's account`, and your user profile is the admin for the newly create account. Your user profile is where you manage preferences like your password or language, while your account is where you'll manage Cloudflare product configurations.

Note

Your user profile can be invited to other Cloudflare accounts, so you may have access to more than one account.

When you delete your profile, the account associated with your profile and any accounts where you are the last active member will also be deleted. Deleting your account is permanent. Any accounts where you are the primary owner will also be deleted and any other users on those accounts will be removed.

After you delete your profile, you can use the email address with your profile to create a new account. In most cases, your email should be freed up to be used in a new signup right away. However, this may not be the same for users who have a lock on their account (for legal purposes).

All domains, subscriptions, and billing information on your account will be removed from Cloudflare.

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select **My Profile**.
3. Select **Delete this user**.
4. Select **Delete user**.
5. Follow the prompts to finish deleting your account.

Note

Cloudflare will purge your personal information within a year of a deletion request unless required to retain it for legal obligations (such as ongoing abuse investigations or pending litigation). Refer to the [Cloudflare Data Processing Addendum ↗](https://www.cloudflare.com/cloudflare-customer-dpa/) for further information about the deletion of personal information following the cancellation of your account.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/user-profiles/","name":"User profiles"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/user-profiles/delete-account/","name":"Delete your Cloudflare account"}}]}
```
