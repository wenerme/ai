---
title: Deploy a managed ruleset
description: Deploy a managed ruleset to a phase entry point using the API.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/managed-rulesets/deploy-managed-ruleset.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Deploy a managed ruleset

You can deploy a managed ruleset at the zone level or at the account level. To deploy a managed ruleset to a phase, use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/).

If you are using Terraform, refer to [WAF Managed Rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/) for more information.

If you are using the Cloudflare dashboard, refer to the following pages:

* [Deploy a WAF managed ruleset in the dashboard (zone)](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/)
* [Deploy a WAF managed ruleset in the dashboard (account)](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/)

## Deploy a managed ruleset to a phase at the zone level

Use the following workflow to deploy a managed ruleset to a phase at the zone level.

1. Get your [zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
2. Invoke the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation to obtain the available managed rulesets. Managed rulesets exist at the account level, but you can deploy them to a zone. Find the ruleset ID of the managed ruleset you want to deploy.
3. Identify the [phase](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) where you want to deploy the managed ruleset. Ensure that the managed ruleset belongs to the same phase where you want to deploy it.
4. Add a rule to the zone-level phase [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) that executes the managed ruleset. Refer to the following example for details on this step.

### Example

The following example deploys the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) to the `http_request_firewall_managed` phase of a given zone (`$ZONE_ID`) by creating a rule that executes the managed ruleset.

1. Invoke the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the definition of the entry point ruleset for the `http_request_firewall_managed` phase. You will need the [zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for this task.  
Get a zone entry point ruleset  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "result": {  
    "description": "Zone-level phase entry point",  
    "id": "<RULESET_ID>",  
    "kind": "zone",  
    "last_updated": "2024-03-16T15:40:08.202335Z",  
    "name": "zone",  
    "phase": "http_request_firewall_managed",  
    "rules": [  
      // ...  
    ],  
    "source": "firewall_managed",  
    "version": "10"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```  
Explain Code
2. If the entry point ruleset already exists (that is, if you received a `200 OK` status code and the ruleset definition), take note of the ruleset ID in the response. Then, invoke the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add an `execute` rule to the existing ruleset deploying the Cloudflare Managed Ruleset (with ID `efb7b8c949ac4650a09736fc376e9aee`). By default, the rule will be added at the end of the list of rules already in the ruleset.  
Create a zone ruleset rule  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "action": "execute",  
    "action_parameters": {  
        "id": "efb7b8c949ac4650a09736fc376e9aee"  
    },  
    "expression": "true",  
    "description": "Execute the Cloudflare Managed Ruleset"  
  }'  
```  
Explain Code  
```  
{  
  "result": {  
    "id": "<RULESET_ID>",  
    "name": "Zone-level phase entry point",  
    "description": "",  
    "kind": "zone",  
    "version": "11",  
    "rules": [  
      // ... any existing rules  
      {  
        "id": "<RULE_ID>",  
        "version": "1",  
        "action": "execute",  
        "action_parameters": {  
          "id": "efb7b8c949ac4650a09736fc376e9aee",  
          "version": "latest"  
        },  
        "expression": "true",  
        "description": "Execute the Cloudflare Managed Ruleset",  
        "last_updated": "2024-03-18T18:08:14.003361Z",  
        "ref": "<RULE_REF>",  
        "enabled": true  
      }  
    ],  
    "last_updated": "2024-03-18T18:08:14.003361Z",  
    "phase": "http_request_firewall_managed"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```  
Explain Code
3. If the entry point ruleset does not exist (that is, if you received a `404 Not Found` status code in step 1), create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. Include a single rule in the `rules` array that executes the Cloudflare Managed Ruleset (with ID `efb7b8c949ac4650a09736fc376e9aee`) for all incoming requests in the zone.  
Create a zone ruleset  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "My ruleset",  
    "description": "Entry point ruleset for WAF managed rulesets",  
    "kind": "zone",  
    "phase": "http_request_firewall_managed",  
    "rules": [  
        {  
            "action": "execute",  
            "action_parameters": {  
                "id": "efb7b8c949ac4650a09736fc376e9aee"  
            },  
            "expression": "true",  
            "description": "Execute the Cloudflare Managed Ruleset"  
        }  
    ]  
  }'  
```  
Explain Code

In this example, the managed ruleset executes the behavior configured by Cloudflare. To customize the behavior of managed rulesets, refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

## Deploy a managed ruleset to a phase at the account level

Use the following workflow to deploy a managed ruleset to a phase at the account level.

1. Get your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
2. Invoke the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation to obtain the available managed rulesets. Find the ruleset ID of the managed ruleset you want to deploy.
3. Identify the [phase](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) where you want to deploy the managed ruleset. Ensure that the managed ruleset belongs to the same phase where you want to deploy it.
4. Add a rule to the account-level phase [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) that executes the managed ruleset. Use parentheses to enclose any custom conditions in the rule expression and end your expression with `and cf.zone.plan eq "ENT"` so that it only applies to zones on an Enterprise plan. Refer to the following example for details on this step.

### Example

The following example deploys the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) to the `http_request_firewall_managed` phase of a given account (`$ACCOUNT_ID`) by creating a rule that executes the managed ruleset. The rules in the managed ruleset are executed when the zone name matches one of `example.com` or `anotherexample.com`.

1. Invoke the [Get an account entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the definition of the entry point ruleset for the `http_request_firewall_managed` phase. You will need the [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for this task.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account WAF Write`  
   * `Account WAF Read`  
   * `Account Rulesets Read`  
   * `Account Rulesets Write`  
Get an account entry point ruleset  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "result": {  
    "description": "Account-level phase entry point",  
    "id": "<RULESET_ID>",  
    "kind": "root",  
    "last_updated": "2024-03-16T15:40:08.202335Z",  
    "name": "root",  
    "phase": "http_request_firewall_managed",  
    "rules": [  
      // ...  
    ],  
    "source": "firewall_managed",  
    "version": "10"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```  
Explain Code
2. If the entry point ruleset already exists (that is, if you received a `200 OK` status code and the ruleset definition), take note of the ruleset ID in the response. Then, invoke the [Create an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add an `execute` rule to the existing ruleset deploying the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) (with ID `efb7b8c949ac4650a09736fc376e9aee`). By default, the rule will be added at the end of the list of rules already in the ruleset.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account WAF Write`  
   * `Account Rulesets Write`  
Create an account ruleset rule  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "action": "execute",  
    "action_parameters": {  
        "id": "efb7b8c949ac4650a09736fc376e9aee"  
    },  
    "expression": "(cf.zone.name in {\"example.com\" \"anotherexample.com\"}) and cf.zone.plan eq \"ENT\"",  
    "description": "Execute the Cloudflare Managed Ruleset"  
  }'  
```  
Explain Code  
```  
{  
  "result": {  
    "id": "<RULESET_ID>",  
    "name": "Account-level phase entry point",  
    "description": "",  
    "kind": "root",  
    "version": "11",  
    "rules": [  
      // ... any existing rules  
      {  
        "id": "<RULE_ID>",  
        "version": "1",  
        "action": "execute",  
        "action_parameters": {  
          "id": "efb7b8c949ac4650a09736fc376e9aee",  
          "version": "latest"  
        },  
        "expression": "(cf.zone.name in {\"example.com\" \"anotherexample.com\"}) and cf.zone.plan eq \"ENT\"",  
        "description": "Execute the Cloudflare Managed Ruleset",  
        "last_updated": "2024-03-18T18:30:08.122758Z",  
        "ref": "<RULE_REF>",  
        "enabled": true  
      }  
    ],  
    "last_updated": "2024-03-18T18:30:08.122758Z",  
    "phase": "http_request_firewall_managed"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```  
Explain Code  
Warning  
Managed rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"` or else the API operation will fail.
3. If the entry point ruleset does not exist (that is, if you received a `404 Not Found` status code in step 1), create it using the [Create an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. Include a single rule in the `rules` array that executes the Cloudflare Managed Ruleset (with ID `efb7b8c949ac4650a09736fc376e9aee`) for all incoming requests where the zone name matches one of `example.com` or `anotherexample.com`.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account WAF Write`  
   * `Account Rulesets Write`  
Create an account ruleset  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "My ruleset",  
    "description": "Entry point ruleset for WAF managed rulesets",  
    "kind": "root",  
    "phase": "http_request_firewall_managed",  
    "rules": [  
        {  
            "action": "execute",  
            "action_parameters": {  
                "id": "efb7b8c949ac4650a09736fc376e9aee"  
            },  
            "expression": "(cf.zone.name in {\"example.com\" \"anotherexample.com\"}) and cf.zone.plan eq \"ENT\"",  
            "description": "Execute the Cloudflare Managed Ruleset"  
        }  
    ]  
  }'  
```  
Explain Code

In this example, the managed ruleset executes the behavior configured by Cloudflare. To learn how to customize the behavior of managed rulesets, refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/managed-rulesets/","name":"Work with managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/managed-rulesets/deploy-managed-ruleset/","name":"Deploy a managed ruleset"}}]}
```
