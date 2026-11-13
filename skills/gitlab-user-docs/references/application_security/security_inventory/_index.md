# Security inventory

Group-level visibility of assets, scanner coverage, and vulnerabilities.

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/groups/gitlab-org/-/epics/16484) as a [beta](../../../policy/development_stages_support.md) in GitLab 18.2 with a flag named `security_inventory_dashboard`. Enabled by default.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/588619) in GitLab 18.9. Feature flag `security_inventory_dashboard` removed.
- Vulnerability counts [changed](https://gitlab.com/gitlab-org/gitlab/-/work_items/600455) in GitLab 19.2 to exclude vulnerabilities that are no longer detected, aligning the security inventory with the security dashboard.

Use the security inventory to visualize which assets you need to secure and understand the actions you need to take to improve security. A common phrase in security is, "you can't secure what you can't see." The security inventory provides visibility into the security posture of your organization's top-level groups, helps you identify coverage gaps, and enables you to make efficient, risk-based prioritization decisions.

The security inventory shows:

- Your groups, subgroups, and projects.
- A summary of risk across the group's projects, including projects that need attention, have stale scans, or are unprotected.
- Security scanner coverage for each project, regardless of how the scanner is enabled. Tool coverage reflects the scan status of the most recent pipeline on the default branch. Security scanners include:
  - Static application security testing (SAST)
  - Dependency scanning
  - Container scanning
  - Secret detection, including secret push protection
  - Dynamic application security testing (DAST)
  - Infrastructure-as-code (IaC) scanning
- The number of vulnerabilities in each group or project, sorted by severity level. The count excludes vulnerabilities that are no longer detected.
- Automated triage and remediation coverage for each group or project, in the **Capabilities** column.

Track the development of the security inventory in [epic 16939](https://gitlab.com/groups/gitlab-org/-/work_items/16939). Share [your feedback](https://gitlab.com/gitlab-org/gitlab/-/issues/553062) as development continues on this feature.

## View the security inventory

Prerequisites:

- You must have the Security Manager, Developer, Maintainer, or Owner role in the group to view the security inventory.

To view the security inventory:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security inventory**.
1. Complete one of the following actions:
   - To view a group's subgroups, projects, and security assets, select the group.
   - To view a group or project's scanner coverage, search for the group or project.

## Project status

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/632028) in GitLab 19.6 [with a flag](../../../administration/feature_flags/_index.md) named `security_inventory_projects_widget`. Enabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

The **Projects** card shows how many projects in the group have each of the following statuses. A project can have more than one status at the same time:

- **Needs attention**: The project has at least one scanner with a [failed status](#scanner-coverage).
- **Has stale scans**: The project has at least one scanner with a [stale status](#scanner-coverage).
- **Unprotected**: The project has no security scanner configured.

To filter the inventory by a status, select it in the card.

## Scanner coverage

- Stale status was [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/596022) in GitLab 19.0

Security scanner status is evaluated when a default branch pipeline completes.
Each security scanner shows one of the following coverage statuses for every project or group:

- **Not enabled**: The scanner is not configured.
- **Enabled**: The scanner is configured and completed successfully.
- **Failed**: The scanner ran but did not complete successfully.
- **Stale**: A previously enabled scanner has not run in the last three consecutive pipelines.

For a project, each scanner shows a badge for its status. To view the last scan date and the
pipeline job, hover over the badge. Secret push protection has no last scan date because it runs
during each `git push`, not in a pipeline.

For a group, each scanner shows a bar with the share of projects in each status.
To view the number of projects in each status, hover over the bar.

## Capabilities

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/22125) in GitLab 19.6 [with a feature flag](../../../administration/feature_flags/_index.md) named `triage_and_remediation_profiles_ui`. Enabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag. For more information, see the
> history.

The **Capabilities** column shows whether [automated triage and remediation](../configuration/security_configuration_profiles.md#automated-triage-and-remediation-profile) is enabled.
To see the column, you must have the Security Manager, Developer, Maintainer, or Owner role in the top-level group.

For a project, the column shows a badge with one of the following colors:

- Green: At least one capability is enabled and runs.
  This does not mean that every capability is enabled.
- Orange: At least one enabled capability needs attention, but the badge is not red.
  A capability needs attention when its flow is unavailable, GitLab Duo is turned off for the project, or its scanner is not enabled.
- Red: Every enabled capability that can run is unavailable.
- Gray: No capability is enabled, or every enabled capability is turned off for the group.

To view the status of each capability, select the badge,
or move to the badge with the keyboard and press <kbd>Enter</kbd>.
The popover shows the name of the profile applied to the project.
A capability shows one of the following statuses:

- **Automatic**: The capability runs automatically.
- **On demand**: The capability runs when you start it.
- **Off**: The capability is not enabled in the profile.
- **Off for group**: The capability is enabled in the profile, but turned off for the group.
  An Owner of the top-level group can [turn on the capability](../../duo_agent_platform/flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off) in the GitLab Duo settings.
- **Scanner not enabled**: The capability is enabled in the profile, but the scanner it depends on is not enabled in the project.
- **Unavailable**: The capability is enabled in the profile, but its flow is unavailable and cannot run.

If no capability is enabled, the popover asks you to apply a profile.

The Security Manager, Maintainer, and Owner roles can apply scan profiles.
The Developer role cannot.
If you can apply scan profiles, the popover also has the following buttons:

- **Apply profile**: Apply a profile to the project.
  Shown when no capability is enabled.
- **Change profile**: Change the profile applied to the project.
  Shown when a capability is enabled.
- **Manage configuration**: Go to the **Automated Triage and Remediation** tab of the project's security configuration.
  Shown when a capability is enabled.

For a group, the column shows a bar with the share of projects in each status.
To view the number of projects in each status, hover over the bar or move to the bar with the keyboard.
Each project has one of the following statuses:

- **Enabled**: At least one capability is enabled, and the flows behind the enabled capabilities are available.
- **Needs attention**: A capability is enabled, but the flow behind at least one enabled capability is unavailable or turned off for the group.
- **Not enabled**: No capability is enabled.

## Filter projects in the security inventory

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/552224) in GitLab 18.5 [with a feature flag](../../../administration/feature_flags/_index.md) named `security_inventory_filtering`. Enabled by default.
- Feature flag `security_inventory_filtering` removed in GitLab 19.4.
- Filter persistence in the URL [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/580024) in GitLab 19.5.
- **Capabilities** filter [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/634417) in GitLab 19.6 [with a feature flag](../../../administration/feature_flags/_index.md) named `triage_and_remediation_profiles_ui`. Enabled by default.

You can filter projects in the security inventory to focus on specific areas of interest.
The following filters are available:

- **Status**: Filter projects by status (like **needs attention**, **has stale scans**, **unprotected**, or **has scanners enabled**). For example, show projects where `Status = Unprotected`.
- **Vulnerability count**: Filter projects based on the number of identified vulnerabilities. For example, show projects with `critical vulnerabilities ≥ 10`.
- **Tool coverage**: Filter projects by the status of security analyzers (like **enabled**, **not enabled**, or **failed**). For example, show projects where `Advanced SAST = enabled`.
- **Capabilities**: Filter projects by an enabled [automated triage and remediation capability](#capabilities). You can select one of the following capabilities:
  - SAST false positive detection
  - SAST vulnerability resolution
  - Secret detection false positive detection
  - Dependency scanning auto-remediation
- **Project name**: Search for specific projects by name.
- **Security attributes**: Filter projects by the [security attributes](../attributes/_index.md) applied to them.

These filters help you narrow down results in large inventories and make it easier to identify projects that require immediate attention.

The URL keeps the filters you apply.
You can share or bookmark a filtered view by copying the URL from your browser.

## Related topics

- [Security dashboard](../security_dashboard/_index.md)
- [Vulnerability reports](../vulnerability_report/_index.md)
- GraphQL references:
  - [AnalyzerGroupStatusType](../../../api/graphql/reference/objects.md#analyzergroupstatustype) - Counts for each analyzer status in the group and subgroups.
  - [AnalyzerProjectStatusType](../../../api/graphql/reference/objects.md#analyzerprojectstatustype) - Analyzer status (success/fail) for projects.
  - [SecurityPostureCounters](../../../api/graphql/reference/objects.md#securityposturecounters) - Counts of projects by project status in the group.
  - [VulnerabilityNamespaceStatisticType](../../../api/graphql/reference/objects.md#vulnerabilitynamespacestatistictype) - Counts for each vulnerability severity in the group and its subgroups.
  - [VulnerabilityStatisticType](../../../api/graphql/reference/objects.md#vulnerabilitystatistictype) - Counts for each vulnerability severity in the project.

## Troubleshooting

When working with the security inventory, you might encounter the following issues:

### Capabilities column or filter missing

The **Capabilities** column and filter are hidden when the `triage_and_remediation_profiles_ui` feature flag is disabled
or you do not have a role that can view scan profiles in the top-level group.
Ask your administrator to check the feature flag, and ask a group Owner to check your role.

### Security inventory menu item missing

Some users do not have the required permissions to access the **Security inventory** menu item. The menu item only displays for groups when the authenticated user has the Security Manager, Developer, Maintainer, or Owner role.
