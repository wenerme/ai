---
title: "Troubleshoot Drone data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Drone data source in Grafana, covering installation, authentication, connection, and query errors."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Drone data source issues

This document provides solutions to common issues you might encounter when configuring or using the Drone data source. For configuration instructions, refer to [Configure the Drone data source](/docs/plugins/grafana-drone-datasource/latest/configure/).

## Installation errors

These errors occur when the plugin can’t install or load, most often because of a Grafana version mismatch. The Drone data source requires Grafana 10.3.3 or later.

### “Plugin not found, no installed plugin with that id”

This error appears when Grafana can’t load the Drone plugin after installation.

**Symptoms:**

- A `Plugin not found, no installed plugin with that id` error.
- The plugin shows as not installed after a page refresh.

**Possible causes and solutions:**

Expand table

| Cause                         | Solution                                                                                                                              |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Grafana version too old       | Upgrade to Grafana 10.3.3 or later, which the plugin requires.                                                                        |
| Incomplete installation       | Reinstall the plugin and restart the Grafana server so it loads on startup.                                                           |
| Enterprise license not active | Confirm you have a Grafana Cloud Pro or Advanced plan or an activated Grafana Enterprise license, since this is an Enterprise plugin. |

For Grafana Cloud, plugins are managed for you. If the plugin still doesn’t load, contact Grafana Support.

## Understand the Save &amp; test error

When you click **Save &amp; test**, Grafana runs a health check that requests the list of repositories from your Drone instance using the `Repo List` query. If the health check fails for any reason, Grafana shows the same generic error:

text [Copy code to clipboard] Copy

```text
health check failed for 'Repo List' query
```

Because this one message covers both authentication and connection problems, check both:

- Confirm the **Token** is valid and has the required permissions, as described in [Authentication errors](#authentication-errors).
- Confirm the **URL** and network path are correct, as described in [Connection errors](#connection-errors).

## Authentication errors

These errors occur when the Drone API token is missing, invalid, or lacks the required permissions. Find your token on the `<YOUR_DRONE_URL>/account` page of your Drone instance.

### Save &amp; test fails with an authentication error

This error appears when Drone rejects the provided token.

**Symptoms:**

- **Save &amp; test** fails with `health check failed for 'Repo List' query`.
- Queries fail or return no data.

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                                                                             |
|--------------------------|------------------------------------------------------------------------------------------------------|
| Token field is empty     | Enter your Drone API token and click **Save &amp; test** again.                                      |
| Expired or revoked token | Generate a new token on the `<YOUR_DRONE_URL>/account` page, update the token field, and save again. |
| Token copied incorrectly | Re-copy the full token without extra spaces, paste it into the token field, and save again.          |
| Insufficient permissions | Verify the token’s account has access to the repositories you query.                                 |

## Connection errors

These errors occur when Grafana can’t reach your Drone instance.

### Connection refused, timeout, or URL errors

These errors indicate a malformed URL or a network problem between Grafana and Drone.

**Symptoms:**

- **Save &amp; test** fails with `health check failed for 'Repo List' query`, and the token is correct.
- The data source test times out or fails to connect.
- Queries fail with network errors.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                                     |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| Missing protocol in the URL     | Include the protocol in the **URL** field, such as `https://drone.company.com`.                                              |
| Trailing slash in the URL       | Remove the trailing slash from the **URL** field.                                                                            |
| Network or firewall restriction | Verify outbound connectivity from the Grafana server to your Drone instance and confirm firewall rules allow outbound HTTPS. |
| Drone instance unreachable      | Confirm the Drone instance is running and reachable from the Grafana server.                                                 |

## Query errors

These errors occur when running repository or build queries.

### “No data” or empty results

A query can succeed but return no data.

**Symptoms:**

- The query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                              | Solution                                                                                                             |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Repository is inactive             | The repository drop-downs list only active repositories. Activate the repository in Drone if it should be queryable. |
| Wrong repository or build selected | Verify you selected the correct repository and build number.                                                         |
| Permissions issue                  | Verify the API token has access to the requested repository.                                                         |

### Build List returns only 100 builds

The `Build List` action returns at most the 100 most recent builds, not all builds for a repository.

**Symptoms:**

- Older builds are missing from a `Build List` query.

**Solutions:**

1. To query a specific older build, use the `Build Info` action and type in the build number directly. The **Build number** field accepts values that aren’t in the drop-down.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

A query variable can return an empty list.

**Solutions:**

1. Verify the data source connection by running **Save &amp; test** in the data source settings.
2. Confirm the variable uses the `Repo List` action.
3. Verify the API token has permission to list repositories.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` or your configured log location.
3. Look for Drone data source entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the previous solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Drone documentation](https://docs.drone.io/) for service-specific guidance.
3. Contact Grafana Support through your Grafana Enterprise or Grafana Cloud support channel.
4. When reporting issues, include:

   - Grafana version
   - Error messages, with sensitive information redacted
   - Steps to reproduce
   - Relevant configuration, with credentials redacted
