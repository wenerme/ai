---
title: "Troubleshoot Amazon Aurora data source issues | Grafana Enterprise Plugins documentation"
description: "Solutions to common issues with the Amazon Aurora data source, including authentication, connection, and query errors."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Amazon Aurora data source issues

This document provides solutions to common issues you may encounter when configuring or using the Amazon Aurora data source. Sections are organized in the order you’re likely to encounter issues, from setup through querying.

## Version and upgrade guidance

Many issues are caused by running an outdated plugin version. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, the Amazon Aurora plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release.

### Check and update the plugin version

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Amazon Aurora** and open the plugin page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**.

For CLI-based updates and rollback instructions, refer to [Upgrade the plugin](/docs/plugins/grafana-aurora-datasource/latest/install/#upgrade-the-plugin).

## License and setup errors

These errors occur when the Enterprise plugin isn’t licensed or activated for your environment.

### Plugin doesn’t appear or can’t be installed

**Symptoms:**

- The plugin doesn’t appear in the plugin catalog.
- The **Install** button is missing from the plugin page.

**Possible causes and solutions:**

Expand table

| Cause                                   | Solution                                                                                                                                            |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Plan doesn’t include Enterprise plugins | The plugin requires a Grafana Cloud Pro or Advanced plan, or a Grafana Enterprise license. Free and Starter plans don’t include Enterprise plugins. |
| License doesn’t include the plugin      | Confirm your Grafana Enterprise license includes `grafana-aurora-datasource`, and contact your Grafana account team if it doesn’t.                  |
| Insufficient permissions                | Only organization administrators can install plugins.                                                                                               |

For installation instructions for each deployment environment, refer to [Install the Amazon Aurora data source plugin](/docs/plugins/grafana-aurora-datasource/latest/install/).

## Authentication errors

These errors occur when AWS credentials or IAM database authentication aren’t set up correctly.

### “Failed to build authentication token” or “Failed to get AWS credentials”

**Symptoms:**

- **Save &amp; test** fails before a database connection is attempted.
- Errors mention IAM, credentials, or `rds-db:connect`.

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                                                                                                                                                 |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Missing `rds-db:connect` permission | Attach a policy granting `rds-db:connect` for your cluster and database user. Refer to the [example IAM permissions](/docs/plugins/grafana-aurora-datasource/latest/configure/#example-iam-permissions). |
| Invalid or expired AWS credentials  | Verify the access key and secret key in the data source settings, or regenerate them in the AWS console.                                                                                                 |
| Wrong region                        | Verify **Default Region** matches the region of your Aurora cluster.                                                                                                                                     |

### “User is not authorized to perform sts:AssumeRole”

**Symptoms:**

- **Save &amp; test** fails with `AccessDenied: User is not authorized to perform sts:AssumeRole`.
- The error references the role you configured in **Assume Role ARN**.

When you configure **Assume Role ARN**, the identity that calls `sts:AssumeRole` is the one from your configured authentication provider, such as the IAM user whose access keys you entered, not a Grafana-owned AWS account.

**Solutions:**

1. Verify that the base credentials have `sts:AssumeRole` permission for the target role.
2. Verify that the target role’s trust policy names your IAM identity, or its AWS account, as the principal:

   JSON [Copy code to clipboard] Copy

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "AWS": "arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:user/<YOUR_IAM_USER>"
         },
         "Action": "sts:AssumeRole"
       }
     ]
   }
   ```
3. If the role was created with an external ID, confirm the **External ID** in the data source configuration matches the `sts:ExternalId` condition in the trust policy exactly.
4. Verify that the **Assume Role ARN** is correct and the role exists in the target account.

### “PAM authentication failed for user” or “Access denied for user”

**Symptoms:**

- **Save &amp; test** fails with an authentication error.
- Queries that previously worked start failing with these messages.

PostgreSQL-compatible clusters return `PAM authentication failed for user` and MySQL-compatible clusters return `Access denied for user`.

**Possible causes and solutions:**

Expand table

| Cause                                                  | Solution                                                                                                                                                                                                                          |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The RDS authentication token expired                   | The plugin automatically generates a new token and retries once. If failures persist, verify your AWS credentials are still valid.                                                                                                |
| The database user isn’t enabled for IAM authentication | Configure the user for IAM authentication. Refer to the [AWS guide to creating a database account using IAM authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html). |
| IAM database authentication is disabled on the cluster | Enable IAM database authentication on your Aurora cluster in the AWS console.                                                                                                                                                     |
| The wrong **Database User** is configured              | Verify the user name in the data source settings matches the database account configured for IAM authentication.                                                                                                                  |
| The cluster is behind a load balancer                  | The token must be generated for the actual cluster endpoint, not the load balancer endpoint. Refer to [Authentication fails behind a load balancer](#authentication-fails-behind-a-load-balancer).                                |

### Intermittent authentication failures with pooled connections

**Symptoms:**

- Queries fail intermittently with `PAM authentication failed for user` or `Access denied for user`, then succeed on the next attempt.
- Failures are more common with **Assume Role ARN** authentication and on busy dashboards.
- Re-saving the data source configuration temporarily resolves the issue.

**Cause:**

The plugin generates an RDS authentication token when it opens a database connection, and the token expires after 15 minutes. Connections are managed in a pool, and the plugin doesn’t currently expose connection pool settings such as maximum connection lifetime. When the pool opens a new connection after the token has expired, that connection fails to authenticate. This is a known limitation.

The plugin automatically generates a new token and retries a failed query once, so most expired-token failures recover without intervention.

**Solutions:**

1. Click **Save &amp; test** on the data source to force a reconnect with a fresh token.
2. Reduce the dashboard auto-refresh interval so queries run regularly. Steady query traffic keeps pooled connections active and reduces how often new connections are opened with an expired token.
3. If failures persist, verify the underlying AWS credentials and the assume role trust policy are still valid, because the automatic retry can’t recover from credentials that can no longer generate tokens.

## Connection errors

These errors occur when Grafana can’t reach your cluster endpoint.

### “Connection refused” or timeout errors

**Symptoms:**

- The data source test times out.
- Queries fail with network errors.

**Solutions:**

1. Verify network connectivity from the Grafana server to the cluster endpoint and port.
2. Check that security groups and firewall rules allow inbound traffic from Grafana to the database port.
3. For clusters in private networks with Grafana Cloud, configure [private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) and select the PDC connection in the data source settings.
4. Verify the **Database Host** and **Database Port** values match your cluster endpoint.

### “Failed to register RDS mysql certs”

**Symptoms:**

- Connections to MySQL-compatible clusters fail with `failed to register RDS mysql certs`.
- PostgreSQL-compatible data sources on the same Grafana instance work fine.

**Cause:**

For MySQL-compatible engines, the plugin downloads the RDS certificate bundle from `https://s3.amazonaws.com/rds-downloads/` when it opens a connection. If Grafana can’t reach S3, the connection fails.

**Solutions:**

1. Allow outbound HTTPS traffic from the Grafana server to `s3.amazonaws.com`.
2. If Grafana runs behind an HTTP proxy, verify the proxy allows this destination.

For all runtime network access the plugin needs, refer to [Network requirements](/docs/plugins/grafana-aurora-datasource/latest/install/#network-requirements).

### Authentication fails behind a load balancer

**Symptoms:**

- Grafana can reach the database through the load balancer, but authentication fails.

**Cause:**

The RDS authentication token must be generated for the actual cluster endpoint, not the load balancer endpoint.

**Solutions:**

1. Set **Database Host** and **Database Port** to the load balancer endpoint used for SQL connections.
2. Set **Advanced: DB Host For Auth** and **Advanced: DB Port For Auth** to the cluster endpoint behind the load balancer. Refer to [Separate host and port for authentication](/docs/plugins/grafana-aurora-datasource/latest/configure/#separate-host-and-port-for-authentication).

### Troubleshoot PDC connections

These issues are specific to [private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) deployments where Grafana Cloud connects to an Aurora cluster in a private network. The PDC agent requires outbound access to your cluster endpoint on the database port, and outbound access on port 22 (SSH) to Grafana Cloud endpoints for the tunnel.

**Symptoms:**

- **Save &amp; test** fails with `socks connect tcp ... host unreachable`.
- The PDC agent appears connected in the UI, but queries fail.
- Queries fail intermittently through PDC.

**Solutions:**

1. Verify that the PDC agent host can reach the cluster endpoint on the database port, for example with `nc -vz <DB_HOST> <DB_PORT>` from the agent host.
2. Check that firewall rules allow outbound traffic on both the database port and port 22. A common misconfiguration is blocking port 22 while allowing database traffic, which lets the agent register but prevents data from flowing.
3. Review the agent logs for connection or certificate errors, and verify the agent uses the manifest for your Grafana Cloud stack.
4. If the agent runs in Docker and connections drop intermittently, try the binary deployment instead to rule out container networking issues.

## Query errors

These errors occur when executing queries against your database.

### “No data” or empty results

**Symptoms:**

- The query executes without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                                                 |
|-------------------------------------|----------------------------------------------------------------------------------------------------------|
| The time range doesn’t contain data | Expand the dashboard time range, or check the time filter macros in your query, such as `$__timeFilter`. |
| The query filters out all rows      | Run the query without filters to confirm data exists, then add filters back one at a time.               |
| The database user lacks read access | Verify the database user has `SELECT` permission on the queried tables.                                  |

### Database errors in query results

**Symptoms:**

- Queries fail with SQL errors such as syntax errors, unknown columns, or constraint violations.

**Cause:**

The plugin passes your SQL directly to the database, so these errors originate from your query or schema, not from Grafana. The plugin classifies database-originated errors as downstream errors in Grafana logs and dashboards.

**Solutions:**

1. Verify your SQL uses the correct dialect: PostgreSQL syntax for PostgreSQL-compatible clusters and MySQL syntax for MySQL-compatible clusters.
2. Run the query directly against the database with an SQL client to confirm it’s valid.
3. Check that referenced tables and columns exist and that the configured **Database Name** is correct.

### Query timeouts

**Symptoms:**

- Long-running queries fail before completing.
- Alert evaluations fail with `context deadline exceeded`.

**Solutions:**

1. Optimize the query to reduce execution time:

   - Narrow the dashboard time range to scan less data.
   - Add `WHERE` clauses or a `LIMIT` to reduce the result set.
   - Add indexes on the columns used in time filters and joins.
2. On self-managed Grafana, increase the `dataproxy.timeout` setting in the Grafana configuration file.
3. For alert queries, return only the numeric value the condition evaluates instead of full result sets.

## Template variable errors

Issues specific to query variables that get their options from your database.

### Variables return no values

**Solutions:**

1. Test the data source connection in the data source settings.
2. Check that parent variables, for cascading variables, have valid selections.
3. Run the variable query in a panel or in Explore to confirm it returns rows.
4. Verify the database user has permission to read the tables used by the variable query.

### Variables are slow to load

**Solutions:**

1. Set the variable refresh to **On dashboard load** instead of **On time range change** to reduce how often the query runs.
2. Add a `LIMIT` clause to variable queries to reduce result set sizes.
3. Use `select distinct` on indexed columns where possible.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Enable debug logging for the plugin in the Grafana configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   filters = plugin.grafana-aurora-datasource:debug
   ```
2. Review logs in `/var/log/grafana/grafana.log`, or your configured log location.
3. Look for entries from the Aurora plugin that include connection and authentication details, such as which host is used for token generation.
4. Remove the filter after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried these solutions and still encounter issues:

1. Check the [Grafana Cloud status page](https://status.grafana.com/) to rule out active platform incidents.
2. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
3. Consult the [Amazon Aurora documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html) for cluster and IAM guidance.
4. Contact [Grafana Support](/profile/org#support) if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
5. When reporting issues, include:

   - Grafana and plugin versions
   - Error messages, with sensitive information redacted
   - Steps to reproduce
   - Relevant configuration, with credentials redacted
