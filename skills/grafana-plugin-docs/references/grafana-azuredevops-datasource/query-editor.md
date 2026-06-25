---
title: "Azure DevOps query editor | Grafana Enterprise Plugins documentation"
description: "Use the Azure DevOps query editor to retrieve data about projects, repositories, pull requests, builds, pipelines, and releases."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure DevOps query editor

This document explains how to use the Azure DevOps query editor to retrieve and visualize data from Azure DevOps.

## Before you begin

- [Configure the Azure DevOps data source](/docs/plugins/grafana-azuredevops-datasource/latest/configure/).
- Verify your personal access token has the required [PAT scopes](/docs/plugins/grafana-azuredevops-datasource/latest/configure/#required-pat-scopes).

## Key concepts

If you’re new to Azure DevOps, the following terms are used throughout this documentation:

Expand table

| Term                   | Description                                                                                             |
|------------------------|---------------------------------------------------------------------------------------------------------|
| **Project**            | A container for source code, builds, releases, and other resources within an Azure DevOps organization. |
| **Repository**         | A Git repository within a project.                                                                      |
| **Pull request**       | A code review request to merge changes from one branch into another.                                    |
| **Build**              | A single execution of a build pipeline, producing artifacts from source code.                           |
| **Build definition**   | The configuration template that defines how a build pipeline runs.                                      |
| **Pipeline**           | A YAML-based CI/CD pipeline definition.                                                                 |
| **Pipeline run**       | A single execution of a YAML pipeline.                                                                  |
| **Release**            | A deployment of artifacts to one or more environments using the classic release pipeline.               |
| **Release definition** | The configuration template for a classic release pipeline.                                              |
| **Release deployment** | A single deployment operation within a release to a specific environment.                               |

## Query types

The query editor supports the following query types. Select a query type from the **Query Type** drop-down to configure the query.

- **Projects:** List all projects in your organization.
- **Repositories:** List Git repositories.
- **Pull Requests:** List pull requests for a project.
- **Builds:** List builds for a project, scoped to the dashboard time range.
- **Build Definitions:** List build pipeline definitions for a project.
- **Pipelines:** List YAML pipelines for a project.
- **Pipeline Runs:** List runs for a specific pipeline.
- **Releases:** List releases for a project, scoped to the dashboard time range.
- **Release Definitions:** List release pipeline definitions for a project.
- **Release Deployments:** List deployments for a project, scoped to the dashboard time range.

### Common fields

Most query types require a **Project** selection. The **Project** drop-down lists all projects accessible to your PAT. You can also select dashboard template variables from the drop-down.

## Create a query

Each query type has its own set of fields. The following sections describe the available fields for each query type.

### Projects

The Projects query type returns a list of all projects in the organization accessible to the configured PAT. No additional fields are required.

### Repositories

The Repositories query type returns a list of Git repositories.

Expand table

| Field       | Required | Description                                                                                        |
|-------------|----------|----------------------------------------------------------------------------------------------------|
| **Project** | No       | Filter repositories to a specific project. If empty, returns repositories across the organization. |

### Pull requests

The Pull Requests query type returns pull requests for a specified project.

Expand table

| Field             | Required | Description                                                                                            |
|-------------------|----------|--------------------------------------------------------------------------------------------------------|
| **Project**       | Yes      | The project to retrieve pull requests from.                                                            |
| **Repository**    | No       | Filter pull requests to a specific repository.                                                         |
| **Creator Id**    | No       | Filter to pull requests created by this identity.                                                      |
| **Reviewer ID**   | No       | Filter to pull requests where this identity is a reviewer.                                             |
| **Status**        | No       | Filter by status: `All`, `Active`, `Completed`, `Not Set`, or `Abandoned`. Defaults to `All` if unset. |
| **Repository ID** | No       | Filter to pull requests whose source branch is in this source repository.                              |
| **Source Ref**    | No       | Filter to pull requests from this source branch.                                                       |
| **Target Ref**    | No       | Filter to pull requests targeting this branch.                                                         |

### Builds

The Builds query type returns builds for a specified project. Results are automatically scoped to the dashboard time range using the `minTime` and `maxTime` API parameters.

Expand table

| Field             | Required | Description                                                                                                                                                                                                                              |
|-------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Project**       | Yes      | The project to retrieve builds from.                                                                                                                                                                                                     |
| **Reason**        | No       | Filter by build reason: `all`, `batchedCI`, `buildCompletion`, `checkInShelveset`, `individualCI`, `manual`, `none`, `pullRequest`, `resourceTrigger`, `schedule`, `scheduleForced`, `triggered`, `userCreated`, or `validateShelveset`. |
| **Result**        | No       | Filter by build result: `canceled`, `failed`, `none`, `partiallySucceeded`, or `succeeded`.                                                                                                                                              |
| **Status**        | No       | Filter by build status: `all`, `cancelling`, `completed`, `inProgress`, `none`, `notStarted`, or `postponed`.                                                                                                                            |
| **Repo ID**       | No       | Filter to builds from this repository.                                                                                                                                                                                                   |
| **Repo Type**     | No       | Filter to builds from repositories of this type.                                                                                                                                                                                         |
| **Branch**        | No       | Filter to builds from this branch.                                                                                                                                                                                                       |
| **Build number**  | No       | Filter to builds matching this build number. Append `*` for prefix matching.                                                                                                                                                             |
| **Build IDs**     | No       | Comma-separated list of build IDs to retrieve.                                                                                                                                                                                           |
| **Definitions**   | No       | Comma-separated list of definition IDs to filter by.                                                                                                                                                                                     |
| **Query Order**   | No       | Sort order: `finishTimeAscending`, `finishTimeDescending`, `queueTimeAscending`, `queueTimeDescending`, `startTimeAscending`, or `startTimeDescending`.                                                                                  |
| **Tags**          | No       | Comma-separated list of tags. Returns only builds that have these tags.                                                                                                                                                                  |
| **Requested For** | No       | Filter to builds requested by this user.                                                                                                                                                                                                 |

### Build definitions

The Build Definitions query type returns build pipeline definitions for a specified project.

Expand table

| Field              | Required | Description                                                                                                                      |
|--------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| **Project**        | Yes      | The project to retrieve build definitions from.                                                                                  |
| **Name**           | No       | Filter to definitions whose names match this pattern.                                                                            |
| **Path**           | No       | Filter to definitions under this folder path.                                                                                    |
| **Yaml File Name** | No       | Filter to YAML definitions matching this filename.                                                                               |
| **repositoryId**   | No       | Filter to definitions that use this repository.                                                                                  |
| **repositoryType** | No       | Filter to definitions with this repository type.                                                                                 |
| **taskIdFilter**   | No       | Filter to definitions that use this task.                                                                                        |
| **queryOrder**     | No       | Sort order: `definitionNameAscending`, `definitionNameDescending`, `lastModifiedAscending`, `lastModifiedDescending`, or `none`. |
| **processType**    | No       | Filter to definitions with this process type.                                                                                    |
| **definitionIds**  | No       | Comma-separated list of definition IDs to retrieve.                                                                              |

### Pipelines

The Pipelines query type returns YAML pipelines for a specified project. No additional filter fields are available.

Expand table

| Field       | Required | Description                             |
|-------------|----------|-----------------------------------------|
| **Project** | Yes      | The project to retrieve pipelines from. |

### Pipeline runs

The Pipeline Runs query type returns runs for a specific pipeline.

Expand table

| Field        | Required | Description                          |
|--------------|----------|--------------------------------------|
| **Project**  | Yes      | The project containing the pipeline. |
| **Pipeline** | Yes      | The pipeline to retrieve runs from.  |

### Releases

The Releases query type returns releases for a specified project. Results are automatically scoped to the dashboard time range using the `minCreatedTime` and `maxCreatedTime` API parameters.

Expand table

| Field                       | Required | Description                                                                                                  |
|-----------------------------|----------|--------------------------------------------------------------------------------------------------------------|
| **Project**                 | Yes      | The project to retrieve releases from.                                                                       |
| **Search Text**             | No       | Filter to releases with names containing this text.                                                          |
| **Status**                  | No       | Filter by status: `abandoned`, `active`, `draft`, or `undefined`.                                            |
| **Created By**              | No       | Filter to releases created by this user.                                                                     |
| **Query Order**             | No       | Sort order by created date: `ascending` or `descending`. Default: `descending`.                              |
| **definitionId**            | No       | Filter to releases from this release definition ID.                                                          |
| **definitionEnvironmentId** | No       | Filter to releases with this definition environment ID.                                                      |
| **environmentStatusFilter** | No       | Filter by environment status.                                                                                |
| **Top**                     | No       | Maximum number of releases to return. Default: `50`.                                                         |
| **sourceId**                | No       | Filter by artifact source identifier (for example, `{projectGuid}:{BuildDefinitionId}` for build artifacts). |
| **artifactTypeId**          | No       | Filter by artifact type: `Build`, `Jenkins`, `GitHub`, `Nuget`, `Git`, `TFVC`, and others.                   |
| **artifactVersionId**       | No       | Filter by artifact version (for example, the build ID for build artifacts).                                  |
| **sourceBranchFilter**      | No       | Filter to releases from this source branch.                                                                  |
| **path**                    | No       | Filter to releases under this folder path.                                                                   |
| **tagFilter**               | No       | Comma-separated list of tags. Returns only releases with these tags.                                         |
| **releaseIdFilter**         | No       | Comma-separated list of release IDs to retrieve.                                                             |

### Release definitions

The Release Definitions query type returns release pipeline definitions for a specified project. No additional filter fields are available.

Expand table

| Field       | Required | Description                                       |
|-------------|----------|---------------------------------------------------|
| **Project** | Yes      | The project to retrieve release definitions from. |

### Release deployments

The Release Deployments query type returns deployments for a specified project. Results are automatically scoped to the dashboard time range using the `minStartedTime` and `maxStartedTime` API parameters.

Expand table

| Field                         | Required | Description                                                                                                                                                                                                                                                                                                                                             |
|-------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Project**                   | Yes      | The project to retrieve deployments from.                                                                                                                                                                                                                                                                                                               |
| **Created By**                | No       | Filter to deployments created by this user.                                                                                                                                                                                                                                                                                                             |
| **Created For**               | No       | Filter to deployments created for this user.                                                                                                                                                                                                                                                                                                            |
| **Last attempt only**         | No       | When enabled, return only the latest deployment attempt for each environment.                                                                                                                                                                                                                                                                           |
| **Source branch**             | No       | Filter to deployments from this source branch.                                                                                                                                                                                                                                                                                                          |
| **Definition Id**             | No       | Filter to deployments from this release definition.                                                                                                                                                                                                                                                                                                     |
| **Definition Environment Id** | No       | Filter to deployments for this environment within the release definition.                                                                                                                                                                                                                                                                               |
| **Deployment status**         | No       | Filter by deployment status.                                                                                                                                                                                                                                                                                                                            |
| **Operation status**          | No       | Filter by operation status: `all`, `approved`, `canceled`, `cancelling`, `deferred`, `evaluatingGates`, `gateFailed`, `manualInterventionPending`, `pending`, `phaseCanceled`, `phaseFailed`, `phaseInProgress`, `phasePartiallySucceeded`, `phaseSucceeded`, `queued`, `queuedForAgent`, `queuedForPipeline`, `rejected`, `scheduled`, or `undefined`. |
| **Query order**               | No       | Sort order: `ascending` or `descending`.                                                                                                                                                                                                                                                                                                                |
| **Top**                       | No       | Maximum number of deployments to return.                                                                                                                                                                                                                                                                                                                |

## Use cases

The following examples show how to configure the query editor for common monitoring scenarios.

### Track CI build health

To monitor build success and failure rates for a project over time:

1. Select **Builds** as the query type.
2. Select your project from the **Project** drop-down.
3. Set **Result** to `failed` to focus on failures (or leave empty to see all results).
4. Set **Query Order** to `finishTimeDescending` to see the most recent builds first.

The dashboard time range automatically scopes the results, so you can adjust it to view builds from the last hour, day, or week.

To compare build health across multiple definitions, add a second query with a different **Definitions** filter.

### Monitor open pull requests

To track active pull requests awaiting review:

1. Select **Pull Requests** as the query type.
2. Select your project from the **Project** drop-down.
3. Set **Status** to `Active`.
4. Optionally set **Repository** to focus on a specific repository.

To find pull requests assigned to a specific reviewer, enter their identity in the **Reviewer ID** field.

### Track deployment frequency and status

To monitor how often deployments happen and whether they succeed:

1. Select **Release Deployments** as the query type.
2. Select your project from the **Project** drop-down.
3. Set **Last attempt only** to on to avoid counting retries.
4. Set **Query order** to `descending` to see the most recent deployments first.

To filter to a specific release pipeline, enter its ID in the **Definition Id** field. To focus on failures, set **Operation status** to `phaseFailed`.

### Monitor pipeline run duration

To track how long pipeline runs take over time:

1. Select **Pipeline Runs** as the query type.
2. Select your project from the **Project** drop-down.
3. Select the pipeline from the **Pipeline** drop-down.

Use [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to calculate durations from the returned start and finish timestamps.

### View repository inventory

To get an overview of all repositories in a project:

1. Select **Repositories** as the query type.
2. Select your project from the **Project** drop-down.

Leave the **Project** field empty to list repositories across the entire organization. This is useful for org-level dashboards that track repository count and activity.

### Audit build definitions

To find build pipeline configurations matching specific criteria:

1. Select **Build Definitions** as the query type.
2. Select your project from the **Project** drop-down.
3. Optionally set **Name** to filter definitions by name pattern.
4. Optionally set **Path** to focus on definitions under a specific folder (for example, `\production`).

To find YAML-based pipelines, enter the pipeline filename in the **Yaml File Name** field. To sort by most recently updated, set **queryOrder** to `lastModifiedDescending`.

### Audit releases by branch

To review releases from a specific source branch:

1. Select **Releases** as the query type.
2. Select your project from the **Project** drop-down.
3. Enter the branch name in the **sourceBranchFilter** field (for example, `refs/heads/main`).
4. Set **Top** to limit the number of results.

To narrow results further, set **Status** to `active` or use **tagFilter** to find releases with specific tags.

## Use template variables in queries

The **Project** and **Repository** drop-downs in the query editor include dashboard template variables as selectable options. This lets you create dynamic dashboards where the project or repository is controlled by a variable selector. For more information, refer to [Template variables](/docs/plugins/grafana-azuredevops-datasource/latest/template-variables/).

## Next steps

- [Use annotations](/docs/plugins/grafana-azuredevops-datasource/latest/annotations/) to overlay Azure DevOps events on dashboard panels.
- [Use template variables](/docs/plugins/grafana-azuredevops-datasource/latest/template-variables/) to create dynamic, reusable dashboards.
