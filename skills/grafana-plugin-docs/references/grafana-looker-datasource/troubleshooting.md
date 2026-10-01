---
title: "Troubleshoot Looker data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Looker data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Looker data source issues

This document provides solutions to common issues you may encounter when configuring or using the Looker data source. For configuration instructions, refer to [Configure the Looker data source](/docs/plugins/grafana-looker-datasource/latest/configure/).

Most issues surface when you select **Save &amp; test** in the data source settings, so start with the [License and setup errors](#license-and-setup-errors) section below. If many data sources or dashboards fail at once, first rule out a platform incident by checking the [service status pages](#check-service-status).

## License and setup errors

These issues occur before you can query Looker, usually when the plugin can’t start or isn’t licensed for your environment.

### “Plugin health check failed”

**Symptoms:**

- **Save &amp; test** returns `Plugin health check failed`.
- Panels using the data source show a plugin error instead of data.

This error usually has a setup cause rather than a Looker credential problem. Work through the following checks in order:

Expand table

| Step                     | Check                                                                                                                                                                                                     |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1\. Outage               | If several data sources or dashboards fail at the same time, rule out a platform incident before anything else. Refer to [Check service status](#check-service-status).                                   |
| 2\. Plugin version       | Confirm you’re on the latest plugin version. An outdated version is the most frequent cause. Refer to [Try this first: update the plugin](#try-this-first-update-the-plugin).                             |
| 3\. Restart after update | If the error appears right after an update, restart the Grafana instance so every node runs the same plugin version.                                                                                      |
| 4\. License and plan     | Confirm your Grafana Enterprise license or Grafana Cloud plan includes Enterprise plugins and that Looker is activated. Refer to [Enterprise license and activation](#enterprise-license-and-activation). |
| 5\. Organization         | Confirm you’re working in the correct Grafana organization. Refer to [Confirm the correct organization](#confirm-the-correct-organization).                                                               |
| 6\. Configuration        | If the message includes `invalid config`, complete the required fields. Refer to [Configuration errors](#configuration-errors).                                                                           |

### Enterprise license and activation

The Looker data source is a Grafana Enterprise plugin and requires a license entitlement to run.

**Solutions:**

1. Confirm your Grafana Cloud plan is Pro or Advanced, or that your self-managed Grafana Enterprise license includes `grafana-looker-datasource`. Free and Starter plans don’t include Enterprise plugins.
2. Verify the plugin is activated for your organization. If it isn’t, the **Install** button doesn’t appear. Refer to [Activate the Enterprise plugin](/docs/plugins/grafana-looker-datasource/latest/install/#activate-the-enterprise-plugin).
3. Check that you’re within any plugin limits for your plan. Some plans cap the number of active plugins. Remove unused plugins or contact your Grafana account team to raise the limit.
4. On self-managed Grafana, confirm the license is active under **Administration** &gt; **General** &gt; **Stats and license**.

### Confirm the correct organization

**Symptoms:**

- The Looker data source or its dashboards are missing, or you can’t install or edit the plugin.

**Solutions:**

1. Check the organization shown in the user menu and switch to the organization where the data source is configured.
2. Data sources, dashboards, and plugin activation are scoped per organization, so confirm you’re in the right one before you reconfigure anything.

## Try this first: update the plugin

An outdated plugin version is the single most common cause of Looker data source issues. Before working through the error categories that follow, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, Grafana manages the Looker plugin, so it updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the platform provider controls the plugin version, which can lag behind the latest release.

### Check and update the plugin version

To check your version and update:

1. Navigate to **Connections** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Looker** and open its page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**.
5. Restart the Grafana instance after updating so every node runs the same plugin version. Errors that persist immediately after an update are often a version-sync issue that a restart resolves.

### Symptoms of an outdated plugin version

The following symptoms often indicate an outdated plugin:

- **Configuration tab is blank or incomplete.** Older versions may not render all settings fields, which can look like settings were lost.
- **Connection failures with unhelpful errors.** Severely outdated versions can fail to connect at all.
- **Intermittent `Plugin unavailable` or HTTP 500 errors**, especially in managed environments with many panels.

## Configuration errors

These errors occur when the data source configuration is incomplete.

### `invalid config`

**Symptoms:**

- **Save &amp; test** fails with a message that starts with `invalid config`.

**Possible causes and solutions:**

Expand table

| Cause                 | Solution                                                                        |
|-----------------------|---------------------------------------------------------------------------------|
| Missing Looker URL    | Enter the base URL of your Looker instance, such as `https://xxxxx.looker.app`. |
| Missing client ID     | Enter the client ID from your Looker API credentials.                           |
| Missing client secret | Enter the client secret from your Looker API credentials.                       |

## Connection errors

These errors occur when Grafana can’t reach or resolve your Looker instance.

### “unable to lookup Looker URL from the Grafana server”

**Symptoms:**

- **Save &amp; test** fails with `unable to lookup Looker URL <url> from the Grafana server`.

**Possible causes and solutions:**

Expand table

| Cause                  | Solution                                                                                              |
|------------------------|-------------------------------------------------------------------------------------------------------|
| Incorrect Looker URL   | Verify the URL is correct, including the scheme and host.                                             |
| Instance not reachable | Confirm the Looker instance is reachable from the Grafana server, and that DNS resolves the host.     |
| Network restrictions   | Check firewall rules and outbound HTTPS (port 443) access from the Grafana server to the Looker host. |

### Connect to a private Looker instance

If your Looker instance is on a private network or behind a firewall, Grafana Cloud can’t reach it over the public internet.

**Solutions:**

1. On Grafana Cloud, use [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) to route the connection through your own network.
2. On self-managed Grafana, confirm the Grafana server has network access to the Looker host, including any required firewall or VPN rules.

### TLS certificate errors

**Symptoms:**

- **Save &amp; test** fails with a certificate error, such as `x509: certificate signed by unknown authority`.

**Solutions:**

1. Ensure the Grafana server trusts the TLS certificate presented by your Looker instance.
2. If Looker uses a private or internal certificate authority, add the CA certificate to the trust store on the Grafana server, then restart Grafana.

## Authentication errors

These errors occur when credentials are invalid, missing, or lack the required permissions.

### “unable to authenticate Looker instance. Potentially incorrect credentials provided”

**Symptoms:**

- **Save &amp; test** fails with `unable to authenticate Looker instance. Potentially incorrect credentials provided`.
- Queries return authentication errors.

**Solutions:**

1. Verify the client ID and client secret are correct and haven’t been rotated in Looker.
2. Confirm the credentials belong to a user or service account whose role grants permission to query the data.
3. Regenerate the API key in Looker and update the data source configuration if you’re unsure whether the credentials are current.

### Validate credentials outside Grafana

If you believe the credentials are correct but Grafana still can’t connect, validate them directly against the Looker API from the host where Grafana runs.

First, request an API token. Replace the placeholders with your instance URL, client ID, and client secret:

Bash [Copy code to clipboard] Copy

```bash
curl --location 'https://xxxxxx.looker.app/api/4.0/login' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=xxxxxx' \
  --data-urlencode 'client_secret=xxxxxx'
```

A successful response returns an API token. If it fails, your API credentials are incorrect or lack permissions. After you have a token, confirm it can read models:

Bash [Copy code to clipboard] Copy

```bash
curl --location 'https://xxxxxx.looker.app/api/4.0/lookml_models' \
  --header 'Authorization: Bearer xxxxxx'
```

## Query errors

These errors occur when running queries against the data source.

### “No data” or empty results

**Symptoms:**

- A query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                 |
|---------------------------------|------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists in Looker for the selected period. |
| Wrong model or explore selected | Verify you’ve selected the correct model and explore.                                    |
| Restrictive filter expression   | Remove or relax the filter expression to confirm the query returns rows.                 |
| Permissions issue               | Verify the credentials have read access to the selected model and explore.               |

### Time filter macro returns an error

**Symptoms:**

- A query fails with an error about insufficient arguments to the `timeFilter` macro.

**Solutions:**

1. Pass a field name to the macro, for example `$__timeFilter(orders.created_at)`.
2. In **Builder** mode, use the macro in the **Filter Expression** field only.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection is working by running **Save &amp; test** in the data source settings.
2. For **LookML models explores** and **LookML dimension values**, confirm the parent model and explore are selected.
3. Verify the credentials have permission to read the requested models, explores, and dimensions.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` or your configured log location.
3. Look for entries related to the Looker data source that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Check service status

If many data sources or dashboards fail at once, the cause may be a platform incident rather than your configuration. Check the relevant status pages before deeper troubleshooting:

- [Grafana Cloud status](https://status.grafana.com/) for Grafana Cloud availability.
- [Google Cloud status](https://status.cloud.google.com/) for Looker (Google Cloud core) availability.

## Get additional help

If you’ve tried the solutions here and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Looker documentation](https://cloud.google.com/looker/docs) and [Looker API authentication](https://cloud.google.com/looker/docs/api-auth) for service-specific guidance.
3. Contact Grafana Support through your Grafana Enterprise support channel if you’re an Enterprise or Cloud Pro user.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Error messages, with sensitive information redacted
   - Steps to reproduce
   - Relevant configuration, with credentials redacted
