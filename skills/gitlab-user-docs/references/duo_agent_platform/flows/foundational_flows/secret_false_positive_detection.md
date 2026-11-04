# Secret false positive detection

- Tier: Ultimate
- Add-on: GitLab Duo Core, Pro, or Enterprise
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/17885) in GitLab 18.10 as a [beta](../../../../policy/development_stages_support.md#beta) feature with a [feature flag](../../../../administration/feature_flags/_index.md) named `duo_secret_detection_false_positive`. [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/227074).
- [Generally available](../../../../policy/development_stages_support.md#generally-available) in GitLab 19.1.

Secret false positive detection automatically analyzes secret detection findings to identify potential false positives. Dismissing secrets that are likely not actual security risks reduces noise in your vulnerability report.

When a secret detection scan runs, GitLab Duo automatically analyzes new findings to determine the likelihood that they're false positives. Detection is available for all secret types detected by [GitLab Secret Detection](../../../application_security/secret_detection/_index.md).

The GitLab Duo assessment includes information about each false positive detection result:

- Confidence score: A numerical score indicating the likelihood that the finding is a false positive.
- Explanation: Reasons why the finding may or may not be a true positive.
- Visual indicator: A badge in the vulnerability report that shows the assessment result.

Results are based on AI analysis and should be reviewed by security professionals. This feature requires GitLab Duo with an active subscription.

> [!note]
> You can't trigger this flow by mentioning, assigning, or requesting a review from its service account. The flow runs automatically after security scans complete. To run it manually, on a vulnerability page, select **AI actions**, then select **Check for false positive**.

## Prerequisites

- Meet the [prerequisites for the GitLab Duo Agent Platform](../../_index.md#prerequisites).
- Turn on **Allow foundational flows** and **Secret Detection False Positive Detection** [for the top-level group](_index.md#turn-foundational-flows-on-or-off).
- For automatic runs, [GitLab Duo experiment and beta features turned on](../../../gitlab_duo/turn_on_off.md#turn-on-beta-and-experimental-features).
- Turn on the **Turn on Secret Detection false positive detection** toggle for the project. For more information, see [turn on for a project](../../../application_security/vulnerabilities/secret_false_positive_detection.md#turn-on-for-a-project).
- [Configure your own runners](../execution/_index.md#configure-runners-to-execute-flows) or turn on [GitLab-hosted runners](../../../../ci/runners/hosted_runners/_index.md) for your project.

## Running secret false positive detection

The flow runs automatically in the following scenarios:

- A secret detection scan completes successfully on the default branch.
- The scan detects new vulnerabilities. Existing vulnerabilities are not analyzed again automatically.
- GitLab Duo features are enabled for the project or group.
- The vulnerability meets the severity threshold. Without a triage and remediation profile, only vulnerabilities with high or critical severity are analyzed. With a profile, the profile sets the severity threshold, run mode, and other criteria.

You can also manually trigger analysis for existing vulnerabilities:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Secure** > **Vulnerability report**.
1. Select the vulnerability you want to analyze.
1. In the upper-right corner, select **AI actions**, then select **Check for false positive**.

## Related links

- [Secret detection false positive detection](../../../application_security/vulnerabilities/secret_false_positive_detection.md).
- [Vulnerability report](../../../application_security/vulnerability_report/_index.md).
- [Secret detection](../../../application_security/secret_detection/_index.md).
