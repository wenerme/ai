---
title: "Troubleshooting Grafana Logs Drilldown | Grafana Plugins documentation"
description: "Describes how to solve common issues when working with Grafana Logs Drilldown."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshooting

This page addresses common issues when getting started and using Grafana Logs Drilldown.

## Can’t see Logs Drilldown in the menu

Grafana Explore Logs is installed by default in Grafana versions v11.3.0 through v11.5.

Grafana Logs Drilldown is installed by default in Grafana versions v11.6.11 and later.

In Grafana v12 and later, the **Drilldown** menu includes all Drilldown apps by default.

For more information about the name change for this feature, see this [blog post](/blog/2025/02/20/grafana-drilldown-apps-the-improved-queryless-experience-formerly-known-as-the-explore-apps/).

If you do not see Logs Drilldown under either name, then check to make sure you have the [Grafana Logs Drilldown plugin](/grafana/plugins/grafana-lokiexplore-app/) installed and configured.

> Note
>
> Your instance needs internet connection in order to download the Logs Drilldown plugin. If you are working in an offline environment, you can download the Logs Drilldown plugin separately and add it to your Grafana `/plugins` repository.

Check with your Grafana administrator. All the Grafana Drilldown apps require the `datasources:explore` permission in Grafana.

## Ensure Loki is properly configured

To use Grafana Logs Drilldown, you need to have Loki properly configured. You can find full instructions in [Access or install Grafana Logs Drilldown](/docs/grafana/latest/explore/simplified-exploration/logs/access/).

## Service selection errors

This section covers errors on the service selection page.

### There are no services

If everything is presented as an `unknown_service` when you access Grafana Logs Drilldown, you can try the following fixes:

1. Ensure the Volume API is enabled by setting the [`volume_enabled` configuration value](/docs/loki/latest/configure/#:~:text=volume_enabled) in Loki. Enabled by default in Loki 3.1 and later.
2. Specify the label to use to identify services by setting the [`discover_service_name` configuration value](/docs/loki/latest/configure/#:~:text=discover_service_name) in Loki.

### No logs found in \[label]

This message appears when the selected label has no log volume data for the current time range.

Try the following fixes:

1. Expand your time range to find when logs were last recorded for this label.
2. Select a different label or service that has active log data.
3. Verify that logs are being ingested for this label by checking your log collection pipeline.

### Log volume has not been configured

This error indicates that Loki’s volume API is not enabled, which Logs Drilldown requires to display service volumes.

To fix this, enable volume in your Loki configuration:

YAML [Copy code to clipboard] Copy

```yaml
limits_config:
  volume_enabled: true
```

Refer to the [Loki configuration documentation](/docs/loki/latest/configure/#limits_config) for more details.

### No service matched your search

This message appears when searching for services on the service selection page and no results match your search term.

Try the following fixes:

1. Check your search term for typos.
2. Try a partial match or different search term.
3. Clear the search to see all available services.

## There are no detected levels

If you do not see `detected_level` values in Grafana Logs Drilldown, you can try the following fixes:

1. Ensure level detection is enabled by setting the [`discover_log_levels` configuration value](/docs/loki/latest/configure/#:~:text=discover_log_levels). Enabled by default in Loki 3.1 and later.

## Label and field errors

This section covers errors related to labels and fields in Logs Drilldown.

### There are no labels

If you do not see any labels in Grafana Logs Drilldown, you can try the following fixes:

1. Ensure your collector is properly configured to attach them.

To learn more about Labels, refer to the [Loki labels documentation](/docs/loki/latest/get-started/labels/).

### No labels selected

This message appears when you haven’t selected any labels to filter your logs. Logs Drilldown requires at least one label filter to display results.

To fix this:

1. Select a service or other primary label from the service selection page.
2. If you removed all labels, click the **Reset filters** button to restore the default selection.

### Invalid labels selected

This error occurs when your label filters are in an invalid state, typically when all remaining filters use negative matching (not equal, not regex match).

Try the following fixes:

1. Ensure you have at least one label filter with positive (inclusive) matching.
2. Click the **Reset filters** button to restore a valid label selection.
3. Add a new label filter that includes (rather than excludes) logs.

### The labels are not available at this moment

This warning appears when Logs Drilldown temporarily cannot fetch label information from Loki.

Try the following fixes:

1. Wait a moment and refresh the page.
2. Try selecting a different time range.
3. Check your Loki data source connection in Grafana’s data source settings.

### No labels/fields match these filters

This message appears when your current filters don’t match any available labels or fields.

Try the following fixes:

1. Clear your current filters using the **Clear filters** button.
2. Broaden your time range.
3. Check that your label filter values are correct and exist in your log data.

### We did not find any fields for the given time range

This message indicates that no detected fields (structured metadata or parsed fields) were found for your current selection and time range.

Try the following fixes:

1. Expand your time range to include more log data.
2. Verify that your logs contain structured data (JSON, logfmt, or other parsable formats).
3. Check that [structured metadata](/docs/loki/latest/get-started/labels/structured-metadata/) is enabled in your Loki configuration by setting `allow_structured_metadata: true`.

### Default fields tab not appearing

If the **Default fields** tab does not appear in the Logs Drilldown plugin settings, or if it displays an unsupported message, check the following:

1. Ensure you are running Grafana 12.4 or later. Default fields requires this minimum version.
2. Verify that the `kubernetesLogsDrilldown` feature flag is enabled in your Grafana configuration.
3. Confirm that you have the Org Admin role in your organization.

For more information about configuring Default fields, refer to [Configure Logs Drilldown](/docs/grafana/latest/explore/simplified-exploration/logs/access/configure/#default-fields-beta).

## There are no color levels

Color coding for log severity levels is a setting in Loki. You must have `discover_log_levels: true` in your [Loki configuration file](/docs/loki/latest/configure/#limits_config).

## Query and results errors

This section covers common error messages you may encounter when querying logs.

### No logs match your search

If you see the message “No logs match your search. Please review your filters or try a different time range.” it means your current combination of filters and time range returns no results.

Try the following fixes:

1. Expand the time range to include a larger window of logs.
2. Review your label filters and remove any that may be too restrictive.
3. Check your line filter (search text) for typos or overly specific patterns.
4. If you have active pattern filters (`include` or `exclude`), try clearing them to see if logs appear.

> Tip
>
> You can click the **Clear filters** button that appears with the error message to reset all filters and start fresh.

### Logs could not be retrieved due to invalid filter parameters

This error occurs when the query contains invalid syntax, typically from a malformed regular expression in a line filter.

Try the following fixes:

1. Check your line filter for invalid regex syntax. Loki uses [RE2 syntax](https://github.com/google/re2/wiki/Syntax) for regular expressions.
2. If you’re using special characters like `(`, `)`, `[`, `]`, `{`, `}`, `.`, `*`, `+`, `?`, `^`, `$`, `|`, or `\`, ensure they are properly escaped.
3. Toggle off the regex mode in the line filter if you’re searching for literal text.

### The response is too large to process

This error appears when Loki returns more data than it can handle in a single response.

Try the following fixes:

1. Narrow your time range to reduce the amount of data returned.
2. Add more specific label filters to target a smaller subset of logs.
3. Use a line filter to search for specific text, which reduces the response size.
4. If you’re an administrator, consider adjusting the [`max_recv_msg_size`](/docs/loki/latest/configure/#server) in your Loki server configuration.

### Max entries limit per query exceeded

This error means your query is trying to return more log lines than the configured limit allows. Loki has a default limit on the number of log entries that can be returned in a single query.

Try the following fixes:

1. Reduce the **Line limit** setting in the Logs Drilldown interface. You can find this option next to the line filter on the **Logs** tab.
2. Narrow your time range to return fewer results.
3. Add more specific filters to reduce the number of matching logs.
4. If you’re an administrator and need higher limits, adjust the [`max_entries_limit_per_query`](/docs/loki/latest/configure/#limits_config) in your Loki configuration.

### Max series limit exceeded

If you see “Max series limit exceeded” when viewing a field breakdown, it means the query returned more unique label value combinations than Loki allows.

Try the following fixes:

1. Reduce the time range to lower the number of unique series.
2. Add additional filters to narrow down the results before viewing the field breakdown.
3. Choose a different field with fewer unique values to break down.
4. If you’re an administrator, you can increase the [`max_query_series`](/docs/loki/latest/configure/#limits_config) limit in your Loki configuration, though be aware this may impact query performance.

> Tip
>
> Fields with high cardinality (many unique values) like `trace_id`, `request_id`, or timestamps are more likely to hit this limit. Consider filtering by other labels first before exploring high-cardinality fields.

### Showing partial results

If you see “Showing partial results for \[field]” it means the query encountered an error but was still able to return some data. This commonly happens with timeout errors on large queries.

Try the following fixes:

1. Narrow your time range to make the query faster.
2. Add more filters to reduce the amount of data being processed.
3. If timeouts persist, contact your administrator to check Loki query timeout settings.

## Pattern errors

This section covers error messages related to the Patterns feature.

### There are no pattern matches

Pattern matching has not been configured.

1. Ensure pattern extraction is enabled by setting `pattern_ingester.enabled=true` in your Loki config. [Learn about other necessary config](/docs/grafana/latest/explore/simplified-exploration/logs/access/).
2. Ensure the volume endpoint is enabled by setting `volume_enabled=true` within your [Loki configuration file](/docs/loki/latest/configure/#limits_config).

> Note
>
> The Patterns feature does not support multi-tenant or cross-stack data sources.

If you see a message in the UI on the Patterns tab that says “An error occurred within the plugin.” or receive an error message HTTP 500 with the message `multiple org IDs present` you have two options to work around the issue:

- Use a single-stack Loki data source to restore Patterns.
- Disable log patterns to continue using the other Logs Drilldown features with your multi-tenant or cross-stack data source. Go to **Administration** &gt; **Plugins and data** &gt; **Plugins** &gt; **Grafana Logs Drilldown** and select the **Disable patterns** check box. This will disable use of the Patterns API and hide the **Patterns** tab in the user interface.

### Sorry, we could not detect any patterns

This message appears when Loki’s pattern ingester is enabled but no patterns were extracted from your logs. This is rare but can happen with certain log formats.

Try the following fixes:

1. Check back later as patterns are continuously extracted from incoming logs.
2. Verify that your logs have enough volume for pattern detection to work effectively.
3. If the issue persists, reach out in the [Grafana Labs community Slack channel](https://slack.grafana.com/) or [open an issue on GitHub](https://github.com/grafana/explore-logs/issues/new).

### Patterns are only available for the most recent 3 hours of data

Patterns in Loki are ephemeral and only stored for the most recent three hours. And patterns can change over time as your logging evolves. If your selected time range is entirely older than three hours ago, you won’t see any patterns.

To view patterns:

1. Adjust your time range to include some portion of the last three hours.
2. Use the time picker to select a more recent time window.

### This pattern returns no logs

This error appears when viewing a pattern’s sample logs and the pattern query fails to return results. This can happen if the pattern was detected from logs that have since aged out or been deleted.

No action is typically needed. Try selecting a different pattern or adjusting your time range.

### The logs returned by this pattern do not match the current query filters

This warning appears when you have active filters that exclude the logs matching the selected pattern. The pattern exists in your overall log data, but your current filters prevent those logs from appearing.

Try the following fixes:

1. Click the **Clear filters** button to remove conflicting filters.
2. Review your current label and line filters to understand why they exclude this pattern.
3. Adjust your filters to include the logs you want to see.

## JSON panel issues

This section covers issues specific to the JSON visualization panel.

### JSON filtering requires Loki 3.5.0

If you see “JSON filtering requires Loki 3.5.0. This view will be read only until Loki is upgraded to 3.5.0” it means your Loki instance doesn’t support the JSON filtering feature.

The JSON panel will still display your logs, but you won’t be able to filter by clicking on JSON field values.

To enable filtering:

1. Upgrade your Loki instance to version 3.5.0 or later.
2. Alternatively, switch to the **Logs** or **Table** visualization where filtering works with all Loki versions.

### No JSON fields detected

This message appears when viewing the JSON panel but your log lines aren’t in JSON format.

This is informational rather than an error. If your logs aren’t JSON formatted:

1. Switch to the **Logs** or **Table** view for a better experience.
2. The JSON view is optimized for JSON-formatted log lines and may not display other formats correctly.

## I cannot find something

Please [open an issue on GitHub](https://github.com/grafana/explore-logs/issues/new) or [get in touch privately](https://forms.gle/1sYWCTPvD72T1dPH9) and let us know what’s not working for you.

If you have something urgent, please [get in touch via support](/help/). Grafana Cloud users can [open a support ticket here](/profile/org#support).
