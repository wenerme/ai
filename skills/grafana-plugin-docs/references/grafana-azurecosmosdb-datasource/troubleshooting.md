---
title: "Troubleshoot the Azure Cosmos DB data source | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Azure Cosmos DB data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot the Azure Cosmos DB data source

This document provides solutions to common issues you might encounter when you configure or use the Azure Cosmos DB data source. For configuration instructions, refer to [Configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/).

## License and setup errors

The Azure Cosmos DB data source is a Grafana Enterprise plugin. These errors occur when the plugin isn’t licensed, activated, or installed.

### The plugin doesn’t appear in the catalog

The plugin isn’t listed under **Plugins and data** &gt; **Plugins**, or you can’t add it as a data source.

**Possible causes and solutions:**

Expand table

| Cause                                   | Solution                                                                                                      |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| Plan doesn’t include Enterprise plugins | Confirm your Grafana Cloud plan is Pro or Advanced. The Free plan doesn’t include Enterprise plugins.         |
| Plugin not activated                    | Contact your Grafana account team to add the plugin to your organization.                                     |
| License missing the plugin              | On self-managed Grafana, confirm your Grafana Enterprise license includes `grafana-azurecosmosdb-datasource`. |

### The `Plugin health check failed` error

**Save &amp; test** returns a generic health check error, or the **Install** button doesn’t appear.

**Solutions:**

1. Confirm the plugin is licensed and activated for your environment. Refer to [Install and upgrade the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/install/).
2. On self-managed Grafana, verify the Enterprise license is active under **Administration** &gt; **General** &gt; **Stats and license**.
3. Verify you have the organization administrator role.

## Version and upgrade guidance

Many Azure Cosmos DB issues are caused by running an outdated plugin version. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, the Azure Cosmos DB plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update the plugin manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release.

To check and update the plugin version:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Azure Cosmos DB** and open its page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**.

For upgrade steps across environments, refer to [Install and upgrade the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/install/).

## Authentication errors

These errors occur when the account endpoint or account key is missing or invalid.

### The `account endpoint is empty` error

This error appears when you save the data source without an account endpoint.

**Solutions:**

1. Open the data source configuration.
2. In **Account Endpoint**, enter your Azure Cosmos DB account URI, for example `https://<account-name>.documents.azure.com:443/`.
3. Click **Save &amp; test**.

### The `account key is empty` error

This error appears when you save the data source without an account key.

**Solutions:**

1. Open the data source configuration.
2. In **Account Key**, enter your primary or secondary account key.
3. Click **Save &amp; test**.

### The `failed to create CosmosDB client, validate account key and endpoint` error

This error appears when the account key isn’t a valid key, so Grafana can’t create a client.

**Solutions:**

1. Copy a current primary or secondary key from the Azure portal and paste it into the **Account Key** field. Don’t include extra spaces or partial values.
2. Verify the **Account Endpoint** is the full account URI, for example `https://<account-name>.documents.azure.com:443/`.
3. Click **Save &amp; test**.

### Save &amp; test fails with an authorization or connection error

**Save &amp; test** fails with an error returned by Azure Cosmos DB, such as a `401 Unauthorized` response, or with a timeout. The account endpoint and key are present, but the connection to Azure Cosmos DB doesn’t succeed.

**Possible causes and solutions:**

Expand table

| Cause                            | Solution                                                                                                                                                                                                                            |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Wrong account endpoint           | Verify the endpoint is the full `.documents.azure.com` URI from the Azure portal, including the `https://` scheme and port. A shortened or incorrect host causes the connection to fail.                                            |
| Wrong or rotated account key     | Copy a current primary or secondary key from the Azure portal and update the **Account Key** field. Verify the key directly against the account, for example with the Azure portal or a `curl` request, before retrying.            |
| Insufficient key permissions     | Use an account key that grants read access to the databases and containers you query.                                                                                                                                               |
| Firewall or network restrictions | If the account uses IP firewall rules or virtual network restrictions, allow your Grafana instance’s outbound addresses. For Grafana Cloud, allow its outbound IP addresses or use PDC. Refer to the connection errors that follow. |
| Plugin not licensed              | Confirm your plan or license includes the Enterprise plugin. Refer to [License and setup errors](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/#license-and-setup-errors).                                  |

## Connection errors

These errors occur when Grafana can’t reach the Azure Cosmos DB endpoint.

### Connection refused or timeout errors

The data source test times out or queries fail with network errors.

**Solutions:**

1. Verify network connectivity from the Grafana server to your Azure Cosmos DB endpoint.
2. Check that firewall rules allow outbound HTTPS on port 443.
3. Verify that the Azure Cosmos DB account firewall allows requests from your Grafana instance. If the account uses IP firewall rules or virtual network restrictions, add your Grafana instance’s outbound addresses to the allowlist.
4. For Grafana Cloud, configure [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) if you’re accessing an Azure Cosmos DB account on a private network.

## Query errors

These errors occur when you run queries against the data source.

### The `select a database` or `select a container` error

These errors appear when a query runs without a database or container selected.

**Solutions:**

1. In the query editor header, select a **Database**.
2. Select a **Container**.
3. Run the query again.

### The `sql is empty` error

This error appears when the query editor doesn’t contain a query.

**Solutions:**

1. Enter an Azure Cosmos DB for NoSQL query in the **Query** field.
2. Click outside the editor or save the query to run it.

### Cross-partition query errors

When the **PartitionKey** field is empty, the query runs across all partitions. Multi-partition queries don’t support the `TOP`, `ORDER BY`, `OFFSET`, `LIMIT`, `Aggregates`, `DISTINCT`, and `GROUP BY` keywords, so queries that use them fail or return an error.

This most commonly affects aggregate queries, including alert queries such as the following:

SQL [Copy code to clipboard] Copy

```sql
SELECT COUNT(1) FROM c WHERE c.level = "error"
```

To run this kind of query, scope it to a single partition.

**Solutions:**

1. Enter a partition key value in the **PartitionKey** field to run a single-partition query, then run the query again.
2. Alternatively, rewrite the query to avoid the unsupported keywords.
3. For alert rules, restructure the query so it targets a single partition, because aggregates aren’t supported across partitions.

> Note
>
> Older plugin versions had a bug where the `x-ms-documentdb-query-enablecrosspartition` header was set incorrectly, which caused Azure Cosmos DB to reject some queries. This is fixed in current versions. If you see cross-partition header errors, update the plugin. Refer to [Version and upgrade guidance](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

### No data or empty results

The query runs without error but returns no data.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                                                                                                                   |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Query doesn’t filter by time    | If the query doesn’t include a `$__timeFilter`, `$__timeFrom`, or `$__timeTo` macro, the dashboard time range doesn’t affect the results. Add a time macro to scope the query to the dashboard time range. |
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists for the selected period.                                                                                                                             |
| Wrong database or container     | Verify you selected the correct database and container.                                                                                                                                                    |
| Time filter column mismatch     | Verify the column passed to `$__timeFilter`, `$__timeFrom`, or `$__timeTo` exists and stores timestamps.                                                                                                   |

## Template variable errors

These errors occur when you use template variables with the data source.

### Variables return no values

Variable drop-downs are empty or fail to load.

**Solutions:**

1. Verify the data source connection works by testing it in the data source settings.
2. For **Containers** variables, confirm the parent database variable has a valid selection.
3. Verify the account key has read access to the requested databases and containers.

## Performance issues

These issues relate to slow queries or request limits.

### Rate limit or throttling errors

Dashboard panels intermittently fail to load, or Azure Cosmos DB returns throttling responses.

**Solutions:**

1. Reduce the frequency of dashboard refreshes.
2. Narrow the time range and add filters to reduce the amount of data scanned.
3. Enable query caching in Grafana, which is available in Grafana Enterprise and Grafana Cloud.
4. Increase the provisioned throughput (RU/s) for the container in Azure Cosmos DB.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log`, or your configured log location.
3. Look for entries related to the `grafana-azurecosmosdb-datasource` plugin.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried these solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Azure Cosmos DB documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/) for service-specific guidance.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
4. When you report an issue, include:

   - Your Grafana version and plugin version.
   - Error messages, with sensitive information redacted.
   - Steps to reproduce the issue.
   - Relevant configuration, with credentials redacted.
