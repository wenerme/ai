## times, time, t

Operate on tracked times of a repository's issues & pulls

**--fields**="": Comma-separated list of fields to print. Available values:
	id,created,repo,issue,user,duration

**--from, -f**="": Show only times tracked after this date

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--mine, -m**: Show all times tracked by you across all repositories (overrides command arguments)

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--total, -t**: Print the total duration at the end

**--until, -u**="": Show only times tracked before this date

### add, a

Track spent time on an issue

>tea times add <issue> <duration>

**--login, -l**="": Use a different Gitea Login. Optional

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### delete, rm

Delete a single tracked time on an issue

>tea times delete <issue> <time ID>

**--login, -l**="": Use a different Gitea Login. Optional

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### reset

Reset tracked time on an issue

>tea times reset <issue>

**--login, -l**="": Use a different Gitea Login. Optional

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### list, ls

List tracked times on issues & pulls

**--fields**="": Comma-separated list of fields to print. Available values:
	id,created,repo,issue,user,duration

**--from, -f**="": Show only times tracked after this date

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--mine, -m**: Show all times tracked by you across all repositories (overrides command arguments)

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--total, -t**: Print the total duration at the end

**--until, -u**="": Show only times tracked before this date
