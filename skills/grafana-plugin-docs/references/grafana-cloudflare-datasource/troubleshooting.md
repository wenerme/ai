---
title: "Troubleshoot Cloudflare data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Cloudflare data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Cloudflare data source issues

This document provides solutions to common issues you might encounter when configuring or using the Cloudflare data source. For configuration instructions, refer to [Configure the Cloudflare data source](/docs/plugins/grafana-cloudflare-datasource/latest/configure/).

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

| Cause               | Solution                                                                                                                            |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Invalid token       | Verify the token is correct in the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens). Regenerate if necessary. |
| Expired token       | Create a new token and update the data source configuration.                                                                        |
| Account-owned token | The plugin only supports user tokens. Create a user token instead.                                                                  |

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
3. Look for entries containing “cloudflare” for plugin-specific logs.
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
