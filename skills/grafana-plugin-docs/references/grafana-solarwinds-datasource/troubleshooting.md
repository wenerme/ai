---
title: "Troubleshoot the SolarWinds data source | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the SolarWinds data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot the SolarWinds data source

This document provides solutions to common issues you might encounter when you configure or use the SolarWinds data source. For configuration instructions, refer to [Configure the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/).

## Installation errors

These issues occur when the plugin doesn’t appear or can’t be installed.

### SolarWinds doesn’t appear in the plugin catalog or data source list

**Symptoms:**

- The plugin doesn’t appear when you search the plugin catalog.
- The plugin appears but there’s no **Install** button.
- **SolarWinds** isn’t listed when you add a new data source.

**Possible causes and solutions:**

Expand table

| Cause                              | Solution                                                                                                                                                                                                                                                                                |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| No valid Enterprise license        | The SolarWinds data source is an Enterprise plugin. Confirm your Grafana instance has a valid Grafana Enterprise license or an eligible Grafana Cloud plan. The plugin only appears when the license is valid.                                                                          |
| Grafana version too old            | Upgrade to Grafana 11.6.7 or later.                                                                                                                                                                                                                                                     |
| Grafana Cloud propagation delay    | On Grafana Cloud, it can take up to 15 minutes for the plugin to appear after installation.                                                                                                                                                                                             |
| Air-gapped installation incomplete | Verify the plugin archive is extracted into the plugins directory as `grafana-solarwinds-datasource` and restart Grafana. For steps, refer to [Install in an air-gapped environment](/docs/plugins/grafana-solarwinds-datasource/latest/install/#install-in-an-air-gapped-environment). |

## Plugin and UI issues

These issues occur when the plugin’s pages don’t render correctly.

### Configuration page is blank

**Symptoms:**

- The SolarWinds data source configuration page renders blank.
- You can’t view or edit the data source settings.
- You can’t query the data source in Explore.

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                                                                                                                                        |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Outdated plugin version        | Upgrade the plugin to the latest version. For steps, refer to [Check and upgrade the plugin version](/docs/plugins/grafana-solarwinds-datasource/latest/troubleshooting/#check-and-upgrade-the-plugin-version). |
| Grafana Cloud deployment issue | If upgrading doesn’t resolve the problem, contact Grafana Support. A blank page can result from a stuck deployment on Grafana Cloud.                                                                            |

### Check and upgrade the plugin version

Keeping the plugin up to date resolves many rendering and compatibility issues.

On Grafana Cloud, plugins are updated automatically, but you can confirm the version:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for `SolarWinds` and select the plugin.
3. Review the installed version. If an update is available, click **Update**.

On self-managed Grafana, update the plugin through the catalog or with Grafana CLI:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for `SolarWinds` and select the plugin.
3. If an update is available, click **Update**.

Alternatively, update the plugin with Grafana CLI, then restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana-cli plugins update grafana-solarwinds-datasource
```

## Connection and TLS errors

These errors occur when Grafana can’t reach your SolarWinds instance or can’t verify its certificate.

### “Connection refused”, “i/o timeout”, or timeout errors

**Symptoms:**

- Save &amp; test times out or fails with a network error.
- The error mentions `i/o timeout`, often while running the health check query `SELECT TOP 1 Uri FROM Orion.Pollers`.
- Queries fail with connection errors.

**Possible causes and solutions:**

Expand table

| Cause                     | Solution                                                                                                                                                                                                       |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Orion web UI URL used     | Enter only the scheme and host in the **URL** field, such as `https://solarwinds.example.com`. Don’t use the Orion web UI URL, such as `https://solarwinds.example.com/Orion/SummaryView.aspx`.                |
| Port or path added to URL | Remove any port, path, or trailing slash. The data source appends the SWIS port (`17774`) and API path automatically.                                                                                          |
| Port `17774` not open     | An `i/o timeout` usually means the SWIS API port isn’t reachable. Confirm that Grafana can reach the SolarWinds server on port `17774`. Port `443` serves the Orion web UI and isn’t used by this data source. |
| Firewall rules            | Allow outbound connectivity from the Grafana server to the SolarWinds server on port `17774`.                                                                                                                  |
| Private network           | For Grafana Cloud, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) to reach a private instance.                                            |

To test connectivity from the Grafana server to the SWIS API, refer to [Verify connectivity to the SWIS API](/docs/plugins/grafana-solarwinds-datasource/latest/troubleshooting/#verify-connectivity-to-the-swis-api).

### Verify connectivity to the SWIS API

To confirm that the Grafana server can reach the SolarWinds SWIS API, run these commands from the Grafana server.

1. Test that the port is open, replacing the host with your SolarWinds server:

   Bash [Copy code to clipboard] Copy

   ```bash
   nc -vz <SOLARWINDS_HOST> 17774
   ```
2. Test the SWIS API endpoint with your credentials. A `200` response confirms connectivity and authentication:

   Bash [Copy code to clipboard] Copy

   ```bash
   curl -u '<USERNAME>:<PASSWORD>' \
     'https://<SOLARWINDS_HOST>:17774/SolarWinds/InformationService/v3/Json/Query?query=SELECT%20TOP%201%20Uri%20FROM%20Orion.Pollers'
   ```

   If your SolarWinds server uses a self-signed certificate, add the `-k` flag to skip certificate verification for the test.

A connection timeout indicates a port or firewall problem. A `401` response indicates an authentication problem. A `500` response often indicates an incorrect URL or a SWIS API configuration issue.

### “Unable to verify TLS certificate” or other TLS certificate errors

**Symptoms:**

- Save &amp; test fails with `Health check failed: Unable to verify TLS certificate`.
- The error mentions an unknown authority or a certificate that can’t be verified.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                           |
|------------------------------|----------------------------------------------------------------------------------------------------|
| Self-signed certificate      | Enable **Add self-signed certificate** in the data source settings and provide the CA certificate. |
| Custom certificate authority | Add the CA certificate so Grafana can verify the connection.                                       |
| Testing only                 | Enable **Skip TLS certificate validation** to bypass verification. Don’t use this in production.   |

> Note
>
> A working `curl -k` from the Grafana server doesn’t guarantee that Grafana can connect. The Grafana backend uses the Go runtime, which enforces stricter certificate compliance than `curl`.

### “x509: negative serial number”

**Symptoms:**

- Save &amp; test fails with an `x509: negative serial number` error.
- The error persists even after you enable **Skip TLS certificate validation**.

**Cause:**

The SolarWinds server presents a certificate with a negative serial number. The Go runtime that the Grafana backend uses rejects these certificates because they don’t comply with the certificate standard. This is why `curl -k` can succeed on the same machine while Grafana fails.

**Solutions:**

1. Reissue the SolarWinds server certificate with a positive serial number.
2. Install the reissued certificate on the SolarWinds server.
3. If the certificate is self-signed, enable **Add self-signed certificate** in the data source settings and provide the new CA certificate.
4. Click **Save &amp; test** to confirm the connection succeeds.

## Authentication errors

These errors occur when credentials are invalid, missing, or lack the required permissions.

### “401 Unauthorized” or “Access denied”

**Symptoms:**

- Save &amp; test fails with a `401` or authorization error.
- Queries return access-denied messages.

**Possible causes and solutions:**

Expand table

| Cause                       | Solution                                                                                                          |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------|
| Invalid credentials         | Verify the **Username** and **Password** are correct for your SolarWinds instance.                                |
| No SWIS API access          | Confirm the account is allowed to authenticate against the SWIS API, not only the Orion web console.              |
| Missing permissions         | Confirm the account has permission to read the entities you query, such as `Orion.Nodes` and `Orion.AlertActive`. |
| Expired or changed password | Update the password in the data source configuration.                                                             |

## Server errors

These errors occur when Grafana reaches the SolarWinds server but the request fails.

### “500 Internal Server Error”

**Symptoms:**

- Save &amp; test or a query fails with a `500` error.

**Possible causes and solutions:**

Expand table

| Cause                  | Solution                                                                                                                               |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Incorrect URL          | Verify the **URL** is the base host only, without the Orion web UI path. The data source appends the SWIS port and path automatically. |
| SWIS API configuration | Confirm the SWIS API is running and configured to accept the credentials you provided.                                                 |

## Query errors

These errors occur when you run SWQL queries against the data source.

### SWQL syntax errors

**Symptoms:**

- The query fails with a syntax or parsing error.
- The error references an invalid entity or property.

**Solutions:**

1. Verify the query uses valid SWQL syntax accepted by the SolarWinds API.
2. Confirm that the entity and property names exist, for example `Orion.Nodes` and `CPULoad`.
3. Test the query in the SolarWinds SWQL Studio before using it in Grafana.

### “No data” or empty results

**Symptoms:**

- The query runs without error but returns no data.
- Panels show a “No data” message.

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                                          |
|--------------------------|-------------------------------------------------------------------|
| Query matches no records | Verify the entity contains data for the conditions in your query. |
| Time range mismatch      | Expand the dashboard time range if your query depends on it.      |
| Permissions              | Confirm the account has read access to the requested entities.    |

## Template variable errors

These errors occur when you use template variables with the data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection works by testing it in the data source settings.
2. Confirm the SWQL variable query returns rows when run in the query editor.
3. Check that parent variables, for cascading variables, have valid selections.
4. Confirm the account has permission to read the requested entities.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` or your configured log location.
3. Look for SolarWinds data source entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the previous solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [SolarWinds Query Language (SWQL) documentation](https://support.solarwinds.com/SuccessCenter/s/article/Use-SolarWinds-Query-Language-SWQL?language=en_US) for query-specific guidance.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Advanced user. Open a support ticket through your [Grafana support channel](/profile/org#support).
4. When you report an issue, include:

   - Grafana version and plugin version.
   - Error messages, with sensitive information redacted.
   - Steps to reproduce the issue.
   - Relevant configuration, with credentials redacted.
