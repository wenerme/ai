---
title: "Troubleshoot issues with the MongoDB data source | Grafana Enterprise Plugins documentation"
description: "This document provides troubleshooting guidance for the MongoDB data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot issues with the MongoDB data source

This page provides troubleshooting guidance to help you diagnose and resolve common issues with the MongoDB data source plugin.

## Verify MongoDB connectivity

Before troubleshooting issues in Grafana, verify that your MongoDB instance is reachable from outside the Grafana environment.

If you have `mongosh` installed on your local machine ([refer to the MongoDB documentation](https://www.mongodb.com/docs/mongodb-shell/)), you can test connectivity by running the following command in your terminal:

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

## Connection issues

Connection issues are typically indicated by the error message: “The connection can not be established.”

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
- Including multiple unescaped `@` signs
- Missing or incorrect host information
- Leaving the connection string empty

### Special characters in credentials

If your username or password contains special characters such as `@`, `:`, `/`, `?`, or `#`, you must percent-encode them in the connection string.

For example, if your password is `p@ssw0rd`, the `@` sign should be replaced with `%40`:

[Copy code to clipboard] Copy

```none
mongodb://user:p%40ssw0rd@localhost:27017
```

> Note
>
> The `@` that separates the password from the host should *not* be encoded.

For a complete list of characters that require encoding, refer to [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/) in the MongoDB documentation.

### Server selection timeout

If you see a “server selection timeout” error, the plugin cannot establish a connection to the MongoDB server. Common causes include:

- MongoDB server is not running
- Firewall blocking port 27017 (or your configured port)
- Incorrect host or port in the connection string
- Network connectivity issues between Grafana and MongoDB

To resolve this:

1. Verify the MongoDB server is running and accessible.
2. Check that port 27017 (or your custom port) is open and not blocked by firewalls.
3. Confirm the host address is correct and resolvable from the Grafana server.

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

### Kerberos authentication

If Kerberos authentication fails with “The Kerberos credentials cannot be verified,” verify the following:

- The Kerberos build of the plugin is installed (available from the [custom Kerberos build](https://storage.googleapis.com/integration-artifacts/grafana-mongodb-datasource-kerberos/release/latest/linux/grafana-mongodb-datasource-latest.linux_amd64.zip)).
- The connection string includes `authMechanism=GSSAPI`.
- The keytab file path or ccache file path is correct and accessible.
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
- If the private key is encrypted, provide the correct password in the appropriate field.
- The certificate size does not exceed 64KB.

### Encrypted private key issues

If your private key is encrypted and you see an error about decryption:

- Ensure you’ve provided the correct password for the encrypted key.
- The plugin supports PKCS#5 v2.0 encrypted keys. Other encryption schemes may not work.

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
sample_mflix.movies.find({ $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) })
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

The regex flags `g` (global) and `s` (dotAll) are not supported. Use supported flags like `i` (case-insensitive) and `m` (multiline).

### Collections with dots in their names

To query collections that contain a dot (`.`) in their name, use `getCollection()`:

[Copy code to clipboard] Copy

```none
my_db.getCollection("my.collection").find({})
```

## Performance issues

Performance problems can manifest as slow queries, timeouts, or incomplete results.

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

## Variables and ad-hoc filters

Template variables and ad-hoc filters require specific configuration to work correctly with MongoDB.

### Ad-hoc filters do not work

For ad-hoc filters to work, you must create a helper variable:

1. Create an ad-hoc filter variable with any name.
2. Create a second variable of type `constant`.
3. Name the constant variable `mongo_adhoc_query`.
4. Set its value to a valid MongoDB query that returns the filter options.

For more information, refer to [Using ad-hoc filters](/docs/plugins/grafana-mongodb-datasource/latest/templates-and-variables/#using-ad-hoc-filters).

### Compound variables do not resolve

When using compound variables:

- Variable names must start with an underscore (`_`).
- Concatenate names using underscores (for example, `_movie_year`).
- In the query, use aliases where individual names are separated by hyphens.
- Avoid spaces in variable names.

## Get additional help

If you continue to experience issues:

- Update the plugin to the latest version: **Plugins and data** &gt; **Plugins** &gt; **MongoDB**.
- Check the [Grafana community forums](https://community.grafana.com/) for similar issues and solutions.
- Review the [MongoDB data source documentation](/docs/plugins/grafana-mongodb-datasource/latest/) for additional configuration options.
- Contact [Grafana Support](/help/) if you’re an Enterprise, Cloud Pro, or Cloud contracted customer.

When reporting issues, include the following information:

- Grafana version
- MongoDB version and deployment type (self-hosted, Atlas, or other managed service)
- Connection method (standard connection string or SRV)
- Authentication method (No authentication, Credentials, or Kerberos)
- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Relevant configuration such as data source settings, TLS settings, and row limits (redact passwords and other credentials)
- Sample query (if applicable, with sensitive data redacted)
