---
description: Connect a website, R2 bucket, or D1 database to your AI Search instance, or upload files directly for indexing.
title: Data source
image: https://developers.cloudflare.com/ai-search/configuration/data-source/og.png?v=3fa0474a40543a58
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Data source

Last updated Nov 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/configuration/data-source/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can upload files directly to an instance or connect an external data source.

| Data Source | Description |
| --- | --- |
| [Built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) | Upload files directly to an instance. Available by default on every instance. |
| [Website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) | Connect a domain you own to index website pages. |
| [R2 Bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/) | Connect a Cloudflare R2 bucket to index stored documents. |
| [D1 database](https://developers.cloudflare.com/ai-search/configuration/data-source/d1/) Beta | Connect a Cloudflare D1 database to index rows returned by a SQL query. |

For website data sources, [Parse types](https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/) covers how AI Search finds the pages to index.

A D1 data source indexes database rows, not files. For its limits, refer to [D1](https://developers.cloudflare.com/ai-search/configuration/data-source/d1/#limits).

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

## File summaries

File summaries use a large language model (LLM) to describe each file while it is indexed. For every eligible file, AI Search generates a short summary, a list of topics, and a list of keywords:

- The summary and keywords are stored in the item's `context` metadata when they fit within metadata size limits. AI Search passes `context` to the generation model with each retrieved document. If the file already has a `context` value, for example from R2 custom metadata or upload metadata, AI Search keeps your value. The model is still called, and billed, to generate topics.
- The topics are added to the context header of the file's chunks where they fit within the chunk size, so they never replace chunk content. Topics are not counted as ingestion tokens.

Turn on file summaries in the dashboard, or set `indexing_options.file_summary` to `true` when you create or update an instance. File summaries are off by default, and changing this setting triggers a full reindex.

`indexing_options` is replaced as a whole on every update, including updates through the Workers binding. Read the instance first and include the current value of every option. Options you leave out return to their defaults: for example, an update without `file_summary` turns file summaries off and triggers another full reindex. This also applies to tools that send `indexing_options`, such as Terraform.

LLM costs are billed to your account

File summaries are not part of the AI Search ingestion allotment. AI Search selects a Workers AI text-generation model suited to summarization and calls it through the AI Gateway connected to your instance, or the `default` gateway if none is set. These calls are billed to your account as [Workers AI usage](https://developers.cloudflare.com/workers-ai/platform/pricing/) and appear in your AI Gateway logs, where you can see the model used.

Costs grow with the number of files you index. AI Search sends a limited sample of each file's text to the model, so the cost of a summary is capped regardless of file size. Every new or modified file is summarized, while unchanged files reuse their summary on later syncs. If AI Search changes the summary model, files are summarized again the next time they are processed.

File summaries apply to text documents, including converted formats such as PDFs, that produce at least three chunks at your instance's chunk size. A smaller chunk size makes more files eligible and increases cost. Smaller files are indexed without a summary and make no model calls. Images are not summarized.

Keep the following in mind:

- **Best effort**: AI Search makes one attempt per file version. If the model call fails, the file is indexed without a summary. Temporary failures, such as timeouts, rate limits, or model capacity errors, are retried only if the file is processed again at least 24 hours later, for example after a reindex. Other failures are not retried until the file content changes.
- **AI Gateway and account settings apply**: Guardrails or spend limits on your AI Gateway, a missing gateway, or running out of Workers AI usage, such as the daily free allocation on the Workers Free plan, stop summaries from being generated. Files indexed while this happens stay without a summary until their content changes, even after you fix the setting or reindex the instance.
- **Keyword search ranking**: Topics repeat in every chunk where they fit, which increases their weight in [keyword search](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/). Test search quality on a representative instance before you turn on file summaries in production.
- **Generation tokens**: The `context` value adds up to 1,000 characters to each retrieved document sent to the generation model, which increases generation token usage.
- **Indexing time**: Summarizing adds a model call to each eligible file, so indexing takes longer.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/data-source/#page","headline":"Data source","description":"Connect a website, R2 bucket, or D1 database to your AI Search instance, or upload files directly for indexing.","url":"https://developers.cloudflare.com/ai-search/configuration/data-source/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/configuration/data-source/og.png?v=3fa0474a40543a58","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
