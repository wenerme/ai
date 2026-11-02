# GitLab Duo Agent Platform context

Understand what context GitLab Duo features can use, and exclude project content from that context.

GitLab Duo uses context to make decisions and offer suggestions.
Context can be available in these ways:

- Always
- Based on your location, so the context changes when you go to another page.
- When referenced explicitly, for example when you mention the information by URL, ID, or file path.

You can also [manage context exclusions](#manage-context-exclusions) to keep project content out of that context.

## Context available to GitLab Duo

- Page title and URL [added](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/209186) to Agentic Chat context in GitLab 18.6.

The following table shows when each type of context is available:

| Context | GitLab Duo Agentic Chat | Software development flow |
|---------|-------------------------|---------------------------|
| GitLab documentation | Always | Not available |
| General programming knowledge, best practices, and language specifics | Always | Always |
| Files in your project that Git tracks | Always | Always |
| Results from the [Search API](../../api/search.md) | Always | Always |
| Current page title and URL in the GitLab UI | Based on location | Not available |
| Files open in your IDE[^open] | Based on location | Based on location |
| Files, including images[^ide] (PNG, JPEG, WebP) | When referenced | When referenced |
| Images attached to issues and merge requests[^ide] | When referenced | When referenced |
| Epics, issues, and merge requests | When referenced | When referenced |
| Pipelines | When referenced, including job logs | When referenced, for the merge request pipeline status only |
| Commits | When referenced | Not available |
| Work items | When referenced | When referenced |
| Wiki pages | When referenced | Not available |

[^ide]: Images are available only in your IDE. For attached images, give the upload reference
    as it appears in the Markdown. For more information, see
    [image requirements](../project/merge_requests/developer.md#image-requirements).

[^open]: To stop GitLab Duo from using a file as context, close the file in your IDE.

Unlike GitLab Duo Non-Agentic Chat, Agentic Chat can search for referenced resources without exact IDs or URLs.
For example, you can ask "Find the merge request about authentication" and Agentic Chat searches for relevant merge requests.

Agentic Chat also looks up the context it needs from SDLC data, GitLab Orbit, MCP clients, and custom instructions.

## Manage context exclusions

- Tier: Premium, Ultimate

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/17124) in GitLab 18.2 [with a feature flag](../../administration/feature_flags/_index.md) named `use_duo_context_exclusion`. Disabled by default.
- Changed to beta in GitLab 18.4.
- Enabled by default in GitLab 18.5.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/issues/589801) in GitLab 18.10.

Use context exclusions to reduce the exposure of sensitive information, like password and configuration files.

Context exclusions apply to code suggestions and chat, where GitLab Duo controls which files are read.
When an agent runs, context exclusions are best-effort only. For more information, see
[context exclusion limitations](#context-exclusion-limitations).

Prerequisites:

- The Maintainer or Owner role for the project.

To specify content that GitLab Duo excludes:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **General**.
1. Under **GitLab Duo**, in the **GitLab Duo context exclusions** section, select **Manage exclusions**.
1. Specify which project files and directories are excluded from GitLab Duo context, and select **Save exclusions**.
1. Optional. To delete an existing exclusion, select **Delete** () for the appropriate exclusion.
1. Select **Save changes**.

The exclusions for a project can be up to 64 KiB in total.

## Context exclusion limitations

| Tool or environment | Limitation |
|---------------------|------------|
| Agent shell commands | Exclusions do not apply to shell commands. |
| `grep` tool | The tool might return content from excluded files. |
| Case-insensitive file systems, like the defaults on Windows and macOS | A path with different capitalization might not match an exclusion. |
| `get_merge_request` tool in the [GitLab MCP server](../model_context_protocol/mcp_server.md) | The tool might return commit diffs that include content from excluded files. The server does not check for exclusions when it fetches diffs. |
| `add_commit` tool in the GitLab MCP server | The `move` action does not apply the exclusion check to the source path. An agent with push access could move an excluded file to a non-excluded path and then read it. |

The GitLab MCP server limitations are tracked in
[issue 628141](https://gitlab.com/gitlab-org/gitlab/-/work_items/628141).
To protect sensitive information, review which tools and permissions you grant to MCP clients that access sensitive projects.

## Related topics

- [Customize GitLab Duo Agent Platform](customize/_index.md)
- [Model Context Protocol](../gitlab_duo/model_context_protocol/_index.md)
- [MCP clients](../gitlab_duo/model_context_protocol/mcp_clients.md)
- [GitLab Orbit](https://docs.gitlab.com/orbit/)
