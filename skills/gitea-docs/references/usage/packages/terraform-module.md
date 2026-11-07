---
date: "2026-06-09T00:00:00+00:00"
---

# Terraform Module Registry

Publish [Terraform](https://www.terraform.io/) modules for your user or organization and use them
from Terraform or Terragrunt. The registry implements the
[HashiCorp module registry protocol](https://developer.hashicorp.com/terraform/internals/module-registry-protocol),
so modules are referenced with the usual `HOST/NAMESPACE/NAME/PROVIDER` address.

## Requirements

- The [Terraform CLI](https://developer.hashicorp.com/terraform/install) or
  [Terragrunt](https://terragrunt.gruntwork.io/).
- **Your Gitea instance must be served over HTTPS with a valid certificate.**
  Terraform and Terragrunt only perform module registry discovery over HTTPS and reject
  plain HTTP — including `http://localhost`. This is a requirement of the protocol, not of Gitea.

A module is addressed by three segments:

| Segment     | Meaning                                                        |
| ----------- | ------------------------------------------------------------- |
| `namespace` | The owner of the module: a Gitea user or organization name. It must follow the same rules as `name`, so owners with a `.` in their name cannot publish modules. |
| `name`      | The module name. Letters, digits, `-` and `_`, starting and ending with a letter or digit, up to 64 characters. |
| `provider`  | The main provider the module targets, e.g. `aws`. Lowercase letters and digits, up to 64 characters. |

Versions follow [semantic versioning](https://semver.org/) and are stored in canonical form: a
leading `v` is dropped and missing segments are padded, so `v1.2.3` and `1.2.3` address the same
version, and `1.2` becomes `1.2.0`.

## Packaging a module

A module is published as a single `.tar.gz` archive, stored and served exactly as uploaded. The
module's `.tf` files must therefore be at the **archive root**. A source tarball downloaded from a Git
host wraps everything in a `repository-version/` directory and is rejected — repackage the module
directory's contents instead:

```shell
tar -czf vpc-1.0.0.tar.gz -C path/to/module .
```

The root module's inputs, outputs, providers and `README` are shown on the package page. Each
submodule found under `modules/<name>` is listed with its source address and links to its own page,
which shows the install snippet for that submodule along with its inputs, outputs, providers and
`README`. Only one level is indexed, so `modules/<name>/<nested>` is not listed. Anything else,
including `examples/`, is kept in the archive but is not indexed. A module that is only a collection of
submodules, with no root module, is also accepted. Files in JSON syntax (`.tf.json`) are accepted too,
but only `.tf` files are indexed.

## Authentication

Create a [personal access token](development/api-usage.md#authentication) with the `read:package` scope to download
private modules, and `write:package` to publish or delete them. Add it to your Terraform CLI
configuration file (`~/.terraformrc` or `%APPDATA%/terraform.rc`):

```hcl
credentials "gitea.example.com" {
  token = "<your token>"
}
```

Modules owned by a public user or organization can be downloaded without a token.

## Publishing a module

Upload an archive with a `PUT` request, sending the file as the raw request body. Use
`curl --upload-file` rather than `--data-binary`: the latter sends a form content type that
the registry will not accept as an archive.

```shell
curl --user "your_username:your_token" \
  --upload-file vpc-1.0.0.tar.gz \
  https://gitea.example.com/api/packages/-/terraform/modules/{namespace}/{name}/{provider}/{version}
```

| Parameter   | Description                            |
| ----------- | -------------------------------------- |
| `namespace` | The owner (user or organization).      |
| `name`      | The module name.                       |
| `provider`  | The provider the module targets.       |
| `version`   | The module version (semver).           |

For example, to publish version `1.0.0` of the `vpc` module for the `aws` provider under the `acme`
organization:

```shell
curl --user "your_username:your_token" \
  --upload-file vpc-1.0.0.tar.gz \
  https://gitea.example.com/api/packages/-/terraform/modules/acme/vpc/aws/1.0.0
```

A successful upload returns `201 Created`. Published versions are immutable: uploading a version that
already exists returns `409 Conflict`. To replace a version, delete it first.

## Linking a module to a repository

A module always lives in a user or organization's package space — its namespace is that user or
organization, never a repository, because the registry address (`HOST/NAMESPACE/NAME/PROVIDER`) has no
repository segment. You cannot publish "into" a repository. Instead, a repository link is a display
association that surfaces the module on a repository's **Packages** tab. The workflow is:

1. **Publish** the module to the user or organization namespace, exactly as shown in
   [Publishing a module](#publishing-a-module).
2. **Link** the package to a repository owned by that same user or organization: open the package,
   go to its **Settings**, and select the repository (or use the
   `POST /api/v1/packages/{owner}/terraform-module/{name}%2F{provider}/-/link/{repo}` API).

The link applies to the whole module — all of its versions, including ones published later — and can
be changed or removed at any time. It only affects where the module is listed in the UI; the address
used to consume it is unchanged (still `HOST/NAMESPACE/NAME/PROVIDER`, with no repository in it).

## Consuming a module

Reference the module by its registry address. With Terraform:

```hcl
module "vpc" {
  source  = "gitea.example.com/acme/vpc/aws"
  version = "~> 1.0"
}
```

To use a submodule, append its path with the standard `//` separator:

```hcl
module "network" {
  source  = "gitea.example.com/acme/infra/google//modules/network"
  version = "~> 1.0"
}
```

With Terragrunt, use the `tfr://` scheme and pass the version as a query parameter:

```hcl
terraform {
  source = "tfr://gitea.example.com/acme/vpc/aws?version=1.0.0"
}
```

`terraform init` (or `terragrunt init`) resolves the address through the service discovery document
at `https://gitea.example.com/.well-known/terraform.json` and downloads the matching version.

## Deleting a version

```shell
curl --user "your_username:your_token" \
  --request DELETE \
  https://gitea.example.com/api/packages/-/terraform/modules/acme/vpc/aws/1.0.0
```

A successful delete returns `204 No Content`. This requires the `write:package` scope. There is no
separate deprecation flow — deleting a version removes it from the registry.

## Limits

The stored archive is bounded by the instance-wide package limits (`LIMIT_SIZE_TERRAFORM_MODULE` and
`LIMIT_TOTAL_OWNER_SIZE`) set by your Gitea administrator; see the
[configuration cheat sheet](../../administration/config-cheat-sheet.md#packages-packages).

Independently of those settings, an archive may not exceed **32 MiB decompressed**. The registry
reads the whole archive to index it, and stops with `413 Request Entity Too Large` past that ceiling,
so raising `LIMIT_SIZE_TERRAFORM_MODULE` above 32 MiB does not allow larger modules. Real modules are
kilobyte-scale, so this only affects archives carrying unrelated payloads.

A `README` larger than **1 MiB**, of the root module or of a submodule, is not shown on the package
page. The module is still accepted and the file stays in the archive.
