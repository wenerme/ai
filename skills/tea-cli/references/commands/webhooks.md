## webhooks, webhook, hooks, hook

Manage webhooks

**--global**: operate on global webhooks

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login**="": gitea login instance to use

**--login, -l**="": Use a different Gitea Login. Optional

**--org**="": organization to operate on

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--output, -o**="": output format [table, csv, simple, tsv, yaml, json]

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo**="": repository to operate on

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### list, ls

List webhooks

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### create, c

Create a webhook

**--active**: webhook is active

**--authorization-header**="": authorization header

**--branch-filter**="": branch filter for push events

**--events**="": comma separated list of events (default: "push")

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--secret**="": webhook secret

**--type**="": webhook type (gitea, gogs, slack, discord, dingtalk, telegram, msteams, feishu, wechatwork, packagist) (default: "gitea")

### delete, rm

Delete a webhook

**--confirm, -y**: confirm deletion without prompting

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### update, edit, u

Update a webhook

**--active**: webhook is active

**--authorization-header**="": authorization header

**--branch-filter**="": branch filter for push events

**--events**="": comma separated list of events

**--inactive**: webhook is inactive

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--secret**="": webhook secret

**--url**="": webhook URL
