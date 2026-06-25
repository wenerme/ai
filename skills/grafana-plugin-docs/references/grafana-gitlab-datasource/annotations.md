---
title: "GitLab annotations | Grafana Enterprise Plugins documentation"
description: "Use annotations with the GitLab data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GitLab annotations

Annotations overlay event markers on dashboard panels, helping you correlate GitLab activity with metric changes. For example, you can mark when commits, deployments, or releases occur to see how they affect system behavior.

The GitLab data source supports annotations using any of its resource types. You configure a standard GitLab query and map fields from the result to annotation properties.

For general information about annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Create an annotation query

To add GitLab annotations to a dashboard:

1. Navigate to **Dashboard settings** &gt; **Annotations**.
2. Click **Add annotation query**.
3. Enter a name for the annotation (for example, `Recent commits`).
4. Select your GitLab data source.
5. Select a **Resource Type** from the drop-down and configure the query fields as you would in the [query editor](/docs/plugins/grafana-gitlab-datasource/latest/query-editor/).
6. Under **Field mappings**, configure the following:

   - **Time:** Select the field to use as the annotation timestamp (for example, `authored_at` for commits or `created_at` for deployments).
   - **Text:** Select the field to use as the annotation text (for example, `author_name` for commits or `name` for releases).
7. Optionally, set a color using the **Color** picker.
8. Click **Apply** to save.

## Field mapping

The GitLab data source maps query result fields to annotation properties. You can customize which fields are used for each property:

Expand table

| Annotation property | Description                                                                                         | Example fields                              |
|---------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------|
| **Time**            | The timestamp for the annotation marker. If not set, the first time-type field is used.             | `authored_at`, `created_at`, `committed_at` |
| **Time end**        | An optional end timestamp to create a region annotation instead of a point.                         | `closed_at`, `finished_at`                  |
| **Title**           | The title displayed in the annotation tooltip header.                                               | `title`, `name`                             |
| **Text**            | The text displayed in the annotation tooltip body. If not set, the first string-type field is used. | `author_name`, `message`, `description`     |
| **Tags**            | Comma-separated values used as annotation tags.                                                     | `labels`                                    |

## Example: Annotate commits on a dashboard

To mark each commit as an annotation on your panels:

1. Add an annotation query with the GitLab data source.
2. Select resource type **Commits**.
3. Enter the **Project Id**.
4. Optionally, filter by branch using the **Ref** field.
5. Set **Time** to `authored_at`.
6. Set **Text** to `author_name`.

Each commit within the dashboard time range appears as a vertical marker on your panels.

## Example: Annotate deployments

To mark deployments on your panels:

1. Add an annotation query with the GitLab data source.
2. Select resource type **Deployments**.
3. Enter the **Project Id**.
4. Optionally, filter by **Status Query** (for example, `success` to show only successful deployments).
5. Set **Time** to `created_at`.
6. Set **Text** to `environment`.

## Example: Annotate releases

To mark releases on your panels:

1. Add an annotation query with the GitLab data source.
2. Select resource type **Releases**.
3. Enter the **Project Id**.
4. Set **Time** to `released_at`.
5. Set **Title** to `name`.
6. Set **Text** to `description`.

Each release within the dashboard time range appears as a marker, making it easy to correlate releases with changes in metrics.

## Example: Annotate merged merge requests

To mark merged merge requests on your panels:

1. Add an annotation query with the GitLab data source.
2. Select resource type **Merge Requests**.
3. Enter the **Project Id**.
4. Set **State** to `merged`.
5. Set **Time** to `merged_at`.
6. Set **Title** to `title`.
7. Set **Text** to `author`.

## Example: Annotate failed pipelines

To mark failed pipelines on your panels:

1. Add an annotation query with the GitLab data source.
2. Select resource type **Pipelines**.
3. Enter the **Project Id**.
4. Set **Status** to `failed`.
5. Set **Time** to `created_at`.
6. Set **Text** to `ref`.

Failed pipeline markers help you identify which branch or tag triggered a failure and correlate it with changes in your dashboards.
