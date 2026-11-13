# Group Markdown uploads API

REST API to upload, list, download, and delete Markdown file uploads for a group.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Use this API to manage [Markdown uploads](../security/user_file_uploads.md) that can be referenced
in Markdown text in epics or wiki pages.

## Rate limits

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/269433) in GitLab 19.6 [with a feature flag](../administration/feature_flags/_index.md) named `markdown_uploads_rate_limit_enforce`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

A rate limit applies to the total size of the files each user uploads every day.
For more information, see [rate limits](../rate_limits/_index.md#api-and-rails-console).

## Upload a file to a group

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/230537) in GitLab 19.0.

Uploads a file to the specified group. Returns a Markdown-formatted link to the file.

You must have the Guest, Planner, Reporter, Developer, Maintainer, or Owner role to use this endpoint.

```plaintext
POST /groups/:id/uploads
```

Supported attributes:

| Attribute | Type              | Required | Description |
|-----------|-------------------|----------|-------------|
| `id`      | integer or string | Yes      | The ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `file`    | file              | Yes      | The file to upload. |

Example request:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --form "file=@/path/to/image.png" \
  --url "https://gitlab.example.com/api/v4/groups/5/uploads"
```

Example response:

```json
{
  "id": 3,
  "alt": "image",
  "url": "/uploads/648d97c6eef5fc5df8d1004565b3ee5a/image.png",
  "full_path": "/-/group/5/uploads/648d97c6eef5fc5df8d1004565b3ee5a/image.png",
  "markdown": "![image](/uploads/648d97c6eef5fc5df8d1004565b3ee5a/image.png)"
}
```

## List all uploads for a group

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/157066) in GitLab 17.2.

Lists all uploads for a specified group sorted by `created_at` in descending order.

You must have the Maintainer or Owner role to use this endpoint.

```plaintext
GET /groups/:id/uploads
```

| Attribute | Type              | Required | Description |
|-----------|-------------------|----------|-------------|
| `id`      | integer or string | Yes      | The ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |

Example request:

```shell
curl --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/groups/5/uploads"
```

Example response:

```json
[
  {
    "id": 1,
    "size": 1024,
    "filename": "image.png",
    "created_at":"2024-06-20T15:53:03.067Z",
    "uploaded_by": {
      "id": 18,
      "name" : "Alexandra Bashirian",
      "username" : "eileen.lowe"
    }
  },
  {
    "id": 2,
    "size": 512,
    "filename": "other-image.png",
    "created_at":"2024-06-19T15:53:03.067Z",
    "uploaded_by": null
  }
]
```

## Download an uploaded file by ID

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/157066) in GitLab 17.2.

Downloads an uploaded file with the specified ID.
You must have the Maintainer or Owner role to use this endpoint.

```plaintext
GET /groups/:id/uploads/:upload_id
```

Supported attributes:

| Attribute   | Type              | Required | Description |
|-------------|-------------------|----------|-------------|
| `id`        | integer or string | Yes      | The ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `upload_id` | integer           | Yes      | The ID of the upload. |

Example request:

```shell
curl --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/groups/5/uploads/1"
```

If successful, returns [`200`](rest/troubleshooting.md#status-codes) and the uploaded file in the response body.

## Download an uploaded file by secret and filename

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/164441) in GitLab 17.4.

Downloads an uploaded file with the specified secret and filename.
You must have the Guest, Planner, Reporter, Developer, Maintainer, or Owner role to use this endpoint.

```plaintext
GET /groups/:id/uploads/:secret/:filename
```

Supported attributes:

| Attribute   | Type              | Required | Description |
|-------------|-------------------|----------|-------------|
| `id`        | integer or string | Yes      | The ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `secret`    | string            | Yes      | The 32-character secret of the upload. |
| `filename`  | string            | Yes      | The filename of the upload. |

Example request:

```shell
curl --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/groups/5/uploads/648d97c6eef5fc5df8d1004565b3ee5a/sample.jpg"
```

If successful, returns [`200`](rest/troubleshooting.md#status-codes) and the uploaded file in the response body.

### Download a file linked from a description or comment

To download a file that is linked from a description or comment, get the secret and filename from the link.
The link to an uploaded file has one of these formats:

- On the rendered page: `https://gitlab.example.com/-/group/<group_id>/uploads/<secret>/<filename>`.
  To get the API URL, replace `/-/group/` with `/api/v4/groups/`.
- In the raw Markdown: `/uploads/<secret>/<filename>`.
  This link does not include the project or group.
  If the file belongs to a project (for example, in an issue or merge request), use the
  [project Markdown uploads API](project_markdown_uploads.md#download-an-uploaded-file-by-secret-and-filename).
  The group endpoint returns `404` for files uploaded to a project.

Copy the filename from the link, not from your original file.
GitLab can change the filename when the file is uploaded. For example, GitLab replaces spaces with underscores.

For example, for this link on a rendered page:

```plaintext
https://gitlab.example.com/-/group/5/uploads/648d97c6eef5fc5df8d1004565b3ee5a/sample.jpg
```

Use this request:

```shell
curl --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/groups/5/uploads/648d97c6eef5fc5df8d1004565b3ee5a/sample.jpg"
```

## Delete an uploaded file by ID

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/157066) in GitLab 17.2.

Deletes an uploaded file with the specified ID.
You must have the Maintainer or Owner role to use this endpoint.

```plaintext
DELETE /groups/:id/uploads/:upload_id
```

Supported attributes:

| Attribute   | Type              | Required | Description |
|-------------|-------------------|----------|-------------|
| `id`        | integer or string | Yes      | The ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `upload_id` | integer           | Yes      | The ID of the upload. |

Example request:

```shell
curl --request DELETE \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/groups/5/uploads/1"
```

If successful, returns [`204`](rest/troubleshooting.md#status-codes) status code without any response body.

## Delete an uploaded file by secret and filename

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/164441) in GitLab 17.4.

Deletes an uploaded file with the specified secret and filename.
You must have the Maintainer or Owner role to use this endpoint.

```plaintext
DELETE /groups/:id/uploads/:secret/:filename
```

Supported attributes:

| Attribute   | Type              | Required | Description |
|-------------|-------------------|----------|-------------|
| `id`        | integer or string | Yes      | The ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `secret`    | string            | Yes      | The 32-character secret of the upload. |
| `filename`  | string            | Yes      | The filename of the upload. |

Example request:

```shell
curl --request DELETE \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/groups/5/uploads/648d97c6eef5fc5df8d1004565b3ee5a/sample.jpg"
```

If successful, returns [`204`](rest/troubleshooting.md#status-codes) status code without any response body.
