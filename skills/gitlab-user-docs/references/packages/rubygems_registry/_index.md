# Ruby gems in the package registry

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated
- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/52147) in GitLab 13.9 [with a feature flag](../../../administration/feature_flags/_index.md) named `rubygem_packages`. Disabled by default. This feature is an [experiment](../../../policy/development_stages_support.md).

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

You can publish Ruby gems to your project's package registry. Then, you can download them from the UI or with the API.

This feature is an [experiment](../../../policy/development_stages_support.md).
For more information about the development of this feature, see [epic 3200](https://gitlab.com/groups/gitlab-org/-/work_items/3200).

## Authenticate to the package registry

Before you can interact with the package registry, you must authenticate to it.

To do this, you can use:

- A [personal access token](../../profile/personal_access_tokens.md)
  with the scope set to `api`.
- A [deploy token](../../project/deploy_tokens/_index.md) with the scope set to
  `read_package_registry`, `write_package_registry`, or both.
- A [CI/CD job token](../../../ci/jobs/ci_job_token.md).

For example:

### With an access token

To authenticate with an access token:

- Create or edit your `~/.gem/credentials` file, and add:

  ```ini
  ---
  https://gitlab.example.com/api/v4/projects/<project_id>/packages/rubygems: '<token>'
  ```

In this example:

- `<token>` must be the token value of either your personal access token or deploy token.
- `<project_id>` is displayed on the [project overview page](../../project/working_with_projects.md#find-the-project-id).

### With a CI/CD job token

To authenticate with a CI/CD job token:

- Create or edit your `.gitlab-ci.yml` file, and add:

  ```yaml
  # assuming a my_gem.gemspec file is present in the repository with the version currently set to 0.0.1
  image: ruby

  run:
    before_script:
      - mkdir ~/.gem
      - echo "---" > ~/.gem/credentials
      - |
        echo "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/rubygems: '${CI_JOB_TOKEN}'" >> ~/.gem/credentials
      - chmod 0600 ~/.gem/credentials # rubygems requires 0600 permissions on the credentials file
    script:
      - gem build my_gem
      - gem push my_gem-0.0.1.gem --host ${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/rubygems
  ```

  > [!note]
  > The `gem` client uses the `GEM_HOST_API_KEY` environment variable before it reads `~/.gem/credentials`.
  > If a CI/CD variable named `GEM_HOST_API_KEY` exists, for example one inherited from a group,
  > `gem push` ignores the job token and fails with `401 Unauthorized`.
  > Remove that variable from the job, or set `GEM_HOST_API_KEY` to `${CI_JOB_TOKEN}`.

  You can also use `CI_JOB_TOKEN` in a `~/.gem/credentials` file you check in to GitLab:

  ```ini
  ---
  https://gitlab.example.com/api/v4/projects/${env.CI_PROJECT_ID}/packages/rubygems: '${env.CI_JOB_TOKEN}'
  ```

## Push a Ruby gem

Prerequisites:

- You must [authenticate to the package registry](#authenticate-to-the-package-registry).
- Your Ruby gem must be 3 GB or less.

To do this:

- Run a command like:

  ```shell
  gem push my_gem-0.0.1.gem --host <host>
  ```

  In this example, `<host>` is the URL you used when setting up authentication. For example:

  ```shell
  gem push my_gem-0.0.1.gem --host https://gitlab.example.com/api/v4/projects/1/packages/rubygems
  ```

When a gem is published successfully, a message like this is displayed:

```plaintext
Pushing gem to https://gitlab.example.com/api/v4/projects/1/packages/rubygems...
{"message":"201 Created"}
```

The gem is published to your package registry, and is shown on the **Packages and registries** page.
It can take up to 10 minutes before GitLab processes and displays your gem.

### Protect gems

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/603267) in GitLab 19.6.

To control who can push or delete specific gems, add a
[package protection rule](../package_registry/package_protection_rules.md) with the package type **RubyGems**.

If you push a protected gem without the required role, or with a deploy token,
the `gem push` command still returns `201 Created`, because GitLab processes gems after upload.
GitLab then marks the new package with an error: `Gem '<name>' with version '<version>' is protected`.

### Duplicate gems

- [Changed](https://gitlab.com/gitlab-org/gitlab/-/issues/323796) to prevent duplicate gems by default in GitLab 19.6.

By default, you can't push a gem if a gem with the same name and version already exists in the project.
The `gem push` command still returns `201 Created`, because GitLab processes gems after upload.
GitLab then marks the new package with an error: `Gem '<name>' with version '<version>' already exists`.

To change this behavior for a group, use the
[`updateNamespacePackageSettings`](../../../api/graphql/reference/mutations.md#updatenamespacepackagesettings) GraphQL mutation:

- To allow duplicate gems, set `rubygemsDuplicatesAllowed` to `true`.
- To make exceptions, set `rubygemsDuplicateExceptionRegex` to a regular expression.
  The regex is matched against the gem name and version.
  - When duplicates are not allowed, gems that match the regex can be duplicated.
  - When duplicates are allowed, gems that match the regex can't be duplicated.

The setting applies to projects that belong directly to the group.

## Delete a Ruby gem

Prerequisites:

- You must have the Maintainer or Owner role.

Before you delete a package, make sure you understand
the [associated security risks](../package_registry/supported_functionality.md#deleting-packages).

To delete a package, you can either:

- [Use the UI](../package_registry/reduce_package_registry_storage.md#delete-a-package).
- [Use the API](../../../api/packages.md#delete-a-project-package).

## Install a Ruby gem

Prerequisites:

- You must [authenticate to the package registry](#authenticate-to-the-package-registry).

To install a gem, pass your credentials in the source URL as HTTP Basic authentication.
Use `__token__` as the username and your personal access token, deploy token, or CI/CD job
token as the password.

In the following examples:

- `<token>` is your personal access token, deploy token, or CI/CD job token.
- `<project_id>` is displayed on the [project overview page](../../project/working_with_projects.md#find-the-project-id).

### With the gem command

Run a command like:

```shell
gem install my_gem --source "https://__token__:<token>@gitlab.example.com/api/v4/projects/<project_id>/packages/rubygems"
```

### With Bundler

In your `Gemfile`, add a `source` block:

```ruby
source "https://__token__:<token>@gitlab.example.com/api/v4/projects/<project_id>/packages/rubygems" do
  gem "my_gem"
end
```

## Download a gem file

To download a gem file for local use without installing it:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Deploy** > **Package registry**.
1. Select the package name and version.
1. Under **Assets**, select the Ruby gem you want to download.

To download a gem file, you can also [use the API](../../../api/packages/rubygems.md#download-a-gem-file).

## Related topics

- [Make your own gem](https://guides.rubygems.org/make-your-own-gem/)
- [Ruby gems API documentation](../../../api/packages/rubygems.md)
