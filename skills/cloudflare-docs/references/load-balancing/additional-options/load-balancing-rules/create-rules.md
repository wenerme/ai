---
title: Create custom rules
description: Create custom rules for load balancing behavior.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Create custom rules

Create and manage [Load Balancing rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/) in the **Custom Rules** page, which is part of the Create/Edit Load Balancer workflow found in **Traffic** in the dashboard.

---

## Prerequisites

* **Understand whether Cloudflare proxies your traffic**: Depending on the [proxy status](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/) of your traffic, you may have access to different fields for your load balancing rules. For more details, refer to [Supported fields and expressions](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/).

---

## Example Workflow

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Edit an existing load balancer or [create a new load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/).
3. From the Load Balancer workflow, select **Custom Rules**.
4. Select **Create Custom Rule**.
5. In the **Field** drop-down list, choose an HTTP property. For more details, refer to [Supported fields](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/).
6. In the **Operator** drop-down list, choose an operator. For more details, refer to [Operators](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/#operators-and-grouping-symbols).
7. Enter the value to match. When the field is an ordered list, **Value** is a drop-down list. Otherwise, **Value** is a text input.
8. (Optional) To create a compound expression using logical operators, select **And** or **Or**.
9. For an action, choose **Respond with fixed response** or **Override** and enter additional details. For a full list of actions, refer to [Actions](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/actions/).
10. (Optional) Select **Add another override**.
11. After you create your rule, select **Save and Deploy** or **Save as Draft**.
12. Select **Next** and review your changes.
13. Select **Save** to confirm.

Warning

To save a new load balancer rule, make sure to save both the rule **and** the overall load balancer configuration.

Note

In general, for non-terminating actions, the last change made by rules within the same [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) will win (later rules can overwrite changes made by previous ones). However, for [terminating actions](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/), such as Block, Redirect, or any of the challenge actions, rule evaluation will stop and the action is executed immediately.

Load Balancer Custom Rules override the default Load Balancer settings, including pool and origin selection. These are non-terminating actions, so the last rule applied will override any prior rules.

## Example use case

### URL-based routing

If you want to host `example.com/blog` separately from your main website, for example, use the following custom rule.

**When incoming requests match**:

| Field    | Operator | Value |
| -------- | -------- | ----- |
| URI Path | contains | /blog |

**Then**:

| Action    | Options | Value          |
| --------- | ------- | -------------- |
| Overrides | Pools   | <BLOG\_SERVER> |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/additional-options/","name":"Additional configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/additional-options/load-balancing-rules/","name":"Custom load balancing rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/additional-options/load-balancing-rules/create-rules/","name":"Create custom rules"}}]}
```
