---
title: "Logs | Grafana Plugins documentation"
description: "Learn how to create static log data for testing logs panels in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Logs

You can use the Static data source to test panels for logs.

## Fields

- Use the Time field `time` to store a UTC timestamp.
- Use the String field `message` for the text message.
- Use the String field `level` to define the log level: `info`, `error`, and so on.

[](/media/docs/grafana/panels-visualizations/business-input/logs.png)
