# Cargo crates in the package registry

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated
- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/254282) in GitLab 19.5 [with a feature flag](../../../administration/feature_flags/_index.md) named `package_registry_cargo_support`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

You can publish Cargo crates (Rust packages) to your project's package registry.
Then, you can install them with Cargo.

For more information about the development of this feature, see [issue 33060](https://gitlab.com/gitlab-org/gitlab/-/issues/33060).

The Cargo registry is available for projects only.
There is no group or instance registry.
GitLab supports the sparse index protocol only.

## Authenticate to the package registry

Before you can interact with the package registry, you must authenticate to it.

1. In your project, create or edit the `.cargo/config.toml` file.
1. Add the registry:

   ```toml
   [registries.gitlab]
   index = "sparse+https://<gitlab.example.com>/api/v4/projects/<project_id>/packages/cargo/"
   credential-provider = "cargo:token"
   ```

   Replace the following values:

   - `<gitlab.example.com>`: The hostname of your GitLab instance. For GitLab.com, use `gitlab.com`.
   - `<project_id>`: Your project ID.

   The trailing slash in the `index` URL is required.

   The `gitlab` key in `[registries.gitlab]` is the registry name.
   It's a local alias, and you can choose any name.
   The `--registry gitlab` commands on this page use this name.

1. Set your token in an environment variable:

   ```shell
   export CARGO_REGISTRIES_GITLAB_TOKEN="Bearer <token>"
   ```

   The variable name is `CARGO_REGISTRIES_<NAME>_TOKEN`.
   `<NAME>` is the registry name in uppercase, with `-` replaced by `_`.
   For example, for a registry named `my-registry`, use `CARGO_REGISTRIES_MY_REGISTRY_TOKEN`.

Don't store the token in the configuration file.

| Token | Scope to install | Scope to publish |
|-------|------------------|------------------|
| [Personal access token](../../profile/personal_access_tokens.md) | `api` | `api` |
| [Project access token](../../project/settings/project_access_tokens.md) | `api` | `api` |
| [Fine-grained personal access token](../../../auth/tokens/fine_grained_access_tokens.md) | `Package: Read` | `Package: Read` and `Package: Create` |
| [Deploy token](../../project/deploy_tokens/_index.md) | `read_package_registry` | `read_package_registry` and `write_package_registry` |
| [CI/CD job token](../../../ci/jobs/ci_job_token.md) | Not applicable | Not applicable |

Anyone can install crates from a public project without a token.
Private and internal projects require a token.

## Publish a crate

Prerequisites:

- You must [authenticate to the package registry](#authenticate-to-the-package-registry).
- You must have at least the Developer role.
- Your crate must be 10 MB or less.

To publish a crate:

1. Run the following command:

   ```shell
   cargo publish --registry gitlab
   ```

   GitLab processes the crate in the background.
   When processing finishes, the crate appears in the registry index and on the **Deploy** > **Package registry** page.

1. Optional. To prevent a crate from publishing to crates.io by accident, add the `publish` key to the `[package]` section of its `Cargo.toml` file:

   ```toml
   [package]
   name = "my-crate"
   version = "0.1.0"
   publish = ["gitlab"]
   ```

### Publish with GitLab CI/CD

You can publish a crate from a CI/CD job with a CI/CD job token.
You don't need to create a token or a configuration file.

In your `.gitlab-ci.yml` file, add:

```yaml
publish:
  image: rust:1
  variables:
    CARGO_REGISTRIES_GITLAB_INDEX: "sparse+${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/cargo/"
    CARGO_REGISTRIES_GITLAB_TOKEN: "Bearer ${CI_JOB_TOKEN}"
  rules:
    - if: $CI_COMMIT_TAG
  script:
    - cargo publish --registry gitlab
```

### Crate names and versions

Crate names must:

- Start with a letter.
- Have 64 characters or fewer.
- Contain only letters, digits, hyphens (`-`), and underscores (`_`).

Crate names are not case-sensitive, and hyphens and underscores are equivalent.
For example, `my_crate` and `My-Crate` refer to the same crate.

Versions must be [semantic versions](https://semver.org/).

You can't publish a version that already exists.
Cargo stops the request before it reaches GitLab.
If a request does reach GitLab, GitLab returns a `400` error with the message `Package already exists`.
The project's duplicate package settings don't apply to Cargo.

[Package protection rules](../package_registry/package_protection_rules.md) apply to Cargo crates.
If a rule protects the crate name, GitLab returns a `403` error.
Cargo prints this error:

```plaintext
the remote server responded with an error (status 403 Forbidden): Package protected.
```

## Install a crate

Prerequisites:

- You must [authenticate to the package registry](#authenticate-to-the-package-registry).

To install a crate, use one of these methods:

### In the manifest

In your `Cargo.toml` file, add the crate to the `[dependencies]` section:

```toml
[dependencies]
my-crate = { version = "0.1", registry = "gitlab" }
```

### With `cargo add`

Run:

```shell
cargo add my-crate --registry gitlab
```

### With `cargo install`

To install a crate that contains a binary, run:

```shell
cargo install my-crate --registry gitlab
```

Crates from crates.io continue to work alongside crates from your project's registry.

## Delete a crate

Prerequisites:

- You must have the Maintainer or Owner role.

Before you delete a package, make sure you understand
the [associated security risks](../package_registry/supported_functionality.md#deleting-packages).

To delete a package, you can either:

- [Use the UI](../package_registry/reduce_package_registry_storage.md#delete-a-package).
- [Use the API](../../../api/packages.md#delete-a-project-package).

## Unsupported Cargo commands

GitLab does not support these commands:

- `cargo yank`
- `cargo search`
- `cargo owner`

To remove a version, delete the package.

## Related topics

- [The Cargo Book: Registries](https://doc.rust-lang.org/cargo/reference/registries.html)
