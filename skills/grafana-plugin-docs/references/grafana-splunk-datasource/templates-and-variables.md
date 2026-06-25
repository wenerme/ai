---
title: "Splunk templates and variables | Grafana Enterprise Plugins documentation"
description: "Use templates and variables with Splunk"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk templates and variables

To add a new Splunk query variable, see [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use Splunk data source as your data source.

Query with SPL (Search Processing Language) to return list of values, for example, with the `stats`command:

LOG [Copy code to clipboard] Copy

```log
index=os sourcetype="iostat" | stats values(Device)
```

The query returns a list of `Device` field values from `iostat` source. You can use these device names for time series queries or annotations.

There are two possible types of variable queries used in Grafana:

- A simple query (as present above) which returns a list of values
- A query that can create a key/value variable. The query returns two columns that are named `_text` and `_value`. The `_text` column value should be unique (if it is not unique then the first value is used). The options in the dropdown will have a text and value that allows you to have a friendly name as text and an id as the value.

This search returns a table with the columns `Name` (Docker container name) and `Id` (container id):

LOG [Copy code to clipboard] Copy

```log
source=docker_inspect | stats count latest(Name) as Name by Id | table Name, Id
```

In order to use the container name as a visible value for variable and the ID as it’s real value, modify the query as shown in the following example:

LOG [Copy code to clipboard] Copy

```log
source=docker_inspect | stats count latest(Name) as Name by Id | table Name, Id | rename Name as "_text", Id as "_value"
```

## Multi-value variables

You can use multi-value variables in queries. An interpolated search is dependent on variable usage context. There are a number of contexts that the Splunk plugin supports. In the example below, let’s assume there’s a variable `$container` with selected values `foo` and `bar`:

- Basic filter for `search` command

  LOG [Copy code to clipboard] Copy

  ```log
  source=docker_stats $container
  =>
  source=docker_stats (foo OR bar)
  ```
- Field-value filter

  LOG [Copy code to clipboard] Copy

  ```log
  source=docker_stats container_name=$container
  =>
  source=docker_stats (container_name=foo OR container_name=bar)
  ```
- Field-value filter with the `IN` operator and `in()` function

  LOG [Copy code to clipboard] Copy

  ```log
  source=docker_stats container_name IN ($container)
  =>
  source=docker_stats container_name IN (foo, bar)

  source=docker_stats | where container_name in($container)
  =>
  source=docker_stats | where container_name in(foo, bar)
  ```

## Multi-value variables and quotes

If variable is wrapped in quotes (both double or single), its values also will be quoted:

LOG [Copy code to clipboard] Copy

```log
source=docker_stats container_name="$container"
=>
source=docker_stats (container_name="foo" OR container_name="bar")

source=docker_stats container_name='$container'
=>
source=docker_stats (container_name='foo' OR container_name='bar')
```

After creating a variable it can be used in your Splunk queries by using [this syntax](/docs/grafana/latest/variables/syntax/).

For more information on working with variables in Grafana refer to [Variables](/docs/grafana/latest/dashboards/variables/#variables).
