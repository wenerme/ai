---
title: Create a rule
description: To create a SYN flood rule or an out-of-state TCP rule:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/advanced-ddos-systems/how-to/create-rule.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create a rule

## Create an Advanced DNS Protection rule

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection** \> **General settings**.
3. Add the prefixes you wish to onboard. Advanced DNS Protection will only be applied to the prefixes you onboard. If you already onboarded the desired prefixes when you configured Advanced TCP Protection, you do not need to take any other action.  
Note  
Currently, the list of onboarded prefixes is shared with Advanced TCP Protection. Any onboarded prefixes will be subject to both Advanced TCP Protection and Advanced DNS Protection, assuming that your account team has done the initial configuration of both systems. However, you can leave Advanced TCP Protection in monitoring mode.
4. Go to **Advanced DNS Protection**.
5. Select **Create Advanced DNS Protection rule**.
6. In **Mode**, select a mode for the rule.
7. Under **Set scope**, select a [scope](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#scope) to determine the range of packets that will be affected by the rule.
8. Under **Sensitivity**, define the [burst sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#burst-sensitivity), [rate sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rate-sensitivity), and [profile sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#profile-sensitivity) to determine when to initiate mitigation. 9\. Select **Deploy**.

---

## Create an Advanced TCP Protection rule

To create a [SYN flood rule](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/#syn-flood-protection) or an [out-of-state TCP](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/#out-of-state-tcp-protection) rule:

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection** \> **Advanced TCP Protection**.
3. Depending on the rule you are creating, do one of the following:  
   * Under **SYN Flood Protection**, select **Create SYN flood rule**.  
   * Under **Out-of-state TCP Protection**, select **Create out-of-state TCP rule**.
4. In **Mode**, select a [mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#mode) for the rule.
5. Under **Set scope**, select a [scope](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#scope) for the rule. If you choose to apply the rule to a subset of incoming packets, select a region or a data center.
6. Under **Sensitivity**, define the [burst sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#burst-sensitivity) and [rate sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rate-sensitivity) of the rule (by default, _Medium_). The sensitivity levels are based on the initially configured thresholds for your specific case.
7. Select **Deploy**.

Note

Filters take precedence over rules. For details on how the execution mode is determined, refer to [Determining the execution mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#determining-the-execution-mode).

---

## Create a Programmable Flow Protection rule

Once a program is uploaded, you must add a rule to execute it. To add a rule, use the following `POST` endpoint.

Your rule must define a:

* `Name`
* `Program ID`
* `Scope` (one of: `global`, `regional`, `datacenter`)
* `Mode` (one of: `enabled`, `monitoring`, `disabled`)
* `Expression`

The `Expression` field specifies what traffic a rule will apply to. If a rule's expression is set to `true`, then that rule will apply to all traffic in an account. Alternatively, an expression can specify the following fields to match on:

* `ip.src`
* `ip.dst`
* `udp.srcport`
* `udp.dstport`

Example expression

```

"ip.src in { 1.2.3.4/24, 2.3.4.5/24 } and udp.dstport eq 42"


```

Refer to the [Advanced DDoS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#scope) documentation for more information about scope and mode parameters, and the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) documentation for more information about expressions.

If it is successful, the API will return the created rule ID.

Request

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/programmable_flow_protection/configs/rules \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "scope": "global",

  "name": "my global rule",

  "program_id": "<PROGRAM_ID>",

  "mode": "monitoring",

  "expression": "true"

}'


```

Cloudflare recommends that any program is first executed with a rule in `monitoring` mode. This ensures that your program executes on production traffic but does not drop any real traffic. Instead, Cloudflare will log your program's expected verdict (pass or drop) to the [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) dashboard.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/create-rule/","name":"Create a rule"}}]}
```
