---
title: "Troubleshoot Netlify data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Netlify data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Netlify data source issues

This document provides solutions to common issues you might encounter when you configure or use the Netlify data source. For configuration instructions, refer to [Configure the data source](/docs/plugins/grafana-netlify-datasource/latest/#configure-the-data-source).

## License and setup errors

The Netlify data source is a Grafana Enterprise plugin. These errors occur when the plugin isn’t licensed, activated, or installed by a user with the required role.

### Plugin doesn’t appear in the catalog

**Symptoms:**

- You can’t find **Netlify** when you search the plugin catalog.
- The **Install** button doesn’t appear on the plugin page.

**Possible causes and solutions:**

Expand table

| Cause                                   | Solution                                                                                                                                                                             |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Plugin isn’t activated for your account | Confirm your Grafana Cloud plan is Pro or Advanced, or that your Grafana Enterprise license includes `grafana-netlify-datasource`. Contact your Grafana account team to activate it. |
| Insufficient role                       | Sign in as a user with the `Organization administrator` role. Only administrators can install plugins and configure data sources.                                                    |

## Version and upgrade guidance

Many Netlify issues are caused by running an outdated plugin version. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, the Netlify plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release.

### Check and update the plugin version

1. Navigate to **Connections** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for the Netlify plugin and open its page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**.

### Symptoms of an outdated plugin version

- **Configuration tab is blank or incomplete.** Older versions might not render all settings fields, which can look like settings were lost.
- **Connection failures with unhelpful errors.** Severely outdated versions can fail to connect at all.
- **Intermittent `Plugin unavailable` or HTTP 500 errors**, especially in managed environments with many panels.

## Authentication errors

These errors occur when the personal access token is missing, invalid, or doesn’t have the required permissions.

### “invalid/empty bearer token”

**Symptoms:**

- **Save &amp; test** fails immediately with the message `invalid/empty bearer token`.
- Queries return no data.

**Solutions:**

1. Open the data source configuration and confirm the **Token** field contains a value.
2. Generate a Netlify personal access token from [User settings &gt; Applications](https://app.netlify.com/user/applications#personal-access-tokens).
3. Paste the token into the **Token** field and click **Save &amp; test** again.

### “status code: 401”

**Symptoms:**

- **Save &amp; test** fails with a message that includes `status code: 401`.
- Resources don’t load in the query editor drop-downs.

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                                                                                     |
|--------------------------|--------------------------------------------------------------------------------------------------------------|
| Invalid token            | Verify the token in the Netlify portal. Regenerate it if necessary and update the data source configuration. |
| Revoked or expired token | Create a new personal access token and update the data source configuration.                                 |
| Insufficient permissions | Confirm the account associated with the token has access to the sites, forms, and accounts you’re querying.  |

## Query errors

These errors occur when you run queries against the data source.

### “No data” or empty results

**Symptoms:**

- A query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                   | Solution                                                                                                                                                                                          |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| No matching resources   | Verify the account contains the requested sites, deploys, forms, or submissions.                                                                                                                  |
| Wrong resource selected | Confirm you selected the correct **Site ID** and, for form submissions, the correct **Form ID**.                                                                                                  |
| Time range filtering    | The Netlify API doesn’t support server-side time filtering. The data source returns all values regardless of the dashboard time range, so widen or ignore the time range when validating results. |
| Permissions             | Confirm the token’s account has read access to the requested resource.                                                                                                                            |

## Template variable errors

These errors occur when you use template variables with the data source.

### Variables return no values

**Solutions:**

1. Test the data source connection in the data source settings to confirm it’s working.
2. For cascading variables, confirm that parent variables, such as **Site ID**, have valid selections.
3. Confirm the token’s account has permission to list the requested resources.

## Performance issues

These issues relate to slow queries or Netlify API limits.

### API rate limit errors

**Symptoms:**

- Queries intermittently fail.
- Panels fail to load when many queries run at once.

**Solutions:**

1. Reduce the frequency of dashboard refreshes.
2. Reduce the number of panels that query Netlify simultaneously.
3. Enable query caching in Grafana, which is available in Grafana Enterprise and Grafana Cloud.
4. For the **Account Build Status** action, monitor your account build quota, because exceeding it can cause builds and related queries to fail.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log`, or your configured log location.
3. Look for Netlify data source entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the previous solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Netlify API documentation](https://docs.netlify.com/api/get-started/) for service-specific guidance.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
4. When you report an issue, include:

   - Grafana version
   - Plugin version
   - Error messages, with sensitive information redacted
   - Steps to reproduce
   - Relevant configuration, with credentials redacted
