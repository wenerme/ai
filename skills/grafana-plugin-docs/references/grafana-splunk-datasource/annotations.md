---
title: "Splunk annotations | Grafana Enterprise Plugins documentation"
description: "Use annotations with the Splunk data source to overlay events and alerts on Grafana graphs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk annotations

Annotations let you overlay Splunk events or fired alerts on Grafana graphs, providing context for changes, deployments, or incidents alongside your time-series data.

## Before you begin

- [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/).
- Understand [Grafana annotations](/docs/grafana/latest/dashboards/annotations/).

## Annotation sources

The Splunk data source supports two annotation sources:

Expand table

| Source                  | Description                                                           |
|-------------------------|-----------------------------------------------------------------------|
| **SPL search**          | Run an SPL query and use matching events as annotations.              |
| **Splunk fired alerts** | Display alerts that have fired in Splunk as annotations on the graph. |

## Create an annotation query

To add an annotation to a dashboard:

1. Navigate to your dashboard and click **Dashboard settings** (gear icon).
2. Click **Annotations** in the left menu.
3. Click **Add annotation query**.
4. Select the Splunk data source.
5. Choose the annotation mode (**Search** or **Events**) and configure the query using the fields described in the following sections.

## Annotation modes

The annotation editor provides two modes via a toggle at the top of the editor:

- **Search:** Use the raw SPL editor for annotation queries. Provides access to Namespace, Sample Ratio, and Limit options. The visual query builder isn’t available in the annotation editor.
- **Events:** A simplified editor with fields for SPL search, event text extraction, regular expression matching, and Splunk fired alerts.

### Search mode fields

Expand table

| Field            | Description                                                  |
|------------------|--------------------------------------------------------------|
| **Search**       | Enter an SPL query using the raw SPL editor.                 |
| **Namespace**    | Select the Splunk app context for the query.                 |
| **Sample Ratio** | Set a sampling ratio to reduce the volume of data processed. |
| **Limit**        | Adds `limit=value` to timechart parameters.                  |

### Events mode fields

Expand table

| Field                    | Description                                                                                                                                                    |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Search**               | Enter an SPL query that returns the events you want to display as annotations.                                                                                 |
| **Event field as text**  | Specify the field to use as annotation text. Default: `_raw`.                                                                                                  |
| **Regex**                | Extract part of a message using a regular expression. Uses the first capture group if present.                                                                 |
| **Or Splunk alert name** | Specify a Splunk alert name to retrieve fired alerts instead of running a search query. Leave blank to retrieve all fired alerts. Supports template variables. |

### Query routing behavior

When using Events mode, the annotation editor routes your query as follows:

Expand table

| Search field | Alert name field | Result                                                   |
|--------------|------------------|----------------------------------------------------------|
| Empty        | Empty            | Retrieves all fired alerts                               |
| Empty        | Set              | Retrieves the named fired alert                          |
| Set          | Empty            | Runs the SPL search query                                |
| Set          | Set              | Retrieves the named fired alert (alert takes precedence) |

When using Search mode, the SPL query runs directly. If the search field is empty, no request is sent.

## SPL search annotation examples

**Mark deployment events on a graph:**

spl [Copy code to clipboard] Copy

```spl
index=main sourcetype=deployment | fields _time, environment, version
```

**Annotate error spikes:**

spl [Copy code to clipboard] Copy

```spl
index=main log_level=ERROR | timechart span=5m count | where count > 100
```

**Show configuration changes:**

spl [Copy code to clipboard] Copy

```spl
index=_audit action=edit | fields _time, user, info
```

**Annotate Splunk system warnings:**

spl [Copy code to clipboard] Copy

```spl
index=_internal log_level=WARN component=SearchScheduler | fields _time, message
```

### Use Event field as text with Regex

To extract a specific portion of a log message for annotation text, combine **Event field as text** with **Regex**:

Expand table

| Setting                 | Value         |
|-------------------------|---------------|
| **Event field as text** | `_raw`        |
| **Regex**               | `ERROR: (.*)` |

This configuration extracts the text after `ERROR:` from the `_raw` field and uses it as the annotation label.

## Fired alerts

To display Splunk fired alerts as annotations, use the **Or Splunk alert name** field in Events mode.

- Enter a specific alert name (for example, `high_cpu_alert`) to show only that alert.
- Leave the field blank to display all fired alerts.
- Use template variables in the alert name for dynamic filtering (for example, `$alert_name`).

Fired alert annotations display the Splunk saved search name as the annotation title.

> Note
>
> Retrieving fired alerts requires the Splunk user to have the appropriate permissions. If you receive a “requires license feature” error, verify your Splunk license supports the fired alerts API. Refer to Splunk’s [Fired alerts](https://docs.splunk.com/Documentation/Splunk/latest/Alert/Viewtriggeredalerts) documentation for more information.

## Display options

After creating the annotation query, you can customize how annotations appear on the graph:

1. Set a **Name** for the annotation to identify it in the dashboard.
2. Choose a **Color** to distinguish different annotation types.
3. Toggle **Enabled** to show or hide the annotation.

For more information on configuring annotation display options, refer to [Annotations](/docs/grafana/latest/dashboards/annotations/).
