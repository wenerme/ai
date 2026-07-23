---
description: CSV file format for importing Bulk Redirect lists.
title: CSV file format for Bulk Redirects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# CSV file format for Bulk Redirects

Last updated Jul 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use a CSV file to import URL redirects into a Bulk Redirect List [using the Cloudflare dashboard](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/#1-create-a-bulk-redirect-list). Each line in the CSV file must follow this format:

```txt
<SOURCE_URL>,<TARGET_URL>[,<STATUS_CODE>,<PRESERVE_QUERY_STRING>,<INCLUDE_SUBDOMAINS>,<SUBPATH_MATCHING>,<PRESERVE_PATH_SUFFIX>]
```

Only the `<SOURCE_URL>` and `<TARGET_URL>` values are mandatory. The default value of `<STATUS_CODE>` is `301` and the default value for all the boolean parameters is `FALSE`.

To enable one of the URL redirect parameters, use one of the following values: `TRUE` or `true`. To keep an option disabled, use one of `FALSE` or `false`, or enter a comma (delimiter) without entering any value.

## Example CSV file

All the lines in this example are valid lines that you can import in the dashboard:

```txt
example.com/contacts,https://example.net/contact-us,301,,,,
example.com/about,https://example.net/about-us,,FALSE,TRUE,,
example.com/docs,https://example.com/draft-docs,302,,TRUE
```

## Important remarks

* The source URL cannot include a query string. For details on which URL components are supported in source URLs, refer to [Supported URL components in Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/url-components/).
* The CSV file must not include a header row with column names.
* A source/target URL must be enclosed in quotes (`"`) when it includes a comma (`,`). You can always enclose URL values in quotes, but it is not required.
* You can skip an optional value by immediately entering a comma (the delimiter) without entering any value.
* You do not need to include trailing commas.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/#page","headline":"CSV file format for Bulk Redirects · Cloudflare Rules docs","description":"CSV file format for importing Bulk Redirect lists.","url":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
