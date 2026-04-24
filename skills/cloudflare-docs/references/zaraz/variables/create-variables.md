---
title: Create a variable
description: Create custom variables for use in Zaraz actions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/variables/create-variables.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Create a variable

Variables are reusable blocks of information. They allow you to have one source of data you can reuse across tools and triggers in the dashboard. You can then update this data in a single place.

For example, instead of typing a specific user ID in multiple fields, you can create a variable with that information instead. If there is a change and you have to update the user ID, you just need to update the variable and the change will be reflected across the dashboard.

[Worker Variables](https://developers.cloudflare.com/zaraz/variables/worker-variables/) are a special type of variable that generates value dynamically.

## Create a new variable

1. In the Cloudflare dashboard, go to the **Tag setup** page.  
[ Go to **Tag setup** ](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Go to **Tools Configuration** \> **Variables**.
3. Select **Create variable**, and give it a name.
4. In **Variable type** select between `String`, `Masked variable` or `Worker` from the drop-down menu. Use `Masked variable` when you have a private value that you do not want to share, such as an API token.
5. In **Variable value** enter the value of your variable.
6. Select **Save**.

Your variable is now ready to be used with tools and triggers.

## Next steps

Refer to [Add a third-party tool](https://developers.cloudflare.com/zaraz/get-started/) and [Create a trigger](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/) for more information on how to add a variable to tools and triggers.

If you need to edit or delete variables, refer to [Edit variables](https://developers.cloudflare.com/zaraz/variables/edit-variables/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/variables/","name":"Variables"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/variables/create-variables/","name":"Create a variable"}}]}
```
