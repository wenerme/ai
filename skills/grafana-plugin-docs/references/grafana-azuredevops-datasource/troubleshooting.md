---
title: "Troubleshoot Azure DevOps data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Azure DevOps data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Azure DevOps data source issues

This document provides solutions to common issues you may encounter when configuring or using the Azure DevOps data source. For configuration instructions, refer to [Configure the Azure DevOps data source](/docs/plugins/grafana-azuredevops-datasource/latest/configure/).

## Authentication errors

These errors occur when the personal access token (PAT) is invalid, expired, or doesn’t have the required permissions.

### “invalid URL” or “invalid PAT”

**Symptoms:**

- **Save &amp; test** fails immediately with `invalid URL` or `invalid PAT`.

**Solutions:**

1. Verify the **URL** field isn’t empty. It must contain your Azure DevOps organization URL (for example, `https://dev.azure.com/<ORGANIZATION>`).
2. Verify the **PAT** field isn’t empty. Click **Reset** if the field shows “Configured” and re-enter the token.

### “Access denied” or “401 Unauthorized”

**Symptoms:**

- **Save &amp; test** fails with an authorization or authentication error.
- Queries return access denied messages.
- Project or repository drop-downs are empty.

**Possible causes and solutions:**

Expand table

| Cause                  | Solution                                                                                                                                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Invalid or revoked PAT | Generate a new PAT in Azure DevOps and update the data source configuration.                                                                                                                                  |
| Expired PAT            | Create a new PAT with a longer expiration period and update the data source configuration.                                                                                                                    |
| Missing PAT scopes     | Verify the PAT has the required scopes (`Code (Read)`, `Build (Read)`, `Release (Read)`). Refer to [Required PAT scopes](/docs/plugins/grafana-azuredevops-datasource/latest/configure/#required-pat-scopes). |
| Wrong organization URL | Verify the **URL** field matches your Azure DevOps organization (for example, `https://dev.azure.com/<ORGANIZATION>`).                                                                                        |

### “Health check failed with status code: N”

**Symptoms:**

- **Save &amp; test** fails with a message like `Health check failed with status code: 401` or `Health check failed with status code: 404`.
- This error occurs when the **Secure Socks Proxy** toggle is enabled.

**Possible causes and solutions:**

Expand table

| Status code | Cause                                | Solution                                                                     |
|-------------|--------------------------------------|------------------------------------------------------------------------------|
| `401`       | Invalid or expired PAT               | Generate a new PAT and update the data source configuration.                 |
| `403`       | PAT doesn’t have the required scopes | Add the required scopes to your PAT.                                         |
| `404`       | Wrong organization URL               | Verify the **URL** field is correct and doesn’t include extra path segments. |

### PAT authentication fails on Azure DevOps Server (on-prem)

**Symptoms:**

- **Save &amp; test** fails on an on-premises Azure DevOps Server instance.
- Authentication redirects or federation errors occur.

**Solutions:**

1. Set the **Username** field in **Optional Configuration** to the PAT owner’s username.
2. Verify the server URL is correct and accessible from the Grafana server.
3. If connecting from Grafana Cloud to an on-premises instance, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) and enable the **Secure Socks Proxy** toggle.

### “Failed to get settings”

**Symptoms:**

- **Save &amp; test** fails with `Failed to get settings`.

**Solutions:**

1. Verify the data source configuration is saved. Click **Save &amp; test** rather than just **Test**.
2. If provisioning the data source, check that the YAML file has the correct structure with `jsonData.url` and `secureJsonData.patToken`. Refer to [Provision the data source](/docs/plugins/grafana-azuredevops-datasource/latest/configure/#provision-the-data-source).

### Health check succeeds but shows 0 projects

**Symptoms:**

- **Save &amp; test** succeeds with `healthcheck successful. 0 projects found`.
- Project drop-down is empty.

**Solutions:**

1. Verify the PAT has access to at least one project in the organization.
2. Check that the **URL** points to the correct organization.
3. In Azure DevOps, verify your user account has been added to the organization and has permission to view projects.

## Connection errors

These errors occur when Grafana can’t reach the Azure DevOps endpoints.

### “Connection refused” or timeout errors

**Symptoms:**

- **Save &amp; test** times out.
- Queries fail with network errors.
- Intermittent connection failures.

**Solutions:**

1. Verify network connectivity from the Grafana server to the Azure DevOps endpoint.
2. Check firewall rules allow outbound HTTPS (port 443) to `dev.azure.com` or your on-premises server.
3. For on-premises Azure DevOps Server behind a private network, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) if using Grafana Cloud.
4. Verify the **URL** doesn’t include a trailing slash or extra path segments.

## Query errors

These errors occur when executing queries against the data source.

### “No data” or empty results

**Symptoms:**

- Query executes without error but returns no data.
- Charts show “No data” message.

**Possible causes and solutions:**

Expand table

| Cause                              | Solution                                                                                                                                                       |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data    | For time-range-scoped queries (Builds, Releases, Release Deployments), expand the dashboard time range to include the period when builds or releases occurred. |
| Wrong project selected             | Verify you’ve selected the correct project in the query editor.                                                                                                |
| PAT doesn’t have access to project | Verify the PAT has access to the specific project. Check organization-level permissions in Azure DevOps.                                                       |
| Filters too restrictive            | Remove or broaden optional filters to verify that data exists, then narrow down gradually.                                                                     |

### “invalid query type” error

**Symptoms:**

- Query fails with an `invalid query type` error message.

**Solutions:**

1. Select a valid query type from the **Query Type** drop-down.
2. If the error persists after selecting a query type, delete the query panel and create a new one.

### “should be a GUID” error

**Symptoms:**

- Query fails with an error containing `should be a GUID`.

**Solutions:**

Fields like **Creator Id**, **Reviewer ID**, and **Repository ID** expect UUID-formatted values (for example, `a1b2c3d4-e5f6-7890-abcd-ef1234567890`). Verify you’re entering a valid GUID, not a display name or other identifier. You can find user GUIDs in Azure DevOps under organization settings or through the Azure DevOps REST API.

### “invalid project id” or “invalid pipeline id”

**Symptoms:**

- Query fails with `invalid project id` or `invalid pipeline id`.

**Solutions:**

1. Verify you’ve selected a project from the **Project** drop-down. Most query types require a project selection.
2. For **Pipeline Runs** queries, verify you’ve selected a pipeline from the **Pipeline** drop-down. Both a project and a pipeline are required for this query type.
3. If using a template variable for the project or pipeline, verify the variable is resolving to a valid value. Check the variable selector at the top of the dashboard.

### Query timeout

**Symptoms:**

- Query runs for a long time and then fails.
- Error mentions timeout or query limits.

**Solutions:**

1. Narrow the dashboard time range to reduce the volume of data returned.
2. Add filters (such as **Status**, **Branch**, or **Definition Id**) to reduce the result set.
3. Use the **Top** field (available for Releases and Release Deployments) to limit the number of results.

## Annotation errors

These errors occur when using annotations with the data source.

### Annotations don’t appear on panels

**Possible causes and solutions:**

Expand table

| Cause                                       | Solution                                                                                                                                                                                                                                                   |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Dashboard time range doesn’t contain events | Annotations from time-range-scoped query types (Builds, Releases, Release Deployments) only appear within the dashboard time range. Expand the time range to include the period when events occurred.                                                      |
| Query type isn’t time-scoped                | Query types like Projects, Repositories, Pipelines, Build Definitions, and Release Definitions aren’t scoped to the dashboard time range and may not produce meaningful annotation markers. Use Builds, Releases, or Release Deployments for best results. |
| Annotation query is disabled                | In **Dashboard settings** &gt; **Annotations**, verify the annotation query toggle is enabled.                                                                                                                                                             |
| Wrong data source selected                  | Verify the annotation query is using the correct Azure DevOps data source instance.                                                                                                                                                                        |
| Filters exclude all results                 | Remove or broaden filters to verify that events exist, then narrow down gradually.                                                                                                                                                                         |

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

**Possible causes and solutions:**

Expand table

| Cause                                      | Solution                                                                                                                                                                                                                                                                                |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data source connection is broken           | Run **Save &amp; test** in the data source settings to verify the connection.                                                                                                                                                                                                           |
| PAT missing required scopes                | Verify the PAT has `Code (Read)` scope for repository variables or general read access for project variables.                                                                                                                                                                           |
| Variable query type is not set             | Edit the variable and verify a **Query Type** (Projects or Repositories) is selected from the drop-down. If no query type is selected, the variable silently returns no values.                                                                                                         |
| Parent variable hasn’t loaded yet          | For **Repositories** variables filtered by a project variable, ensure the project variable is listed first in the variable list. Grafana resolves variables in order, and a dependent variable may receive a literal `$project` string instead of the resolved value if it loads first. |
| Referenced variable was renamed or deleted | If a Repositories variable uses `$project` as a project filter but the `project` variable no longer exists, the literal string `$project` is sent to Azure DevOps, which causes an error. Update the variable reference to match the current variable name.                             |

### Cascading variables show errors or wrong results

**Symptoms:**

- A **Repositories** variable filtered by a **Projects** variable shows errors or returns repositories from the wrong project.
- The variable drop-down briefly shows an error before populating.

**Solutions:**

1. In **Dashboard settings** &gt; **Variables**, ensure the **Projects** variable appears before the **Repositories** variable in the list. Drag to reorder if needed.
2. Verify the **Repositories** variable uses the correct variable reference (for example, `$project`) in the **Project** filter.
3. Set the **Repositories** variable refresh to **On dashboard load** so it re-evaluates after the parent variable resolves.

### Variables are slow to load

**Solutions:**

1. Set variable refresh to **On dashboard load** instead of **On time range change** if the variable values don’t depend on the time range.
2. Set the **Projects limit** in the data source configuration to a reasonable value for your organization. A high limit causes the `/projects` resource call to return more data, slowing variable loading.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Look for entries containing `grafana-azuredevops-datasource` for plugin-specific log messages.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Azure DevOps REST API documentation](https://learn.microsoft.com/en-us/rest/api/azure/devops/) for service-specific guidance.
3. Contact [Grafana Support](/profile/org#support) if you’re an Enterprise, Cloud Pro, or Cloud Advanced user.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant data source configuration (redact the PAT)
