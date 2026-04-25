---
title: List and view rulesets
description: Describes the API operations to list and view the details of rulesets at the account or zone level.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# List and view rulesets

Use the API operations described in the following sections to list and view the details of rulesets at the account or zone level.

* [List existing rulesets](#list-existing-rulesets)
* [View a specific ruleset](#view-a-specific-ruleset)
* [List all versions of a ruleset](#list-all-versions-of-a-ruleset)
* [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset)
* [List rules in a managed ruleset with a specific tag](#list-rules-in-a-managed-ruleset-with-a-specific-tag)

## List existing rulesets

Returns the list of existing rulesets at the account level or at the zone level.

Use one of the following API endpoints:

* [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/)  
`GET /accounts/{account_id}/rulesets`
* [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/)  
`GET /zones/{zone_id}/rulesets`

The result includes rulesets across all phases at a given level (account or zone). The `phase` field in each result element indicates the [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) where that ruleset is defined.

Also, the list of rulesets at the zone level includes the account-level rulesets you may want to deploy to the specified zone.

Note

Not all zone-level phases support all types of rulesets, even if they are presented in the list returned by this API method. Check the documentation for each Cloudflare product for more information on which ruleset types are allowed in that product's supported phases.

The result does not include the list of rules in the ruleset. Refer to [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) to learn how to obtain the list of rules.

### Example

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

      "id": "<PHASE_RULESET_ID>",

      "name": "Zone-level phase entry point",

      "description": "",

      "kind": "zone",

      "version": "5",

      "last_updated": "2025-03-18T18:30:08.122758Z",

      "phase": "http_request_firewall_managed"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## View a specific ruleset

Returns the properties of the most recent version of the ruleset with the specified ruleset ID.

Use one of the following API endpoints:

* [Get an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/get/)  
`GET /accounts/{account_id}/rulesets/{ruleset_id}`
* [Get an account entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/)  
`GET /accounts/{account_id}/rulesets/phases/{phase_name}/entrypoint`
* [Get a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/get/)  
`GET /zones/{zone_id}/rulesets/{ruleset_id}`
* [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/)  
`GET /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint`

Note

You can only use the [Get a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/get/) operation for zone-level phase entry point rulesets (entry points where `kind` is set to `zone`).

The API returns a `404 Not Found` HTTP status code under these conditions:

* When a ruleset cannot be found.
* When the specified ruleset is not a managed ruleset the calling account is entitled to execute.

### Example

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

Get a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level phase entry point",

    "description": "Executes a managed ruleset.",

    "kind": "zone",

    "version": "3",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>"

        },

        "last_updated": "2025-03-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2025-03-17T15:42:37.917815Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## List all versions of a ruleset

Returns a list of all the versions of a ruleset.

Use one of the following API endpoints:

* [List account ruleset versions](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/list/)  
`GET /accounts/{account_id}/rulesets/{ruleset_id}/versions`
* [List account entry point ruleset versions](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/subresources/versions/methods/list/)  
`GET /accounts/{account_id}/rulesets/phases/{phase_name}/entrypoint/versions`
* [List zone ruleset versions](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/list/)  
`GET /zones/{zone_id}/rulesets/{ruleset_id}/versions`
* [List zone entry point ruleset versions](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/subresources/versions/methods/list/)  
`GET /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint/versions`

The result contains the ruleset properties of each version, but it does not include the list of rules. Refer to [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) for instructions on obtaining this information.

When the specified phase entry point ruleset does not exist, this API method returns an empty array in the `result` field.

### Example

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

List a zone ruleset's versions

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/versions" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "<RULESET_ID>",

      "name": "Zone Ruleset 1",

      "description": "",

      "kind": "zone",

      "version": "1",

      "last_updated": "2023-02-17T11:15:13.128705Z",

      "phase": "http_request_firewall_managed"

    },

    {

      "id": "<RULESET_ID>",

      "name": "Zone Ruleset 1",

      "description": "",

      "kind": "zone",

      "version": "2",

      "last_updated": "2023-02-17T11:24:06.869326Z",

      "phase": "http_request_firewall_managed"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## View a specific version of a ruleset

Returns the configuration of a specific version of a ruleset, including its rules.

Use one of the following API endpoints:

* [Get an account ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/get/)  
`GET /account/{account_id}/rulesets/{ruleset_id}/versions/{version_number}`
* [Get an account entry point ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/subresources/versions/methods/get/)  
`GET /accounts/{account_id}/rulesets/phases/{phase_name}/entrypoint/versions/{version_number}`
* [Get a zone ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/get/)  
`GET /zones/{zone_id}/rulesets/{ruleset_id}/versions/{version_number}`
* [Get a zone entry point ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/subresources/versions/methods/get/)  
`GET /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint/versions/{version_number}`

When the specified phase entry point ruleset does not exist, this API method returns a `404 Not Found` HTTP status code.

### Example

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

Get a zone ruleset version

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/versions/$RULESET_VERSION" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level phase entry point",

    "description": "Executes a managed ruleset.",

    "kind": "zone",

    "version": "<RULESET_VERSION>",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>"

        },

        "last_updated": "2025-03-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2025-03-17T15:42:37.917815Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Note

When you view a specific version of a managed ruleset, each rule listed in the result can have one or more associated categories/tags, and it will not contain an expression.

## List rules in a managed ruleset with a specific tag

Returns a list of all the rules in a managed ruleset with a specific tag.

* List an account ruleset version's rules by tag  
`GET /accounts/{account_id}/rulesets/{ruleset_id}/versions/{version_number}/by_tag/{tag_name}`

### Example

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

List an account ruleset version's rules by tag

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID/versions/2/by_tag/wordpress" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "<MANAGED_RULESET_ID>",

    "name": "Cloudflare Managed Ruleset",

    "description": "Managed ruleset created by Cloudflare",

    "kind": "managed",

    "version": "2",

    "rules": [

      {

        "id": "<RULE_ID_1>",

        "version": "2",

        "action": "log",

        "categories": [

          "cve-2014-5265",

          "cve-2014-5266",

          "cve-2014-5267",

          "dos",

          "drupal",

          "wordpress"

        ],

        "description": "Drupal, WordPress - DoS - XMLRPC - CVE:CVE-2014-5265, CVE:CVE-2014-5266, CVE:CVE-2014-5267",

        "last_updated": "2025-03-19T16:54:32.942986Z",

        "ref": "<RULE_REF_1>",

        "enabled": true

      },

      {

        "id": "<RULE_ID_2>",

        "version": "2",

        "action": "block",

        "categories": ["broken-access-control", "cve-2018-12895", "wordpress"],

        "description": "WordPress - Broken Access Control - CVE:CVE-2018-12895",

        "last_updated": "2025-03-19T16:54:32.942986Z",

        "ref": "<RULE_REF_2>",

        "enabled": true

      }

      // (...)

    ],

    "last_updated": "2025-03-19T16:54:32.942986Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/view/","name":"List and view rulesets"}}]}
```
