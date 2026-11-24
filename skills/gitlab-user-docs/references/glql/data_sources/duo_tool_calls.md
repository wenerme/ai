# Duo tool calls

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated
- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/glql/-/merge_requests/572) in GitLab 19.7 as an [experiment](../../../policy/development_stages_support.md#experiment).

This data source provides aggregated metrics about the tools that GitLab Duo Chat calls
across your project or group, such as how often each tool is called and how often it succeeds.

## Allowed modes

- [`analytics`](../_index.md#analytics-mode)

## Allowed scopes

| Scope     | Description |
|-----------|-------------|
| `project` | Query GitLab Duo Chat tool calls in a specific project. |
| `group`   | Query GitLab Duo Chat tool calls across all projects in a group, including subgroups. |
| `organization` | Query GitLab Duo Chat tool calls across an [organization](_index.md#organization). |

To aggregate tool calls across [multiple groups and projects](_index.md#multiple-groups-and-projects), use a list with the `in` operator.

## Query filters

Use these fields in the `query` parameter to filter your results.

| Field                       | Name         | Operators                 |
| --------------------------- | ------------ | ------------------------- |
| [Event](#event)             | `event`      | `=`, `in`                 |
| [Flow type](#flow-type)     | `flowType`   | `=`, `!=`, `in`, `not in` |
| [Timestamp](#timestamp)     | `timestamp`  | `=`, `>`, `<`, `>=`, `<=` |
| [Tool access](#tool-access) | `toolAccess` | `=`, `!=`, `in`, `not in` |
| [Tool name](#tool-name)     | `toolName`   | `=`, `!=`, `in`, `not in` |
| [User](#user)               | `user`       | `=`, `!=`, `in`, `not in` |

### Event

**Description**: Filter tool calls by their outcome.

**Allowed value types**:

- `Enum`, one of `tool_succeeded_duo_chat` or `tool_failed_duo_chat`
- `List` (use `in` operator for multiple values)

**Additional details**:

- Only two events exist, so use `event = tool_failed_duo_chat` instead of excluding the other one.

### Flow type

**Description**: Filter tool calls by the type of GitLab Duo Agent Platform flow they ran in.

**Allowed value types**:

- `String`
- `List` (use `in` or `not in` operator for multiple values)

**Additional details**:

- `!=` and `not in` return only tool calls that recorded a flow type. Calls without one are left out.

### Timestamp

**Description**: Filter tool calls by the date they were made.
Use multiple `timestamp` conditions to define a specified time period.

**Allowed value types**:

- `AbsoluteDate` (in the format `YYYY-MM-DD`)
- `RelativeDate` (in the format `<sign><digit><unit>`, where sign is `+`, `-`, or omitted,
  digit is an integer, and `unit` is one of `d` (days), `w` (weeks), `m` (months), or `y` (years))

**Additional details**:

- For the `=` operator, GLQL considers the time range from 00:00 to 23:59 in the user's time zone.

### Tool access

**Description**: Filter tool calls by whether the tool reads or writes data.

**Allowed value types**:

- `Enum`, one of `read` or `write`
- `List` (use `in` or `not in` operator for multiple values)

**Additional details**:

- Tools outside the built-in tool catalog, such as tools from MCP servers, have no access type.
  `!=` and `not in` leave them out as well.

### Tool name

**Description**: Filter tool calls by the name of the tool that was called.

**Allowed value types**:

- `String`
- `List` (use `in` or `not in` operator for multiple values)

**Additional details**:

- `!=` and `not in` return only tool calls that recorded a tool name. Calls without one are left out.

### User

**Description**: Filter tool calls by the user who ran the chat.

**Allowed value types**:

- `Number` (a user ID)
- `List` (use `in` or `not in` operator for multiple values)

**Additional details**:

- Analytics mode takes numeric user IDs, not usernames.

## Dimensions

| Dimension   | Name         | Description |
| ----------- | ------------ | ----------- |
| Event       | `event`      | Group by tool call outcome. |
| Flow type   | `flowType`   | Group by GitLab Duo Agent Platform flow type. |
| Group       | `group`      | Group by group. Accepts a `depth` parameter counted from the top-level group, from `1` to `99` (default: `1`), so `group` returns top-level groups and `group(depth=2)` their subgroups. Calls above that depth, or in a project at that depth rather than in a subgroup, have no group, and the result can contain more than one row with no group. |
| Timestamp   | `timestamp`  | Group by date. Accepts a [`granularity` parameter](../_index.md#field-parameters) of `daily`, `weekly`, `monthly`, or a number of days such as `30d` (default: `weekly`), and an optional `origin`. For example, `timestamp(daily)` or `timestamp(granularity=30d, origin=2026-07-16)`. |
| Tool access | `toolAccess` | Group by whether the tool reads or writes data. Tools outside the built-in tool catalog have no value. |
| Tool name   | `toolName`   | Group by tool name. |
| User        | `user`       | Group by user (displays avatar, name, and username). |

## Metrics

| Metric                   | Name                    | Description |
| ------------------------ | ----------------------- | ----------- |
| Read-only sessions count | `readOnlySessionsCount` | Number of unique chat sessions that called only read tools. Computed from the calls that match your filters, so a `toolName`, `toolAccess`, or `event` filter changes which sessions qualify. Sessions that called a tool outside the built-in tool catalog are not counted. |
| Sessions count           | `sessionsCount`         | Number of unique chat sessions with at least one matching tool call, whether or not the session has finished. |
| Success rate             | `successRate`           | Ratio of successful to total tool calls. |
| Total count              | `totalCount`            | Total number of tool calls. |
| Users count              | `usersCount`            | Number of unique users. |
| Write sessions count     | `writeSessionsCount`    | Number of unique chat sessions with at least one matching write tool call. |

## Sort fields

Sort by any field included in your selected dimensions or metrics. For more
information, see [analytics mode sorting](../_index.md#sorting).

## Examples

- Most called tools for the last 30 days:

  ````yaml
  ```glql
  title: "Most called Duo Chat tools (last 30 days)"
  display: table
  mode: analytics
  query: type = DuoToolCall and group = "gitlab-org" and timestamp > -30d
  dimensions: toolName as "Tool"
  metrics: totalCount as "Calls", successRate as "Success rate", usersCount as "Users"
  sort: totalCount desc
  ```
  ````

- Weekly tool call trend, split by read and write tools:

  ````yaml
  ```glql
  title: "Duo Chat tool calls by access type"
  display: columnChart
  mode: analytics
  query: type = DuoToolCall and group = "gitlab-org" and timestamp > -90d
  dimensions: timestamp(weekly) as "Week", toolAccess as "Access"
  metrics: totalCount as "Calls"
  sort: timestamp asc
  ```
  ````

- Chat sessions that wrote data compared with read-only sessions:

  ````yaml
  ```glql
  title: "Duo Chat sessions by access (last 30 days)"
  display: table
  mode: analytics
  query: type = DuoToolCall and group = "gitlab-org" and timestamp > -30d
  metrics: sessionsCount as "Sessions", writeSessionsCount as "With write calls", readOnlySessionsCount as "Read-only"
  ```
  ````

- Most called tools across an organization:

  ````yaml
  ```glql
  title: "Most called Duo Chat tools across an organization (last 30 days)"
  display: table
  mode: analytics
  query: type = DuoToolCall and organization = "gid://gitlab/Organizations::Organization/1" and timestamp > -30d
  dimensions: toolName as "Tool"
  metrics: totalCount as "Calls", successRate as "Success rate", usersCount as "Users"
  sort: totalCount desc
  ```
  ````
