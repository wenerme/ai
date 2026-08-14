---
title: "Configure Grafana Logs Drilldown | Grafana Plugins documentation"
description: "Describes the plugin configuration settings for Grafana Logs Drilldown, including the Configuration tab, Landing Page default labels, and Default fields."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure Grafana Logs Drilldown

You can use the Configuration page to configure the Grafana Logs Drilldown app like other apps or plugins in Grafana. By accessing the app’s Administration page, you can view the version history, changelog, configuration, landing page settings, and default fields.

## Before you begin

To access the Configuration page, you need to be an Org Admin or Server Admin role.

Only Org Admins can save changes made to the configuration settings. Server Admin alone can’t configure app plugins; only install, uninstall, or update them.

In practice this means:

- *Org Admin only* can view and configure, but can’t install or update the plugin.
- *Server Admin only* can install/update the plugin, but the **Configuration** tab settings are read-only.
- *Both roles* have full access: configure, install, update, and uninstall.

This is a Grafana-wide rule that applies to all app plugins, not specific to Logs Drilldown. If a Server Admin needs to change the configuration settings, they need to be granted the Org Admin role in the relevant organization.

Refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/) for more information.

## Configuration tab

The **Configuration** tab has four settings, all aimed at an administrator setting up a consistent experience for their team:

- **Default data source**: pick which Loki instance users land on when they first open the app
- **Default time range**: override the built-in 15-minute default with a range that matches your team’s workflows
- **Maximum time picker interval**: cap how far back users can query, typically to match your Loki retention period or protect query performance
- **Disable Loki patterns**: turn off the Patterns tab and API calls if your Loki instance doesn’t have pattern ingestion enabled

### Configure settings

To view the **Configuration** tab:

1. Open the Logs Drilldown app’s settings by navigating to **Administration** &gt; **Plugins and data** &gt; **Plugins** &gt; **Grafana Logs Drilldown**.
2. Select the **Configuration** tab.

> Note
>
> Active users must reload the app for configuration changes to take effect.

Select a setting to configure it:

- **Default data source** sets the Loki data source used when a new user opens Logs Drilldown for the first time. Individual users can override this by selecting a different data source inside the app. Only Loki data sources are supported.
- **Default time range** controls the time range applied when a user opens Logs Drilldown without a time range already set in the URL. Select the **Use custom default time range** checkbox to enable this setting, which reveals **From** and **To** input fields. Both fields are required. Use relative time expressions such as `now-15m`, `now-1h`, or `now-24h` for the start, and `now` for the end. Absolute date-time values are also accepted. The **From** value must be earlier than the **To** value; if either value is missing or invalid, the **Save settings** button is disabled and an inline error is displayed. When disabled, the app uses its built-in default of the last 15 minutes.
- **Maximum time picker interval** sets an upper bound on the time range interval that users can select in the time picker. The minimum accepted value is one hour (`60m`). Example values: `7d`, `24h`, `2w`. If left empty, users can select any time range.
- **Disable Loki patterns** controls whether the Patterns tab and the [Loki Patterns API](/docs/loki/latest/reference/loki-http-api/#patterns-detection) endpoint are used by Logs Drilldown.

After configuring a setting, click **Save settings** to apply the changes.

## Default fields (Beta)

> Note
>
> Default fields is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.
>
> To use this feature, enable the kubernetesLogsDrilldown feature toggle in your Grafana configuration file or contact Support.

The **Default fields** tab lets administrators configure which fields appear by default in log visualizations instead of, or alongside, the full log line.

Default fields requires Grafana 12.4 or later. If this version requirement is not met, the **Default fields** tab displays an unsupported message.

### How Default fields work

Default field rules are scoped to a specific data source and one or more label and value pairs. When a user views logs for a service that matches all configured labels in a rule, the specified fields are displayed by default in the logs table view. The configured fields can replace the full log line or be displayed next to it.

When a rule stores multiple values for the same label, those values are matched as a regular expression, so a rule can apply to several label values at once.

### Configure Default fields

To configure Default fields:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins** &gt; **Grafana Logs Drilldown**.
2. Select the **Default fields** tab.
3. Select a Loki data source from the data source picker.
4. Click **Add** to create a new rule.
5. Select a label and label value to define which services this rule applies to. You can add multiple label and value pairs to a single rule by clicking **Add label**.
6. Add the columns you want to display for matching services by clicking **Add column**.
7. Click **Create default columns** to save a new configuration, or **Update default columns** to save changes to an existing one.

You can add multiple records to configure different columns for different label and value combinations. Each data source can have its own set of rules.

## Related pages

- [Access and install Grafana Logs Drilldown](../../access/)
- [Get started with Grafana Logs Drilldown](../../get-started/)
- [Troubleshooting](../../troubleshooting/)
