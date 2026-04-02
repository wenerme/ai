---
title: Supported fonts
description: Browser Rendering uses a managed Chromium environment that includes a standard set of fonts. When you generate a screenshot or PDF, text is rendered using the fonts available in this environment.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/reference/supported-fonts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Supported fonts

Browser Rendering uses a managed Chromium environment that includes a standard set of fonts. When you generate a screenshot or PDF, text is rendered using the fonts available in this environment.

If your webpage specifies a font that is not supported yet, Chromium will automatically fall back to a similar supported font. If you would like to use a font that is not currently supported, refer to [Custom fonts](https://developers.cloudflare.com/browser-rendering/features/custom-fonts/).

## Pre-installed fonts

The following sections list the fonts available in the Browser Rendering environment.

### Generic CSS font family support

The following generic CSS font families are supported:

* `serif`
* `sans-serif`
* `monospace`
* `cursive`
* `fantasy`

### Common system fonts

* Andale Mono
* Arial
* Arial Black
* Comic Sans MS
* Courier
* Courier New
* Georgia
* Helvetica
* Impact
* Lucida Handwriting
* Times
* Times New Roman
* Trebuchet MS
* Verdana
* Webdings

### Open source and extended fonts

* Bitstream Vera (Serif, Sans, Mono)
* Cyberbit
* DejaVu (Serif, Sans, Mono)
* FreeFont (FreeSerif, FreeSans, FreeMono)
* GFS Neohellenic
* Liberation (Serif, Sans, Mono)
* Open Sans
* Roboto

### International fonts

Browser Rendering includes additional font packages for non-Latin scripts and emoji:

* IPAfont Gothic (Japanese)
* Indic fonts (Devanagari, Bengali, Tamil, and others)
* KACST fonts (Arabic)
* Noto CJK (Chinese, Japanese, Korean)
* Noto Color Emoji
* TLWG Thai fonts
* WenQuanYi Zen Hei (Chinese)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/reference/supported-fonts/","name":"Supported fonts"}}]}
```
