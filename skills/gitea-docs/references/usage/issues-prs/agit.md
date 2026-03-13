---
date: "	2022-09-01T20:50:42+0000"
slug: "agit"
sidebar_position: 12
aliases:
  - /en-us/agit-setup
  - /agit-setup
  - /agit
---

# AGit

In Gitea `1.13`, support for [AGit](https://git-repo.info/en/2020/03/agit-flow-and-git-repo/) was added. AGit enables users to create pull requests directly, even without write permissions of the repository, eliminating the need to fork it. This helps reduce the number of duplicated repositories and minimizes unnecessary disk usage.

:::note
Git version 2.29 or higher is required on the server side for this to work.
:::

## Creating PRs with AGit

AGit allows to create PRs while pushing code to the remote repo.
This can be done by pushing to the branch followed by a specific refspec (a location identifier known to git).
The following example illustrates this:

```shell
git push origin HEAD:refs/for/main
```

The command has the following structure:

- `HEAD`: The target branch
- `origin`: The target repository (not a fork!)
- `HEAD`: The local branch containing the changes you are proposing
- `refs/<for|draft|for-review>/<branch>`: The target PR type and configuration
  - `for`: Create a normal PR with `<branch>` as the target branch
  - `draft`/`for-review`: Currently ignored silently
  - `<branch>/`: The branch you want your changes to be merged into
- `-o <topic|title|description>`: Options for the PR
  - `topic`: The topic of this change. It will become the name of the branch holding the changes waiting for review.  This is REQUIRED to trigger a pull request.
  - `title`: The PR title (optional but recommended), only used for topics not already having an associated PR.
  - `description`: The PR description (optional but recommended), only used for topics not already having an associated PR.
  - `force-push=true`: Specifies whether to force-update the target branch.
    - Note: omitting the value and using just `-o force-push` will also work.

Here's another advanced example for creating a new PR targeting `main` with `topic`, `title`, and `description`:

```shell
git push origin HEAD:refs/for/main -o topic="topic_of_my_PR" -o title="Title of the PR" -o description="# The PR Description\nThis can be **any** markdown content.\n- [x] Ok"
```
