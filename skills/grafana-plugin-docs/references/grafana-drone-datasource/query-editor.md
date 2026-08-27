---
title: "Drone query editor | Grafana Enterprise Plugins documentation"
description: "Use the Drone query editor to retrieve repository and build data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Drone query editor

This document explains how to use the Drone query editor to build queries against your Drone repositories and builds.

## Before you begin

- Ensure you’ve [configured the Drone data source](/docs/plugins/grafana-drone-datasource/latest/configure/).
- Verify your Drone API token has access to the repositories you want to query.

## Query actions

Select the query type with the **Action** selector. The query editor supports the following actions:

- `Repo List`: Returns the active repositories registered to Drone.
- `Repo Info`: Returns the details of a single repository.
- `Build List`: Returns the recent builds for a repository.
- `Build Info`: Returns the details of a single build.

The repository drop-downs include only repositories that are active in Drone. Inactive repositories are filtered out.

## Get the repository list

The `Repo List` action returns the active repositories registered to Drone. It takes no parameters.

To create a `Repo List` query:

1. Select the **Drone** data source.
2. Select `Repo List` from the **Action** selector.

## Get repository details

The `Repo Info` action returns the details of a single repository.

To create a `Repo Info` query:

1. Select the **Drone** data source.
2. Select `Repo Info` from the **Action** selector.
3. Select a repository.

Expand table

| Field          | Description                                                                         |
|----------------|-------------------------------------------------------------------------------------|
| **Repository** | Required. The repository to query. The drop-down lists active repositories by name. |

## Get the build list

The `Build List` action returns the recent builds for a repository.

To create a `Build List` query:

1. Select the **Drone** data source.
2. Select `Build List` from the **Action** selector.
3. Select a repository.

Expand table

| Field          | Description                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------------|
| **Repository** | Required. The repository whose builds you want to return. The drop-down lists active repositories by name. |

> Note
>
> The `Build List` action returns at most the 100 most recent builds, not all builds for the repository.

## Get a specific build

The `Build Info` action returns the details of a single build.

To create a `Build Info` query:

1. Select the **Drone** data source.
2. Select `Build Info` from the **Action** selector.
3. Select a repository.
4. Select or enter a build number.

Expand table

| Field            | Description                                                                                        |
|------------------|----------------------------------------------------------------------------------------------------|
| **Repository**   | Required. The repository that contains the build. The drop-down lists active repositories by name. |
| **Build number** | Required. The build to query. This field appears after you select a repository.                    |

> Note
>
> The **Build number** drop-down contains at most 100 recent builds, but you can type in a build number that isn’t in the list, and the plugin returns data for that build.

## Data reference

Repository and build queries return the fields provided by the Drone API. The following tables describe the most useful fields for building panels, transformations, and template variables. The plugin converts timestamp fields from epoch seconds to Grafana time values.

### Repository fields

The `Repo List` and `Repo Info` actions return these fields:

Expand table

| Field     | Description                                                                                                                     |
|-----------|---------------------------------------------------------------------------------------------------------------------------------|
| `slug`    | The repository identifier in `owner/name` form. Use this value when you reference a repository, such as in a template variable. |
| `name`    | The repository name.                                                                                                            |
| `created` | The time the repository was registered in Drone.                                                                                |
| `updated` | The time the repository record was last updated.                                                                                |
| `synced`  | The time Drone last synced the repository.                                                                                      |

### Build fields

The `Build List` and `Build Info` actions return these fields, among others:

Expand table

| Field          | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `number`       | The build number, unique within the repository.                               |
| `status`       | The build outcome, such as `success`, `failure`, `running`, or `killed`.      |
| `event`        | The event that triggered the build, such as `push`, `pull_request`, or `tag`. |
| `source`       | The source branch.                                                            |
| `target`       | The target branch.                                                            |
| `ref`          | The Git reference for the build.                                              |
| `message`      | The commit message.                                                           |
| `author_login` | The commit author’s username.                                                 |
| `author_name`  | The commit author’s display name.                                             |
| `link`         | A link to the build’s source.                                                 |
| `trigger`      | The user or system that triggered the build.                                  |
| `started`      | The time the build started.                                                   |
| `finished`     | The time the build finished.                                                  |
| `created`      | The time the build was created.                                               |
| `updated`      | The time the build was last updated.                                          |

> Note
>
> The exact set of build fields depends on your Drone version and the event that triggered the build. To compute build duration, subtract `started` from `finished` with a transformation.

## Query examples

The following examples show common query configurations and the panels that best suit them.

### Example: Audit active repositories

To list every repository registered to Drone:

1. Select the **Drone** data source.
2. Select `Repo List` from the **Action** selector.

This query returns one row per active repository, including its name, slug, and `created`, `updated`, and `synced` timestamps. Use a **Table** panel to review which repositories are registered and when they were last synced.

### Example: Track recent build activity for a repository

To review the most recent builds for a repository:

1. Select the **Drone** data source.
2. Select `Build List` from the **Action** selector.
3. Select a repository.

This query returns up to the 100 most recent builds with their `status` and `started`, `finished`, `created`, and `updated` timestamps. Use a **Table** panel to browse the builds, and sort by `started` to see the latest activity first.

### Example: Visualize build status distribution

To see how many builds succeed compared to those that fail:

1. Create a `Build List` query for a repository, as shown in the previous example.
2. Add a [Group by](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#group-by) transformation on the `status` field and calculate a count.
3. Visualize the result in a **Pie chart** or **Bar chart** panel.

### Example: Calculate build duration

To measure how long builds take:

1. Create a `Build List` query for a repository.
2. Add an [Add field from calculation](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#add-field-from-calculation) transformation that subtracts `started` from `finished`.
3. Visualize the result in a **Time series** or **Table** panel.

### Example: Inspect a single build

To drill into the details of one build:

1. Select the **Drone** data source.
2. Select `Build Info` from the **Action** selector.
3. Select a repository.
4. Select or enter a build number.

This query returns the full details for a single build, which is useful for a focused **Stat** or **Table** panel, or as a target when you drill down from a `Build List` panel.

## Use cases

The following scenarios show how to combine these queries into useful dashboards. Because the data source doesn’t support alerting, use dashboard panels to monitor CI activity visually.

### Monitor repository CI health

Build a dashboard that surfaces the state of a repository’s pipeline:

- **Recent builds panel**: Use `Build List` in a **Table** panel to show the latest builds and their status.
- **Success rate panel**: Use `Build List` with a Group by transformation on `status` to show the success-to-failure ratio in a **Pie chart**.
- **Build duration panel**: Use `Build List` with a calculated `finished` minus `started` field to track how build times trend.

### Correlate builds with other signals

Use [annotations](/docs/plugins/grafana-drone-datasource/latest/annotations/) to overlay Drone build events on panels from other data sources. This helps you correlate deployments and CI activity with changes in application metrics, such as error rates or latency.

## Known limitations

- The `Build List` action returns at most the 100 latest builds, not all builds.
- The data source doesn’t support alerting.
