---
title: "Troubleshoot GitLab data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the GitLab data source plugin in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot GitLab data source issues

This document provides solutions to common issues you may encounter when configuring or using the GitLab data source. For configuration instructions, refer to [Configure the GitLab data source](/docs/plugins/grafana-gitlab-datasource/latest/configure/).

## Authentication errors

These errors appear when you click **Save &amp; test** in the data source configuration.

### “access token can not be blank”

**Symptoms:**

- Save &amp; test fails immediately after saving the data source
- No access token has been entered

**Solutions:**

1. Navigate to the data source configuration page.
2. Enter a valid GitLab personal access token in the **Access token** field.
3. Ensure the token has the `read_api` scope. Refer to [Create a GitLab personal access token](/docs/plugins/grafana-gitlab-datasource/latest/configure/#create-a-gitlab-personal-access-token) for instructions.

### “the access token cannot be verified. Double check the token, URL and permissions”

**Symptoms:**

- Save &amp; test returns an authorization error
- Queries fail with access denied messages

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| Expired token            | Generate a new personal access token in GitLab and update the data source configuration.                 |
| Missing `read_api` scope | Create a new token with the `read_api` scope selected.                                                   |
| Incorrect token value    | Verify the token was copied correctly, with no extra spaces or characters.                               |
| SSL certificate failure  | For self-hosted GitLab instances, verify the SSL certificate is valid and trusted by the Grafana server. |

### “unsupported scheme. Only HTTP and HTTPS are supported”

**Symptoms:**

- Save &amp; test fails with a scheme error
- URL contains a protocol other than `http://` or `https://`

**Solutions:**

1. Verify the URL starts with `http://` or `https://`.
2. Remove any extra characters or invalid formatting from the URL.
3. For most GitLab instances, use `https://`.

### “the URL cannot be verified. Double check the formatting”

**Symptoms:**

- Save &amp; test fails with a URL verification error
- GitLab API returns a 404 response

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                                                                                    |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Incorrect URL path              | Verify the URL points to the GitLab API endpoint. For GitLab.com, use `https://gitlab.com/api/v4`. For self-hosted instances, use `https://your-gitlab.example.com/api/v4`. |
| GitLab instance unreachable     | Verify the GitLab instance is running and accessible from the Grafana server.                                                                                               |
| Firewall or network restriction | Check firewall rules allow outbound HTTPS traffic from the Grafana server to the GitLab instance.                                                                           |

## Query errors

These errors occur when running queries in the query editor or on dashboards.

### “project ID invalid” or “group ID invalid”

**Symptoms:**

- Query fails with an invalid ID error
- Dashboard panels show an error state

**Solutions:**

1. Ensure you’re using the numeric project or group ID, not the project path or name.
2. To find a project’s numeric ID in GitLab, navigate to the project’s main page. The ID is displayed under the project name.
3. Verify the ID is entered without spaces or special characters.

### “invalid query”

**Symptoms:**

- Merge Requests or Audit Events queries fail with an invalid query error

**Solutions:**

1. For **Merge Requests**, verify that at least one of the following is provided: **Project Id**, **Group Id**, or leave both empty to query all merge requests for the configured account.
2. For **Audit Events**, select a **Query Type** (Project or Group) and provide the corresponding ID.

### No data returned

**Symptoms:**

- Query runs without error but returns no data
- Dashboard panels show “No data”

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                                            |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range. The GitLab data source applies the dashboard time range to filter results for some resource types. |
| Incorrect project or group ID   | Verify you’re using the correct numeric ID.                                                                                         |
| Insufficient permissions        | Verify the personal access token has `read_api` scope and the associated account has access to the requested resource.              |
| Page limit too low              | Increase the **Page limit** in the data source configuration to return more results. The default is `5` pages.                      |

### Merge request filters silently ignored

**Symptoms:**

- Merge request query returns results but filter fields like **Author Id**, **Reviewer Id**, or **Assignee Id** appear to have no effect

**Solutions:**

1. Ensure you’re using numeric user IDs, not usernames. The **Author Id**, **Reviewer Id**, and **Assignee Id** fields require numeric values.
2. To filter by username instead, use the **Author username** or **Reviewer username** fields.
3. To find a user’s numeric ID in GitLab, navigate to their profile page or use the [Users API](https://docs.gitlab.com/ee/api/users.html).

### Audit events return an error or no data

**Symptoms:**

- Audit events query fails or returns empty results despite events existing in GitLab

**Solutions:**

1. Verify your GitLab subscription tier. Audit events require a GitLab Premium or Ultimate subscription for project and group queries.
2. For instance-level audit events on self-hosted GitLab, the personal access token must belong to an admin account.
3. Confirm the **Query Type** is set to **Project** or **Group** and the corresponding ID is provided.

### GitLab API rate limiting

**Symptoms:**

- Queries intermittently fail or return partial results
- Dashboard panels show errors under heavy load or frequent refresh

**Solutions:**

1. Reduce the **Page limit** in the data source configuration to lower the number of API requests per query.
2. Increase the dashboard auto-refresh interval to reduce request frequency.
3. For self-hosted GitLab, review and adjust the [API rate limits](https://docs.gitlab.com/ee/security/rate_limits.html) on the GitLab server.

## Alerting errors

These errors occur when using the GitLab data source with Grafana Alerting.

### Alert rule fails to evaluate

**Symptoms:**

- Alert rule status shows an error
- Alert rule never fires despite matching data in the query editor

**Possible causes and solutions:**

Expand table

| Cause                         | Solution                                                                                                                                                                 |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Missing Reduce expression     | Alert rules require a **Reduce** expression to convert query results into a single numeric value. Add a Reduce expression with a function such as **Count** or **Last**. |
| Query returns no data         | Verify the query returns data by running it in the query editor. Check the time range and filters.                                                                       |
| Incorrect threshold condition | Verify the **Threshold** expression uses the correct comparison. For example, use `IS ABOVE 0` to alert on any results, or `IS BELOW 1` to alert on missing data.        |

### Alert evaluation times out

**Symptoms:**

- Alert rule shows a timeout error
- Alert rule evaluation takes longer than the configured timeout

**Solutions:**

1. Reduce the **Page limit** in the data source configuration to limit API response size.
2. Add filters to the query to narrow results (for example, filter pipelines by **Status** instead of querying all pipelines).
3. Increase the alert rule evaluation timeout if your Grafana configuration allows it.

### Alert rule does not fire for expected events

**Symptoms:**

- Events visible in GitLab are not triggering alert rules
- Alert rule evaluates successfully but stays in the Normal state

**Solutions:**

1. Verify the alert evaluation interval covers the time range where events occur. The GitLab data source applies the dashboard time range (or the alert rule’s evaluation window) to filter results.
2. Confirm the query filters match the expected data. For example, ensure **Status** is set to `failed` if alerting on failed pipelines.
3. Check that the Reduce and Threshold expressions are configured correctly by previewing the alert rule in the Grafana UI.

## Annotation errors

These errors occur when using annotations with the GitLab data source.

### Annotations do not appear on panels

**Symptoms:**

- Annotation query is configured but no markers appear on dashboard panels
- No error messages are displayed

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                                                                                                                                                                                                                               |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Query returns no data        | Verify the underlying query returns results by testing it in the query editor with the same time range.                                                                                                                                                                                                |
| Time field mapping incorrect | Verify the **Time** field mapping points to a valid time-type field for the selected resource type (for example, `authored_at` for Commits or `created_at` for Deployments). If no time field is mapped and the query results don’t contain a recognized time field, annotations are silently skipped. |
| Text field mapping incorrect | Verify the **Text** field mapping points to a valid string field. If no text field is mapped and no string fields exist in the results, annotations are silently skipped.                                                                                                                              |
| Annotation is disabled       | Verify the annotation toggle is enabled in **Dashboard settings** &gt; **Annotations**.                                                                                                                                                                                                                |
| Time range too narrow        | Expand the dashboard time range. Annotations only appear for events that fall within the visible time range.                                                                                                                                                                                           |

### Legacy annotations not working after upgrade

**Symptoms:**

- Annotations that worked on an older version of the plugin no longer appear after upgrading

**Solutions:**

1. The plugin automatically migrates legacy annotation configurations (using `textField` and `timeField`) to the modern **Field mappings** format. If migration did not apply correctly, re-create the annotation query.
2. Open the annotation configuration in **Dashboard settings** &gt; **Annotations** and verify the **Time** and **Text** mappings under **Field mappings** are set correctly.

## Template variable errors

These errors occur when using template variables with the GitLab data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection is working by clicking **Save &amp; test** in the data source settings.
2. Confirm the variable uses a supported resource type. Only **Projects**, **Labels**, and **Releases** are supported as variable query types.
3. Check the **Display Field** and **Value Field** are set to valid field names for the selected resource type.
4. Set the variable refresh to **On dashboard load**.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana for the change to take effect.
3. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
4. Look for entries containing `gitlab` for data source-specific messages.
5. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [GitLab documentation](https://docs.gitlab.com/) for service-specific guidance.
3. Contact [Grafana Support](/profile/org#support) if you’re a Grafana Cloud or Enterprise customer.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Exact error messages (redact any sensitive information)
   - Steps to reproduce the issue
   - Relevant configuration details (redact credentials)
