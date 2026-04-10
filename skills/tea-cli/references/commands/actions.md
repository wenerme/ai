## actions, action

Manage repository actions

**--login**="": gitea login instance to use

**--output, -o**="": output format [table, csv, simple, tsv, yaml, json]

**--repo**="": repository to operate on

### secrets, secret

Manage repository action secrets

#### list, ls

List action secrets

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### create, add, set

Create an action secret

**--file**="": read secret value from file

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--stdin**: read secret value from stdin

#### delete, remove, rm

Delete an action secret

**--confirm, -y**: confirm deletion without prompting

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### variables, variable, vars, var

Manage repository action variables

#### list, ls

List action variables

**--login, -l**="": Use a different Gitea Login. Optional

**--name**="": show specific variable by name

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### set, create, update

Set an action variable

**--file**="": read variable value from file

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--stdin**: read variable value from stdin

#### delete, remove, rm

Delete an action variable

**--confirm, -y**: confirm deletion without prompting

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### runs, run

Manage workflow runs

#### list, ls

List workflow runs

**--actor**="": Filter by actor username (who triggered the run)

**--branch**="": Filter by branch name

**--event**="": Filter by event type (push, pull_request, etc.)

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--since**="": Show runs started after this time (e.g., '24h', '2024-01-01')

**--status**="": Filter by status (success, failure, pending, queued, in_progress, skipped, canceled)

**--until**="": Show runs started before this time (e.g., '2024-01-01')

#### view, show, get

View workflow run details

**--jobs**: show jobs table

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### delete, remove, rm, cancel

Delete or cancel a workflow run

**--confirm, -y**: confirm deletion without prompting

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### logs, log

View workflow run logs

**--follow, -f**: follow log output (like tail -f), requires job to be in progress

**--job**="": specific job ID to view logs for (if omitted, shows all jobs)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### workflows, workflow

Manage repository workflows

#### list, ls

List repository workflows

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### view, show, get

View workflow details

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### dispatch, trigger, run

Dispatch a workflow run

**--follow, -f**: follow log output after dispatching

**--input, -i**="": workflow input in key=value format (can be specified multiple times)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--ref, -r**="": branch or tag to dispatch on (default: current branch)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### enable

Enable a workflow

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### disable

Disable a workflow

**--confirm, -y**: confirm disable without prompting

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
