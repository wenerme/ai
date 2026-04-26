---
title: REST API
description: Manage Artifacts repos and tokens over HTTP.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# REST API

Use the Artifacts REST API to manage repos, remotes, forks, imports, and tokens from external systems.

Review [Namespaces](https://developers.cloudflare.com/artifacts/concepts/namespaces/) first, then choose the namespace name you will use in these API paths.

## Base URL and authentication

Artifacts REST routes use this base path:

```

https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/artifacts/namespaces/$ARTIFACTS_NAMESPACE


```

Requests use Bearer authentication:

```

Authorization: Bearer $CLOUDFLARE_API_TOKEN


```

All routes below are relative to this base URL.

Cloudflare API tokens authenticate REST control-plane routes. Repo tokens authenticate Git operations against the returned `remote` URL.

The following examples assume:

Terminal window

```

export ACCOUNT_ID="<YOUR_ACCOUNT_ID>"

export ARTIFACTS_NAMESPACE="default"

export ARTIFACTS_REPO="starter-repo"

export CLOUDFLARE_API_TOKEN="<YOUR_API_TOKEN>"

export ARTIFACTS_BASE_URL="https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/artifacts/namespaces/$ARTIFACTS_NAMESPACE"


```

All responses use the standard Cloudflare v4 envelope.

Returned repo tokens are secrets. Do not log them or store them in long-lived remotes unless your workflow requires it.

## Shared types

TypeScript

```

export type NamespaceName = string;

export type RepoName = string;

export type BranchName = string;

export type Scope = "read" | "write";

export type TokenState = "active" | "expired" | "revoked";

export type ArtifactToken = string;

export type Cursor = string;

export type RepoSortField =

  | "created_at"

  | "updated_at"

  | "last_push_at"

  | "name";

export type SortDirection = "asc" | "desc";


export interface ApiError {

  code: number;

  message: string;

  documentation_url?: string;

  source?: {

    pointer?: string;

  };

}


export interface CursorResultInfo {

  cursor: string;

  per_page: number;

  count: number;

}


export interface OffsetResultInfo {

  page: number;

  per_page: number;

  total_pages: number;

  count: number;

  total_count: number;

}


export type ResultInfo = CursorResultInfo | OffsetResultInfo;


export interface ApiEnvelope<T> {

  result: T | null;

  success: boolean;

  errors: ApiError[];

  messages: ApiError[];

  result_info?: ResultInfo;

}


export interface RepoInfo {

  id: string;

  name: RepoName;

  description: string | null;

  default_branch: string;

  created_at: string;

  updated_at: string;

  last_push_at: string | null;

  source: string | null;

  read_only: boolean;

}


export interface RepoWithRemote extends RepoInfo {

  remote: string;

}


export interface TokenInfo {

  id: string;

  scope: Scope;

  state: TokenState;

  created_at: string;

  expires_at: string;

}


```

Explain Code

## Repos

### Create a repo

Route: `POST /repos`

Request body:

* `name` ` RepoName ` required
* `description` ` string ` optional
* `default_branch` ` BranchName ` optional
* `read_only` ` boolean ` optional

Response type:

TypeScript

```

export interface CreateRepoRequest {

  name: RepoName;

  description?: string;

  default_branch?: BranchName;

  read_only?: boolean;

}


export interface CreateRepoResult {

  id: string;

  name: RepoName;

  description: string | null;

  default_branch: string;

  remote: string;

  token: ArtifactToken;

}


export type CreateRepoResponse = ApiEnvelope<CreateRepoResult>;


```

Explain Code

Terminal window

```

curl --request POST "$ARTIFACTS_BASE_URL/repos" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

    "name": "starter-repo",

    "description": "Repository for automation experiments",

    "default_branch": "main",

    "read_only": false

  }'


```

```

{

  "result": {

    "id": "repo_123",

    "name": "starter-repo",

    "description": "Repository for automation experiments",

    "default_branch": "main",

    "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo.git",

    "token": "art_v1_0123456789abcdef0123456789abcdef01234567?expires=1760000000"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Create, fork, and import responses return the token string only. The token encodes its expiry directly in the `?expires=` suffix. The separate `POST /tokens` route also returns `expires_at` alongside the plaintext token.

### List repos

Route: `GET /repos?limit=&cursor=&search=&sort=&direction=`

Query parameters:

* `limit` ` number ` optional (default: 50, max: 200)
* `cursor` ` Cursor ` optional
* `search` ` string ` optional
* `sort` ` "created_at" | "updated_at" | "last_push_at" | "name" ` optional (default: "created\_at")
* `direction` ` "asc" | "desc" ` optional (default: "desc")

Response type:

TypeScript

```

export interface ListReposQuery {

  limit?: number;

  cursor?: Cursor;

  search?: string;

  sort?: RepoSortField;

  direction?: SortDirection;

}


export type ListReposResponse = ApiEnvelope<RepoWithRemote[]>;


```

Terminal window

```

curl "$ARTIFACTS_BASE_URL/repos?limit=20&sort=updated_at&direction=desc" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "repo_123",

      "name": "starter-repo",

      "description": "Repository for automation experiments",

      "default_branch": "main",

      "created_at": "<ISO_TIMESTAMP>",

      "updated_at": "<ISO_TIMESTAMP>",

      "last_push_at": "<ISO_TIMESTAMP>",

      "source": null,

      "read_only": false,

      "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo.git"

    }

  ],

  "success": true,

  "errors": [],

  "messages": [],

  "result_info": {

    "cursor": "next-cursor",

    "per_page": 20,

    "count": 1

  }

}


```

Explain Code

### Get a repo

Route: `GET /repos/:name`

Response type:

TypeScript

```

export type GetRepoResponse = ApiEnvelope<RepoWithRemote>;


```

Terminal window

```

curl "$ARTIFACTS_BASE_URL/repos/$ARTIFACTS_REPO" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "repo_123",

    "name": "starter-repo",

    "description": "Repository for automation experiments",

    "default_branch": "main",

    "created_at": "<ISO_TIMESTAMP>",

    "updated_at": "<ISO_TIMESTAMP>",

    "last_push_at": "<ISO_TIMESTAMP>",

    "source": null,

    "read_only": false,

    "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo.git"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

### Delete a repo

Route: `DELETE /repos/:name`

This route returns `202 Accepted`.

Response type:

TypeScript

```

export interface DeleteRepoResult {

  id: string;

}


export type DeleteRepoResponse = ApiEnvelope<DeleteRepoResult>;


```

Terminal window

```

curl --request DELETE "$ARTIFACTS_BASE_URL/repos/$ARTIFACTS_REPO" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "repo_123"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

### Fork a repo

Route: `POST /repos/:name/fork`

Request body:

* `name` ` RepoName ` required
* `description` ` string ` optional
* `read_only` ` boolean ` optional
* `default_branch_only` ` boolean ` optional

Response type:

TypeScript

```

export interface ForkRepoRequest {

  name: RepoName;

  description?: string;

  read_only?: boolean;

  default_branch_only?: boolean;

}


export interface ForkRepoResult extends CreateRepoResult {

  objects: number;

}


export type ForkRepoResponse = ApiEnvelope<ForkRepoResult>;


```

Explain Code

Terminal window

```

curl --request POST "$ARTIFACTS_BASE_URL/repos/$ARTIFACTS_REPO/fork" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

    "name": "starter-repo-copy",

    "description": "Fork for testing",

    "read_only": false,

    "default_branch_only": true

  }'


```

```

{

  "result": {

    "id": "repo_456",

    "name": "starter-repo-copy",

    "description": "Repository for automation experiments",

    "default_branch": "main",

    "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo-copy.git",

    "token": "art_v1_89abcdef0123456789abcdef0123456789abcdef?expires=1760003600",

    "objects": 128

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

### Import a public HTTPS remote

Route: `POST /repos/:name/import`

Request body:

* `url` ` string ` required
* `branch` ` string ` optional
* `depth` ` number ` optional
* `read_only` ` boolean ` optional

Response type:

TypeScript

```

export interface ImportRepoRequest {

  url: string;

  branch?: string;

  depth?: number;

  read_only?: boolean;

}


export type ImportRepoResponse = ApiEnvelope<CreateRepoResult>;


```

Pass a full HTTPS Git remote URL, for example `https://github.com/facebook/react` or `https://gitlab.com/group/project.git`.

Terminal window

```

curl --request POST "$ARTIFACTS_BASE_URL/repos/react-mirror/import" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

    "url": "https://github.com/facebook/react",

    "branch": "main",

    "depth": 100

  }'


```

```

{

  "result": {

    "id": "repo_789",

    "name": "react-mirror",

    "description": null,

    "default_branch": "main",

    "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/react-mirror.git",

    "token": "art_v1_fedcba9876543210fedcba9876543210fedcba98?expires=1760007200"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

If a repo exists but is still importing or forking, this route can return `409 Conflict` with a retriable error message.

## Tokens

These tokens are for Git routes. They do not authenticate REST API requests.

### List tokens for a repo

Route: `GET /repos/:name/tokens?state=&per_page=&page=`

Query parameters:

* `state` ` "active" | "expired" | "revoked" | "all" ` optional (default: "active")
* `per_page` ` number ` optional (default: 30, max: 100)
* `page` ` number ` optional (default: 1)

Response type:

TypeScript

```

export interface ListTokensQuery {

  state?: TokenState | "all";

  per_page?: number;

  page?: number;

}


export type ListTokensResponse = ApiEnvelope<TokenInfo[]>;


```

Terminal window

```

curl "$ARTIFACTS_BASE_URL/repos/$ARTIFACTS_REPO/tokens?state=all&per_page=30&page=1" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "tok_123",

      "scope": "read",

      "state": "active",

      "created_at": "<ISO_TIMESTAMP>",

      "expires_at": "<ISO_TIMESTAMP>"

    }

  ],

  "success": true,

  "errors": [],

  "messages": [],

  "result_info": {

    "page": 1,

    "per_page": 30,

    "total_pages": 1,

    "count": 1,

    "total_count": 1

  }

}


```

Explain Code

### Create a token

Route: `POST /tokens`

Request body:

* `repo` ` RepoName ` required
* `scope` ` "read" | "write" ` optional (default: "write")
* `ttl` ` number ` optional (seconds, default: 86400)

Response type:

TypeScript

```

export interface CreateTokenRequest {

  repo: RepoName;

  scope?: Scope;

  ttl?: number;

}


export interface CreateTokenResult {

  id: string;

  plaintext: ArtifactToken;

  scope: Scope;

  expires_at: string;

}


export type CreateTokenResponse = ApiEnvelope<CreateTokenResult>;


```

Explain Code

Terminal window

```

curl --request POST "$ARTIFACTS_BASE_URL/tokens" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

    "repo": "starter-repo",

    "scope": "read",

    "ttl": 3600

  }'


```

```

{

  "result": {

    "id": "tok_123",

    "plaintext": "art_v1_0123456789abcdef0123456789abcdef01234567?expires=1760000000",

    "scope": "read",

    "expires_at": "<ISO_TIMESTAMP>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

### Revoke a token

Route: `DELETE /tokens/:id`

Response type:

TypeScript

```

export interface DeleteTokenResult {

  id: string;

}


export type DeleteTokenResponse = ApiEnvelope<DeleteTokenResult>;


```

Terminal window

```

curl --request DELETE "$ARTIFACTS_BASE_URL/tokens/tok_123" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "tok_123"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Errors

Application errors also use the v4 envelope:

TypeScript

```

export interface ApiError {

  code: number;

  message: string;

  documentation_url?: string;

  source?: {

    pointer?: string;

  };

}


```

## Next steps

[ Workers binding ](https://developers.cloudflare.com/artifacts/api/workers-binding/) Call the same Artifacts operations from a Worker through the Artifacts binding. 

[ Git protocol ](https://developers.cloudflare.com/artifacts/api/git-protocol/) Use repo remotes and tokens with standard git-over-HTTPS tooling. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/api/rest-api/","name":"REST API"}}]}
```
