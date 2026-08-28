> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Containers

> How sandbox containers work for the shell and bash server tools

export const Template = ({children, data}) => {
  const replace = s => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in data) ? data[k] : `{{${k}}}`);
  const leafText = node => typeof node === 'string' ? node : node?.$$typeof && typeof node.props?.children === 'string' ? node.props.children : null;
  const collapseTokens = nodes => {
    const out = [];
    let i = 0;
    while (i < nodes.length) {
      const ta = leafText(nodes[i]);
      const tb = leafText(nodes[i + 1]);
      const tc = leafText(nodes[i + 2]);
      if (ta != null && tb != null && tc != null) {
        const m = (ta + tb + tc).match(/^([\s\S]*)\{\{(\w+)\}\}([\s\S]*)$/);
        if (m && (m[2] in data)) {
          out.push(m[1] + data[m[2]] + m[3]);
          i += 3;
          continue;
        }
      }
      out.push(nodes[i]);
      i++;
    }
    return out;
  };
  const process = node => {
    if (typeof node === 'string') return replace(node);
    if (Array.isArray(node)) return collapseTokens(node.map(process));
    if (node && typeof node === 'object') {
      if (node.$$typeof) return {
        ...node,
        props: process(node.props)
      };
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, process(v)]));
    }
    return node;
  };
  return <>{process(children)}</>;
};

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

<Badge color="blue">Beta</Badge>

<Note>
  **Beta**

  Server tools are currently in beta. The API and behavior may change.

  Sandbox containers work on the global endpoint (`openrouter.ai`) only.
  Requests through the
  [in-region endpoints](/docs/guides/privacy/provider-logging#enterprise-in-region-routing)
  (`eu.openrouter.ai`, `us.openrouter.ai`) return an error.
</Note>

A container is an isolated Linux environment. The
[shell](/docs/guides/features/server-tools/shell) and
[bash](/docs/guides/features/server-tools/bash) server tools run their commands
inside a container. Each container has its own file system. The files in the
container's home directory are saved after every command, so a later request
can reuse them.

## Container ids

Every container has an id. The id can be set in the server tool's
`environment` configuration. Shell and bash tool results return the id in
their `container_id` field. There are two modes of configuring the container,
`container_auto` and `container_reference`:

```json lines theme={null}
{
  "type": "openrouter:shell",
  "parameters": {
    "environment": { "type": "container_auto" }
  }
}
```

```json lines theme={null}
{
  "type": "openrouter:shell",
  "parameters": {
    "environment": { "type": "container_reference", "container_id": "my-project" }
  }
}
```

### Automatic ids (`container_auto`)

This is the default when you omit `environment`. The id depends on your
request:

* When the request has a session id, the container id is
  `sess_` plus the session id. All requests with the same session id share
  one container.
* When the request has no session id, the container id is `gen_` plus a
  hash of the request id. Each request gets its own container.

We treat all of these as session ids, in this order:

1. The `session_id` field in the request body.
2. The `x-session-id` request header.
3. The `prompt_cache_key` field in the request body.

A session id must use only letters, digits, `_`, and `-`. An id with other
characters is ignored, and the request falls back to a per-request
container. When the session id is longer than 20 characters, only the last
20 characters are used.

### Your own ids (`container_reference`)

With `container_reference`, you can pass a `container_id` from another
session, or pass a custom container id. The id must be 1 to
40 characters and use only letters, digits, `_`, and `-`. Every request with
the same id reaches the same container and the same files.

Containers are scoped to your workspace. Two workspaces can use the same id
without seeing each other's files.

### One id, two tools

The shell tool and the bash tool use separate compute environments, even
for the same container id. They share the same saved files.

## Container lifetime

A container sleeps after it has been idle. The `sleep_after_seconds`
setting controls the idle time:

* The default is 900 seconds (15 minutes).
* The maximum is 14,400 seconds (4 hours).
* Each command resets the timer.

Sleep does not delete the files in the home directory. When a request with
the same container id arrives later, a new sandbox starts and loads the
saved files first. Open processes, environment variables, and installed
system state are **not restored**.

## File persistence

Commands run in `/home/sandbox`, which is also the home directory. After
every command, the changed files under the home directory are saved to
storage. Deleted files stay deleted. Files outside the home directory are
not saved.

Each tool result reports the files the command created or changed, in the
`files` field:

```json lines theme={null}
{
  "type": "openrouter_shell_tool_result",
  "container_id": "sess_abc123",
  "files": [
    {
      "type": "container_file_citation",
      "container_id": "sess_abc123",
      "file_id": "cfile_b3V0L3JlcG9ydC5jc3Y",
      "filename": "out/report.csv",
      "start_index": 0,
      "end_index": 0
    }
  ],
  "content": [ ... ]
}
```

The list contains at most 10 files. When a command changes more than 10
files, the 10 most recently changed files are reported. Deleted files are
not reported.

## Attach workspace files

You can copy files from your workspace into a container before the first
command runs. First upload the files with the
[Files API](/docs/guides/features/files-api). Then pass their ids in the
`file_ids` field of the container `environment`:

```json lines theme={null}
{
  "type": "openrouter:shell",
  "parameters": {
    "environment": {
      "type": "container_auto",
      "file_ids": ["or_file_011CNha8iCJcU1wXNR6q4V8w"]
    }
  }
}
```

Rules:

* You can attach up to 20 files.
* Each file appears in the home directory as a writable copy. The copy is
  named with the last 8 characters of the file id, a `-`, and the base
  filename. A file stored as `data/report.csv` with an id ending in
  `NR6q4V8w` appears as `~/NR6q4V8w-report.csv`. This prefix keeps two
  files with the same name apart.
* The copy is independent. Changes inside the container do not change the
  workspace file.
* An unknown or malformed file id fails the request with a `400` error
  before any command runs.

## Download container files

Files created inside a container can be downloaded through the container
files endpoints.

List the files in a container:

<Template data={{ API_KEY_REF }}>
  ```bash title="cURL" lines theme={null}
  curl "https://openrouter.ai/api/v1/containers/sess_abc123/files" \
    -H "Authorization: Bearer {{API_KEY_REF}}"
  ```
</Template>

```json lines theme={null}
{
  "object": "list",
  "data": [
    {
      "id": "cfile_b3V0L3JlcG9ydC5jc3Y",
      "object": "container.file",
      "container_id": "sess_abc123",
      "bytes": 123,
      "created_at": 1755640000,
      "path": "out/report.csv",
      "source": "assistant"
    }
  ],
  "first_id": "cfile_b3V0L3JlcG9ydC5jc3Y",
  "last_id": "cfile_b3V0L3JlcG9ydC5jc3Y",
  "has_more": false
}
```

* `GET /api/v1/containers/{container_id}/files` lists the files. The
  `limit` parameter sets the page size, from 1 to 1000 (default 100). Use
  the `after` parameter with a file id to get the next page.
* `GET /api/v1/containers/{container_id}/files/{file_id}` returns the
  metadata of one file.
* `GET /api/v1/containers/{container_id}/files/{file_id}/content` streams
  the file content.

Container file ids start with `cfile_`. They encode the file path, and they
match the `file_id` values in the tool result's `files` field.

## Save a container file to your workspace

Container files live with the container. To keep a file for the long term,
promote it to a workspace document:

<Template data={{ API_KEY_REF }}>
  ```bash title="cURL" lines theme={null}
  curl -X POST "https://openrouter.ai/api/v1/containers/sess_abc123/files/cfile_b3V0L3JlcG9ydC5jc3Y/promote" \
    -H "Authorization: Bearer {{API_KEY_REF}}"
  ```
</Template>

```json lines theme={null}
{
  "id": "or_file_011CNha8iCJcU1wXNR6q4V8w",
  "type": "file",
  "filename": "out/report.csv",
  "mime_type": "text/csv",
  "size_bytes": 123,
  "created_at": "2026-08-25T00:00:00Z",
  "downloadable": true
}
```

`POST /api/v1/containers/{container_id}/files/{file_id}/promote` copies the
file into your workspace documents. The response is the new document in the
[Files API](/docs/guides/features/files-api) shape, with a new `or_file_` id. You
can then use the new id like any uploaded file, for example in
[`file_ids`](#attach-workspace-files), or download it through
`GET /api/v1/files/{file_id}/content`.

Rules:

* The copy is independent. The container file stays in the container, and
  later changes to it do not change the document.
* The document keeps the container file path as its filename.
* Files larger than 100 MiB return a `413` error.
* Any content the sandbox produced is accepted. The file type is read from
  the content; unknown content is stored as binary data.
* The promoted document remains downloadable through the Files API. Direct
  workspace uploads remain non-downloadable.

## Network access

By default, a container has no outbound internet access. The
`network_policy` setting can allow specific domains. See the
[shell network policy](/docs/guides/features/server-tools/shell#network-policy)
and [bash network policy](/docs/guides/features/server-tools/bash#network-policy)
sections.

## Limits

| Limit                                   | Value                                     |
| --------------------------------------- | ----------------------------------------- |
| Commands per tool call                  | 100                                       |
| Characters per command                  | 16,384                                    |
| Command timeout (`timeout_ms`)          | Default 120,000 ms, maximum 300,000 ms    |
| Output per stream (`max_output_length`) | Default 16,384, maximum 65,536 characters |
| Idle sleep (`sleep_after_seconds`)      | Default 900 s, maximum 14,400 s           |
| Attached workspace files                | 20                                        |
| Reported changed files                  | 10 per command                            |
| Server tool calls per request           | 30                                        |

## Next steps

* [Shell](/docs/guides/features/server-tools/shell): The shell server tool
* [Bash](/docs/guides/features/server-tools/bash): The bash server tool
* [Files API](/docs/guides/features/files-api): Upload files to your workspace
