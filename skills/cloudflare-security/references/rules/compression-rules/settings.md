---
description: Available compression algorithms and content type settings for Compression Rules.
title: Compression Rules settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Compression Rules settings

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/compression-rules/settings/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Compression Rules support the configuration settings covered in the following sections.

## Dashboard configuration settings

### Enable Zstandard (Zstd) compression  Beta

Sets Zstandard as the preferred compression algorithm. If it is not supported, will automatically fall back to Brotli, Gzip, or uncompressed data.

### Enable Brotli and Gzip compression

Enables Cloudflare's default compression setting. Brotli is the preferred compression algorithm. It will automatically fall back to Gzip or to uncompressed data.

### Disable compression

Disables compression for matching requests. Also disables Cloudflare's [default compression behavior](https://developers.cloudflare.com/speed/optimization/content/compression/).

### Custom

Defines a custom order for compression algorithms.

Allowed values are the following:

* **Gzip**: Use the Gzip compression algorithm, if supported by the website visitor.
* **Brotli**: Use the Brotli compression algorithm, if supported by the website visitor.
* **Zstandard**: Use the Zstandard (Zstd) compression algorithm, if supported by the website visitor.
* **Auto**: Compress the response according to the algorithms supported by the website visitor (if any). Cloudflare will define the order of preference for the compression algorithms, which may change in the future. Has the same behavior of the **Enable compression** option.
* **Default**: Use Cloudflare's [default compression behavior](https://developers.cloudflare.com/speed/optimization/content/compression/), which depends on the response content type.

If you specify only _Gzip_, _Brotli_, or _Zstandard_ and no algorithm matches, the response will have no compression. To configure a fallback compression mechanism, add _Auto_ to the list.

Note

The compression applied by the _Default_ option takes into account any configured compression rules that match incoming requests.

---

## API configuration settings

The configuration object supported by the `compress_response` action has the following format:

```json
"action_parameters": {
  "algorithms": [
    { "name": "<VALUE1>" },
    { "name": "<VALUE2>" },
    // ...
  ]
}
```

The `algorithms` list must contain at least one item.

The supported algorithm values are:

* `gzip`: Use the Gzip compression algorithm, if supported by the website visitor.
* `brotli`: Use the Brotli compression algorithm, if supported by the website visitor.
* `zstd`: Use the Zstandard compression algorithm, if supported by the website visitor.
* `none`: Do not use any compression algorithm.
* `auto`: Compress the response according to the algorithms supported by the website visitor (if any). Cloudflare will define the order of preference for the compression algorithms, which may change in the future.
* `default`: Use Cloudflare's [default compression behavior](https://developers.cloudflare.com/speed/optimization/content/compression/#compression-between-cloudflare-and-website-visitors), which depends on the response content type.

If you include `none`, `default`, or `auto` in the list, it must be the last value in the list.

When you specify only the `gzip`, `brotli`, or `zstd` algorithms, if no algorithm matches then the response will have no compression. To configure a fallback compression mechanism, add `auto` to the list.

For API examples, refer to the [Examples gallery](https://developers.cloudflare.com/rules/compression-rules/examples/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/compression-rules/settings/#page","headline":"Compression Rules settings · Cloudflare Rules docs","description":"Available compression algorithms and content type settings for Compression Rules.","url":"https://developers.cloudflare.com/rules/compression-rules/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
