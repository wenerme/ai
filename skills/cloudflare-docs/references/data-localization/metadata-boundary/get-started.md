---
title: Get started
description: Configure Customer Metadata Boundary to select the region for your logs and analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/metadata-boundary/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Get started

You can configure the Metadata Boundary to select the region where your logs and analytics are stored via API or dashboard.

Currently, this can only be applied at the account-level. If you only want the Metadata Boundary to be applied on a portion of zones beneath the same account, you will have to [move the rest of zones to a new account](https://developers.cloudflare.com/fundamentals/manage-domains/move-domain/).

## Configure Customer Metadata Boundary in the dashboard

To configure Customer Metadata Boundary in the dashboard:

1. In the Cloudflare dashboard, go to the **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. In **Customer Metadata Boundary**, select the region you want to use. You have the option to select `EU` or `US`. If you want to select both regions, select `Global` instead.

## Configure Customer Metadata Boundary via API

You can also configure Customer Metadata Boundary via API.

Currently, only SuperAdmins and Admin roles can edit DLS configurations. Use the **Account-level Logs:Read/Write** API permissions for the `/logs/control/cmb` endpoint to read/write Customer Metadata Boundary configurations.

These are some examples of API requests.

Get current regions

Here is an example request using cURL to get current regions (if any):

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`
* `Logs Read`

Get CMB config

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Setting regions

Here is an example request using cURL to set regions:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Update CMB config

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "regions": "eu",

    "allow_out_of_region_access": false

  }'


```

This will overwrite any previous regions. Change will be in effect after several minutes.

Delete regions

Here is an example request using cURL to delete regions:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Delete CMB config

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## View or change settings

To view or change your Customer Metadata Boundary setting:

1. In the Cloudflare dashboard, go to the **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **Preferences**.
3. Locate the **Customer Metadata Boundary** section.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/metadata-boundary/","name":"Customer Metadata Boundary"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/metadata-boundary/get-started/","name":"Get started"}}]}
```
