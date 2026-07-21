---
description: Restore Super Administrator access and resolve common SCIM provisioning issues on your Cloudflare account.
title: SCIM troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

#  SCIM troubleshooting

Last updated Jul 14, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/troubleshooting/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Restore Super Administrator after group misconfiguration

If you have removed all Super Administrators mistakenly, you can restore the role to account member(s) using the Account API Token you created for SCIM provisioning.

First, fetch a list of account members and find the member ID for the user you want to restore Super Admin to via [list members](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/list/).

```curl
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/members" \
  -H "Authorization: Bearer YOUR_SCIM_AOT" \
  -H "Content-Type: application/json"
```

Then restore the Super Admin role to that member via [update member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/update/)

```curl
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/members/{member_id}" \
  -H "Authorization: Bearer YOUR_SCIM_AOT" \
  -H "Content-Type: application/json" \
  -d '{
    "roles": [
      {
        "id": "33666b9c79b9a5273fc7344ff42f953d"
      }
    ]
  }'
```

The value `33666b9c79b9a5273fc7344ff42f953d` is the role ID of Super Administrator.

## Update email domains after onboarding

We currently **do not** support updating email domains for users. This means that any SCIM `PATCH`/`PUT` operations that change email domains will be rejected. We recommend not using the email as the matching attribute if email domains are expected to change, and restarting provisioning manually.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/troubleshooting/#page","headline":"SCIM troubleshooting · Cloudflare Fundamentals docs","description":"Restore Super Administrator access and resolve common SCIM provisioning issues on your Cloudflare account.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-14","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
