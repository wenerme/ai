# GitLab Duo Non-Agentic features

AI-native features and functionality.

- Tier: Premium, Ultimate
- Add-on: GitLab Duo Pro or Enterprise
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [GitLab Duo first introduced](https://about.gitlab.com/blog/gitlab-ai-assisted-features/) in GitLab 16.0.
- [Removed third-party AI setting](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/136144) in GitLab 16.6.
- [Removed support for OpenAI from all GitLab Duo features](https://gitlab.com/groups/gitlab-org/-/epics/10964) in GitLab 16.6.

The following features are generally available on GitLab.com, GitLab Self-Managed, and GitLab Dedicated.
They require a Premium or Ultimate subscription and one of the available add-ons.

The GitLab Duo with Amazon Q features are available as a separate add-on, and
are available on GitLab Self-Managed only.

| Feature | GitLab Duo Core | GitLab Duo Pro | GitLab Duo Enterprise | GitLab Duo with Amazon Q |
|---------|----------|---------|----------------|--------------------------|
| [Code Suggestions](../project/repository/code_suggestions/_index.md) | Yes | Yes | Yes | Yes |
| [GitLab Duo Non-Agentic Chat](../gitlab_duo_chat/_index.md) | No | Yes | Yes | Yes |
| [Code Explanation](../gitlab_duo_chat/examples.md#explain-selected-code) in IDEs | No | Yes | Yes | Yes |
| [Refactor Code](../gitlab_duo_chat/examples.md#refactor-code-in-the-ide) in IDEs | No | Yes | Yes | Yes |
| [Fix Code](../gitlab_duo_chat/examples.md#fix-code-in-the-ide) in IDEs | No | Yes | Yes | Yes |
| [Test Generation](../gitlab_duo_chat/examples.md#write-tests-in-the-ide) in IDEs | No | Yes | Yes | Yes |
| [Code Explanation](../project/repository/code_explain.md) in GitLab UI | No | Yes | Yes | Yes |
| [Discussion Summary](../discussions/_index.md#summarize-issue-discussions-with-gitlab-duo-chat) | No | No | Yes | Yes |
| [Code Review](code_review.md) <sup>1</sup> | No | No | Yes | Yes |
| [Root Cause Analysis](../gitlab_duo_chat/examples.md#troubleshoot-failed-cicd-jobs-with-root-cause-analysis) | No | No | Yes | Yes |
| [Vulnerability Explanation](../application_security/analyze/duo.md) | No | No | Yes | Yes |
| [Vulnerability Resolution](../application_security/remediate/duo.md) | No | No | Yes | Yes |
| [GitLab Duo and SDLC trends](../analytics/duo_and_sdlc_trends.md) | No | No | Yes | Yes |
| [Merge Commit Message Generation](../project/merge_requests/duo_in_merge_requests.md#generate-a-merge-commit-message) | No | No | Yes | Yes |

**Footnotes**:

1. Amazon Q supports a different version of this feature.
   [View how to use Amazon Q to review code](../duo_amazon_q/_index.md#review-a-merge-request).

## Beta and experimental features

The following features are not yet generally available.

They require a Premium or Ultimate subscription and the GitLab Duo Enterprise add-on.

| Feature | GitLab Duo Core | GitLab Duo Pro | GitLab Duo Enterprise | GitLab Duo with Amazon Q |
|---------|-----------------|----------------|-----------------------|--------------------------|
| [Merge Request Summary](../project/merge_requests/duo_in_merge_requests.md#generate-a-description-by-summarizing-code-changes) | No | No | Yes | No |
| [Code Review Summary](../project/merge_requests/duo_in_merge_requests.md#summarize-a-code-review) | No | No | Yes | No |
| [Issue Description Generation](../project/issues/managing_issues.md#populate-an-issue-with-issue-description-generation) | No | No | Yes | No |

## Features available in GitLab Duo Self-Hosted

Your organization can self-host your language models.

To learn which GitLab Duo features are available with GitLab Duo Self-Hosted,
see the
[supported features list](../../administration/gitlab_duo_self_hosted/_index.md#feature-versions-and-status).

## Amazon Q Developer Pro included with GitLab Duo With Amazon Q

License credits for [Amazon Q Developer Pro](https://aws.amazon.com/q/developer/) are included
with a subscription to GitLab Duo with Amazon Q.

This subscription includes access to agentic chat and command-line tools, including:

- [Amazon Q Developer in the IDE](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-IDE.html), including Visual Studio, VS Code, JetBrains, and Eclipse.
- [Amazon Q Developer on the command line](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.html).
- [Amazon Q Developer in the AWS Management Console](https://aws.amazon.com/q/developer/operate/).

For more information about the capabilities of Amazon Q Developer, see the [AWS website](https://aws.amazon.com/q/developer/).
