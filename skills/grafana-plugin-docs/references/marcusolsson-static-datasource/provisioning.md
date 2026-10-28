---
title: "Provisioning | Grafana Plugins documentation"
description: "Learn how to provision the Business Input data source using YAML configuration files in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Provisioning

Grafana supports managing data sources by adding one or more YAML config files in the `provisioning/datasources` folder.

## Example

Example of provisioning the Static Data Source.

YAML ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```yaml
datasources:
  - name: Static
    type: marcusolsson-static-datasource
    access: proxy
    isDefault: true
    orgId: 1
    version: 1
    editable: true
    jsonData:
      codeEditorEnabled: true
```

## Data sources

After you provision the data source, it appears in the data sources list.

[](https://grafana.com/media/docs/grafana/panels-visualizations/business-input/datasource.png)
