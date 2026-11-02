# GitLab Duo contextual awareness

Learn what information GitLab Duo can access to provide suggestions, and how to exclude sensitive content from Code Review context.

Different information is available to help GitLab Duo make decisions and offer suggestions.

Information can be available:

- Always.
- Based on your location (the context changes when you navigate).
- When referenced explicitly. For example, you mention the information by URL, ID, or file path.

## Always available

- GitLab documentation.
- General programming knowledge, best practices, and language specifics.
- Content in the file you're viewing or editing, including code before and after your cursor.
- When using Chat in the GitLab UI, the current page title and URL.
- The `/refactor`, `/fix`, `/tests`, and `/explain` slash commands have access to the latest
  Repository X-Ray report from Code Suggestions.

## Based on location

When you have any of these resources open, GitLab Duo knows about them:

- Files you've told Chat about, by either:
  - Providing a direct file path.
  - In your IDE, including with the `/include` command.
- Code selected in a file.
- Issues (GitLab Duo Enterprise only).
- Epics (GitLab Duo Enterprise only).
- [Other work item types](../work_items/_index.md#work-item-types) (GitLab Duo Enterprise only).

> [!note]
> In the IDEs, secrets and sensitive values that match known formats are redacted before
> they are sent to GitLab Duo Chat.

In the UI, when you're in a merge request, GitLab Duo also knows about:

- The merge request itself (GitLab Duo Enterprise only).
- Commits in the merge request (GitLab Duo Enterprise only).
- The merge request pipeline's CI/CD jobs (GitLab Duo Enterprise only).

### When referenced explicitly

All of the resources that are available based on your location
are also available when you refer to them explicitly by their ID or URL.

## Exclude context from Code Review

- Tier: Premium, Ultimate
- Add-on: GitLab Duo Pro or Enterprise

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/17124) in GitLab 18.2 [with a feature flag](../../administration/feature_flags/_index.md) named `use_duo_context_exclusion`. Disabled by default.
- Changed to beta in GitLab 18.4.
- Enabled by default in GitLab 18.5.

You can exclude project content from the context that Code Review uses.
For more information, see [manage context exclusions](../duo_agent_platform/context.md#manage-context-exclusions).
