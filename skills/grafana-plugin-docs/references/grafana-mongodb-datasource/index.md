---
title: "MongoDB data source | Grafana Enterprise Plugins documentation"
description: "This document introduces the MongoDB data source for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MongoDB data source

MongoDB is a distributed document database. The MongoDB data source plugin allows you to visualize data from MongoDB in Grafana.

The following documentation will help you get started working with MongoDB and Grafana:

- [Configure the MongoDB data source](/docs/plugins/grafana-mongodb-datasource/latest/configure/)
- [MongoDB query editor](/docs/plugins/grafana-mongodb-datasource/latest/query-editor/)
- [MongoDB templates and variables](/docs/plugins/grafana-mongodb-datasource/latest/templates-and-variables/)
- [Troubleshoot issues with the MongoDB data source](/docs/plugins/grafana-mongodb-datasource/latest/troubleshooting/)
- [MongoDB visualizations](/solutions/mongodb/visualize/)

## Requirements

The MongoDB data source has the following requirements:

- A MongoDB version 5.0+ instance with at least one user.
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.
- Port 27017 enabled.

## Known limitations

Following are current known limitations:

- Only `find` and `aggregate` read commands are supported.
- Refer to [Diagnostics](/docs/plugins/grafana-mongodb-datasource/latest/query-editor/#diagnostics) for a list of currently supported diagnostics commands.
- Regex flags `g` and `s` are not supported.

## Get the most out of the MongoDB data source

After installing and configuring MongoDB you can:

- Create a wide variety of [visualizations](/docs/grafana/latest/panels-visualizations/visualizations/).
- Add [annotations](/docs/grafana/latest/dashboards/annotations/).
- Configure and use [templates and variables](/docs/grafana/latest/variables/).
- Add [transformations](/docs/grafana/latest/panels/transformations/).
- Set up [alerting](/docs/grafana/latest/alerting/).
- Set up proxying. Refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/) for configuration instructions.

> Note
>
> Proxying requires Grafana v10.x and the feature toggle `secureSocksDSProxy` set to `Enabled`.

Always ensure that your plugin version is up-to-date so you have access to all current features. Navigate to **Plugins and data** &gt; **Plugins** to check for updates.
