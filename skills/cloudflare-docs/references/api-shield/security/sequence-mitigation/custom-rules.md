---
title: Sequence mitigation custom rules
description: Write custom rules that match valid or invalid API request sequences.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sequence mitigation custom rules

API Shield sequence custom rules use the configured API Shield session identifier to track the order of requests a user has made and the time between requests, and makes them available via [Cloudflare Rules](https://developers.cloudflare.com/rules). This allows you to write rules that match valid or invalid sequences.

These rules are similar to [cookie sequence rules](https://developers.cloudflare.com/bots/additional-configurations/sequence-rules/) but have a different set of prerequisites:

* They require [session identifiers](https://developers.cloudflare.com/api-shield/get-started/#session-identifiers) to be set in API Shield.
* Because they require session identifiers, they can only be used on traffic that can be clearly attributed to individual users through session identifiers (authenticated traffic).
* Because Cloudflare stores the user state in memory and not in a cookie, a session's sequence lifetime is limited to 10 minutes.
* You must set up at least one [API sequence rule](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/manage-sequence-rules/) to activate the sequence system.

Rules built using these custom rules are similar to the sequence rules that can be configured [via the API or the Cloudflare dashboard](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) as they make use of the same underlying technology. However, these custom rules allow for greater flexibility by using free-form logic on top of the recorded sequence and providing access to the full response options that rulesets offers.

## Availability

Note

Sequence mitigation is currently in a closed beta and is only available for Enterprise customers. If you would like to be included in the beta, contact your account team.

These sequence fields are available in:

* [Custom rules](https://developers.cloudflare.com/waf/custom-rules/) (`http_request_firewall_custom` phase)
* [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) (`http_request_ratelimit`)
* [Bulk Redirects](https://developers.cloudflare.com/workers/examples/bulk-redirects/) (`http_request_redirect`)
* [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) (`http_request_late_transform`)

| Field name                             | Description                                                                                                                                                                                                                                                                  | Example value                          |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| cf.sequence.current\_opString          | This field contains the ID of the operation that matches the current request. If the current request does not match any operations defined in Endpoint Management, it will be an empty string.                                                                               | c821cc00                               |
| cf.sequence.previous\_opsArray<String> | This field contains an array of the prior operation IDs in the sequence, ordered from most to least recent. It does not include the current request.  If an operation is repeated, it will appear multiple times in the sequence.                                            | \["f54dac32", "c821cc00", "a37dc89b"\] |
| cf.sequence.msec\_since\_opMap<Number> | This field contains a map where the keys are operation IDs and the values are the number of milliseconds since that operation has most recently occurred.  This does not include the current request or operation as it only factors in previous operations in the sequence. | {"f54dac32": 1000, "c821cc00": 2000}   |

## Build a sequence custom rule

* [  New dashboard ](#tab-panel-4472)
* [ Old dashboard ](#tab-panel-4473)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. To create a new empty rule, select **Create rule** \> **Custom rules**.
3. Enter a descriptive name for the rule in **Rule name**.
4. Under **When incoming requests match**, use the **Field** drop-down list to filter by **Sequences** and select from:  
   * Current Operation  
   * Previous Operations  
   * Elapsed time
5. Under **Value**, select the edit icon to use Builder and build a sequence on the side panel.
6. Under **Select a hostname for this sequence**, choose all or a specific hostname from the dropdown list. Optionally, you can use the search bar to search for a specific hostname.
7. From the **Methods** dropdown list, choose all methods or a specific request method.
8. Select the checkbox for each endpoint in the order that you want them to appear in the sequence.
9. Set the time to complete.
10. Select **Save**.
11. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
12. (Optional) If you selected the _Block_ action, you can configure a custom response.
13. Under **Place at**, select the order of when the rule will fire.
14. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

Note

The fields in the custom rule are populated as a grouped sequence based on the values that you entered on Builder.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. To create a new empty rule, select **Create rule**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, use the **Field** drop-down list and select:  
   * Current Operation  
   * Previous Operations  
   * Elapsed time
6. Under **Value**, build a sequence by selecting a hostname for the sequence.
7. Select the checkbox for each endpoint in the order that you want them to appear in the sequence.
8. Set the time to complete.
9. Select **Save**.
10. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
11. (Optional) If you selected the _Block_ action, you can configure a custom response.
12. Under **Place at**, select the order of when the rule will fire.
13. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

### Example rules

Each saved endpoint will have an endpoint ID visible in its details page in Endpoint Management in the form of a UUID. The references below (`aaaaaaaa`, `bbbbbbbb`, and `cccccccc`) are the first eight characters of the endpoint ID.

The visitor must wait more than 2 seconds after requesting endpoint `aaaaaaaa` before requesting endpoint `bbbbbbbb`:

```

cf.sequence.current_op eq "bbbbbbbb" and

cf.sequence.msec_since_op["aaaaaaaa"] ge 2000


```

The visitor must request endpoints `aaaaaaaa`, then `bbbbbbbb`, then `cccccccc` in that exact order:

```

cf.sequence.current_op eq "cccccccc" and

cf.sequence.previous_ops[0] == "bbbbbbbb" and

cf.sequence.previous_ops[1] == "aaaaaaaa"


```

The visitor must request endpoint `aaaaaaaa` before endpoint `bbbbbbbb`, but endpoint `aaaaaaaa` can be anywhere in the previous 10 requests:

```

cf.sequence.current_op eq "bbbbbbbb" and

any(cf.sequence.previous_ops[*] == "aaaaaaaa")


```

The visitor must request either endpoint `aaaaaaaa` before endpoint `bbbbbbbb`, or endpoint `cccccccc` before endpoint `bbbbbbbb`:

```

(cf.sequence.current_op eq "bbbbbbbb" and

any(cf.sequence.previous_ops[*] == "aaaaaaaa")) or

(cf.sequence.current_op eq "bbbbbbbb" and

any(cf.sequence.previous_ops[*] == "cccccccc"))


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/security/sequence-mitigation/","name":"Sequence mitigation"}},{"@type":"ListItem","position":5,"item":{"@id":"/api-shield/security/sequence-mitigation/custom-rules/","name":"Sequence mitigation custom rules"}}]}
```
