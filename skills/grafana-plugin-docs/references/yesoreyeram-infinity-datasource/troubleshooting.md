---
title: "Troubleshoot the Infinity data source | Grafana Plugins documentation"
description: "Troubleshoot common issues with the Grafana Infinity data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot the Infinity data source

This guide helps you diagnose and resolve common issues with the Grafana Infinity data source. Issues are organized by category: connection errors, authentication errors, query and parsing errors, and performance issues.

## Connection errors

These errors occur when the data source cannot connect to the target URL.

### URL not allowed

**Error message:** “requested URL not allowed. To allow this URL, update the data source config in the Security tab, Allowed hosts section”

**Cause:** The URL you’re trying to query isn’t in the allowed hosts list.

**Solution:**

1. Open the data source configuration in Grafana.
2. Navigate to the **Security** section.
3. Add your URL’s base domain to the **Allowed hosts** field.
4. Click **Save &amp; test**.

> Note
>
> Allowed hosts are required when authentication, custom headers, or TLS certificates are configured. If none of these features are in use and the allowed hosts field is empty, all hosts are allowed by default.

### Connection timeout

**Error message:** “context deadline exceeded” or “timeout awaiting response headers”

**Cause:** The target server is taking too long to respond.

**Solution:**

1. Verify the target URL is accessible from the Grafana server (not just your browser).
2. Check if the API has rate limiting that might be blocking requests.
3. Reduce the amount of data requested by adding filters or limiting time ranges.
4. Contact your API provider to check for service issues.

### SSL/TLS certificate errors

**Error message:** “x509: certificate signed by unknown authority” or “certificate verify failed”

**Cause:** The target server’s SSL certificate isn’t trusted.

**Solution:**

1. If using a self-signed certificate, enable **Skip TLS Verify** in the data source configuration under **TLS / SSL Auth Details**.
2. For enterprise environments, add the CA certificate to **TLS/SSL Root Certificate** field.
3. Verify the certificate chain is complete on the target server.

> Caution
>
> Disabling TLS verification reduces security. Only use this option for development or trusted internal services.

### Empty response received

**Error message:** “empty response body received for the URL”

**Cause:** The server returned a successful status but with no content.

**Solution:**

1. Verify the URL returns data when accessed directly (using curl or a browser).
2. Check if authentication is required but not configured.
3. Ensure the API endpoint is correct and accepts the HTTP method you’re using.
4. Check if the API requires specific headers that aren’t being sent.

### HTTP method not allowed

**Error message:** “only GET and POST HTTP methods are allowed for this data source. To make use other methods, enable the ‘Allow dangerous HTTP methods’ in the data source configuration”

**Cause:** You’re trying to use PUT, PATCH, or DELETE methods which are disabled by default.

**Solution:**

1. Open the data source configuration.
2. In the **Security** section, enable **Allow dangerous HTTP methods**.
3. Click **Save &amp; test**.

> Caution
>
> Only enable dangerous HTTP methods if your API requires them for data retrieval. These methods can modify data on the target server.

## Authentication errors

These errors relate to authentication configuration issues.

### Invalid or empty credentials

**Error messages:**

- “invalid or empty password detected”
- “invalid API key specified”
- “invalid or empty bearer token detected”

**Cause:** Required authentication credentials are missing or incorrectly configured.

**Solution:**

1. Open the data source configuration.
2. Verify all required credential fields are filled in.
3. For API keys, ensure the key is entered in the correct field (header value or query parameter).
4. Click **Save &amp; test** to verify the credentials work.

### OAuth2 token errors

**Error message:** “error getting OAuth2 token” or authentication failures after initial success

**Cause:** OAuth2 configuration is incorrect or tokens have expired.

**Solution:**

1. Verify the Token URL is correct and accessible.
2. Check that Client ID and Client Secret are correct.
3. Ensure the required scopes are specified.
4. For Azure, verify the `resource` endpoint parameter is set correctly.
5. Check if the OAuth2 provider requires additional endpoint parameters.

For custom token configurations, refer to [OAuth2 token customization](/docs/plugins/yesoreyeram-infinity-datasource/latest/advanced-features/oauth2-custom-tokens/).

### AWS authentication failures

**Error messages:**

- “invalid/empty AWS access key”
- “invalid/empty AWS secret key”

**Cause:** AWS credentials are missing or incorrect.

**Solution:**

1. Verify the Access Key ID and Secret Access Key are correct.
2. Ensure the IAM user has the required permissions for the AWS service you’re querying.
3. Check that the AWS region is correctly specified.
4. Verify the service name matches the AWS service (for example, `monitoring` for CloudWatch).

### 401 or 403 errors

**Error message:** “unsuccessful HTTP response code” with status 401 or 403

**Cause:** Authentication failed or you don’t have permission to access the resource.

**Solution:**

1. Verify your credentials are correct.
2. Check if the API key or token has expired.
3. Ensure the authenticated user has permission to access the requested resource.
4. For OAuth2, verify the scopes include the required permissions.

## Query and parsing errors

These errors occur when processing the query or parsing the response.

### Invalid root selector

**Error message:** “error converting json data to frame” or “invalid root selector”

**Cause:** The root selector path doesn’t match the API response structure.

**Solution:**

1. Use **Format as** &gt; **As Is** to see the raw response structure.
2. Verify the root selector path matches your data. For example, if your JSON is:

   JSON [Copy code to clipboard] Copy

   ```json
   { "data": { "items": [...] } }
   ```

   The root selector should be `data.items`.
3. For arrays at the root level, leave the root selector empty or use `$` for JSONata.
4. Use JSONata expressions for complex data extraction.

### JSON parsing errors

**Error message:** “unable to parse response body as JSON”

**Cause:** The response isn’t valid JSON or isn’t in the expected format.

**Solution:**

1. Verify the API returns JSON (check the Content-Type header).
2. If the API returns XML, CSV, or another format, select the correct **Type** in the query editor.
3. Check for API errors that might return HTML error pages instead of JSON.
4. Use **Format as** &gt; **As Is** to inspect the raw response.

### Time column not recognized

**Cause:** Time data isn’t being parsed correctly for time series visualization.

**Solution:**

1. Ensure the time column is set to the correct type: **Time**, **Time (UNIX ms)**, or **Time (UNIX s)**.
2. For custom time formats with the backend parser, specify the format in the column configuration.
3. Verify the time values are in a supported format (ISO 8601, Unix timestamp, or a recognized date string).
4. Refer to [Time formats](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/time-formats/) for supported formats.

### UQL syntax errors

**Cause:** The UQL query has syntax errors or uses invalid commands.

**Solution:**

1. Check that pipe characters (`|`) separate each command.
2. Verify column names are quoted: `"column_name"`.
3. Ensure string values use single quotes: `'value'`.
4. Start with a parse command: `parse-json`, `parse-csv`, or `parse-xml`.
5. Refer to [UQL parser](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/uql/) for syntax reference.

### Macro expansion errors

**Error messages:**

- “insufficient arguments to combineValues macro”
- “invalid customInterval macro”

**Cause:** Macro syntax is incorrect or missing required arguments.

**Solution:**

1. For `$__combineValues()`, ensure you have at least 4 arguments: prefix, suffix, separator, and at least one value.
2. For `$__customInterval()`, use valid duration syntax (for example, `1m`, `1h`, `1d`) and ensure the argument count is odd.
3. Refer to [Macros](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/macros/) for correct syntax.

### Reference data not found

**Error message:** “error getting reference data. Either empty or not defined”

**Cause:** The query references data that doesn’t exist in the data source configuration.

**Solution:**

1. Open the data source configuration.
2. Navigate to **Reference data** section.
3. Add or verify the reference data with the name your query expects.
4. Click **Save &amp; test**.

## Performance issues

These issues relate to slow queries or resource usage.

### Slow query execution

**Cause:** Queries return too much data or the API is slow.

**Solution:**

1. Reduce the dashboard time range to limit data volume.
2. Add filters in your query to reduce the data returned.
3. Use aggregations in UQL (`summarize`) instead of returning raw rows.
4. Enable caching if your API data doesn’t change frequently.
5. Consider using the backend parser for better performance with large datasets.

### Large response handling

**Cause:** The API returns very large responses that are slow to process.

**Solution:**

1. Request only the fields you need by configuring specific columns.
2. Use pagination if the API supports it.
3. Apply server-side filters if the API supports query parameters.
4. Use `limit` in UQL to reduce rows: `| limit 1000`.

## Other common issues

The following issues don’t produce specific error messages but are commonly encountered.

### Template variables return no data

**Cause:** Variable queries aren’t configured correctly.

**Solution:**

1. Test the query in the Explore view first to verify it returns data.
2. Ensure the query returns columns that can be used as variable options.
3. For custom text/value pairs, return columns named `__text` and `__value`.
4. Check that the data source connection is working.

### Annotations not appearing

**Cause:** Annotation query configuration issues.

**Solution:**

1. Verify the query returns the required columns: `time` (or `timeEnd`), `title`, and `text`.
2. Ensure the time column contains valid timestamps within the dashboard time range.
3. Use time filter macros (`${__timeFrom}`, `${__timeTo}`) to filter annotations by time range.
4. Refer to [Annotations](/docs/plugins/yesoreyeram-infinity-datasource/latest/annotations/) for configuration details.

### Data appears incorrect or misaligned

**Cause:** Data type or formatting issues.

**Solution:**

1. Verify column types match your data (string, number, timestamp).
2. Check for null values that might affect calculations.
3. Use explicit column aliases to ensure consistent naming.
4. For numeric data stored as strings, use UQL’s `tonumber()` or `toint()` functions.

### Requests originate from server, not browser

**Cause:** Unlike some frontend data sources, Infinity makes requests from the Grafana server.

**Solution:**

This is expected behavior. The Grafana server makes API requests on behalf of the user. This means:

1. The target API must be accessible from the Grafana server’s network.
2. Firewall rules should allow outbound connections from the Grafana server.
3. API rate limits apply to the Grafana server’s IP address.

## Alerting issues

These issues relate to using Infinity queries with Grafana Alerting.

### Alert rule shows “no data” or doesn’t fire

**Cause:** The query uses a frontend parser that doesn’t support alerting.

**Solution:**

1. Alerting only works with **backend parsers**: JSONata or JQ.
2. Change your parser from Default, UQL, or GROQ to **JSONata** or **JQ**.
3. Verify the query returns numeric data that can be evaluated against alert thresholds.
4. Test the query in Explore to ensure it returns data.

> Note
>
> Frontend parsers (Default, UQL, GROQ) run in the browser and cannot be used for alerting, recorded queries, or public dashboards. Use JSONata or JQ for these features.

### User macros not available in alerts

**Cause:** Alert queries run in a system context without user session information.

**Solution:**

User-related macros (`${__user.login}`, `${__user.email}`, `${__user.name}`) are not available in:

- Alert rules
- Recorded queries
- Public dashboards

If your query depends on user context, you’ll need to:

1. Remove user macros from alert queries.
2. Use static values or other macros that don’t require user context.
3. Consider using data source-level filters instead of user-based filters.

## Azure Blob Storage errors

These errors are specific to Azure Blob Storage queries.

### Invalid Azure Blob configuration

**Error messages:**

- “invalid/empty azure blob account name”
- “invalid/empty azure blob key”
- “invalid azure blob service client. check storage account name and key”

**Cause:** Azure Blob Storage credentials are missing or incorrect.

**Solution:**

1. Verify the storage account name and key in the data source configuration.
2. Ensure the storage account exists and is accessible.
3. Check that the account key hasn’t been rotated.

### Azure Blob 403 error

**Error message:** “http 403. check azure blob storage key”

**Cause:** Access denied to the Azure Blob Storage.

**Solution:**

1. Verify the storage account key is correct.
2. Check if the storage account has IP restrictions that block the Grafana server.
3. Ensure the container and blob permissions allow read access.

## Get additional help

If you continue to experience issues after following this troubleshooting guide:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [GitHub issues](https://github.com/grafana/grafana-infinity-datasource/issues) for known bugs.
3. Enable debug logging in Grafana to capture detailed error information.
4. Check Grafana server logs for additional error details.

When reporting issues, include:

- Grafana version
- Infinity plugin version
- Error messages (redact sensitive information)
- Steps to reproduce
- Sample query configuration (redact sensitive data)
- Sample API response structure (redact sensitive data)
