---
title: Get started
description: Enable and configure Regional Services for your hostnames via dashboard or API.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/regional-services/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

Note

Interested customers need to contact their account team to enable DNS Regionalisation.

You can use Regional Services through the dashboard or via API.

## Configure Regional Services in the dashboard

To use Regional Services, you need to first create a DNS record in the dashboard:

1. In the Cloudflare dashboard, go to the **Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Follow these steps to [create a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).
3. From the **Region** dropdown, select the region you would like to use on your domain. This value will be applied to all DNS records on the same hostname. This means that if you have two DNS records of the same hostname and change the region for one of them, both records will have the same region.

Note

Some regions may not appear on the dropdown because newly announced regions mentioned in the [blog post ↗](https://blog.cloudflare.com/expanding-regional-services-configuration-flexibility-for-customers) are subject to approval by Cloudflare's internal team. For more information and entitlement reach out to your account team.

Refer to the table on [Available regions and product support](https://developers.cloudflare.com/data-localization/region-support/) for the complete list of available regions, their definitions and product support

## Configure Regional Services via API

You can also use Regional Services via API.

Currently, only SuperAdmins and Admin roles can edit DLS configurations. Use the Zone-level **DNS: Read/Write** API permission for the `/addressing/` endpoint to read or write Regional Services configurations.

These are some examples of API requests.

List all the available regions

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Read`
* `DNS Write`

List Regions

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/regional_hostnames/regions" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Response

```

{

  "success": true,

  "errors": [],

  "result": [

    {

      "key": "ca",

      "label": "Canada"

    },

    {

      "key": "eu",

      "label": "Europe"

    }

  ],

  "messages": []

}


```

Explain Code

Create a new regional hostname entry

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Create Regional Hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "hostname": "ca.regional.ipam.rocks",

    "region_key": "ca"

  }'


```

Response

```

{

  "success": true,

  "errors": [],

  "result": {

    "hostname": "ca.regional.ipam.rocks",

    "region_key": "ca",

    "created_on": "2023-01-13T23:59:45.276558Z"

  },

  "messages": []

}


```

Explain Code

List all regional hostnames for a zone or get a specific one

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Read`
* `DNS Write`

List Regional Hostnames

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Response

```

{

  "success": true,

  "errors": [],

  "result": [

    {

      "hostname": "ca.regional.ipam.rocks",

      "region_key": "ca",

      "created_on": "2023-01-14T00:47:57.060267Z"

    }

  ],

  "messages": []

}


```

Explain Code

List all regional hostnames for a specific zone

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Read`
* `DNS Write`

Fetch Regional Hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Response

```

{

  "success": true,

  "errors": [],

  "result": {

    "hostname": "ca.regional.ipam.rocks",

    "region_key": "ca",

    "created_on": "2023-01-13T23:59:45.276558Z"

  },

  "messages": []

}


```

Explain Code

Patch the region for a specific hostname

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Update Regional Hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "region_key": "eu"

  }'


```

Response

```

{

  "success": true,

  "errors": [],

  "result": {

    "hostname": "ca.regional.ipam.rocks",

    "region_key": "eu",

    "created_on": "2023-01-13T23:59:45.276558Z"

  },

  "messages": []

}


```

Explain Code

Delete the region configuration

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Delete Regional Hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Response

```

{

  "success": true,

  "errors": [],

  "result": null,

  "messages": []

}


```

## Verify regional map for Zero Trust

To verify that your regional map is being applied correctly, check the `IngressColoName` field in your [Zero Trust Network Session logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/#ingresscoloname). This field shows the name of the Cloudflare data center where traffic ingressed. Since regionalization is applied upstream from Gateway, the ingress data center will be located within your configured regional map, confirming that traffic is being processed in the correct region.

## Terraform support

You can also configure Regional Services using Terraform. For more details, refer to the [cloudflare\_regional\_hostname resource ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/regional%5Fhostname) in the Terraform documentation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/regional-services/","name":"Regional Services"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/regional-services/get-started/","name":"Get started"}}]}
```
