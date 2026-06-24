## repos, repo

Manage repositories

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			description,forks,id,name,owner,stars,ssh,updated,url,permission,type
		 (default: "owner,name,type,ssh")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, -O**="": List repos of a specific owner (org or user)

**--page, -p**="": specify page (default: 1)

**--starred, -s**: List your starred repos instead

**--type, -T**="": Filter by type: fork, mirror, source

**--watched, -w**: List your watched repos instead

### list, ls

List repositories you have access to

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			description,forks,id,name,owner,stars,ssh,updated,url,permission,type
		 (default: "owner,name,type,ssh")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, -O**="": List repos of a specific owner (org or user)

**--page, -p**="": specify page (default: 1)

**--starred, -s**: List your starred repos instead

**--type, -T**="": Filter by type: fork, mirror, source

**--watched, -w**: List your watched repos instead

### search, s

Find any repo on an Gitea instance

**--archived**="": Filter archived repos (true|false)

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			description,forks,id,name,owner,stars,ssh,updated,url,permission,type
		 (default: "owner,name,type,ssh")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, -O**="": Filter by owner

**--page, -p**="": specify page (default: 1)

**--private**="": Filter private repos (true|false)

**--topic, -t**: Search for term in repo topics instead of name

**--type, -T**="": Filter by type: fork, mirror, source

### create, c

Create a repository

**--branch**="": use custom default branch (need --init)

**--description, --desc**="": add description to repo

**--gitignores, --git**="": list of gitignore templates (need --init)

**--init**: initialize repo

**--labels**="": name of label set to add

**--license**="": add license (need --init)

**--login, -l**="": Use a different Gitea Login. Optional

**--name, -**="": name of new repo

**--object-format**="": select git object format (sha1,sha256)

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, -O**="": name of repo owner

**--private**: make repo private

**--readme**="": use readme template (need --init)

**--template**: make repo a template repo

**--trustmodel**="": select trust model (committer,collaborator,collaborator+committer)

### create-from-template, ct

Create a repository based on an existing template

**--avatar**: copy repo avatar from template

**--content**: copy git content from template

**--description, --desc**="": add custom description to repo

**--githooks**: copy git hooks from template

**--labels**: copy repo labels from template

**--login, -l**="": Use a different Gitea Login. Optional

**--name, -n**="": name of new repo

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, -O**="": name of repo owner

**--private**: make new repo private

**--template, -t**="": source template to copy from

**--topics**: copy topics from template

**--webhooks**: copy webhooks from template

### fork, f

Fork an existing repository

**--login, -l**="": Use a different Gitea Login. Optional

**--owner, -O**="": name of fork's owner, defaults to current user

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### migrate, m

Migrate a repository

**--auth-password**="": Password to use for authentication.

**--auth-token**="": Token to use for authentication.

**--auth-user**="": Username to use for authentication.

**--clone-url**="": Clone URL of the repository

**--issues**: Copy the issues

**--labels**: Copy the lables

**--lfs**: Copy the LFS objects

**--lfs-endpoint**="": LFS endpoint to use

**--login, -l**="": Use a different Gitea Login. Optional

**--milestones**: Copy the milestones

**--mirror**: Mirror the repository

**--mirror-interval**="": Interval to mirror the repository.

**--name**="": Name of the repository

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner**="": Owner of the repository

**--private**: Make the repository private

**--pull-requests**: Copy the pull requests

**--releases**: Copy the releases

**--service**="": Service to migrate from. Supported services are: git, gitea, gitlab, gogs

**--template**: Make the repository a template

**--wiki**: Copy the wiki

### delete, rm

Delete an existing repository

**--force, -f**: Force the deletion and don't ask for confirmation

**--login, -l**="": Use a different Gitea Login. Optional

**--name, -**="": name of the repo

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, -O**="": owner of the repo

### edit, e

Edit repository properties

**--archived**="": Set archived [true/false]

**--default-branch**="": Set default branch

**--description, --desc**="": New description of the repository

**--login, -l**="": Use a different Gitea Login. Optional

**--name**="": New name of the repository

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--private**="": Set private [true/false]

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--template**="": Set template [true/false]

**--website**="": New website URL of the repository
