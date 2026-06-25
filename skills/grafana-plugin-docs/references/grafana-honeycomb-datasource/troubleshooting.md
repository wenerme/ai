---
title: "Troubleshooting | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Honeycomb data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot issues with the Honeycomb data source

This page addresses common issues and error messages you may encounter when using the Honeycomb data source.

## Connection errors

The following errors occur when testing the data source connection or configuring settings.

### Missing URL

**Error message:** “Enter a URL”

**Cause:** The URL field is empty.

**Solution:**

1. Navigate to your Honeycomb data source settings.
2. Enter the Honeycomb API URL in the URL field.
3. The default URL is `https://api.honeycomb.io`.

### Invalid URL scheme

**Error message:** “Invalid url: scheme must be https”

**Cause:** The URL doesn’t use HTTPS.

**Solution:**

1. Update the URL to use `https://` instead of `http://`.
2. Save the data source configuration.

### Missing API key

**Error message:** “Enter an API key”

**Cause:** The API key field is empty.

**Solution:**

1. Obtain an API key from your [Honeycomb account](https://ui.honeycomb.io/account).
2. Enter the API key in the Honeycomb API Key field.
3. Save the data source configuration.

### Missing team name

**Error message:** “Enter a Honeycomb team name”

**Cause:** The Team Name field is empty.

**Solution:**

1. Enter your Honeycomb team name in the Team Name field.
2. Save the data source configuration.

### Bad request (400)

**Error message:** “Could not connect to Honeycomb. This usually happens when the URL is incorrect.”

**Cause:** The Honeycomb API returned a 400 error, typically due to an incorrect URL.

**Solution:**

1. Verify the URL is correct.
2. Reset the URL to the default: `https://api.honeycomb.io`.
3. Save and test the connection again.

### Unauthorized (401)

**Error message:** “The credentials are incorrect. Check that the URL and API key are correct.”

**Cause:** The API key is invalid, expired, or the URL is incorrect.

**Solution:**

1. Verify that your API key is correct and has not expired.
2. Check that the URL matches your Honeycomb environment.
3. Generate a new API key from Honeycomb if the current one has been compromised or revoked.

### Authentication failed

**Error message:** “Something went wrong. Ensure you are using correct API key”

**Cause:** The authentication request to Honeycomb failed.

**Solution:**

1. Generate a new API key from your [Honeycomb account](https://ui.honeycomb.io/account).
2. Update the API key in your data source configuration.
3. Save and test the connection again.

## Permission errors

These errors indicate your API key is missing required permissions.

### Missing Run Queries permission

**Error message:** “Connected to honeycomb but API key missing permissions to run queries”

**Cause:** The API key doesn’t have the “Run Queries” permission enabled.

**Solution:**

1. Go to your [Honeycomb account](https://ui.honeycomb.io/account).
2. Edit the API key used for this data source.
3. Enable the **Run Queries** permission.
4. Save the API key and test the connection again.

### Missing Manage Queries and Columns permission

**Error message:** “Connected to honeycomb but API key missing permissions to manage queries”

**Cause:** The API key doesn’t have the “Manage Queries and Columns” permission enabled.

**Solution:**

1. Go to your [Honeycomb account](https://ui.honeycomb.io/account).
2. Edit the API key used for this data source.
3. Enable the **Manage Queries and Columns** permission.
4. Save the API key and test the connection again.

## Query warnings

These warnings appear in query results and indicate partial data was returned.

### Partial results

**Warning message:** “Partial results: Data clipped due to API time range restriction of X days”

**Cause:** The requested time range extends beyond the configured data retention window. The Honeycomb API only returns data within the allowed time range, so results may be incomplete.

**Solution:**

1. Adjust the dashboard time range to fall within the configured retention limit.
2. If you need a wider time range, update the **Time Window (days)** in your data source [advanced settings](/docs/plugins/grafana-honeycomb-datasource/latest/configure/#advanced-settings), provided your Honeycomb plan supports a longer retention period.

## Query errors

These errors occur when running queries against Honeycomb.

### Conflicting time parameters

**Error message:** “time\_range cannot be used with both start\_time and end\_time”

**Cause:** A raw query includes conflicting time parameters. The query specifies `time_range` along with both `start_time` and `end_time`.

**Solution:**

1. Edit your raw query JSON.
2. Use either `time_range` OR both `start_time` and `end_time`, but not all three.
3. Remove the conflicting parameter and run the query again.

## Get additional help

If you encounter issues not covered here:

- Check the [Honeycomb status page](https://status.honeycomb.io/) for service outages.
- Review the [Honeycomb API documentation](https://docs.honeycomb.io/api/) for API-specific issues.
- Review the [Grafana community forums](https://community.grafana.com/) for similar issues.
- [Contact Grafana Support](/profile/org#support) if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.

When reporting issues, include:

- Grafana version
- Honeycomb environment type (Classic or Environments)
- Query type (Metrics, SLO, or Raw Query)
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration such as data source settings and API URL (redact API keys and other credentials)
