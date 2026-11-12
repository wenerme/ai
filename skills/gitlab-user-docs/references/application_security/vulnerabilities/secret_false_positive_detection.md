# Secret false positive detection

Automatic detection and filtering of false positives in secret detection findings.

- Tier: Ultimate
- Add-on: GitLab Duo Core, Pro, or Enterprise
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/17885) in GitLab 18.10 as a [beta](../../../policy/development_stages_support.md#beta) feature with a [feature flag](../../../administration/feature_flags/_index.md) named `duo_secret_detection_false_positive`. [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/227074).
- [Generally available](https://gitlab.com/groups/gitlab-org/-/work_items/21233) in GitLab 19.1.
- Support in the triage and remediation profile [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/254011) in GitLab 19.4 [with a feature flag](../../../administration/feature_flags/_index.md) named `triage_and_remediation_profile`. Enabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag. For more information, see the history.

Secret false positive detection is an opt-in feature. When you enable it, GitLab Duo analyzes detected secrets to determine the likelihood that they're false positives. Detection is available for all secret types detected by [GitLab Secret Detection](../secret_detection/_index.md).

> [!important]
> When this feature is enabled, information about the vulnerability, including the code context surrounding the detected secret, is sent to large language models (LLMs) for analysis. The behavior described in the [secret detection and redaction](../../gitlab_duo/data_usage.md#secret-detection-and-redaction) documentation does not apply to this feature. Review your organization's data policies before enabling this feature.

The GitLab Duo assessment includes information about each false positive finding:

- Confidence score: A numerical score that indicates the likelihood that the finding is a false positive.
- Explanation: Reasons why the finding may or may not be a true positive, based on code context and secret characteristics.
- Visual indicator: A badge in the vulnerability report that shows the false positive assessment.

Once enabled, false positive detection runs automatically on new vulnerabilities without manual intervention.

Results are based on AI analysis and should be reviewed by security professionals. The feature requires GitLab Duo with an active subscription.

Security configuration profiles also support this flow. To turn on and configure the flow
across multiple projects and groups at once, use the
[automated triage and remediation profile](../configuration/security_configuration_profiles.md#automated-triage-and-remediation-profile).

## Automatic detection

False positive detection runs automatically in the following scenarios:

- A secret detection scan completes successfully on the default branch.
- The scan detects new vulnerabilities. Existing vulnerabilities are not analyzed again automatically.
- GitLab Duo features are enabled for the project.
- The vulnerability meets the severity threshold. Without a triage and remediation profile, only vulnerabilities with high or critical severity are analyzed. With a profile, the profile sets the severity threshold, run mode, and other criteria.

The analysis runs in the background and results appear in the vulnerability report after processing is complete.

### Tracked branches and tags

- Support for tracked branches [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/267156) in GitLab 19.6 [with a feature flag](../../../administration/feature_flags/_index.md) named `secrets_fp_detection_non_default_branches`. Disabled by default.
- Support for tracked tags [added](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/267164) in GitLab 19.6.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

False positive detection also runs automatically for secret detection vulnerabilities that are new on another
[tracked branch or tag](../vulnerability_report/_index.md#tracking-vulnerabilities-across-contexts).
The same severity rules apply as on the default branch.
This automatic run works when you turn on false positive detection in the project settings.
It also works with the
[automated triage and remediation profile](../configuration/security_configuration_profiles.md#automated-triage-and-remediation-profile),
when the profile is set to run automatically.

The secret detection CI/CD template doesn't run jobs in tag pipelines.
To detect false positives on a tracked tag, [override the analyzer jobs](../secret_detection/pipeline/configure.md#override-the-analyzer-jobs)
to run in tag pipelines.

## Manual trigger

You can manually run false positive detection for existing vulnerabilities:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Secure** > **Vulnerability report**.
1. Optional. To find a vulnerability in another tracked branch or tag, [filter by tracked ref](../vulnerability_report/_index.md#tracked-ref-filter).
1. Select the vulnerability you want to analyze.
1. In the upper-right corner, select **AI actions**, then select **Check for false positive**.

The GitLab Duo analysis runs and displays the results on the vulnerability details page.

## Configuration

To use false positive detection, you must have the following requirements:

- A GitLab Duo add-on subscription (GitLab Duo Core, Pro, or Enterprise).
- [GitLab Duo enabled](../../gitlab_duo/turn_on_off.md) in your project or group.
- [A default GitLab Duo namespace set](../../profile/preferences.md#set-a-default-gitlab-duo-namespace) in your user preferences.
- For automatic runs, [GitLab Duo experiment and beta features turned on](../../gitlab_duo/turn_on_off.md#turn-on-beta-and-experimental-features).
- GitLab 18.10 or later.

### Enable false positive detection

False positive detection is turned off by default and must be explicitly enabled. When enabled, information about the vulnerability, including surrounding code context, is sent to LLMs for analysis. To use this feature, you must enable the foundational flow for the group and turn on the feature for the project.

#### Allow foundational flow for a group

You can allow all projects in a group to use the foundational flow. Individual projects must still enable the feature in their project settings.
To allow false positive detection for all projects in a group:

1. In the top bar, select **Search or go to** and find your group.
1. Select **Settings** > **GitLab Duo**.
1. Under **Allow foundational flows**, select the **Secret Detection False Positive Detection** checkbox.
1. Select **Save changes**.

#### Turn on for a project

Prerequisites:

- The Maintainer or Owner role for the project.

To turn on false positive detection for a specific project:

1. In the top bar, select **Search or go to** and find your project.
1. Select **Settings** > **General**.
1. Expand **GitLab Duo**.
1. Turn on the **Turn on Secret Detection false positive detection** toggle.
1. Select **Save changes**.

When you allow false positive detection for the group and turn it on for the project, the feature works automatically with your existing secret detection scanners.

## Confidence scores

The confidence score estimates how likely the finding is to be a false positive. The vulnerability report badge shows one of the following labels:

-  (80% or higher): GitLab Duo is highly confident that the finding is a false positive.
-  (above 60% and below 80%): GitLab Duo has reasonable confidence that the finding may be a false positive but recommends manual review.
-  (60% or lower): GitLab Duo is not confident that the finding is a false positive. Manual review is strongly recommended before you dismiss the vulnerability.

## Dismissing false positives

When the GitLab Duo analysis identifies a vulnerability as a false positive, you have the following options:

- Dismiss the vulnerability
- Remove the false positive flag

### Dismiss the vulnerability

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Secure** > **Vulnerability report**.
1. Select the vulnerability you want to dismiss.
1. In the right sidebar, in the **Status** section, select **Edit**.
1. From the **Status** dropdown list, under **Dismiss as...**, select **False positive**.
1. In the **Comment** text box, provide context about why you're dismissing it as a false positive.
   A comment is required.
1. Select **Change status**.

The vulnerability is marked as dismissed and does not appear in future scans unless it is reintroduced.

### Remove the false positive flag

If you want to remove the false positive assessment and keep the vulnerability:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Secure** > **Vulnerability report**.
1. Select the vulnerability with the false positive flag.
1. In the **Risk** section, select **AI analysis**.
1. In the drawer, select **Remove false positive flag**.
1. In the confirmation dialog, select **Dismiss False Positive Flag**.

The false positive flag is removed and the FP confidence score reverts to 0. The vulnerability remains in the report. The flag is not re-evaluated automatically, because only new vulnerabilities are analyzed after a scan.

## Providing feedback

Share your feedback in [issue 592861](https://gitlab.com/gitlab-org/gitlab/-/work_items/592861).

## Related topics

- [Vulnerability details](_index.md)
- [Vulnerability report](../vulnerability_report/_index.md)
- [Secret detection](../secret_detection/_index.md)
- [GitLab Duo](../../gitlab_duo/_index.md)
