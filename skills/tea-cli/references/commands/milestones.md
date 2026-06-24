## milestones, milestone, ms

List and create milestones

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			title,state,items_open,items_closed,items,duedate,description,created,updated,closed,id
		 (default: "title,items,duedate")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": Filter by milestone state (all|open|closed)

### list, ls

List milestones of the repository

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			title,state,items_open,items_closed,items,duedate,description,created,updated,closed,id
		 (default: "title,items,duedate")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": Filter by milestone state (all|open|closed)

### create, c

Create an milestone on repository

**--deadline, --expires, -x**="": set milestone deadline (default is no due date)

**--description, -d**="": milestone description to create

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": set milestone state (default is open)

**--title, -t**="": milestone title to create

### close

Change state of one or more milestones to 'closed'

**--force, -f**: delete milestone

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### delete, rm

delete a milestone

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### reopen, open

Change state of one or more milestones to 'open'

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### issues, i

manage issue/pull of an milestone

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			index,state,kind,author,author-id,url,title,body,created,updated,deadline,assignees,milestone,labels,comments,owner,repo
		 (default: "index,kind,title,state,updated,labels")

**--kind**="": Filter by kind (issue|pull)

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": Filter by issue state (all|open|closed)

#### add, a

Add an issue/pull to an milestone

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### remove, r

Remove an issue/pull to an milestone

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
