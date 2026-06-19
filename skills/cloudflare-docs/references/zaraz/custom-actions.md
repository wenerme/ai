---
title: Custom actions
description: Configure custom actions and triggers for third-party tools.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Custom actions

Tools on Zaraz must have actions configured in order to do something. Often, using Automatic Actions is enough for configuring a tool. But you might want to use Custom Actions to create a more customized setup, or perhaps you are using a tool that does not support Automatic Actions. In these cases, you will need to configure Custom Actions manually.

Every action has firing triggers assigned to it. When the conditions of the firing triggers are met, the action will start. An action can be anything the tool can do - sending analytics information, showing a widget, adding a script and much more.

To start using actions, first [create a trigger](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/) to determine when this action will start. If you have already set up a trigger, or if you are using one of the built-in triggers, follow these steps to [create an action](https://developers.cloudflare.com/zaraz/custom-actions/create-action/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/custom-actions/#page","headline":"Create a third-party tool action · Cloudflare Zaraz docs","description":"Configure custom actions and triggers for third-party tools.","url":"https://developers.cloudflare.com/zaraz/custom-actions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/custom-actions/","name":"Custom actions"}}]}
```
