---
title: Create Rate Limiting policies (beta)
description: Create rate limiting policies for network traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-network-firewall/how-to/create-rate-limiting-policies.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create Rate Limiting policies (beta)

Rate limiting policies (beta) allow you to manage incoming traffic to your network for specific locations.

This guide will teach you how to create a policy for when incoming packets match, and in cases where your rate exceeds a certain value (in packets or bits).

Note

For Cloudflare Advanced Network Firewall customers, rate limiting (beta) is available by request through the account team.

## Add a policy

To add a policy:

1. In the Cloudflare dashboard, go to the [Firewall Policies ↗](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall) page.
2. Select the **Rate limiting** tab, then select **Add a policy**.
3. Fill out the information for your new policy:  
   * Select the **Field**: At the moment, you can only choose a [colo name ↗](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/cloudflare-network-firewall/).  
   * Select the **Operator**: Choose among **equals** or **is in**.  
   * Select the **Value**.
4. When you are done, select **Save policy**.

## Edit an existing policy

To edit a policy:

1. In the Cloudflare dashboard, go to the [Firewall Policies ↗](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall) page.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to edit in the list and select **Edit**.
4. Edit the policy with your changes and select **Edit policy**.

## Delete an existing policy

To delete an existing policy:

1. In the Cloudflare dashboard, go to the [Firewall Policies ↗](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall) page.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to delete from the list.
4. Select the three dots, then select **Remove**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/how-to/create-rate-limiting-policies/","name":"Create Rate Limiting policies (beta)"}}]}
```
