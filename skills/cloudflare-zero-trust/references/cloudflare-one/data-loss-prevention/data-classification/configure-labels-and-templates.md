---
description: Create labels and build from templates in Cloudflare DLP Data Classification.
title: Configure labels and templates
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure labels and templates

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/configure-labels-and-templates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Labels and templates define the classification metadata you can apply to sensitive content in Cloudflare DLP.

Use the **Labels** tab to create and manage sensitivity schemas, sensitivity levels, data tag groups, and data tags. Use the **Templates** tab to review Cloudflare-managed starting points for sensitivity schemas and data tag groups.

## Labels

Labels help you describe matched content in a consistent way.

Data Classification supports two label types:

* **Sensitivity schemas and levels** define an ordered classification hierarchy.
* **Data tag groups and tags** define additional descriptors you can apply to content.

You can use labels directly in custom DLP profiles and assign them through data classes.

### Sensitivity schemas and levels

A sensitivity schema is a named hierarchy of sensitivity levels, such as `Public`, `Internal`, `Confidential`, or `Restricted`.

Each schema contains one or more ordered levels. In custom DLP profiles, selecting a sensitivity level lets you match content at that level or higher within the selected schema.

### Create a sensitivity schema

When creating a sensitivity schema, you can either create a custom schema from scratch or start from a template.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Data classification** \> **Labels**.
2. Select **Create labels**.
3. In **Sensitivity schema**, choose one of the following:
  * **Create a custom schema** to define the schema from scratch
  * **Choose a template** to start from a Cloudflare-managed template
4. Enter or review the name and description.
5. Add or update the sensitivity levels you want to include, in order.
6. Select **Save**.

You can edit the resulting sensitivity schema after creation.

### Data tag groups and tags

A data tag group contains related tags you can use to describe content beyond its sensitivity level. For example, a data tag group could contain tags for business function, data owner, or content category.

### Create a data tag group

When creating a data tag group, you can either create a custom group from scratch or start from a template.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Data classification** \> **Labels**.
2. Select **Create labels**.
3. In **Data tag group**, choose one of the following:
  * **Create a custom group** to define the group from scratch
  * **Choose a template** to start from a Cloudflare-managed template
4. Enter or review the name and description.
5. Add or update the data tags you want to include.
6. Select **Save**.

You can edit the resulting data tag group after creation.

## Templates

Templates provide Cloudflare-managed starting points for sensitivity schemas and data tag groups.

Templates are not linked objects. When you build from a template, Cloudflare creates a new sensitivity schema or data tag group in your account. After that, you can edit it like any other label object you create.

You can start from a template in either of the following ways:

* from the **Templates** tab, by reviewing a template and selecting **Build with template**
* from the **Labels** tab, by selecting **Create labels** and then **Choose a template** inline during creation

### Build from a template from the Templates tab

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Data classification** \> **Templates**.
2. Select a template to review its details.
3. Select **Build with template**.
4. Review and customize the resulting sensitivity schema or data tag group.
5. Select **Save**.

After you build from a template, the resulting object appears in the **Labels** tab and can be used in data classes and DLP profiles.

## Use labels in DLP

After you create labels, you can use them in either of the following ways:

* assign them to content through [Build a data class](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/build-a-data-class/)
* apply them directly in [custom DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/)

In custom DLP profiles, sensitivity levels and data tags can be used directly as profile criteria, even when they are not assigned through a data class.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/configure-labels-and-templates/#page","headline":"Configure labels and templates · Cloudflare One docs","description":"Create labels and build from templates in Cloudflare DLP Data Classification.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/configure-labels-and-templates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
```
