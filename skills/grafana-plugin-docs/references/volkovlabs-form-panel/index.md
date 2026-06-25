---
title: "Business Forms | Grafana Plugins documentation"
description: "Learn how to insert and update application data and modify configuration directly from your Grafana dashboard using the Business Forms panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Forms

The Business Forms panel is a conceptually new plugin for Grafana. It is the first plugin that allows inserting and updating application data, as well as modifying configuration directly from your Grafana dashboard.

## Requirements

- Business Forms panel 6.X requires **Grafana 11** or **Grafana 12**.
- Business Forms panel 4.X, 5.X requires **Grafana 10** or **Grafana 11**.
- Data Manipulation panel 3.X requires **Grafana 9** or **Grafana 10**.
- Data Manipulation panel 2.X requires **Grafana 9** or **Grafana 8.5**.
- Data Manipulation panel 1.X requires **Grafana 8**.

## Getting started

You can install the Business Forms panel from the [Grafana Plugins catalog](/grafana/plugins/volkovlabs-form-panel/) or use the Grafana command line tool.

For the latter, use the following command:

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install volkovlabs-form-panel
```

## Highlights

- Provides functionality to create customizable forms.
- Supports custom code for initial and update requests.
- Supports API requests, including the `GET` request to get initial values and the `DELETE`, `PATCH`, `POST`, and `PUT` requests to send values updated in the form.
- Adds request headers to initial and update requests.
- Customizes the Submit and Reset buttons and the form layout.
- Splits form elements into sections.
- Requests user confirmation before running an update request.
- Sends all or only updated elements in the request payload.
- Displays success and error notifications through custom code.
- Provides suggestions for available parameters when writing program code in the code editor.

[](/media/docs/grafana/panels-visualizations/business-forms/panel.png)

## Documentation

Expand table

| Section                                                                    | Description                                                                                |
|----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [Data flow](/docs/plugins/volkovlabs-form-panel/latest/data-flow/)         | Explains the data flow and its specifics.                                                  |
| [Form elements](/docs/plugins/volkovlabs-form-panel/latest/form-elements/) | Explains the specifics of form elements.                                                   |
| [REST API](/docs/plugins/volkovlabs-form-panel/latest/rest-api/)           | Explains the REST API architecture and how to use NGINX.                                   |
| [Custom code](/docs/plugins/volkovlabs-form-panel/latest/custom-code/)     | Explains how to access plugin options, API responses, form elements, and Grafana services. |
| [Features](/docs/plugins/volkovlabs-form-panel/latest/features/)           | Explains the plugin features.                                                              |
| [Servers](/docs/plugins/volkovlabs-form-panel/latest/servers/)             | Provides examples of API server implementations.                                           |
| [Release notes](/docs/plugins/volkovlabs-form-panel/latest/release/)       | Stay up to date with the latest features and updates.                                      |

## License

Apache License Version 2.0, refer to the [LICENSE](https://github.com/grafana/business-forms/blob/main/LICENSE).
