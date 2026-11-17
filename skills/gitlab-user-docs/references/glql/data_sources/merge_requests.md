# Merge requests

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/491246) in GitLab 17.8.

## Allowed modes

- Standard mode (default): Query merge request records.
- Analytics mode: Query aggregated merge request metrics. For more information, see [Merge request analytics](merge_request_analytics.md).

## Allowed scopes

| Scope     | Description                                           |
| --------- | ----------------------------------------------------- |
| `project` | Query merge requests in a specific project.           |
| `group`   | Query merge requests across all projects in a group, including subgroups. |

For more information, see [scopes](_index.md#scopes).

## Query filters

Use these fields in the `query` parameter to filter your results.

| Field                                                    | Name (and alias)                             | Operators                  |
| -------------------------------------------------------- | -------------------------------------------- | -------------------------- |
| [Approved by user](#approved-by-user)                 | `approver`, `approvedBy`, `approvers`        | `=`, `!=`                  |
| [Assignees](#assignees)                               | `assignee`, `assignees`                      | `=`, `!=`                  |
| [Author](#author)                                     | `author`                                     | `=`, `!=`                  |
| [Closed at](#closed-at)                               | `closed`, `closedAt`                         | `=`, `>`, `<`, `>=`, `<=`  |
| [Created at](#created-at)                             | `created`, `createdAt`, `opened`, `openedAt` | `=`, `>`, `<`, `>=`, `<=`  |
| [Draft](#draft)                                       | `draft`                                      | `=`, `!=`                  |
| [Environment](#environment)                           | `environment`                                | `=`                        |
| [ID](#id)                                     | `id`                                         | `=`, `in`                  |
| [Include subgroups](#include-subgroups)               | `includeSubgroups`                            | `=`, `!=`                  |
| [Labels](#labels)                                     | `label`, `labels`                            | `=`, `!=`                  |
| [Merged at](#merged-at)                               | `merged`, `mergedAt`                         | `=`, `>`, `<`, `>=`, `<=`  |
| [Merged by user](#merged-by-user)                     | `merger`, `mergedBy`                         | `=`                        |
| [Milestone](#milestone)                               | `milestone`                                  | `=`, `!=`                  |
| [My reaction emoji](#my-reaction-emoji)               | `myReaction`, `myReactionEmoji`              | `=`, `!=`                  |
| [Review state](#review-state)                         | `reviewState`, `reviewStates`                | `=`, `!=`, `in`            |
| [Reviewers](#reviewers)                               | `reviewer`, `reviewers`, `reviewedBy`        | `=`, `!=`                  |
| [Search](#search)                                     | `search`                                     | `=`                        |
| [Source branch](#source-branch)                       | `sourceBranch`                               | `=`, `in`, `!=`            |
| [State](#state)                                       | `state`                                      | `=`                        |
| [Subscribed](#subscribed)                             | `subscribed`                                 | `=`, `!=`                  |
| [Target branch](#target-branch)                       | `targetBranch`                               | `=`, `in`, `!=`            |
| [Deployed at](#deployed-at)                           | `deployed`, `deployedAt`                     | `=`, `>`, `<`, `>=`, `<=`  |
| [Updated at](#updated-at)                             | `updated`, `updatedAt`                       | `=`, `>`, `<`, `>=`, `<=`  |

### Approved by user

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/491246) in GitLab 17.8.
- Aliases `approvedBy` and `approvers` [introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/137) in GitLab 18.0.
- Support for `Nullable` values [introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/221) in GitLab 18.3.

**Description**: Query merge requests by one or more users who approved the merge request.

**Allowed value types**:

- `String`
- `User` (for example, `@username`)
- `List` (containing `String` or `User` values)
- `Nullable` (either of `null`, `none`, or `any`)

### Assignees

**Description**: Query merge requests by one or more users who are assigned to them.

**Allowed value types**:

- `String`
- `User` (for example, `@username`)
- `Nullable` (either of `null`, `none`, or `any`)

**Additional details**:

- `List` values and the `in` operator are not supported for merge requests.

### Author

**Description**: Query merge requests by their author.

**Allowed value types**:

- `String`
- `User` (for example, `@username`)

**Additional details**:

- The `in` operator is not supported for merge requests.

### Closed at

**Description**: Query merge requests by the date when they were closed.

**Allowed value types**:

- `AbsoluteDate` (in the format `YYYY-MM-DD`)
- `RelativeDate` (in the format `<sign><digit><unit>`, where sign is `+`, `-`, or omitted,
  digit is an integer, and `unit` is one of `d` (days), `w` (weeks), `m` (months) or `y` (years))

**Additional details**:

- For the `=` operator, the time range is considered from 00:00 to 23:59 in the user's time zone.

### Created at

**Description**: Query merge requests by the date when they were created.

**Allowed value types**:

- `AbsoluteDate` (in the format `YYYY-MM-DD`)
- `RelativeDate` (in the format `<sign><digit><unit>`, where sign is `+`, `-`, or omitted,
  digit is an integer, and `unit` is one of `d` (days), `w` (weeks), `m` (months) or `y` (years))

**Additional details**:

- For the `=` operator, the time range is considered from 00:00 to 23:59 in the user's time zone.

### Draft

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/491246) in GitLab 17.8.

**Description**: Query merge requests by their draft status.

**Allowed value types**:

- `Boolean` (either of `true` or `false`)

### Deployed at

**Description**: Query merge requests by the date when they were deployed.

**Allowed value types**:

- `AbsoluteDate` (in the format `YYYY-MM-DD`)
- `RelativeDate` (in the format `<sign><digit><unit>`, where sign is `+`, `-`, or omitted,
  digit is an integer, and `unit` is one of `d` (days), `w` (weeks), `m` (months) or `y` (years))

**Additional details**:

- For the `=` operator, the time range is considered from 00:00 to 23:59 in the user's time zone.

### Environment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/491246) in GitLab 17.8.

**Description**: Query merge requests by the environment to which they have been deployed.

**Allowed value types**: `String`

### ID

**Description**: Query merge requests by their IDs.

**Allowed value types**:

- `Number` (only positive integers)
- `List` (containing `Number` values)

### Include subgroups

**Description**: Query merge requests in the entire hierarchy of a group.

**Allowed value types**:

- `Boolean` (either of `true` or `false`)

**Additional details**:

- This field can only be used with a `group` scope.
- The value of this field defaults to `false`.

### Labels

**Description**: Query merge requests by their associated labels.

**Allowed value types**:

- `String`
- `Label` (for example, `~bug`, `~"team::planning"`)
- `Nullable` (either of `none`, or `any`)

**Additional details**:

- The `in` operator is not supported for merge requests.
- Scoped labels or labels containing spaces must be wrapped in quotes.

### Merged at

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/491246) in GitLab 17.8.
- Alias `mergedAt` [introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/137) in GitLab 18.0.
- Operators `>=` and `<=` [introduced](https://gitlab.com/gitlab-org/gitlab-query-language/glql-rust/-/work_items/58) in GitLab 18.0.

**Description**: Query merge requests by the date when they were merged.

**Allowed value types**:

- `AbsoluteDate` (in the format `YYYY-MM-DD`)
- `RelativeDate` (in the format `<sign><digit><unit>`, where sign is `+`, `-`, or omitted,
  digit is an integer, and `unit` is one of `d` (days), `w` (weeks), `m` (months) or `y` (years))

**Additional details**:

- For the `=` operator, the time range is considered from 00:00 to 23:59 in the user's time zone.

### Merged by user

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/491246) in GitLab 17.8.
- Alias `mergedBy` [introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/137) in GitLab 18.0.

**Description**: Query merge requests by the user that merged the merge request.

**Allowed value types**:

- `String`
- `User` (for example, `@username`)

### Milestone

**Description**: Query merge requests by their associated milestone.

**Allowed value types**:

- `String`
- `Milestone` (for example, `%Backlog`, `%"Awaiting Further Demand"`)
- `Nullable` (either of `none`, or `any`)

**Additional details**:

- The `in` operator is not supported for merge requests.
- Milestones containing spaces must be wrapped in quotes (`"`).

### My reaction emoji

**Description**: Query merge requests by the current user's [emoji reaction](../../emoji_reactions.md) on it.

**Allowed value types**: `String`

### Review state

- [Introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/508) in GitLab 19.5.

**Description**: Query merge requests by the review state of their reviewers.
For more information about review states, see [Merge request reviews](../../project/merge_requests/reviews/_index.md).

**Allowed value types**:

- `Enum`, one of `unreviewed`, `review_started`, `reviewed`, `requested_changes`, `approved`, or `unapproved`
- `List` (containing `Enum` values)

**Additional details**:

- `List` values are only supported with the `in` and `!=` operators.
- A merge request matches when at least one of its reviewers is in the given state,
  not when every reviewer is.
- When combined with `reviewer = @username`, `=` and `in` apply to that reviewer only.
  `!=` applies to all reviewers: `reviewer = @username and reviewState != approved`
  returns merge requests where the user is a reviewer and no reviewer has approved.
- Merge requests without reviewers never match, so `reviewState` cannot be combined
  with `reviewer = any` or `reviewer = none`.
- To exclude more than one state, use a `List`: `reviewState != (approved, unapproved)`.

### Reviewers

- Aliases `reviewers` and `reviewedBy` [introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/137) in GitLab 18.0.

**Description**: Query merge requests that were reviewed by one or more users.

**Allowed value types**:

- `String`
- `User` (for example, `@username`)
- `Nullable` (either of `null`, `none`, or `any`)

### Search

- [Introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/547) in GitLab 19.6.

**Description**: Query merge requests by text in their title or description.

**Allowed value types**: `String`

**Additional details**:

- Queries that use `search` count toward the [search rate limit](../../../administration/instance_limits.md#search-rate-limit).

### Source branch

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/197407) in GitLab 18.2.

**Description:** Query merge requests by their source branch.

**Allowed value types:** `String`, `List`

**Additional details**:

- `List` values are only supported with the `in` and `!=` operators.

### State

**Description**: Query merge requests by state.

**Allowed value types**:

- `Enum`, one of `opened`, `closed`, `merged`, or `all`

**Additional details**:

- The `state` field does not support the `!=` operator.

### Subscribed

**Description**: Query merge requests by whether the current user has
[set notifications](../../profile/notifications.md) on or off.

**Allowed value types**: `Boolean`

### Target branch

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/197407) in GitLab 18.2.

**Description:** Query merge requests by their target branch.

**Allowed value types:** `String`, `List`

**Additional details**:

- `List` values are only supported with the `in` and `!=` operators.

### Updated at

**Description**: Query merge requests by when they were last updated.

**Allowed value types**:

- `AbsoluteDate` (in the format `YYYY-MM-DD`)
- `RelativeDate` (in the format `<sign><digit><unit>`, where sign is `+`, `-`, or omitted,
  digit is an integer, and `unit` is one of `d` (days), `w` (weeks), `m` (months) or `y` (years))

**Additional details**:

- For the `=` operator, the time range is considered from 00:00 to 23:59 in the user's time zone.

## Display fields

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/491246) in GitLab 17.8.
- Fields `sourceBranch`, `targetBranch`, `sourceProject`, and `targetProject` [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/197407) in GitLab 18.2.

| Field            | Name or alias                         | Description |
| ---------------- | ------------------------------------- | ----------- |
| Approved         | `approved`                            | Display `Yes` or `No` indicating whether the merge request has been approved |
| Approved by user | `approver`, `approvers`, `approvedBy` | Display users who approved the merge request |
| Assignees        | `assignee`, `assignees`               | Display users assigned to the merge request |
| Author           | `author`                              | Display the author of the merge request |
| Closed at        | `closed`, `closedAt`                  | Display time since the merge request was closed |
| Created at       | `created`, `createdAt`                | Display time since the merge request was created |
| Description      | `description`                         | Display the description of the merge request |
| Draft            | `draft`                               | Display `Yes` or `No` indicating whether the merge request is in draft state |
| ID               | `id`                                  | Display the ID of the merge request |
| Labels           | `label`, `labels`                     | Display labels associated with the merge request |
| Last comment     | `lastComment`                         | Display the last comment made on the merge request |
| Merged at        | `merged`, `mergedAt`                  | Display time since the merge request was merged |
| Merged by user   | `merger`, `mergedBy`                  | Display the user who merged the merge request |
| Milestone        | `milestone`                           | Display the milestone associated with the merge request |
| Project          | `project`                             | Display the project the merge request belongs to |
| Reviewers        | `reviewer`, `reviewers`               | Display users assigned to review the merge request |
| Source branch    | `sourceBranch`                        | Display the source branch of the merge request |
| Source project   | `sourceProject`                       | Display the source project of the merge request |
| State            | `state`                               | Display a badge indicating the state. Values are `Open`, `Closed`, or `Merged` |
| Subscribed       | `subscribed`                          | Display `Yes` or `No` indicating whether the current user is subscribed |
| Target branch    | `targetBranch`                        | Display the target branch of the merge request |
| Target project   | `targetProject`                       | Display the target project of the merge request |
| Time estimate    | `timeEstimate`                        | Display the estimated time for the merge request |
| Title            | `title`                               | Display the title of the merge request |
| Total time spent | `totalTimeSpent`                      | Display the total time spent on the merge request |
| Updated at       | `updated`, `updatedAt`                | Display time since the merge request was last updated |

## Sort fields

| Field         | Name (and alias)       | Description                                     |
|---------------|------------------------|-------------------------------------------------|
| Closed at     | `closed`, `closedAt`   | Sort by closed date                             |
| Created       | `created`, `createdAt` | Sort by created date                            |
| Merged at     | `merged`, `mergedAt`   | Sort by merge date                              |
| Milestone     | `milestone`            | Sort by milestone due date                      |
| Popularity    | `popularity`           | Sort by the number of thumbs up emoji reactions |
| Title         | `title`                | Sort by title                                   |
| Updated at    | `updated`, `updatedAt` | Sort by last updated date                       |

## Examples

- List open merge requests in the `gitlab-org/gitlab` project that are waiting for a first review:

  ````yaml
  ```glql
  display: table
  fields: title, author, reviewer, updated
  sort: updated asc
  query: project = "gitlab-org/gitlab" and type = MergeRequest and state = opened and draft = false and reviewState = unreviewed
  limit: 10
  ```
  ````

- List all merge requests in the `gitlab-org` group created by me sorted by the merge date (latest first):

  ````yaml
  ```glql
  display: table
  fields: title, reviewer, merged
  sort: merged desc
  query: group = "gitlab-org" and type = MergeRequest and state = merged and author = currentUser()
  limit: 10
  ```
  ````
