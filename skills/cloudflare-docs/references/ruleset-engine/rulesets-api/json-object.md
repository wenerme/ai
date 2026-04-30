---
title: JSON objects
description: JSON object structure for rulesets and rules in API requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ JSON ](https://developers.cloudflare.com/search/?tags=JSON) 

# JSON objects

This page describes the JSON objects used in API requests creating or updating rulesets and their rules via Rulesets API, as well as the objects returned by the API.

## Ruleset object

A fully populated ruleset object has the following JSON structure.

```

{

  "id": "6a359df138c442b385d20140d4d96919",

  "name": "Example Ruleset",

  "description": "Description of Example Ruleset",

  "kind": "custom",

  "version": "2",

  "phase": "http_request_firewall_custom",

  "rules": [

    {

      "id": "fdb0dd271f3f40b19679cc5d91396024",

      "version": "2",

      "action": "block",

      "expression": "cf.zone.name eq \"example.com\" ",

      "last_updated": "2022-07-20T10:44:29.124515Z"

    }

  ],

  "last_updated": "2022-07-20T10:44:29.124515Z"

}


```

For details on the properties of rules items in the `rules` array, refer to the [Rule object structure and properties](#rule-object-structure-and-properties) section.

### Properties

The ruleset object has the following properties:

* `id` ` String `  
   * A 32-character UUIDv4 string that represents the unique Cloudflare-generated identifier for a given version of a ruleset.  
   * Unique, read-only.
* `name` ` String `  
   * A human-readable name for the ruleset.  
   * The name is immutable. You cannot change the name over the lifetime of the ruleset.
* `description` ` String `  
   * Optional description for the ruleset.  
   * You can change the description over the lifetime of the ruleset.
* `kind` ` String `  
   * The kind of ruleset the JSON object represents.  
   * One of `root`, `zone`, `managed`, `custom`.  
   * `kind` is immutable.
* `version` ` Integer `  
   * The version of the ruleset.  
   * Read-only value starting at `1` and incremented by `1` each time the ruleset is modified.
* `rules` ` Array<Rule> `  
   * A list of rules to include in the ruleset. Refer to [Rule object structure and properties](#rule-object-structure-and-properties) for details.
* `last_updated` ` Timestamp `  
   * The time (UTC) when the ruleset was last updated in ISO 8601 format: `YYYY-MM-DDThh:mm:ss.TZD`.  
   * Read-only.

## Rule object structure and properties

A fully populated rule JSON object has the following structure:

```

{

  "id": "fdb0dd271f3f40b19679cc5d91396024",

  "version": "2",

  "ref": "<REF>",

  "description": "<DESCRIPTION>",

  "action": "block",

  "action_parameters": [

    // action parameters vary according to the action

  ],

  "categories": ["<CATEGORY_1>", "<CATEGORY_2>"],

  "expression": "cf.zone.name eq \"example.com\"",

  "last_updated": "2025-07-20T10:44:29.124515Z",

  "enabled": true

}


```

The JSON object properties for a rule are defined as follows:

* `id` ` String `  
   * A 32-character UUIDv4 string that represents the unique Cloudflare-generated identifier for a given version of a rule.  
   * Unique, read-only.
* `version` ` Integer `  
   * The version of the rule.  
   * Read-only value starting at `1` and incremented by `1` each time the rule is modified.  
   * Changing the order of a rule in a ruleset does not change its version.
* `ref` ` String `  
   * A user-defined external identifier that must be unique for each rule in a ruleset.  
   * Use this field in your Terraform configuration to prevent Terraform from recreating the rule on changes. Refer to [How to keep the same rule ID between modifications](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) for more information.
* `description` ` String `  
   * A descriptive name of the rule.
* `action` ` String `  
   * Defines what happens when there is a match for the rule expression.  
   * The available [actions](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) depend on the [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) where the rule's ruleset is executed.
* `action_parameters` ` Object `  
   * One or more parameters configuring the rule action.  
   * The exact properties vary according to the action. Refer to each Cloudflare product's API instructions for more information.
* `categories` ` Array<String> `  
   * Tags associated with the current rule. You can define overrides that affect rules with a given tag.  
   * Read-only. Only available in [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) and [DDoS managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/).
* `expression` ` String `  
   * Criteria defining when there is a match for the current rule.  
   * The fields and functions you can use in a rule expression depend on the phase where the rule's ruleset is executed.
* `last_updated` ` Timestamp `  
   * The time (UTC) when the rule was last updated in ISO 8601 format: `YYYY-MM-DDThh:mm:ss.TZD`.  
   * Read-only.
* `enabled` ` Boolean `  
   * When set to `true`, the current rule is enabled.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/json-object/","name":"JSON objects"}}]}
```
