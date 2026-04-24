---
title: View rulesets
description: View existing rulesets and their rules using the API.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/basic-operations/view-rulesets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# View rulesets

This page includes examples of the following API operations:

* [View available rulesets](#view-available-rulesets)
* [Get an entry point ruleset](#get-an-entry-point-ruleset)
* [View the rules included in a ruleset](#view-the-rules-included-in-a-ruleset)

## View available rulesets

You can list the available rulesets for a zone or account.

For a list of API endpoints refer to [List and view rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/).

### Example: View available rulesets at the zone level

The response to the [GET request](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) obtaining the list of rulesets at the zone level will include the following rulesets:

* Managed rulesets you can deploy, indicated by `"kind": "managed"`.
* Zone-level phase entry point rulesets, if configured, indicated by `"kind": "zone"`.
* Custom rulesets, if configured, indicated by `"kind": "custom"`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Response Compression Write`
* `Response Compression Read`
* `Config Settings Write`
* `Config Settings Read`
* `Dynamic URL Redirects Write`
* `Dynamic URL Redirects Read`
* `Cache Settings Write`
* `Cache Settings Read`
* `Custom Errors Write`
* `Custom Errors Read`
* `Origin Write`
* `Origin Read`
* `Managed headers Write`
* `Managed headers Read`
* `Zone Transform Rules Write`
* `Zone Transform Rules Read`
* `Mass URL Redirects Write`
* `Mass URL Redirects Read`
* `Magic Firewall Write`
* `Magic Firewall Read`
* `L4 DDoS Managed Ruleset Write`
* `L4 DDoS Managed Ruleset Read`
* `HTTP DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Read`
* `Sanitize Write`
* `Sanitize Read`
* `Transform Rules Write`
* `Transform Rules Read`
* `Select Configuration Write`
* `Select Configuration Read`
* `Bot Management Write`
* `Bot Management Read`
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`
* `Account Rulesets Read`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Read`
* `Logs Write`
* `Logs Read`

List zone rulesets

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "<ZONE_PHASE_RULESET_ID>",

      "name": "Zone-level Ruleset 1",

      "description": "Ruleset for http_request_firewall_managed phase at the zone level",

      "kind": "zone",

      "version": "2",

      "last_updated": "2021-03-12T14:11:59.754817Z",

      "phase": "http_request_firewall_managed"

    },

18 collapsed lines

    {

      "id": "<CLOUDFLARE_MANAGED_RULESET_ID>",

      "name": "Cloudflare Managed Ruleset",

      "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives",

      "kind": "managed",

      "version": "2",

      "last_updated": "2021-03-18T14:42:40.972022Z",

      "phase": "http_request_firewall_managed"

    },

    {

      "id": "<CLOUDFLARE_OWASP_CORE_RULESET_ID>",

      "name": "Cloudflare OWASP Core Ruleset",

      "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",

      "kind": "managed",

      "version": "3",

      "last_updated": "2021-03-18T14:42:42.993211Z",

      "phase": "http_request_firewall_managed"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

### Example: View available rulesets at the account level

The response to the [GET request](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) obtaining the list of rulesets at the account level will include the following rulesets:

* Managed rulesets you can deploy, indicated by `"kind": "managed"`.
* Account-level phase entry point rulesets, if configured, indicated by `"kind": "root"`.
* Custom rulesets, if configured, indicated by `"kind": "custom"`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Mass URL Redirects Write`
* `Mass URL Redirects Read`
* `Magic Firewall Write`
* `Magic Firewall Read`
* `L4 DDoS Managed Ruleset Write`
* `L4 DDoS Managed Ruleset Read`
* `Transform Rules Write`
* `Transform Rules Read`
* `Select Configuration Write`
* `Select Configuration Read`
* `Account WAF Write`
* `Account WAF Read`
* `Account Rulesets Read`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Read`

List account rulesets

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "<CUSTOM_RULESET_ID>",

      "name": "Custom Ruleset 1",

      "description": "My custom ruleset",

      "kind": "custom",

      "version": "10",

      "last_updated": "2020-11-23T11:36:24.192361Z",

      "phase": "http_request_firewall_custom"

    },

27 collapsed lines

    {

      "id": "<ACCOUNT_PHASE_RULESET_ID>",

      "name": "Account-level ruleset for http_request_firewall_managed phase",

      "description": "Account-level ruleset for executing one or more Managed Rulesets",

      "kind": "root",

      "version": "2",

      "last_updated": "2021-03-12T14:06:41.323932Z",

      "phase": "http_request_firewall_managed"

    },

    {

      "id": "<CLOUDFLARE_MANAGED_RULESET_ID>",

      "name": "Cloudflare Managed Ruleset",

      "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives",

      "kind": "managed",

      "version": "5",

      "last_updated": "2021-03-18T14:42:40.972022Z",

      "phase": "http_request_firewall_managed"

    },

    {

      "id": "<CLOUDFLARE_OWASP_CORE_RULESET_ID>",

      "name": "Cloudflare OWASP Core Ruleset",

      "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",

      "kind": "managed",

      "version": "3",

      "last_updated": "2021-03-18T14:42:42.993211Z",

      "phase": "http_request_firewall_managed"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Get an entry point ruleset

You can get the definition of the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) of a given [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) at the zone or account level.

If the entry point ruleset exists, the API will return a `200 OK` HTTP status code, along with the ruleset definition.

If the entry point ruleset does not exist, the API will return a `404 Not Found` HTTP status code.

### Example: Get an entry point ruleset at the zone level

The following [GET request](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) obtains the definition of the entry point ruleset for the `http_request_firewall_managed` phase at the zone level. In this case, the entry point ruleset exists and contains one rule.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Response Compression Write`
* `Response Compression Read`
* `Config Settings Write`
* `Config Settings Read`
* `Dynamic URL Redirects Write`
* `Dynamic URL Redirects Read`
* `Cache Settings Write`
* `Cache Settings Read`
* `Custom Errors Write`
* `Custom Errors Read`
* `Origin Write`
* `Origin Read`
* `Managed headers Write`
* `Managed headers Read`
* `Zone Transform Rules Write`
* `Zone Transform Rules Read`
* `Mass URL Redirects Write`
* `Mass URL Redirects Read`
* `Magic Firewall Write`
* `Magic Firewall Read`
* `L4 DDoS Managed Ruleset Write`
* `L4 DDoS Managed Ruleset Read`
* `HTTP DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Read`
* `Sanitize Write`
* `Sanitize Read`
* `Transform Rules Write`
* `Transform Rules Read`
* `Select Configuration Write`
* `Select Configuration Read`
* `Bot Management Write`
* `Bot Management Read`
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`
* `Account Rulesets Read`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Read`
* `Logs Write`
* `Logs Read`

Get a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level phase entry point ruleset",

    "description": "This ruleset executes a managed ruleset.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "id": "<RULE_ID>",

7 collapsed lines

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>"

        },

        "last_updated": "2021-03-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2021-03-17T15:42:37.917815Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

### Example: Get an entry point ruleset at the account level

The following [GET request](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) obtains the definition of the entry point ruleset for the `http_request_firewall_managed` phase at the account level.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Mass URL Redirects Write`
* `Mass URL Redirects Read`
* `Magic Firewall Write`
* `Magic Firewall Read`
* `L4 DDoS Managed Ruleset Write`
* `L4 DDoS Managed Ruleset Read`
* `Transform Rules Write`
* `Transform Rules Read`
* `Select Configuration Write`
* `Select Configuration Read`
* `Account WAF Write`
* `Account WAF Read`
* `Account Rulesets Read`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Read`

Get an account entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## View the rules included in a ruleset

You can view all versions of phase entry point rulesets (at the account and zone levels) and custom rulesets, but you can only view the most recent version of managed rulesets.

### Example: View rules in a phase entry point ruleset at the zone level

The following [GET request](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/subresources/versions/methods/get/) lists the rules in version `2` of the `http_request_firewall_managed` phase entry point ruleset at the zone level.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Response Compression Write`
* `Response Compression Read`
* `Config Settings Write`
* `Config Settings Read`
* `Dynamic URL Redirects Write`
* `Dynamic URL Redirects Read`
* `Cache Settings Write`
* `Cache Settings Read`
* `Custom Errors Write`
* `Custom Errors Read`
* `Origin Write`
* `Origin Read`
* `Managed headers Write`
* `Managed headers Read`
* `Zone Transform Rules Write`
* `Zone Transform Rules Read`
* `Mass URL Redirects Write`
* `Mass URL Redirects Read`
* `Magic Firewall Write`
* `Magic Firewall Read`
* `L4 DDoS Managed Ruleset Write`
* `L4 DDoS Managed Ruleset Read`
* `HTTP DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Read`
* `Sanitize Write`
* `Sanitize Read`
* `Transform Rules Write`
* `Transform Rules Read`
* `Select Configuration Write`
* `Select Configuration Read`
* `Bot Management Write`
* `Bot Management Read`
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`
* `Account Rulesets Read`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Read`
* `Logs Write`
* `Logs Read`

Get a zone entry point ruleset version

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint/versions/2" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level phase entry point ruleset",

    "description": "This ruleset executes a managed ruleset.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>"

        },

        "last_updated": "2021-03-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2021-03-17T15:42:37.917815Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

### Example: View rules in a managed ruleset

The following [GET request](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/get/) lists the rules in version `2` of a managed ruleset (the most recent version of that ruleset).

Each rule in a managed ruleset can have associated tags or categories, listed in the `categories` field.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Mass URL Redirects Write`
* `Mass URL Redirects Read`
* `Magic Firewall Write`
* `Magic Firewall Read`
* `L4 DDoS Managed Ruleset Write`
* `L4 DDoS Managed Ruleset Read`
* `Transform Rules Write`
* `Transform Rules Read`
* `Select Configuration Write`
* `Select Configuration Read`
* `Account WAF Write`
* `Account WAF Read`
* `Account Rulesets Read`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Read`

Get an account ruleset version

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$MANAGED_RULESET_ID/versions/2" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "<MANAGED_RULESET_ID>",

    "name": "Cloudflare Managed Ruleset",

    "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives",

    "kind": "managed",

    "version": "2",

    "rules": [

      {

        "id": "<RULE_1_ID>",

        "version": "1",

        "action": "log",

        "categories": [

          "cve-2014-5265",

          "cve-2014-5266",

          "cve-2014-5267",

          "dos",

          "drupal",

          "wordpress"

        ],

        "description": "Drupal, Wordpress - DoS - XMLRPC - CVE:CVE-2014-5265, CVE:CVE-2014-5266, CVE:CVE-2014-5267",

        "last_updated": "2021-03-18T14:42:40.972022Z",

        "ref": "<RULE_1_REF>",

        "enabled": true

      },

11 collapsed lines

      {

        "id": "<RULE_2_ID>",

        "version": "1",

        "action": "block",

        "categories": ["broken-access-control", "cve-2018-12895", "wordpress"],

        "description": "Wordpress - Broken Access Control - CVE:CVE-2018-12895",

        "last_updated": "2021-03-18T14:42:40.972022Z",

        "ref": "<RULE_2_REF>",

        "enabled": true

      }

      // (...)

    ],

    "last_updated": "2021-03-18T14:42:40.972022Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Related resources

For more information on the available API methods for viewing rulesets, refer to [List and view rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/basic-operations/","name":"Basic API operations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/basic-operations/view-rulesets/","name":"View rulesets"}}]}
```
