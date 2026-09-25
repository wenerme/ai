---
date: "2023-04-27T15:00:00+08:00"
---

# Frequently Asked Questions

This page contains some common questions and answers about Gitea Actions.

## Is it possible to disable Actions for new repositories by default for my own instance?

Yes, when you enable Actions for the instance, you can choose to enable the `actions` unit for all new repositories by default.

```ini
[repository]
; remove repo.actions will not enable actions for newly created repositories.
DEFAULT_REPO_UNITS = ...,repo.actions
```

## Should we use `${{ github.xyz }}` or `${{ gitea.xyz }}`  in workflow files?

You can use `github.xyz` and Gitea will work fine.
As mentioned, Gitea Actions is designed to be compatible with GitHub Actions.
However, we recommend using `gitea.xyz` in case Gitea adds something that GitHub does not have to avoid different kinds of secrets in your workflow file (and because you are using this workflow on Gitea, not GitHub).
Still, this is completely optional since both options have the same effect at the moment.

## Where will the runner download scripts when using actions such as `actions/checkout@v4`?

From `https://github.com` by default, or from your own instance when `[actions].DEFAULT_ACTIONS_URL` is `self`, see the [Configuration Cheat Sheet](../../administration/config-cheat-sheet.md#actions-actions).

To use an action from elsewhere, name its host:

- `uses: https://gitea.com/owner/repo@ref`
- `uses: http://your_gitea_instance.com/owner/repo@ref`
- `uses: self:owner/repo@ref` for your own Gitea instance

## How to limit the permission of the runners?

Runners only connect to your Gitea instance.
For each job, a runner gets a `GITEA_TOKEN` limited to the job's repository, see [Actions job token permissions](token-permissions.md).
To give a job access to more private repositories or external systems, pass it [secrets](usage/actions/secrets.md).

## Which operating systems are supported by Gitea Runner?

Official binaries are released for Linux, macOS and Windows.
Other systems supported by Go and Docker work in theory.

## How to avoid being hacked?

There are two types of possible attacks: unknown runner stealing the code or secrets from your repository, or malicious scripts controlling your runner.

Avoiding the former means not allowing people you don't know to register runners for your repository, organization, or instance.

The latter is a bit more complicated.
If you're using a private Gitea instance for your company, you may not need to worry about security since you trust your colleagues and can hold them accountable.

For public instances, things are a little different.
Here's how we do it on [gitea.com](http://gitea.com/):

- We only register runners for the "gitea" organization, so our runners will not execute jobs from other repositories.
- Our runners always run jobs with isolated containers. While it is possible to do this directly on the host, we choose not to for more security.
- To run actions for fork pull requests, approval is required. See [#22803](https://github.com/go-gitea/gitea/pull/22803).
- If someone registers their own runner for their repository or organization on [gitea.com](http://gitea.com/), we have no objections and will just not use it in our org. However, they should take care to ensure that the runner is not used by other users they do not know.

## Why choose GitHub Actions? Why not something compatible with GitLab CI/CD?

[@lunny](https://gitea.com/lunny) has explained this in the [issue to implement actions](https://github.com/go-gitea/gitea/issues/13539).
Furthermore, Actions is not only a CI/CD system but also an automation tool.

There have also been numerous [marketplace actions](https://github.com/marketplace?type=actions) implemented in the open-source world.
It is exciting to be able to reuse them.

## What if it runs on multiple labels, such as `runs-on: [label_a, label_b]`?

The job runs on a runner that has all of the labels, as on [GitHub](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on).
The runner uses the environment of the first label it has.

## What is the difference between agent labels and custom labels for a runner?

Gitea no longer has custom labels.
A runner declares its labels every time it starts, from its `runner.labels` configuration or the labels given at registration, so change them there and restart the runner.

## Will there be more implementations for Gitea Actions runner?

Although we would like to provide more options, our limited manpower means that Gitea Runner will be the only officially supported runner at the moment.

However, both Gitea and Gitea Runner are completely open source under MIT License, so anyone can modify the code to satisfy their requirements.

In case you fork Gitea Runner to create your own version: Please contribute the changes back if you can and if you think your changes will help others as well.

## What workflow trigger events does Gitea support?

All events listed in this table are supported events and are compatible with GitHub.
For events supported only by GitHub, see GitHub's [documentation](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).

| trigger event                                | activity types                                                                                                                                                             |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| create                                       | not applicable                                                                                                                                                             |
| delete                                       | not applicable                                                                                                                                                             |
| fork                                         | not applicable                                                                                                                                                             |
| gollum                                       | not applicable                                                                                                                                                             |
| push                                         | not applicable                                                                                                                                                             |
| schedule                                     | not applicable                                                                                                                                                             |
| workflow_dispatch                            | not applicable                                                                                                                                                             |
| workflow_call                                | not applicable                                                                                                                                                             |
| issues                                       | `opened`, `edited`, `closed`, `reopened`, `assigned`, `unassigned`, `milestoned`, `demilestoned`, `labeled`, `unlabeled`                                                    |
| issue_comment                                | `created`, `edited`, `deleted`                                                                                                                                             |
| pull_requestpull_request_target         | `opened`, `edited`, `closed`, `reopened`, `assigned`, `unassigned`, `synchronize`, `labeled`, `unlabeled`, `milestoned`, `demilestoned`, `review_requested`, `review_request_removed` |
| pull_request_review                          | `submitted`, `edited`                                                                                                                                                      |
| pull_request_review_comment                  | `created`, `edited`                                                                                                                                                        |
| release                                      | `published`, `edited`                                                                                                                                                      |
| registry_package                             | `published`                                                                                                                                                                |
| workflow_run                                 | `requested`, `in_progress`, `completed`                                                                                                                                    |

> Without an explicit `types:` filter, `pull_request` and `pull_request_target` only run on `opened`, `reopened` and `synchronize`, matching GitHub. All other events run on every activity type they support.

> For `pull_request` events, in [GitHub Actions](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request), the `ref` is `refs/pull/:prNumber/merge`, which is a reference to the merge commit preview. However, Gitea has no such reference.
> Therefore, the `ref` in Gitea Actions is `refs/pull/:prNumber/head`, which points to the head of pull request rather than the preview of the merge commit.

## How to share actions and reusable workflows from private repositories?

Go to the repository's **Settings** > **Actions** > **General** page and add collaborative owners.
The private repositories of collaborative owners are allowed to access the actions and workflows in the current repository.

To share within the same user or organization, add the private repositories under its **Settings** > **Actions** > **General** > **Cross-Repository Access** instead.
See [Cross-repository access](token-permissions.md#cross-repository-access).
