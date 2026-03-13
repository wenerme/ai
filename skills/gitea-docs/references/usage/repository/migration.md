---
date: "2024-09-11T09:30:00+08:00"
slug: "migration"
sidebar_position: 40
aliases:
  - /migration
---

# Migration

You can migrate repositories from other Git services to your Gitea instance.

## How to migrate from Gogs/GitHub/GitLab to Gitea

To migrate from Gogs to Gitea:

- [Gogs version 0.11.46.0418](https://github.com/go-gitea/gitea/issues/4286)

To migrate from GitHub to Gitea, you can use Gitea's built-in migration form.

In order to migrate items such as issues, pull requests, etc. you will need to input at least your username.

[Example (requires login)](https://demo.gitea.com/repo/migrate)

To migrate from GitLab to Gitea, you can use this non-affiliated tool:

https://github.com/loganinak/MigrateGitlabToGogs

## How to migrate from AWS CodeCommit to Gitea

- To use the AWS CodeCommit API, Gitea requires an access key ID and a secret access key. For security reasons, we recommend creating a new user with the minimum necessary permissions and generating an access key ID and secret access key for the migration. The minimum permissions required for this user are as follows:
  ```
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "codecommit:GetRepository",
          "codecommit:GitPull",
          "codecommit:ListPullRequests",
          "codecommit:GetPullRequest",
          "codecommit:GetCommentsForPullRequest"
        ],
        "Resource": [
          "arn:aws:codecommit:<region>:<account>:<Repo-to-Migrate>
      }
    ]
  }
  ```
  - If you do not need to migrate pull requests, you can remove the `ListPullRequests`, `GetPullRequest`, and `GetCommentsForPullRequest` actions.

  - For instructions on how to create an IAM user and assign permissions, you can refer to this [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

- To clone this repository, Gitea requires HTTPS Git credentials. You can create HTTPS Git credentials according to this [AWS documentation](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-gc.html).
