---
description: Temporary authentication in Access.
title: Temporary authentication
image: https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/og.png?v=75ca87e7bf53d156
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Temporary authentication

Last updated Oct 20, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

With Cloudflare Access, you can require that users obtain approval before they can access a specific self-hosted application or SaaS application. The administrator will receive an email notification to approve or deny the request. Unlike a typical Allow policy, the user will have to request access at the end of each session. This allows you to define the users who should have persistent access and those who must request temporary access.

## Set up temporary authentication

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Access controls** > **Applications**.
2. Choose a **Self-hosted** or **SaaS** application and select **Configure**.
3. Choose an **Allow** policy and select **Configure**.
4. Under **Additional settings**, turn on [**Purpose justification**](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/require-purpose-justification/).
5. Turn on **Temporary authentication**.
6. Enter the **Email addresses of the approvers**. Note

   Your approvers must be authenticated by Access. If they do not have an active session, Access will verify their identity against your [App Launcher Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/).
7. Save the policy.

Temporary authentication is now enabled for users who match this policy. You can optionally add a second **Allow** policy for users who should have persistent access. Be sure the policy order is set to allow persistent users through.

## Temporary authentication requests

When a user accesses the application, they will be prompted to enter a purpose justification and submit an access request. The request is automatically emailed to approvers. Alternatively, the user can manually present the approval link to approvers. ![Temporary authentication request page shown to users](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1207,height=1055,format=webp/_astro/temp-auth-request.WnwXx8ul.png)

Approvers will receive a request similar to the example below. The approver can then grant access for a set amount of time, up to a maximum of 24 hours.

![Temporary authentication approval page shown to administrators](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1233,height=1252,format=webp/_astro/temp-auth-approval.D0-hjStz.png)

## Review temporary authentication logs

Temporary authentication requests have separate logs from Access authentication events. The just-in-time (JIT) request logs include the requester, application, purpose justification, request status, expiration time, approval count, and approver email addresses.

To list requests across your account, send a `GET` request to the JIT request logs endpoint. You can filter the results by `status`, `search`, `since`, and `until`, and use `page` and `per_page` for pagination. Valid status values are `PENDING`, `APPROVED`, `DENIED`, and `CANCELED`.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/access/logs/jit_requests?status=APPROVED&page=1&per_page=25" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

To review one request's lifecycle, use its `knock_request_id`. The response lists events in chronological order, including request creation, approver decisions, cancellation, approval completion, and successful login.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/access/logs/jit_requests/%7Bknock_request_id%7D" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/#page","headline":"Temporary authentication","description":"Temporary authentication in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/og.png?v=75ca87e7bf53d156","dateModified":"2026-10-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
```
