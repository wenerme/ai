# Migrate from IBM DevOps ClearCase

Migrate from IBM DevOps ClearCase to Git.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

[IBM DevOps ClearCase](https://www.ibm.com/products/devops-code-clearcase) is a set of
tools developed by IBM which also include a centralized version control system
similar to Git.

The following table illustrates the main differences between ClearCase and Git:

| Feature           | ClearCase                    | Git |
|:------------------|:-----------------------------|:----|
| Repository model  | Client-server                | Distributed |
| Revision IDs      | Branch + number              | Global alphanumeric ID |
| Scope of Change   | File                         | Directory tree snapshot |
| Concurrency model | Merge                        | Merge |
| Storage Method    | Deltas                       | Full content |
| Client            | CLI, Eclipse, CC Client      | CLI, Eclipse, Git client/GUIs |
| Server            | UNIX, Windows legacy systems | UNIX, macOS |
| License           | Proprietary                  | GPL |

## Migrate to Git

We do not provide a tool to migrate from IBM DevOps ClearCase to Git. For information on migrating, see these
resources:

- [Bridge for Git and ClearCase](https://github.com/charleso/git-cc)
- [ClearCase to Git](https://therub.org/2013/07/19/clearcase-to-git/)
- [Dual syncing ClearCase to Git](https://therub.org/2013/10/22/dual-syncing-clearcase-and-git/)
- [Moving to Git from ClearCase](https://sateeshkumarb.wordpress.com/2011/01/15/moving-to-git-from-clearcase/)
