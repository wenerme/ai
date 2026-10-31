---
description: Inspect users, groups, and resource details provisioned through an identity provider in Cloudflare One.
title: View SCIM users and groups
image: https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim-population-viewer/og.png?v=f7ccff3b4663ad0c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# View SCIM users and groups

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim-population-viewer/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The SCIM population viewer shows users and groups provisioned through an identity provider (IdP). Use it to check which resources Cloudflare has received, inspect their attributes, and investigate provisioning issues.

Each view belongs to one identity provider. Its resource counts describe that provider's SCIM population, not your account's active users or occupied seats. For user activity and identity history, refer to the [User Registry](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/).

## Prerequisites

- [Configure SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/) for your identity provider.
- Use an account role with permission to read the identity provider's SCIM population. Deleting resources requires permission to edit the identity provider.

## Open the population viewer

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Zero Trust** > **Integrations** > **Identity providers**.
2. Find an identity provider with SCIM turned on.
3. In **SCIM resources**, select the user or group count.
4. Select **Users** or **Groups** to switch resource types.

![SCIM users table with search controls and blurred personal information](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1132,height=960,format=webp/_astro/scim-population-viewer.CFxa6Ccp.png)

The **Users** table shows each user's name, username, email, and active state when those attributes are available. The active state reflects the SCIM `active` attribute. It does not indicate recent user activity or whether the latest provisioning request succeeded.

The **Groups** table shows group names and IdP resource IDs.

## Search for a resource

1. Select **Users** or **Groups**.
2. Choose a search field and enter a search value.
3. Select **Search**. To remove the search, select **Clear**.

| Resource type | Search fields |
| --- | --- |
| Users | Username contains, Username, Email, Name, Cloudflare resource ID, IdP resource ID |
| Groups | Name contains, Name, Cloudflare resource ID, IdP resource ID |

Use **Cloudflare resource ID** to match a resource with a [SCIM provisioning log](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/) entry. Use **IdP resource ID** to match it with the corresponding record in your identity provider.

## Inspect resource details

For a user or group, select **View details**. Switch between **Formatted** and **JSON** to inspect the stored resource.

Details include resource IDs, profile attributes, membership, and metadata when present. The SCIM `id` is the Cloudflare resource ID. The `externalId` is the IdP resource ID. Metadata timestamps describe when a resource was created or modified. They do not report whether the latest provisioning request succeeded.

For a group with members, select **View all group members** to inspect its member list.

## Delete a resource

Deleting a resource removes it from the identity provider's SCIM population in Cloudflare. It does not delete the upstream user or group in your IdP. Make permanent provisioning changes in your identity provider.

Caution

Do not use population cleanup as a substitute for revoking access. To remove a user's access, follow your [SCIM deprovisioning configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/#sync-users-and-groups-in-zero-trust-policies).

1. Find the user or group you want to remove.
2. Open its context menu and select **Delete**.
3. Check the resource name in the confirmation dialog, then select **Delete**.

## Query the population through the API

Use the Cloudflare API to retrieve resources for an identity provider. Create an API token with **Access: Organizations, Identity Providers, and Groups Read** permission for the target account. Use this Cloudflare API token, not the SCIM bearer token configured in your IdP.

To list users:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/access/identity_providers/%7Bidentity_provider_id%7D/scim/users?page=1&per_page=25" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

To list groups:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/access/identity_providers/%7Bidentity_provider_id%7D/scim/groups?page=1&per_page=25" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Responses contain a `result` array and `result_info` pagination metadata. Increase `page` to retrieve subsequent pages. Both endpoints support up to 100 resources per page.

For filters, individual resource lookups, and deletion endpoints, refer to the [SCIM API reference](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/scim/).

## Troubleshoot missing resources

- **Resource counts differ from your IdP:** Check which users and groups the IdP assigns to the SCIM application. The viewer shows resources provisioned to this integration, not the entire IdP directory.
- **Users appear, but groups do not:** Check the IdP's group provisioning settings. Okta requires **Push Groups**. Microsoft Entra ID provisions groups within the configured provisioning scope.
- **A count shows Users unavailable or Groups unavailable:** Cloudflare could not retrieve that resource count. This is not a zero-resource result. Open the viewer and check for an error.
- **A resource is missing or has unexpected attributes:** Compare [SCIM provisioning logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/) with your IdP's provisioning logs. Match records by resource ID to investigate failed requests or attribute differences.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim-population-viewer/#page","headline":"View SCIM users and groups","description":"Inspect users, groups, and resource details provisioned through an identity provider in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim-population-viewer/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim-population-viewer/og.png?v=f7ccff3b4663ad0c","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SCIM"]}
```
