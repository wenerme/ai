---
title: "Provisioning | Grafana Plugins documentation"
description: "Learn how to provision the Business News data source using YAML configuration files."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Provisioning

Grafana supports managing data sources by adding one or more YAML config files in the `provisioning/datasources` folder.

## Example

The following example shows how to provision the Business News data source.

YAML [Copy code to clipboard] Copy

```yaml
datasources:
  - name: Bitcoin
    type: volkovlabs-rss-datasource
    access: proxy
    orgId: 1
    uid: rZAdZdf7k
    version: 1
    editable: true
    jsonData:
      feed: https://news.bitcoin.com/feed/
```

## Data sources

When provisioned, the Business News data source appears in the data sources list.

[](/media/docs/grafana/panels-visualizations/business-news/datasource.png)

### Feed URL

The URL must contain all necessary characters (such as `/` at the end) to avoid redirects.

During testing, you might see the following error.

[](/media/docs/grafana/panels-visualizations/business-news/error.png)

If the URL is correct and returns data but also returns an error, add `/` to the end of the URL to avoid a redirect blocked by CORS policy.

For example, use `https://sitename/feed/` instead of `https://sitename/feed`.

[](/media/docs/grafana/panels-visualizations/business-news/correct-url.png)

> Note
>
> If you already tried a data source with `https://sitename/feed` and added `/` but still see an error, clear your cache and perform a hard reload.
