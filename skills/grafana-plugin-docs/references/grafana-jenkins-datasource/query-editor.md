---
title: "Jenkins query editor | Grafana Enterprise Plugins documentation"
description: "Use the Jenkins query editor in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Jenkins query editor

This document explains how to use the Jenkins query editor to build queries and template variables.

## Before you begin

- Ensure you have [configured the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/configure/).
- Verify your credentials have permission to read the projects, nodes, and queues you want to query.

## Key concepts

If you’re new to Jenkins, these terms are used throughout the query editor:

Expand table

| Term            | Description                                                                                                             |
|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| **Project**     | A configured unit of work in Jenkins, also called a job or item, that defines the steps to build, test, or deploy code. |
| **Build**       | A single execution of a project, triggered manually, on a schedule, or by a code change.                                |
| **Build queue** | The list of build requests waiting for an available executor.                                                           |
| **Node**        | A machine, also called an agent, that connects to the Jenkins server and runs build tasks.                              |
| **Executor**    | A slot on a node that runs one build at a time. A node can have multiple executors.                                     |
| **Node label**  | A tag assigned to one or more nodes so that specific builds run only on nodes with that label.                          |

## Query types

Select a query type from the query editor to get started. The Jenkins data source supports the following query types:

- **Projects:** List all Jenkins projects and their status.
- **Project Builds:** List the builds for a selected project.
- **Build Queue:** List builds currently waiting in the build queue.
- **Nodes:** List all nodes connected to your Jenkins server.
- **Node Labels:** List the labels used to organize your Jenkins nodes.

## Create a query

To create a query:

1. Select the **Jenkins** data source.
2. Select a query type from the query type selector.
3. For a **Project Builds** query, select a project.

### Projects

A project, also known as a job or item, is the core building block in the Jenkins automation server. It holds the configuration for Jenkins to perform specific tasks in CI/CD pipelines, such as building code, running tests, or deploying applications.

The `Projects` query returns a list of all Jenkins projects with information such as name, URL, current status, and whether it can be built. You also get details about its first, last, and most recent successful, failed, or unstable builds, along with information like the next build number and whether it’s currently disabled.

The query returns the following fields:

Expand table

| Field                                                     | Description                                                                                                                 |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `Name`                                                    | The short name of the project.                                                                                              |
| `FullName`                                                | The full name of the project, including any parent folders.                                                                 |
| `FullDisplayName`                                         | The full display name of the project, including any parent folders.                                                         |
| `URL`                                                     | The URL of the project in Jenkins.                                                                                          |
| `Color`                                                   | The status color of the project, which encodes the last build result, for example, `blue` for success or `red` for failure. |
| `Buildable`                                               | Whether the project can currently be built.                                                                                 |
| `InQueue`                                                 | Whether the project currently has a build waiting in the queue.                                                             |
| `KeepDependencies`                                        | Whether Jenkins keeps builds that are dependencies of other builds.                                                         |
| `FirstBuildNumber`, `FirstBuildUrl`                       | The number and URL of the project’s first build.                                                                            |
| `LastBuildNumber`, `LastBuildUrl`                         | The number and URL of the most recent build.                                                                                |
| `LastCompletedBuildNumber`, `LastCompletedBuildUrl`       | The number and URL of the most recent completed build.                                                                      |
| `LastFailedBuildNumber`, `LastFailedBuildUrl`             | The number and URL of the most recent failed build.                                                                         |
| `LastStableBuildNumber`, `LastStableBuildUrl`             | The number and URL of the most recent stable build.                                                                         |
| `LastSuccessfulBuildNumber`, `LastSuccessfulBuildUrl`     | The number and URL of the most recent successful build.                                                                     |
| `LastUnstableBuildNumber`, `LastUnstableBuildUrl`         | The number and URL of the most recent unstable build.                                                                       |
| `LastUnsuccessfulBuildNumber`, `LastUnsuccessfulBuildUrl` | The number and URL of the most recent unsuccessful build.                                                                   |
| `NextBuildNumber`                                         | The number that Jenkins assigns to the next build.                                                                          |
| `ConcurrentBuild`                                         | Whether the project allows concurrent builds.                                                                               |
| `Disabled`                                                | Whether the project is disabled.                                                                                            |

### Project builds

A project build, or simply build, is a single execution of a configured Jenkins project. Triggered manually, on schedule, or by code changes, each build independently runs the project’s defined steps, including SCM operations, build commands, and post-build actions.

The `Project Builds` query returns a list of all project builds with information such as its unique number, when it started, its display name, and a direct URL to view its results. You also find out whether the build is currently running, its duration, and the estimated time it would take. The query also shows the result of the build (success or failure) and the agent it ran on.

This query requires you to select a project, and it returns only the builds that started within the dashboard time range. It also includes a derived `FailedSince` field that reports when a run of consecutive failures began, which is useful for tracking time to restore service. The other query types aren’t affected by the dashboard time range.

The query returns the following fields:

Expand table

| Field               | Description                                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------------------|
| `Timestamp`         | The time the build started.                                                                                           |
| `Number`            | The build number.                                                                                                     |
| `Description`       | The build description, if set.                                                                                        |
| `DisplayName`       | The display name of the build, for example, `#42`.                                                                    |
| `FullDisplayName`   | The full display name of the build, including the project name.                                                       |
| `URL`               | The URL of the build in Jenkins.                                                                                      |
| `Building`          | Whether the build is currently running.                                                                               |
| `InProgress`        | Whether the build is in progress.                                                                                     |
| `QueueID`           | The ID of the queue item the build came from.                                                                         |
| `Duration`          | How long the build took, in milliseconds.                                                                             |
| `EstimatedDuration` | The estimated build duration, in milliseconds.                                                                        |
| `Result`            | The build result, for example, `SUCCESS`, `FAILURE`, `UNSTABLE`, or `ABORTED`.                                        |
| `FailedSince`       | For a failing build, the time the current run of consecutive failures began. Empty for successful and aborted builds. |
| `BuiltOn`           | The name of the node, or agent, that ran the build.                                                                   |

### Build queue

The Jenkins build queue manages and prioritizes build requests waiting for available resources. When a project build is triggered but no executors are free, the request enters this waiting room. This ensures builds run in turn, and administrators can track pending tasks and workload.

The `Build Queue` query returns a list of all builds currently waiting in the build queue. For each build, you see its unique ID, whether it’s currently buildable or blocked, whether it’s been canceled or is stuck, and how long it’s been in the queue. It also tells you why it’s waiting, the name of the project it belongs to, and a URL to view more details.

The query returns the following fields:

Expand table

| Field            | Description                                                                              |
|------------------|------------------------------------------------------------------------------------------|
| `ID`             | The unique ID of the queue item.                                                         |
| `ProjectName`    | The name of the project waiting to build.                                                |
| `ProjectURL`     | The URL of the project in Jenkins.                                                       |
| `ProjectColor`   | The status color of the project.                                                         |
| `Buildable`      | Whether the item is ready to build once an executor is free.                             |
| `Blocked`        | Whether the item is blocked from building.                                               |
| `Cancelled`      | Whether the item has been canceled.                                                      |
| `Stuck`          | Whether Jenkins considers the item stuck, for example, waiting far longer than expected. |
| `Pending`        | Whether the item is pending.                                                             |
| `BuildableSince` | The time the item became buildable.                                                      |
| `InQueueSince`   | The time the item entered the queue.                                                     |
| `Params`         | Any build parameters associated with the item.                                           |
| `Why`            | The reason the item is still waiting.                                                    |

### Nodes

A Jenkins node, also known as an agent, is a machine (physical or virtual) that connects to the main Jenkins server and executes build tasks.

The `Nodes` query returns a list of all nodes connected to your Jenkins server. For each node, you see its name, description, assigned labels (for categorizing it), and the number of tasks it can run at once. It also tells you whether the node is idle or offline, and if offline, the reason why.

The query returns the following fields:

Expand table

| Field                                                                                                                                                                     | Description                                                                                  |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `DisplayName`                                                                                                                                                             | The name of the node.                                                                        |
| `Description`                                                                                                                                                             | The node description, if set.                                                                |
| `Icon`                                                                                                                                                                    | The icon Jenkins uses to represent the node’s status.                                        |
| `AssignedLabels`                                                                                                                                                          | A comma-separated list of labels assigned to the node.                                       |
| `NumExecutors`                                                                                                                                                            | The number of executors, or concurrent build slots, on the node.                             |
| `Idle`                                                                                                                                                                    | Whether the node is currently idle.                                                          |
| `AvailableExecutorsSec10`, `BusyExecutorsSec10`, `ConnectingExecutorsSec10`, `DefinedExecutorsSec10`, `IdleExecutorsSec10`, `OnlineExecutorsSec10`, `TotalExecutorsSec10` | Executor load statistics for the node, reported as the latest value over a 10-second window. |
| `QueueLengthSec10`                                                                                                                                                        | The queue length for the node, reported as the latest value over a 10-second window.         |
| `JnlpAgent`                                                                                                                                                               | Whether the node connects as a JNLP agent.                                                   |
| `LaunchSupported`                                                                                                                                                         | Whether Jenkins can launch the node’s agent.                                                 |
| `ManualLaunchAllowed`                                                                                                                                                     | Whether the agent can be launched manually.                                                  |
| `Offline`                                                                                                                                                                 | Whether the node is offline.                                                                 |
| `OfflineCauseReason`                                                                                                                                                      | The reason the node is offline, if applicable.                                               |
| `TemporarilyOffline`                                                                                                                                                      | Whether the node is temporarily offline.                                                     |

### Node labels

A Jenkins node label is a custom tag or category assigned to a Jenkins node, allowing you to run specific builds only on nodes that have that label.

The `Node Labels` query returns a list of node labels used to organize your Jenkins nodes. For each label, you see its name, how many executors (slots for running tasks) are currently busy or idle, and the total number available under that label. It also indicates whether any nodes associated with that label are offline, and lists the names of the nodes themselves.

The query returns the following fields:

Expand table

| Field                                                                                                                                                                     | Description                                                                                   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `Name`                                                                                                                                                                    | The name of the label.                                                                        |
| `Nodes`                                                                                                                                                                   | A comma-separated list of the nodes that have this label.                                     |
| `AvailableExecutorsSec10`, `BusyExecutorsSec10`, `ConnectingExecutorsSec10`, `DefinedExecutorsSec10`, `IdleExecutorsSec10`, `OnlineExecutorsSec10`, `TotalExecutorsSec10` | Executor load statistics for the label, reported as the latest value over a 10-second window. |
| `QueueLengthSec10`                                                                                                                                                        | The queue length for the label, reported as the latest value over a 10-second window.         |
| `Offline`                                                                                                                                                                 | Whether any node with this label is offline.                                                  |

## Example use cases

The following examples show common ways to combine query types with panels and transformations.

### Show a project status overview

Use a **Projects** query with a table or stat panel to see the health of every project at a glance:

1. Add a panel and select the **Projects** query type.
2. Use a **Table** visualization to list projects, or a **Stat** visualization keyed on the `Color` or `Disabled` field to highlight broken or disabled projects.
3. Optionally, add an [Organize fields transformation](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to hide the build-number and URL fields you don’t need.

### Track build results over time

Use a **Project Builds** query to visualize how a project’s builds trend across the dashboard time range:

1. Add a panel and select the **Project Builds** query type.
2. Select a project, or set the project field to a [template variable](/docs/plugins/grafana-jenkins-datasource/latest/template-variables/) such as `$project`.
3. Use a **State timeline** visualization on the `Result` field to see successes and failures over time, or a **Time series** visualization on `Duration` to spot builds that are getting slower.
4. Expand the dashboard time range to include the builds you want to analyze.

### Measure time to restore service

Use the derived `FailedSince` field from a **Project Builds** query to support the DORA time-to-restore metric:

1. Add a **Project Builds** query for the project you want to measure.
2. Add a **Stat** or **Time series** visualization on the `FailedSince` field to show when the most recent run of failures began.

### Monitor the build queue

Use a **Build Queue** query to surface work that’s waiting on capacity:

1. Add a panel and select the **Build Queue** query type.
2. Use a **Table** visualization to list queued items, and display the `Why`, `Stuck`, and `Blocked` fields to explain why each item is waiting.
3. Add a **Stat** panel with a **Reduce** calculation such as **Count** to alert your team when the queue grows.

### Monitor node and executor capacity

Use **Nodes** and **Node Labels** queries to track agent availability:

1. Add a panel and select the **Nodes** query type to list agents and their online or offline status.
2. Add a second panel with the **Node Labels** query type to compare busy and idle executors per label, which helps you find labels that are starved for capacity.

## Next steps

- [Use template variables with the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/template-variables/)
- [Troubleshoot the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/troubleshooting/)
- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
