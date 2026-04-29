---
title: Create an exception
description: Create an exception to skip specific rules or rulesets.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create an exception

Use [exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) to skip the execution of a managed ruleset of some of its rules.

The exception configuration includes an [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that defines the skip conditions, and the rules or managed rulesets to skip under those conditions.

If you are using Terraform, refer to [Configure exceptions](https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/#configure-exceptions) in the Terraform documentation.

If you are using the Cloudflare dashboard, refer to [Add an exception in the dashboard](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-dashboard/).

Note

Currently, only the [Cloudflare Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) supports managed rules exceptions.

## Types of exceptions

An exception can have one of the following behaviors (from highest to lowest priority):

* [Skip all remaining rules in the entry point ruleset](#skip-all-remaining-rules)
* [Skip one or more managed rulesets](#skip-one-or-more-managed-rulesets)
* [Skip one or more rules of managed rulesets](#skip-one-or-more-rules-of-managed-rulesets)

You define exceptions in a given context — zone level or account level — and they apply only to that context. For example, if you define an exception that skips all remaining rules at the account level, the rules defined in the entry point ruleset at the zone level will still be evaluated.

If there is a match for the expressions of several exceptions, Cloudflare will consider the exception with the highest priority.

Exceptions only apply to rules executing a managed ruleset listed after them. If you add an exception at the end of the list of rules of an entry point ruleset, nothing will be skipped.

Additional requirement for account-level exceptions

Rules in entry point rulesets at the account level only apply to Enterprise zones. This also includes exceptions (or skip rules). When adding an exception at the account level, you must use parentheses to enclose any custom conditions in the rule expression and end the expression with `and cf.zone.plan eq "ENT"`, or else the API operation will fail.

### Skip all remaining rules

To skip all the remaining rules in the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset), create a rule with `skip` action and include `"ruleset": "current"` in the `action_parameters` object.

Example of rule definition:

```

{

  "expression": "<RULE_EXPRESSION>",

  "action": "skip",

  "action_parameters": {

    "ruleset": "current"

  }

}


```

Skipping all remaining rules only affects the rules in the current context (account or zone). For example, adding a rule with `skip` action to the account-level phase entry point ruleset has no impact on the rules defined in the zone-level phase entry point ruleset — these zone-level rules will still be evaluated.

For a full example, refer to the [WAF documentation](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-api/#skip-all-remaining-rules).

### Skip one or more managed rulesets

To skip one or more managed rulesets, create a rule with `skip` action containing a `rulesets` field in the `action_parameters` object. The `rulesets` field must contain a list of managed ruleset IDs you want to skip.

Example of rule definition:

```

{

  "expression": "<RULE_EXPRESSION>",

  "action": "skip",

  "action_parameters": {

    "rulesets": ["<MANAGED_RULESET_1_ID>", "<MANAGED_RULESET_2_ID>"]

  }

}


```

For a full example, refer to the [WAF documentation](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-api/#skip-the-cloudflare-managed-ruleset).

### Skip one or more rules of managed rulesets

To skip one or more rules of managed rulesets, create a rule with `skip` action containing a `rules` object in the `action_parameters` object. The `rules` object must contain one or more managed ruleset IDs as keys, and a list of rules to skip in those managed rulesets as the value of each key.

Example of a rule definition that skips rules `A` and `B` of managed ruleset `1`, and rule `X` of managed ruleset `2`:

```

{

  "expression": "<RULE_EXPRESSION>",

  "action": "skip",

  "action_parameters": {

    "rules": {

      "<MANAGED_RULESET_1_ID>": ["<RULE_A_ID>", "<RULE_B_ID>"],

      "<MANAGED_RULESET_2_ID>": ["<RULE_X_ID>"]

    }

  }

}


```

Explain Code

The rules in the `rules` object must belong to the specified managed rulesets, otherwise you will get an error.

For a full example, refer to the [WAF documentation](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-api/#skip-one-or-more-rules-of-waf-managed-rulesets).

---

## Additional notes

* Exceptions have priority over [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).
* If you define an exception that skips all remaining rules, the expressions of those rules are not evaluated.
* If you define an exception that skips a rule of a managed ruleset, the expression of the rule that executes the managed ruleset is evaluated and the managed ruleset rules are executed except for that specific rule, which is bypassed.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/managed-rulesets/","name":"Work with managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/managed-rulesets/create-exception/","name":"Create an exception"}}]}
```
