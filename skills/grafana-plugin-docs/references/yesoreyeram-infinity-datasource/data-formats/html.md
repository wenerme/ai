---
title: "HTML | Grafana Plugins documentation"
description: "Extract data from HTML pages with the Infinity data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# HTML

Select **HTML** as the query type to extract data from HTML pages.

> Caution
>
> Use HTML queries only for retrieving data from legacy systems where no alternative APIs exist. Where possible, use JSON, CSV, or XML query types instead.

## Parser options

When querying HTML data, use the **JSONata** or **JQ** backend parsers. These parsers convert HTML into a structured format similar to XML, allowing you to use the same selector syntax.

- **JSONata parser**: Use JSONata expressions to navigate and transform the parsed HTML structure. For more information, refer to [JSONata parser](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/backend/).
- **JQ parser**: Use JQ expressions to navigate and transform the parsed HTML structure. For more information, refer to [JQ parser](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/jq-backend/).

For selector syntax and examples, refer to [XML](/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/xml/), as HTML is parsed using the same approach.

## Configure an HTML query

To extract data from an HTML page:

1. Select **HTML** as the query type.
2. Select **URL** as the source.
3. Enter the page URL.
4. Select **JSONata** or **JQ** as the parser.
5. Configure the root selector and column selectors.

## Limitations

Be aware of the following limitations when using HTML queries:

- **Symmetrical data only**: Tables with `colspan` or `rowspan` attributes are not supported.
- **Text content only**: Retrieving HTML attributes is not supported.
- **XHTML compatibility**: The backend HTML parser only works with XHTML-compatible pages.
- **Rate limiting**: Websites may block frequent requests. Set appropriate refresh intervals.
