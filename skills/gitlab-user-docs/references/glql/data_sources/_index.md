# GLQL data sources

GLQL can query the following data sources:

| Data source | Standard mode | [Analytics mode](../_index.md#analytics-mode) | `type` values | Description |
|---|---|---|---|---|
| Work items | Yes | No | `Issue`, `Incident`, `TestCase`, `Requirement`, `Task`, `Ticket`, `Objective`, `KeyResult`, `Epic` | Issues, epics, and other work item types. Default when `type` is omitted. |
| Merge requests | Yes | Yes | `MergeRequest` | Code review and merge workflow. |
| Pipelines | Yes | Yes | `Pipeline` | CI/CD pipelines. |
| Jobs | Yes | No | `Job` | CI/CD jobs within pipelines. |
| Projects | Yes | No | `Project` | Projects within a namespace. |
| AI usage events | No | Yes | `AiUsageEvent` | Aggregated GitLab Duo usage event analytics. |
| Code suggestions | No | Yes | `CodeSuggestion` | Aggregated GitLab Duo Code Suggestions analytics. |
| Contributions | No | Yes | `Contribution` | Aggregated contribution activity analytics. |

Each data source has its own set of supported fields for filtering, display, and sorting.

Specify the data source in your query by using the `type` field.
For example, `type = Issue` or `type = MergeRequest`.
For data sources that support multiple types, use the `in` operator to query across types.
For example, `type in (Issue, Task)`.

## Scopes

Each data source requires a scope to define where to query data from.
The allowed scopes vary by data source and are documented on each data source page.

Define the scope in your query. For example:

```yaml
query: type = issue and project = "gitlab-org/gitlab"
```

If you don't specify a scope, GLQL infers it from where the query is embedded:

- In a project context (such as an issue or merge request description), GLQL uses the current project.
- In a group context (such as an epic description), GLQL uses the current group.
