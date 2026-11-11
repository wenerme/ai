# Reduce package registry storage

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Package registries accumulate packages and their assets over time. Without regular cleanup:

- Package lists take longer to fetch, which impacts CI/CD pipeline performance
- Servers allocate more storage space to unused or old packages
- Users might struggle to find relevant packages among numerous outdated package versions

You should implement a regular cleanup strategy to reduce package registry bloat and free up storage.

## Review package registry storage use

To review the storage **Usage breakdown**:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **Usage quotas**.
1. From the **Usage quotas** page, review the **Usage breakdown** for packages.

## Delete a package

You cannot edit a package after you publish it in the package registry. Instead, you
must delete the package and republish it.

Prerequisites:

- The Maintainer or Owner role for the project.

To delete a package:

1. In the top bar, select **Search or go to** and find your project or group.
1. In the left sidebar, select **Deploy** > **Package registry**.
1. From the **Package registry** page, select the package you want to delete.
   - Or, from the **Package registry** page, select the vertical ellipsis ()
     and select **Delete package**.
1. On the **Delete package version** confirmation dialog, select **Permanently delete**.

The package is permanently deleted.

To delete a package, you can also use [the API](../../../api/packages.md#delete-a-project-package).

> [!note]
> You can introduce a dependency confusion risk
> if you delete a package while
> [request forwarding](supported_functionality.md#forwarding-requests) is turned on.

## Delete package assets

Delete assets associated with a package to reduce storage.

Prerequisites:

- The Maintainer or Owner role for the project.

To delete package assets:

1. In the top bar, select **Search or go to** and find your project or group.
1. In the left sidebar, select **Deploy** > **Package registry**.
1. From the **Package registry** page, select a package to view additional details.
1. From the **Assets** table, find the name of the assets you want to delete.
1. Select the vertical ellipsis () and select **Delete asset**.

The package assets are permanently deleted.

To delete a package, you can also use [the API](../../../api/packages.md#delete-a-package-file).

## Cleanup policy

When you upload a package with the same name and version to the package registry,
more assets are added to the package.

To save storage space, you should keep only the most recent assets. Use a cleanup policy
to define rules that automatically delete package assets in a project so you do not
have to delete them manually.

### Enable the cleanup policy

Prerequisites:

- You must have the Maintainer or Owner role.

By default, the packages cleanup policy is disabled. To enable it:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **Packages and registries**.
1. Expand **Package registry**.
1. Under **Manage storage used by package assets**, set the rules appropriately.

### Duplicate assets

The cleanup policy treats package assets as duplicates when both of these conditions are true:

- The assets belong to the same package in the project. For most formats, this means the same
  name and version. For Conan packages, the user and channel must also match.
- The assets have exactly the same filename. Filenames are case-sensitive, and the policy
  does not use wildcards or patterns.

Assets with different filenames are never duplicates.
For example, Maven snapshot files include a timestamp in each filename, so the policy does not
treat them as duplicates. To clean up older snapshot builds, see
[Maven snapshot builds](#maven-snapshot-builds). Files with a fixed name, like `maven-metadata.xml`,
are duplicates, and the policy deletes the older copies.

For Conan packages, assets must also have the same file type, recipe revision, package revision,
and package reference to be duplicates.

The policy keeps the most recently uploaded duplicates, up to the number set in
, and deletes the older ones.
When the setting is , the default, the policy keeps every asset.
To change the setting, see [enable the cleanup policy](#enable-the-cleanup-policy).

The cleanup policy runs about every 12 hours. The first run starts about 12 hours after you
save the setting.

To control whether you can publish the same package name and version again, see
[allow or prevent duplicates](supported_functionality.md#allow-or-prevent-duplicates).

#### Maven snapshot builds

- Offering: GitLab.com, GitLab Self-Managed
- Status: Beta

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/375065) in GitLab 19.6 [with a feature flag](../../../administration/feature_flags/_index.md) named `packages_cleanup_policy_maven_snapshot_builds`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

For Maven snapshot versions, the cleanup policy compares the same file across builds.
A snapshot version ends in `-SNAPSHOT`, like `1.0-SNAPSHOT`. The suffix is case-sensitive.

Each snapshot build adds files with a timestamp and build number in the filename, like
`my-app-1.0-20240102.090000-11.jar`. The policy ignores the timestamp and build number when it
compares filenames, so `my-app-1.0-20240102.090000-11.jar` and `my-app-1.0-20240101.100000-10.jar`
are copies of `my-app-1.0.jar`. For each file, the policy keeps the copies from the newest builds,
up to the number set in ,
and deletes the older copies. The policy orders builds by the timestamp and build number in the
filename, not by upload time.

Files without a build in the filename, like `maven-metadata.xml`, follow the
[duplicate asset rules](#duplicate-assets).

For example, the setting is `1`, and a snapshot version has these builds:

- Build `9` has a `.jar` and a `.pom` file.
- Build `10` has a `.jar` and a `.pom` file.
- Build `11` has only a `-linux.jar` classifier file.

The policy deletes the `.jar` and `.pom` files of build `9`. It keeps the `.jar` and `.pom`
files of build `10` and the `-linux.jar` file of build `11`, because each one is the newest
copy of its file. It also keeps the newest copy of `maven-metadata.xml`.

If the policy runs while a deploy is still uploading files, or after a deploy fails partway,
the policy can keep the copies from that partial build and delete the copies that
`maven-metadata.xml` lists. Requests for those files return a `404` error until the next
successful deploy.

> [!warning]
> When this feature is enabled for a project, the next cleanup policy run deletes the older
> copies of snapshot files. You cannot restore deleted files.

### Delete generic packages that are not downloaded

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/630800) in GitLab 19.6 [with a flag](../../../administration/feature_flags/_index.md) named `packages_cleanup_delete_generic_not_downloaded`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

You can delete generic packages that nobody has downloaded for a set number of days.
Use this rule for short-lived generic packages, such as build caches or nightly build outputs.

- A package is deleted when its last download is older than the number of days you set.
  If a package was never downloaded, GitLab uses its creation date instead.
- Uploading a new file to a package version also counts as activity. A package version
  that received a file within the number of days you set is not deleted, even if nobody downloaded it.
- GitLab tracks the last download per package version, not per file.
  Downloading any file in a package version counts as a download of the whole version.
- Only generic packages are affected. Other package formats are not deleted by this rule.
- Packages that match a [package protection rule](package_protection_rules.md) with a minimum
  access level for delete are skipped.
- The rule runs with the rest of the cleanup policy, every 12 hours.
- There is no setting in the UI. You set the rule with the GraphQL API.

> [!warning]
> Deleted packages cannot be restored.

Prerequisites:

- You must have the Maintainer or Owner role.

To delete generic packages not downloaded in a set number of days, use the
[GraphQL API](../../../api/graphql/_index.md) to run the `updatePackagesCleanupPolicy` mutation.
Set `deleteGenericPackagesNotDownloadedInDays` to a whole number from 1 to 3650:

```graphql
mutation {
  updatePackagesCleanupPolicy(input: {
    projectPath: "my-group/my-project",
    deleteGenericPackagesNotDownloadedInDays: 30
  }) {
    packagesCleanupPolicy {
      deleteGenericPackagesNotDownloadedInDays
    }
    errors
  }
}
```

To turn off this rule, set `deleteGenericPackagesNotDownloadedInDays` to `null`:

```graphql
mutation {
  updatePackagesCleanupPolicy(input: {
    projectPath: "my-group/my-project",
    deleteGenericPackagesNotDownloadedInDays: null
  }) {
    packagesCleanupPolicy {
      deleteGenericPackagesNotDownloadedInDays
    }
    errors
  }
}
```

### Set cleanup limits to conserve resources

A background process executes the package cleanup policies. This process can take a long time to finish and consumes
server resources while it runs.

Use the following setting to limit the number of cleanup workers:

- `package_registry_cleanup_policies_worker_capacity`: the maximum number of cleanup workers running concurrently.
  This number must be greater than or equal to `0`.
  You should start with a low number and increase it after monitoring the resources used by the background workers.
  To remove all workers and not execute the cleanup policies, set this setting to `0`. The default value is `2`.
