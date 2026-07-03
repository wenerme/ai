---
title: "Troubleshoot MongoDB data source issues | Grafana Enterprise Plugins documentation"
description: "This document provides troubleshooting guidance for the MongoDB data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot MongoDB data source issues

This document provides solutions to common issues you may encounter when installing, configuring, or using the MongoDB data source plugin. Issues are organized by the stage at which they occur, from installation through to querying.

## Licensing and installation issues

The MongoDB data source is an Enterprise plugin that requires a valid license. These issues prevent the plugin from working at all. For installation, upgrade, and rollback steps, refer to [Install and upgrade the MongoDB data source plugin](/docs/plugins/grafana-mongodb-datasource/latest/install/).

### “Plugin health check failed” after installation

If Save &amp; test returns “Plugin health check failed” immediately after installing the plugin, the most common cause is a missing Enterprise Plugins entitlement.

**Possible causes and solutions:**

Expand table

| Cause                                           | Solution                                                                                                                                                                                                                           |
|-------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Grafana Cloud Free plan                         | The MongoDB plugin is not available on the Free tier. Upgrade to a Pro (with Enterprise Plugins add-on) or Advanced plan.                                                                                                          |
| Pro plan without add-on                         | Upgrading from Free to Pro does not automatically include Enterprise plugins. You must purchase the Enterprise Plugins add-on separately. Contact Grafana Sales or check your plan details in **grafana.com** &gt; **My Account**. |
| Self-managed Grafana without Enterprise license | Activate a valid [Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).                                                                                                                          |
| License not provisioned after contract change   | Contact [Grafana Support](/help/) to verify your license entitlements are correctly provisioned.                                                                                                                                   |

### Plugin stops working after a contract change

If the plugin was working but stops after a contract modification (for example, changing from “all enterprise plugins” to a specific plugin entitlement), the new license may not have been provisioned correctly.

**Solutions:**

1. Verify your current entitlements in the Grafana Cloud portal under your organization settings.
2. Contact [Grafana Support](/help/) to confirm the new license includes the MongoDB data source plugin.
3. For self-managed Grafana, re-download and apply the updated license file.

### Cannot reinstall after uninstalling

> Warning
>
> Do not uninstall Enterprise plugins as a troubleshooting step. Reinstalling Enterprise plugins requires contacting Grafana Support.

If you have uninstalled the MongoDB plugin and need to reinstall it:

1. Contact [Grafana Support](/help/) and request that the plugin be reinstalled.
2. Provide your organization name and Grafana instance URL.

## Connection issues

Connection issues are typically indicated by the error message: “The connection can not be established.” Before troubleshooting in Grafana, verify that your MongoDB instance is reachable.

### Verify MongoDB connectivity

If you have `mongosh` installed on your local machine ([refer to the MongoDB documentation](https://www.mongodb.com/docs/mongodb-shell/)), test connectivity by running:

sh [Copy code to clipboard] Copy

```sh
mongosh "<CONNECTION_STRING>" --eval "db.adminCommand('ping')"
```

For example:

sh [Copy code to clipboard] Copy

```sh
mongosh "mongodb://username:password@127.0.0.1:27017/?authSource=admin" --eval "db.adminCommand('ping')"
```

The ping should succeed within a few seconds. If it doesn’t, your MongoDB instance might not be properly exposed for external access.

### Connection string format

Ensure your connection string follows the correct MongoDB URI format:

[Copy code to clipboard] Copy

```none
mongodb://[username:password@]host[:port][/database][?options]
```

Or for SRV connections:

[Copy code to clipboard] Copy

```none
mongodb+srv://[username:password@]host[/database][?options]
```

Common connection string mistakes include:

- Missing the `mongodb://` or `mongodb+srv://` protocol prefix
- Including multiple `@` signs that are not percent-encoded
- Missing or incorrect host information
- Leaving the connection string empty

### Special characters in credentials

If your username or password contains special characters such as `@`, `:`, `/`, `?`, or `#`, you may encounter “`unescaped` @ sign in user info” or similar connection errors.

**Recommended approach:** Instead of embedding credentials in the connection string, use the separate **User** and **Password** fields under the **Credentials** authentication method. This avoids encoding issues entirely.

If you must include credentials in the connection string, percent-encode all special characters:

[Copy code to clipboard] Copy

```none
mongodb://user:p%40ssw0rd@localhost:27017
```

> Note
>
> The `@` that separates the password from the host should *not* be encoded.

> Caution
>
> Percent-encoding alone may not be sufficient in all cases. If you continue to see authentication errors after encoding, move credentials out of the connection string and use the dedicated **Credentials** authentication fields instead.

For a complete list of characters that require encoding, refer to [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/) in the MongoDB documentation.

Starting with plugin version 1.25.0, the plugin includes a fallback mechanism that attempts to connect with both encoded and non-encoded versions of the connection string. However, using the separate credentials fields remains the most reliable approach.

### Password field shows “Configured” and cannot be edited

After saving the data source configuration, the password field displays **Configured** instead of the actual value. This is expected behavior – Grafana does not display stored secrets.

**Symptoms:**

- The password field shows “Configured” and appears locked
- You cannot directly edit the stored password value
- Changing the connection string does not reset the password

**Solutions:**

1. Click the **Reset** button next to the password field to clear the stored value, then enter the new password.
2. If the Reset button is not available, delete the data source and recreate it with the correct credentials.
3. For automated credential updates, use the [Grafana HTTP API](/docs/grafana/latest/developers/http_api/data_source/) or [Terraform provisioning](/docs/plugins/grafana-mongodb-datasource/latest/configure/#provision-with-terraform) to update the data source configuration programmatically.

### Connection string format differences across plugin versions

Connection string parsing has improved across plugin versions. A connection string that works in newer versions (1.24+) may not work in older versions, and vice versa.

**Symptoms:**

- A connection string that previously worked throws “invalid format” after a plugin upgrade or downgrade
- Connection strings with certain special characters work in one version but not another

**Solutions:**

1. Always use the latest plugin version to benefit from improved connection string handling.
2. If you must use an older plugin version, simplify your connection string by moving credentials to the separate authentication fields.
3. Refer to the [CHANGELOG](/docs/plugins/grafana-mongodb-datasource/latest/) for connection-string-related fixes in specific versions.

### Network requirements for Grafana Cloud

If you’re connecting from Grafana Cloud to a MongoDB instance that requires IP allowlisting, you must allow the entire Grafana Cloud IP range – a single static IP address is not available.

To get the current list of Grafana Cloud source IP addresses:

1. Download the IP list from [https://grafana.com/api/hosted-grafana/source-ips.txt](/api/hosted-grafana/source-ips.txt).
2. Add all listed IP ranges to your MongoDB instance’s network access list (for example, in MongoDB Atlas under **Network Access** &gt; **IP Access List**).
3. Re-check the list periodically, as IP addresses may be added over time.

> Note
>
> If IP whitelisting is impractical due to the number of addresses, consider using [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) instead for a private, secured connection.

### Server selection timeout or “ReplicaSetNoPrimary”

If you see a “server selection timeout” or “ReplicaSetNoPrimary” error, the plugin cannot establish a connection to the MongoDB server. This is the most common connection error.

**Possible causes and solutions:**

Expand table

| Cause                                         | Solution                                                                                                                                                                                                 |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MongoDB server is not running                 | Verify the server is running and accessible. Test with `mongosh`.                                                                                                                                        |
| Firewall blocking port 27017                  | Add the Grafana IP addresses to your allowlist. For Grafana Cloud, use the [full IP range](/api/hosted-grafana/source-ips.txt).                                                                          |
| DNS resolution failure                        | Verify the hostname resolves correctly from the Grafana server. For SRV records (`mongodb+srv://`), ensure the DNS TXT and SRV records are accessible.                                                   |
| Replica set member not reachable              | Ensure all replica set members (not just the primary) are accessible from Grafana. MongoDB drivers connect to secondaries for discovery.                                                                 |
| PDC tunnel not configured                     | For private networks on Grafana Cloud, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).                                              |
| MongoDB Atlas tier upgrade or topology change | After upgrading Atlas tiers (for example, M0 to M10) or changing replica set configuration, hostnames and DNS records may change. Re-validate your connection string and update the allowlist if needed. |

**Steps to diagnose:**

1. Verify the MongoDB server is running and accessible.
2. Check that port 27017 (or your custom port) is open and not blocked by firewalls.
3. Confirm the host address is correct and resolvable from the Grafana server.
4. For replica sets, verify all members listed in the connection string are individually accessible.
5. If using MongoDB Atlas, check the **Network Access** and **Database Access** settings in the Atlas console.

### Connection failures after MongoDB upgrades

Connections that previously worked can break after upgrading your MongoDB deployment (for example, Atlas tier changes, replica set reconfiguration, or MongoDB version upgrades).

**Symptoms:**

- Data source test fails with timeout or connection errors after a MongoDB-side change
- “ReplicaSetNoPrimary” errors appear after an Atlas tier upgrade
- Connection string that worked before now returns “no such host”

**Solutions:**

1. Check if hostnames or DNS records changed as part of the upgrade. Atlas tier migrations (for example, M0 shared to M10 dedicated) assign new hostnames.
2. Retrieve the updated connection string from the MongoDB Atlas console (or your provider’s dashboard) and update the Grafana data source configuration.
3. Verify that all new IP addresses or hostnames are in your network allowlist.
4. If using SRV connection strings (`mongodb+srv://`), confirm that DNS SRV and TXT records have propagated after the change.

### No such host error

This error indicates DNS resolution failure. Verify that:

- The hostname in your connection string is spelled correctly.
- The DNS server can resolve the hostname.
- For local deployments, consider using the IP address instead of the hostname.

## Authentication issues

Authentication errors occur when the plugin cannot verify your credentials with the MongoDB server.

### Invalid username or password

If you receive “The username and/or password cannot be verified,” check the following:

- Verify credentials are correct by testing them with `mongosh`.
- If using the separate **User** and **Password** fields in Grafana (Credentials authentication), ensure you haven’t also included credentials in the connection string.
- Check that the authentication database is correctly specified using the `authSource` query parameter if your user is not in the default `admin` database.

### Escaped characters in passwords

If your password contains special characters and authentication fails, verify that:

- Special characters (`@`, `:`, `/`, `?`, `#`) are percent-encoded in the connection string.
- If using the **Credentials** authentication method with separate **User** and **Password** fields, enter the password without encoding (the plugin handles encoding automatically).
- The `@` separator between credentials and host is not encoded.

### Kerberos authentication

If Kerberos authentication fails with “The Kerberos credentials cannot be verified,” verify the following:

- The Kerberos build of the plugin is installed (available from the [custom Kerberos build](https://storage.googleapis.com/integration-artifacts/grafana-mongodb-datasource-kerberos/release/latest/linux/grafana-mongodb-datasource-latest.linux_amd64.zip)).
- The connection string includes `authMechanism=GSSAPI`.
- The `keytab` path or `ccache` path is correct and accessible.

- On Linux, the `libkrb5` library is installed:

  sh [Copy code to clipboard] Copy

  ```sh
  apt-get install -y libkrb5-dev
  ```

## TLS and certificate issues

TLS certificate errors occur when the plugin cannot validate the certificates used to secure the connection to MongoDB.

### Invalid CA certificate

If you receive “The CA certificate cannot be verified,” check that:

- The CA certificate is in valid PEM format.
- The certificate has not expired.
- The certificate is the correct CA that signed the server’s certificate.
- The certificate size does not exceed 64KB.

### Invalid client certificate

If you receive “The client certificate cannot be verified,” verify that:

- Both the client certificate and client key are provided.
- The certificate and key are in valid PEM format.
- The certificate and key match (they were generated together).
- If the private key is encrypted, provide the correct password in the **TLS CA key file password** field under **Additional Settings**.
- The certificate size does not exceed 64KB.

### Encrypted private key issues

If your private key is encrypted and you see an error about decryption:

- Ensure you’ve provided the correct password for the encrypted key in the **TLS CA key file password** field.
- The plugin supports PKCS#5 v2.0 and PKCS#8 encrypted keys. Other encryption schemes may not work.

### Connect to AWS DocumentDB with TLS

AWS DocumentDB requires TLS connections and uses its own CA certificate bundle. If you see “x509: certificate signed by unknown authority” when connecting to DocumentDB, follow these steps:

**Direct connection (self-managed Grafana):**

1. Download the AWS DocumentDB CA bundle from [https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem](https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem).
2. In the MongoDB data source settings, check **Add self-signed certificate**.
3. Paste the full contents of `global-bundle.pem` into the **CA certificate** field.
4. Ensure your connection string includes `tls=true&tlsCAFile=global-bundle.pem` or relies on the CA certificate configured in Grafana (remove `tlsCAFile` from the connection string if specifying the CA in the UI).
5. Click **Save &amp; test**.

**Connection via Private data source connect (Grafana Cloud):**

When connecting through PDC, the TLS handshake occurs between the PDC agent and DocumentDB, not between Grafana Cloud and DocumentDB. The CA certificate configured in the Grafana UI may not be applied correctly through the PDC tunnel.

If you see “x509: certificate signed by unknown authority” when using PDC with DocumentDB:

1. First, try configuring the CA certificate in the Grafana UI as described in the direct connection steps.
2. If that does not work, check **Skip TLS certificate validation** as a workaround. This bypasses certificate verification for the connection.

> Caution
>
> Skipping TLS validation reduces connection security. Use this workaround only when the CA certificate cannot be validated through the PDC tunnel, and ensure your PDC connection itself is secured.

**DocumentDB connection string example:**

[Copy code to clipboard] Copy

```none
mongodb://<USERNAME>:<PASSWORD>@docdb-cluster.cluster-xxxx.us-east-1.docdb.amazonaws.com:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false
```

> Note
>
> AWS DocumentDB does not support `retryWrites=true`. Ensure your connection string includes `retryWrites=false` or omits the parameter entirely.

## Query issues

Query errors can occur due to unsupported commands, syntax problems, or data type handling issues.

### Unsupported commands

The MongoDB data source only supports the following read commands:

- `find`
- `aggregate`

The following diagnostic commands are also supported:

- `buildInfo`
- `connPoolStats`
- `connectionStatus`
- `dbStats`
- `getLog`
- `hostInfo`
- `lockInfo`
- `replSetGetStatus`
- `serverStatus`
- `stats`

Write operations such as `insert`, `update`, and `delete` are not supported.

### Query syntax errors

If syntax validation is enabled (in the data source settings), the query editor checks for common errors such as:

- Missing or unmatched brackets `{}` or `[]`
- Improper structure for operators
- Unrecognized field names

To troubleshoot query syntax:

1. Test your query directly in `mongosh` to verify it works.
2. Check that you’re using the correct database and collection names.
3. Verify operator syntax matches MongoDB documentation.

### Date operations in queries

> Note
>
> Starting with plugin version 1.14.2, performing arithmetic on dates directly within the query editor is no longer supported.

Instead of:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.find({"released": { $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) }})
```

Use MongoDB 5.0+ date operators like `$dateSubtract`:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.aggregate([
  {
    $match: {
      $expr: {
        $gt: [
          "$released",
          {
            $dateSubtract: {
              startDate: "$$NOW",
              unit: "year",
              amount: 1
            }
          }
        ]
      }
    }
  }
])
```

### Regex flag limitations

The regex flags `g` (global) and `s` (`dotAll`) are not supported. Use supported flags like `i` (case-insensitive) and `m` (`multiline`).

### Collections with dots in their names

To query collections that contain a dot (`.`) in their name, use `getCollection()`:

JavaScript [Copy code to clipboard] Copy

```javascript
my_db.getCollection("my.collection").find({})
```

### `allowDiskUse` with complex aggregation pipelines

The `allowDiskUse` option allows MongoDB to use disk storage for aggregation operations that exceed the memory limit. Pass it as the second argument to the `aggregate` method:

JavaScript [Copy code to clipboard] Copy

```javascript
my_db.my_collection.aggregate([
  { $match: { "timestamp": { $gte: $__timeFrom, $lt: $__timeTo } } },
  { $group: { "_id": "$category", "total": { "$sum": "$amount" } } },
  { $sort: { "total": -1 } }
], { allowDiskUse: true })
```

> Note
>
> The `allowDiskUse` option must be passed as an options object after the pipeline array, not within the pipeline stages. If you experience issues with `allowDiskUse` on complex pipelines, verify that your MongoDB user has the required privileges and that your MongoDB server version supports this option for the specific operations in your pipeline.

### Queries not saving

If your dashboard reports “saved successfully” but the query reverts to the previous version on refresh:

**Solutions:**

1. Verify the URL contains a valid `panel_id` parameter. Queries may not persist if the panel cannot be identified.
2. Try editing the query from the panel’s edit view (click the panel title &gt; **Edit**) rather than from the dashboard settings.
3. Ensure you click **Apply** in the panel editor before saving the dashboard.

### Time zone mismatches with `$__timeFrom` / `$__timeTo`

If the same query returns different results in Grafana compared to running directly in `mongosh`, the cause is often a timezone discrepancy.

The `$__timeFrom` and `$__timeTo` macros use the **dashboard’s timezone setting**, which defaults to the user’s browser timezone. This means:

- A user in UTC-5 and a user in UTC+2 see different time ranges for the same dashboard
- Queries run directly in `mongosh` (typically in UTC) return different counts than Grafana

**Solutions:**

1. Set an explicit timezone on your dashboard: **Dashboard settings** &gt; **General** &gt; **Timezone** &gt; select **UTC** or a specific timezone.
2. Use UTC consistently in both your MongoDB data and your dashboard timezone setting.
3. When comparing Grafana results with direct MongoDB queries, ensure you account for the dashboard’s configured timezone.

## Performance issues

Performance problems can manifest as slow queries, timeouts, or incomplete results.

### Context deadline exceeded or query timeout

If queries fail with “context deadline exceeded” errors, the query is taking longer than the configured timeout.

**Symptoms:**

- Panels show “context deadline exceeded” errors
- Alerting evaluations time out
- Queries that previously worked start timing out after a plugin upgrade

**Solutions:**

1. Optimize your query:

   - Apply `$match` filters early in the pipeline to reduce the working data set.
   - Add indexes to fields used in `$match` and `$sort` stages.
   - Use `$project` to limit the fields returned.
   - Reduce the time range or add a `$limit` stage.
2. Check MongoDB server-side timeouts. If your MongoDB instance has a `maxTimeMS` limit, complex aggregations may exceed it.
3. If timeouts started after a plugin upgrade, review the [CHANGELOG](/docs/plugins/grafana-mongodb-datasource/latest/) for changes to timeout handling. As a temporary workaround, roll back to the previous plugin version while optimizing queries.

### Limit time ranges to prevent query overload

Large time ranges can cause excessive query load on your MongoDB server, especially with high-cardinality collections.

**Best practices:**

- Set a default time range on the dashboard that matches the granularity of your data (for example, 24 hours for minute-level data).
- Use the `$__timeFrom` and `$__timeTo` macros in all queries to scope results to the visible time range.
- Add `$limit` stages to aggregation pipelines as a safety net.
- For alerting queries, use the shortest evaluation interval that meets your alerting needs.
- Consider enabling [query caching](/docs/grafana/latest/administration/data-source-management/#query-caching) (available in Grafana Enterprise and Grafana Cloud) to reduce repeated queries.

### Query results truncated

If your query results appear incomplete, check the **Rows to return** setting in the data source configuration. The default limit is 100,000 rows.

To adjust this limit:

1. Go to **Connections** &gt; **Data Sources**.
2. Select your MongoDB data source.
3. Under **Additional settings**, adjust the **Rows to return** value.

> Warning
>
> Setting this number too high may lead to performance issues with larger queries.

### Slow query performance

To improve query performance:

- Add appropriate indexes to your MongoDB collections.
- Use projections to limit the fields returned.
- Apply filters early in aggregation pipelines using `$match`.
- Use `limit()` to reduce the number of documents returned.
- Consider using the debugging response size feature to analyze response sizes (not available in Grafana Cloud).

## Variables and ad-hoc filters

Template variables and ad-hoc filters require specific configuration to work correctly with MongoDB.

### Ad-hoc filters do not work

For ad-hoc filters to work, you must create a helper variable:

1. Create an ad-hoc filter variable with any name.
2. Create a second variable of type `constant`.
3. Name the constant variable `mongo_adhoc_query`.
4. Set its value to a valid MongoDB query that returns the filter options.

For more information, refer to [Use ad-hoc filters](/docs/plugins/grafana-mongodb-datasource/latest/template-variables/#use-ad-hoc-filters).

### Ad-hoc filters with dot notation paths

Ad-hoc filters support dot notation for nested field paths. For example, you can filter on `address.city` or `metadata.version`. If your filters using dot notation paths are not working, ensure you are running plugin version 1.23.2 or later.

### Compound variables do not resolve

When using compound variables:

- Variable names must start with an underscore (`_`).
- Concatenate names using underscores (for example, `_movie_year`).
- In the query, use aliases where individual names are separated by hyphens.
- Avoid spaces in variable names.

## Debug query response sizes

To enable debug logging for response sizes (not available in Grafana Cloud):

1. Set the plugin logger level in your `grafana.ini` file:

   ini [Copy code to clipboard] Copy

   ```ini
   [plugin.grafana-mongodb-datasource]
   logger_level = 2
   ```
2. Restart Grafana.
3. Check the Grafana logs for response size information after running queries.

## Get additional help

If you continue to experience issues:

- Update the plugin to the latest version: **Plugins and data** &gt; **Plugins** &gt; **MongoDB**.
- Check the [Grafana community forums](https://community.grafana.com/) for similar issues and solutions.
- Review the [MongoDB data source documentation](/docs/plugins/grafana-mongodb-datasource/latest/) for additional configuration options.
- Contact [Grafana Support](/help/) if you’re an Enterprise, Cloud Pro, or Cloud contracted customer.

When reporting issues, include the following information:

- Grafana version
- MongoDB version and deployment type (self-managed, Atlas, or other managed service)
- Connection method (standard connection string or SRV)

- Authentication method (No authentication, Credentials, or Kerberos)

- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Relevant configuration such as data source settings, TLS settings, and row limits (redact passwords and other credentials)
- Sample query (if applicable, with sensitive data redacted)
