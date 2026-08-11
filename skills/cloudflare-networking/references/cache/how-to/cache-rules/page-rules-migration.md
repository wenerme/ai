---
description: Migrate caching Page Rules to Cache Rules.
title: Migration from Page Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Migration from Page Rules

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you are migrating from Page Rules, there is a behavior change between Page Rules and Cache Rules.

When you create a new Cache Rule and select **Eligible for cache**, the Cache Everything feature is enabled by default. With Page Rules, you had to specifically enable the Cache Everything option.

To maintain the same behavior you had with Page Rules (that is, not enabling Cache Everything), you need to create these two specific rules in this order before creating any additional rules.

Multiple matching cache rules can be combined and applied to the same request. After rule 1 matches, Cloudflare will keep evaluating other cache rules checking for matches. For more information, refer to [Order and priority](https://developers.cloudflare.com/cache/how-to/cache-rules/order/).

## Rule 1

1. Enter a rule name, for instance `bypass everything`.
2. In **When incoming requests match**, select **All incoming requests**.
3. Under **Then**, in the **Cache eligibility** section, select [Bypass cache](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#bypass-cache).

![Create rule to bypass cache](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1454,height=858,format=webp/_astro/first-rule.DCA_9a45.png)

## Rule 2

1. Enter a rule name, for instance `cache all default cacheable extensions`.
2. In **When incoming requests match**, select **Custom filter expression**.
3. Define the following rule:
  * **Field**: `File extension`
  * **Operator**: `is in`
  * **Value**: `7z, avi, avif, apk, bin, bmp, bz2, class, css, csv, doc, docx, dmg, ejs, eot, eps, exe, flac, gif, gz, ico, iso, jar, jpg, jpeg, js, mid, midi, mkv, mp3, mp4, ogg, otf, pdf, pict, pls, png, ppt, pptx, ps, rar, svg, svgz, swf, tar, tif, tiff, ttf, webm, webp, woff, woff2, xls, xlsx, zip, zst`

If you prefer, you can select **Edit expression** and paste the following expression:

```txt
(http.request.uri.path.extension in {"7z" "avi" "avif" "apk" "bin" "bmp" "bz2" "class" "css" "csv" "doc" "docx" "dmg" "ejs" "eot" "eps" "exe" "flac" "gif" "gz" "ico" "iso" "jar" "jpg" "jpeg" "js" "mid" "midi" "mkv" "mp3" "mp4" "ogg" "otf" "pdf" "pict" "pls" "png" "ppt" "pptx" "ps" "rar" "svg" "svgz" "swf" "tar" "tif" "tiff" "ttf" "webm" "webp" "woff" "woff2" "xls" "xlsx" "zip" "zst"})
```

1. Under **Then**, in the **Cache eligibility** section, select [**Eligible for cache**](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#eligible-for-cache-settings).

![Create an eligible for cache rule](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1140,height=1140,format=webp/_astro/second-rule.88NhnPNI.png)

Note

Remember to create the rules in the specified order: first, the `bypass everything` rule, and then the `cache all default cacheable file extensions` rule.

![Rules order](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1970,height=444,format=webp/_astro/rule-order.wNZiF99u.png)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/#page","headline":"Migration from Page Rules · Cloudflare Cache (CDN) docs","description":"Migrate caching Page Rules to Cache Rules.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
```
