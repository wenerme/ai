# Manage security configuration profiles

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/19802) in GitLab 18.9 [with a feature flag](../../../administration/feature_flags/_index.md) named `security_scan_profiles_feature`. Enabled by default.
- Secret detection profile [added](https://gitlab.com/groups/gitlab-org/-/epics/19903) in GitLab 18.10.
- SAST profile [added](https://gitlab.com/groups/gitlab-org/-/epics/19951) in GitLab 18.11.
- Dependency scanning profile [introduced](https://gitlab.com/groups/gitlab-org/-/epics/19952) in GitLab 19.0 [with a feature flag](../../../administration/feature_flags/_index.md) named `security_scan_profiles_dependency_scanning`. Enabled by default.
- Feature flag `security_scan_profiles_feature` removed in GitLab 19.4.

Security configuration profiles are centralized settings that define how and when security scanners run across your projects.
Use security configuration profiles to manage security scanners across your organization efficiently. A profile-based approach applies best practices with minimal manual setup.
Legacy scanner configuration requires you to edit YAML files or individual project settings.
With profiles, you can apply the same scanner settings to multiple projects at once without changing code.

<i class="fa-youtube-play" aria-hidden="true"></i>
For an overview, see [Introducing security configuration profiles](https://www.youtube.com/watch?v=QbnLGzTEqGI).

When you apply a profile to a group, it is applied to each individual project within that group. Profiles are not attached to the group itself, and there is no inheritance between profiles or subgroups.

You can use two kinds of profiles:

- [Default profiles](#default-profiles): Preconfigured by GitLab. Use them to enable security scanning in minutes and with minimal configuration.
- [Custom profiles](#custom-profiles): Created by you, with your own scan triggers and scanner settings.

## View profile details

To view the settings of a profile:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security configuration**.
1. Select the **Scanners** tab.
1. On the row for the scanner, select **Manage profiles**.
1. Select the profile.

The profile details show the description, analyzer type, scan triggers, and any advanced configuration.

To view the details of an automated triage and remediation profile:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security configuration**.
1. Select the **Automated Triage and Remediation** tab.
   The tab lists profiles only after at least one project has a profile.
1. Next to the profile, select **View details**.

To see which projects each scanner covers, view the
[scanner coverage](../security_inventory/_index.md#scanner-coverage) in the security inventory.

## Apply profiles

You can apply any default or custom profile to subgroups and projects.
When you apply a profile to a subgroup, it applies to every project or subgroup.

Prerequisites:

- The Security Manager, Maintainer, or Owner role for the project or group, or a custom role with the `apply_security_scan_profiles` permission.

### Apply profiles in the UI

Use the security inventory to apply profiles to a single project, or to multiple subgroups and projects at once.
You can also apply an automated triage and remediation profile with the
[triage and remediation wizard](#apply-an-automated-triage-and-remediation-profile-with-the-triage-and-remediation-wizard).

### Individual projects

Enable or disable security scanners for a single project.

To apply a profile to a project:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security inventory**.
1. Next to the project, select the vertical ellipsis () > **Manage security configuration**.
1. On the **Security testing** tab, under **Profile-based scanner configuration**, find a scanner.
1. Optional. To apply a custom profile, select it from the **Profile** dropdown list.
1. Select **Apply default profile** or, for a custom profile, **Apply profile**.

To disable a scanner, next to the scanner, select the vertical ellipsis () > **Disable**.

### Individual subgroups

To apply a profile to a subgroup:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security inventory**.
1. Next to the group, select the vertical ellipsis () > **Manage security scanners for subgroup projects**.
1. Optional. To apply a custom profile, select it from the **Profile** dropdown list.
1. For each scanner, select **Apply default profile to all** or, for a custom profile, **Apply profile to all**.

To disable a scanner for the subgroup, select **Disable for all**.

### Multiple groups or projects

To save time, you can apply security profiles to multiple projects and subgroups at once:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security inventory**.
1. Select one or more projects or subgroups to apply the profile to.
1. From the **Select bulk action** dropdown list, select **Manage security scanners**.
1. Optional. To apply a custom profile, select it from the **Profile** dropdown list.
1. For each scanner, select **Apply default profile to all** or, for a custom profile, **Apply profile to all**.

To disable a scanner for the selected projects, select **Disable for all**.

For the profile to run, first meet the [automated triage and remediation profile prerequisites](#automated-triage-and-remediation-profile).

To apply an automated triage and remediation profile to multiple projects and subgroups:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security inventory**.
1. Select one or more projects or subgroups to apply the profile to.
1. From the **Select bulk action** dropdown list, select **Apply Automated Triage and Remediation profile**.
1. Select a profile, then select **Apply profile**.
1. In the confirmation dialog, select **Apply profile**.

To turn off automated triage and remediation for projects and subgroups:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security inventory**.
1. Select one or more projects or subgroups.
1. From the **Select bulk action** dropdown list, select **Turn off Automated Triage and Remediation**.
1. In the confirmation dialog, select **Turn off**.

After you turn off automated triage and remediation, GitLab no longer triages or fixes new vulnerabilities.
Merge requests that the flows already opened stay open.

### Apply an automated triage and remediation profile with the triage and remediation wizard

Prerequisites:

- Have the Security Manager, Maintainer, or Owner role for the group, or a custom role with the `apply_security_scan_profiles` permission.
- Meet the [automated triage and remediation profile prerequisites](#automated-triage-and-remediation-profile).

To apply an automated triage and remediation profile:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security configuration**.
1. Select the **Automated Triage and Remediation** tab.
1. Select **Apply profile**.
   If no project has a profile yet, select **Get started**.
1. Select an approach:
   - To apply one profile to the whole group, select **Apply one profile group-wide** >
     **Start quick setup**.
     Then select which projects get the profile:
     - **All projects**: Applies the profile to every project, including projects where automated
       triage and remediation is turned off.
       Replaces any automated triage and remediation profile a project already has.
     - **Fill gaps**: Applies the profile only to projects without one.
     - **Replace existing profiles**: Replaces the profile only on projects that already have one.

     To use a different preset, by **Profile**, select **Change profile** ().
   - To pick the projects, select **Choose projects and a profile** > **Start advanced setup**.
     Select the projects, then choose a profile.
1. On the **Review capabilities** step, check which capabilities can run.
   Capabilities under **Won't run yet** are turned off for the top-level group.
   You can still apply the profile, but those capabilities don't run until they are
   [turned on for the top-level group](../../duo_agent_platform/flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off).
1. Review the configuration, then select **Apply configuration**.

GitLab applies the profile to selected projects right away.
For a group or subgroup, GitLab applies the profile to its projects in the background.

### Apply profiles with the scanner enablement wizard

Use the [Scanner Enablement Wizard](scanner_enablement_wizard.md) to apply profiles to projects that lack scanner
coverage. The wizard configures dependency scanning, SAST, and secret detection, and updates the coverage shown in
the [security inventory](../security_inventory/_index.md).

### Apply profiles with the GitLab CLI

- Status: Experiment

The [GitLab CLI](https://docs.gitlab.com/cli/security/config/) (`glab`) is a command-line tool for working with
GitLab. Use it to apply, remove, or check the status of a profile for a single project.

### Apply profiles with the GraphQL API

- Status: Experiment

- `mode` argument [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/262310) in GitLab 19.6.

Use the [GraphQL API](../../../api/graphql/getting_started.md) to apply profiles to subgroups and projects.
When you apply a profile to a group, GitLab applies it to every project in the group and its subgroups.

To apply a profile:

1. Get the profile ID from the
   [`Group.availableSecurityScanProfiles`](../../../api/graphql/reference/objects.md#group) field.
1. Apply the profile with the
   [`securityScanProfileAttach`](../../../api/graphql/reference/mutations.md#securityscanprofileattach) mutation. For example:

   ```graphql
   mutation {
     securityScanProfileAttach(input: {
       securityScanProfileId: "gid://gitlab/Security::ScanProfile/sast",
       projectIds: ["gid://gitlab/Project/123"],
       groupIds: ["gid://gitlab/Group/456"]
     }) {
       errors
     }
   }
   ```

All projects and groups in one mutation must belong to the same top-level group.
Each mutation accepts up to 100 project and group IDs combined.

By default, the profile replaces any other profile of the same scan type on every target project.
To change this behavior, set the `mode` argument of the `securityScanProfileAttach` mutation to a
[`SecurityScanProfileAttachMode`](../../../api/graphql/reference/enums.md#securityscanprofileattachmode) value.
For example, to apply a profile only to projects that don't have one yet, use `FILL_PROFILE_GAPS`.

In `FILL_SCAN_GAPS` mode, a project has scan coverage for a scan type when it has an
[`analyzerStatuses`](../../../api/graphql/reference/objects.md#analyzerprojectstatustype) entry for
that `analyzerType` with a `status` other than `NOT_CONFIGURED`.
A project with no entry for the type, or with a `NOT_CONFIGURED` entry, has no coverage.
For secret detection and container scanning, only pipeline-based scans count as coverage.
Secret push protection and container registry scanning do not stop the profile from applying.

`FILL_SCAN_GAPS` is not available for profiles of a scan type that has no analyzer status, like
automated triage and remediation.

To remove a profile, use the
[`securityScanProfileDetach`](../../../api/graphql/reference/mutations.md#securityscanprofiledetach) mutation.

## Default profiles

GitLab provides default profiles that are preconfigured so you can enable security scanning,
triage, and remediation with minimal configuration.

| Profile | Description | Apply with |
| ------- | ----------- | ---------- |
| [Secret detection](#secret-detection-profile) | Scans for secrets with the recommended configuration. | [UI](#apply-profiles-in-the-ui), [wizard](#apply-profiles-with-the-scanner-enablement-wizard), [CLI](#apply-profiles-with-the-gitlab-cli), [API](#apply-profiles-with-the-graphql-api) |
| [SAST](#sast-profile) | Scans source code with the recommended configuration. | [UI](#apply-profiles-in-the-ui), [wizard](#apply-profiles-with-the-scanner-enablement-wizard), [CLI](#apply-profiles-with-the-gitlab-cli), [API](#apply-profiles-with-the-graphql-api) |
| [Dependency scanning](#dependency-scanning-profile) | Scans dependencies with the recommended configuration. | [UI](#apply-profiles-in-the-ui), [wizard](#apply-profiles-with-the-scanner-enablement-wizard), [CLI](#apply-profiles-with-the-gitlab-cli), [API](#apply-profiles-with-the-graphql-api) |
| [Dependency scanning auto-remediation](#dependency-scanning-auto-remediation-profile) | Opens merge requests that upgrade vulnerable dependencies. | [CLI](#apply-profiles-with-the-gitlab-cli), [API](#apply-profiles-with-the-graphql-api) |
| [Automated triage and remediation](#automated-triage-and-remediation-profile) | Turns on GitLab Duo triage flows and dependency scanning auto-remediation. | [UI](#apply-profiles-in-the-ui), [wizard](#apply-an-automated-triage-and-remediation-profile-with-the-triage-and-remediation-wizard), [CLI](#apply-profiles-with-the-gitlab-cli), [API](#apply-profiles-with-the-graphql-api) |
| [Business logic](#business-logic-profile) | Uses an AI agent to find business logic vulnerabilities. | [CLI](#apply-profiles-with-the-gitlab-cli), [API](#apply-profiles-with-the-graphql-api) |
| [Security Review](#security-review-profile) | Posts review threads on merge requests instead of running the business logic scan. | [API](#apply-profiles-with-the-graphql-api) |
| [SkillGuard](#skillguard-profile) | Uses an AI agent to find security risks in AI agent skill files. | [API](#apply-profiles-with-the-graphql-api) |

### Secret detection profile

The secret detection profile scans for secrets with the recommended configuration.
The profile turns on the following scan triggers:

- **Push protection**: Scans all Git push events and blocks pushes where secrets are detected, preventing secrets from ever entering your codebase.
- **Merge request pipelines**: Runs a scan each time new commits are pushed to a branch with an open merge request. Results include only new vulnerabilities introduced by the merge request. Targets all branches.
- **Default branch pipelines**: Runs when changes are merged or pushed to the default branch, providing a complete picture of your default branch's security posture. Targets the default branch.

### SAST profile

The SAST profile scans source code with the recommended configuration.
The profile turns on the following scan triggers:

- **Merge request pipelines**: Runs a scan each time new commits are pushed to a branch with an open merge request. Results include only new vulnerabilities introduced by the merge request. Targets all branches.
- **Default branch pipelines**: Runs when changes are merged or pushed to the default branch, providing a complete picture of your default branch's security posture. Targets the default branch.

### Dependency scanning profile

The dependency scanning profile scans dependencies with the recommended configuration.
The profile turns on the following scan triggers:

- **Merge request pipelines**: Runs a scan each time new commits are pushed to a branch with an open merge request. Results include only new vulnerabilities introduced by the merge request. Targets all branches.
- **Default branch pipelines**: Runs when changes are merged or pushed to the default branch, providing a complete picture of your default branch's security posture. Targets the default branch.

### Dependency scanning auto-remediation profile

- Dependency scanning auto-remediation profile [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/604588) in GitLab 19.2 [with a feature flag](../../../administration/feature_flags/_index.md) named `security_remediation_profiles`. Enabled by default.
- Feature flag `security_remediation_profiles` removed in GitLab 19.4.
- Triage and remediation profile support for auto-remediation [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/253780) in GitLab 19.4 [with a feature flag](../../../administration/feature_flags/_index.md) named `triage_and_remediation_profile`. Enabled by default.

The dependency scanning auto-remediation profile opens merge requests that bump vulnerable
dependencies to non-vulnerable versions. For more information, see
[dependency scanning auto-remediation](../remediate/dependency_scanning_auto_remediation.md).

### Automated triage and remediation profile

- Triage and remediation profile [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/622469) in GitLab 19.4 [with a feature flag](../../../administration/feature_flags/_index.md) named `triage_and_remediation_profile`. Enabled by default.
- Triage and remediation profiles UI [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/631416) in GitLab 19.6 [with a feature flag](../../../administration/feature_flags/_index.md) named `triage_and_remediation_profiles_ui`. Enabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag. For more information, see the
> history.

The automated triage and remediation profile turns on GitLab Duo triage flows and dependency scanning
auto-remediation for your projects. The GitLab Duo flows use AI to assess and resolve
findings. A profile can enable a flow on its own, or replace the equivalent per-project setting
where one exists.

GitLab provides three presets: Conservative, Standard, and Proactive. Each one applies a
different configuration to every flow, so you can choose how broadly and how often the flows trigger
and run. You can also create a profile and configure it yourself.

> [!note]
> A project can have both the dependency scanning auto-remediation profile and a triage and
> remediation profile attached at the same time. In that situation, GitLab only uses the profile that
> was applied first. The configuration for the other profile is ignored.
>
> Most of these flows are AI-powered and consume [GitLab Credits](../../../subscriptions/gitlab_credits.md).
> Consumption scales with the number of findings.

Prerequisites:

- Meet the [prerequisites for the GitLab Duo Agent Platform](../../duo_agent_platform/_index.md#prerequisites).
- Turn on **Allow foundational flows** and each flow you want to use
  [for the top-level group](../../duo_agent_platform/flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off).
  You turn flows on once for the top-level group, not for each project.

Each preset configures the flows as follows:

| Flow | `Triage and Remediation (Conservative)` | `Triage and Remediation (Standard)` | `Triage and Remediation (Proactive)` |
| ---- | ------------ | -------- | --------- |
| [SAST false positive detection](../vulnerabilities/false_positive_detection.md) | `high` and above, on demand | `medium` and above, automatic | `info` and above, automatic |
| [SAST vulnerability resolution](../vulnerabilities/agentic_vulnerability_resolution.md) | `high` and above, on demand, up to five open merge requests | `medium` and above, automatic, up to 15 open merge requests | `info` and above, automatic, no merge request limit |
| [Secret detection false positive detection](../vulnerabilities/secret_false_positive_detection.md) | `high` and above, on demand | `medium` and above, automatic | `info` and above, automatic |
| [Dependency scanning auto-remediation](../remediate/dependency_scanning_auto_remediation.md) | `high` and above, minor version upgrades, up to five open merge requests, skips fix versions from the last seven days | `high` and above, minor version upgrades, up to 30 open merge requests, skips fix versions from the last seven days | `info` and above, major version upgrades, up to 30 open merge requests, skips fix versions from the last seven days |

After at least one project has a profile, the **Automated Triage and Remediation** tab on the
[security configuration page](#view-profile-details) shows:

- **Projects without a profile**: The number of projects that have no automated triage and
  remediation profile.
- **Capabilities off for group**: The flows that are turned off for the top-level group.
  These flows do not run on any project.
  If you are not assigned the Owner role for the top-level group, ask someone who is to turn them on.

The tab also lists each preset with the severities and capabilities it covers.

To apply a profile, see [apply profiles in the UI](#apply-profiles-in-the-ui) or
[apply an automated triage and remediation profile with the triage and remediation wizard](#apply-an-automated-triage-and-remediation-profile-with-the-triage-and-remediation-wizard).

### Business logic profile

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/257199) in GitLab 19.5.

The business logic profile uses an AI agent to find business logic vulnerabilities, like missing
authorization, broken object-level access, and mass assignment. When you apply the profile to a project,
the scan turns on for that project.

When a merge request's head pipeline succeeds, the scan runs on the files the merge request adds or
modifies. It does not run on default branch pipelines. To cover the default branch,
[start a scan from GitLab Duo Chat](../business_logic_scanning/_index.md#start-a-scan-from-gitlab-duo-chat).
If the project has no CI/CD pipelines, no merge request scans run. For more information, see
[business logic scanning](../business_logic_scanning/_index.md).

Findings appear in the merge request security widget.
To get findings as review threads on the merge request instead,
apply the [Security Review profile](#security-review-profile).

Prerequisites:

- Turn on **Allow flow execution**, **Allow foundational flows**, and the **Business Logic Security Scan** flow
  [for the top-level group](../../duo_agent_platform/flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off).

### Security Review profile

- Status: Beta

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/602320) as a [beta](../../../policy/development_stages_support.md#beta) in GitLab 19.6.

The Security Review profile is a business logic profile that
[runs Security Review Flow automatically](../security_review.md#run-reviews-automatically)
instead of the business logic scan, so findings are posted only as review threads on the merge request.
They are not added to the [vulnerability report](../vulnerability_report/_index.md)
or the merge request security widget.
If both business logic profiles are applied to a project,
the profile that was created first in the group applies.
If Security Review Flow is turned off for the top-level group,
a project with this profile applied runs the business logic scan instead.
To apply it with the GraphQL API, use the profile ID
`gid://gitlab/Security::ScanProfile/business_logic_security_review`.

Prerequisites:

- Meet the [business logic profile prerequisites](#business-logic-profile).
- Turn on [Security Review Flow](../security_review.md#prerequisites) for the top-level group.

### SkillGuard profile

- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/634364) in GitLab 19.6 [with feature flags](../../../administration/feature_flags/_index.md) named `skillguard_analyzer` and `skillguard_scan_flow`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by feature flags. For more information, see the
> history.

The SkillGuard profile uses an AI agent to find security risks in the AI agent skill files in your
repository, such as `SKILL.md`, `CLAUDE.md`, and `AGENTS.md`. It reports risks like prompt injection,
credential exfiltration, and unsafe command execution. When you apply the profile to a project, the
scan turns on for that project.

The scan runs when a default branch pipeline succeeds.
If the project has no CI/CD pipelines, no scans run.

SkillGuard publishes its findings as a SAST report, so they appear in the vulnerability report
alongside other scanners' findings.

Prerequisites:

- Turn on **Allow flow execution**, **Allow foundational flows**, and the **SkillGuard Security Scan** flow
  [for the top-level group](../../duo_agent_platform/flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off).

## Custom profiles

- Secret detection scan profile configuration [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/606237) in GitLab 19.3 as an [experiment](../../../policy/development_stages_support.md), available through the GraphQL API only.
- SAST scan profile configuration [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/617070) in GitLab 19.4 as an [experiment](../../../policy/development_stages_support.md), available through the GraphQL API only.
- Custom profiles in the UI [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/624191) in GitLab 19.4 [with a feature flag](../../../administration/feature_flags/_index.md) named `custom_scan_profiles_ui`. Disabled by default.
- [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/259962) in GitLab 19.5.
- Dependency scanning scan profile configuration [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/629403) in GitLab 19.5 as an [experiment](../../../policy/development_stages_support.md#experiment), available through the GraphQL API only.
- Dependency scanning custom profiles in the UI [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/634032) in GitLab 19.6.

Custom profiles override the configuration a scanner uses when it runs.
Each setting maps to an existing CI/CD variable for that scanner.

Create a custom profile when the default configuration does not fit your projects. For example,
use a custom profile to:

- Exclude paths, like test fixtures or vendored code, from scans.
- Pull analyzer images from your own container registry, like in an offline environment.
- Use FIPS-compliant analyzer images.
- Skip SAST analyzers that do not apply to your project.
- Scan the full Git history for secrets.

You can apply a custom profile to many projects at once.
You do not have to set the same CI/CD variables in each project's `.gitlab-ci.yml` file.

You can create secret detection, SAST, and dependency scanning profiles in the UI or with the GraphQL API.

### Create a custom profile in the UI

> [!flag]
> The availability of this feature is controlled by a feature flag. For more information, see the
> history.

Prerequisites:

- The Maintainer or Security Manager role for the top-level group.

To create a custom profile in the UI:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Secure** > **Security configuration**.
1. Select the **Scanners** tab.
1. On the **Secret detection**, **Static application security testing (SAST)**, or **Dependency scanning** row, select **Manage profiles**.
1. Select **Create new profile**.
1. Enter a **Name** and a **Description**.
1. Under **Scan triggers**, turn on the triggers you want.
1. Optional. Under **Advanced configuration**, add the settings to override.
1. Select **Create profile**.

To change a profile later, select it, then select the vertical ellipsis () > **Edit**, then **Save changes**.
Changes apply to every project that uses the profile.

### Create a custom profile with the GraphQL API

Prerequisites:

- The Security Manager, Maintainer, or Owner role for the top-level group.

To create a custom profile with the GraphQL API, use the `securityScanProfileCreate` or
`securityScanProfileUpdate` mutation. On each trigger you want to customize, set the configuration
object for the profile's scan type:

- `configuration.secretDetection` for a secret detection profile.
- `configuration.sast` for a SAST profile.
- `configuration.dependencyScanning` for a dependency scanning profile.

You can set only one configuration member per trigger, and it must match the profile's scan type.

By default, the `stripDefaults` argument removes trigger configuration values that match the
defaults before storing the profile, so only your overrides persist.

For the full list of arguments, see the
[`securityScanProfileCreate` mutation](../../../api/graphql/reference/mutations.md#securityscanprofilecreate).

### Secret detection configuration fields

- Status: Experiment

For more information about each setting, see [secret detection](../secret_detection/_index.md).

| Field | UI setting | Description | Equivalent CI/CD variable |
| ----- | ---------- | ----------- | ------------------------- |
| `secureAnalyzersPrefix` | **Analyzer image registry** | Prefix for the container registry the analyzer image is pulled from. | `SECURE_ANALYZERS_PREFIX` |
| `imageSuffix` | **Image variant** (Default, FIPS) | Suffix appended to the analyzer image name. Set to `DEFAULT` or `FIPS`. | `SECRET_DETECTION_IMAGE_SUFFIX` |
| `historicScan` | **Historic scan** | Whether to scan the full Git history instead of only the current state. | `SECRET_DETECTION_HISTORIC_SCAN` |
| `logOptions` | **Log options** | Options passed to `git log` to control the commit range scanned. | `SECRET_DETECTION_LOG_OPTIONS` |
| `excludedPaths` | **Paths to exclude** | Glob paths excluded from the scan. | `SECRET_DETECTION_EXCLUDED_PATHS` |
| `rulesetGitReference` | **Ruleset Git reference** | Git reference of the remote ruleset configuration to use. | `SECRET_DETECTION_RULESET_GIT_REFERENCE` |

For example, to create a secret detection profile with a customized merge request pipeline trigger:

```graphql
mutation {
  securityScanProfileCreate(input: {
    namespaceId: "gid://gitlab/Group/123",
    scanType: SECRET_DETECTION,
    name: "Custom secret detection profile",
    description: "Secret detection profile with a historic scan and path exclusions",
    triggers: [
      {
        triggerType: MERGE_REQUEST_PIPELINE,
        configuration: {
          secretDetection: {
            historicScan: true,
            excludedPaths: ["spec/**/*", "test/**/*"]
          }
        }
      }
    ]
  }) {
    scanProfile {
      id
      name
    }
    errors
  }
}
```

### SAST configuration fields

- Status: Experiment

For more information about each setting, see [SAST](../sast/_index.md).

| Field | UI setting | Description | Equivalent CI/CD variable |
| ----- | ---------- | ----------- | ------------------------- |
| `secureAnalyzersPrefix` | **Analyzer image registry** | Prefix for the container registry the analyzer image is pulled from. | `SECURE_ANALYZERS_PREFIX` |
| `imageSuffix` | **Image variant** (Default, FIPS) | Suffix appended to the analyzer image name. Set to `DEFAULT` or `FIPS`. | `SAST_IMAGE_SUFFIX` |
| `analyzerImageTag` | **Analyzer image tag** | Tag of the analyzer image to use. Overrides the pinned image tag for all SAST analyzers, which can cause analyzer failures if a specific version is required. | `SAST_ANALYZER_IMAGE_TAG` |
| `excludedAnalyzers` | **Analyzers to skip** | Analyzers excluded from the scan. | `SAST_EXCLUDED_ANALYZERS` |
| `excludedPaths` | **Paths to exclude** | Glob paths excluded from the scan. | `SAST_EXCLUDED_PATHS` |
| `advancedSastPartialScan` | **Advanced SAST partial scanning** (Enabled, Disabled) | Controls [diff-based scanning](../sast/gitlab_advanced_sast.md) for GitLab Advanced SAST. Set to `DIFFERENTIAL` or `DISABLED`. | `ADVANCED_SAST_PARTIAL_SCAN` |
| `gitlabAdvSastIncrScan` | **Advanced SAST incremental scanning** | Whether [incremental scanning](../sast/gitlab_advanced_sast.md) is enabled for GitLab Advanced SAST. | `GITLAB_ADV_SAST_INCR_SCAN` |

For example, to create a SAST profile with a customized merge request pipeline trigger:

```graphql
mutation {
  securityScanProfileCreate(input: {
    namespaceId: "gid://gitlab/Group/123",
    scanType: SAST,
    name: "Custom SAST profile",
    description: "SAST profile with custom analyzer exclusions and Advanced SAST settings",
    triggers: [
      {
        triggerType: MERGE_REQUEST_PIPELINE,
        configuration: {
          sast: {
            excludedAnalyzers: ["eslint"],
            excludedPaths: ["spec/**/*", "test/**/*"],
            advancedSastPartialScan: DIFFERENTIAL,
            gitlabAdvSastIncrScan: true
          }
        }
      }
    ]
  }) {
    scanProfile {
      id
      name
    }
    errors
  }
}
```

### Dependency scanning configuration fields

- Status: Experiment

For more information about each setting, see [dependency scanning](../dependency_scanning/dependency_scanning_sbom/_index.md).

| Field | UI setting | Description | Equivalent CI/CD variable |
| ----- | ---------- | ----------- | ------------------------- |
| `secureAnalyzersPrefix` | **Analyzer image registry** | Prefix for the container registry the analyzer image is pulled from. | `SECURE_ANALYZERS_PREFIX` |
| `additionalCaCertBundle` | **CA certificate bundle** | CA certificate bundle to trust. The bundle is added to the system's certificates and used by other tools during the scan. | `ADDITIONAL_CA_CERT_BUNDLE` |
| `secureLogLevel` | **Log level** (Fatal, Error, Warning, Info, Debug) | Logging level used by the analyzer. Set to `FATAL`, `ERROR`, `WARN`, `INFO`, or `DEBUG`. | `SECURE_LOG_LEVEL` |
| `excludedPaths` | **Paths to exclude** | Glob paths excluded from the scan. | `DS_EXCLUDED_PATHS` |
| `includeDevDependencies` | **Include development dependencies** | Whether to include development and test dependencies when a supported file is scanned. | `DS_INCLUDE_DEV_DEPENDENCIES` |
| `maxDepth` | **Maximum directory depth** | Directory depth the analyzer scans. A value of `-1` scans all directories. | `DS_MAX_DEPTH` |
| `pipDependencyPath` | **pip dependency path** | Path used to install Python packages for analysis. | `DS_PIP_DEPENDENCY_PATH` |
| `staticReachabilityEnabled` | **Static reachability** | Whether [static reachability](../dependency_scanning/static_reachability.md) is enabled. | `DS_STATIC_REACHABILITY_ENABLED` |
| `enableManifestFallback` | **Manifest fallback** | Whether to scan manifest files when no lockfile or dependency graph export is available. For more information, see [manifest fallback](../dependency_scanning/dependency_scanning_sbom/_index.md#manifest-fallback). | `DS_ENABLE_MANIFEST_FALLBACK` |
| `pipcompileLockfileFileNamePattern` | **pip-compile lockfile name pattern** | Glob pattern that selects which pip-compile lockfiles to process. The pattern matches filenames only, not directory paths. | `DS_PIPCOMPILE_LOCKFILE_FILE_NAME_PATTERN` |
| `pipManifestFileNamePattern` | **pip manifest name pattern** | Glob pattern that selects which pip manifest files to process for dependency resolution and manifest scanning. The pattern matches filenames only, not directory paths. | `DS_PIP_MANIFEST_FILE_NAME_PATTERN` |
| `enableVulnerabilityScan` | **Vulnerability scan** | Whether vulnerability analysis of generated SBOMs is enabled. | `DS_ENABLE_VULNERABILITY_SCAN` |
| `apiTimeout` | **API timeout** | Vulnerability scanning API request timeout in seconds, from 5 to 300. | `DS_API_TIMEOUT` |
| `apiScanDownloadDelay` | **API download delay** | Vulnerability scanning API initial delay in seconds before downloading scan results, from 1 to 120. | `DS_API_SCAN_DOWNLOAD_DELAY` |
| `mavenDependencyPluginVersion` | **maven-dependency-plugin version** | Version of `maven-dependency-plugin` used during resolution. | `DS_MAVEN_DEPENDENCY_PLUGIN_VERSION` |
| `mavenArgs` | **Maven arguments** | Additional arguments passed to Maven during dependency resolution. | `MAVEN_ARGS` |
| `gradleCliOpts` | **Gradle options** | Additional command-line options passed to Gradle during dependency resolution. | `GRADLE_CLI_OPTS` |
| `disabledResolutionJobs` | **Resolution jobs to skip** (Maven, Gradle, Python) | List of resolution jobs to disable. Valid values are `MAVEN`, `GRADLE`, and `PYTHON`. By default, all available resolution jobs are enabled. | `DS_DISABLED_RESOLUTION_JOBS` |
| `mavenResolutionImage` | **Maven resolution image** | Image used by the Maven dependency resolution job. | `DS_MAVEN_RESOLUTION_IMAGE` |
| `gradleResolutionImage` | **Gradle resolution image** | Image used by the Gradle dependency resolution job. | `DS_GRADLE_RESOLUTION_IMAGE` |
| `pythonResolutionImage` | **Python resolution image** | Image used by the Python dependency resolution job. | `DS_PYTHON_RESOLUTION_IMAGE` |
| `pipIndexUrl` | **pip index URL** | Base URL of the Python Package Index. | `PIP_INDEX_URL` |
| `pipExtraIndexUrl` | **pip extra index URLs** | Additional URLs of Python package indexes to use in addition to `pipIndexUrl`. | `PIP_EXTRA_INDEX_URL` |
| `searchIgnoreHiddenDirs` | **Ignore hidden directories** | Whether to ignore hidden directories when the analyzer searches for supported files. | `SEARCH_IGNORE_HIDDEN_DIRS` |

For example, to create a dependency scanning profile with a customized merge request pipeline trigger:

```graphql
mutation {
  securityScanProfileCreate(input: {
    namespaceId: "gid://gitlab/Group/123",
    scanType: DEPENDENCY_SCANNING,
    name: "Custom dependency scanning profile",
    description: "Dependency scanning profile that excludes development dependencies and scans all directories",
    triggers: [
      {
        triggerType: MERGE_REQUEST_PIPELINE,
        configuration: {
          dependencyScanning: {
            includeDevDependencies: false,
            excludedPaths: ["spec/**/*", "test/**/*"],
            maxDepth: -1,
            staticReachabilityEnabled: true
          }
        }
      }
    ]
  }) {
    scanProfile {
      id
      name
    }
    errors
  }
}
```

## Troubleshooting

When working with security configuration profiles, you might encounter the following issues.

### Scanner status is active in the dashboard but not enabled in inventory tooltip

This can occur when a project uses legacy settings while also being assigned a new profile.

To resolve this issue:

1. Check the **Security Configuration** page for the most accurate current profile state.
1. If needed, remove legacy scanner configurations from your `.gitlab-ci.yml` file to rely solely on the profile-based configuration.

> [!note]
> The inventory tooltip is being refined to reflect the combined status of both legacy and profile-based settings.
