---
title: Configuration Import &#38; Export
description: Import and export Zaraz configurations between zones.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/advanced/import-export.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configuration Import & Export

Exporting your Zaraz configuration can be useful if you want to create a local backup or if you need to import it to another website. Zaraz provides an easy way to export and import your configuration.

## Export your Zaraz configuration

To export your Zaraz configuration:

1. In the Cloudflare dashboard, go to the **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/tag-management/settings)
2. Go to **Advanced**.
3. Click "Export" to download your configuration.

## Import your Zaraz configuration

Warning

Importing a Zaraz configuration replaces your existing configuration, meaning that any information you did not back up could be lost. Consider exporting your existing configuration before importing a new one.

To import a Zaraz configuration:

1. In the Cloudflare dashboard, go to the **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/tag-management/settings)
2. Go to **Advanced**.
3. Click **Browse** to select your configuration file, and **Import** to import it.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/advanced/","name":"Advanced options"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/advanced/import-export/","name":"Configuration Import & Export"}}]}
```
