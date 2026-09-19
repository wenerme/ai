---
title: "Troubleshoot Jenkins data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Jenkins data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Jenkins data source issues

This document provides solutions to common issues you may encounter when configuring or using the Jenkins data source. For configuration instructions, refer to the [Jenkins data source overview](/docs/plugins/grafana-jenkins-datasource/latest/).

Both authentication and network problems surface the same `Unable to connect to Jenkins` message during **Save &amp; test**; read the detail after `Error:` to tell them apart, then jump to [Authentication errors](#authentication-errors) or [Connection errors](#connection-errors).

## License and setup errors

These errors occur when the Enterprise plugin isn’t licensed, activated, or installed by an administrator.

### “Plugin health check failed”

**Symptoms:**

- **Save &amp; test** returns a generic `Plugin health check failed` error.
- The **Install** button doesn’t appear in the plugin catalog.

**Possible causes and solutions:**

Expand table

| Cause                | Solution                                                                                                                                     |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Plugin not activated | Confirm your Grafana Cloud plan is Pro or Advanced, or that your Grafana Enterprise license includes `grafana-jenkins-datasource`.           |
| Missing permissions  | Sign in with an account that has the `Organization administrator` role.                                                                      |
| Plugin not installed | Install the plugin. Refer to [Install and upgrade the Jenkins data source plugin](/docs/plugins/grafana-jenkins-datasource/latest/install/). |

## Version and upgrade guidance

Many Jenkins data source issues are caused by running an outdated plugin version. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, the Jenkins plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release.

### Check and update the plugin version

To check and update the plugin version:

1. Navigate to **Connections** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Jenkins** and open its page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**.

### Symptoms of an outdated plugin version

The following symptoms often indicate an outdated plugin version:

- **Configuration tab is blank or incomplete.** Older versions may not render all settings fields, which can look like settings were lost.
- **Connection failures with unhelpful errors.** Severely outdated versions can fail to connect at all.
- **Intermittent `Plugin unavailable` or HTTP 500 errors**, especially in managed environments with many panels.

## Authentication errors

These errors occur when credentials are invalid, missing, or don’t have the required permissions.

### “Unable to connect to Jenkins” with an authentication error

**Symptoms:**

- **Save &amp; test** fails with `Unable to connect to Jenkins` followed by an authentication or authorization message.
- Queries return access-denied messages.
- The project drop-down in the query editor doesn’t load.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                                                          |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Invalid credentials          | Verify the **User** and **Password** in the data source configuration. Regenerate the credentials in Jenkins if necessary.        |
| API token expired or revoked | Create a new API token in Jenkins under **Your Profile** &gt; **Configure** &gt; **API Token** and update the **Password** field. |
| Insufficient permissions     | Confirm the user has the **Overall/Read** permission and read access to the projects and nodes you query.                         |
| Anonymous access disabled    | If your Jenkins instance requires authentication, provide a **User** and **Password**. Anonymous requests are rejected.           |

## Connection errors

These errors occur when Grafana can’t reach your Jenkins instance.

### “Unable to connect to Jenkins” with a network error

**Symptoms:**

- The data source test times out or fails with a network error.
- Queries fail intermittently with connection errors.

**Solutions:**

1. Verify the **URL** is correct and reachable from the Grafana server, including the scheme (`https://`) and port.
2. Verify network connectivity and firewall rules allow outbound access from Grafana to the Jenkins instance.
3. Confirm the [Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/) is enabled on your Jenkins instance.
4. For a Jenkins instance on a private network, enable [Private Data Source Connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) and turn on the **Enable Secure Socks Proxy** toggle in the data source configuration.

When the connection succeeds, **Save &amp; test** displays `Data source is working`.

## Query errors

These errors occur when running queries against the data source.

### “No data” or empty results

**Symptoms:**

- A query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                   |
|---------------------------------|------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | For a **Project Builds** query, expand the dashboard time range to include builds that ran in that window. |
| No project selected             | The **Project Builds** query requires a project. Select a project in the query editor.                     |
| Permissions issue               | Confirm the user has read access to the specific project, node, or queue you’re querying.                  |
| No matching resources           | Verify the projects, nodes, or labels exist in Jenkins.                                                    |

### Project drop-down is empty

**Symptoms:**

- The project selector in a **Project Builds** query shows no options.

**Solutions:**

1. Verify the data source connection with **Save &amp; test**.
2. Confirm the user has permission to list projects in Jenkins.
3. Check that projects exist on the Jenkins instance.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

Issues where a **Projects** query variable returns no options.

**Solutions:**

1. Verify the data source connection is working by testing it in the data source settings.
2. Confirm the **Projects** query type is selected for the variable.
3. Verify the user has permission to list projects in Jenkins.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Look for `grafana-jenkins-datasource` entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [Jenkins Remote Access API documentation](https://www.jenkins.io/doc/book/using/remote-access-api/) for service-specific guidance.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant configuration (redact credentials)
