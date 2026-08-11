---
description: Understand firewall rule evaluation order and priority.
title: Order and priority
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Order and priority

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/cf-firewall-rules/order-priority/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Firewall Rules, now deprecated, is part of a larger evaluation chain for HTTP requests, as illustrated in the diagram below. For example, Firewall Rules only evaluates requests that first clear IP Access rules. If a request is blocked by a rule at any stage in the chain, Cloudflare does not evaluate the request further.

![Flow chart of request evaluation at Cloudflare for security products that are not powered by the Ruleset Engine](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1600,height=858,format=webp/_astro/firewall-rules-order-and-priority-1.DvL3658y.png)

Caution

* You can use [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) to allowlist requests under certain conditions, effectively excluding these requests from all security checks. However, allowing a given country code will not bypass [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) or [WAF managed rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).
* The execution order diagram does not include products powered by the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/) like the [WAF](https://developers.cloudflare.com/waf/) or [Transform Rules](https://developers.cloudflare.com/rules/transform/).

By default, Cloudflare evaluates firewall rules in **list order**, where rules are evaluated in the order they appear in the firewall rules list. List ordering is convenient when working with small numbers of rules because you can manage their order by dragging and dropping them into position. However, as the number of rules grows, managing rules in list order becomes difficult. This is where priority order comes into play.

When **priority ordering** is enabled, Cloudflare evaluates firewall rules in order of their **priority number**, starting with the lowest. If a request matches two rules with the same priority, action precedence is used to resolve the tie. In this case, only the action of the rule with the highest precedence is executed, unless that action is _Log_ or _Bypass_ (refer to [Firewall rules actions](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/#supported-actions) for details). Priority ordering makes it a lot easier to manage large numbers of firewall rules, and once the number of rules passes 200, Cloudflare requires it.

## Managing rule evaluation by list order

Users with relatively small numbers of firewall rules (no more than 200) will find that list ordering is enabled by default. When list ordering is enabled, the rules list allows you to drag and drop firewall rules into position, as shown below:

![Animation of a firewall rule being moved into a new position in the rules list to reorder it](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1600,height=1163,format=webp/_astro/firewall-rules-order-and-priority-2.od1TBIqG.gif)

Once there are more than 200 total rules, including inactive rules, you must manage evaluation using priority ordering. When you cross this threshold, the firewall rules interface automatically switches to priority ordering.

## Managing rule evaluation by priority order

Although priority ordering is enabled automatically when the number of active and inactive firewall rules exceeds 200, you can manually enable priority ordering at any time from the rules list.

Cloudflare Firewall Rules does not impose default priorities, and you are not required to set a priority for every rule.

### Enable priority ordering

To manually enable priority ordering:

1. Above the rules list, select **Ordering**.
2. Select _Priority Numbers_.

Once priority ordering is enabled, you can set a priority number for each firewall rule.

### Set rule priority

To set the priority number for a firewall rule:

1. Locate the desired rule in the rules list and select **Edit** (wrench icon).
2. In the **Edit firewall rule** panel, enter a positive integer value in **Priority**.
![Editing a firewall rule in the dashboard to define its Priority value](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=960,height=720,format=webp/_astro/firewall-rules-order-and-priority-4.BOS_CRyn.png)
3. Select **Save**.

The **Priority** column in the rules list displays the priority value for each rule.

![When using priority order, the Firewall rules tab displays the priority of each rule \(if any\) in the first column of the rules list](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1410,height=924,format=webp/_astro/firewall-rules-order-and-priority-5.DaI_uWtJ.png)

## Working with priority ordering

Cloudflare has designed priority ordering to be extremely flexible. This flexibility is particularly useful for managing large rulesets programmatically via the Cloudflare API. Use the Update firewall rules command to set the `priority` property. Refer to [Cloudflare API: Firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/list/) for details.

While your priority numbering scheme can be arbitrary, keep the following in mind:

* **The evaluation sequence starts from the lowest priority number** and goes to the highest.
* **Rules without a priority number are evaluated last**, in order of their action precedence. For example, a rule with the _Log_ action is evaluated before a rule that has the _Block_ action. For more on action precedence, refer to [Firewall rules actions](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/).
* **Avoid using the number `1` as a priority** to make rule order modification easier in the future.
* **Consider grouping ranges of priority numbers into categories** that have some meaning for your deployment. Here are some examples:

  * 5000-9999: Trusted IP addresses
  * 10000-19999: Blocking rules for bad crawlers
  * 20000-29999: Blocking rules for abusive users/spam

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/cf-firewall-rules/order-priority/#page","headline":"Order and priority · Cloudflare Firewall Rules (deprecated) docs","description":"Understand firewall rule evaluation order and priority.","url":"https://developers.cloudflare.com/firewall/cf-firewall-rules/order-priority/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
