> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Files API

> Upload files to your workspace and use them in requests

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

  The Files API is in beta. The API and behavior may change.
</Note>

The Files API stores files in your workspace. You can upload a file once and
use it in many requests. A sandbox container can load workspace files with the
[`file_ids` setting](/docs/guides/features/server-tools/containers#attach-workspace-files).

<Note>
  **Global endpoint only**

  The Files API works on the global endpoint (`openrouter.ai`) only. Requests
  through the
  [in-region endpoints](/docs/guides/privacy/provider-logging#enterprise-in-region-routing)
  (`eu.openrouter.ai`, `us.openrouter.ai`) return a `403` error.
</Note>

## The Files page

You can also manage files in the web app. Open
[your workspace files page](https://openrouter.ai/workspaces/default/files).
There you can upload files and create files inside folders. You cannot
download workspace files from this page. See
[Download rules](#download-rules).

## Upload a file

Send a `multipart/form-data` request to `POST /api/v1/files`. Put the file in
the `file` field.

<Template data={{ API_KEY_REF }}>
  <CodeGroup>
    ```bash title="cURL" lines theme={null}
    curl https://openrouter.ai/api/v1/files \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -F "file=@report.pdf"
    ```

    ```typescript title="TypeScript" lines theme={null}
    const form = new FormData();
    form.append('file', new File([pdfBytes], 'report.pdf'));

    const response = await fetch('https://openrouter.ai/api/v1/files', {
      method: 'POST',
      headers: { Authorization: 'Bearer {{API_KEY_REF}}' },
      body: form,
    });

    const file = await response.json();
    console.log(file.id); // or_file_...
    ```

    ```python title="Python" lines theme={null}
    import requests

    response = requests.post(
        "https://openrouter.ai/api/v1/files",
        headers={"Authorization": f"Bearer {{API_KEY_REF}}"},
        files={"file": ("report.pdf", open("report.pdf", "rb"))},
    )

    print(response.json()["id"])  # or_file_...
    ```
  </CodeGroup>
</Template>

The response contains the file id. File ids start with `or_file_`. Use this
id in later requests.

### Upload limits

* The maximum file size is 100 MiB (104,857,600 bytes). A larger file returns
  a `413` error.
* Empty files return a `400` error.
* Each workspace can store up to 10 GiB in total. When the workspace is
  full, uploads return a `403` error.

### File types

The API reads the file content to find the file type. It does not trust the
filename or the declared content type. A file with content that is not on
this list returns a `400` error:

* PDF documents
* PNG, JPEG, GIF, and WebP images
* DOCX, XLSX, and PPTX documents
* MP3, WAV, FLAC, and OGG audio
* UTF-8 text. Text is reported by its structure as JSON, NDJSON, CSV,
  Markdown, or plain text.

### Filenames and folders

A filename can contain `/` to form a folder path, for example
`data/report.csv`. The path is part of the filename. Rules:

* The filename must be 1 to 255 characters long.
* The filename must not start or end with `/`.
* Path segments must not be empty, `.`, or `..`.
* The characters `< > : " | ? * \` and control characters are not allowed.

## List files

`GET /api/v1/files` returns the files in the workspace.

<Template data={{ API_KEY_REF }}>
  ```bash title="cURL" lines theme={null}
  curl "https://openrouter.ai/api/v1/files?limit=100" \
    -H "Authorization: Bearer {{API_KEY_REF}}"
  ```
</Template>

* `limit` sets the page size, from 1 to 1000. The default is 100.
* The response contains `data`, `has_more`, and a `cursor`. Send the
  `cursor` value in the next request to get the next page.
* You can also use the OpenAI-style `after` parameter with a file id.
  Do not mix `cursor` and `after` in one request.

The list has more than one response shape. The default shape is the
OpenRouter shape. Requests that look like OpenAI SDK requests get the OpenAI
shape. Requests with an `anthropic-version` header get the Anthropic shape.

## Get file metadata

`GET /api/v1/files/{file_id}` returns the metadata of one file:

```json lines theme={null}
{
  "id": "or_file_011CNha8iCJcU1wXNR6q4V8w",
  "type": "file",
  "filename": "data/report.csv",
  "mime_type": "text/csv",
  "size_bytes": 24576,
  "created_at": "2026-08-25T00:00:00Z",
  "downloadable": false
}
```

## Download rules

Files that you upload cannot be downloaded again. A request to
`GET /api/v1/files/{file_id}/content` for an uploaded file returns a `400`
error. Keep your own copy of every file you upload.

Files that a model creates are different:

* Files that a sandbox command creates can be downloaded through the
  [container files endpoints](/docs/guides/features/server-tools/containers#download-container-files),
  or copied into your workspace as a durable document. A promoted document
  has `"downloadable": true` and can be downloaded later through
  `GET /api/v1/files/{file_id}/content`. See
  [Save a container file to your workspace](/docs/guides/features/server-tools/containers#save-a-container-file-to-your-workspace).
* Files that the [files tool](/docs/guides/features/server-tools/files) writes or
  edits also have `"downloadable": true` and can be downloaded the same way.

Files that a model created before this behavior launched keep
`"downloadable": false`. Promote the container file again, or ask the model
to write the file again, to get a downloadable copy.

## Delete a file

`DELETE /api/v1/files/{file_id}` deletes a file. The freed space returns to
the workspace storage quota. A file that does not exist returns a `404`
error.

## Workspaces

Every file belongs to one workspace:

* By default, the API uses the workspace of your API key. A key without a
  workspace uses your default workspace.
* You can pass `workspace_id` as a query parameter to select a workspace.
* A key that is scoped to a different workspace gets a `403` error.
* A file id from another workspace returns a `404` error.

## Provider-hosted files

You can pass `provider=openai` or `provider=anthropic` as a query parameter.
The request then goes to that provider's own Files API. It uses the
[BYOK key](/docs/guides/overview/auth/byok) you configured for that provider.
Without a configured key, the request returns a `400` error.

## Next steps

* [Containers](/docs/guides/features/server-tools/containers): Load files into a
  sandbox container
