# Advanced search

Use advanced search to find code, commits, work items, and merge requests across your entire GitLab instance.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Use advanced search to find exactly what you need across your entire GitLab instance.

With advanced search:

- Identify code patterns across all projects to refactor shared components more efficiently.
- Locate security vulnerabilities across your entire organization's codebase and dependencies.
- Track usage of deprecated functions or libraries throughout all repositories.
- Find discussions buried in issues, merge requests, or comments.
- Discover existing solutions instead of reinventing functionality that already exists.

Advanced search works in:

- Code
- Comments
- Commits
- Groups
- Work items
- Merge requests
- Milestones
- Projects
- Users
- Wikis

## Use advanced search

Prerequisites:

- Advanced search must be enabled:
  - For GitLab.com and GitLab Dedicated, advanced search is
    enabled by default in paid subscriptions.
  - For GitLab Self-Managed, an administrator must
    [enable advanced search](../../integration/advanced_search/elasticsearch.md#enable-advanced-search).

To use advanced search:

1. In the top bar, select **Search or go to**.
1. In the search box, enter your search term.

You can also use advanced search in a project or group.

## Available scopes

- Searching comments on issues [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/513146) in GitLab 18.0 [with a feature flag](../../administration/feature_flags/_index.md) named `search_work_item_queries_notes`. Disabled by default.
- Searching comments on issues [enabled on GitLab.com](https://gitlab.com/gitlab-org/gitlab/-/issues/536912) in GitLab 18.1.
- Searching comments on issues [generally available](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/191369) in GitLab 18.6. Feature flag `search_work_item_queries_notes` removed.
- Searching comments on merge requests [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/572590) in GitLab 18.6 [with a feature flag](../../administration/feature_flags/_index.md) named `search_merge_request_queries_notes`. Disabled by default.
- Searching comments on merge requests [generally available](https://gitlab.com/gitlab-org/gitlab/-/issues/573750) in GitLab 18.7. Feature flag `search_merge_request_queries_notes` removed.
- Groups scope [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/249760) in GitLab 19.4 [with a feature flag](../../administration/feature_flags/_index.md) named `elasticsearch_group_search`. Disabled by default.
- Groups scope [generally available](https://gitlab.com/gitlab-org/gitlab/-/issues/607018) in GitLab 19.5. Feature flag `elasticsearch_group_search` removed.
- Group milestones in milestone results [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/260603) in GitLab 19.6 [with a feature flag](../../administration/feature_flags/_index.md) named `advanced_search_group_milestones`. Disabled by default.

> [!flag]
> The availability of group milestones in milestone results is controlled by a feature flag.
> For more information, see the history.

Scopes describe the type of data you're searching.
The following scopes are available for advanced search:

| Scope                       | Global[^disable-global-search-scopes], [^global-search-saas] | Group       | Project     |
|-----------------------------|----------------------------------|-------------|-------------|
| Code                        | Yes                      | Yes | Yes |
| Comments                    | Yes                      | Yes | Yes |
| Commits                     | Yes                      | Yes | Yes |
| Groups[^group-search-returns]         | Yes                      | Yes | No  |
| Work items[^search-work-items]     | Yes                      | Yes | Yes |
| Merge requests[^search-work-items] | Yes                      | Yes | Yes |
| Milestones[^advanced-search-returns]     | Yes                      | Yes | Yes |
| Projects                    | Yes                      | Yes | No  |
| Users                       | Yes                      | Yes | Yes |
| Wikis                       | Yes                      | Yes | Yes |

[^disable-global-search-scopes]: An administrator can [disable global search scopes](_index.md#disable-global-search-scopes).
    On GitLab Self-Managed, global search is not available when limited indexing is enabled by default.
    An administrator can [enable global search for limited indexing](../../integration/advanced_search/elasticsearch.md#indexed-namespaces).
[^global-search-saas]: On GitLab.com, global search is not enabled for code, commits, and wikis.
[^search-work-items]: When you search work items and merge requests, results
    include comments that match your search term.
[^advanced-search-returns]: When the `advanced_search_group_milestones` feature flag is enabled,
    advanced search also returns group milestones that you can view.
    Global search returns group milestones from all groups you can view, and project milestones.
    Group search returns milestones of the group, its parent groups, and its subgroups,
    and milestones of projects in the group and its subgroups.
    Project search returns milestones of the project, its group, and the parent groups of that group.
    When the feature flag is disabled, advanced search returns only project milestones.
    Group milestones created before indexing was available appear after a
    [backfill](https://gitlab.com/gitlab-org/gitlab/-/work_items/630857) runs.
[^group-search-returns]: Group search returns the subgroups of the group you're searching in, not the group itself.
    The `backfill_groups_to_elasticsearch` advanced search migration must be complete before
    this scope returns results.

## Filter merge request search results

- Filtering by assignee, creation date, and update date [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/254033) in GitLab 19.6.

When you search merge requests, you can filter the results with URL parameters.
For example, to return only merge requests that are assigned to the users with IDs `5` and `7`:

```plaintext
https://gitlab.example.com/search?scope=merge_requests&search=cache&assignee_ids[]=5&assignee_ids[]=7
```

The following parameters are available:

| Parameter         | Description |
|-------------------|-------------|
| `assignee_ids[]`  | Filter by assignee ID. When you specify more than one ID, only merge requests assigned to all of those users are returned. You can specify a maximum of 20 IDs. |
| `author_username` | Filter by the username of the merge request author. |
| `created_after`   | Filter by merge requests created on or after the given date and time. |
| `created_before`  | Filter by merge requests created on or before the given date and time. |
| `source_branch`   | Filter by source branch name. |
| `target_branch`   | Filter by target branch name. |
| `updated_after`   | Filter by merge requests updated on or after the given date and time. |
| `updated_before`  | Filter by merge requests updated on or before the given date and time. |

Dates must be one of these formats:

- A date only, for example `2026-01-31`. A date-only value is treated as the
  start of that day (`00:00`), so `created_before=2026-01-31` excludes merge
  requests created later that same day.
- A full ISO 8601 datetime with seconds, for example `2026-01-31T09:00:00Z`.

When advanced search is not available, only `created_after` and `created_before`
are applied. The other parameters are ignored.

To exclude results instead, use the `not[]` form of a parameter.
The following parameters support exclusion: `assignee_ids`, `author_username`,
`source_branch`, and `target_branch`.
For example, to return merge requests that are not authored by `alice`:

```plaintext
https://gitlab.example.com/search?scope=merge_requests&search=cache&not[author_username]=alice
```

## Syntax

Advanced search uses [`simple_query_string`](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-simple-query-string-query),
which supports both exact and fuzzy queries.

When you search for a user, the [`fuzzy`](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query) query is used by default.
You can refine user search with `simple_query_string`.

| Syntax | Description      | Example |
|--------|------------------|---------|
| `"`    | Exact search     | `"gem sidekiq"` |
| `~`    | Fuzzy search     | `J~ Doe` |
| `\|`   | Or               | `display \| banner` |
| `+`    | And              | `display +banner` |
| `-`    | Exclude          | `display -banner` |
| `*`    | Partial          | `bug error 50*` |
| ` \ `  | Escape           | `\*md`  |
| `#`    | Issue ID         | `#23456` |
| `!`    | Merge request ID | `!23456` |

### Code search

| Syntax       | Description                                     | Example |
|--------------|-------------------------------------------------|---------|
| `filename:`  | Filename                                        | `filename:*spec.rb` |
| `path:`      | Repository location (full or partial matches)   | `path:spec/workers/` |
| `extension:` | File extension without `.` (exact matches only) | `extension:js` |
| `blob:`      | Git object ID (exact matches only)              | `blob:998707*` |

### Examples

| Query                                 | Description |
|---------------------------------------|-------------|
| `rails -filename:gemfile.lock`        | Returns `rails` in all files except the `gemfile.lock` file. |
| `RSpec.describe Resolvers -*builder`  | Returns `RSpec.describe Resolvers` that does not start with `builder`. |
| `bug \| (display +banner)`            | Returns `bug` or both `display` and `banner`. |
| `helper -extension:yml -extension:js` | Returns `helper` in all files except files with a `.yml` or `.js` extension. |
| `helper path:lib/git`                 | Returns `helper` in all files with a `lib/git*` path (for example, `spec/lib/gitlab`). |

## Known issues

- You can search only files smaller than 1 MB.
  For GitLab Self-Managed, an administrator can set a limit on the
  [maximum file size indexed](../../administration/instance_limits.md#maximum-file-size-indexed).
- You can use advanced search only on the default branch of a project.
  For more information, see [issue 229966](https://gitlab.com/gitlab-org/gitlab/-/issues/229966).
- The search query must not contain any of the following characters:

  ```plaintext
  . , : ; / ` ' = ? $ & ^ | < > ( ) { } [ ] @
  ```

- Search results show only the first match in a file.

## Related topics

- [Locate security vulnerabilities](../application_security/vulnerability_report/_index.md#advanced-vulnerability-management)
