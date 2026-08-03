---
date: "	2022-09-01T20:50:42+0000"
aliases:
  - /en-us/agit-setup
  - /agit-setup
  - /agit
---

# AGit

In Gitea `1.13`, support for [AGit](https://git-repo.info/en/2020/03/agit-flow-and-git-repo/) was added. AGit enables users to create pull requests directly, even without write permissions of the repository, eliminating the need to fork it. This helps reduce the number of duplicated repositories and minimizes unnecessary disk usage.

> **note**: Git version 2.29 or higher is required on the server side for this to work.

## Creating PRs with AGit

AGit allows to create PRs while pushing code to the remote repo.
This can be done by pushing to a special refspec (a location identifier known to git) instead of to a branch.
The following example illustrates this:

```shell
git push origin HEAD:refs/for/main -o topic="topic_of_my_PR"
```

The command has the following structure:

```shell
git push <remote> <local-rev>:refs/for/<branch>[/<topic>] [-o <option>[=<value>] ...]
```

- `<remote>`: The remote pointing at the target repository (not a fork!), `origin` in the example above
- `<local-rev>`: The local branch or commit containing the changes you are proposing, `HEAD` in the example above
- `refs/for/<branch>`: The target PR type and configuration
  - `for`: Create a normal PR with `<branch>` as the target branch. This is the only prefix supported at the moment, `refs/draft/...` and `refs/for-review/...` are reserved for future use and do not create a PR.
  - `<branch>`: The branch you want your changes to be merged into
  - `<topic>`: Optional, an alternative to `-o topic=<topic>`. The push is rejected with `topic-branch is not set` if the topic is given in neither place.
- `-o <option>[=<value>]`: Options for the PR
  - `topic`: The topic of this change. It will become the name of the branch holding the changes waiting for review (prefixed with your user name). This is REQUIRED to trigger a pull request, unless it is already part of the refspec.
  - `title`: The PR title (optional but recommended), only used for topics not already having an associated PR.
  - `description`: The PR description (optional but recommended), only used for topics not already having an associated PR.
  - `force-push=true`: Specifies whether to force-update the target branch.
    - Note: omitting the value and using just `-o force-push` will also work.

Here's another example for creating a new PR targeting `main` with `topic`, `title`, and `description`:

```shell
git push origin HEAD:refs/for/main -o topic="topic_of_my_PR" -o title="Title of the PR" -o description="# The PR Description\nThis can be **any** markdown content.\n- [x] Ok"
```
