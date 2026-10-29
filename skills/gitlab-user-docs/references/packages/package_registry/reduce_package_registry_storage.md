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
treat them as duplicates. Files with a fixed name, like `maven-metadata.xml`, are duplicates,
and the policy deletes the older copies.

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

### Set cleanup limits to conserve resources

A background process executes the package cleanup policies. This process can take a long time to finish and consumes
server resources while it runs.

Use the following setting to limit the number of cleanup workers:

- `package_registry_cleanup_policies_worker_capacity`: the maximum number of cleanup workers running concurrently.
  This number must be greater than or equal to `0`.
  You should start with a low number and increase it after monitoring the resources used by the background workers.
  To remove all workers and not execute the cleanup policies, set this setting to `0`. The default value is `2`.
