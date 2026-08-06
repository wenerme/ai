---
title: "GitHub data source | Grafana Plugins documentation"
description: "The GitHub data source lets you visualize GitHub data in Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GitHub data source

The GitHub data source plugin lets you query the GitHub API so you can visualize and monitor your GitHub repositories, organizations, and projects in Grafana dashboards.

Watch the following video to learn more about setting up the GitHub data source plugin:

## Requirements

To use the GitHub data source plugin, you need:

- A [GitHub](https://github.com/) account or a [GitHub Enterprise](https://github.com/enterprise) account.
- Grafana version 11.6.7 or later (OSS, Enterprise, or Cloud).

## Key capabilities

The GitHub data source supports:

- **Query 20+ resource types:** Commits, issues, pull requests, pull request reviews, workflows, workflow runs, deployments, code scanning alerts, and more.
- **Template variables and macros:** Create dynamic, reusable dashboards with variable-driven queries and built-in macros.
- **Annotations:** Overlay GitHub events (commits, issues, pull requests, releases, tags) on dashboard panels.
- **Alerting:** Create alert rules based on GitHub query results.
- **Built-in caching:** Automatic request caching to handle GitHub API rate limits.

## Common use cases

The GitHub data source is used to build dashboards and alerts for a variety of engineering workflows:

- **Engineering velocity:** Track commit frequency, PR cycle time (open to merge), and issue throughput to understand team productivity trends.
- **Code review health:** Monitor open pull request counts, review turnaround time, and stale PRs to identify bottlenecks in the review process.
- **Release and deployment tracking:** Visualize release cadence, tag history, and deployment frequency across repositories using time series panels.
- **Security posture:** Build dashboards for code scanning alerts and vulnerability counts to track remediation progress and spot regressions.
- **CI/CD pipeline monitoring:** Track workflow run success and failure rates, identify flaky workflows, and monitor GitHub Actions usage with the workflow usage query type.
- **Open source community health:** Monitor stargazer growth, contributor activity, and issue response times to gauge community engagement.
- **Sprint and milestone tracking:** Combine milestone and issue queries to visualize progress toward project milestones and identify at-risk deliverables.

Use [template variables](/docs/plugins/grafana-github-datasource/latest/template-variables/) to make these dashboards dynamic across repositories and organizations.

## Get started

The following pages help you set up and use the GitHub data source:

- [Configure the GitHub data source](/docs/plugins/grafana-github-datasource/latest/configure/)
- [GitHub query editor](/docs/plugins/grafana-github-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-github-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-github-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-github-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-github-datasource/latest/troubleshooting/)

## Pre-built dashboards

The plugin includes the **GitHub Default** dashboard, which provides an overview of a single repository. The dashboard is organized into the following sections:

- **Stats:** Commit count, release count, and tag count for the selected time range.
- **Pull Requests:** Pull requests created over time, active (open) pull requests, average PR open time, and individual PR open durations.
- **Issues:** Issues created over time, active (open) issues, average issue open time for closed issues, and issues grouped by milestone.
- **Data:** Table views of commits, issues, pull requests, contributors, milestones, releases, tags, and packages.

### Access the pre-built dashboard

To import the dashboard from within Grafana:

1. Click **Connections** in the left-side menu.
2. Click **Data sources**.
3. Select your GitHub data source.
4. Click the **Dashboards** tab.
5. Click **Import** next to **GitHub Default**.

You can also import the [GitHub Default dashboard from grafana.com](/grafana/dashboards/14000) (dashboard ID `14000`). For instructions, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/).

## Caching

Caching is always enabled for this plugin.

> Note
>
> To stay within [GitHub’s rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api), the plugin caches all API responses. Cached data may be up to five minutes old, so recent changes to pull requests, commits, or issues may not appear immediately.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [GitHub REST API documentation](https://docs.github.com/en/rest)
- [Grafana community forum](https://community.grafana.com/)
- [Report issues on GitHub](https://github.com/grafana/github-datasource/issues)
