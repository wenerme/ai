---
description: Connect a website, R2 bucket, or upload files directly to your AI Search instance for indexing.
title: Data source
image: https://developers.cloudflare.com/ai-search/configuration/data-source/og.png?v=3fa0474a40543a58
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Data source

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/configuration/data-source/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can upload files directly to an instance or connect an external data source.

| Data Source | Description |
| --- | --- |
| [Built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) | Upload files directly to an instance. Available by default on every instance. |
| [Website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) | Connect a domain you own to index website pages. |
| [R2 Bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/) | Connect a Cloudflare R2 bucket to index stored documents. |

For website data sources, [Parse types](https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/) covers how AI Search finds the pages to index.

## Supported file types

AI Search can ingest a variety of file types. The following plain text files and rich format files are supported.

### Plain text file types

| Format | File extensions | MIME type |
| --- | --- | --- |
| Text | `.txt`, `.rst` | `text/plain`, `text/x-rst` |
| Log | `.log`, `.log.gz` | `text/plain` |
| Config | `.ini`, `.conf`, `.env`, `.properties`, `.gitignore`, `.editorconfig`, `.toml` | `text/plain`, `text/toml` |
| Markdown | `.markdown`, `.md`, `.mdx`, `.mdoc` | `text/markdown` |
| LaTeX | `.tex`, `.latex` | `application/x-tex`, `application/x-latex` |
| Script | `.sh`, `.bat`, `.ps1` | `application/x-sh`, `application/x-msdos-batch`, `text/x-powershell` |
| SGML | `.sgml` | `text/sgml` |
| JSON | `.json` | `application/json` |
| XML | `.xml` | `application/xml` |
| SQL | `.sql` | `application/sql` |
| YAML | `.yaml`, `.yml` | `application/x-yaml` |
| CSS | `.css` | `text/css` |
| JavaScript | `.js` | `application/javascript` |
| TypeScript | `.ts`, `.tsx` | `application/typescript` |
| PHP | `.php` | `application/x-httpd-php` |
| Python | `.py` | `text/x-python` |
| Ruby | `.rb` | `text/x-ruby` |
| Java | `.java` | `text/x-java-source` |
| C | `.c` | `text/x-c` |
| C++ | `.cpp`, `.cxx` | `text/x-c++` |
| C Header | `.h`, `.hpp` | `text/x-c-header` |
| Go | `.go` | `text/x-go` |
| Rust | `.rs` | `text/rust` |
| Swift | `.swift` | `text/swift` |
| Dart | `.dart` | `text/dart` |
| Terraform | `.tf` | `text/plain` |
| EMACS Lisp | `.el` | `application/x-elisp`, `text/x-elisp`, `text/x-emacs-lisp` |

### Rich format file types

AI Search uses [Markdown Conversion](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) to convert rich format files to markdown. The following table lists the supported formats that will be converted to Markdown:

Format | | | | | File extensions | | | | | Mime Types | | | |

| PDF Documents | | | | | `.pdf` | | | | | `application/pdf` | | | | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Images <sup>1</sup> | | | | | `.jpeg`, `.jpg`, `.png`, `.webp`, `.svg`, `.gif`, `.bmp` | | | | | `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`, `image/bmp` | | | | |
| HTML Documents | | | | | `.html`, `.htm` | | | | | `text/html` | | | | |
| XML Documents | | | | | `.xml` | | | | | `application/xml` | | | | |
| Microsoft Office Documents | | | | | `.xlsx`, `.xlsm`, `.xlsb`, `.xls`, `.et`, `.docx` | | | | | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `application/vnd.ms-excel.sheet.macroenabled.12`, `application/vnd.ms-excel.sheet.binary.macroenabled.12`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | | | | |
| Open Document Format | | | | | `.ods`, `.odt` | | | | | `application/vnd.oasis.opendocument.spreadsheet`, `application/vnd.oasis.opendocument.text` | | | | |
| CSV | | | | | `.csv` | | | | | `text/csv` | | | | |
| Apple Documents | | | | | `.numbers` | | | | | `application/vnd.apple.numbers` | | | | |

<sup>1</sup> Image conversion uses two Workers AI models for object detection and summarization. See [Workers AI pricing](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/#pricing) for more details.

## File limits

AI Search applies these file size limits:

| File type | Maximum size |
| --- | --- |
| PDF with OCR enabled | 10 MiB |
| PDF without OCR | 4 MiB |
| Plain text, code, configuration, markup, and other formats listed in [Plain text file types](#plain-text-file-types) | 10 MiB |
| Other formats converted to Markdown | 4 MiB |

Files that exceed these limits are not indexed. They appear in the error logs.

## Images and optical character recognition

AI Search supports `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.bmp`, `.tif`, `.tiff`, `.heic`, and `.heif` images. Multimodal embedding models embed supported images directly. Text-only embedding models create captions before embedding images.

Optical character recognition (OCR) extracts text from scanned PDFs and images. Set `indexing_options.use_ocr` to `true` when creating or updating an instance. OCR is disabled by default and changing this setting triggers a full reindex.

OCR is available for every account. OCR usage is billed as image-processing ingestion tokens. For pricing details, refer to [Limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/data-source/#page","headline":"Data source","description":"Connect a website, R2 bucket, or upload files directly to your AI Search instance for indexing.","url":"https://developers.cloudflare.com/ai-search/configuration/data-source/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/configuration/data-source/og.png?v=3fa0474a40543a58","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
