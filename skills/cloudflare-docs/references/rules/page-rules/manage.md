---
title: Manage Page Rules
description: You can manage Page Rules in the Cloudflare dashboard or via API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/page-rules/manage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Manage Page Rules

You can manage Page Rules in the Cloudflare dashboard or via API.

Note

Consider alternative [Rules](https://developers.cloudflare.com/rules/) options due to their enhanced configurability. Refer to the [migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

For more flexibility and customization, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Create a page rule

* [ Dashboard ](#tab-panel-6013)
* [ API ](#tab-panel-6014)

To create a page rule in the dashboard:

1. In the Cloudflare dashboard, go to the **Page Rules** page.  
[ Go to **Page Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/page-rules)
2. Select **Create Page Rule**.
3. For **URL**, enter the URL or URL pattern that should match the rule ([more details about wildcard matching](https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/)).
4. For **Pick a Setting**, select a [Cloudflare setting](https://developers.cloudflare.com/rules/page-rules/reference/settings/) to adjust. If desired, select **Add a Setting** to adjust multiple Cloudflare settings with the same rule.
5. In the **Order** dropdown, specify the desired order: _First, Last_ or _Custom_.
6. To save and deploy your rule, select **Save and Deploy Page Rule**. If you are not ready to deploy your rule, select **Save as Draft**.  
If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

For ideas about what rules you can create, refer to [Recommended page rules](https://developers.cloudflare.com/rules/page-rules/reference/recommended-rules/).

To create a page rule using the API, send a [POST request](https://developers.cloudflare.com/api/resources/page%5Frules/methods/create/).

You may also want to review the documentation on [wildcard matching](https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/), [available settings](https://developers.cloudflare.com/rules/page-rules/reference/settings/), and [recommended rules](https://developers.cloudflare.com/rules/page-rules/reference/recommended-rules/).

Notes

* Page Rules require a [proxied DNS record](https://developers.cloudflare.com/dns/proxy-status/) to work. Page Rules will not apply to subdomains that do not exist in DNS or are not being directed to Cloudflare.
* Cloudflare does not support non-ASCII characters — such as punycode/unicode domain — in Page Rules. Instead, you could URL-encode the string using [Punycode converter ↗](https://www.punycoder.com/).

## Edit a page rule

* [ Dashboard ](#tab-panel-6009)
* [ API ](#tab-panel-6010)

To edit a page rule in the dashboard:

1. In the Cloudflare dashboard, go to the **Page Rules** page.  
[ Go to **Page Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/page-rules)
2. For a specific rule:  
   * To enable or disable the rule, select the on/off toggle.  
   * To modify the URL pattern, settings, and order, select **Edit** (wrench icon). Then, enter the information you want to change.

To update one or more fields using the API, send a [PATCH request](https://developers.cloudflare.com/api/resources/page%5Frules/methods/edit/).

To entirely replace the configuration of a page rule, send a [PUT request](https://developers.cloudflare.com/api/resources/page%5Frules/methods/update/).

## Delete a page rule

* [ Dashboard ](#tab-panel-6011)
* [ API ](#tab-panel-6012)

To delete a page rule in the dashboard:

1. In the Cloudflare dashboard, go to the **Page Rules** page.  
[ Go to **Page Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/page-rules)
2. For a specific rule, select **X**. Then, select **Delete**.

To delete a page rule using the API, send a [DELETE request](https://developers.cloudflare.com/api/resources/page%5Frules/methods/delete/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/page-rules/","name":"Page Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/page-rules/manage/","name":"Manage Page Rules"}}]}
```
