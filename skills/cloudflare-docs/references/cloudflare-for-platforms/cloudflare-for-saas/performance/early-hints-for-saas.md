---
title: Early Hints for SaaS
description: Enable Early Hints per custom hostname to preload resources and speed up page loads.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Early Hints for SaaS

[Early Hints](https://developers.cloudflare.com/cache/advanced-configuration/early-hints/) allows the browser to begin loading resources while the origin server is compiling the full response. This improves webpage’s loading speed for the end user. As a SaaS provider, you may prioritize speed for some of your custom hostnames. Using custom metadata, you can [enable Early Hints](https://developers.cloudflare.com/cache/advanced-configuration/early-hints/#enable-early-hints) per custom hostname.

---

## Prerequisites

Before you can employ Early Hints for SaaS, you need to create a custom hostname. Review [Get Started with Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) if you have not already done so.

---

## Enable Early Hints per custom hostname via the API

1. [Locate your zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/), available in the Cloudflare dashboard.
2. Locate your Authentication Key on the [**API Tokens** ↗](https://dash.cloudflare.com/?to=/:account/profile/api-tokens) page, under **Global API Key**.
3. If you are [creating a new custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/), make an API call such as the example below, specifying `"early_hints": "on"`:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Create Custom Hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "hostname": "<CUSTOM_HOSTNAME>",

    "ssl": {

        "method": "http",

        "type": "dv",

        "settings": {

            "http2": "on",

            "min_tls_version": "1.2",

            "tls_1_3": "on",

            "early_hints": "on"

        },

        "bundle_method": "ubiquitous",

        "wildcard": false

    }

  }'


```

Explain Code

1. For an existing custom hostname, locate the `id` of that hostname via a `GET` call:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

List Custom Hostnames

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames?hostname=%7Bhostname%7D" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

1. Then make an API call such as the example below, specifying `"early_hints": "on"`:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Edit Custom Hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "ssl": {

        "method": "http",

        "type": "dv",

        "settings": {

            "http2": "on",

            "min_tls_version": "1.2",

            "tls_1_3": "on",

            "early_hints": "on"

        }

    }

  }'


```

Explain Code

Currently, all options within `settings` are required in order to prevent those options from being set to default. You can pull the current settings state prior to updating Early Hints by leveraging the output that returns the `id` for the hostname.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/performance/","name":"Performance"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/performance/early-hints-for-saas/","name":"Early Hints for SaaS"}}]}
```
