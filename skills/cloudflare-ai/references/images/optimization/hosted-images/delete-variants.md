---
description: Remove image variants from Cloudflare Images using the dashboard or API.
title: Delete variants
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete variants

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/optimization/hosted-images/delete-variants/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can delete variants via the Images dashboard or API. The only variant you cannot delete is public.

Caution

Deleting a variant is a global action that will affect other images that contain that variant.

## Delete variants via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Hosted Images** page.
[Go to **Hosted images** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select the **Delivery** tab.
3. Find the variant you want to remove and select **Delete**.

## Delete variants via the API

Make a `DELETE` request to the delete variant endpoint.

```bash
curl --request DELETE https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/variants/{variant_name} \
--header "Authorization: Bearer <API_TOKEN>"
```

After the variant has been deleted, the response returns `"success": true.`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/hosted-images/delete-variants/#page","headline":"Delete variants · Cloudflare Images docs","description":"Remove image variants from Cloudflare Images using the dashboard or API.","url":"https://developers.cloudflare.com/images/optimization/hosted-images/delete-variants/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
