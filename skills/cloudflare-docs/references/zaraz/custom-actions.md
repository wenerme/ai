---
title: Custom actions
description: Configure custom actions and triggers for third-party tools.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/custom-actions/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Custom actions

Tools on Zaraz must have actions configured in order to do something. Often, using Automatic Actions is enough for configuring a tool. But you might want to use Custom Actions to create a more customized setup, or perhaps you are using a tool that does not support Automatic Actions. In these cases, you will need to configure Custom Actions manually.

Every action has firing triggers assigned to it. When the conditions of the firing triggers are met, the action will start. An action can be anything the tool can do - sending analytics information, showing a widget, adding a script and much more.

To start using actions, first [create a trigger](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/) to determine when this action will start. If you have already set up a trigger, or if you are using one of the built-in triggers, follow these steps to [create an action](https://developers.cloudflare.com/zaraz/custom-actions/create-action/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/custom-actions/","name":"Custom actions"}}]}
```
