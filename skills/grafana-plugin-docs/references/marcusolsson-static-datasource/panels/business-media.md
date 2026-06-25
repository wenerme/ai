---
title: "Business Media | Grafana Plugins documentation"
description: "Learn how to store base64-encoded media files in Grafana dashboards using the Business Input data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Media

You can use the Static data source to store any supported base64-encoded media files on your Grafana dashboard.

> Note
>
> The Static data source works well for files that aren’t too large. If you receive a `413 Request Entity Too Large` error, you have reached the Grafana limit.
>
> In this case, consider using a database or storage data source, like PostgreSQL.

## Fields

Use the String field `img` to store a base64-encoded media file. You can include the definition `data:image/IMAGE-FORMAT;base64,ENCODED-CONTENT` or omit it.
