---
title: "Troubleshoot Zendesk data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Zendesk data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Zendesk data source issues

This document provides solutions to common issues you might encounter when configuring or using the Zendesk data source. For configuration instructions, refer to [Configure the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/).

## Version and upgrade guidance

Many Zendesk data source issues are caused by running an outdated plugin version. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, the Zendesk plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release.

### Check and update the plugin version

To confirm your plugin version:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Zendesk** and open its page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**.

## Authentication errors

These errors occur when the email, API token, or subdomain is missing or invalid.

### “invalid/empty Email”

**Symptoms:**

- **Save &amp; test** fails with a message that the email is invalid or empty.

**Solutions:**

1. Enter the email address used to sign in to Zendesk in the **Email** field.
2. Verify there are no leading or trailing spaces in the value.
3. Click **Save &amp; test** again.

### “invalid/empty password”

**Symptoms:**

- **Save &amp; test** fails with a message that the password is invalid or empty. The API token maps to the password field, so this error refers to a missing API token.

**Solutions:**

1. Enter your Zendesk API token in the **API Token** field.
2. If you don’t have a token, create one and enable API token access. Refer to [Managing access to the Zendesk API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API).
3. Click **Save &amp; test** again.

### “status code: 401”

**Symptoms:**

- **Save &amp; test** fails with `health check failed for 'Count tickets' query (status code: 401)`.
- Queries return authentication or authorization errors.

**Possible causes and solutions:**

Expand table

| Cause                     | Solution                                                                                                                              |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Invalid API token         | Regenerate the API token in Zendesk and update the **API Token** field.                                                               |
| Wrong email address       | Verify the **Email** matches the account that owns the API token.                                                                     |
| API token access disabled | In Zendesk, confirm token access is enabled under **Admin Center** &gt; **Apps and integrations** &gt; **APIs** &gt; **Zendesk API**. |
| Insufficient permissions  | Use an account with permission to access the resources you query.                                                                     |

## Connection errors

These errors occur when Grafana cannot reach the Zendesk API.

### Connection refused or timeout errors

**Symptoms:**

- **Save &amp; test** fails with `health check failed for 'Count tickets' query (error: ...)`, where the error describes a network or DNS failure.
- Queries fail with network errors.

**Solutions:**

1. Verify the **Subdomain** is correct. If your Zendesk URL is `https://company.zendesk.com`, the subdomain is `company`.
2. Confirm network connectivity from the Grafana server to `https://<subdomain>.zendesk.com`.
3. Check that firewall rules allow outbound HTTPS on port `443`.
4. For Grafana Cloud accessing a private network, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

## Query errors

These errors occur when running queries against the data source.

### No data or empty results

**Symptoms:**

- A query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                       |
|-------------------------------------|--------------------------------------------------------------------------------|
| The search query matches no records | Broaden the search expression or verify the data exists in Zendesk.            |
| Wrong resource type                 | Confirm the query type and parameters match the data you expect.               |
| Insufficient permissions            | Verify the account that owns the API token can access the requested resources. |

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log`, or your configured log location.
3. Look for Zendesk-specific entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried these solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Zendesk API documentation](https://developer.zendesk.com/api-reference/) for service-specific guidance.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
4. When you report an issue, include:

   - Your Grafana version and plugin version.
   - Error messages, with sensitive information redacted.
   - Steps to reproduce the problem.
   - Relevant configuration, with credentials redacted.
