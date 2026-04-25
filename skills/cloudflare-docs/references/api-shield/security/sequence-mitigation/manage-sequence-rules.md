---
title: Manage sequence rules
description: Create and manage sequence rules in the dashboard or via WAF custom rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Manage sequence rules

Cloudflare recommends creating sequence rules using WAF custom rules. Refer to the [sequence custom rules documentation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/custom-rules/) for more information.

Note

Sequence mitigation is currently in a closed beta and is only available for Enterprise customers. If you would like to be included in the beta, contact your account team.

## Create a sequence rule

* [  New dashboard ](#tab-panel-5459)
* [ Old dashboard ](#tab-panel-5460)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **API sequence rules**.
3. Name your rule.
4. Select a starting endpoint. This is the endpoint that you expect users to hit first in their request flow when using your API.  
   * Choose a hostname to display the list of endpoints for that hostname.  
   * Choose an endpoint.  
   * Select **Set as starting endpoint**.
5. Select a final endpoint. This is the endpoint you are targeting for protection.  
   * Choose a hostname to display the list of endpoints for that hostname.  
   * Choose an endpoint.  
   * Select **Set as ending endpoint**.
6. Choose an action that corresponds to the security model type:  
   * **Allow**: This will create a positive security model by defining approved sequences on your API.  
   * **Log** / **Block**: This will test or enforce a negative security model defining known bad sequences on your API.  
   Note  
   If you chose **Allow**, select whether to log or block the request to the final endpoint when users do not first request the starting endpoint in the sequence.
7. Select **Create rule**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **API Shield** \> **API Rules**.
3. Select **Create sequence rule**.
4. Name your rule.
5. Select a starting endpoint. This is the endpoint that you expect users to hit first in their request flow when using your API.  
   * Choose a hostname to display the list of endpoints for that hostname.  
   * Choose an endpoint.  
   * Select **Set as starting endpoint**.
6. Select a final endpoint. This is the endpoint you are targeting for protection.  
   * Choose a hostname to display the list of endpoints for that hostname.  
   * Choose an endpoint.  
   * Select **Set as ending endpoint**.
7. Choose an action that corresponds to the security model type:  
   * **Allow**: This will create a positive security model by defining approved sequences on your API.  
   * **Log** / **Block**: This will test or enforce a negative security model defining known bad sequences on your API.  
   Note  
   If you chose **Allow**, select whether to log or block the request to the final endpoint when users do not first request the starting endpoint in the sequence.
8. Select **Create rule**.

## Edit a sequence rule

You also have the option to edit an existing rule by selecting it on the rule list. You can rename your rule, adjust the starting and ending endpoint order, modify the endpoint, and change the action of the rule.

## Reprioritize a sequence rule

You can change the priority order of your rules by selecting and dragging the rules on the list.

You can also explicitly set a priority order by selecting the three dots on your rule and choosing **Move to…** where you can set the new priority in the resulting modal window.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/security/sequence-mitigation/","name":"Sequence mitigation"}},{"@type":"ListItem","position":5,"item":{"@id":"/api-shield/security/sequence-mitigation/manage-sequence-rules/","name":"Manage sequence rules"}}]}
```
