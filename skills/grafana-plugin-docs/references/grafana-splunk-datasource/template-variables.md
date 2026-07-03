---
title: "Splunk template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Splunk data source to create dynamic dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk template variables

Template variables let you create dynamic, reusable dashboards by replacing hardcoded values with user-selectable options. Use them with the Splunk data source to parameterize indexes, sourcetypes, hostnames, and other query values.

## Before you begin

- [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Create a query variable

To add a new Splunk query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Select the Splunk data source as your data source.

The variable query editor provides the following fields:

Expand table

| Field         | Description                                       |
|---------------|---------------------------------------------------|
| **Search**    | Enter an SPL query that returns a list of values. |
| **Namespace** | Select the Splunk app context for the query.      |

### Simple query variable

Query with SPL to return a list of values. For example, use the `stats` command:

spl [Copy code to clipboard] Copy

```spl
index=os sourcetype="iostat" | stats values(Device)
```

This query returns a list of `Device` field values from the `iostat` source. You can use these device names in time-series queries or annotations.

### Key/value variable

A key/value variable returns two columns named `_text` and `_value`. The `_text` column value should be unique (if it isn’t unique, the first value is used). The drop-down displays the `_text` value while using the `_value` in queries.

> Note
>
> The variable drop-down displays values from the first string column in the query results. Ensure `_text` appears as the first column in your `table` command output for the display name to render correctly.

This search returns a table with the columns `Name` (Docker container name) and `Id` (container id):

spl [Copy code to clipboard] Copy

```spl
source=docker_inspect | stats count latest(Name) as Name by Id | table Name, Id
```

To use the container name as the visible value and the ID as its real value, modify the query:

spl [Copy code to clipboard] Copy

```spl
source=docker_inspect | stats count latest(Name) as Name by Id | table Name, Id | rename Name as "_text", Id as "_value"
```

### Common variable query examples

**List all indexes:**

spl [Copy code to clipboard] Copy

```spl
| eventcount summarize=false index=* | dedup index | fields index
```

**List all sourcetypes in an index:**

spl [Copy code to clipboard] Copy

```spl
index=main | stats count by sourcetype | fields sourcetype
```

**List all hosts reporting to a specific index:**

spl [Copy code to clipboard] Copy

```spl
index=os | stats count by host | fields host
```

**List Kubernetes namespaces:**

spl [Copy code to clipboard] Copy

```spl
index=em_metrics | stats count by namespace | fields namespace
```

**Create a cascading variable (sourcetypes filtered by a selected index):**

spl [Copy code to clipboard] Copy

```spl
index=$index_variable | stats count by sourcetype | fields sourcetype
```

## Multi-value variables

You can use multi-value variables in queries. The Splunk plugin interpolates variables differently depending on usage context. In the following examples, assume there’s a variable `$container` with selected values `foo` and `bar`:

- Basic filter for `search` command

spl [Copy code to clipboard] Copy

```spl
source=docker_stats $container
=>
source=docker_stats (foo OR bar)
```

- Field-value filter

spl [Copy code to clipboard] Copy

```spl
source=docker_stats container_name=$container
=>
source=docker_stats (container_name=foo OR container_name=bar)
```

- Field-value filter with the `IN` operator

spl [Copy code to clipboard] Copy

```spl
source=docker_stats container_name IN ($container)
=>
source=docker_stats container_name IN (foo, bar)
```

> Note
>
> Multi-value interpolation for the `IN` operator requires uppercase `IN` with a space before the opening parenthesis. The lowercase `in()` function used in `where` clauses doesn’t support multi-value expansion.

## Multi-value variables and quotes

If a variable is wrapped in quotes (either double or single), its values are also quoted:

spl [Copy code to clipboard] Copy

```spl
source=docker_stats container_name="$container"
=>
source=docker_stats (container_name="foo" OR container_name="bar")

source=docker_stats container_name='$container'
=>
source=docker_stats (container_name='foo' OR container_name='bar')
```

## Use variables in queries

After creating a variable, you can use it in your Splunk queries using [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

For more information on working with variables in Grafana, refer to [Variables](/docs/grafana/latest/dashboards/variables/).
