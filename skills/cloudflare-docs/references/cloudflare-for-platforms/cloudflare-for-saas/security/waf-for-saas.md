---
title: WAF for SaaS
description: Apply custom rules, rate limiting, and managed rulesets per custom hostname.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# WAF for SaaS

[Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/) allows you to create additional security measures through Cloudflare. As a SaaS provider, you can link custom rules, rate limiting rules, and managed rules to your custom hostnames. This provides more control to keep your domains safe from malicious traffic.

As a SaaS provider, you may want to apply different security measures to different custom hostnames. With WAF for SaaS, you can create multiple WAF configuration that you can apply to different sets of custom hostnames. This added flexibility and security leads to optimal protection across the domains of your end customers.

---

## Prerequisites

Before you can use WAF for SaaS, you need to create a custom hostname. Review [Get started with Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) if you have not already done so.

You can also create a custom hostname through the API:

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

        "wildcard": false

    }

  }'


```

## 1\. Associate custom metadata to a custom hostname

To apply WAF to your custom hostname, you need to create an association between your customer's domain and the WAF configuration that you would like to attach to it. Cloudflare's product, [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/) allows you to do this via the API.

1. [Locate your zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/), available in the Cloudflare dashboard.
2. Locate your Authentication Key on the [**API Tokens** ↗](https://dash.cloudflare.com/?to=/:account/profile/api-tokens) page, under **Global API Key**.
3. Locate your custom hostname ID by making a `GET` call in the API:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

List Custom Hostnames

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

1. Plan your [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/). It is fully customizable. In the example below, we have chosen the tag `"security_level"` to which we expect to assign three values (low, medium, and high).

Note

One instance of low, medium, and high rules could be rate limiting. You can specify three different thresholds: low - 100 requests/minute, medium - 85 requests/minute, high - 50 requests/minute, for example. Another possibility is a WAF custom rule in which low challenges requests and high blocks them.

1. Make an API call in the format below using your Cloudflare email and the IDs gathered above:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Edit Custom Hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "custom_metadata": {

        "customer_id": "12345",

        "security_level": "low"

    }

  }'


```

This assigns custom metadata to your custom hostname so that it has a security tag associated with its ID.

## 2\. Trigger security products based on tags

1. Locate the custom metadata field in the Ruleset Engine where the WAF runs. This can be used to trigger different configurations of products such as [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), and [Transform Rules](https://developers.cloudflare.com/rules/transform/).
2. Build your rules either [through the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) or via the API. An example rate limiting rule, corresponding to `"security_level"` low, is shown below as an API call.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Response Compression Write`
* `Config Settings Write`
* `Dynamic URL Redirects Write`
* `Cache Settings Write`
* `Custom Errors Write`
* `Origin Write`
* `Managed headers Write`
* `Zone Transform Rules Write`
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Write`
* `Sanitize Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Bot Management Write`
* `Zone WAF Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Write`

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_ratelimit/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "action": "block",

            "ratelimit": {

                "characteristics": [

                    "cf.colo.id",

                    "ip.src"

                ],

                "period": 10,

                "requests_per_period": 2,

                "mitigation_timeout": 60

            },

            "expression": "lookup_json_string(cf.hostname.metadata, \"security_level\") eq \"low\" and http.request.uri contains \"login\""

        }

    ]

  }'


```

Explain Code

To build rules through the dashboard:

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Follow the instructions on the dashboard specific to custom rules, rate limiting rules, or managed rules, depending on your security goal.
3. Once the rule is active, you should see it under the applicable tab (custom rules, rate limiting, or managed rules).  
Warning  
This API call will replace any existing rate limiting rules in the zone.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/","name":"WAF for SaaS"}}]}
```
