---
title: "Troubleshoot Cloudflare data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Cloudflare data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Cloudflare data source issues

This document provides solutions to common issues you might encounter when configuring or using the Cloudflare data source. For configuration instructions, refer to [Configure the Cloudflare data source](/docs/plugins/grafana-cloudflare-datasource/latest/configure/).

## Installation and access issues

These issues occur before you can configure the data source, usually because of the Enterprise plugin entitlement.

### Can’t find or install the Cloudflare plugin

**Symptoms:**

- The Cloudflare data source doesn’t appear in the plugin catalog.
- You can’t add the Cloudflare data source in **Connections** &gt; **Add new connection**.

**Cause:**

The Cloudflare data source is a Grafana Enterprise plugin. It requires the appropriate entitlement on Grafana Cloud (Free, Pro, or Advanced tier) or an activated Grafana Enterprise license.

**Solutions:**

1. Confirm your plan tier includes Enterprise plugins. The Cloudflare data source is available on Grafana Cloud Free, Pro, and Advanced tiers and on Grafana Enterprise.
2. Verify that the Enterprise plugins entitlement is enabled for your account or stack.
3. On self-managed Grafana Enterprise, make sure the plugin is installed and your license is active. Refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).
4. If you believe you’re entitled to the plugin but it still doesn’t appear, contact your Grafana account team or [Grafana Support](/profile/org#support).

### Configuration page fails to load or errors on save

**Symptoms:**

- The Cloudflare data source configuration page doesn’t load.
- **Save &amp; test** returns an error that isn’t related to your token or permissions.

**Cause:**

A backend provisioning or entitlement issue is preventing the plugin from running.

**Solutions:**

1. First confirm the plugin entitlement is in place. Refer to [Can’t find or install the Cloudflare plugin](#cant-find-or-install-the-cloudflare-plugin).
2. If you’re entitled and the configuration page still fails to load or save, contact [Grafana Support](/profile/org#support). A backend fix might be required.

## Authentication errors

These errors occur when credentials are invalid, missing, or don’t have the required permissions.

### “invalid/empty bearer token”

**Symptoms:**

- Save &amp; test fails with “invalid/empty bearer token” error
- Data source configuration won’t save

**Solutions:**

1. Verify you’ve entered a token in the **Token** field.
2. Ensure you’re using an API token, not a Global API Key.
3. Check that the token was copied correctly without extra spaces.

### “status code: 400” or “Authentication error”

**Symptoms:**

- Save &amp; test fails with status code 400
- Queries return authentication errors

**Possible causes and solutions:**

Expand table

| Cause               | Solution                                                                                                                                                                                                                      |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Invalid token       | Verify the token is correct in the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens). Regenerate if necessary.                                                                                           |
| Expired token       | Create a new token and update the data source configuration.                                                                                                                                                                  |
| Token type mismatch | If you’re using an account-owned token, set **Token type** to **Account-owned token** and make sure the **Account ID** matches the token’s account. If you’re using a user token, set **Token type** to **User-owned token**. |

### “Access denied” or “Authorization failed”

**Symptoms:**

- Save &amp; test succeeds but queries fail
- Zone or account drop-downs are empty
- Queries return permission errors

**Solutions:**

1. Verify your API token has the required permissions. Refer to [Required permissions](/docs/plugins/grafana-cloudflare-datasource/latest/configure/#required-permissions).
2. Check that the token has access to the specific zones or accounts you’re querying.
3. Create a new token with the correct permissions:

   - **Account &gt; Account Settings &gt; Read** for account queries
   - **Zone &gt; Zone &gt; Read** for zone queries
   - **Zone &gt; Analytics &gt; Read** for DNS analytics queries
   - **Zone &gt; Load Balancers &gt; Read** for load balancer queries
   - **Account &gt; API Tokens &gt; Read** for token queries

If only the zone or account drop-downs are empty, refer to [Zone or account drop-downs are empty](#zone-or-account-drop-downs-are-empty).

## Connection errors

These errors occur when Grafana can’t reach Cloudflare’s API endpoints.

### “Connection refused” or timeout errors

**Symptoms:**

- Data source test times out
- Queries fail with network errors
- Intermittent connection issues

**Solutions:**

1. Verify network connectivity from the Grafana server to `api.cloudflare.com`.
2. Check that firewall rules allow outbound HTTPS (port 443) to Cloudflare.
3. For Grafana Cloud with private networks, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).
4. Check Cloudflare’s [system status](https://www.cloudflarestatus.com/) for any ongoing incidents.

## Query errors

These errors occur when executing queries against the Cloudflare API.

### “No data” or empty results

**Symptoms:**

- Query executes without error but returns no data
- Charts show “No data” message
- Tables are empty

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                             |
|---------------------------------|----------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists in Cloudflare. |
| Wrong zone selected             | Verify you’ve selected the correct zone from the drop-down.          |
| No DNS traffic                  | Confirm the zone has DNS traffic during the selected time period.    |
| Permissions issue               | Verify the token has Analytics read access for the selected zone.    |

### Query timeout

**Symptoms:**

- Query runs for a long time then fails
- Error mentions timeout

**Solutions:**

1. Narrow the time range to reduce data volume.
2. Reduce the **Limit** parameter for analytics queries.
3. Remove dimensions to reduce result set size.
4. For DNS analytics, try querying a shorter time period first.

### Zone or account drop-downs are empty

**Symptoms:**

- Zone ID drop-down shows no options
- Account ID drop-down shows no options

**Solutions:**

1. Verify the API token has **Zone &gt; Zone &gt; Read** permission for zones.
2. Verify the API token has **Account &gt; Account Settings &gt; Read** permission for accounts.
3. Check that the token scope includes the zones/accounts you expect to see.
4. Test the token directly with the Cloudflare API to verify access.

If queries also fail with permission errors, refer to [“Access denied” or “Authorization failed”](#access-denied-or-authorization-failed).

## Radar query issues

### Radar queries return no data

**Symptoms:**

- Radar queries execute but return empty results
- Time series show no data points

**Solutions:**

1. Radar APIs are publicly accessible and don’t require special permissions.
2. Verify the dashboard time range is reasonable (Radar data may have delays).
3. Check that Cloudflare Radar is operational at [radar.cloudflare.com](https://radar.cloudflare.com/).

## Performance issues

### Slow queries or API throttling

**Symptoms:**

- Queries take a long time to complete
- Intermittent failures
- “Rate limit” errors

**Solutions:**

1. Reduce the frequency of dashboard auto-refresh.
2. Increase the time range granularity to reduce API calls.
3. Use query caching in Grafana (available in Grafana Enterprise and Grafana Cloud).
4. Reduce the number of panels querying the same data source simultaneously.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Look for entries containing `cloudflare` for plugin-specific logs.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried these solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [Cloudflare API documentation](https://developers.cloudflare.com/api/) for API-specific errors.
3. Contact [Grafana Support](/profile/org#support) if you’re a Grafana Cloud or Enterprise customer.

When reporting issues, include:

- Grafana version
- Plugin version
- Error messages (redact sensitive information like tokens)
- Steps to reproduce
- Relevant configuration (redact credentials)
