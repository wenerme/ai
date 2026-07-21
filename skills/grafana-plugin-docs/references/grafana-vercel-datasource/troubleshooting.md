---
title: "Troubleshoot the Vercel data source | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Vercel data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot the Vercel data source

This document provides solutions to common issues you might encounter when you configure or use the Vercel data source. The sections follow the order you typically move through when you set up the plugin: enabling and licensing it, keeping it up to date, authenticating, and running queries. For configuration instructions, refer to [Configure the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/configure/).

## License and setup errors

The Vercel data source is a Grafana Enterprise plugin in public preview. Most setup problems occur because your account hasn’t licensed or enabled the plugin.

### The plugin isn’t available or won’t install

**Symptoms:**

- The Vercel plugin doesn’t appear when you search the plugin catalog.
- The **Install** button is missing on the plugin page.
- **Save &amp; test** returns a generic `Plugin health check failed` error.

**Possible causes and solutions:**

Expand table

| Cause                                                   | Solution                                                                                                                                                                                                                  |
|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Enterprise plugins aren’t enabled for the account       | On Grafana Cloud, sign in to [Grafana Cloud](/), then open **My Account** &gt; **Manage Plan** and enable Enterprise plugins.                                                                                             |
| The plan doesn’t include the entitlement                | Confirm your plan includes Enterprise plugins. They’re available on the Grafana Cloud Free plan, which allows up to three active users, as well as the Pro and Advanced plans, and on self-managed Grafana Enterprise.    |
| A contracted account is missing an explicit entitlement | Contracted Cloud customers might need the Enterprise plugin entitlement added to their account. Contact your Grafana account team or Grafana Support.                                                                     |
| A self-managed license doesn’t include the plugin       | Verify your Grafana Enterprise license includes `grafana-vercel-datasource`, and that you’ve activated the license. Refer to [Activate an Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). |

## Version and upgrade guidance

An outdated plugin version causes many Vercel data source issues. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, Grafana manages the Vercel plugin, and it updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the platform provider controls the plugin version, which can lag behind the latest release.

### Check and update the plugin version

1. Navigate to **Connections** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for the Vercel plugin and open its page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**.

## Authentication errors

These errors occur when the access token is invalid, missing, or doesn’t have the required scope.

### “invalid/empty bearer token”

**Symptoms:**

- **Save &amp; test** fails with an authentication error.
- Queries return no data or an authorization error.

**Possible causes and solutions:**

Expand table

| Cause                              | Solution                                                                                                                |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Missing or empty token             | Enter a valid access token in the **Access Token** field.                                                               |
| Expired token                      | Create a new token on the [Vercel account tokens page](https://vercel.com/account/tokens) and update the configuration. |
| Token lacks access to the resource | Verify the token’s scope covers the account or team you’re querying.                                                    |

### Team-scoped token without a matching Team ID

**Symptoms:**

- **Save &amp; test** fails, or queries return empty results even though data exists in Vercel.

**Solutions:**

1. Confirm whether you scoped the token to a team on the [Vercel account tokens page](https://vercel.com/account/tokens).
2. If the token is team-scoped, enter the matching team in the **Team ID** field.
3. Verify the Team ID matches the scope of the token, then select **Save &amp; test**.

If **Save &amp; test** succeeds but queries still return nothing, refer to [Query errors](/docs/plugins/grafana-vercel-datasource/latest/troubleshooting/#query-errors).

## Query errors

These errors occur after the connection succeeds but a query doesn’t return the results you expect.

### “No data” or empty results

**Symptoms:**

- A query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                           |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range, or verify the resource has activity in that period.               |
| Missing required parameter      | Provide the required path or query parameter, such as `projectId` for **Read active attack data**. |
| Wrong team                      | Verify the **Team ID** matches the team that owns the resource.                                    |
| Token lacks permission          | Verify the access token can read the requested resource.                                           |

### Vercel runtime or application logs aren’t available

**Symptoms:**

- You expect application or request logs but only see deployment and build data.
- The log drain actions return drain configurations instead of log content.

**Cause:**

The Vercel data source queries the Vercel REST API, which exposes deployment, build, and configuration data. It doesn’t stream Vercel runtime or application logs.

**Solution:**

To bring runtime logs into Grafana, configure a [Vercel log drain](https://vercel.com/docs/drains) to forward logs to [Loki](/docs/loki/latest/), then query them with a Loki data source. This is a separate setup from the Vercel data source.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log`, or your configured log location.
3. Look for entries related to the `grafana-vercel-datasource` plugin that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions on this page and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Vercel REST API documentation](https://vercel.com/docs/rest-api) for service-specific guidance.
3. Create a support ticket through your Grafana Enterprise support channel. When you report an issue, include:

   - Your Grafana version and Vercel plugin version.
   - Error messages, with sensitive information redacted.
   - Steps to reproduce the issue.
   - Relevant configuration, with credentials redacted.
