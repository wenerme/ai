---
title: Enable IDS
description: Enable the Intrusion Detection System for your account.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-network-firewall/how-to/enable-ids.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Enable IDS

Cloudflare's IDS takes advantage of the threat intelligence powered by our global network and extends the capabilities of the Cloudflare Firewall to monitor and protect your network from malicious actors.

You can enable IDS through the dashboard or via the API.

Note

This feature is available for Cloudflare Advanced Network Firewall users. For access, contact your account team.

* [ Dashboard ](#tab-panel-5517)
* [ API ](#tab-panel-5518)

1. In the Cloudflare dashboard, go to the [Firewall Policies ↗](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall) page.
2. Select **IDS** and turn on **IDS**.

To start using IDS via the API, first create a new ruleset in the `magic-transit-ids-managed` phase with a rule which is enabled.

1. Follow instructions in the [Rulesets Engine Page](https://developers.cloudflare.com/ruleset-engine/basic-operations/view-rulesets/) to view all rulesets for your account. You must see a ruleset with phase `magic-transit-ids-managed` and kind `managed`. If not, please contact your account team. The managed ruleset ID will be used in the next step.
2. Create a new root ruleset with a single rule in the `magic_transit_ids_managed` phase by running:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "name": "IDS Execute ruleset",

  "description": "Ruleset to enable IDS",

  "kind": "root",

  "phase": "magic_transit_ids_managed",

  "rules": [

    {

      "enabled": true,

      "expression": "true",

      "action": "execute",

      "description": "enable ids",

      "action_parameters": {

        "id": "${managed_ruleset_id}"

      }

    }

  ]

}'


```

Explain Code

With this ruleset added, IDS will start inspecting packets and report any anomalous traffic. Next, you can [configure Logpush](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-logpush-with-ids/) to start receiving details about the anomalous traffic.

1. Use the rule created in the previous step to enable or disable IDS. The Rulesets API documentation describes [how to patch a rule](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/).  
    
 For example, the following patch request to set the `enabled` field to `false` will disable IDS. The ruleset and rule ID from the ruleset created in the previous step are used below.

Terminal window

```

curl --request PATCH \

https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{root_ruleset_id}/rules/{rule_id} \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "enabled": false,

  "expression": "true",

  "action": "execute",

  "action_parameters": {

    "id": "${managed_ruleset_id}"

  }

}'


```

Explain Code

Similarly, sending a patch request with the `enabled` field set to `true` will enable IDS.

## IDS rules

IDS rules are run on a subset of packets. IDS also supports the current flows:

* Cloudflare WAN to Cloudflare WAN.
* Magic Transit ingress traffic (when egress traffic is handled through direct server return).
* Magic Transit ingress and egress traffic when Magic Transit has the [Egress option enabled](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/#magic-transit-with-egress-option-enabled).

## Next steps

You must configure Logpush to log detected risks. Refer to [Configure a Logpush destination](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-logpush-with-ids/) for more information. Additionally, all traffic that is analyzed can be accessed via [network analytics](https://developers.cloudflare.com/analytics/network-analytics/). Refer to [GraphQL Analytics](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/) to query the analytics data.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/how-to/enable-ids/","name":"Enable IDS"}}]}
```
