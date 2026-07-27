# Import and migrate to GitLab

Repository migration, third-party repositories, and user contribution mapping.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Bring your existing work into GitLab.

A migration tool is available for some third-party platforms. Some support
[post-migration mapping](mapping/post_migration_mapping.md) of user contribution and membership.

| Migrate from                                                                   | Groups                  | Projects    | Migration tool | Post-migration mapping |
|:-------------------------------------------------------------------------------|:------------------------|:------------|:---------------|:-----------------------|
| [GitLab (by using direct transfer)](../group/import/_index.md)                 | Yes             | Yes | Yes    | Yes            |
| [GitLab (by using file export)](../project/settings/import_export.md)          | Yes<sup>1</sup> | Yes | Yes    | No             |
| [Bitbucket Server](bitbucket_server.md)                                        | No              | Yes | Yes    | Yes            |
| [GitHub](../project/import/github.md)                                          | No              | Yes | Yes    | Yes            |
| [Gitea](gitea.md)                                                              | No              | Yes | Yes    | Yes            |
| [Bitbucket Cloud](bitbucket_cloud.md)                                          | No              | Yes | Yes    | No             |
| [FogBugz](third_party_systems/fogbugz.md)                                      | No              | Yes | Yes    | No             |
| Git repository through a [manifest file](third_party_systems/manifest_file.md) | No              | Yes | Yes    | No             |
| Git repository through a [repository URL](third_party_systems/repo_by_url.md)  | No              | Yes | Yes    | No             |
| [IBM DevOps ClearCase](third_party_systems/clearcase.md)                       | No              | Yes | No     | No             |
| [Concurrent Versions System (CVS)](third_party_systems/cvs.md)                 | No              | Yes | No     | No             |
| [Perforce P4](third_party_systems/perforce.md)                                 | No              | Yes | No     | No             |
| [Subversion](#migrate-from-subversion)                                         | No              | Yes | No     | No             |
| [Team Foundation Version Control (TFVC)](third_party_systems/tfvc.md)          | No              | Yes | No     | No             |
| [Jira (issues only)](third_party_systems/jira.md)                              | No              | No  | Yes    | No             |

**Footnotes**:

1. Using file exports for group migration is deprecated.

## Migrate from Subversion

GitLab cannot automatically migrate Subversion repositories to Git. To convert Subversion repositories to Git,
you can use external tools, for example:

- [`git svn`](https://git-scm.com/book/en/v2/Git-and-Other-Systems-Migrating-to-Git), for very small and basic repositories.
- [`reposurgeon`](http://www.catb.org/~esr/reposurgeon/repository-editing.html), for larger and more complex repositories.

## Migrate by engaging Professional Services

If you prefer, you can engage GitLab Professional Services to migrate groups and projects to GitLab instead of doing it
yourself. For more information, see the [Professional Services catalog](https://about.gitlab.com/services/catalog/).

## View project import history

You can view all project imports you created. This list includes:

- Paths of source projects if projects were imported from external systems, or import method if GitLab projects were
  migrated.
- Paths of destination projects.
- Start date of each import.
- Status of each import.
- Error details if any errors occurred.

The history also includes projects created from either:

- [Built-in](../project/_index.md#create-a-project-from-a-built-in-template) templates.
- [Custom](../project/_index.md#create-a-project-from-a-custom-template) templates.

GitLab uses [import repository by URL](third_party_systems/repo_by_url.md) to create a new project from a template.

To view project import history:

1. In the upper-right corner, select **Create new** () and **New project/repository**.
1. Select **Import project**.
1. In the upper-right corner, select the **History** link.
1. If there are any errors for a particular import, select **Details** to see them.

## Importing projects with LFS objects

When importing a project that contains LFS objects, if the project has an [`.lfsconfig`](https://github.com/git-lfs/git-lfs/blob/main/docs/man/git-lfs-config.adoc)
file with a URL host (`lfs.url`) different from the repository URL host, LFS files are not downloaded.

## Related topics

- [Moving repositories managed by GitLab](../../administration/operations/moving_repositories.md).
