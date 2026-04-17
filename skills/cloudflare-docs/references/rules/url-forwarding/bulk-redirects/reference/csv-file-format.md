---
title: CSV file format for Bulk Redirects
description: CSV file format for importing Bulk Redirect lists.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/bulk-redirects/reference/csv-file-format.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# CSV file format for Bulk Redirects

You can use a CSV file to import URL redirects into a Bulk Redirect List [using the Cloudflare dashboard](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/#1-create-a-bulk-redirect-list). Each line in the CSV file must follow this format:

```

<SOURCE_URL>,<TARGET_URL>[,<STATUS_CODE>,<PRESERVE_QUERY_STRING>,<INCLUDE_SUBDOMAINS>,<SUBPATH_MATCHING>,<PRESERVE_PATH_SUFFIX>]


```

Only the `<SOURCE_URL>` and `<TARGET_URL>` values are mandatory. The default value of `<STATUS_CODE>` is `301` and the default value for all the boolean parameters is `FALSE`.

To enable one of the URL redirect parameters, use one of the following values: `TRUE` or `true`. To keep an option disabled, use one of `FALSE` or `false`, or enter a comma (delimiter) without entering any value.

## Example CSV file

All the lines in this example are valid lines that you can import in the dashboard:

```

example.com/contacts,https://example.net/contact-us,301,,,,

example.com/about,https://example.net/about-us,,FALSE,TRUE,,

example.com/docs,https://example.com/draft-docs,302,,TRUE


```

## Important remarks

* The CSV file must not include a header row with column names.
* A source/target URL must be enclosed in quotes (`"`) when it includes a comma (`,`). You can always enclose URL values in quotes, but it is not required.
* You can skip an optional value by immediately entering a comma (the delimiter) without entering any value.
* You do not need to include trailing commas.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/bulk-redirects/","name":"Bulk Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/bulk-redirects/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/url-forwarding/bulk-redirects/reference/csv-file-format/","name":"CSV file format for Bulk Redirects"}}]}
```
