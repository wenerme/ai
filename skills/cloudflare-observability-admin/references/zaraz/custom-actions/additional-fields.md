---
description: Additional fields available in Zaraz custom actions.
title: Additional fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Additional fields

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/custom-actions/additional-fields/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Some tools supported by Zaraz let you add fields in addition to the required field. Fields can usually be added either to a specific action, or to all the action within a tool, by adding the field as a **Default Field**.

## Add an additional field to a specific action

Adding an additional field to an action will attach it to this action only, and will not affect your other actions.

1. In the Cloudflare dashboard, go to the **Tag setup** page.
[Go to **Tag setup** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Select **Tools Configuration** \> **Third-party tools**.
3. Locate the third-party tool with the action you want to add the additional field to, and select **Edit**.
4. Select the action you wish to modify.
5. Select **Add Field**.
6. Choose the desired field from the drop-down menu and select **Add**.
7. Enter the value you wish to pass to the action.
8. Select **Save**.

The new field will now be used in this event.

## Add an additional field to all actions in a tool

Adding an additional field to the tool sets it as a default field for all of the tool actions. It is the same as adding it to every action in the tool.

1. In the Cloudflare dashboard, go to the **Tag setup** page.
[Go to **Tag setup** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Select **Tools Configuration** \> **Third-party tools**.
3. Locate the third-party tool where you want to add the field, and select **Edit**.
4. Select **Settings** \> **Add Field**.
5. Choose the desired field from the drop-down menu, and select **Add**.
6. Enter the value you wish to pass to all the actions in the tool.
7. Select **Save**.

The new field will now be attached to every action that belongs to the tool.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/custom-actions/additional-fields/#page","headline":"Additional fields · Cloudflare Zaraz docs","description":"Additional fields available in Zaraz custom actions.","url":"https://developers.cloudflare.com/zaraz/custom-actions/additional-fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
